import { defineComponent as l, openBlock as n, createElementBlock as t } from "vue";
const c = /* @__PURE__ */ l({
  __name: "HelloVue3Comp",
  setup(e) {
    const o = () => {
      alert("Hello Vue3 Comp");
    };
    return (p, u) => (n(), t("button", {
      class: "doonce-HelloVue3Comp",
      type: "button",
      onClick: o,
      value: "hello"
    }, "hello vue3 comp"));
  }
});
const m = {
  install(e, o) {
    e.component("DoonceHelloVue3Comp", c);
  }
};
export {
  m as default
};
