export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path !== from.path)
    localStorage.setItem('different', 'true')
})
