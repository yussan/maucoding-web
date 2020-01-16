import MetaInfo from "../config/metainfo.js"

const { NODE_ENV } = process.env

const generateHtml = ({ lang, meta = {}, initialHTML }) => {
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
      <div id="app">${initialHTML || ""}</div>
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
  const webpackAssets = require("../../internals/webpack-assets.json")
  return `
    <script src="${
      NODE_ENV == "production" ? webpackAssets.vendor.js : "/build/vendor.js"
    }"></script>
    
    <script src="${
      NODE_ENV == "production" ? webpackAssets.app.js : "/build/app.js"
    }"></script>
    
    ${
      NODE_ENV === "production"
        ? `
        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-106471389-3"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'UA-106471389-3');
        </script>
        `
        : ""
    }
    `
}

export default (req, res, next) => {
  res.writeHead(200, {
    "Content-Type": "text/html"
  })

  const html = generateHtml({
    lang: req.params.lang,
    meta: req.meta,
    initialHTML: req.html
  })
  res.write(html)
  return res.end()
}
