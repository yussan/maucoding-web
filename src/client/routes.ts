import Error from "./pages/error/index.vue"
import SuperLayout from "./layouts/super.vue"
import DefaultLayout from "./layouts/default.vue"

export default [
  // public pages
  {
    path: "/",
    component: DefaultLayout,
    children: [
      { path: "/", component: () => import("./pages/v2/home/index.vue") },
      { path: "/posts", component: () => import("./pages/v2/post/index.vue") },
      {
        path: "/search",
        component: () => import("./pages/v2/post/search.vue")
      },
      {
        path: "/tag/:tag_name",
        component: () => import("./pages/v2/post/index.vue")
      },
      {
        path: "/author/:username",
        props: true,
        component: () => import("./pages/v2/post/author.vue")
      },
      {
        path: "/post/:title",
        props: true,
        component: () => import("./pages/post/detail.vue")
      },
      {
        path: "/static/:title",
        props: true,
        component: () => import("./pages/static/index.vue")
      },
      {
        path: "/super",
        name: "super_login",
        component: () => import("./pages/auth/index.vue")
      }
    ]
  },

  // super pages
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
  }
]
