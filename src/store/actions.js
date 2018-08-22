import * as types from './types.js'

// actions常用于异步更改状态。也就是说它一般用来先发送请求，然后再commit

export default {
  Login ({ commit }, data) {
    commit(types.LOGIN, data.login)
  },
  Selected ({ commit }, data) {
    commit(types.SELECTED, data)
  },
  BaseInfo ({ commit }, data) {
    commit(types.BASEINFO, data)
  },
  Filter ({ commit }, data) {
    commit(types.FILTER, data)
  },
  User ({ commit }, data) {
    commit(types.USER, data.user)
  },
  VersionId ({ commit }, data) {
    commit(types.VERSIONID, data)
  },
  BackPath ({ commit }, data) {
    commit(types.BACKPATH, data)
  }
}
