<template>
  <div class="project-container">
    <div class="navigation">
      <div class="tabs-container">
        <div class="logo-wrapper">
          <div
            class="logo"
            @mouseover="changeIconName"
            @mouseout="resetIconName"
          >
            <Icon
              :name="iconName"
              class="logo-svg"
              :svg-style="{ width: '24px', height: '24px' }"
            />
          </div>
        </div>
        <div
          class="tab-wrapper"
          :class="{ 'active-tab': activeTab === 'ModelManagement' }"
          @click="activateTab('ModelManagement')"
        >
          <Icon
            name="icon-share-alt"
            :svg-style="{ fontSize: '24px', color: '#86909C' }"
          />
          <a-typography-paragraph>模型管理</a-typography-paragraph>
        </div>
        <div
          class="tab-wrapper"
          :class="{ 'active-tab': activeTab === 'RuleSetting' }"
          @click="activateTab('RuleSetting')"
        >
          <Icon
            name="icon-settings"
            :svg-style="{ fontSize: '24px', color: '#86909C' }"
          />
          <a-typography-paragraph>规则设置</a-typography-paragraph>
        </div>
        <div
          class="tab-wrapper"
          :class="{ 'active-tab': activeTab === 'LogDetail' }"
          @click="activateTab('LogDetail')"
        >
          <Icon
            name="icon-settings"
            :svg-style="{ fontSize: '24px', color: '#86909C' }"
          />
          <a-typography-paragraph>日志详情</a-typography-paragraph>
        </div>
      </div>
    </div>
    <component :is="componentMap[activeTab]" />
  </div>
</template>

<script setup lang="ts">
  import Icon from '@/components/icon/index.vue';
  import { ref } from 'vue';
  import ModelManagement from './components/model/index.vue';
  import RuleSetting from './components/rule/index.vue';

  const iconName = ref('Pokemon');
  const activeTab = ref('ModelManagement');

  const componentMap: any = {
    ModelManagement,
    RuleSetting,
  };

  const changeIconName = () => {
    iconName.value = 'icon-home';
  };
  const resetIconName = () => {
    iconName.value = 'Pokemon';
  };
  const activateTab = (tab: string) => {
    // 切换激活状态
    activeTab.value = tab;
  };
</script>

<style lang="less" scoped>
  .project-container {
    display: flex;
  }

  .navigation {
    display: flex;
    width: 80px;
    height: 100vh;
    padding: 0 4px;
    overflow: hidden;
    background-color: var(--app-nav-bg);
  }

  .tabs-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .logo-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 64px;
    margin-bottom: 12px;
  }

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: var(--color-bg-1);
    border-radius: 12px;
    box-shadow: 0 0 2px var(--color-neutral-4);
  }

  .tab-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 65px;
    height: 64px;
    margin-bottom: 12px;
    border-radius: 10px;
    cursor: pointer;
    user-select: none;

    &:hover {
      background-color: rgb(147 115 238 / 8%);
    }

    .arco-typography {
      margin: 0;
    }

    /* 激活状态的背景色 */
    &.active-tab {
      color: var(--activate-tab-color);

      .arco-typography {
        color: var(--activate-tab-color);
      }
    }
  }
</style>
