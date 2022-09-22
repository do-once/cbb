import { defineComponent as n, openBlock as l, createElementBlock as t } from 'vue'
const _ = /* @__PURE__ */ n({
  __name: 'HelloVue3Comp',
  setup(e) {
    return (o, p) => (l(), t('h1', null, 'hello'))
  }
})
const m = {
  install(e, o) {
    e.component('HelloVue3Comp', _)
  }
}
export { m as default }
