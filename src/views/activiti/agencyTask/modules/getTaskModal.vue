<template>
  <div>
    <a-modal
      :title="title"
      :visible="visible"
      :confirm-loading="confirmLoading"
      :maskClosable="false"
      @cancel="handleCancel"
      width="550px"
    >
      <template slot="footer">
        <a-button @click="handleCancel">取消</a-button>
        <a-button type="primary" :loading="loading" @click="handleOk">
          确定
        </a-button>
      </template>

      <div style="text-align: center">领取任务</div>
       <!-- <a-form-model :model="formData" ref="ruleForm" :rules="rules">
        <a-row :gutter="24">
          <a-col :span="24">
            <a-form-model-item
              label="领取任务"
              prop="getTask"
            >
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model> -->
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
