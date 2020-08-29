// import * as postModule from "../modules/post"
// import * as userModule from "../modules/user"
// import { stripTags } from "string-manager/dist/modules/html"
// import { truncate } from "string-manager/dist/modules/truncate"
// import { queryToObj } from "string-manager/dist/modules/httpquery"
import * as cookies from "../modules/cookies"

const AVAILABLE_LANG = ["id", "en"]
const NOT_REDIRECT_LANG = ["a", "author", "post", "search", "tag", "static"]

// export const generateMetaHomepage = (req, res, next) => {
//   const title = "Tech from engineer perspective"
//   const desc =
//     "Mau Coding powered by Yussan Media Group, here we discuss all kinds of technology from the perspective of engineers"

//   req.meta = {
//     title,
//     desc,
//     url: `https://maucoding.com/${req.originalUrl}`,
//     image: "https://maucoding.com/images/logo-wide-2.1.png"
//   }

//   req.html = `
//     <div class="home">
//       <img src="${req.meta.image}" alt="Mau Coding Logo" />
//       <h1>${title}</h1>
//       <h2>${desc}</h2>
//     </div>
//   `

//   return next()
// }

// export const generateMetaPostList = (req, res, next) => {
//   let title = "Available Posts"

//   if (req.params.tag) title = `${title} with tag "${req.params.tag}"`

//   const desc = `${title} on Mau Coding`
//   title += " - Mau Coding"

//   req.meta = {
//     title,
//     desc,
//     url: `https://maucoding.com/${req.originalUrl}`,
//     image: "https://maucoding.com/images/logo-wide-2.1.png"
//   }

//   req.html = `
//     <div class="post-list">
//       <h1>${title}</h1>
//       <h2>${desc}</h2>
//     </div>
//   `

//   return next()
// }

// export const generateMetaSuper = (req, res, next) => {
//   let title = "Super Access"
//   const desc = `${title} on Mau Coding`
//   title += " - Mau Coding"

//   req.meta = {
//     title,
//     desc,
//     url: `https://maucoding.com/${req.originalUrl}`,
//     image: "https://maucoding.com/images/logo-wide-2.1.png"
//   }

//   req.html = `
//     <div class="super">
//       <h1>${title}</h1>
//       <h2>${desc}</h2>
//     </div>
//   `

//   return next()
// }

// export const generateMetaPostSearch = (req, res, next) => {
//   const query = req.getQuery() ? queryToObj(req.getQuery()) : {}
//   let title = `Search results "${query.q || "keyword"}"`

//   const desc = `${title} on Mau Coding`
//   title += " - Mau Coding"

//   req.meta = {
//     title,
//     desc,
//     url: `https://maucoding.com/${req.originalUrl}`,
//     image: "https://maucoding.com/images/logo-wide-2.1.png"
//   }

//   req.html = `
//     <div class="post-search">
//       <h1>${title}</h1>
//       <h2>${desc}</h2>
//     </div>
//   `

//   return next()
// }

// export const generateMetaPost = (req, res, next) => {
//   const title_arr = req.params.title.split("-")
//   const id = title_arr[title_arr.length - 1]
//   req.no_count = true
//   return postModule.detailPost(req, res, {
//     id,
//     callback: json => {
//       if (json && json._id) {
//         const description = truncate(stripTags(json.content), 500, "...")
//         const keywords = json.tags.toString()

//         req.meta = {
//           title: json.title,
//           desc: description,
//           url: `https://maucoding.com/post/${req.params.title}`,
//           image: json.image.original,
//           keywords,
//           jsonld: {
//             "@context": "https://schema.org",
//             "@type": "BlogPosting",
//             description,
//             headline: json.title,
//             alternativeHeadline: json.title,
//             image: json.image.original,
//             genre: "Mau Coding,software engineer,tutorial,development",
//             keywords,
//             wordcount: json.content.length,
//             publisher: {
//               "@type": "Organization",
//               name: "Mau Coding",
//               logo: {
//                 "@type": "ImageObject",
//                 url: "https://maucoding.com/images/logo-wide-2.png",
//                 height: "500",
//                 width: "500"
//               }
//             },
//             url: `https://maucoding.com/post/${req.params.title}`,
//             datePublished: new Date(json.created_on * 1000).toISOString(),
//             dateCreated: new Date(json.created_on * 1000).toISOString(),
//             dateModified: new Date(json.updated_on * 1000).toISOString(),
//             author: {
//               "@type": "Person",
//               name: json.author.fullname || json.author.username
//             }
//           }
//         }

//         req.html = `
//           <div class="post-detail">
//             <h1>${json.title}</h1>
//             <figure>
//               <img src="${json.image.original}" alt="${json.title}" />
//             </figure>
//             <article>
//               ${json.content}
//             </article>
//           </div>
//         `
//       }

//       return next()
//     }
//   })
// }

// export const generateMetaUser = (req, res, next) => {
//   const { username } = req.params

//   return userModule.profileUser(req, res, {
//     username,
//     callback: json => {
//       if (json.username) {
//         req.meta = {
//           title: username,
//           desc: `Post created by ${json.fullname || username}`,
//           url: `https://maucoding.com/author/${username}`,
//           image: json.avatar.original
//         }

//         req.html = `
//         <div class="author">
//           <h1>Post by "${json.username}" - Mau Coding</h1>
//           <h2>Find all available post posted by "${json.username}". Mau Coding - Tech from engineer perspective</h2>
//           <img src="${json.avatar.original}" alt="${json.username}" />
//         </div>
//       `
//       } else {
//         req.meta = {
//           title: "User Not Found",
//           desc: "User Not Found",
//           url: `https://maucoding.com/author/${username}`
//         }
//       }

//       return next()
//     }
//   })
// }

// export const generateMetaNotFound = (req, res, next) => {
//   const title = "Page Not Found - Mau Coding"
//   const desc =
//     "The page you are looking for was not found, please visit the others. Mau Coding powered by Yussan Media Group, here we discuss all kinds of technology from the perspective of engineers"

//   req.meta = {
//     title,
//     desc,
//     url: `https://maucoding.com/${req.originalUrl}`,
//     image: "https://maucoding.com/images/logo-wide-2.1.png"
//   }

//   req.html = `
//     <div class="home">
//       <img src="${req.meta.image}" alt="Mau Coding Logo" />
//       <h1>${title}</h1>
//       <h2>${desc}</h2>
//     </div>
//   `

//   return next()
// }

export const checkLanguage = (req, res, next) => {
  // get lang from url params
  let params_lang = req.params.lang
  // get lang from session
  const session_lang = req.cookies.idmoreacademy_lang_session || "id"

  if (!params_lang) {
    const pathArr = req.path().split("/")
    if (!NOT_REDIRECT_LANG.includes(pathArr[1])) {
      params_lang = pathArr[1]
    } else {
      params_lang = "id"
    }
  }

  if (!AVAILABLE_LANG.includes(params_lang)) {
    // set new cookies of lang
    cookies.set(req, res, "idmoreacademy_lang_session", session_lang)

    // redirect to select lang
    return res.redirect(
      `/${session_lang}${req.path()}`.replace(`/${params_lang}`, ""),
      next
    )
  } else {
    // set new cookies of lang
    cookies.set(req, res, "idmoreacademy_lang_session", params_lang)
    return next()
  }
}
