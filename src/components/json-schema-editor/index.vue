<template>
  <div class="json-schema-editor">
    <div class="json-schema-editor-top">
      <div class="top-editor-left"></div>
      <div class="top-editor-right">
        <a-button size="mini" @click="submintChangeVisible">
          <div class="button-json-schema">
            <Icon name="brackets-angle" />
            JSON Schema
          </div>
        </a-button>
      </div>
    </div>
    <div class="json-schema-editor-main">
      <editor-row :json-schema="jsonSchema" root />
    </div>
  </div>
  <a-modal
    v-model:visible="visible"
    draggable
    width="800px"
    ok-text="保存"
    @ok="submitModifySchema"
  >
    <template #title> JSON Schema </template>
    <div :style="{ height: '400px' }">
      <JsonEditor :code-doc="codeDoc" @update:doc="handleDocUpdate" />
    </div>
  </a-modal>
</template>

<script setup lang="ts">
  import Icon from '@/components/icon/index.vue';
  import EditorRow from '@/components/json-schema-editor/editor-row/index.vue';
  import { JSONSchema } from '@/types/schema';
  import { provide, reactive, ref, watch } from 'vue';
  import {
    addArrayElementByPath,
    addPropertyByPath,
    deleteArrayElementByPath,
    deletePropertyByPath,
    modifyPropertyNameByPath,
    modifyPropertyValueByPath,
  } from '@/utils/object-util';
  import JsonEditor from '@/components/json-editor/index.vue';

  const visible = ref(false);

  let jsonSchema = reactive<JSONSchema>({
    required: ['name', 'photoUrls', 'id', 'category', 'tags', 'status'],
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        minimum: 1,
        description: '宠物ID编号',
      },
      category: {
        description: '分组',
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            minimum: 1,
            description: '分组ID编号',
          },
          name: {
            type: 'string',
            description: '分组名称',
          },
        },
      },
      name: {
        type: 'string',
        description: '名称',
      },
      photoUrls: {
        type: 'array',
        items: {
          type: 'string',
        },
        description: '照片URL',
      },
      tags: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              minimum: 1,
              description: '标签ID编号',
            },
            name: {
              type: 'string',
              description: '标签名称',
            },
          },
        },
        description: '标签',
      },
      status: {
        type: 'string',
        description: '宠物销售状态',
        enum: ['available', 'pending', 'sold'],
      },
    },
  });

  const codeDoc = ref(JSON.stringify(jsonSchema, null, 2));

  watch(jsonSchema, (newValue) => {
    console.log(JSON.stringify(newValue, null, 2));
    codeDoc.value = JSON.stringify(newValue, null, 2);
  });

  const handleDocUpdate = (newValue: string) => {
    codeDoc.value = newValue;
  };

  const submitModifySchema = () => {
    jsonSchema = reactive(JSON.parse(codeDoc.value));
  };

  const submintChangeVisible = () => {
    visible.value = true;
  };

  // 删除属性
  const deleteProperty = (path: string[]) => {
    deletePropertyByPath(jsonSchema, path);
  };

  // 新增子属性
  const addChildrenProperty = (path: string[]) => {
    addPropertyByPath(jsonSchema, [...path, 'properties', ''], {});
  };

  // 修改属性名
  const modifyPropertyName = (path: string[], name: string) => {
    modifyPropertyNameByPath(jsonSchema, path, name);
  };

  // 修改属性值
  const modifyPropertyValue = (path: string[], valueObj: any) => {
    modifyPropertyValueByPath(jsonSchema, path, valueObj);
  };

  // 往数组中删除元素
  const deleteArrayElement = (path: string[], elementToDelete: any) => {
    // eslint-disable-next-line no-undef
    deleteArrayElementByPath(jsonSchema, path, elementToDelete);
  };

  // 往数组中新增元素
  const addArrayElement = (path: string[], elementToAdd: any) => {
    // eslint-disable-next-line no-undef
    addArrayElementByPath(jsonSchema, path, elementToAdd);
  };

  provide('deleteProperty', deleteProperty);
  provide('addChildrenProperty', addChildrenProperty);
  provide('modifyPropertyName', modifyPropertyName);
  provide('modifyPropertyValue', modifyPropertyValue);
  provide('deleteArrayElement', deleteArrayElement);
  provide('addArrayElement', addArrayElement);
</script>

<style scoped lang="less">
  .json-schema-editor {
    min-height: 100px;
    border: 1px solid var(--color-neutral-3);
    border-radius: var(--border-radius-medium);
  }

  .json-schema-editor-top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 7px 11px;
    border-bottom: 1px solid var(--color-neutral-3);
  }

  .json-schema-editor-main {
    padding: 11px;
  }

  .top-editor-right {
    :deep(.arco-btn) {
      border-radius: var(--border-radius-medium);
    }
  }

  .button-json-schema {
    display: flex;
    gap: 4px;
    align-content: center;
  }

  .editor-row .arco-col {
    height: 32px;
    color: var(--color-white);
    text-align: center;
  }

  .editor-row .arco-col:nth-child(2n + 1) {
    background-color: var(--color-primary-light-4);
  }

  .editor-row .arco-col:nth-child(2n) {
    background-color: rgb(var(--arcoblue-6) 0.9);
  }
</style>
