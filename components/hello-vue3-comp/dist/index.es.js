import { defineComponent as l, openBlock as t, createElementBlock as n } from "vue";
const p = /* @__PURE__ */ l({
  __name: "HelloVue3Comp",
  setup(e) {
    const o = () => {
      alert("Hello Vue3 Comp");
    };
    return (c, u) => (t(), n("button", {
      class: "c-HelloVue3Comp",
      type: "button",
      onClick: o,
      value: "hello"
    }, "hello vue3 comp"));
  }
});
const m = {
  install(e, o) {
    e.component("HelloVue3Comp", p);
  }
};
export {
  m as default
};
