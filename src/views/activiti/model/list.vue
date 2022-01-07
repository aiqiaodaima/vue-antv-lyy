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
                <a-button type="primary" @click="showCreateObj" icon="search">创建模型</a-button>
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
      <!-- 字符串超长截取省略号显示-->
      <span slot="operation" slot-scope="text, record">
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
      <a-form-model ref="createObjForm"
                    layout="horizontal"
                    :model="model"
                    :rules="rules"
                    :label-col="{span: 4}"
                    :wrapper-col="{span: 14}"
      >
        <a-form-model-item label="模型名称" prop="name">
          <a-input v-model="model.name" placeholder="请输入模型名称" />
        </a-form-model-item>
        <a-form-model-item label="指令来源" prop="caseSource">
          <a-select v-model="model.caseSource"
                    placeholder="请选择指令来源"
          >
            <a-select-option value="">
              请选择
            </a-select-option>
            <a-select-option v-for=" v in createObj.caseSource" :key="v.value">
              {{ v.text }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="指令类型" prop="caseType">
          <a-select v-model="model.caseType"
                    placeholder="请选择指令类型"
          >
            <a-select-option value="">
              请选择
            </a-select-option>
            <a-select-option v-for=" v in createObj.caseType" :key="v.value">
              {{ v.text }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="业务类型" required prop="caseBusinessType">
          <a-select v-model="model.caseBusinessType"
                    placeholder="请选择业务类型"
          >
            <a-select-option value="">
              请选择
            </a-select-option>
            <a-select-option v-for=" v in createObj.caseBusinessType" :key="v.value">
              {{ v.text }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-form-model>
    </a-modal>

    <a-modal
      title="设计模型"
      :visible="updateObj.visible"
      :maskClosable="false"
      width="100%"
      ok-text="部署"
      cancel-text="关闭"
      @ok="deploy"
      @cancel="cancelDesign"
    >
      <a-card :bordered="false" style="height: 100%">
        <bpmn-modeler ref="modeler" v-model="modeler" :customPropertiesPanel="true" :key="key" />
      </a-card>

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
import { postAction, deleteAction, getAction } from '@api/manage'
import store from '@/store'

export default {
  name: 'ModelList',
  // components: [VueBpmnModeler],
  mixins: [LeadingtekListMixin],
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
          this.createObj.caseType = e.result
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
      key: null,
      lastModeler: {},
      modelId: null,
      modeler: {
        // 模型xml数据
        xmlData: '',
        // svg图片数据
        svgImage: ''
      },
      modelerMap: {},
      url: {
        list: '/activiti/model',
        create: '/activiti/model/create',
        delete: '/activiti/models/',
        design: '/activiti/modeler.html',
        export: '/activiti/models/export/',
        diagram: '/activiti/models/exportDiagram',
        deploy: '/activiti/model/deploy',
        dict: '/sys/dict/getDictItems/'
      },
      createObj: {
        visible: false,
        confirmLoading: false,
        name: '',
        key: '',
        description: '',
        caseSource: [],
        caseType: [],
        caseBusinessType: []
      },
      model: {
        name: '',
        caseSource: '',
        caseType: '',
        caseBusinessType: ''
      },
      rules: {
        'name': [
          { required: true, message: '模型名称不能为空', trigger: 'blur' }
        ],
        'caseSource': [
          { required: true, message: '指令来源不能为空', trigger: 'blur' }
        ],
        'caseType': [
          { required: true, message: '指令类型不能为空', trigger: 'blur' }
        ],
        'caseBusinessType': [
          { required: true, message: '业务类型不能为空', trigger: 'blur' }
        ]
      },
      updateObj: {
        visible: false,
        confirmLoading: false
      },
      queryParam: {
        name: ''
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
          title: '是否部署', width: 150,
          dataIndex: 'deployId',
          align: 'center',
          scopedSlots: { customRender: 'deploymentId' },
          customRender: function(value) {
            return value === null ? '未部署' : '已经部署'
          }
        },
        {
          title: '操作', width: 250,
          dataIndex: '',
          scopedSlots: { customRender: 'operation' },
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
     * 显示创建模型
     */
    showCreateObj() {
      this.createObj.visible = true
      this.model = {
        name: '',
        caseSource: '',
        caseType: '',
        caseBusinessType: ''
      }
    },
    /**
     * 创建模型
     */
    createModel() {
      this.$refs.createObjForm.validate(valid => {
        console.log(valid)
        if (valid) {
          postAction(this.url.create, this.model)
            .then((response) => {
              console.log('createModel', response)
              this.createObj.confirmLoading = true
              if (response.success === true) {
                this.createObj.visible = false
                this.$message.success('模型创建成功')
              }
              this.createObj.confirmLoading = false
              this.loadData(this.ipagination.current)
            })
        } else {
          this.$message.error('请填写表单信息')
        }
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
          _this.modelId = id
          getAction('/activiti/model/diagram?modelId='+id)
          .then(({message})=>{
            this.modeler.xmlData = message
            console.log('modeler',this.modeler)
          })
          // _this.key = new Date().getTime()
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
    deploy() {
      postAction(this.url.deploy, { id: this.modelId, xml: this.modeler.xmlData })
        .then(response => {
          console.log(response)
          if (response.success) {
            this.$message.success('部署成功')
          } else {
            this.$message.error('部署失败')
          }
          this.updateObj.visible = false
          this.createObj.confirmLoading = true
          this.loadData(this.ipagination.current)
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
    }
    // deployment(row) {
    //   let url = this.url.deployment + row.id
    //   let name = row.name
    //   let _this = this
    //   this.$confirm({
    //     title: '确认部署流程?',
    //     content: `确认部署流程：${name}`,
    //     onOk() {
    //       getAction(url).then((response) => {
    //         if (response.success === true) {
    //           _this.$message.success(response.message)
    //         } else {
    //           _this.$message.error(response.message)
    //         }
    //         _this.loadData(_this.ipagination.current)
    //       })
    //     }
    //   })
    // }
  }
}
</script>


<style scoped lang="less">
@import '~@assets/less/common.less';

/deep/ .ant-modal {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

/deep/ .ant-modal-body {
  height: 800px;
}
</style>