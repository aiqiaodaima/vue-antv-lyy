<template>
  <!-- 单笔指令 -->
  <a-card :border="false">
    <div>
      <a-row>
        <a-col :span="14">
          <div style="border-right: 1px solid #ddd; height: 100vh">
            <iframe :src="pdfhref + pdfSrc" frameborder="0" width="100%" height="100%"></iframe>
          </div>
        </a-col>
        <a-col :span="10">
          <a-form-model ref="ruleForm" :model="formData">
            <a-form-model-item label="业务类别" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
              <a-select v-model="formData.bussinessType">
                <a-select-option key="1" :value="1">指令平台经办-划款指令</a-select-option>
                <a-select-option key="2" :value="2">柜面经办-划款指令</a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item style="margin-top: -30px" label="客户名称" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
              <a-input v-model="formData.customName"></a-input>
            </a-form-model-item>
            <a-form-model-item style="margin-left: 90px; margin-top: -30px">
              <a-radio-group v-model="value" @change="onRadioChange">
                <a-radio :value="1">单笔指令</a-radio>
                <a-radio :value="2">普通批量指令</a-radio>
              </a-radio-group>
            </a-form-model-item>
            <a-form-model-item style="margin-left: 90px; margin-top: -30px">
              <a-checkbox @change="onCheckBoxChange">无需用印</a-checkbox>
            </a-form-model-item>
          </a-form-model>
          <!-- 树型区域1 -->
          <div style="margin-top: -20px;">
            <span style="color: blue; margin-left: 15px;height: 20px"
              >已清分任务
              <a-badge count="5" style="margin-top: -5px" />
            </span>
            <div style="width:500px;height:200px;overflow:hidden">
              <a-tree :treeData="treeData">
                <template slot="custom" slot-scope="item">
                  <div class="tree-view-item" style="height: 250px">
                    <a-icon v-if="item.dataIndex == '1'" type="folder-open" />
                    <a-icon v-if="item.dataIndex == '2'" type="file" />
                    <span class="tree-view-left">{{ item.title }}</span>
                    <span v-if="item.dataIndex == '1'" style="margin-left: 100px">指令平台经办</span>
                    <span v-if="item.dataIndex == '2'" style="margin-left: 155px;"></span>
                    <span style="margin-left: 98px;">1文件</span>
                    <span style="margin-left:50px"><a-icon type="minus"/></span>
                  </div>
                </template>
              </a-tree>
            </div>
          </div>
          <!-- 树型区域2 -->
          <div style="margin-top: -20px;">
            <span style="color: blue; margin-left: 15px;height: 20px"
              >收件箱文件
              <a-badge count="3" style="margin-top: -5px" />
            </span>
            <a-button size="small" style="margin-left:262px" icon="folder" type="primary">从本地添加</a-button>
            <div style="width:500px;height:200px;overflow:hidden">
              <a-tree :treeData="treeData2" checkable>
                <template slot="custom" slot-scope="item">
                  <div class="tree-view-item" style="margin-top: 10px">
                    <a-icon v-if="item.dataIndex == '1'" type="folder-open" />
                    <a-icon v-if="item.dataIndex == '2'" type="file" />
                    <span class="tree-view-left">{{ item.title }}</span>
                    <span v-if="item.dataIndex == '1'" style="margin-left: 150px;"></span>
                    <span v-if="item.dataIndex == '2'" style="margin-left: 100px;margin-right:-15px">中信证券1期</span>
                    <span style="margin-left:155px"><a-icon type="minus" /></span>
                  </div>
                </template>
              </a-tree>
            </div>
          </div>
          <!-- 查找内容区域 -->
          <div>
            <div>
              <a-row :gutter="14">
                <a-col :span="18">
                  <a-form-model-item style="margin-top: -10px" label="查找内容" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
                    <a-input v-model="formData.customName"></a-input>
                  </a-form-model-item>
                </a-col>
                <a-col :span="5">
                  <a-button style="margin-top: -10px">ctrl键切换类型</a-button>
                </a-col>
              </a-row>
            </div>
            <a-table
              ref="table"
              rowKey="uuid"
              size="small"
              :dataSource="dataSource"
              :columns="columns"
              :pagination="false"
            >
            </a-table>
          </div>
          <!-- 提交按钮区域 -->
          <div style="margin-top: 10px">
            <a-button style="float: right; margin-left: 10px" size="small" type="primary"> 取消 </a-button>
            <a-button style="float: right; margin-left: 10px" size="small" type="primary" :loading="loading"> 提交 </a-button>
          </div>
        </a-col>
      </a-row>
    </div>
  </a-card>
