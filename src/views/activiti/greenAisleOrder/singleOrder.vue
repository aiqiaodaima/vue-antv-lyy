<template>
  <div style="background-color: #fff; padding: 20px">
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
                <a-col :span="1"><a-button style="right" type="primary" icon="search">查询项目</a-button></a-col>
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
            <a-form-model-item type="flex" layout="inline" label="项目名称">
              <a-row :gutter="16">
                <a-col :span="18">
                  <a-input v-model="formData.projectName" />
                </a-col>
                <a-col :span="6"><a-button style="right" type="primary" icon="search">查询项目</a-button></a-col>
              </a-row>
            </a-form-model-item>
            <a-form-model-item label="大额行号">
              <a-input v-model="formData.moneyNumber" />
            </a-form-model-item>
          </a-form-model>
        </div>
      </a-col>
      <a-col :span="12"></a-col>
    </a-row>
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
  },
}
</script>

<style scoped>
</style>