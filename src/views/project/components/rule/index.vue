<template>
  <SplitPanel>
    <template #left>
      <div class="panel-wrapper">
        <a-card :bordered="false">
          <div
            :style="{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }"
          >
            <span
              :style="{
                display: 'flex',
                alignItems: 'center',
              }"
            >
              <a-avatar
                :style="{
                  marginRight: '8px',
                  backgroundColor: 'var(--activate-tab-color)',
                }"
                :size="28"
              >
                <Icon name="icon-fire" />
              </a-avatar>
              <a-typography-text> 投贷后管理项目 </a-typography-text>
            </span>
          </div>
        </a-card>
        <div class="search-container">
          <a-input v-model="searchKey" placeholder="请输入关键字" allow-clear>
            <template #prefix>
              <Icon name="icon-search" />
            </template>
          </a-input>
          <div class="add-container">
            <a-popover position="bl">
              <a-button>
                <template #icon>
                  <Icon name="icon-plus" :svg-style="{ color: 'white' }" />
                </template>
              </a-button>
            </a-popover>
          </div>
        </div>
        <div class="model-tree-container">
          <a-tree
            ref="treeRef"
            block-node
            draggable
            :data="treeData"
            :field-names="{ key: 'id', title: 'menuName' }"
            @select="onSelect"
          >
            <template #switcher-icon="{ isLeaf }">
              <Icon v-if="!isLeaf" name="icon-down" />
            </template>
            <template #title="nodeData">
              <Icon
                v-if="'1' === nodeData.menuType"
                name="icon-folder"
                :svg-style="{ marginRight: '4px' }"
              />
              <Icon
                v-else
                name="icon-bookmark"
                :svg-style="{ marginRight: '4px' }"
              />
              <template v-if="getMatchIndex(nodeData?.menuName) < 0">
                {{ nodeData?.menuName }}
              </template>
              <template v-else>
                <span>
                  {{
                    nodeData?.menuName.slice(
                      0,
                      getMatchIndex(nodeData?.menuName),
                    )
                  }}
                  <span style="color: var(--color-primary-light-4)">
                    {{
                      nodeData?.menuName.slice(
                        getMatchIndex(nodeData?.menuName),
                        getMatchIndex(nodeData?.menuName) + searchKey.length,
                      )
                    }}
                  </span>
                  {{
                    nodeData?.menuName.slice(
                      getMatchIndex(nodeData?.menuName) + searchKey.length,
                    )
                  }}
                </span>
              </template>
            </template>
            <template #drag-icon="{ node }">
              <div class="item-more-container">
                <div
                  v-show="'1' === node.menuType"
                  class="item-more"
                  @click.stop
                >
                  <Icon name="icon-plus" :svg-style="{ color: 'black' }" />
                </div>
                <div class="item-more" @click.stop>
                  <a-dropdown position="bl">
                    <Icon name="icon-more" :svg-style="{ color: 'black' }" />
                    <template #content>
                      <a-doption>Option 1</a-doption>
                      <a-doption>Option 2</a-doption>
                      <a-doption>Option 3</a-doption>
                    </template>
                  </a-dropdown>
                </div>
              </div>
            </template>
          </a-tree>
        </div>
      </div>
    </template>
    <template #right>
      <a-typography-paragraph>{{ treeData }}</a-typography-paragraph>
    </template>
  </SplitPanel>
</template>

<script setup lang="ts">
  import Icon from '@/components/icon/index.vue';
  import { computed, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { RuleMenu, selectRuleMenuTree } from '@/api/rule-menu';
  import { TreeNodeData } from '@arco-design/web-vue';
  import SplitPanel from '../split-panel/index.vue';

  const route = useRoute();
  const projectId = route.params.id as string;

  const searchKey = ref('');
  const treeRef = ref();
  const originTreeData = ref<RuleMenu[]>([]);

  const fetchData = async (id: number) => {
    const response = await selectRuleMenuTree(id);
    originTreeData.value = response.data;
  };

  fetchData(parseInt(projectId, 10));

  const searchData = (keyword: string) => {
    const loop = (data: RuleMenu[]) => {
      const result: RuleMenu[] = [];
      data.forEach((item) => {
        if (item.menuName.toLowerCase().indexOf(keyword.toLowerCase()) > -1) {
          result.push({ ...item });
        } else if (item.children) {
          const filterData = loop(item.children);
          if (filterData.length) {
            result.push({
              ...item,
              children: filterData,
            });
          }
        }
      });
      return result;
    };

    return loop(originTreeData.value);
  };

  // 前端搜索功能
  const treeData = computed(() => {
    if (!searchKey.value) return originTreeData.value;
    return searchData(searchKey.value);
  });

  const getMatchIndex = (title: string) => {
    if (!searchKey.value) return -1;
    return title.toLowerCase().indexOf(searchKey.value.toLowerCase());
  };

  const onSelect = (
    selectedKeys: Array<string | number>,
    data: {
      selected?: boolean | undefined;
      selectedNodes: TreeNodeData[];
      node?: TreeNodeData | undefined;
      e?: Event | undefined;
    },
  ) => {
    // 展开文件夹节点
    const node = data.node as RuleMenu;
    if (node.menuType === '1') {
      const expandedNodes = treeRef.value
        .getExpandedNodes()
        .map((item: RuleMenu) => {
          return item.id;
        });
      treeRef.value.expandNode(
        selectedKeys[0],
        !expandedNodes.includes(selectedKeys[0]),
      );
    }
  };
</script>

<style scoped lang="less">
  .panel-wrapper {
    display: flex;
    flex-direction: column;
  }

  .search-container {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
    padding-right: 0.5rem;
    padding-left: 0.5rem;

    :deep(.arco-input-wrapper) {
      border-radius: 0.5rem;
    }

    :deep(.arco-input-focus) {
      border-color: var(--activate-tab-color);
    }
  }

  .add-container {
    width: 32px;
    height: 32px;

    :deep(.arco-btn) {
      background-color: var(--activate-tab-color);
      border-radius: 0.5rem;
    }
  }

  .model-tree-container {
    padding-right: 0.5rem;
    padding-left: 0.5rem;

    :deep(.arco-tree-node) {
      &:hover {
        background-color: var(--color-neutral-2);
      }
    }

    :deep(.arco-tree-node-title) {
      overflow: hidden;
    }

    :deep(.arco-tree-node-title-text) {
      margin-right: 2.5rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .item-more-container {
    display: flex;
  }

  .item-more {
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;

    &:hover {
      background: var(--color-neutral-3);
    }
  }
</style>
