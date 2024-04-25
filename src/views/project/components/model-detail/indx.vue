<template>
  <div class="detail-container">
    <div class="detail-header">
      <input class="model-title" placeholder="请输入标题" />
      <a-button type="primary">保存</a-button>
      <a-button type="outline">删除</a-button>
    </div>
    <div class="detail-describe">
      <a-textarea
        placeholder="添加模型描述"
        :max-length="100"
        allow-clear
        show-word-limit
      />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
  .detail-container {
  }

  .detail-header {
    display: flex;
    gap: 10px;
    padding: 10px;

    :deep(.arco-btn) {
      border-radius: var(--border-radius-medium);
    }
  }

  .model-title {
    width: 100%;
    height: 33px;
    padding: 0 12px;
    border: none;
    border-bottom: 1px solid transparent;

    /* 设置占位符文本的颜色 */
    &::placeholder {
      color: var(--color-neutral-6);
    }

    &:hover {
      border-bottom: 1px solid var(--color-neutral-3);
    }

    &:focus-visible {
      border-bottom: 1px solid var(--activate-tab-color);
      outline: none;
    }
  }

  .detail-describe {
    padding: 0 10px;

    :deep(.arco-textarea-wrapper) {
      background: white;
    }
  }
</style>
