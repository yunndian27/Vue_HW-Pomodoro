import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

const time = parseInt(process.env.VUE_APP_TIME)
const timeBreak = parseInt(process.env.VUE_APP_TIME_BREAK)

Vue.use(Vuex)

export default new Vuex.Store({
  state: { // vuex 有哪些資料
    sound: 'alarm.mp3',
    list: [],
    finished: [],
    current: '',
    timeleft: time,
    isBreak: false,
    // 0 = 停止
    // 1 = 倒數中
    // 2 = 暫停
    status: 0
  },
  mutations: { // 改 vuex 的 function，一定要呼叫 function 去修改
    selectSound (state, data) {
      state.sound = data
    },
    addList (state, data) {
      state.list.push({
        name: data,
        edit: false,
        model: data
      })
    },
    editList (state, data) {
      state.list[data].edit = true
    },
    changeList (state, data) {
      state.list[data].name = state.list[data].model
      state.list[data].edit = false
    },
    cancelList (state, data) {
      state.list[data].model = state.list[data].name
      state.list[data].edit = false
    },
    delList (state, data) {
      state.list.splice(data, 1)
    },
    start (state) {
      if (state.isBreak) {
        state.current = 'TAKE A BREAK'
      } else {
        state.current = state.list.shift().name
      }
    },
    changeStatus (state, data) {
      state.status = data
    },
    countdown (state) {
      state.timeleft--
    },
    addFinish (state) {
      if (!state.isBreak) {
        state.finished.push(state.current)
      }
      state.current = ''
      if (state.list.length > 0) {
        state.isBreak = !state.isBreak
      }
      state.timeleft = state.isBreak ? timeBreak : time
    },
    delFinish (state, data) {
      state.list.splice(data, 1)
    }
  },
  getters: {
    list (state) {
      return state.list
    }
  },
  actions: { // 改 state 的東西，可以執行非同步(如ajax的)
  },
  modules: { // vuex 的資料可以拆成一個個模組
  },
  plugins: [
    createPersistedState({
      key: 'pomodoro'
    })
  ]
})
