<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8">
            <a-form-item label="模型名称">
              <a-input placeholder="请输入搜索关键词" v-model="queryParam.name"></a-input>
            </a-form-item>
          </a-col>

          <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
            <a-col :md="6" :sm="12">
                <a-button type="primary" style="left: 10px" @click="searchQuery" icon="search">查询</a-button>
                <a-button type="primary" @click="searchReset" icon="reload"
                          style="margin-left: 8px;left: 10px">重置</a-button>
            </a-col>
          </span>
        </a-row>
      </a-form>
    </div>

    <a-table :scroll="{x:1280}" bordered
             ref="table"
             size="middle"
             rowKey="id"
             :columns="columns"
             :dataSource="dataSource"
             :pagination="ipagination"
             :loading="loading"
             @change="handleTableChange">
      <span slot="operation" slot-scope="text, row">
        <a href="javascript:void(0);" v-if="true" @click="editStatus(1,row)" style="color: rgb(144,96,255);">启用</a>
        <a href="javascript:void(0);" v-if="false" @click="editStatus(0,row)" style="color: #cb892d">禁用</a>
        <a-divider type="vertical" />
        <a href="javascript:void(0);" @click="getNodeData(row)">节点设置</a>
        <a-divider type="vertical" />
        <a href="javascript:void(0);" style="color: red;" @click="remove(r)">删除</a>
      </span>
    </a-table>

    <!--节点设置-->
    <a-modal
      title="编辑流程节点" width="900px" :maskClosable="false"
      :confirmLoading="confirmLoading"
      :visible="showProcessNodeEdit"
      :footer="null"
      @cancel="closeNode"
    >
      <a-row>
        <a-col :md="4" :sm="4" style="border-right: 1px solid #999">
          <!--          选择流程节点-->
          <a-steps direction="vertical" :current="current" size="small">
            <template v-for="(item,i) in nodeList">
              <a-step style="cursor: pointer;" :title="item.title"
                      :description="item.name" :status="i===current?'process':'wait'"
                      @click="changeStep(item,i)" />
            </template>
          </a-steps>
        </a-col>
        <a-col :md="20" :sm="20">
          <a-alert message="温馨提示：若流程运行至未分配审批人员的审批节点时，流程将自动中断取消！" banner />
          <span></span>
          <a-form :form="nodeForm" v-if="showProcessNodeEdit">
            <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="节点名称">
              <span class="nodespan">{{ editNode.name }}</span>
            </a-form-item>
            <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="节点类型">
              <span class="nodespan">{{ dictNodeType[1] }}</span>
            </a-form-item>
            <a-alert type="info" message="每个节点设置，如有修改都请保存一次，跳转节点后数据不会自动保存！" banner />
            <br />
            <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="审批人员" v-show="editNode.type==1">
              <a-checkbox-group @change="spryType" v-model="spryTypes">
                <!-- 0:根据角色选择 1:直接选择人员 2:部门 3:发起人 4:发起人的部门负责人 5:部门负责人 6:表单变量-->
                <a-checkbox value="0"> 根据角色选择</a-checkbox>
                <a-checkbox value="1"> 直接选择人员</a-checkbox>
                <a-checkbox value="2"> 部门</a-checkbox>
                <a-checkbox value="5"> 部门负责人</a-checkbox>
                <a-checkbox value="3">
                  发起人
                  <a-tooltip placement="topLeft" title="自动获取发起人">
                    <a-icon type="exclamation-circle" />
                  </a-tooltip>
                </a-checkbox>
                <a-checkbox value="4">
                  发起人的部门负责人
                  <a-tooltip placement="topLeft" title="自动获取发起人所在部门的负责人，即其上级领导。（如果其本身就是部门负责人，则指向发起人自己。）">
                    <a-icon type="exclamation-circle" />
                  </a-tooltip>
                </a-checkbox>
                <a-checkbox value="6">
                  表单变量
                  <a-tooltip placement="topLeft"
                             title="填写与表单中相对应的变量，role:角色，user:人员：dept:部门：deptManage:部门负责人; 例如：variable:role,variable2:user;">
                    <a-icon type="exclamation-circle" />
                  </a-tooltip>
                </a-checkbox>

              </a-checkbox-group>
            </a-form-item>
            <!--            0角色 1用户 2部门 3发起人 4发起人的部门负责人-->
            <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="选择角色" v-if="spryTypes.indexOf('0')>-1">
              <j-select-role v-model="spry.roleIds" />
            </a-form-item>
            <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="选择人员" v-if="spryTypes.indexOf('1')>-1">
              <!--  通过部门选择用户控件 -->
              <j-select-user-by-dep v-model="spry.userIds" store="id" :multi="true"></j-select-user-by-dep>
            </a-form-item>
            <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="选择部门" v-if="spryTypes.indexOf('2')>-1">
              <j-select-depart v-model="spry.departmentIds" :multi="true"></j-select-depart>
            </a-form-item>
            <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="选择部门负责人"
                         v-if="spryTypes.indexOf('5')>-1">
              <j-select-depart v-model="spry.departmentManageIds" :multi="true"></j-select-depart>
            </a-form-item>
            <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="输入表单变量"
                         v-if="spryTypes.indexOf('6')>-1">
              <a-input v-model="spry.formVariables" :multi="true"></a-input>
            </a-form-item>
            <!--btn-->
            <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
              <a-button @click="sprySubmit" type="primary" html-type="submit"
                        :disabled="editNode.type==0||editNode.type==2||confirmLoading">
                提交并保存
              </a-button>

              <a-button @click="closeNode" style="margin-left: 10px">
                关闭
              </a-button>
            </a-form-item>
          </a-form>
        </a-col>
      </a-row>
    </a-modal>
  </a-card>