</template>

<script>
const treeData = [
  {
    title: '中信证券1期',
    key: '1',
    dataIndex: '1',
    scopedSlots: { title: 'custom' },
    children: [
      {
        title: '66-追加通知书',
        key: '1-1',
        dataIndex: '2', // 层级
        scopedSlots: { title: 'custom' },
      },
    ],
  },
  {
    title: '中信证券1期',
    key: '2',
    dataIndex: '1',
    scopedSlots: { title: 'custom' },
    children: [{ title: '66-追加通知书', dataIndex: '2', key: '2-1', scopedSlots: { title: 'custom' } }],
  },
]
const treeData2 = [
  {
    title: '1页 08/12 本地文件',
    key: '1',
    dataIndex: '1',
    scopedSlots: { title: 'custom' },
    children: [
      {
        title: '66-追加通知书',
        key: '1-1',
        dataIndex: '2', // 层级
        scopedSlots: { title: 'custom' },
      },
    ],
  },
  {
    title: '1页 09/12 本地文件',
    key: '2',
    dataIndex: '1',
    scopedSlots: { title: 'custom' },
    children: [{ title: '66-追加通知书', dataIndex: '2', key: '2-1', scopedSlots: { title: 'custom' } }],
  },
]
const dataSource = [
  {
    contant: '66-追加通知书',
    type: '指令类型',
  },
  {
    contant: '645-追加通知书',
    type: '指令类型',
  },
  {
    contant: '345-追加通知书',
    type: '指令类型',
  },
]
export default {
  data() {
    return {
      treeData,
      treeData2,
      value: '',
      formData: {},
      pdfSrc: '?file=' + window.origin + '/a1.pdf',
      pdfhref: '',
      dataSource: dataSource,
      columns: [
        {
          title: '内容',
          align: 'left',
          dataIndex: 'contant',
        },
        {
          title: '类型',
          align: 'center',
          dataIndex: 'type',
        },
      ],
    }
  },
  mounted() {
    console.log(window)
    this.pdfhref = window.origin + '/pdfjs/web/viewer.html'
  },
  methods: {
    handleOk(e) {
      console.log(e)
      this.visible = false
    },
    onRadioChange(e) {
      console.log('radio checked', e.target.value)
    },
    onCheckBoxChange(e) {
      console.log(`checked = ${e.target.checked}`)
    },
    onHandEidtBranchOffice(e) {
      console.log(e)
    },
    // 树型结构
    // onSelect(keys, event) {
    //   console.log('Trigger Select', keys, event)
    // },
    // onExpand() {
    //   console.log('Trigger Expand')
    // },
    // onSelect(selectedKeys, info) {
    //   console.log('selected', selectedKeys, info)
    // },
    // onCheck(checkedKeys, info) {
    //   console.log('onCheck', checkedKeys, info)
    // },
    // 递归查找
    // searchOption (option, arr, type = 'delect') {
    //   console.log(option, arr)
    //   for (let s = 0; s < arr.length; s++) {
    //     console.log(arr[s].key, option.key)
    //     if (arr[s].key === option.key) {
    //       if (type === 'delect') {
    //         arr.splice(s, 1)
    //       } else {
    //       //这是模拟数据编辑数据
    //         this.$set(arr, s, {
    //           title: '12121212',
    //           key: '12121212',
    //           scopedSlots: { title: 'custom' }
    //         })
    //       }
    //       break
    //     } else if (arr[s].children && arr[s].children.length > 0) { // 递归条件
    //       this.searchOption(option, arr[s].children)
    //     } else {
    //       continue
    //     }
    //   }
    // },

    // remove (data) {
    // 	//先请求后端接口，删除成功后执行
    //   this.searchOption(data, this.treeData)
    // },
  },
}
</script>

<style scoped lang="less">
.ant-tree-title {
  width: 100%;
}
.title {
  float: left;
}
.ant-card-body {
  :global {
    .ant-tree {
      line-height: 3;
      li {
        position: relative;
      }
    }
  }
}
.ant-card-body .but_type {
  float: right;
  position: absolute;
  right: 60px;
}
</style>