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
        <a-button type="primary" :loading="loading" @click="handleOk"> 确定 </a-button>
      </template>

      <div class="contont-div">
        <bpmn-viewer :xmlData="viewData" :taskData="propTaskList" />
      </div>
    </a-modal>
  </div>
</template>
<script>
const demo =
  '<?xml version="1.0" encoding="UTF-8"?>\\n<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn">\\n  <bpmn:process id="Process_1" isExecutable="false">\\n    <bpmn:startEvent id="StartEvent_1" name="开始">\\n      <bpmn:outgoing>Flow_1xgk0d2</bpmn:outgoing>\\n    </bpmn:startEvent>\\n    <bpmn:userTask id="Activity_0o6i5ax">\\n      <bpmn:incoming>Flow_1xgk0d2</bpmn:incoming>\\n      <bpmn:outgoing>Flow_0jjbfti</bpmn:outgoing>\\n    </bpmn:userTask>\\n    <bpmn:sequenceFlow id="Flow_1xgk0d2" sourceRef="StartEvent_1" targetRef="Activity_0o6i5ax" />\\n    <bpmn:endEvent id="Event_030gi2m">\\n      <bpmn:incoming>Flow_0jjbfti</bpmn:incoming>\\n    </bpmn:endEvent>\\n    <bpmn:sequenceFlow id="Flow_0jjbfti" sourceRef="Activity_0o6i5ax" targetRef="Event_030gi2m" />\\n  </bpmn:process>\\n  <bpmndi:BPMNDiagram id="BPMNDiagram_1">\\n    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">\\n      <bpmndi:BPMNEdge id="Flow_1xgk0d2_di" bpmnElement="Flow_1xgk0d2">\\n        <di:waypoint x="209" y="120" />\\n        <di:waypoint x="260" y="120" />\\n      </bpmndi:BPMNEdge>\\n      <bpmndi:BPMNEdge id="Flow_0jjbfti_di" bpmnElement="Flow_0jjbfti">\\n        <di:waypoint x="360" y="120" />\\n        <di:waypoint x="412" y="120" />\\n      </bpmndi:BPMNEdge>\\n      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">\\n        <dc:Bounds x="173" y="102" width="36" height="36" />\\n        <bpmndi:BPMNLabel>\\n          <dc:Bounds x="180" y="145" width="22" height="14" />\\n        </bpmndi:BPMNLabel>\\n      </bpmndi:BPMNShape>\\n      <bpmndi:BPMNShape id="Activity_0o6i5ax_di" bpmnElement="Activity_0o6i5ax">\\n        <dc:Bounds x="260" y="80" width="100" height="80" />\\n      </bpmndi:BPMNShape>\\n      <bpmndi:BPMNShape id="Event_030gi2m_di" bpmnElement="Event_030gi2m">\\n        <dc:Bounds x="412" y="102" width="36" height="36" />\\n      </bpmndi:BPMNShape>\\n    </bpmndi:BPMNPlane>\\n  </bpmndi:BPMNDiagram>\\n</bpmn:definitions>\\n'

import moment from 'moment'
import BpmnViewer from '@comp/bpmn/BpmnViewer'

// import {
//   foreginIncomeAndExpecditureAdd,
//   foreginIncomeAndExpecditureEdit,
// } from "@/api/api";
export default {
  components: { BpmnViewer },
  data() {
    return {
      title: '流程图设计',
      visible: false,
      loading: false,
      confirmLoading: false,
      rules: {},
      formData: {},
      viewData: demo,
      propTaskList: [
        {
          key: 'UserTask_06zjapk',
          completed: true,
        },
        {
          key: 'UserTask_07cj5cp',
          completed: true,
        },
        {
          key: 'UserTask_0hkfnx2',
          completed: true,
        },
        {
          key: 'UserTask_1pvvtgn',
          completed: true,
        },
        {
          key: 'Task_02tadrd',
          completed: false,
        },
      ],
    }
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
<style lang="less" scoped>
.contont-div {
  position: relative;
  height: 300px;
}
</style>