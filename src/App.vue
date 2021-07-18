<template lang="pug">
#app
  #left
    b-container
      b-navbar(toggable='lg' type='light' variant='white')
        b-container
          b-navbar-brand.title01 Pomodoro
    Clock
  #right
    #btnBar(v-b-toggle.sidebar-right)
      font-awesome-icon.chevron(:icon='["fas", "chevron-left"]')
    b-nav.menu.h-100.justify-content-center.align-items-center(vertical variant="danger")
      b-nav-item(to='/list').action.actionRed
        font-awesome-icon.nav-item(:icon='["fas", "list"]')
      b-nav-item(to='/analysis')
        font-awesome-icon.nav-item(:icon='["fas", "chart-bar"]')
      b-nav-item(to='/settings')
        font-awesome-icon.nav-item(:icon='["fas", "volume-up"]')
    b-sidebar#sidebar-right(right)
      keep-alive
        router-view
</template>

<script>
import Sidebar from './views/Sidebar.vue'
import List from './views/List.vue'
import Home from './views/Home.vue'
import Clock from './views/Clock.vue'
import Analysis from './views/Analysis.vue'
import Settings from './views/Settings.vue'
export default {
  name: 'App',
  components: {
    Sidebar,
    List,
    Clock,
    Home,
    Analysis,
    Settings
  }
}
</script>
