<template>
  <div class="wrapper" v-if="dataLength > 0">
    <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch" :layout="layout">
      <a-row :gutter="gutter">
        <a-col
          v-for="(item, i) in searchData"
          :key="item.name"
          :span="getItemSpan(item)"
          :style="{ display: i < count ? 'block' : 'none' }"
        >
          <a-form-item
            :style="{ display: layout === 'vertical' ? 'block' : 'flex' }"
            v-if="item.type.toLowerCase() === 'text' || item.type.toLowerCase() === 'input'"
            :label="item.label || item.title"
            v-bind="
              item.formItemProps || {
                labelCol: { flex: labelFlexStyle },
                wrapperCol: { style: { maxWidth: `calc(100%-${labelWidth})` } },
              }
            "
          >
            <a-input
              v-bind="item.itemProps"
              :placeholder="(item.itemProps && item.itemProps.placeholder) || '请输入'"
              v-decorator.trim="[
                item.name || item.dataIndex, // 查询参数字段
                {
                  ...item.decoratorProps,
                  rules: [
                    {
                      required: (item.itemProps && item.itemProps.borderRequired) || false,
                      message: (item.itemProps && item.itemProps.errorMessage) || '请选择',
                    },
                  ],
                },
              ]"
            />
          </a-form-item>
          <a-form-item
            :style="{
              display: layout === 'vertical' ? 'block' : 'flex',
              paddingTop: '4px',
            }"
            v-if="item.type.toLowerCase() === 'radiogroup'"
            :label="item.label || item.title"
            v-bind="
              item.formItemProps || {
                labelCol: { flex: labelFlexStyle },
                wrapperCol: { style: { maxWidth: `calc(100%-${labelWidth})` } },
              }
            "
          >
            <a-radio-group
              v-decorator="[
                item.name || item.dataIndex,
                {
                  ...item.decoratorProps,
                },
              ]"
              v-bind="item.itemProps"
              :placeholder="(item.itemProps && item.itemProps.placeholder) || '请选择'"
              v-if="item.itemProps"
            >
              <a-radio-button
                v-for="i in item.itemProps.option || []"
                :key="i[item.itemProps.valueField ? item.itemProps.valueField : 'value'] + ''"
                :value="i[item.itemProps.valueField ? item.itemProps.valueField : 'value'] + ''"
                >{{ i[item.itemProps.textField] || i.text }}</a-radio-button
              >
            </a-radio-group>
          </a-form-item>
          <a-form-item
            :style="{
              display: layout === 'vertical' ? 'block' : 'flex',
              paddingTop: '4px',
            }"
            v-if="item.type.toLowerCase() === 'flaggroup'"
            :label="item.label || item.title"
            v-bind="
              item.formItemProps || {
                labelCol: { flex: labelFlexStyle },
                wrapperCol: { style: { maxWidth: `calc(100%-${labelWidth})` } },
              }
            "
          >
            <a-radio-group
              v-decorator="[
                item.name || item.dataIndex,
                {
                  ...item.decoratorProps,
                },
              ]"
              v-bind="item.itemProps"
              :placeholder="(item.itemProps && item.itemProps.placeholder) || '请选择'"
              v-if="item.itemProps"
            >
              <a-radio-button
                v-for="i in item.itemProps.option || []"
                :key="i[item.itemProps.valueField ? item.itemProps.valueField : 'value'] + ''"
                :value="i[item.itemProps.valueField ? item.itemProps.valueField : 'value'] + ''"
              >
                <span v-if="i.value == '0'">{{ i.value == '0' ? '全部' : '' }}</span>
                <i v-else :style="{ color: i.color }" class="el-icon-s-flag"></i>
              </a-radio-button>
            </a-radio-group>
          </a-form-item>
          <a-form-item
            :style="{ display: layout === 'vertical' ? 'block' : 'flex' }"
            v-if="item.type.toLowerCase() === 'datepicker'"
            :label="item.label || item.title"
            v-bind="
              item.formItemProps || {
                labelCol: { flex: labelFlexStyle },
                wrapperCol: { style: { maxWidth: `calc(100%-${labelWidth})` } },
              }
            "
          >
            <a-date-picker
              style="width: 100%"
              v-bind="item.itemProps"
              v-decorator="[
                item.name || item.dataIndex,
                {
                  ...item.decoratorProps,
                  rules: [
                    {
                      required: (item.itemProps && item.itemProps.borderRequired) || false,
                      message: (item.itemProps && item.itemProps.errorMessage) || '请选择',
                    },
                  ],
                },
              ]"
            />
          </a-form-item>
          <div
            :style="{ display: layout === 'vertical' ? 'block' : 'flex' }"
            v-if="item.type.toLowerCase() === 'selectrangepicker'"
            :label="item.label || item.title"
            format="YYYY-MM-DD"
            v-bind="
              item.formItemProps || {
                labelCol: { flex: labelFlexStyle },
                wrapperCol: { style: { maxWidth: `calc(100%-${labelWidth})` } },
              }
            "
          >
            <div class="diycomponent-wrapper">
              <a-form-item>
                <a-select
                  style="width: 120px"
                  v-decorator="[
                    item.name || item.dataIndex,
                    {
                      ...item.selectDecoratorProps,
                    },
                  ]"
                  v-if="item.selectItemProps"
                  v-bind="item.selectItemProps"
                >
                  <a-select-option
                    v-for="i in item.selectItemProps.option || []"
                    :key="i[item.selectItemProps.valueField ? item.selectItemProps.valueField : 'value'] + ''"
                    :value="i[item.selectItemProps.valueField ? item.selectItemProps.valueField : 'value'] + ''"
                    >{{ i[item.selectItemProps.textField] || i.text }}</a-select-option
                  >
                </a-select>
              </a-form-item>
              <a-form-item>
                <a-range-picker
                  style="width: 100%"
                  v-bind="item.itemProps"
                  v-decorator="[
                    item.timeName || 'time',
                    {
                      ...item.decoratorProps,
                      rules: [
                        {
                          required: (item.itemProps && item.itemProps.borderRequired) || false,
                          message: (item.itemProps && item.itemProps.errorMessage) || '请选择',
                        },
                      ],
                    },
                  ]"
                />
              </a-form-item>
            </div>
          </div>
          <a-form-item
            :style="{ display: layout === 'vertical' ? 'block' : 'flex' }"
            v-if="item.type.toLowerCase() === 'rangepicker'"
            :label="item.label || item.title"
            format="YYYY-MM-DD"
            v-bind="
              item.formItemProps || {
                labelCol: { flex: labelFlexStyle },
                wrapperCol: { style: { maxWidth: `calc(100%-${labelWidth})` } },
              }
            "
          >
            <a-range-picker
              style="width: 100%"
              v-bind="item.itemProps"
              v-decorator="[
                item.name || item.dataIndex,
                {
                  ...item.decoratorProps,
                  rules: [
                    {
                      required: (item.itemProps && item.itemProps.borderRequired) || false,
                      message: (item.itemProps && item.itemProps.errorMessage) || '请选择',
                    },
                  ],
                },
              ]"
            />
          </a-form-item>
          <a-form-item
            :style="{ display: layout === 'vertical' ? 'block' : 'flex' }"
            v-if="item.type.toLowerCase() === 'monthpicker'"
            :label="item.label || item.title"
            format="YYYY-MM"
            v-bind="
              item.formItemProps || {
                labelCol: { flex: labelFlexStyle },
                wrapperCol: { style: { maxWidth: `calc(100%-${labelWidth})` } },
              }
            "
          >
            <a-month-picker
              style="width: 100%"
              v-bind="item.itemProps"
              v-decorator="[
                item.name || item.dataIndex,
                {
                  ...item.decoratorProps,
                  rules: [
                    {
                      required: (item.itemProps && item.itemProps.borderRequired) || false,
                      message: (item.itemProps && item.itemProps.errorMessage) || '请选择',
                    },
                  ],
                },
              ]"
            />
          </a-form-item>
          <a-form-item
            :style="{ display: layout === 'vertical' ? 'block' : 'flex' }"
            v-if="item.type.toLowerCase() === 'weekpicker'"
            :label="item.label || item.title"
            v-bind="
              item.formItemProps || {
                labelCol: { flex: labelFlexStyle },
                wrapperCol: { style: { maxWidth: `calc(100%-${labelWidth})` } },
              }
            "
          >
            <a-week-picker
              style="width: 100%"
              v-bind="item.itemProps"
              v-decorator="[
                item.name || item.dataIndex,
                {
                  ...item.decoratorProps,
                  rules: [
                    {
                      required: (item.itemProps && item.itemProps.borderRequired) || false,
                      message: (item.itemProps && item.itemProps.errorMessage) || '请选择',
                    },
                  ],
                },
              ]"
            />
          </a-form-item>
          <a-form-item
            :style="{ display: layout === 'vertical' ? 'block' : 'flex' }"
            v-if="item.type.toLowerCase() === 'inputnumber'"
            :label="item.label || item.title"
            v-bind="
              item.formItemProps || {
                labelCol: { flex: labelFlexStyle },
                wrapperCol: { style: { maxWidth: `calc(100%-${labelWidth})` } },
              }
            "
          >
            <a-input-number
              v-bind="item.itemProps"
              v-decorator.trim="[
                item.name || item.dataIndex,
                {
                  ...item.decoratorProps,
                  rules: [
                    {
                      required: (item.itemProps && item.itemProps.borderRequired) || false,
                      message: (item.itemProps && item.itemProps.errorMessage) || '请输入',
                    },
                  ],
                },
              ]"
            />
          </a-form-item>
          <a-form-item
            :style="{ display: layout === 'vertical' ? 'block' : 'flex' }"
            v-if="item.type.toLowerCase() === 'rangenumber'"
            :label="item.label || item.title"
            v-bind="
              item.formItemProps || {
                labelCol: { flex: labelFlexStyle },
                wrapperCol: { style: { maxWidth: `calc(100%-${labelWidth})` } },
              }
            "
          >
            <a-input-group compact>
              <a-form-item style="display: inline-block">
                <a-input
                  v-decorator="[
                    (item.name || item.dataIndex) + 'Min',
                    {
                      ...item.decoratorProps,
                      rules: [
                        {
                          required: (item.itemProps && item.itemProps.borderRequired) || false,
                          message: (item.itemProps && item.itemProps.errorMessage) || '请输入',
                        },
                      ],
                    },
                  ]"
                  style="flex: 1; text-align: center"
                  :placeholder="(item.itemProps && item.itemProps.minPlaceholder) || 'Minimum'"
                />
              </a-form-item>
              <a-form-item style="display: inline-block; vertical-align: initial">
                <a-input
                  style="
                    width: 30px;
                    border-left: 0;
                    pointer-events: none;
                    background-color: #fff !important;
                    margin-left: -3px;
                    border-radius: 0px;
                  "
                  :placeholder="(item.itemProps && item.itemProps.separator) || '~'"
                  disabled
                />
              </a-form-item>
              <a-form-item :style="{ display: 'inline-block' }">
                <a-input
                  v-decorator="[
                    (item.name || item.dataIndex) + 'Max',
                    {
                      ...item.decoratorProps,
                      rules: [
                        {
                          required: (item.itemProps && item.itemProps.borderRequired) || false,
                          message: (item.itemProps && item.itemProps.errorMessage) || '请输入',
                        },
                      ],
                    },
                  ]"
                  style="flex: 1; text-align: center; border-left: 0; border-radius: 0px 4px 4px 0px"
                  :placeholder="(item.itemProps && item.itemProps.maxPlaceholder) || 'Maximum'"
                />
              </a-form-item>
            </a-input-group>
          </a-form-item>
          <a-form-item
            :style="{ display: layout === 'vertical' ? 'block' : 'flex' }"
            v-if="item.type.toLowerCase() === 'select'"
            :label="item.label || item.title"
            v-bind="
              item.formItemProps || {
                labelCol: { flex: labelFlexStyle },
                wrapperCol: { style: { maxWidth: `calc(100%-${labelWidth})` } },
              }
            "
          >
            <a-select
              @dropdownVisibleChange="open => showPopup(open, item)"
              @select="value => handleSelectChange(value, item)"
              v-decorator="[
                item.name || item.dataIndex,
                {
                  ...item.decoratorProps,
                  rules: [
                    {
                      required: (item.itemProps && item.itemProps.borderRequired) || false,
                      message: (item.itemProps && item.itemProps.errorMessage) || '请选择',
                    },
                  ],
                },
              ]"
              v-bind="item.itemProps"
              :placeholder="(item.itemProps && item.itemProps.placeholder) || '请选择'"
              v-if="item.itemProps"
            >
              <a-select-option
                v-for="i in item.itemProps.option || []"
                :key="i[item.itemProps.valueField ? item.itemProps.valueField : 'value'] + ''"
                :value="i[item.itemProps.valueField ? item.itemProps.valueField : 'value'] + ''"
                >{{ i[item.itemProps.textField] || i.text }}</a-select-option
              >
            </a-select>
          </a-form-item>
        </a-col>
        <template v-if="dataLength < count">
          <a-col :span="innerSpan" v-for="i in fillColNum" :key="i + i"> </a-col>
        </template>
        <a-col :span="innerSpan" v-show="!isExpand" :style="{ textAlign: 'right', lineHeight: '40px' }">
          <a-button class="search-button" type="primary" html-type="submit" :loading="loading"> 筛选 </a-button>
          <a-button class="reset-button" @click="handleReset"> 重置 </a-button>
          <a class="collapse" @click="toggle" v-if="dataLength > firstLineLength - 1">
            {{ isExpand ? '收起' : '展开' }}
            <a-icon :type="isExpand ? 'up' : 'down'" />
          </a>
        </a-col>
      </a-row>
      <a-row v-show="isExpand">
        <a-col :span="24" :style="{ textAlign: 'right' }">
          <a-button class="search-button" type="primary" html-type="submit" :loading="loading"> 筛选 </a-button>
          <a-button class="reset-button" @click="handleReset"> 重置 </a-button>
          <a class="collapse" @click="toggle" v-if="dataLength > firstLineLength - 1">
            {{ isExpand ? '收起' : '展开' }}
            <a-icon :type="isExpand ? 'up' : 'down'" />
          </a>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  name: 'QueryFilter',
  props: {
    data: Array,
    gutter: {
      type: [String, Number],
      default: 24,
    },
    span: {
      type: [String, Number],
      default: 6,
    },
    collapseNum: {
      type: [String, Number],
      default: 1,
    },
    labelWidth: {
      type: [String, Number],
      default: 80,
    },
    layout: {
      type: String,
      default: 'horizontal',
    },
    expand: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      moment,
      isExpand: this.expand,
      form: this.$form.createForm(this, { name: 'query_filter' }),
      widthRange: 'large',
      innerSpan: this.span,
    }
  },
  computed: {
    dataLength() {
      return this.data.length
    },
    fillColNum() {
      return this.count - this.dataLength
    },
    firstLineLength() {
      return (24 / this.innerSpan) * this.collapseNum
    },
    count() {
      return this.isExpand ? this.dataLength : this.firstLineLength - 1
    },
    labelFlexStyle() {
      if (this.labelWidth && this.layout !== 'vertical' && this.labelWidth !== 'auto') {
        return `0 0 ${this.labelWidth}px`
      }
      return '0'
    },
    searchData() {
      return this.data
        .map(item => {
          return {
            order: 0,
            ...item,
          }
        })
        .sort((a, b) => b.order - a.order)
    },
  },
  updated() {},
  methods: {
    handleSearch(e, pageIndex = null, pageSize = null, togglePage = null) {
      e && e.preventDefault()
      this.form.validateFields((error, values) => {
        if (!error) {
          Object.keys(values).forEach(key => {
            values[key] === undefined && (values[key] = '')
            if (typeof values[key] !== 'string') {
              return
            }
            values[key] = values[key].trim()
          })
          this.$emit('search', values, pageIndex, pageSize, togglePage)
        }
      })
    },

    handleReset() {
      this.form.resetFields()
      this.$emit('reset')
      this.handleSearch()
    },

    toggle() {
      this.isExpand = !this.isExpand
    },
    // 展示下拉
    showPopup(open, item) {
      if (item.cancelShowEvent) return
      if (open) {
        if (item.itemProps.option && item.itemProps.option.length) {
          return
        }
        item.itemProps.callback().then(res => {
          this.$set(item.itemProps, 'option', res.result.data)
        })
      }
    },
    // 下拉列表选中事件
    handleSelectChange(value, item) {
      if (item.attachedName) {
        const attachedItem = this.data.find(i => i.name === item.attachedName || i.key === item.attachedName)
        if (
          attachedItem.itemProps &&
          attachedItem.itemProps.callback &&
          typeof attachedItem.itemProps.callback === 'function'
        ) {
          if (attachedItem.itemProps.option && attachedItem.itemProps.option.length) {
            this.$set(attachedItem.itemProps, 'option', [])
          }
          this.form.setFieldsValue({
            [item.attachedName]: undefined,
          })
          let params = attachedItem.itemProps.paramField
            ? {
                [attachedItem.itemProps.paramField]: value,
              }
            : {}
          attachedItem.itemProps.callback(params).then(res => {
            this.$set(attachedItem.itemProps, 'option', res.result.data)
          })
          // 如果是联动子组件，则取消展开调接口事件
          attachedItem.cancelShowEvent = true
        }
      }
    },
    getItemSpan(item) {
      const colNum = 24 / this.innerSpan
      if (item.colSpan != undefined) {
        const itemIndex = this.searchData.findIndex(i => i.name === item.name || i.key === item.name)
        if (item.colSpan > colNum - itemIndex - 1) {
          console.warn('请设置合理的colSpan值')
        }
        return this.innerSpan * item.colSpan
      } else {
        return this.innerSpan
      }
    },
    /**
     * @description: 监听屏幕宽度，改变组件布局
     * @param {void}
     * @return {void}
     */
    screenWidthResize() {
      let contentWidth = document.body.clientWidth
      if (contentWidth > 1500) {
        if (this.innerSpan !== this.span) {
          this.innerSpan = this.span
        }
      } else if (contentWidth <= 1500 && contentWidth > 1050) {
        if (this.innerSpan !== 8) {
          this.innerSpan = 8
        }
      } else if (contentWidth <= 1050 && contentWidth > 800) {
        if (this.innerSpan !== 12) {
          this.innerSpan = 12
        }
      } else {
        if (this.innerSpan !== 24) {
          this.innerSpan = 24
        }
      }
    },
  },
  created() {},
  mounted() {
    window.addEventListener('resize', this.screenWidthResize, false)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.screenWidthResize, false)
  },
}
</script>
<style lang="less" scoped>
.wrapper {
  // margin: 0 0 12px 0;
  background-color: #f8fbfc;
  .ant-advanced-search-form {
    padding: 12px 0;
    // border: 1px solid #e8e8e8;
    border-radius: 6px;
    /deep/ .ant-form-item {
      display: flex;
      // margin-bottom: 10px !important;
    }
    /deep/ .ant-form-item-control-wrapper {
      flex: 1;
    }
  }

  .ant-form {
    max-width: none;
    background-color: #ffffff;
  }
  .ant-col {
    max-height: 60px;
  }
  .ant-col-0 {
    display: none !important;
  }
  .search-button {
    font-size: 16px;
    width: 80px;
  }
  .reset-button {
    font-size: 16px;
    margin-left: 12px;
    width: 80px;
  }
  .collapse {
    margin-left: 12px;
    font-size: 16px;
    color: #5485e8;
  }
  /deep/ .ant-radio-group {
    display: flex;
    .ant-radio-button-wrapper {
      flex: auto;
      padding: 0;
      // min-width: 60px;
      text-align: center;
      overflow: hidden;
    }
  }
  .diycomponent-wrapper {
    display: flex;
  }
}
</style>
