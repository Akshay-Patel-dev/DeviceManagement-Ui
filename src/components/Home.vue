<template lang="">
    <div>
        
    </div>
</template>
<script >
import { useAppStore } from '../store/app'
export default {
    name : 'Home',
    setup() {
    const appstore = useAppStore()
    return { appstore }
  },

  beforeRouteLeave(to, from, next) {
    if (to.path === '/') {
      this.appstore.logout();
    }
    next()
  }
}
</script>
