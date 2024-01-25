export const usePageStore = defineStore('pageStore', {
  state: () => ({
    page: '',
  }),
  actions: {
    update(newVal: any) {
      this.page = newVal
    },
  },
})
