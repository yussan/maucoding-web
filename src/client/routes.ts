import Home from "./pages/home/index.vue"
import Error from "./pages/error/index.vue"
import Post from "./pages/post/index.vue"
import PostDetail from "./pages/post/detail.vue"
import StaticDetail from "./pages/static/index.vue"

import SuperLayout from "./layouts/super.vue"
import DefaultLayout from "./layouts/default.vue"

export default [
  // public page
  {
    path: "/",
    component: DefaultLayout,
    children: [
      { path: "/", component: () => import("./pages/v2/home/index.vue") },
      { path: "/posts", component: Post },
      { path: "/search", component: Post },
      { path: "/tag/:tag_name", props: true, component: Post },
      { path: "/author/:username", props: true, component: Post },
      { path: "/post/:title", component: PostDetail },
      { path: "/static/:title", component: StaticDetail },
      {
        path: "/super",
        name: "super_login",
        component: () => import("./pages/auth/index.vue")
      }
    ]
  },

  // super routes
  // super page auth
  // {
  //   path: "/",
  //   component: DefaultLayout,
  //   children: [
  //     { path: "/super", name: "super_post", component: () => import("./pages/auth/index.vue") }
  //   ]
  // },

  // super
  {
    path: "/super/*",
    component: SuperLayout,
    children: [
      {
        path: "/super/posts/new",
        name: "super_new_post",
        component: () => import("./pages/_super/post/form.vue")
      },
      {
        path: "/super/posts",
        name: "super_post",
        component: () => import("./pages/_super/post/index.vue")
      },
      {
        path: "/super/post/:id",
        name: "super_post_detail",
        props: true,
        component: () => import("./pages/_super/post/form.vue")
      }
    ]
  },

  // lang routes
  {
    path: "/:lang",
    component: DefaultLayout,
    children: [
      { path: "/:lang", component: () => import("./pages/v2/home/index.vue") },
      { path: "/:lang/posts", component: Post },
      { path: "/:lang/search", component: Post },
      { path: "/:lang/tag/:tag_name", props: true, component: Post },
      { path: "/:lang/static/:title", component: StaticDetail },
      { path: "/:lang/author/:username", props: true, component: Post },
      { path: "/:lang/post/:title", component: PostDetail },
      { path: "/:lang/static/:title", component: StaticDetail },
      { path: "*", component: Error }
    ]
  }
]
