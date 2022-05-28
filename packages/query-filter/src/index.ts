import queryFilter from "./queryFilter.vue";

const components = [queryFilter];

const install = (Vue) => {
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
};

export default {
  install,
};
