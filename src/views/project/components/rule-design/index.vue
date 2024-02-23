<template>
  <div class="rule-design">
    {{ showComponent }}
    {{ ruleMenu }}
  </div>
</template>

<script setup lang="ts">
  import { RuleMenu } from '@/api/rule-menu';

  interface Props {
    ruleMenu: RuleMenu;
    showComponent: boolean;
  }

  withDefaults(defineProps<Props>(), {
    showComponent: true,
  });
</script>
