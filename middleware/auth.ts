export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser()

  if (!user.value && !['/register', '/auth', '/confirm'].includes(to.path)) {
    return navigateTo('/auth')
  }
})
