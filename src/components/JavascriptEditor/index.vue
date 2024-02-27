<template>
  <div ref="editorRef" class="editor-main" />
</template>

<script setup lang="ts">
  import { onMounted, ref, watch } from 'vue';
  import { basicSetup, EditorView } from 'codemirror';
  import { javascript } from '@codemirror/lang-javascript';
  import { EditorState, Transaction } from '@codemirror/state';

  const props = defineProps({
    initialDoc: String,
  });
  const emit = defineEmits(['update:doc']);

  const editorRef = ref();
  const editorView = ref();

  const initEditor = () => {
    if (typeof editorView.value !== 'undefined') {
      editorView.value.destroy();
    }

    const startState = EditorState.create({
      doc: props.initialDoc,
      extensions: [
        basicSetup,
        javascript(),
        EditorState.changeFilter.of((change: Transaction) => {
          const doc = change.newDoc.toString();
          emit('update:doc', doc);
          return true;
        }),
      ],
    });
    if (editorRef.value) {
      editorView.value = new EditorView({
        state: startState,

        parent: editorRef.value,
      });
    }
  };

  watch(
    () => props.initialDoc,
    (newDoc, oldDoc) => {
      if (newDoc !== oldDoc) {
        initEditor();
      }
    },
    { immediate: true },
  );

  onMounted(() => {
    initEditor();
  });
</script>

<style scoped lang="less">
  .editor-main {
    height: 100px;
  }
</style>
