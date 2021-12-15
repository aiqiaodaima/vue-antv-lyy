<template>
  <div>
    <a-modal
      :title="title"
      :visible="visible"
      :confirm-loading="confirmLoading"
      :maskClosable="false"
      @cancel="handleCancel"
      :centered="true"
      width="1500px"
      :dialog-style="{ paddingBottom: '0' }"
      :bodyStyle="{ height: 'calc(100vh - 108px)', padding: 0 }"
    >
      <template slot="footer">
        <a-button @click="handleCancel">取消</a-button>
        <a-button type="primary" :loading="loading" @click="handleOk"> 确定 </a-button>
      </template>
      <div>
        <a-row>
          <a-col :span="14">
            <div style="border-right: 1px solid #ddd; height: calc(100vh - 108px)">
              pdf
               <!-- <pdf src="../../../../assets/a1.pdf"></pdf> -->
               <pdf :src="pdfSrc" v-for="i in numPages" :key="i"  :page="i"></pdf>
            </div>
          </a-col>
          <a-col :span="3">
            <div style="height: calc(100vh - 108px); border-right: 1px solid #ddd;">
              <div style="border-bottom: 1px solid #ddd">预留印章</div>
              <img src="@assets/guaz.png" alt="" />
            </div>
          </a-col>
          <a-col :span="7">
            <div class="part2" style="border-bottom: 1px solid #ddd; margin-top: 10px;margin-buttom:10px;">
              <!-- 加入相关操作按钮 -->
              <a-button>账户余额</a-button>
              <a-button>账户明细</a-button>
              <a-button>项目关联档案</a-button>
              <a-button>作废</a-button>
              <a-button>退回</a-button>
              <a-button>取消领用</a-button>
              <a-button>挂起</a-button>
              <a-button>提交</a-button>
            </div>
            <div style="margin-top: 10px" >
              <a-form-model ref="ruleForm" :model="formData" :label-col="labelCol" :wrapper-col="wrapperCol">
                <a-form-model-item label="指令来源">
                  <a-select v-model="formData.source" />
                </a-form-model-item>
                <a-form-model-item label="指令类型">
                  <a-select v-model="formData.type" />
                </a-form-model-item>
                <a-form-model-item label="业务类型">
                  <a-select v-model="formData.bussinessType" />
                </a-form-model-item>
                <a-form-model-item type="flex" layout="inline" label="项目名称">
                  <a-row :gutter="16">
                    <a-col :span="18">
                      <a-input v-model="formData.projectName" />
                    </a-col>
                    <a-col :span="6"
                      ><a-button style="right" type="primary" icon="search"
                        >查询项目</a-button
                      ></a-col
                    >
                  </a-row>
                </a-form-model-item>
                <a-form-model-item label="客户名称">
                  <a-select v-model="formData.customName" />
                </a-form-model-item>
              </a-form-model>
            </div>
          </a-col>
        </a-row>
      </div>
    </a-modal>
  </div>
</template>
<script>

import moment from 'moment'
import pdf from 'vue-pdf';
// import {
//   foreginIncomeAndExpecditureAdd,
//   foreginIncomeAndExpecditureEdit,
// } from "@/api/api";
export default {
  components: {pdf},
  data() {
    return {
      title: '',
      visible: false,
      loading: false,
      confirmLoading: false,
      labelCol: { span: 5 },
      wrapperCol: { span: 14 },
      formData: {},
      pdfSrc: '/行测.pdf',
      numPages: null  //  pdf 文件总页数
    }
  },
  mounted() {
    this.getNumPages()
  },
  watch: {},
  methods: {
    moment,
    handleCancel() {
      // this.$refs.ruleForm.resetFields(); // resetFields()对表单进行重置的方法
      this.formData = {}
      this.visible = false
    },
    handleOk(e) {
      console.log(e)
      this.visible = false
    },
    getNumPages() {
      let loadingTask = pdf.createLoadingTask(this.pdfSrc);
      loadingTask.promise
        .then((pdf) => {
          this.numPages = pdf.numPages;
        })
        .catch((err) => {
          console.error("pdf 加载失败", err);
        });
    },
    // handleOk() {
    //   this.$refs.ruleForm.validate((valid) => {
    //     if (valid) {
    //       this.loading = true;
    //       console.log("触发", this.formData);
    //       // console.log(valid)
    //       if (this.title == "新增") {
    //         foreginIncomeAndExpecditureAdd(this.formData)
    //           .then((res) => {
    //             if (res.ret == 0) {
    //               this.loading = false;
    //               this.$emit("refreshList");
    //               this.handleCancel();
    //               this.$message.success(res.msg);
    //             } else {
    //               this.$message.warning(res.msg);
    //             }
    //           })
    //           .finally((end) => {
    //             this.loading = false;
    //           });
    //       }
    //     } else {
    //       this.loading = false;
    //       return false;
    //     }
    //   });
    // },
  },
}
</script>
<style lang='less'>
.part2 {
  margin-bottom: 10px;
}
</style>
