<template lang="pug">
b-container
  #home.h-100.d-flex.flex-row
    #menu.vw-25.vh-100.d-flex.flex-row.justify-content-between.text-white
      #btnBar(v-b-toggle.sidebar-right)
        font-awesome-icon.chevron(:icon='["fas", "chevron-left"]')
      b-nav.menu.h-100.justify-content-center.align-items-center(vertical variant="danger")
        b-nav-item(to='/').addRed
          font-awesome-icon.nav-item(:icon='["fas", "list"]')
        b-nav-item(to='/analysis')
          font-awesome-icon.nav-item(:icon='["fas", "chart-bar"]')
        b-nav-item(to='/settings')
          font-awesome-icon.nav-item(:icon='["fas", "volume-up"]')
    b-container#homeList
      b-row
        b-col
          h3 To do list
          b-form-group(invalid-feedback='請至少輸入兩個字' :state='state')
            b-form-input(v-model='newitem' :state='state' placeholder='add a new mission' trim @keydown.enter='additem')
          hr
          div
            b-card(no-body)
              b-tabs(card)
                b-tab(no-body title='To Do')
                  b-card
                    b-table(:items='items' hover)
                      template(#cell(action)='data')
                        span(v-if='!data.item.edit').d-flex.flex-row-reverse
                          div(@click='editlist(data.index)' variant='success').d-inline-block
                            font-awesome-icon(:icon='["fas", "pen"]')
                          div(@click='dellist(data.index)' variant='danger').d-inline-block.mr-4
                            font-awesome-icon(:icon='["fas", "times"]')
                        span(v-else)
                          b-btn(@click='changelist(data.index)' variant='success')
                            font-awesome-icon(:icon='["fas", "check"]')
                          b-btn(@click='cancellist(data.index)' variant='danger')
                            font-awesome-icon(:icon='["fas", "undo"]')
                    b-table(:items='list' :fields='listfields')
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
                        span(v-if='!data.item.edit').d-flex.flex-row-reverse
                          div(@click='editlist(data.index)' variant='success').d-inline-block
                            font-awesome-icon(:icon='["fas", "pen"]')
                          div(@click='dellist(data.index)' variant='danger').d-inline-block.mr-4
                            font-awesome-icon(:icon='["fas", "times"]')
                        span(v-else)
                          b-btn(@click='changelist(data.index)' variant='success')
                            font-awesome-icon(:icon='["fas", "check"]')
                          b-btn(@click='cancellist(data.index)' variant='danger')
                            font-awesome-icon(:icon='["fas", "undo"]')
                b-tab(no-body title='Done')
                  b-card
                    b-table-simple
                      thead
                        tr
                          th done
                          th edit
                      tbody
                        tr(v-for='(item, idx) in finished' :key='idx')
                          td {{ item }}
                          td
                            div(@click='delfinish(idx)' variant='danger')
                              font-awesome-icon(:icon='["fas", "times"]')
</template>

<script>
export default {
  data () {
    return {
      items: [
        { name: 'First thing to do.', action: '' },
        { name: 'Second thing to do.', action: '' },
        { name: 'Third thing to do.', action: '' }
      ],
      newitem: '',
      listfields: [
        { key: 'name', label: 'To do' },
        { key: 'action', label: '' }
      ]
    }
  },
  computed: {
    state () {
      if (this.newitem.length === 0) {
        return null
      } else if (this.newitem.length < 2) {
        return false
      } else {
        return true
      }
    },
    list () {
      return this.$store.getters.list.map(item => {
        if (item.model.length < 2) {
          item.state = false
        } else {
          item.state = true
        }
        return item
      })
    },
    finished () {
      return this.$store.state.finished
    }
  },
  methods: {
    additem () {
      if (this.state) {
        this.$store.commit('addList', this.newitem)
        this.newitem = '' // 東西清空
      } else {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '必須要兩個字以上'
        })
      }
    },
    editlist (index) {
      this.$store.commit('editList', index)
    },
    changelist (index) {
      if (this.list[index].state) {
        this.$store.commit('changeList', index)
      }
    },
    cancellist (index) {
      this.$store.commit('cancelList', index)
    },
    dellist (index) {
      this.$store.commit('delList', index)
    },
    delfinish (index) {
      this.$store.commit('delFinish', index)
    }
  }
}
</script>
