<template lang="pug">
#list.w-100.h-100
  b-container
    b-row
      b-col
        h3 To do list
        b-form-group(invalid-feedback='請至少輸入兩個字' :state='state')
          b-form-input(v-model='newitem' :state='state' placeholder='add a new mission' trim @keydown.enter='additem')
        //- b-btn(varant='primary' @click='additem' ) 新增
        hr
        div
          b-card(no-body)
            b-tabs(card)
              b-tab(no-body title='To Do')
                b-card
                  b-table(:items='items' hover)
                    template(#cell(name)='data')
                        div(
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
  name: 'List',
  data () {
    return {
      items: [
        { name: 'First thing to do.', action: '' },
        { name: 'Second thing to do.', action: '' },
        { name: 'Third thing to do.', action: '' }
      ],
      newitem: '',
      listfields: [
        { key: 'name', label: '' },
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
