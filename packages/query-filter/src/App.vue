<template>
  <div style="padding: 20px">
    <queryFilter :data="searchData" :span="6"></queryFilter>
  </div>
</template>

<script>

export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      searchData: [
        {
          type: "input",
          label: "姓名",
          name: "name",
          itemProps: {
            placeholder: "请输入姓名",
          },
        },
        {
          type: "input",
          label: "年龄",
          name: "age",
          itemProps: {
            placeholder: "请输入年龄",
          },
        },
        {
          type: "select",
          label: "性别",
          name: "gender",
          itemProps: {
            textField: "text",
            valueField: "value",
            option: [
              {
                value: "1",
                text: "男",
              },
              {
                value: "2",
                text: "女",
              },
            ],
          },
        },
        {
          type: "select",
          label: "性别",
          name: "gender",
          itemProps: {
            textField: "text",
            valueField: "value",
            option: [
              {
                value: "1",
                text: "男",
              },
              {
                value: "2",
                text: "女",
              },
            ],
          },
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
