import mongo from "../../modules/mongo"
import { toSlug } from "../../../../node_modules/string-manager/dist/modules/slug"
import { stripTags } from "../../../../node_modules/string-manager/dist/modules/html"
import { truncate } from "../../../../node_modules/string-manager/dist/modules/truncate"

/**
 * @description function to get feed / rss (xml)
 */
export function getFeed(req, res) {
  res.setHeader("Content-Type", "application/xml")
  let items = ""

  let aggregate = [
    {
      $lookup: {
        from: "users",
        localField: "user_id",
        foreignField: "_id",
        as: "author"
      }
    }
  ]

  aggregate.push({
    $sort: {
      created_on: -1
    }
  })

  // draft post not available in feed
  aggregate.push({
    $match: { draft: false }
  })

  mongo().then(({ db, client }) => {
    // ref guid : https://www.w3schools.com/xml/rss_tag_guid.asp
    db.collection("posts")
      .aggregate(aggregate)
      .skip(0)
      .limit(10)
      .toArray((err, result) => {
        if (err) {
          res.end("error get feed")
        } else {
          client.close()

          result.map(n =>  {
            // ref: remove &nbsp; from string https://stackoverflow.com/a/6452789/2780875
            n.content = n.content.replace(/&nbsp;/gi, "")
            items += `
            <item>
              <title>${n.title} by ${n.author[0].username}</title>
              <description>${truncate(
                stripTags(n.content),
                500,
                "[READ MORE...]"
              )}</description>
              <link>https://maucoding.com/post/${toSlug(n.title)}-${
              n._id
            }</link>
              <guid>https://maucoding.com/post/${toSlug(n.title)}-${
              n._id
            }</guid>
              <category domain="https://maucoding.com">${n.tags
                .split(",")
                .join("/")}</category>
              <pubDate>${new Date(n.created_on * 1000).toUTCString()}</pubDate>
              <media:content url="${n.image}" type="image/*" medium="image/jpeg" duration="10"> </media:content>
            </item>
            `
          })
          res.end(xmlFeedWrapper(items, result[0].created_on))
        }
      })
  })
}

// ref: http://www.feedforall.com/sample.xml
function xmlFeedWrapper(items = "", update_date = 0) {
  // ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toUTCString
  return `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
    <channel>
      <title>Mau Coding Feed</title>
      <description>Tech from Engineer Perspective by Yussan Media Group</description>
      <link>https://maucoding.com</link>
      <category domain="https://maucoding.com">computers/software/internet/development/engineer</category>
      <copyright>Copyright 2017-2018 Yussan Media Group.</copyright>
      <lastBuildDate>${new Date(
        update_date * 1000
      ).toUTCString()}</lastBuildDate>
      <language>en-us</language>
      <image>
        <url>https://res.cloudinary.com/dhjkktmal/image/upload/c_scale,w_800/v1538876985/idmore-academy/Patreon_Cover.png</url>
        <title>Mau Coding Feed</title>
        <link>https://maucoding.com</link>
        <description>Tech from Engineer Perspective by Yussan Media Group</description>
        <width>60</width>
        <height>60</height>
      </image>
      <atom:link href="https://maucoding.com/feed" rel="self" type="application/rss+xml" />
      ${items}
    </channel>
  </rss>
  `
}
