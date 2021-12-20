<template>
  <div>
    <a-card :bordered="false">
      <a-row>
        <a-col :span="12">
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
                  <a-col :span="23">
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
              <a-form-model-item label="付款账号">
                <a-row :gutter="24">
                  <a-col :span="15">
                    <a-input v-model="formData.payment" />
                  </a-col>
                  <a-col :span="3" pull="1"><a-button type="primary">查询付款方</a-button></a-col>
                  <a-col :span="3" push="2"><a-button type="primary">账户余额</a-button></a-col>
                  <a-col :span="3" push="4"><a-button type="primary">账户明细</a-button></a-col>
                </a-row>
              </a-form-model-item>
              <a-form-model-item label="付款户名">
                <a-input v-model="formData.paymentName" />
              </a-form-model-item>
              <a-form-model-item label="收款账号">
                <a-input v-model="formData.collection" />
              </a-form-model-item>
              <a-form-model-item label="收款户名">
                <a-input v-model="formData.collectionName" />
              </a-form-model-item>
              <a-form-model-item label="开户行">
                <a-input v-model="formData.bank" />
              </a-form-model-item>
              <a-form-model-item label="开户行">
                <a-row :gutter="24">
                  <a-col :span="15">
                    <a-input v-model="formData.bank" />
                  </a-col>
                  <a-col :span="3" pull="1"><a-button type="primary">查询收款行</a-button></a-col>
                  <a-col :span="3" push="2"><a-button type="primary">手工录入</a-button></a-col>
                </a-row>
              </a-form-model-item>
              <a-form-model-item label="大额行号">
                <a-input v-model="formData.moneyNumber" />
              </a-form-model-item>
            </a-form-model>
          </div>
        </a-col>
        <a-col :span="12">
          <a-form-model ref="ruleForm" :model="formData" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-form-model-item label="付款类型">
              <a-radio-group v-model="formData.paymentType" :default-value="1">
                <a-radio :value="1"> 行内转账 </a-radio>
                <a-radio :value="2"> 跨行转账 </a-radio>
                <a-radio :value="3"> 智能支付 </a-radio>
              </a-radio-group>
            </a-form-model-item>
            <a-form-model-item label="划款转账">
              <a-date-picker
                v-model="formData.transferMoney"
                show-time
                type="date"
                placeholder="请选择时间"
                style="width: 100%"
              />
            </a-form-model-item>
            <a-form-model-item label="币种">
              <a-select v-model="formData.currency">
                <a-select-option value="美元"> 美元 </a-select-option>
                <a-select-option value="人民币"> 人民币 </a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item label="金额">
              <a-select v-model="formData.money" />
            </a-form-model-item>
            <a-form-model-item label="大写金额">
              <a-select v-model="formData.capitalMoney" />
            </a-form-model-item>
            <a-form-model-item label="用途">
              <a-row :gutter="24">
                <a-col :span="12">
                  <a-select :size="size" default-value="自定义" style="width: 200px" @change="handleChange">
                    <a-select-option v-for="i in 25" :key="(i + 9).toString(36) + i">
                      {{ (i + 9).toString(36) + i }}
                    </a-select-option>
                  </a-select>
                </a-col>
                <a-col :span="12"><a-input allowClear placeholder="请输入自定义用途" v-model="formData.user" /></a-col>
              </a-row>
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
        </a-col>
      </a-row>
      <a-row>
        <a-col>
          <a-form-modal ref="ruleForm" :model="formData" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-form-modal-item>
               <a-button style="float: right; margin-left: 10px" type="primary" @click="handleCancel"> 清空 </a-button>
               <a-button style="float: right; margin-left: 10px" type="primary" :loading="loading" @click="handleOk"> 提交 </a-button>
            </a-form-modal-item>
          </a-form-modal>
          <!-- <a-button style="float: right; margin-left: 10px" type="primary" @click="handleCancel"
            >取消
          </a-button>
          <a-button style="float: right; margin-left: 10px" type="primary" @click="handleOk"> 确定 </a-button>
        </a-col> -->
      </a-row>
      
    </a-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelCol: { span: 5 },
      wrapperCol: { span: 14 },
      formData: {},
    }
  },
  methods: {
    // 查询项目按钮
    searchProject() {
      alert('查询项目！')
    },
    handleChange(value) {
      console.log(`selected ${value}`)
    },
    onChange(e) {
      console.log('radio checked', e.target.value)
    },
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
  },
}
</script>

<style scoped>
</style>