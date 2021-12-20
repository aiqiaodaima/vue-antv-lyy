<template>
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
      哈哈
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
}
</script>

<style scoped>
</style>
