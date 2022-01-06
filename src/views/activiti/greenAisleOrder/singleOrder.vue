<template>
<!-- 单笔指令 -->
  <div>
    <a-card :bordered="false">
      <a-row>
        <a-col :span="12">
          <div style="border-bottom: 1px solid #ddd; margin-top: 10px">
            <a-form-model ref="ruleForm" :model="formData" :label-col="labelCol" :wrapper-col="wrapperCol">
              <a-form-model-item label="指令来源" prop="channel">
                <a-select
                  v-model="formData.channel"
                  placeholder="请输入指令来源"
                  allowClear>
                  <a-select-option
                  v-for="item in channelList"
                  :key="item.index"
                  :value="item"
                  >{{item}}</a-select-option>
                </a-select>
              </a-form-model-item>
              <a-form-model-item label="指令类型" prop="caseType">
                <a-select
                  v-model="formData.caseType"
                  placeholder="请输入指令类型"
                  allowClear>
                  <a-select-option
                    v-for="item in typeList"
                    :key="item.index"
                    :value="item"
                    >{{ item }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
              <a-form-model-item label="业务类型" prop="bizTypeCode">
                <a-select
                  v-model="formData.bizTypeCode"
                  placeholder="请输入业务类型"
                  allowClear>
                  <a-select-option key="1" :value="1">指令平台经办-划款指令</a-select-option>
                  <a-select-option key="2" :value="2">柜面经办-划款指令</a-select-option>
                </a-select>
              </a-form-model-item>
              <a-form-model-item label="项目名称" prop="projectName">
                <a-row :gutter="14">
                  <a-col :span="23">
                    <a-input
                      v-model="formData.projectName"
                      placeholder="请输入项目名称"
                      allowClear/>
                  </a-col>
                  <a-col :span="1"><a-button style="right" type="primary">查询项目</a-button></a-col>
                </a-row>
              </a-form-model-item>
              <a-form-model-item label="客户名称" prop="customerName">
                <a-input
                  v-model="formData.customerName"
                  placeholder="请输入客户名称"
                  allowClear/>
              </a-form-model-item>
            </a-form-model>
          </div>
          <div style="margin-top: 10px">
            <a-form-model ref="ruleForm" :model="formData" :label-col="labelCol" :wrapper-col="wrapperCol">
              <a-form-model-item label="付款账号" prop="payAccount">
                <a-row :gutter="24">
                  <a-col :span="15">
                    <a-input
                      v-model="formData.payAccount"
                      placeholder="请输入付款账号"
                      allowClear />
                  </a-col>
                  <a-col :span="3" pull="1"><a-button type="primary">查询付款方</a-button></a-col>
                  <a-col :span="3" push="2"><a-button type="primary">账户余额</a-button></a-col>
                  <a-col :span="3" push="4"><a-button type="primary">账户明细</a-button></a-col>
                </a-row>
              </a-form-model-item>
              <a-form-model-item label="付款户名" prop="payAccountName">
                <a-input v-model="formData.payAccountName" placeholder="请输入付款户名" allowClear />
              </a-form-model-item>
              <a-form-model-item label="收款账号" prop="recvAccount">
                <a-input v-model="formData.recvAccount" placeholder="请输入收款账号" allowClear />
              </a-form-model-item>
              <a-form-model-item label="收款户名" prop="recvAccountName">
                <a-input v-model="formData.recvAccountName" placeholder="请输入收款户名" allowClear />
              </a-form-model-item>
              <a-form-model-item label="开户行" prop="payBankName">
                <a-row :gutter="24">
                  <a-col :span="15">
                    <a-input v-model="formData.payBankName" placeholder="请输入开户行" allowClear />
                  </a-col>
                  <a-col :span="3" pull="1"><a-button type="primary">查询收款行</a-button></a-col>
                  <a-col :span="3" push="2"><a-button type="primary">手工录入</a-button></a-col>
                </a-row>
              </a-form-model-item>
              <a-form-model-item label="大额行号" prop="payBankNo">
                <a-input v-model="formData.payBankNo" placeholder="请输入大额行号" allowClear />
              </a-form-model-item>
            </a-form-model>
          </div>
        </a-col>
        <a-col :span="12">
          <a-form-model ref="ruleForm" :model="formData" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-form-model-item label="付款类型" prop="transferType">
              <a-radio-group v-model="formData.transferType" :default-value="1" allowClear>
                <a-radio :value="1"> 行内转账 </a-radio>
                <a-radio :value="2"> 跨行转账 </a-radio>
                <a-radio :value="3"> 智能支付 </a-radio>
              </a-radio-group>
            </a-form-model-item>
            <a-form-model-item label="划款转账" prop="payDate">
              <a-date-picker
                v-model="formData.payDate"
                show-time
                type="date"
                placeholder="请选择时间"
                allowClear
                style="width: 100%"
              />
            </a-form-model-item>
            <a-form-model-item label="币种" prop="currency">
              <a-select v-model="formData.currency" placeholder="请选择币种" allowClear>
                <a-select-option
                v-for="item in currencyList"
                :key="item.index"
                :value="item"            
                >
                {{item}}
                </a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item label="金额" prop="amount">
              <a-input-number
                style="width: 100%"
                v-model="formData.amount"
                placeholder="请输入金额"
                :precision="4"
                :min="0"
                :max="20"
                allowClear>
              </a-input-number>
            </a-form-model-item>
            <a-form-model-item label="大写金额" prop="capitalAmount">
              <a-input v-model="formData.capitalAmount" placeholder="请输入大写金额" allowClear />
            </a-form-model-item>
            <a-form-model-item label="用途" prop="payPurpose">
              <a-row :gutter="24">
                <a-col :span="12">
                  <a-select v-model="formData.payPurpose" :size="size" palaceholder="自定义" style="width: 200px" allowClear @change="handleChange">
                    <a-select-option
                    v-for="item in payPurposeList"
                    :key="item.index"
                    :value="item"
                    >
                    {{item}}
                    </a-select-option>
                  </a-select>
                </a-col>
                <a-col :span="12"><a-input allowClear placeholder="请输入自定义用途" v-model="formData.useRemark" /></a-col>
              </a-row>
            </a-form-model-item>
            <a-form-model-item label="是否立即划款" prop="isReceipt">
              <a-radio-group v-model="formData.isReceipt" :default-value="1" @change="onChange" allowClear>
                <a-radio :value="1"> 是 </a-radio>
                <a-radio :value="2"> 否 </a-radio>
              </a-radio-group>
            </a-form-model-item>
            <a-form-model-item label="流程备注" prop="transNote">
              <a-input v-model="formData.transNote" type="textarea" placeholder="请输入备注,最多输入100个字符" allowClear />
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
      </a-row>
    </a-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 指令来源列表
      channelList: ['传真','邮件','易托管影像','易托管电子','绿色通道','新建','主动支付','托管直连'],
      // 指令类型列表
      typeList: ['投资款-中登清算','投资款-银行间','投资款-行内结构性存款','投资款-场外','投资款-行内定期存款','投资款-银转证',
      '投资款-行内理财申购','回款-行内理财赎回','回款-行内基金赎回','提取-收益分配','费用-托管费','费用-管理费','费用-中登开户费',
      '费用-其他费用','调拨-银行间中债','调拨-银行间','费用-银行间','到期-中登清算','配置-同名划转'
      ],
      // 币种列表
      currencyList: ['人民币','美元','港元','日元','欧元','英镑','瑞郎','加元','澳元','新加坡元'],
      // 用途列表
      payPurposeList:['投资款','收益分配','到期提取本金及收益','基金申购款','基金赎回款','基金轧差款','管理费','托管费','销售服务费',
      '委贷手续费','财务顾问费','审计费','律师费','税款','销户尾款','其他费用','到期提取','投资顾问费','客户服务费','佣金','银转期',
      '期转银','风险准备金','其他转账','自定义'],
      labelCol: { span: 6 },
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
        content: '是否清空',
        okText: '确定',
        cancelText: '取消',
      })
    },
    handleOk(e) {
      this.$confirm({
        title: '提醒',
        content: '是否提交',
        okText: '确定',
        cancelText: '取消',
      })
    },
  },
}
</script>

<style scoped>
</style>