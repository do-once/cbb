import { defineComponent as l, onMounted as t, ref as a, openBlock as p, createElementBlock as s } from "vue";
const c = /* @__PURE__ */ l({
  __name: "UniversalVueCompExample",
  setup(o) {
    t(() => {
      console.log("mounted");
    });
    let e = a(!1);
    const n = () => {
      e.value = !e.value;
    };
    return (m, u) => (p(), s("button", {
      class: "doonce-UniversalVueCompExample",
      type: "button",
      onClick: n,
      value: "hello"
    }, " UniversalVueCompExample "));
  }
});
const r = {
  install(o, e) {
    o.component("DoonceUniversalVueCompExample", c);
  }
};
export {
  r as default
};
