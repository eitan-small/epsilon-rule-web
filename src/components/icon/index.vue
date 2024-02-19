<template>
  <component
    :is="props.name"
    v-if="props.name.indexOf('icon-') === 0"
    :style="props.svgStyle"
  />
  <component :is="currentComponent" v-else :style="props.svgStyle" />
</template>

<script setup lang="ts">
  import { type Component, computed, CSSProperties } from 'vue';

  interface Props {
    name: string;
    svgStyle?: CSSProperties;
  }

  const props = withDefaults(defineProps<Props>(), {
    name: '',
    svgStyle: undefined,
  });

  const modules = import.meta.glob('@/assets/images/*.svg', { eager: true });

  const currentComponent = computed<Component>(() => {
    const fileName = `${props.name}.svg`;
    let module;
    Object.keys(modules).forEach((key) => {
      if (key.endsWith(fileName)) {
        module = modules[key];
      }
    });
    if (!module) {
      throw new Error(`not found svg file:${fileName}`);
    }
    return module;
  });
</script>
