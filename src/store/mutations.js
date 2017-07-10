import { Sap2Obj, renamer } from '../SapObjectifier'

const mutations = {
  SetArray (state, newArray) {
    state.originalArray = newArray
    var S = new Sap2Obj(newArray)
    var res = S.getResult()
    state.translatedObj = res
    state.myModel = state.translatedObj.getChildren()
  },
  SetName (state, obj) {
    var newname = obj.name
    var identifier = obj.id
    renamer(state.translatedObj, identifier, newname)
  }
}

export { mutations }
