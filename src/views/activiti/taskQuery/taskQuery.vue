<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div>
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="已处理的任务">
          <HandledTask  ref="foreign"/>
        </a-tab-pane>
        <a-tab-pane key="2" tab="已完成的任务">
          <CompletedTask  ref="foreign"/>
        </a-tab-pane>
        <a-tab-pane key="3" tab="终止的任务">
          <EndTask  ref="foreign"/>
        </a-tab-pane>
      </a-tabs>
    </div>
  </a-card>
</template>

<script>
import HandledTask from "./modules/handledTask.vue";
import CompletedTask from "./modules/completedTask.vue";
import EndTask from "./modules/endTask.vue";


export default {
  components: { HandledTask,CompletedTask,EndTask},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {},
};
</script>