</template>

<script>
import { LeadingtekListMixin } from '@/mixins/LeadingtekListMixin'
import JEllipsis from '@/components/leadingtek/JEllipsis'
import JTreeSelect from '@/components/leadingtek/JTreeSelect'
import JTreeDict from '@/components/leadingtek/JTreeDict'
import JSelectUserByDep from '@/components/leadingtekbiz/JSelectUserByDep'
import JSelectRole from '@/components/leadingtekbiz/JSelectRole'
import JSelectDepart from '@/components/leadingtekbiz/JSelectDepart'
import store from '@/store'
import { getAction, postAction } from '@api/manage'

export default {
  name: 'ProcessModelList',
  mixins: [LeadingtekListMixin],
  components: {
    JEllipsis, JSelectUserByDep, JSelectRole, JSelectDepart
    , JTreeSelect, JTreeDict
  },
  created: function() {
    store.dispatch('updateCaseSource', this.url.dict + 'case_source')
      .then(e => {
        console.log(e)
        if (e.success) {
          this.createObj.caseSource = e.result
        }
      })

    store.dispatch('updateCaseType', this.url.dict + 'case_type')
      .then((e) => {
        console.log(e)
        if (e.success) {
          this.createObj.caseSource = e.result
        }
      })

    store.dispatch('updateCaseBusinessType', this.url.dict + 'case_business_type')
      .then((e) => {
        console.log(e)
        if (e.success) {
          this.createObj.caseBusinessType = e.result
        }
      })
  },
  data() {
    return {
      queryParam: {
        deployed: 1
      },
      createObj: {
        caseSource: [],
        caseType: [],
        caseBusinessType: []
      },
      url: {
        list: '/activiti/model',
        dict: '/sys/dict/getDictItems/',
        getProcessNode: '/activiti/model/nodes',
        editNodeUser: '/activiti/model/node/' +
          'edit'
      },
      columns: [
        {
          title: '#', width: 50,
          dataIndex: '',
          key: 'rowIndex',
          align: 'center',
          customRender: function(time, row, index) {
            return parseInt(index) + 1
          }
        },
        {
          title: '模型id', width: 150,
          align: 'center',
          dataIndex: 'id'
        },
        {
          title: '模型名称', width: 150,
          align: 'center',
          dataIndex: 'name',
          scopedSlots: { customRender: 'name' }
        },
        {
          title: '指令来源', width: 150,
          dataIndex: 'caseSource',
          align: 'center',
          scopedSlots: { customRender: 'caseSource' },
          customRender: function(value) {
            let caseSource = store.getters.model.case_source.filter(v => v.value === value).map(e => {
              return e.text
            })
            return caseSource[0]
          }
        },
        {
          title: '指令类型', width: 80,
          dataIndex: 'caseType',
          align: 'center',
          scopedSlots: { customRender: 'caseType' },
          customRender: function(value) {
            let caseType = store.getters.model.case_type.filter(v => v.value === value).map(e => {
              return e.text
            })
            return caseType[0]
          }
        },
        {
          title: '业务类型', width: 150,
          dataIndex: 'caseBusinessType',
          align: 'center',
          scopedSlots: { customRender: 'caseBusinessType' },
          customRender: function(value) {
            let caseType = store.getters.model.case_business_type.filter(v => v.value === value).map(e => {
              return e.text
            })
            return caseType[0]
          }
        },
        {
          title: '操作', width: 250,
          dataIndex: '',
          scopedSlots: { customRender: 'operation' },
          align: 'center'
        }
      ],
      updateRow: {},
      confirmLoading: false,
      current: 0,
      nodeForm: this.$form.createForm(this),
      showProcessNodeEdit: false,
      nodeList: [],
      labelCol: {
        xs: { span: 4 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 20 },
        sm: { span: 20 }
      },
      dictNodeType: {
        '0': '开始节点',
        '1': '审批节点',
        '2': '结束节点'
      },
      spryTypes: [],
      editNode: {},
      spry: {
        //选中的用户
        userIds: '',
        roleIds: '',
        departmentIds: '',
        departmentManageIds: '',
        formVariables: '',
        chooseSponsor: false,
        chooseDepHeader: false
      }
    }
  },
  computed: {},
  methods: {
    /**
     * 查询
     */
    searchQuery() {
      this.queryParam = {
        deployed: 1
      }
      this.loadData()
    },
    /**
     * 重置
     */
    searchReset() {
      this.queryParam = {}
      this.loadData(this.ipagination.current)
    },
    /**
     * 获取节点数据
     * @param row 行内容
     */
    getNodeData(row) {
      let _this = this
      this.updateRow = row
      getAction(_this.url.getProcessNode, {
        id: row.id
      }).then(({ message, result, success }) => {
        if (success) {
          _this.nodeList = result || []
          console.log('_this.nodeList', _this.nodeList)
          if (_this.nodeList.length > 0) {
            _this.editNode = _this.nodeList[_this.current]
            console.log(_this.current, _this.editNode)
            _this.showProcessNodeEdit = true
          }
        } else {
          _this.$message.error(message)
        }
      })
    },
    /**
     * 关闭节点设置
     */
    closeNode() {
      this.showProcessNodeEdit = false
      this.current = 0
      this.spryTypes = []
      this.spry = {}
    },
    /**
     * 选择节点
     * @param node 节点信息
     * @param index 索引
     */
    changeStep(node, index) {
      this.spryTypes = []
      console.log('onChange:', node)
      this.current = index
      this.editNode = node
      // 0:根据角色选择 1:直接选择人员 2:部门 3:发起人 4:发起人的部门负责人 5:部门负责人 6:表单变量
      // 发起人的部门负责人
      this.spry.chooseDepHeader = node.chooseDepHeader || false
      if (this.spry.chooseDepHeader) {
        this.spryTypes.push('4')
      }
      // 发起人
      this.spry.chooseSponsor = node.chooseSponsor || false
      if (this.spry.chooseSponsor) {
        this.spryTypes.push('3')
      }
      // 直接选择人员
      let userIds = []
      for (const user of node.users || []) {
        userIds.push(user.id)
      }
      this.spry.userIds = userIds.join(',')
      if (userIds.length > 0) {
        this.spryTypes.push('1')
      }
      // 根据角色选择
      let roleIds = []
      for (const role of node.roles || []) {
        roleIds.push(role.id)
      }
      this.spry.roleIds = roleIds.join(',')
      if (roleIds.length > 0) {
        this.spryTypes.push('0')
      }
      // 部门
      let departmentIds = []
      for (const department of node.departments || []) {
        departmentIds.push(department.id)
      }
      this.spry.departmentIds = departmentIds.join(',')
      if (departmentIds.length > 0) {
        this.spryTypes.push('2')
      }
      // 部门负责人
      let departmentManageIds = []
      for (const departmentManage of node.departmentManages || []) {
        departmentManageIds.push(departmentManage.id)
      }
      this.spry.departmentManageIds = departmentManageIds.join(',')
      if (departmentManageIds.length > 0) {
        this.spryTypes.push('5')
      }
      console.log('回显this.spry', this.spry)

      // 表单变量
      this.spry.formVariables = node.formVariables || ''
      if (this.spry.formVariables) {
        this.spryTypes.push('6')
      }
    },
    spryType(types) {
      // 0:根据角色选择 1:直接选择人员 2:部门 3:发起人 4:发起人的部门负责人 5:部门负责人 6:表单变量
      // 根据角色选择
      if (this.spryTypes.indexOf('0') === -1) {
        this.spry.roleIds = ''
      }
      // 直接选择人员
      if (this.spryTypes.indexOf('1') === -1) {
        this.spry.userIds = ''
      }
      // 部门
      if (this.spryTypes.indexOf('2') === -1) this.spry.departmentIds = ''
      // 部门负责人
      if (this.spryTypes.indexOf('5') === -1) this.spry.departmentManageIds = ''
      // 表单变量
      if (this.spryTypes.indexOf('6') === -1) this.spry.formVariable = ''
      //是否选中发起人
      this.spry.chooseSponsor = this.spryTypes.indexOf('3') > -1
      //是否选中发起人的部门领导
      this.spry.chooseDepHeader = this.spryTypes.indexOf('4') > -1

      console.log('this.spry', this.spry)
    },
    sprySubmit() {
      let _this = this
      if (this.spryTypes.length === 0) {
        _this.$message.error('必须选择审批人！')
        return
      }
      _this.confirmLoading = true
      console.log('添加节点审批信息', this.spry)
      console.log('更新的行数据', this.updateRow)
      console.log('编辑节点', this.editNode)
      let data = {
        modelId: this.updateRow.id,
        taskKey: this.editNode.taskKey,
        ...this.spry
      }
      console.log('保存数据', data)
      postAction(_this.url.editNodeUser, data).then(({ message, success }) => {
        if (success) {
          _this.$message.success('操作成功')
          /*保存成功后回显数据*/
          _this.getNodeData(_this.updateRow)
        } else {
          _this.$message.error(message)
        }
      }).finally(() => _this.confirmLoading = false)
    }
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less';

.nodespan {
  color: #999;
}

.ant-checkbox-wrapper + .ant-checkbox-wrapper {
  margin-left: 0;
  margin-right: 8px;
}
</style>