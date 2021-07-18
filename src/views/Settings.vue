<template lang="pug">
#settings.w-100.h-100
  b-container
    h3 鈴聲設定
    b-table(:items='items' :fields='fields' @row-clicked='select')
      template(#cell(src)='data')
        audio(controls :src='require("../assets/"+data.value)')
      template(#cell(select)='data')
        font-awesome-icon(:icon='["fas","check"]' v-if='sound === data.item.src')
</template>

<script>
export default {
  name: 'Settings',
  data () {
    return {
      items: [
        { name: '鈴聲', src: 'alarm.mp3' },
        { name: '鈴聲2', src: 'yay.mp3' }
      ],
      fields: [
        { key: 'name', label: '名稱' },
        { key: 'src', label: '試聽' },
        { key: 'select', label: '選擇' }
      ]
    }
  },
  computed: {
    sound () {
      return this.$store.state.sound
    }
  },
  methods: {
    select (item) {
      this.$store.commit('selectSound', item.src)
    }
  }
}
</script>
