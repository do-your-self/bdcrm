import * as types from './types.js'

const mutations = {
  [types.LOGIN]: (state, data) => {
    sessionStorage.setItem('login', JSON.stringify(data))
    state.token = data.token
  },
  [types.LOGOUT]: (state, data) => {
    sessionStorage.removeItem('login')
    sessionStorage.removeItem('user')
    state.user = {}
    state.token = null
  },
  [types.SELECTED]: (state, data) => {
    state.selected = data
  },
  [types.BASEINFO]: (state, data) => {
    sessionStorage.setItem('baseInfo', JSON.stringify(data))
    state.baseInfo = data.form
  },
  [types.FILTER]: (state, data) => {
    sessionStorage.setItem('filter', JSON.stringify(data.form))
    state.filter = {...state.filte, ...data.form}
  },
  [types.USER]: (state, data) => {
    sessionStorage.setItem('user', JSON.stringify(data))
    state.user = data
  },
  [types.VERSIONID]: (state, data) => {
    sessionStorage.setItem('versionId', data.versionId)
    state.versionId = data.versionId
  },
  [types.BACKPATH]: (state, data) => {
    sessionStorage.setItem('backPath', JSON.stringify(data.payload))
    state.backPath = data.payload
  }
}

export default mutations
