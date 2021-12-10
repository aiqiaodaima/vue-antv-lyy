<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div>
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="场外清算可领取任务">
          <ReceivableTasksOffsite  ref="foreign"/>
        </a-tab-pane>
        <a-tab-pane key="2" tab="场内清算可领取任务">
          <ReceivableTasksInside  ref="foreign"/>
        </a-tab-pane>
        <a-tab-pane key="3" tab="非划款指令可领取任务">
          <ReceivableTasksNoTransPayment  ref="foreign"/>
        </a-tab-pane>
        <a-tab-pane key="4" tab="指令解析可领取任务">
          <ReceivableTaskComResolve  ref="foreign"/>
        </a-tab-pane>
        <!-- 已领用任务 -->
          <a-tab-pane key="5">
            <span slot="tab">已领用任务<a-badge :count="count" style="top: -10px"/></span>
          <ReclaimedTasks  ref="foreign"/>
        </a-tab-pane>
          <a-tab-pane key="6">
            <span slot="tab">挂起任务<a-badge :count="count1" style="top: -10px"/></span>
          <SuspendedTasks  ref="foreign"/>
        </a-tab-pane>
      </a-tabs>
    </div>
  </a-card>
</template>

<script>
import ReceivableTasksOffsite from "./modules/receivableTasks_offsite.vue";
import ReceivableTasksInside from "./modules/receivableTasks_inside.vue";
import ReceivableTasksNoTransPayment from "./modules/receivableTasks_noTransPayment.vue";
import ReceivableTaskComResolve from "./modules/receivableTasks_comResolve.vue";
import ReclaimedTasks from "./modules/reclaimedTasks.vue";
import SuspendedTasks from "./modules/suspendedTasks.vue";


export default {
  components: { ReceivableTasksOffsite,ReceivableTasksInside,ReceivableTasksNoTransPayment,ReceivableTaskComResolve,ReclaimedTasks,SuspendedTasks},
  data() {
    return {
      count: 3,
      count1:1,
      show: true,
    };
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {},
};
</script>
<style scoped>

</style>

