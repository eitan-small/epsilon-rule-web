<template>
  <div ref="editorRef" class="editor-main" />
</template>

<script setup lang="ts">
  import { onMounted, ref, watch } from 'vue';
  import { basicSetup, EditorView } from 'codemirror';
  import { json } from '@codemirror/lang-json';
  import { EditorState, Transaction } from '@codemirror/state';
  import { Diagnostic, linter, lintGutter } from '@codemirror/lint';
  import { ayuLight } from 'thememirror';

  const props = defineProps({
    codeDoc: String,
  });
  const emit = defineEmits(['update:doc']);

  const editorRef = ref();
  const editorView = ref();

  const jsonLint = (view: EditorView): Diagnostic[] => {
    const doc: string = view.state.doc.toString();
    try {
      JSON.parse(doc);
      return []; // 如果没有错误，返回空数组
    } catch (e: any) {
      const message: string = e.message as string;
      const pos = message.match(/position (\d+)/);
      const index: number = pos ? parseInt(pos[1], 10) : 0;
      return [
        {
          from: index,
          to: index + 1,
          severity: 'error',
          message,
        },
      ];
    }
  };

  const initEditor = () => {
    if (typeof editorView.value !== 'undefined') {
      editorView.value.destroy();
    }

    const startState = EditorState.create({
      doc: props.codeDoc,
      extensions: [
        basicSetup,
        ayuLight,
        json(),
        linter(jsonLint),
        lintGutter(),
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
    () => props.codeDoc,
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
