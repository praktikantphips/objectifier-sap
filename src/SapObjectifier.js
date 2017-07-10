function Sap2Obj (arr) {
  this.myArr = arr
  this.nodes = []
  function nested2json (arr, obj, mapping, index) {
    var newMapping = []
    var name = ''
    newMapping = mapping.slice(0)
    if (typeof index !== 'undefined') {
      newMapping.push(index)
      name = 'idx_' + (newMapping.map(function (x) {
        return x.toString()
      })).join('_')
    }
    if (!isArray(arr)) {
      var finalObj = new SapLeaf(newMapping, index, name, arr)
      obj.push(finalObj)
    }
    else {
      name = 'group' + name
      obj[name] = new SapArray(newMapping, index, name)
      arr.forEach(function (x, idx) {
        nested2json(x, obj[name], newMapping, idx)
      })
    }
    return obj
  }

  function isArray (x) {
    return Array.isArray(x)
  }

  this.getResult = function () {
    var root = new SapArray([], [], '__root')
    var res = nested2json(this.myArr, root, [])
    return res
  }
}

function SapLeaf (mapping, parentIdx, name, value) {
  this.mapping = mapping
  this.parentIdx = parentIdx
  this.name = name
  this.value = value
  this.isLeaf = true
  this.expanded = true
  this.handler = function () {
  }
  this.getChildren = function () {
    return []
  }
  this.getLocation = function () {
    return (mapping.map(function (x) { return '[' + x.toString() + ']' })).join('')
  }
  this.getValue = function () {
    if (typeof this.value === 'string') {
      return '"' + this.value + '"'
    }
    else {
      return this.value
    }
  }
}

function SapArray (mapping, parentIdx, name) {
  this.mapping = mapping
  this.parentIdx = parentIdx
  this.name = name
  this.container = []
  this.expanded = true
  this.push = function (el) {
    this.container.push(el)
  }
  this.isLeaf = false
  this.handler = function () {
  }
  this.getChildren = function () {
    var res = []
    this.container.forEach(function (el) { res.push(el) })
    if (this.name === '__root') {
      res.push(this.group)
    }
    else {
      for (var key in this) {
        if (key.startsWith('groupidx')) {
          res.push(this[key])
        }
      }
      res.sort(function (x, y) {
        return x.parentIdx - y.parentIdx
      })
    }
    return res
  }
  this.getLocation = function () {
    return (mapping.map(function (x) { return '[' + x.toString() + ']' })).join('')
  }
  this.getValue = function () {
    return undefined
  }
  this.isPureArray = function () {
    if (this.name === '__root') {
      return false
    }
    else {
      var kids = this.getChildren()
      return kids.every(function (el) { return el.isLeaf })
    }
  }
}

var renamer = function (obj, identifier, newname) {
  var id = obj.getLocation
  if (id === identifier) {
    obj.name = newname
  }
  else {
    var kids = obj.getChildren()
    kids.forEach(function (kid) {
      renamer(kid, identifier, newname)
    })
  }
}

var makeObj = function (translatedObj) {
  var temp = {}
  var buildObj = function (obj, newobj) {
    var kids = obj.getChildren()
    kids.forEach(function (kid) {
      if (kid.isLeaf) {
        newobj[kid.name] = kid.value
      }
      else if (kid.isPureArray()) {
        newobj[kid.name] = []
        var elements = kid.container
        elements.forEach(function (el) {
          newobj[kid.name].push(el.value)
        })
      }
      else {
        newobj[kid.name] = buildObj(kid, {})
      }
    })
    return newobj
  }
  return buildObj(translatedObj, temp)
}

export { Sap2Obj, renamer, makeObj }
