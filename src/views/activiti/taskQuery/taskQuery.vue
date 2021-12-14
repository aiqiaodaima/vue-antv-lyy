<template>
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
              prop="id"
            >
              <a-input
                v-model="filterData.id"
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
              prop="cusName"
            >
              <a-input
                v-model="filterData.cusName"
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
              prop="proName"
            >
              <a-input
                v-model="filterData.proName"
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
              prop="type"
            >
              <a-select
                v-model="filterData.type"
                placeholder="请选择指令类型"
                allowClear
              >
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
              prop="type"
            >
              <a-select
                v-model="filterData.type"
                placeholder="请选择业务类型"
                allowClear
              >
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="6">
            <a-form-model-item
              label="指令渠道"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 18 }"
              prop="cusName"
            >
              <a-select
                v-model="filterData.cusName"
                placeholder="指令渠道"
                allowClear
              >
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="6">
            <a-form-model-item
              label="发起时间"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 18 }"
              prop="startTime"
            >
              <a-range-picker
                v-model="filterData.startTime"
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
              prop="type"
            >
              <a-select
                v-model="filterData.type"
                placeholder="请选择流程环节"
                allowClear
              >
              </a-select>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="6">
            <a-form-model-item
              label="估值负责人"
              :label-col="{ span: 7 }"
              :wrapper-col="{ span: 17 }"
              prop="type"
            >
              <a-input
                v-model="filterData.type"
                placeholder="请输入估值负责人"
                allowClear
              >
              </a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="6">
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
          </a-col>
          <a-col :span="6">
            <a-form-model-item
              label="划款金额"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 18 }"
              prop="proName"
            >
              <a-input
                v-model="filterData.proName"
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
    onChange(value, dateString){
      console.log(dateString[0],dateString[1]);
      this.filterData.startTime_begin = dateString[0];
      this.filterData.startTime_end = dateString[1];
    },
    // 划款时间
    onChangeTime(value, dateString) {
      console.log(dateString[0],dateString[1]);
      this.filterData.time_begin = dateString[0];
      this.filterData.time_end = dateString[1];
    },
  },
};
</script>

