const actions = {
  setArray ({ commit }, newarr) {
    commit('SetArray', newarr)
  },
  setObj ({ commit }, newobj) {
    commit('SetObj', newobj)
  },
  setName ({ commit }, obj) {
    commit('SetName', obj)
  }
}

export { actions }
