<template lang="pug">
#sidebar.vh-100.d-flex.flex-row.justify-content-between.text-white
  #btnBar(v-b-toggle.sidebar-right)
    font-awesome-icon.chevron(:icon='["fas", "chevron-left"]')
  b-nav.menu.h-100.justify-content-center.align-items-center(vertical variant="danger")
    b-nav-item(to='/list').action.actionRed
      font-awesome-icon.nav-item(:icon='["fas", "list"]')
    b-nav-item(to='/analysis')
      font-awesome-icon.nav-item(:icon='["fas", "chart-bar"]')
    b-nav-item(to='/settings')
      font-awesome-icon.nav-item(:icon='["fas", "volume-up"]')
  b-col(cols="10").mt-5
    router-view
</template>
