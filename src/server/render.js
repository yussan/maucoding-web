import MetaInfo from "../config/metainfo.js"
import serverBundle from "../../public/server-build/vue-ssr-server-bundle.json"
import clientManifest from "../../public/client-build/vue-ssr-client-manifest.json"
const { createBundleRenderer } = require("vue-server-renderer")
const { NODE_ENV } = process.env

function generateHtml({ lang, meta = {}, initialHTML }) {
  return `<!DOCTYPE html>   
<html lang="en">
  <head>
      <meta charset="utf-8">
      <title>${
        meta.title ? `${meta.title} - Yussan Academy` : MetaInfo.title
      }</title>
      <link href="https://fonts.googleapis.com/css?family=Ubuntu&display=swap" rel="stylesheet" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
      <meta data-vmid="description" data-vue-meta="true" name="description" content="${meta.desc ||
        MetaInfo.description}" />
      <meta data-vmid="keywords" data-vue-meta="true" name="keywords" content="${meta.keywords ||
        "Yussan Academy,software engineer,tutorial"}" />
      ${
        meta.title
          ? `
        <meta name="twitter:card" content="summary"/>
        <meta name="twitter:image" content="${meta.image ||
          "https://res.cloudinary.com/dhjkktmal/image/upload/c_scale,w_800/v1538301459/github/Screen_Shot_2018-09-30_at_16.52.32.png"}"/>
        <meta name="twitter:title" content="${meta.title} - Yussan Academy"/>
        <meta name="twitter:description" content="${meta.desc}" />

        <meta property="og:title" content="${meta.title} - Yussan Academy" />
        <meta property="og:type" content="${meta.type || "blog"}" />
        <meta property="og:url" content="${meta.url ||
          "https://yussanacademy.com"}" />
        <meta property="og:image" content="${meta.image ||
          "https://res.cloudinary.com/dhjkktmal/image/upload/c_scale,w_800/v1538301459/github/Screen_Shot_2018-09-30_at_16.52.32.png"}" />
        <meta property="og:description" content="${meta.desc}" />
        `
          : ""
      }
      ${
        meta.jsonld
          ? `
          <script type="application/ld+json">${JSON.stringify(
            meta.jsonld
          )}</script>
        `
          : ""
      }
      <link rel="manifest" href="/manifest.json" />
      <link rel="icon" href="/images/icons/icon-72x72.png" />
      <link href="${
        NODE_ENV === "production"
          ? "/opensearch/production.xml"
          : "/opensearch/development.xml"
      }" rel="search" title="oopsreview" type="application/opensearchdescription+xml">
      <link rel="alternate" href="https://yussanacademy.com" lang="en-US"/> 
      <script>
        window.SELECTED_LANG = "${lang || "id"}"    
      </script>    
  </head>
  <body>
      <div id="app"><!--vue-ssr-outlet--></div>
      <script>
        //global inline script
        // document.addEventListener('click', function(e){
        //   // if(e.target.className === 'icono-caretDown') {}
        //   const dropdownEl = document.getElementsByClassName('dropdown');
        //   for(let n=0;n<dropdownEl.length;n++){
        //     dropdownEl[n].classList.remove('show')
        //   }
        // })
      </script>
      ${getScript()}
  </body>
</html>`
}

function getScript() {
  return `
    ${
      NODE_ENV === "production"
        ? `
        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-156429570-1"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'UA-156429570-1');
        </script>

        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        <script>
            (adsbygoogle = window.adsbygoogle || []).push({
                  google_ad_client: "ca-pub-4468477322781117",
                  enable_page_level_ads: true
            });
        </script>

        `
        : ""
    }
    `
}

export default (req, res) => {
  const template = generateHtml({
    lang: req.params.lang,
    meta: req.meta,
    initialHTML: req.html
  })

  const renderer = createBundleRenderer(serverBundle, {
    template,
    clientManifest,
    runInNewContext: false
  })

  let context = {
    url: req.url
    // title: "Tech from engineer's perspective - Yussan Academy",
    // meta: null
  }

  renderer.renderToString(context, (err, html) => {
    // ref : http://restify.com/docs/response-api/#send
    if (err) {
      if (err.code === 404) {
        return res.send("Not found")
      } else {
        console.error("server render error", err)
        return res.send(err)
      }
    } else {
      res.writeHead(200, {
        "Content-Type": "text/html"
      })
      res.write(html)
      return res.end()
    }
  })
}
