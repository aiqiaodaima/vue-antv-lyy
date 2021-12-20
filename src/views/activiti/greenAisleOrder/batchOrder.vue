<template>
<!-- 批量指令 -->
  <div>
    <a-card :bordered="false">
      <a-row>
        <a-col :span="8">
          <div style="border-bottom: 1px solid #ddd; margin-top: 10px">
            <a-form-model ref="ruleForm" :model="formData" :label-col="labelCol" :wrapper-col="wrapperCol">
              <a-form-model-item label="指令来源">
                <a-select v-model="formData.source" />
              </a-form-model-item>
              <a-form-model-item label="指令类型">
                <a-select v-model="formData.type" />
              </a-form-model-item>
              <a-form-model-item label="业务类型">
                <a-select v-model="formData.bussinessType" />
              </a-form-model-item>
              <a-form-model-item label="项目名称">
                <a-row :gutter="14">
                  <a-col :span="11">
                    <a-input v-model="formData.projectName" />
                  </a-col>
                  <a-col :span="1"><a-button style="right" type="primary">查询项目</a-button></a-col>
                </a-row>
              </a-form-model-item>
              <a-form-model-item label="客户名称">
                <a-select v-model="formData.customName" />
              </a-form-model-item>
            </a-form-model>
          </div>
          <div style="margin-top: 10px">
            <a-form-model ref="ruleForm" :model="formData" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-form-model-item label="划款日期">
              <a-date-picker
                v-model="formData.transferMoney"
                show-time
                type="date"
                placeholder="请选择时间"
                style="width: 100%"
              />
            </a-form-model-item>
            <a-form-model-item label="金额">
              <a-select v-model="formData.money" />
            </a-form-model-item>
              <a-form-model-item label="大写金额">
              <a-select v-model="formData.capitalMoney" />
            </a-form-model-item>
              <a-form-model-item label="是否立即划款">
              <a-radio-group v-model="value" :default-value="1" @change="onChange">
                <a-radio :value="1"> 是 </a-radio>
                <a-radio :value="2"> 否 </a-radio>
              </a-radio-group>
            </a-form-model-item>
            <a-form-model-item label="流程备注">
              <a-input v-model="formData.remark" type="textarea" placeholder="请输入备注,最多输入100个字符" />
            </a-form-model-item>
            </a-form-model>
          </div>
        </a-col>
    <a-col :span="16">
      <a-card style="width: 100%; height: 100%">
        <a-form-model layout="inline" :model="formData">
          <a-form-model-item label="选择文件">
            <a-input v-model="formData.selectFile">
            </a-input>
          </a-form-model-item>
          <a-form-model-item>
            <a-button type="primary" class="ant-alert ant-alert-info" style="margin-left: 8px">浏览</a-button>
            <a-button class="ant-alert ant-alert-info" style="margin-left: 8px">修改</a-button>
            <a-button class="ant-alert ant-alert-info" style="margin-left: 8px">全部删除</a-button>
            <a-button class="ant-alert ant-alert-info" style="margin-left: 8px">忽略验证</a-button>
            <a-button class="ant-alert ant-alert-info" style="margin-left: 8px">导出</a-button>
          </a-form-model-item>
        </a-form-model>
        <a-table
        ref="table"
        rowKey="uuid"
        size="middle"
        :dataSource="dataSource"
        :scroll="{ x: dataSource.length > 0 ? '2500px' : 'max-content' }"
        :loading="loading"
        :columns="columns"
        :pagination="ipagination"
        @change="handleTableChange"
        bordered>
      </a-table>
      </a-card>
     
    </a-col>
    </a-row>
    <!-- 底部 -->
      <a-row>
        <a-col>
          <a-form-modal ref="ruleForm" :model="formData" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-form-modal-item>
               <a-button style="float: right; margin-left: 10px" type="primary" @click="handleCancel"> 清空 </a-button>
               <a-button style="float: right; margin-left: 10px" type="primary" :loading="loading" @click="handleOk"> 提交 </a-button>
            </a-form-modal-item>
          </a-form-modal>
      </a-row>
    </a-card>
  </div>
</template>

<script>
import { LeadingtekListMixin } from '@/mixins/LeadingtekListMixin'
const dataSource = [
  {rowIndex: '1', name:'指令1', punchTime:'划款'},
  {rowIndex: '2', name:'指令2', punchTime:'xianjin'},
  {rowIndex: '3', name:'指令3', punchTime:'支付宝'},
  {rowIndex: '1', name:'指令1', punchTime:'划款'},
  {rowIndex: '2', name:'指令2', punchTime:'xianjin'},
  {rowIndex: '3', name:'指令3', punchTime:'支付宝'},
  {rowIndex: '1', name:'指令1', punchTime:'划款'},
  {rowIndex: '2', name:'指令2', punchTime:'xianjin'},
  {rowIndex: '3', name:'指令3', punchTime:'支付宝'},
  {rowIndex: '1', name:'指令1', punchTime:'划款'},
  {rowIndex: '2', name:'指令2', punchTime:'xianjin'},
  {rowIndex: '3', name:'指令3', punchTime:'支付宝'},
]
export default {
  mixins: [LeadingtekListMixin],
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      formData: {},
      dataSource: dataSource,
      url: {
        list: '/activiti/models',
      },
      columns: [
        {
          title: '#',
          dataIndex: '',
          key: 'rowIndex',
          width: 60,
          align: 'center',
          customRender: function (t, r, index) {
            return parseInt(index) + 1
          },
        },
        {
          title: '付款账号',
          align: 'center',
          dataIndex: 'name',
        },
        {
          title: '付款名称',
          align: 'center',
          dataIndex: 'handle',
        },
        {
          title: '收款账号',
          align: 'center',
          dataIndex: 'keyWord',
        },
        {
          title: '收款户名',
          align: 'center',
          dataIndex: 'punchTime',
        },
        {
          title: '原收款行名',
          align: 'center',
          dataIndex: 'sex',
        },
        {
          title: '原大额行名',
          align: 'center',
          dataIndex: 'age',
        },
        {
          title: '新收款行名',
          align: 'center',
          dataIndex: 'birthday',
        },
        {
          title: '新大额行名',
          align: 'center',
          dataIndex: 'content',
        },
        {
          title: '金额',
          align: 'center',
          dataIndex: 'belong',
        },
        {
          title: '转账类型',
          align: 'center',
          dataIndex: 'time',
        },
        {
          title: '用途',
          align: 'center',
          dataIndex: 'user',
        },
      ],
    }
  },
  methods: {
    handleCancel(e) {
      this.$confirm({
        title: '提醒',
        content: '是否提交',
        okText: '确定',
        cancelText: '取消',
      })
    },
    handleOk(e) {
      this.$confirm({
        title: '提醒',
        content: '是否清空',
        okText: '确定',
        cancelText: '取消',
      })
    },
  }
}
</script>

<style scoped>
</style>
