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
          <a-tree block-node :data="treeData">
            <template #switcher-icon="{ isLeaf }">
              <Icon v-if="!isLeaf" name="icon-down" />
            </template>
            <template #title="nodeData">
              <template v-if="getMatchIndex(nodeData?.title) < 0">
                {{ nodeData?.title }}
              </template>
              <template v-else>
                <span>
                  {{ nodeData?.title.slice(0, getMatchIndex(nodeData?.title)) }}
                  <span style="color: var(--color-primary-light-4)">
                    {{
                      nodeData?.title.slice(
                        getMatchIndex(nodeData?.title),
                        getMatchIndex(nodeData?.title) + searchKey.length,
                      )
                    }}
                  </span>
                  {{
                    nodeData?.title.slice(
                      getMatchIndex(nodeData?.title) + searchKey.length,
                    )
                  }}
                </span>
              </template>
            </template>
          </a-tree>
        </div>
      </div>
    </template>
    <template #right>
      <a-typography-paragraph>Right</a-typography-paragraph>
    </template>
  </SplitPanel>
</template>

<script setup lang="ts">
  import Icon from '@/components/icon/index.vue';
  import { computed, ref } from 'vue';
  import SplitPanel from '../split-panel/index.vue';

  const searchKey = ref('');

  const originTreeData = [
    {
      title: 'Trunk 0-0',
      key: '0-0',
      children: [
        {
          title: 'Branch 0-0-0',
          key: '0-0-0',
          children: [
            {
              title: 'Leaf',
              key: '0-0-0-0',
            },
            {
              title: 'Leaf',
              key: '0-0-0-1',
            },
          ],
        },
        {
          title: 'Branch 0-0-1',
          key: '0-0-1',
          children: [
            {
              title: 'Leaf',
              key: '0-0-1-0',
            },
          ],
        },
      ],
    },
  ];

  const searchData = (keyword: string) => {
    const loop = (data) => {
      const result = [];
      data.forEach((item) => {
        if (item.title.toLowerCase().indexOf(keyword.toLowerCase()) > -1) {
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

    return loop(originTreeData);
  };

  const treeData = computed(() => {
    if (!searchKey.value) return originTreeData;
    return searchData(searchKey.value);
  });

  const getMatchIndex = (title: string) => {
    if (!searchKey.value) return -1;
    return title.toLowerCase().indexOf(searchKey.value.toLowerCase());
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
  }
</style>
