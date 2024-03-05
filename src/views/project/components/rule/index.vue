<template>
  <SplitPanel>
    <template #left>
      <div class="left-wrapper">
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
      <div class="right-container">
        <a-tabs
          v-model:active-key="activeKey"
          type="card"
          :editable="true"
          show-add-button
          auto-switch
          @add="handleAdd"
          @delete="handleDelete"
        >
          <a-tab-pane v-for="item of tabData" :key="item.id">
            <template #title>
              <a-typography-paragraph
                :style="{
                  margin: '0 0 0 5px',
                  maxWidth: `100px`,
                  minWidth: '100px',
                }"
                :ellipsis="{
                  rows: 1,
                  showTooltip: true,
                }"
              >
                {{ item.menuName }}
              </a-typography-paragraph>
            </template>
            <div class="rule-panel">
              <RuleDetail :rule-menu="item" />
            </div>
          </a-tab-pane>
          <div class="rule-panel">
            <a-empty
              :style="{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                justifyContent: 'center',
              }"
            />
          </div>
        </a-tabs>
      </div>
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
  import RuleDetail from '../rule-detail/index.vue';

  const route = useRoute();
  const projectId = parseInt(route.params.id as string, 10);

  const searchKey = ref('');
  const treeRef = ref();
  const originTreeData = ref<RuleMenu[]>([]);
  const activeKey = ref<number>();
  const tabData = ref<RuleMenu[]>([]);

  const fetchData = async (id: number) => {
    const response = await selectRuleMenuTree(id);
    originTreeData.value = response.data;
  };

  fetchData(projectId);

  const addTag = (tag: RuleMenu) => {
    // 判断标签是否已存在
    const idExisting = tabData.value.find(
      (existingTag) => existingTag.id === tag.id,
    );

    // 如果标签不存在，则添加
    if (!idExisting) {
      tabData.value.push(tag);
    }
    activeKey.value = tag.id;
  };

  const handleAdd = () => {
    const tag = {
      id: Date.now(),
      projectId,
      menuName: '新建规则',
      // 表示新建接口，暂存未入库
      menuType: '0',
    } as RuleMenu;
    addTag(tag);
  };
  const handleDelete = (key: number | string) => {
    tabData.value = tabData.value.filter((item) => item.id !== key);

    if (activeKey.value === key && tabData.value.length > 0) {
      activeKey.value = tabData.value[0].id;
    }
  };

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
    if (node.menuType === '2') {
      addTag(node);
    }
  };
</script>

<style scoped lang="less">
  .left-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: var(--app-nav-bg);
    border-right: 1px solid var(--color-neutral-2);
    border-left: 1px solid var(--color-neutral-2);

    :deep(.arco-card) {
      background-color: var(--app-nav-bg);
    }
  }

  .search-container {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
    padding-right: 0.5rem;
    padding-left: 0.5rem;

    :deep(.arco-input-wrapper) {
      border-radius: var(--border-radius-medium);
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
      border-radius: var(--border-radius-medium);
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

  .right-container {
    :deep(.arco-tabs-nav) {
      padding: 8px 8px 0;
      background: var(--app-nav-bg);

      &::before {
        height: 0;
      }
    }

    :deep(.arco-tabs-content) {
      padding: 0;
      border: none;
    }

    :deep(.arco-tabs-tab) {
      border: none;
      border-top-left-radius: var(--border-radius-medium);
      border-top-right-radius: var(--border-radius-medium);
    }

    :deep(.arco-tabs-tab-active) {
      background: var(--color-bg-1);
      border: 1px solid var(--color-neutral-3);
      border-bottom-color: var(--color-bg-1);
    }
  }

  .rule-panel {
    width: 100%;
    height: calc(100vh - 40px);
    overflow: auto;
  }
</style>
