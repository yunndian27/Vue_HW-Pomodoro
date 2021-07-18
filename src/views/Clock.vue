<template lang="pug">
#clock.w-100.h-100
  b-container.h-75.mt-5.text-center.d-flex.justify-content-center.align-items-center
    b-row.w-100.d-flex.flex-column.flex-md-row.justify-content-center.align-items-center
      b-col(cols='12' md='6').d-flex.justify-content-center
        b-row.w-100.d-flex.flex-column.justify-content-center.align-items-center
          b-col(cols='12').d-flex.justify-content-center
            .circleRun.d-flex.flex-column.align-items-center.justify-content-center
              // h4 {{ currentText }}
              h1.timetext {{ timeText }}
              h4.redTxt {{ timestamp }}
          b-col(cols='12').d-flex.justify-content-center.mt-2
            .btnControl.d-flex.flex-row.blueTxt
              div(variant='primary' v-if='status !== 1' @click='start').mr-3
                font-awesome-icon(:icon='["fas", "play"]')
              div(variant='primary' v-if='status === 1' @click='pause').mr-3
                font-awesome-icon(:icon='["fas", "pause"]')
              div(variant='primary' v-if='current.length > 0' @click='finish(true)')
                font-awesome-icon(:icon='["fas", "step-forward"]')
      b-col(cols='12' md='6').mt-3.mt-md-0
        // h1 待辦事項
        h4.firstDo {{ currentText }}
        b-table(:items='items' hover)
          template(#cell(action)='data')
            div
              font-awesome-icon(:icon='["fas", "play"]')
        b-table(:items='list' :fields='listfields' hover)
          template(#cell(name)='data')
            b-form-input(
              v-if='data.item.edit'
              v-model='data.item.model'
              trim
              :state='data.item.state'
              @keydown.enter='changelist(data.index)'
              @keydown.esc='cancelist(deat.index)'
            )
            span(v-else) {{ data.value }}
          template(#cell(action)='data')
            div
              font-awesome-icon(:icon='["fas", "play"]')
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      items: [
        { name: 'First thing to do.', action: '' },
        { name: 'Second thing to do.', action: '' },
        { name: 'Third thing to do.', action: '' }
      ],
      timer: 0,
      listfields: [
        { key: 'name', label: '名稱' },
        { key: 'action', label: '操作' }
      ],
      timestamp: ''
    }
  },
  computed: {
    status () {
      return this.$store.state.status
    },
    list () {
      return this.$store.state.list
    },
    current () {
      return this.$store.state.current
    },
    currentText () {
      let text = this.current
      if (text.length === 0) {
        if (this.list.length === 0) {
          text = 'add a new mission'
        } else {
          text = 'First thing to do'
        }
      }
      return text
    },
    timeleft () {
      return this.$store.state.timeleft
    },
    timeText () {
      const m = Math.floor(this.timeleft / 60)
      const s = Math.floor(this.timeleft % 60)
      return `${m} : ${s}`
    }
  },
  created () {
    setInterval(this.getNow, 1000)
  },
  methods: {
    pause () {
      clearInterval(this.timer)
      this.$store.commit('changeStatus', 2)
    },
    start () {
      if (this.status !== 2 && this.list.length > 0) {
        this.$store.commit('start')
      }
      if (this.current.length > 0) {
        this.$store.commit('changeStatus', 1)
        this.timer = setInterval(() => {
          this.$store.commit('countdown')
          if (this.timeleft <= -1) {
            this.finish(false)
          }
        }, 1000)
      }
    },
    finish (skip) {
      clearInterval(this.timer)
      this.$store.commit('changeStatus', 0)
      this.$store.commit('addFinish')

      if (!skip) {
        const audio = new Audio()
        audio.src = require('../assets/' + this.$store.state.sound)
        audio.play()
      }

      if (this.list.length > 0) {
        this.start()
      } else {
        this.$swal({
          icon: 'success',
          title: '結束'
        })
      }
    },
    getNow () {
      const today = new Date()
      const date = today.getFullYear() + '.' + (today.getMonth() + 1) + '.' + today.getDate()
      const time = today.getHours() + ':' + today.getMinutes()
      const dateTime = date + ' ' + time
      this.timestamp = dateTime
    }
  }
}
</script>
