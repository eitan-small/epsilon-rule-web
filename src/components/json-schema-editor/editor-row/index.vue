<template>
  <a-row class="editor-row">
    <a-col :flex="3" class="col-name">
      <div
        class="block"
        :style="{
          width: `${20 * depth}px`,
        }"
      />
      <div class="col-name-c">
        <a-button
          v-if="jsonSchema.type === 'object' || jsonSchema.type === 'array'"
          type="text"
          size="mini"
          style="color: rgb(0 0 0 / 65%); background-color: transparent"
          class="col-name-button"
          @click="hidden = !hidden"
        >
          <template #icon>
            <Icon v-if="hidden" name="icon-caret-right" />
            <Icon v-else name="icon-caret-down" />
          </template>
        </a-button>
        <div v-else :style="{ width: '23px' }" />
        <a-tag v-if="root" color="purple" size="small">根节点</a-tag>
        <a-tag v-else-if="item" color="purple" size="small">ITEM</a-tag>
        <a-input
          v-else
          v-model="fieldName"
          placeholder="字段名"
          @blur="submitPropertyName"
        />
      </div>
    </a-col>
    <a-col flex="180px" class="col-type">
      <a-dropdown :popup-max-height="false" @select="submitModifyType">
        <a-button
          type="text"
          :style="{ color: textColor }"
          class="dropdown-button"
          >{{ jsonSchema.type ? jsonSchema.type : 'string' }}</a-button
        >
        <template #content>
          <a-doption>string</a-doption>
          <a-doption>integer</a-doption>
          <a-doption>number</a-doption>
          <a-doption>boolean</a-doption>
          <a-doption>array</a-doption>
          <a-doption>object</a-doption>
        </template>
      </a-dropdown>
      <a-button
        v-if="!root && !item"
        class="property-button"
        :class="must ? 'must-button' : ''"
        @click="submitChangeRequired"
      >
        <Icon
          name="must"
          :svg-style="{
            height: '8px',
            width: '8px',
          }"
        />
      </a-button>
    </a-col>
    <a-col flex="100px">
      <a-input v-model="title" placeholder="中文名" @blur="submitModifyTitle" />
    </a-col>
    <a-col :flex="3">
      <a-input
        v-model="description"
        placeholder="说明"
        @blur="submitModifyDescription"
      />
    </a-col>
    <a-col flex="80px" class="col-operate">
      <a-button v-if="jsonSchema.type === 'object'" @click="submitAddChildren">
        <Icon
          name="icon-plus-circle"
          :svg-style="{
            color: 'rgb(var(--green-6))',
            height: '16px',
            width: '16px',
          }"
        />
      </a-button>
      <div v-else :style="{ width: '22px' }" />
      <a-popconfirm
        v-if="!item && !root"
        content="你确定要删除吗？"
        type="error"
        position="lb"
        @ok="submitDelete"
      >
        <a-button>
          <Icon
            name="icon-minus-circle"
            :svg-style="{ height: '16px', width: '16px' }"
          />
        </a-button>
      </a-popconfirm>
    </a-col>
  </a-row>
  <template
    v-if="!hidden && jsonSchema.type === 'object' && jsonSchema.properties"
  >
    <json-schema-editor-row
      v-for="(property, key) in jsonSchema.properties"
      :key="key"
      :json-schema="property"
      :field-name="key as string"
      :depth="depth + 1"
      :relationship-chain="[...relationshipChain, 'properties', key as string]"
      :must="jsonSchema.required && jsonSchema.required.includes(key as string)"
    />
  </template>
  <template v-if="!hidden && jsonSchema.type === 'array' && jsonSchema.items">
    <json-schema-editor-row
      :json-schema="jsonSchema.items"
      :depth="depth + 1"
      :relationship-chain="[...relationshipChain, 'items']"
      item
    />
  </template>
</template>

