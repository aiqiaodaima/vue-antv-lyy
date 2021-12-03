<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8">
            <a-form-item label="模型名称">
              <a-input placeholder="请输入搜索关键词" v-model="queryParam.keyword"></a-input>
            </a-form-item>
          </a-col>

          <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
            <a-col :md="6" :sm="12">
                <a-button type="primary" style="left: 10px" @click="searchQuery" icon="search">查询</a-button>
                <a-button type="primary" @click="searchReset" icon="reload"
                          style="margin-left: 8px;left: 10px">重置</a-button>
            </a-col>
          </span>
          <span style="float: right;overflow: hidden;" class="table-page-search-submitButtons">
<!--            <a-col :md="12" :sm="12">-->
            <!--                <a-upload-->
            <!--                  name="uploadfile"-->
            <!--                  :multiple="true"-->
            <!--                  action="http://localhost:8080/jeecg-boot/activiti/models/uploadFile"-->
            <!--                  @change="handleChange"-->
            <!--                  :showUploadList="false"-->
            <!--                >-->
            <!--                  <a-button type="primary"> <a-icon type="upload" /> 上传模型 </a-button>-->
            <!--                </a-upload>-->
            <!--            </a-col>-->
            <a-col :md="12" :sm="12">
                <a-button type="primary" @click="createObj.visible=true" icon="search">创建模型</a-button>
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
      <span slot="revision" slot-scope="text, record">
        v.{{ text }}
      </span>
      <span slot="metaInfo" slot-scope="text, record">
        <j-ellipsis :value="JSON.parse(text).description" :length="10" />
      </span>
      <!-- 字符串超长截取省略号显示-->
      <span slot="logContent" slot-scope="text, record">
          <j-ellipsis :value="text" :length="10" />
        </span>
      <span slot="make" slot-scope="text, record">
        <a href="javascript:void(0);" @click="deployment(record)">发布</a>
        <a-divider type="vertical" />
        <a href="javascript:void(0);" @click="design(record.id)">设计</a>
        <a-divider type="vertical" />
        <a-popconfirm
          title="是否确认删除?"
          @confirm="deleteModel(1,record)"
          @cancel="deleteModel(0)"
          okText="Yes"
          cancelText="No"
        >
          <a href="javascript:void(0);">删除</a>
        </a-popconfirm>
        <a-divider type="vertical" />
        <a href="javascript:void(0);" @click="exportModel(record.id,'bpmn')">xml</a>
        <a-divider type="vertical" />
        <a href="javascript:void(0);" @click="exportDiagram(record)">图解</a>

      </span>
    </a-table>

    <a-modal
      title="创建模型"
      :visible="createObj.visible"
      @ok="createModel"
      :confirmLoading="createObj.confirmLoading"
      @cancel="createObj.visible = false"
    >
      <div>
        模型名称：
        <a-input placeholder="输入模型名称" v-model="createObj.name"></a-input>
        <br />
        模型Key：
        <a-input placeholder="输入模型Key" v-model="createObj.key"></a-input>
        <br />
        模型描述：
        <a-textarea placeholder="输入模型描述" v-model="createObj.description" :rows="4" />
      </div>
    </a-modal>

    <a-modal
      title="设计模型"
      :visible="updateObj.visible"
      :footer="null" :maskClosable="false"
      width="90%"
      @cancel="cancelDesign"
      style="top: 20px;"
    >
      <BpmnModeler v-model="modeler"></BpmnModeler>
      <!--      <iframe :src="iframeUrl" frameborder="0" width="100%" height="800px" scrolling="auto"-->
      <!--              style="background-color: #fff;" />-->
    </a-modal>
    <a-modal
      :title="viewTitle" width="90%"
      :visible="viewImage" :footer="null"
      @cancel="viewImage = false"
    >
      <div style="min-height: 400px">
        <img :src="diagramUrl" :alt="viewTitle">
      </div>
    </a-modal>
  </a-card>
</template>

<script>
import { LeadingtekListMixin } from '@/mixins/LeadingtekListMixin'
import { postAction, deleteAction, getAction } from '@/api/manage'
// import { VueBpmnModeler } from 'vue-bpmn-modeler'
// import 'vue-bpmn-modeler/lib/vue-bpmn-modeler.css'

