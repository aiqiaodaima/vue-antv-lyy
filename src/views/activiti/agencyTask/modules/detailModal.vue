<template>
  <div>
    <a-modal
      :title="title"
      :visible="visible"
      :confirm-loading="confirmLoading"
      :maskClosable="false"
      @cancel="handleCancel"

    >
      <template slot="footer">
        <a-button @click="handleCancel">取消</a-button>
        <a-button type="primary" :loading="loading" @click="handleOk">
          确定
        </a-button>
      </template>
       <a-form-model :model="formData" ref="ruleForm" :rules="rules">
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-model-item
              label="指令编号"
              prop="name"
              :label-col="{ span: 9 }"
              :wrapper-col="{ span: 15 }"
            >
             <a-input
                placeholder="请输入指令编号"
                v-model="formData.name"
                showSearch
                allowClear
              ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item
              label="指令来源"
              prop="keyWord"
              :label-col="{ span: 9 }"
              :wrapper-col="{ span: 15 }"
            >
             <a-input
                placeholder="请输入指令来源"
                v-model="formData.keyWord"
                showSearch
                allowClear
              ></a-input>
            </a-form-model-item>
          </a-col>
        </a-row>

         <a-row :gutter="24">
          <a-col :span="12">
            <a-form-model-item
              label="指令类型"
              prop="punchTime"
              :label-col="{ span: 9 }"
              :wrapper-col="{ span: 15 }"
            >
             <a-input
                placeholder="请输入指令类型"
                v-model="formData.punchTime"
                showSearch
                allowClear
              ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item
              label="项目名称"
              prop="project"
              :label-col="{ span: 9 }"
              :wrapper-col="{ span: 15 }"
            >
             <a-input
                placeholder="请输入项目名称"
                v-model="formData.project"
                showSearch
                allowClear
              ></a-input>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </a-modal>
  </div>
</template>
<script>
import moment from "moment";
// import {
//   foreginIncomeAndExpecditureAdd,
//   foreginIncomeAndExpecditureEdit,
// } from "@/api/api";
export default {
  data() {
    return {
      title: "",
      visible: false,
      loading: false,
      confirmLoading: false,
      rules: {},
      formData: { },
    };
  },
  watch: {},
  methods: {
    moment,
    handleCancel() {
      // this.$refs.ruleForm.resetFields(); // resetFields()对表单进行重置的方法
      this.formData = {};
      this.visible = false;
    },
    handleOk(e) {
      console.log(e);
      this.visible = false;
    }
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
};
</script>
<style lang="less" scoped>
.bodyStyle {
  height: 100vh;
  width: 1000px
}
</style>