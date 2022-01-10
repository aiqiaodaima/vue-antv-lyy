<template>
  <!-- 场外清算可领取任务 -->
  <a-card :bordered="false">
    <!-- 表单区域 -->
    <div>
      <a-button class="ant-alert ant-alert-info" style="margin-bottom: 8px" icon="profile" @click="getTesk"
        >领取任务</a-button
      >
      <a-button class="ant-alert ant-alert-info" style="margin-left: 8px" @click="example"> 例子1 </a-button>
      <a-button class="ant-alert ant-alert-info" style="margin-left: 8px" @click="sealExample"> 用印经办例子 </a-button>
    </div>
    <a-table
      ref="table"
      rowKey="uuid"
      size="middle"
      :scroll="{ x: dataSource.length > 0 ? '2500px' : 'max-content' }"
      :dataSource="dataSource"
      :loading="loading"
      :columns="columns"
      :pagination="pagination"
      @change="handleTableChange"
      bordered
      :rowSelection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
      }"
    >
      <div slot="filterDropdown">
        <a-card>
          <a-checkbox-group @change="onColSettingsChange" v-model="settingColumns" :defaultValue="settingColumns">
            <a-row style="width: 400px">
              <template v-for="item in defColumns">
                <template v-if="item.key != 'rowIndex' && item.dataIndex != 'action'">
                  <a-col :span="12" :key="item.dataIndex"
                    ><a-checkbox :value="item.dataIndex"
                      ><j-ellipsis :value="item.title" :length="10"></j-ellipsis></a-checkbox
                  ></a-col>
                </template>
              </template>
            </a-row>
          </a-checkbox-group>
        </a-card>
      </div>
      <a-icon slot="filterIcon" type="setting" :style="{ fontSize: '16px', color: '#108ee9' }" />
      <template slot="action" slot-scope="text, record">
        <div class="editable-row-operations">
          <span style="color: blue; cursor: pointer; margin-left: 10px" @click="detail(record)">详情</span>
          <span style="color: red; cursor: pointer; margin-left: 10px" @click="processChart(record)">流程图</span>
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
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN'
import moment from 'moment'
import Vue from 'vue'
import getTaskModal from './getTaskModal.vue'
import detailModal from './detailModal.vue'
import processModal from './processModal.vue'
import { postAction, getAction } from '@/api/manage'
import { filterObj } from '@/utils/util'

const dataSource = [
  { rowIndex: '1', name: '指令1', punchTime: '划款' },
  { rowIndex: '2', name: '指令2', punchTime: 'xianjin' },
  { rowIndex: '3', name: '指令3', punchTime: '支付宝' },
]