export default {
  name: 'ModelList',
  // components: [VueBpmnModeler],
  mixins: [LeadingtekListMixin],
  data() {
    return {
      modeler:{
        // 模型xml数据
        xmlData: '',
        // svg图片数据
        svgImage: ''
      },
      url: {
        list: '/activiti/models',
        create: '/activiti/models/create',
        delete: '/activiti/models/',
        design: '/activiti/modeler.html',
        export: '/activiti/models/export/',
        diagram: '/activiti/models/exportDiagram',
        deployment: '/activiti/models/deployment/'
      },
      createObj: {
        visible: false,
        confirmLoading: false,
        name: '',
        key: '',
        description: ''
      },
      updateObj: {
        visible: false,
        confirmLoading: false
      },
      queryParam: {
        keyword: ''
      },
      iframeUrl: '',
      diagramUrl: '',
      viewTitle: '',
      viewImage: false,
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
          scopedSlots: { customRender: 'logContent' }
        },
        {
          title: '模型key', width: 150,
          dataIndex: 'key',
          align: 'center'
        },
        {
          title: '版本', width: 80,
          dataIndex: 'revision',
          align: 'center',
          scopedSlots: { customRender: 'revision' }
        },
        {
          title: '备注描述', width: 150,
          dataIndex: 'metaInfo',
          align: 'center',
          scopedSlots: { customRender: 'metaInfo' }
        },
        {
          title: '是否部署', width: 150,
          dataIndex: 'deploymentId',
          align: 'center',
          customRender: function(time, row, index) {
            return row.deploymentId ? '已部署' : '未部署'
          }
        },
        {
          title: '创建时间', width: 150,
          dataIndex: 'createTime',
          align: 'center'
          // sorter:true
        },
        {
          title: '最后更新时间', width: 150,
          dataIndex: 'lastUpdateTime',
          align: 'center'
        },
        {
          title: '操作', width: 250,
          dataIndex: '',
          scopedSlots: { customRender: 'make' },
          align: 'center'
        }
      ]
    }
  },
  methods: {
    searchQuery() {
      this.loadData()
    },
    searchReset() {
      this.queryParam = {}
      this.loadData(this.ipagination.current)
    },
    /**
     * 创建模型
     */
    createModel() {
      postAction(this.url.create, {
        name: this.createObj.name,
        key: this.createObj.key,
        description: this.createObj.description
      })
        .then((response) => {
          console.log(response)
          this.createObj.confirmLoading = true
          if (response.success === true) {
            this.updateObj.visible = true
            this.iframeUrl = `${window._CONFIG['domianURL']}${this.url.design}?modelId=${response.result.id}`
            this.createObj.visible = false
          }
          this.createObj.confirmLoading = false
        })
    },
    /**
     * 删除模型
     * @param status 状态 1： 确定删除 0：取消删除
     * @param row
     */
    deleteModel(status, row) {
      if (status) {
        deleteAction(this.url.delete + row.id)
          .then((response) => {
            console.log(response)
            if (response.success === true) {
              this.loadData(this.ipagination.current)
            }
          })
      }
    },
    /**
     * 设计模型
     * @param id 模型id
     */
    design(id) {
      let _this = this
      this.$message
        .loading('请稍等。。。', 0.8)
        .then(() => {
          _this.createObj.confirmLoading = true
          _this.iframeUrl = `${window._CONFIG['domianURL']}${_this.url.design}?modelId=${id}`
          console.log(_this.iframeUrl)
          _this.updateObj.visible = true
          _this.createObj.confirmLoading = false
        })
    },
    /**
     * 取消设计
     */
    cancelDesign() {
      let _this = this
      this.$confirm({
        title: '关闭前请确认已保存修改?',
        content: '关闭后未保存的修改将丢失！',
        okText: '确认关闭',
        okType: 'danger',
        cancelText: '再看看',
        onOk() {
          _this.updateObj.visible = false
          _this.loadData(_this.ipagination.current)
        },
        onCancel() {
          console.log('Cancel')
        }
      })
    },
    exportModel(id, type) {
      let url = `${window._CONFIG['domianURL']}${this.url.export}${id}/${type}`
      let a = document.createElement('a')
      a.setAttribute('href', url)
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    },
    exportDiagram(row) {
      this.viewTitle = '流程图片预览(' + row.name + ')'
      this.diagramUrl = `${window._CONFIG['domianURL']}${this.url.diagram}?modelId=${row.id}`
      this.viewImage = true
    },
    deployment(row) {
      let url = this.url.deployment + row.id
      let name = row.name
      let _this = this
      this.$confirm({
        title: '确认部署流程?',
        content: `确认部署流程：${name}`,
        onOk() {
          getAction(url).then((response) => {
            if (response.success === true) {
              _this.$message.success(response.message)
            } else {
              _this.$message.error(response.message)
            }
            _this.loadData(_this.ipagination.current)
          })
        }
      })
    }
  }
}
</script>

<style scoped>
@import '~@assets/less/common.less';
</style>