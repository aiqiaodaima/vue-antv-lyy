<template>
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
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 18 }"
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
            :loading="loading"
            >重置</a-button
          >
        </a-form-model-item>
      </a-form-model>
    </div>
    <!-- 表格区域 -->
    <a-table
      ref="table"
      rowKey="uuid"
      size="middle"
      :scroll="{ x: dataSource.length > 0 ? '2500px' : 'max-content' }"
      :dataSource="dataSource"
      :loading="loading"
    >
      <a-table-column
        title="截至时间"
        data-index="lastTime"
        width="70px"
        align="center"
      />
      <a-table-column
        title="收支合计金额"
        data-index="tranTotalAmountD"
        width="70px"
        align="center"
      />
      <a-table-column
        title="企业家数"
        data-index="entNum"
        align="center"
        width="70px"
      />
      <a-table-column title="操作" align="center" width="90px">
        <template slot-scope="record">
          <div class="editable-row-operations">
            <span
              style="color: blue; cursor: pointer; margin-left: 10px"
              @click="edit('edit', record)"
              >修改
            </span>
            <a-popconfirm
              title="是否需要删除该条数据?"
              ok-text="删除"
              cancel-text="取消"
              @confirm="confirm"
              @cancel="cancel"
            >
              <span
                style="color: red; cursor: pointer; margin-left: 10px"
                @click="edit('delete', record)"
                >删除
              </span>
            </a-popconfirm>
          </div>
        </template>
      </a-table-column>
    </a-table>
  </a-card>
</template>
<script>
import locale from "ant-design-vue/es/date-picker/locale/zh_CN";
import moment from "moment";
export default {
  components: {},
  data() {
    return {
      locale,
      moment,
      loading: false,
      filterData: {},
      dataSource: [],
    }
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
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less';
</style>