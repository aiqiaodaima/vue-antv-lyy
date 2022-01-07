<template>
<!-- 批量指令 -->
  <div>
    <a-card :bordered="false">
      <a-row>
        <a-col :span="8">
          <div style="border-bottom: 1px solid #ddd; margin-top: 10px">
            <a-form-model ref="ruleForm" :model="formData" :label-col="labelCol" :wrapper-col="wrapperCol">
              <a-form-model-item label="指令来源" prop="caseChannel">
                <a-select v-model="formData.caseChannel" placeholder="请输入指令来源" alloeClear>
                  <a-select-option
                  v-for="item in channelList"
                  :key="item.index"
                  :value="item"
                  >{{item}}</a-select-option>
                </a-select>
              </a-form-model-item>
              <a-form-model-item label="指令类型" prop="caseTypeCode">
                <a-select v-model="formData.caseTypeCode" placeholder="请输入指令类型" alloeClear >
                  <a-select-option
                  v-for="item in typeList"
                  :key="item.index"
                  :value="item"
                  >{{item}}</a-select-option>
                </a-select>
              </a-form-model-item>
              <a-form-model-item label="业务类型" prop="busiTypeCode">
                <a-select v-model="formData.busiTypeCode" placeholder="请输入业务类型" allowClear>
                  <a-select-option key="1" :value="1">指令平台经办-划款指令</a-select-option>
                  <a-select-option key="2" :value="2">柜面经办-划款指令</a-select-option>
                </a-select>
              </a-form-model-item>
              <a-form-model-item label="项目名称" prop="projectName">
                <a-row :gutter="14">
                  <a-col :span="11">
                    <a-input v-model="formData.projectName" placeholder="请输入项目名称" allowClear />
                  </a-col>
                  <a-col :span="3"><a-button style="right" type="primary">查询</a-button></a-col>
                </a-row>
              </a-form-model-item>
              <a-form-model-item label="客户名称" prop="custmName">
                <a-input v-model="formData.custmName" placeholder="请输入客户名称" allowClear />
              </a-form-model-item>
            </a-form-model>
          </div>
          <div style="margin-top: 10px">
            <a-form-model ref="ruleForm" :model="formData" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-form-model-item label="划款日期" prop="transferDate">
              <a-date-picker
                v-model="formData.transferDate"
                show-time
                type="date"
                placeholder="请选择时间"
                style="width: 100%"
              />
            </a-form-model-item>
            <a-form-model-item label="金额" prop="totalAmt">
              <a-input v-model="formData.totalAmt" placeholder="请输入金额" allowClear />
            </a-form-model-item>
              <a-form-model-item label="大写金额" prop="capitalAmt">
              <a-input v-model="formData.capitalAmt" placeholder="请输入大写金额" allowClear />
            </a-form-model-item>
              <a-form-model-item label="是否立即划款" prop="isPayNow">
              <a-radio-group v-model="formData.isPayNow" :default-value="1" @change="onChange">
                <a-radio :value="1"> 是 </a-radio>
                <a-radio :value="2"> 否 </a-radio>
              </a-radio-group>
            </a-form-model-item>
            <a-form-model-item label="流程备注" prop="processRemark">
              <a-input v-model="formData.processRemark" type="textarea" placeholder="请输入备注,最多输入100个字符" />
            </a-form-model-item>
            </a-form-model>
          </div>
        </a-col>
    <a-col :span="16">
      <a-card style="width: 100%; height: 100%">
        <a-form-model style="margin-bottom: 10px" layout="inline" :model="formData">
          <a-form-model-item label="选择文件" prop="dataFile">
            <a-input v-model="formData.dataFile">
            </a-input>
          </a-form-model-item>
          <a-form-model-item>
              <a-upload
                name="file"
                :multiple="true"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                :headers="headers"
                @change="handleChange"
              >
              <a-button style="margin-left: 7px" type="primary">浏览</a-button>
            </a-upload>
          </a-form-model-item>
          <a-form-model-item>
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
        :dataSource="busiInfoList"
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
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script>
import { LeadingtekListMixin } from '@/mixins/LeadingtekListMixin'
const busiInfoList = [
  {  payAccount: '指令1', transferType: '支付宝' },
  {  payAccount: '指令2', transferType: 'xianjin' },
  {  payAccount: '指令3', transferType: '支付宝' },
  {  payAccount: '指令1', transferType: '划款' },
  {  payAccount: '指令2', transferType: 'xianjin' },
  {  payAccount: '指令3', transferType: '支付宝' },
  {  payAccount: '指令1', transferType: '划款' },
  {  payAccount: '指令2', transferType: 'xianjin' },
  {  payAccount: '指令3', transferType: '支付宝' },
  {  payAccount: '指令1', transferType: '划款' },
  {  payAccount: '指令2', transferType: 'xianjin' },
  {  payAccount: '指令3', transferType: '支付宝' },
]
export default {
  mixins: [LeadingtekListMixin],
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      formData: {},
      // dataSource: dataSource,
      busiInfoList: busiInfoList,
      headers: { authorization: 'authorization-text' }, //上传文件
      url: {
        list: '/activiti/models',
      },
      // 指令来源列表
      channelList: ['传真','邮件','易托管影像','易托管电子','绿色通道','新建','主动支付','托管直连'],
      // 指令类型列表
      typeList: ['投资款-中登清算','投资款-银行间','投资款-行内结构性存款','投资款-场外','投资款-行内定期存款','投资款-银转证',
      '投资款-行内理财申购','回款-行内理财赎回','回款-行内基金赎回','提取-收益分配','费用-托管费','费用-管理费','费用-中登开户费',
      '费用-其他费用','调拨-银行间中债','调拨-银行间','费用-银行间','到期-中登清算','配置-同名划转'
      ],
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
          dataIndex: 'payAccount',
        },
        {
          title: '付款户名',
          align: 'center',
          dataIndex: 'payAccountName',
        },
        {
          title: '收款账号',
          align: 'center',
          dataIndex: 'recvAccount',
        },
        {
          title: '收款户名',
          align: 'center',
          dataIndex: 'recvAccountName',
        },
        {
          title: '收款行名',
          align: 'center',
          dataIndex: 'recvAccountBank',
        },
        {
          title: '大额联行号',
          align: 'center',
          dataIndex: 'largeUnionNum',
        },
        {
          title: '金额',
          align: 'center',
          dataIndex: 'amt',
        },
        {
          title: '转账类型',
          align: 'center',
          dataIndex: 'transferType',
        },
        {
          title: '用途',
          align: 'center',
          dataIndex: 'transferUse',
        },
      ],
    }
  },
  methods: {
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
    handleChange(info) {
      console.log(info)
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} 文件上传成功`)
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} 文件上传失败`)
      }
    },
  },
}
</script>

<style scoped>
</style>
