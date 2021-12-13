<template>
<!-- 场外清算可领取任务 -->
  <a-card :bordered="false">
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
    <!-- 表格区域 -->
    <div>
      <a-button
        class="ant-alert ant-alert-info" style="margin-bottom: 8px;"
        icon="profile"
        @click="getTesk"
        >领取任务</a-button
      >
      <a-button class="ant-alert ant-alert-info" style="margin-left: 8px" @click="example">
      例子1
    </a-button>
     <a-button class="ant-alert ant-alert-info" style="margin-left: 8px" @click="sealExample">
      用印经办例子
    </a-button>
    </div>
    <a-table
      ref="table"
      rowKey="uuid"
      size="middle"
      :scroll="{ x: dataSource.length > 0 ? '2500px' : 'max-content' }"
      :dataSource="dataSource"
      :loading="loading"
      :columns="columns"
      :pagination="ipagination"
      @change="handleTableChange"
      bordered
      :rowSelection="{
        selectedRowKeys: selectedRowKeys, 
        onChange: onSelectChange
      }">
       <div slot="filterDropdown">
          <a-card>
            <a-checkbox-group @change="onColSettingsChange" v-model="settingColumns" :defaultValue="settingColumns">
              <a-row style="width: 400px">
                <template v-for="(item,index) in defColumns">
                  <template v-if="item.key!='rowIndex'&& item.dataIndex!='action'">
                    <a-col :span="12"><a-checkbox :value="item.dataIndex"><j-ellipsis :value="item.title" :length="10"></j-ellipsis></a-checkbox></a-col>
                  </template>
                </template>
              </a-row>
            </a-checkbox-group>
          </a-card>
        </div>
        <a-icon slot="filterIcon" type='setting' :style="{ fontSize:'16px',color:  '#108ee9' }" />
         <template slot="action" slot-scope="text, record">
        <div class="editable-row-operations">
          <span style="color: blue; cursor: pointer; margin-left: 10px"
            @click="detail(record)"
            >详情</span>
            <span
              style="color: red; cursor: pointer; margin-left: 10px"
              @click="processChart(record)"
              >流程图</span>     
        </div>
      </template>
    </a-table>
    <!-- 领取任务模态框 -->
    <get-task-modal ref="getTaskModal" @refreshList="refreshList"></get-task-modal>
    <!-- 详情模态框 -->
    <detail-modal ref="detailModal" @refreshList="refreshList"></detail-modal>
    <!-- 流程图模态框 -->
    <process-modal ref="processModal" @refreshList="refreshList"></process-modal>
  </a-card>
</template>
<script>
import locale from "ant-design-vue/es/date-picker/locale/zh_CN";
import moment from "moment";
import { LeadingtekListMixin } from '@/mixins/LeadingtekListMixin'
import Vue from 'vue'
import getTaskModal from './getTaskModal.vue';
import detailModal from "./detailModal.vue"
import processModal from "./processModal.vue"

const dataSource = [
  {rowIndex: '1', name:'指令1', punchTime:'划款'},
  {rowIndex: '2', name:'指令2', punchTime:'xianjin'},
  {rowIndex: '3', name:'指令3', punchTime:'支付宝'},
]

export default {
  components: {getTaskModal,detailModal,processModal},
  mixins: [LeadingtekListMixin],
  data() {
    return {
      locale,
      moment,
      loading: false,
      filterData: {},
      dataSource: dataSource,
      selectedRowKeys: [],
      selectionRows: [],
      columns:[],
      settingColumns: [],
      url: {
        list: '/activiti/models',
      },
       defColumns: [
          {
            title: '#',
            dataIndex: '',
            key: 'rowIndex',
            width: 60,
            align: "center",
            customRender: function (t, r, index) {
              return parseInt(index) + 1;
            }
          },
          {
            title: '指令编号',
            align: "center",
            dataIndex: 'name'
          },
          {
            title: '指令来源',
            align: "center",
            dataIndex: 'keyWord'
          },
          {
            title: '指令类型',
            align: "center",
            dataIndex: 'punchTime'
          },
          {
            title: '项目名称',
            align: "center",
            dataIndex: 'sex',
          },
          {
            title: '客户名称',
            align: "center",
            dataIndex: 'age'
          },
          {
            title: '金额/份额',
            align: "center",
            dataIndex: 'birthday'
          },
          {
            title: '划款日期',
            align: "center",
            dataIndex: 'email'
          },
          {
            title: '批量类型',
            align: "center",
            dataIndex: 'content'
          },
          {
            title: '优先级',
            align: "center",
            dataIndex: 'first'
          },
          {
            title: '业务类型',
            align: "center",
            dataIndex: 'type'
          },
          {
            title: '所属机构',
            align: "center",
            dataIndex: 'belong'
          },
          {
            title: '接收时间',
            align: "center",
            dataIndex: 'time'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            scopedSlots: {
              filterDropdown: 'filterDropdown',
              filterIcon: 'filterIcon',
              customRender: 'action'},
          }
      ],
    }
  },
  created() {
    this.initColumns()
  },
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
      this.selectedRowKeys = [];
      this.selectionRows = [];
      this.$refs.ruleForm.resetFields();
    },
    // 刷新重置
    refreshList() {
      // this.loadData(1);
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
    // 详情
    detail(){
      this.$refs.detailModal.visible = true;
      this.$refs.detailModal.title = "详情";
    },
    // 流程图
    processChart() {
      this.$refs.processModal.visible = true;
      this.$refs.processModal.title = "流程图设计";
    },
    // 领取任务
    getTesk() {
      this.$refs.getTaskModal.visible = true;
      this.$refs.getTaskModal.title = "提醒";
    },
    // 例子
    example(){
      console.log(222);
    },
    // 使用印章例子
    sealExample(){
      console.log(111);
    },
    //列设置更改事件
      onColSettingsChange (checkedValues) {
        var key = this.$route.name+":colsettings";
        Vue.ls.set(key, checkedValues, 7 * 24 * 60 * 60 * 1000)
        this.settingColumns = checkedValues;
        const cols = this.defColumns.filter(item => {
          if(item.key =='rowIndex'|| item.dataIndex=='action'){
            return true
          }
          if (this.settingColumns.includes(item.dataIndex)) {
            return true
          }
          return false
        })
        this.columns =  cols;
      },
      initColumns(){
        //权限过滤（列权限控制时打开，修改第二个参数为授权码前缀）
        //this.defColumns = colAuthFilter(this.defColumns,'testdemo:');

        var key = this.$route.name+":colsettings";
        let colSettings= Vue.ls.get(key);
        if(colSettings==null||colSettings==undefined){
          let allSettingColumns = [];
          this.defColumns.forEach(function (item,i,array ) {
            allSettingColumns.push(item.dataIndex);
          })
          this.settingColumns = allSettingColumns;
          this.columns = this.defColumns;
        }else{
          this.settingColumns = colSettings;
          const cols = this.defColumns.filter(item => {
            if(item.key =='rowIndex'|| item.dataIndex=='action'){
              return true;
            }
            if (colSettings.includes(item.dataIndex)) {
              return true;
            }
            return false;
          })
          this.columns =  cols;
        }
      }
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less';
</style>