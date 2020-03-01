// entry file for webpack
import { app, router, store } from "../client/index"

export default context => {
  return new Promise((resolve, reject) => {
    // set server-side router's location
    router.push(context.url)

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()

      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }

      // resolve(app)
      Promise.all(
        matchedComponents.map(Component => {
          // server request
          if (Component.asyncData) {
            return Component.asyncData({
              store,
              route: router.currentRoute
            })
          }
        })
      )
        .then(() => {
          // REF: https://vue-meta.nuxtjs.org/guide/ssr.html#add-vue-meta-to-the-context
          context.meta = app.$meta()
          context.state = store.state
          resolve(app)
        })
        .catch(reject)
    }, reject)
  })
}
