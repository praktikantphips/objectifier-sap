import { makeObj } from '../SapObjectifier'
const getters = {
  getArray: state => {
    return state.originalArray
  },
  getObj: state => {
    return state.translatedObj
  },
  getResult: state => {
    return makeObj(state.translatedObj)
  },
  getModel: state => {
    return state.myModel
  }
}

export { getters }