<script setup lang="ts">
  import { JSONSchema } from '@/types/schema';
  import { computed, inject, ref } from 'vue';
  import Icon from '@/components/icon/index.vue';
  // eslint-disable-next-line import/no-self-import
  import JsonSchemaEditorRow from '@/components/json-schema-editor/editor-row/index.vue';

  interface Props {
    jsonSchema: JSONSchema;
    root?: boolean;
    item?: boolean;
    depth?: number;
    fieldName?: string;
    relationshipChain?: string[];
    must?: boolean;
  }

  const prop = withDefaults(defineProps<Props>(), {
    root: false,
    item: false,
    depth: 0,
    relationshipChain: () => [],
    must: false,
  });

  const hidden = ref(false);
  const fieldName = ref(prop.fieldName);
  const title = ref(prop.jsonSchema.title);
  const description = ref(prop.jsonSchema.description);
  const must = ref(prop.must);

  const textColor = computed(() => {
    switch (prop.jsonSchema.type) {
      case 'string':
        return 'rgb(var(--green-6))';
      case 'object':
        return '';
      case 'array':
        return 'rgb(var(--orange-4))';
      case 'integer':
        return '#ee46bc';
      case 'number':
        return 'rgb(var(--arcoblue-4))';
      default:
        return 'rgb(var(--green-6))';
    }
  });

  const deleteProperty = inject(
    'deleteProperty',
    (relationshipChain: string[]) => {},
  );

  const addChildrenProperty = inject(
    'addChildrenProperty',
    (relationshipChain: string[]) => {},
  );

  const modifyPropertyName = inject(
    'modifyPropertyName',
    (relationshipChain: string[], name: string | undefined) => {},
  );

  const modifyPropertyValue = inject(
    'modifyPropertyValue',
    (relationshipChain: string[], valueObj: any) => {},
  );

  const deleteArrayElement = inject(
    'deleteArrayElement',
    (relationshipChain: string[], valueObj: any) => {},
  );

  const addArrayElement = inject(
    'addArrayElement',
    (relationshipChain: string[], valueObj: any) => {},
  );

  const submitDelete = () => {
    deleteProperty(prop.relationshipChain);

    // 还需删除 required 数组里的数据
    const path = prop.relationshipChain.slice();
    // 弹出 key
    path.pop();
    // 弹出 properties
    path.pop();
    path.push('required');
    deleteArrayElement(path, fieldName.value);
  };
  const submitAddChildren = () => {
    addChildrenProperty(prop.relationshipChain);
  };

  const submitPropertyName = () => {
    modifyPropertyName(prop.relationshipChain, fieldName.value);
  };
  const submitModifyTitle = () => {
    modifyPropertyValue([...prop.relationshipChain, 'title'], title.value);
  };
  const submitModifyDescription = () => {
    modifyPropertyValue(
      [...prop.relationshipChain, 'description'],
      title.value,
    );
  };
  const submitModifyType = (value: any) => {
    const newEntity = { type: value } as JSONSchema;
    newEntity.title = title.value;
    newEntity.description = description.value;
    if (value === 'array') {
      newEntity.items = { type: 'string' };
    }
    modifyPropertyValue(prop.relationshipChain, newEntity);
  };
  const submitChangeRequired = () => {
    must.value = !must.value;
    const path = prop.relationshipChain.slice();
    // 弹出 key
    path.pop();
    // 弹出 properties
    path.pop();
    path.push('required');
    if (must.value) {
      addArrayElement(path, fieldName.value);
    } else {
      deleteArrayElement(path, fieldName.value);
    }
  };
</script>

<style scoped lang="less">
  .editor-row {
    overflow: hidden;
    border-radius: var(--border-radius-medium);

    :deep(.arco-input-wrapper) {
      padding: 0 5px;
      background-color: transparent;

      &:hover {
        border-bottom: 1px solid var(--activate-tab-color);
      }
    }

    :deep(.arco-input-focus) {
      border: none;
    }

    &:hover .arco-col:not(.col-name) {
      background-color: var(--color-fill-1);
    }

    &:hover .col-name .col-name-c {
      background-color: var(--color-fill-1);
    }
  }

  .editor-row .arco-col {
    height: 32px;
    color: var(--color-white);
    text-align: center;
  }

  .col-name {
    display: flex;
    align-items: center;
  }

  .col-name-c {
    display: flex;
    flex: 1;
    align-items: center;
    height: 32px;
  }

  .col-name-button {
    width: 23px;

    :deep(.arco-btn-icon) {
      color: var(--color-neutral-3);

      &:hover {
        color: var(--color-neutral-8);
      }
    }
  }

  .col-type {
    display: flex;
    gap: 2px;
    align-items: center;
  }

  .dropdown-button {
    padding: 0 4px;
    background-color: transparent;

    &:hover {
      text-decoration: underline;
    }
  }

  .property-button {
    display: none;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    padding: 0;
    background-color: transparent;

    svg {
      fill: grey;
    }
  }

  .editor-row:hover .property-button {
    display: flex;
  }

  .must-button {
    display: flex;

    svg {
      fill: red;
    }
  }

  .col-operate {
    display: flex;
    flex: 1;
    gap: 2px;
    align-items: center;

    :deep(.arco-btn) {
      width: 22px;
      height: 22px;
      padding: 0;
      background-color: transparent;
      border-radius: var(--border-radius-medium);

      &:hover {
        background-color: var(--color-fill-3);
      }
    }
  }
</style>
