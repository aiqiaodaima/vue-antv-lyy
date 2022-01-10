<template>
  <div>
    <a-modal
      :title="title"
      :visible="visible"
      :confirm-loading="confirmLoading"
      :maskClosable="false"
      width="80%"
      :loading="loading"
      @cancel="handleCancel"
    >
      <template slot="footer">
        <a-button @click="handleCancel">取消</a-button>
        <a-button type="primary" :loading="loading" @click="handleOk"> 确定 </a-button>
      </template>
      <a-tabs type="card" @change="changeTab">
        <a-tab-pane key="1" tab="指令信息">
          <a-form-model :model="formData" ref="ruleForm" :rules="rules">
            <a-row :gutter="24">
              <a-col :span="24" v-for="item in infoArr" :key="item.key">
                <a-form-model-item
                  :label="item.label"
                  :prop="item.key"
                  :label-col="{ span: 3 }"
                  :wrapper-col="{ span: item.type === 'divider' ? 24 : 15 }"
                >
                  <a-input
                    v-if="item.type === 'text'"
                    :disabled="item.type === 'text' || pageType === 'view'"
                    v-model="formData[item.key]"
                    allowClear
                  ></a-input>

                  <a-divider v-if="item.type === 'divider'" />
                  <a-select v-if="item.type === 'select'" :disabled="pageType === 'view'" v-model="formData[item.key]">
                    <a-select-option v-for="opt in item.option" :value="opt.value" :key="opt.key">
                      {{ opt.key }}
                    </a-select-option>
                  </a-select>

                  <a-radio-group v-if="item.type === 'radio'" v-model="formData[item.key]">
                    <a-radio
                      v-for="opt in item.option"
                      :value="opt.value"
                      :key="opt.key"
                      :disabled="pageType === 'view'"
                    >
                      {{ opt.key }}</a-radio
                    >
                  </a-radio-group>
                </a-form-model-item>
              </a-col>
            </a-row>
          </a-form-model>

          <a-table :columns="columns" :data-source="tableData" size="small" :pagination="false" />
        </a-tab-pane>

        <a-tab-pane key="2" tab="指令解析"> 指令解析 </a-tab-pane>
        <a-tab-pane key="3" tab="处理流程信息"> 处理流程信息</a-tab-pane>
      </a-tabs>
    </a-modal>
  </div>
</template>
<script>
import moment from 'moment'
import { getAction } from '@/api/manage'
// import {
//   foreginIncomeAndExpecditureAdd,
//   foreginIncomeAndExpecditureEdit,
// } from "@/api/api";
export default {
  data() {
    const columns = [
      {
        title: '序号',
        customRender: (text, record, index) => `${index + 1}`,
      },
      {
        title: '处理人',
        dataIndex: 'handler',
      },
      {
        title: '处理环节',
        dataIndex: 'procUnit',
      },
      {
        title: '处理意见',
        dataIndex: 'processOpinion',
      },
    ]
    const tableData = [
      {
        key: '1',
        handler: 'John Brown',
        procUnit: 32,
        processOpinion: 'New York No. 1 Lake Park',
      },
    ]
    return {
      title: '详情',
      pageType: 'view',
      visible: false,
      loading: false,
      confirmLoading: false,
      rules: {},
      formData: {
        channel: 'sss',
      },
      infoArr: [
        {
          label: '指令来源',
          type: 'text',
          key: 'channel',
        },
        {
          label: '指令类型',
          type: 'select',
          key: 'caseType',
          option: [
            {
              value: 'bill',
              key: '费用',
            },
          ],
        },
        {
          label: '业务类型',
          type: 'text',
          key: 'bizTypeName',
        },
        {
          label: '项目名称',
          type: 'text',
          key: 'projectName',
        },
        {
          type: 'divider',
        },
        {
          label: '客户名称',
          type: 'text',
          key: 'customerName',
        },
        {
          label: '付款账号',
          type: 'text',
          key: 'payAccount',
        },
        {
          type: 'divider',
        },
        {
          label: '付款户名',
          type: 'text',
          key: 'payAccountName',
        },
        {
          label: '收款账号',
          type: 'text',
          key: 'recvAccount',
        },
        {
          label: '收款户名',
          type: 'text',
          key: 'recvAccountName',
        },
        {
          label: '开户行',
          type: 'text',
          key: 'recvBankName',
        },
        {
          label: '大额行号',
          type: 'text',
          key: 'recvBankNo',
        },
        {
          type: 'divider',
        },
        {
          label: '付款类型',
          type: 'radio',
          key: 'transferType',
          option: [
            {
              value: 'bill',
              key: '行内',
            },
            {
              value: 'bill2',
              key: '跨行',
            },
            {
              value: 'bill3',
              key: '智能',
            },
          ],
        },
        {
          label: '划款日期',
          type: 'text',
          key: 'payDate',
        },
        {
          label: '币种',
          type: 'text',
          key: 'currency',
        },
        {
          label: '金额',
          type: 'text',
          key: 'amount',
        },

        {
          label: '大写金额',
          type: 'text',
          key: 'capitalAmount',
        },
        {
          label: '用途',
          type: 'text',
          key: 'transferUse',
        },
        {
          label: '原用途',
          type: 'text',
          key: 'originalTransferUse',
        },
        {
          label: '是否立即划款',
          type: 'radio',
          key: 'isReceipt',
          option: [
            {
              value: 'bill',
              key: '是',
            },
            {
              value: 'bill2',
              key: '否',
            },
          ],
        },
        // {
        //   label: '截止时间',
        //   type: 'text',
        //   key: 'channel',
        // },
        // {
        //   label: '是否置顶',
        //   type: 'text',
        //   key: 'channel',
        // },
        // {
        //   label: '常用备注',
        //   type: 'text',
        //   key: 'channel',
        // },
      ],
      columns,
      tableData,
      caseNo: '', // 传入的ID
    }
  },
  watch: {
    caseNo(newVal) {
      this.getDetail()
    },
  },
  methods: {
    moment,
    handleCancel() {
      // this.$refs.ruleForm.resetFields(); // resetFields()对表单进行重置的方法
      this.formData = {}
      this.visible = false
    },
    // 请求详情
    getDetail() {
      this.loading = true
      getAction('task/agency/details', {
        caseNo: this.caseNo,
      })
        .then(({ success, result }) => {
          if (success) {
            this.formData = result
            this.tableData = result.processPos
          }
          this.loading = false
        })
        .finally(() => {
          this.loading = false
        })
    },
    handleOk(e) {
      console.log(e)
      this.visible = false
    },
    changeTab(key) {
      console.log(key)
    },
  },
}
</script>
<style lang="less" scoped>
.bodyStyle {
  height: 100vh;
  width: 1000px;
}
</style>