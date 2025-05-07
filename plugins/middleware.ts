export default defineNuxtPlugin(() => {
  addRouteMiddleware('global-auth', (to) => {
    const user = useSupabaseUser()
    const publicPages = ['/', '/register', '/auth', '/confirm']

    // If it's a public page, allow access
    if (publicPages.includes(to.path)) {
      return
    }

    // For protected pages, redirect unauthenticated users to login
    if (!user.value) {
      return navigateTo('/auth')
    }
  }, { global: true })
})
