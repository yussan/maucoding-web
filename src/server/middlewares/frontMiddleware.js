import * as postModule from "../modules/post"
import * as userModule from "../modules/user"
import { stripTags } from "string-manager/dist/modules/html"
import { truncate } from "string-manager/dist/modules/truncate"
import { encString, decString } from "../modules/password"
import * as cookies from "../modules/cookies"

const AVAILABLE_LANG = ["id", "en"]

export const generateMetaPostList = (req, res, next) => {
  let title = "Post"

  if (req.params.tag) title = `${title} by tag ${req.params.tag}`

  req.meta = {
    title,
    desc: `${title} on Id More Academy`,
    url: `https://oopsreview.com/${req.originalUrl}`,
    image:
      "https://res.cloudinary.com/dhjkktmal/image/upload/c_scale,w_500/v1538876985/idmore-academy/Patreon_Cover.png"
  }

  req.html = `
    <div class="post-list">
      <h1>${title}</h1>
      <h2>${title} on Id More Academy</h2>
    </div>
  `

  return next()
}

export const generateMetaPost = (req, res, next) => {
  const title_arr = req.params.title.split("-")
  const id = title_arr[title_arr.length - 1]
  req.no_count = true
  return postModule.detailPost(req, res, {
    id,
    callback: json => {
      if (json && json._id) {
        const description = truncate(stripTags(json.content), 500, "...")
        const keywords = json.tags.toString()

        req.meta = {
          title: json.title,
          desc: description,
          url: `https://academy.byidmore.com/post/${req.params.title}`,
          image: json.image.original,
          keywords,
          jsonld: {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            description,
            headline: json.title,
            alternativeHeadline: json.title,
            image: json.image.original,
            genre: "id more academy,software engineer,tutorial,development",
            keywords,
            wordcount: json.content.length,
            publisher: {
              "@type": "Organization",
              name: "Id More Academy",
              logo: {
                "@type": "ImageObject",
                url: "https://academy.byidmore.com/images/logo-wide-2.png",
                height: "500",
                width: "500"
              }
            },
            url: `https://academy.byidmore.com/post/${req.params.title}`,
            datePublished: new Date(json.created_on * 1000).toISOString(),
            dateCreated: new Date(json.created_on * 1000).toISOString(),
            dateModified: new Date(json.updated_on * 1000).toISOString(),
            author: {
              "@type": "Person",
              name: json.author.fullname || json.author.username
            }
          }
        }

        req.html = `
          <div class="post-detail">
            <h1>${json.title}</h1>
            <figure>
              <img src="${json.image.original}" alt="${json.title}" />
            </figure>
            <article>
              ${json.content}
            </article>
          </div>        
        `
      }

      return next()
    }
  })
}

export const generateMetaUser = (req, res, next) => {
  const { username } = req.params

  return userModule.profileUser(req, res, {
    username,
    callback: json => {
      if (json.username) {
        req.meta = {
          title: username,
          desc: `Post created by ${json.fullname || username}`,
          url: `https://academy.byidmore.com/author/${username}`,
          image: json.avatar.original
        }

        req.html = `
        <div class="author">
          <h1>${json.username}</h1>
          <h2>${json.fullname}</h2>
          <img src="${json.avatar.original}" alt="${json.username}" />
        </div>
      `
      } else {
        req.meta = {
          title: "User Not Found",
          desc: "User Not Found",
          url: `https://academy.byidmore.com/author/${username}`
        }
      }

      return next()
    }
  })
}

export const checkLanguage = (req, res, next) => {
  // get lang from url
  const params_lang = req.params.lang
  // get lang from session
  const session_lang = req.cookies.idmoreacademy_lang_session

  if (!AVAILABLE_LANG.includes(params_lang)) {
    const new_lang = session_lang || "id"

    // set new cookies of lang
    cookies.set(req, res, "idmoreacademy_lang_session", new_lang)

    // redirect to select lang
    return res.redirect(
      `/${new_lang}${req.path()}`.replace(`/${params_lang}`, ""),
      next
    )
  } else {
    // set new cookies of lang
    cookies.set(req, res, "idmoreacademy_lang_session", params_lang)
    return next()
  }
  
}
