<template>
  <div class="rule-basic">
    <a-form
      size="large"
      :model="form"
      :style="{ width: '600px' }"
      @submit="handleSubmit"
    >
      <a-form-item
        field="menuName"
        label="规则名称"
        :rules="[{ required: true, message: '规则名称不能为空' }]"
      >
        <a-input v-model="form.menuName" />
      </a-form-item>
      <a-form-item field="chainName" label="规则编号">
        <a-typography-text copyable>{{ form.chainName }}</a-typography-text>
      </a-form-item>
      <a-form-item field="ruleDesc" label="规则描述">
        <a-textarea
          v-model="form.ruleDesc"
          placeholder="请输入规则描述"
          :max-length="80"
          allow-clear
          show-word-limit
        />
      </a-form-item>
      <a-form-item field="validated" label="校验状态">
        <a-typography-text v-if="form.validated" type="success">
          校验成功
        </a-typography-text>
        <a-typography-text v-else type="danger"> 未校验 </a-typography-text>
      </a-form-item>
      <a-form-item
        field="enable"
        label="启用状态"
        :rules="[
          {
            validator: (value, cb) => {
              value && !form.validated ? cb('未校验的规则不能启用') : cb();
            },
          },
        ]"
      >
        <a-switch v-model="form.enable" />
      </a-form-item>
      <a-form-item>
        <div class="button-wrapper">
          <a-button html-type="submit" type="primary">保存</a-button>
        </div>
      </a-form-item>
    </a-form>
    {{ form }}
  </div>
</template>

<script setup lang="ts">
  import { computed, inject, onMounted, ref } from 'vue';
  import { RuleMenu } from '@/api/rule-menu';
  import { EpsilonRule, saveOrUpdate, selectRule } from '@/api/rule';
  import { generateUUID } from '@/utils/common';
  import { Message } from '@arco-design/web-vue';

  interface Props {
    ruleMenu: RuleMenu;
  }

  const props = defineProps<Props>();
  const form = ref<EpsilonRule>({
    ruleId: props.ruleMenu.ruleId,
    projectId: props.ruleMenu.projectId,
    menuName: props.ruleMenu.menuName,
    chainName: generateUUID(),
    ruleDesc: '',
    enable: false,
    validated: false,
  });

  const refreshMenu = inject<(ruleMenu: RuleMenu) => void>('refreshMenu');

  const fetchData = async () => {
    if (!props.ruleMenu.ruleId) return;
    const resp = await selectRule(props.ruleMenu.ruleId);
    form.value = resp.data;
  };

  const handleSubmit = ({
    values,
    errors,
  }: {
    values: EpsilonRule;
    errors: Record<string, any> | undefined;
  }) => {
    if (errors) {
      Message.warning('请按照提示填写完整！');
      return;
    }
    saveOrUpdate(values).then((resp) => {
      form.value.ruleId = resp.data.ruleId;
      Message.success('保存成功！');
      if (refreshMenu) {
        refreshMenu(resp.data);
      }
    });
  };

  onMounted(() => {
    fetchData();
  });
</script>

<style scoped lang="less">
  .rule-basic {
    height: calc(100vh - 110px);
    padding: 20px;
    overflow: auto;
  }

  .button-wrapper {
    display: flex;
    justify-content: flex-end;
    width: 100%;
  }
</style>