export default {
  components: { getTaskModal, detailModal, processModal },
  data() {
    return {
      locale,
      moment,
      loading: false,
      filterData: {},
      // dataSource: dataSource,
      dataSource: [],
      selectedRowKeys: [],
      selectionRows: [],
      columns: [],
      settingColumns: [],
      url: {
        list: 'task/agency/list',
        detail: 'task/agency/details',
        receive: 'task/agency/receive',
      },
      defColumns: [
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
          title: '指令编号',
          align: 'center',
          dataIndex: 'caseNo',
        },
        {
          title: '指令来源',
          align: 'center',
          dataIndex: 'channel',
        },
        {
          title: '指令类型',
          align: 'center',
          dataIndex: 'caseType',
        },
        {
          title: '项目名称',
          align: 'center',
          dataIndex: 'projectName',
        },
        {
          title: '客户名称',
          align: 'center',
          dataIndex: 'customerName',
        },
        {
          title: '金额/份额',
          align: 'center',
          dataIndex: 'amount',
        },
        {
          title: '划款日期',
          align: 'center',
          dataIndex: 'transferDate',
        },
        {
          title: '批量类型',
          align: 'center',
          dataIndex: 'batchType',
        },
        {
          title: '优先级',
          align: 'center',
          dataIndex: 'urgentLevel',
        },
        {
          title: '业务类型',
          align: 'center',
          dataIndex: 'bizTypeName',
        },
        {
          title: '所属机构',
          align: 'center',
          dataIndex: 'organ',
        },
        {
          title: '接收时间',
          align: 'center',
          dataIndex: 'launchDate',
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'action',
          },
        },
      ],
      // 分页信息
      pagination: {
        current: 1,
        pageSize: 10,
        pageSizeOptions: ['10', '20', '30'],
        showTotal: (total, range) => {
          return range[0] + '-' + range[1] + ' 共' + total + '条'
        },
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0,
      },
      activeKey: '',
    }
  },
  watch: {
    activeKey(newVal, oldVal) {
      console.log(newVal, oldVal)
      this.activeKey = newVal
      // this.loadData():
    },
  },
  created() {
    this.initColumns()
  },
  mounted() {},
  computed: {},
  methods: {
    // 查询
    searchQuery() {
      console.log(this.filterData)
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          // this.loadData(1);
        } else {
          console.log('error submit!')
          return false
        }
      })
    },
    // 重置
    searchReset() {
      this.filterData = {}
      this.selectedRowKeys = []
      this.selectionRows = []
      this.$refs.ruleForm.resetFields()
    },
    // 刷新重置
    refreshList() {
      // this.loadData(1);
    },
    // 发起时间
    onChange(value, dateString) {
      console.log(dateString[0], dateString[1])
      this.filterData.startTime_begin = dateString[0]
      this.filterData.startTime_end = dateString[1]
    },
    // 划款时间
    onChangeTime(value, dateString) {
      console.log(dateString[0], dateString[1])
      this.filterData.time_begin = dateString[0]
      this.filterData.time_end = dateString[1]
    },
    // 详情
    detail(row) {
      this.$refs.detailModal.visible = true
      this.$refs.detailModal.caseNo = row.caseNo
      this.$refs.detailModal.title = '详情'
    },
    // 流程图
    processChart() {
      this.$refs.processModal.visible = true
      this.$refs.processModal.title = '流程图设计'
    },
    // 领取任务
    getTesk() {
      if (this.selectionRows.length === 0) {
        return this.$message.warning('请先选择任务')
      }
      this.loading = true
      let promiseArr = []
      this.selectionRows.forEach((item) => {
        console.log(item)
        promiseArr.push(
          new Promise((resolve, reject) => {
            getAction(this.url.receive, { caseNo: item.caseNo }).then(({ code }) => {
              if (code === 200) {
                resolve('成功了')
                // TODO 领取任务成功
                // this.dataSource = res.data.content
                // this.ipagination.total = res.data.totalElements
              } else {
                reject('失败了')
              }
            })
          })
        )
      })
      Promise.all(promiseArr)
        .then((result) => {
          console.log(result)
          this.$message.success('任务领取成功')
        })
        .catch((error) => {
          console.log(error) // 失败了，打出 '失败'
        })
        .finally(() => {
          this.loading = false
        })

      // this.$refs.getTaskModal.visible = true
      // this.$refs.getTaskModal.title = '提醒'
    },
    onSelectChange(selectedRowKeys, selectionRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectionRows = selectionRows
    },
    handleTableChange(pagination, filters, sorter) {
      //分页、排序、筛选变化时触发
      //TODO 筛选
      console.log(pagination)
      if (Object.keys(sorter).length > 0) {
        this.isorter.column = sorter.field
        this.isorter.order = 'ascend' == sorter.order ? 'asc' : 'desc'
      }
      this.ipagination = pagination
      this.loadData()
    },
    // 例子
    example() {
      console.log(222)
    },
    // 使用印章例子
    sealExample() {
      console.log(111)
    },
    //列设置更改事件
    onColSettingsChange(checkedValues) {
      var key = this.$route.name + ':colsettings'
      Vue.ls.set(key, checkedValues, 7 * 24 * 60 * 60 * 1000)
      this.settingColumns = checkedValues
      const cols = this.defColumns.filter((item) => {
        if (item.key == 'rowIndex' || item.dataIndex == 'action') {
          return true
        }
        if (this.settingColumns.includes(item.dataIndex)) {
          return true
        }
        return false
      })
      this.columns = cols
    },
    initColumns() {
      //权限过滤（列权限控制时打开，修改第二个参数为授权码前缀）
      //this.defColumns = colAuthFilter(this.defColumns,'testdemo:');

      var key = this.$route.name + ':colsettings'
      let colSettings = Vue.ls.get(key)
      if (colSettings == null || colSettings == undefined) {
        let allSettingColumns = []
        this.defColumns.forEach(function (item, i, array) {
          allSettingColumns.push(item.dataIndex)
        })
        this.settingColumns = allSettingColumns
        this.columns = this.defColumns
      } else {
        this.settingColumns = colSettings
        const cols = this.defColumns.filter((item) => {
          if (item.key == 'rowIndex' || item.dataIndex == 'action') {
            return true
          }
          if (colSettings.includes(item.dataIndex)) {
            return true
          }
          return false
        })
        this.columns = cols
      }
    },
    //获取查询条件
    getQueryParams() {
      var param = {
        // sortDatas: this.sortDatas,
        agencyTaskReq: {
          ...this.filterData,
          queryType: this.activeKey,
        },
        offset: this.pagination.current,
        pageSize: this.pagination.pageSize,
      }
      return filterObj(param)
    },
    loadData(arg) {
      this.dataSource = [
        { rowIndex: '1', caseNo: `指令${this.activeKey}`, channel: '划款' },
        { rowIndex: '2', caseNo: '指令2', channel: 'xianjin' },
        { rowIndex: '3', caseNo: '指令3', channel: '支付宝' },
      ]
      if (!this.url.list) {
        this.$message.error('请设置url.list属性!')
        return
      }
      //加载数据 若传入参数1则加载第一页的内容
      if (arg === 1) {
        this.pagination.current = 1
        this.pageData.page = 0
      }
      var params = this.getQueryParams() //查询条件
      this.loading = true
      postAction(this.url.list, params)
        .then((res) => {
          if (res.ret == 0) {
            this.dataSource = res.data.content
            this.ipagination.total = res.data.totalElements
          }
          this.loading = false
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>
<style scoped>
@import '~@assets/less/common.less';
</style>