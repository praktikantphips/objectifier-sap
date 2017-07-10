<template>
  <li class="q-tree-item">
    <div
      class="row inline items-center"
      :class="{'q-tree-link': model.handler || isExpandable}"
    >
      <div class="q-tree-label relative-position row items-center" v-ripple.mat>
        <!--
        <q-icon v-if="model.icon" :name="model.icon" class="on-left"></q-icon>
        -->
        <div class="flex column">
          <div v-if="!belongsToPureArray" class="tiny">
            <input v-model="name" class="tiny" @blur="changeName"></input>
          </div>
          <div v-else>
            <code class="tiny text-faded">Array element ({{model.parentIdx}})</code>
          </div>
          <div class="tiny">
            <div v-show="model.isLeaf">
              <code class="tiny text-faded" style="max-width: 90px">value:
                <code class=text-primary v-html="model.getValue()"></code>
              </code>
              </br>
            </div>
            <code class="tiny text-faded">location: {{model.getLocation()}}</code>
          </div>
        </div>
      </div>
      <span v-if="isExpandable" class="on-right">
        <span v-if="model.expanded">
          <i class="material-icons text-primary" @click="toggle">remove_circle</i>
        </span>
        <span v-else>
          <i class="material-icons text-primary" @click="toggle">add_circle</i>
        </span>
      </span>
    </div>
    <q-transition name="slide">
      <ul v-show="isExpandable && model.expanded">
        <p-tree-item v-for="item in model.getChildren()" :key="item" :model="item" :contract-html="contractHtml" :expand-html="expandHtml" :belongsToPureArray="model.isPureArray()"></p-tree-item>
      </ul>
    </q-transition>
  </li>
</template>

<script>
import { QIcon, QSlideTransition, Ripple } from 'quasar'
import { mapActions } from 'vuex'
export default {
  name: 'p-tree-item',
  components: {
    QIcon,
    QSlideTransition
  },
  directives: {
    Ripple
  },
  props: ['model', 'contractHtml', 'expandHtml', 'belongsToPureArray', 'isPureArray'],
  data () {
    return {
      checked: false,
      name: this.model.name

    }
  },
  methods: {
    ...mapActions([
      'setName'
    ]),
    changeName: function () {
      var id = this.model.getLocation
      var info = {}
      info.id = id
      info.name = this.name
      this.setName(info)
    },
    toggle () {
      if (typeof this.model.handler === 'function') {
        this.model.handler(this.model)
      }
      if (this.isExpandable) {
        this.model.expanded = !this.model.expanded
      }
    }
  },
  computed: {
    isExpandable () {
      return this.model.getChildren() && this.model.getChildren().length
    }
  }
}
</script>
<style scoped>
.tiny-text {
  font-size: 10px;
}
.tiny {
  font-size: 12px;
}
pre {
  white-space: pre-wrap;
}
</style>
