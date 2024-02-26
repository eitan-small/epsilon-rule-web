<template>
  <a-resize-box :directions="['top']" class="node-panel-container">
    <template #resize-trigger>
      <div class="resize-trigger" />
    </template>
    <div class="node-panel">
      <div class="panel-header">
        <div
          v-if="node.shape === 'start-node'"
          :style="{ alignItems: 'center', display: 'flex', gap: '8px' }"
        >
          <a-image width="20" :src="StartImage" :preview="false" />
          <a-typography-text> 开始节点 </a-typography-text>
        </div>
        <div
          v-else-if="node.shape === 'end-node'"
          :style="{ alignItems: 'center', display: 'flex', gap: '8px' }"
        >
          <a-image width="20" :src="EndImage" :preview="false" />
          <a-typography-text> 结束节点 </a-typography-text>
        </div>
        <div
          v-else-if="node.shape === 'switch-node'"
          :style="{ alignItems: 'center', display: 'flex', gap: '8px' }"
        >
          <a-image width="20" :src="SwitchImage" :preview="false" />
          <a-typography-text> 赋值运算节点 </a-typography-text>
        </div>
        <div
          v-else-if="node.shape === 'calculate-node'"
          :style="{ alignItems: 'center', display: 'flex', gap: '8px' }"
        >
          <a-image width="20" :src="EditImage" :preview="false" />
          <a-typography-text> 条件分支节点 </a-typography-text>
        </div>
        <div>
          <a-typography-text> 节点名称 </a-typography-text>
          <a-input
            v-model="nodeName"
            size="small"
            :style="{ width: '250px' }"
            @change="onNodeNameChange"
          />
        </div>
      </div>
      <div class="panel-body">
        <div class="panel-body-left">
          <a-tabs default-active-key="1" type="text">
            <a-tab-pane key="1" title="节点信息">
              <a-form :model="form" auto-label-width>
                <a-form-item field="name" label="Username">
                  <a-input
                    v-model="form.name"
                    placeholder="please enter your username..."
                  />
                </a-form-item>
                <a-form-item field="post" label="Post">
                  <a-input
                    v-model="form.post"
                    placeholder="please enter your post..."
                  />
                </a-form-item>
                <a-form-item field="isRead">
                  <a-checkbox v-model="form.isRead">
                    I have read the manual
                  </a-checkbox>
                </a-form-item>
                <a-form-item>
                  <a-button html-type="submit">Submit</a-button>
                </a-form-item>
              </a-form>
            </a-tab-pane>
            <a-tab-pane key="2" title="模型">
              Content of Tab Panel 2
            </a-tab-pane>
          </a-tabs>
        </div>
        <div class="panel-body-right"></div>
      </div>
    </div>
  </a-resize-box>
</template>

<script setup lang="ts">
  import { Node } from '@antv/x6';
  import { reactive, ref, watch } from 'vue';
  import StartImage from '@/assets/images/start.png';
  import EndImage from '@/assets/images/end.png';
  import SwitchImage from '@/assets/images/switch.png';
  import EditImage from '@/assets/images/edit.png';

  interface Props {
    selectedNode: Node;
  }

  const props = defineProps<Props>();
  const node = ref<Node>(props.selectedNode);
  const nodeName = ref(props.selectedNode.getData().label);

  const form = reactive({
    name: '',
    post: '',
    isRead: false,
  });

  const onNodeNameChange = (value: string) => {
    node.value.setData({ label: value });
  };

  watch(props, (newProps) => {
    node.value = newProps.selectedNode;
    nodeName.value = newProps.selectedNode.getData().label;
  });
</script>

<style scoped lang="less">
  .node-panel-container {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 50%;
    overflow: hidden;
    background-color: var(--color-bg-1);

    :deep(.arco-resizebox-trigger) {
      position: relative;

      &::before {
        position: absolute;
        top: -1.5px;
        bottom: -1.5px;
        z-index: 1;
        width: 100%;
        background-color: var(--activate-tab-color);
        opacity: 0;
        transition: opacity 0.4s;
        content: '';
      }

      &:hover::before {
        opacity: 1;
      }
    }
  }

  .resize-trigger {
    width: 100%;
    height: 1px;
    background-color: var(--color-neutral-2);
  }

  .node-panel {
    position: absolute;
    top: 0;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    border: 1px solid var(--color-neutral-3);
  }

  .panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px 6px;
  }

  .panel-body {
    display: flex;
    height: 100%;
    border-top: 1px solid var(--color-neutral-3);
  }

  .panel-body-left {
    width: 300px;
    height: 100%;
    padding: 0 8px;
    border-right: 1px solid var(--color-neutral-3);
  }

  .panel-body-right {
    width: 100%;
    padding: 0 8px;
  }
</style>
