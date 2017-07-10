<template>
  <q-layout>
    <div slot="header" class="toolbar">
      <q-toolbar-title :padding="0">
        Sap Objectifier
      </q-toolbar-title>
    </div>

    <!--
      Replace following "div" with
      "<router-view class="layout-view">" component
      if using subRoutes
    -->
    <div class="layout-view">
      <phips-tree
        :model="myModel"
        contract-html="<i>remove_circle</i>"
        expand-html="<i>add_circle</i>"
      ></phips-tree>
    <div class="flex row justify-center" style="padding-bottom: 140px">
      <button class="primary" @click="export2Obj">export</button>
    </div>
    </div>

  </q-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
// import { Sap2Obj } from '../SapObjectifier'
import PhipsTree from './PhipsTree'
export default {
  components: {PhipsTree},
  data () {
    return {
      myArr: [[['a', 'bla']], ['', 'b', [12, 45645, 0, 'yetanotherarray', ['holy', 'shit', 'this', 'is', 'super', 'duper', 'annoying']], 'c'], 'na', 'servas', 'das', 'is', 'muehsam', ['this', 'is', 'dificult']],
      myModel: [],
      sArr: []
    }
  },
  methods: {
    ...mapActions([
      'setArray'
    ]),
    ...mapGetters([
      'getModel',
      'getResult'
    ]),
    export2Obj: function () {
      console.log(this.getResult())
    }
  },
  computed: {
  },
  mounted () {
    this.setArray(this.myArr)
    this.myModel = this.getModel()
  }
}
</script>

<style lang=stylus>

</style>
