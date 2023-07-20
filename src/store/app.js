// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    isAuthenticated: false,
  }),
  actions:{
    login() {
      //  login logic here
      this.isAuthenticated = true
    },
    logout() {
      //  logout logic here
      this.isAuthenticated = false
    }
  }
})
