<template>
  <div class="q-tree">
    <ul>
      <p-tree-item
        v-for="item in model"
        :key="item"
        :model="item"
        :contract-html="contractHtml"
        :expand-html="expandHtml"
        :belongToPureArray="item.isPureArray()"
      ></p-tree-item>
    </ul>
  </div>
</template>

<script>
import PTreeItem from './PTreeItem.vue'
export default {
  name: 'phips-tree',
  components: {
    PTreeItem
  },
  props: {
    model: {
      type: Array,
      required: true
    },
    contractHtml: {
      type: String,
      required: true,
      default: '<i class="material-icons color-primay">remove_circle</i>'
    },
    expandHtml: {
      type: String,
      required: true,
      default: '<i class="material-icons color-primary">add_circle</i>'
    }
  }
}
</script>
<style lang=stylus>
.q-tree
  li
    margin 0
    list-style-type none
    position relative
    padding 0px 50px 0

    &:before
      content ''
      position absolute
      top 0
      width 1px
      height 100%
      right auto
      left -25px
      border-left 1px solid $tree-connector-color
      bottom 50px

    &:after
      content ''
      position absolute
      top 20px
      width 75px
      height 20px
      right auto
      left -25px
      border-top 1px solid $tree-connector-color

    &:last-child:before
      height 20px

  // Remove connectors before root
  > ul > li
    &:after, &:before
      border 0

.q-tree-link
  display inline-block
  cursor pointer
  .q-tree-label:active
    color $tree-highlight-color
    background $tree-highlight-background

  span:nth-child(2) i
    color $tree-connector-color

body.desktop .q-tree-link .q-tree-label:hover
  color $tree-highlight-color
  background $tree-highlight-background

.q-tree-label
  padding $tree-label-padding
  border-radius $tree-label-border-radius
  .q-icon
    color primary
    font-size $tree-label-icon-font-size
</style>
