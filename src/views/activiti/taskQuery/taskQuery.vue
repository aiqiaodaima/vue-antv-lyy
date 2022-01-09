<template>
<!-- 任务查询页面 -->
  <a-card :bordered="false">
    <!-- 查询区域 -->
        <!-- 表单区域 -->
    <div class="table-page-search-wrapper">
      <a-form-model
        ref="ruleForm"
        :model="filterData"
        @submit.prevent="searchQuery"
      >
        <a-row :gutter="24">
          <a-col :span="6">
            <a-form-model-item
              label="指令编号"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 18 }"
              prop="caseNo"
            >
              <a-input
                v-model="filterData.caseNo"
                placeholder="请输入指令编号"
                allowClear
              >
              </a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="6">
            <a-form-model-item
              label="客户名称"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 18 }"
              prop="customerName"
            >
              <a-input
                v-model="filterData.customerName"
                placeholder="请输入客户名称"
                allowClear
              >
              </a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="6">
            <a-form-model-item
              label="项目名称"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 18 }"
              prop="projectName"
            >
              <a-input
                v-model="filterData.projectName"
                placeholder="请输入项目名称"
                allowClear
              >
              </a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="6">
            <a-form-model-item
              label="指令类型"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 18 }"
              prop="caseType"
            >
              <a-select
                v-model="filterData.caseType"
                placeholder="请选择指令类型"
                allowClear
              >
              <a-select-option
              v-for="item in typeList"
              :key="item.index"
              :value="item"
              >{{item}}</a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="6">
            <a-form-model-item
              label="业务类型"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 18 }"
              prop="businessType"
            >
              <a-select
                v-model="filterData.businessType"
                placeholder="请选择业务类型"
                allowClear
              >
              <a-select-option key="1" :value="1">指令平台经办-划款指令</a-select-option>
              <a-select-option key="2" :value="2">柜面经办-划款指令</a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="6">
            <a-form-model-item
              label="指令渠道"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 18 }"
              prop="caseChannel"
            >
              <a-select
                v-model="filterData.caseChannel"
                placeholder="指令渠道"
                allowClear
              >
              <a-select-option
              v-for="item in channelList"
              :key="item.index"
              :value="item"
              >{{item}}</a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="6">
            <a-form-model-item
              label="发起时间"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 18 }"
              prop="time"
            >
              <a-range-picker
                v-model="filterData.time"
                format="YYYY-MM-DD"
                :placeholder="['开始时间', '结束时间']"
                @change="onChange" />
            </a-form-model-item>
          </a-col>
          <a-col :span="6">
            <a-form-model-item
              label="流程环节"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 18 }"
              prop="procedureLink"
            >
              <a-select
                v-model="filterData.procedureLink"
                placeholder="请选择流程环节"
                allowClear
              >
              <a-select-option
              v-for="item in procedureLinkList"
              :key="item.index"
              :value="item"
              >{{item}}</a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="6">
            <a-form-model-item
              label="业务处理人"
              :label-col="{ span: 7 }"
              :wrapper-col="{ span: 17 }"
              prop="taskCurrentHandler"
            >
              <a-input
                v-model="filterData.taskCurrentHandler"
                placeholder="请输入业务处理人"
                allowClear
              >
              </a-input>
            </a-form-model-item>
          </a-col>
          <!-- <a-col :span="6">
            <a-form-model-item
              label="划款时间"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 18 }"
              prop="time"
            >
              <a-range-picker
                  v-model="filterData.time"
                  format="YYYY-MM-DD"
                  :placeholder="['开始时间', '结束时间']"
                  @change="onChangeTime" />
            </a-form-model-item>
          </a-col> -->
          <a-col :span="6">
            <a-form-model-item
              label="划款金额"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 18 }"
              prop="transferAmt"
            >
              <a-input
                v-model="filterData.transferAmt"
                placeholder="请输入划款金额"
                allowClear
              >
              </a-input>
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-form-model-item>
          <a-button
            style="margin-left: 8px"
            type="primary"
            icon="search"
            @click="searchQuery"
            :loading="loading"
            >查询</a-button
          >
          <a-button
            style="margin-left: 8px"
            type="primary"
            icon="reload"
            @click="searchReset"
            >重置</a-button
          >
        </a-form-model-item>
      </a-form-model>
    </div>
    <div>
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="已处理的任务">
          <HandledTask  ref="foreign"/>
        </a-tab-pane>
        <a-tab-pane key="2" tab="已完成的任务">
          <CompletedTask  ref="foreign"/>
        </a-tab-pane>
        <a-tab-pane key="3" tab="终止的任务">
          <EndTask  ref="foreign"/>
        </a-tab-pane>
      </a-tabs>
    </div>
  </a-card>
</template>

<script>
import HandledTask from "./modules/handledTask.vue";
import CompletedTask from "./modules/completedTask.vue";
import EndTask from "./modules/endTask.vue";
import locale from "ant-design-vue/es/date-picker/locale/zh_CN";
import moment from "moment";
import { LeadingtekListMixin } from '@/mixins/LeadingtekListMixin'


export default {
  mixins: [LeadingtekListMixin],
  components: { HandledTask,CompletedTask,EndTask},
  data() {
    return {
      locale,
      moment,
      filterData: {},
      dataSource: [],
      // 指令类型列表
      typeList: ['投资款-中登清算','投资款-银行间','投资款-行内结构性存款','投资款-场外','投资款-行内定期存款','投资款-银转证',
      '投资款-行内理财申购','回款-行内理财赎回','回款-行内基金赎回','提取-收益分配','费用-托管费','费用-管理费','费用-中登开户费',
      '费用-其他费用','调拨-银行间中债','调拨-银行间','费用-银行间','到期-中登清算','配置-同名划转'
      ],
      // 指令渠道列表
      channelList: ['传真','邮件','易托管影像','易托管电子','绿色通道','新建','主动支付','托管直连'],
      // 流程环节列表
      procedureLinkList:['指令经办','指令录入1','指令录入2','绿色通道录入','审批1','审批2','审批3','用印经办','用印复核','用印审批','指令客服'],
    };
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    // 查询
    searchQuery() {
      console.log(this.filterData);
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          // this.loadData(1);
        } else {
          console.log("error submit!");
          return false;
        }
      });
    },
    // 重置
    searchReset() {
      this.filterData = {};
      this.$refs.ruleForm.resetFields();
    },
    // 刷新重置
    refreshList() {
      // this.loadData(1)
    },
    // 发起时间
    onChange(value, dateString) {
      console.log(dateString[0],dateString[1]);
      this.filterData.beginLaunchDate = dateString[0];
      this.filterData.endLaunchDate = dateString[1];
    },
  },
};
</script>

