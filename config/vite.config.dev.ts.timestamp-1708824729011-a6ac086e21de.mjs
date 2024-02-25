// config/vite.config.dev.ts
import { mergeConfig } from "file:///D:/workspace/epsilon-rule-web/node_modules/.pnpm/registry.npmmirror.com+vite@4.4.11_@types+node@20.5.1_less@4.2.0/node_modules/vite/dist/node/index.js";
import eslint from "file:///D:/workspace/epsilon-rule-web/node_modules/.pnpm/registry.npmmirror.com+vite-plugin-eslint@1.8.1_eslint@8.51.0_vite@4.4.11/node_modules/vite-plugin-eslint/dist/index.mjs";

// config/vite.config.base.ts
import { resolve } from "path";
import { defineConfig } from "file:///D:/workspace/epsilon-rule-web/node_modules/.pnpm/registry.npmmirror.com+vite@4.4.11_@types+node@20.5.1_less@4.2.0/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/workspace/epsilon-rule-web/node_modules/.pnpm/registry.npmmirror.com+@vitejs+plugin-vue@4.4.0_vite@4.4.11_vue@3.3.4/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import svgLoader from "file:///D:/workspace/epsilon-rule-web/node_modules/.pnpm/registry.npmmirror.com+vite-svg-loader@4.0.0/node_modules/vite-svg-loader/index.js";

// config/plugin/arcoStyleImport.ts
import { vitePluginForArco } from "file:///D:/workspace/epsilon-rule-web/node_modules/.pnpm/registry.npmmirror.com+@arco-plugins+vite-vue@1.4.5/node_modules/@arco-plugins/vite-vue/lib/index.js";
function configArcoStyleImportPlugin() {
  return vitePluginForArco({});
}

// config/vite.config.base.ts
var __vite_injected_original_dirname = "D:\\workspace\\epsilon-rule-web\\config";
var vite_config_base_default = defineConfig({
  plugins: [
    vue(),
    svgLoader({ svgoConfig: {} }),
    configArcoStyleImportPlugin()
  ],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: resolve(__vite_injected_original_dirname, "../src")
      },
      {
        find: "assets",
        replacement: resolve(__vite_injected_original_dirname, "../src/assets")
      },
      {
        find: "vue",
        replacement: "vue/dist/vue.esm-bundler.js"
      }
    ],
    extensions: [".ts", ".js"]
  },
  define: {
    "process.env": {}
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `@import "@/assets/style/variable.less";`,
        javascriptEnabled: true
      }
    }
  }
});

// config/vite.config.dev.ts
var vite_config_dev_default = mergeConfig(
  {
    mode: "development",
    server: {
      open: true,
      fs: {
        strict: true
      }
    },
    plugins: [
      eslint({
        fix: true,
        cache: false,
        include: ["src/**/*.ts", "src/**/*.tsx", "src/**/*.vue"],
        exclude: ["node_modules"]
      })
    ]
  },
  vite_config_base_default
);
export {
  vite_config_dev_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY29uZmlnL3ZpdGUuY29uZmlnLmRldi50cyIsICJjb25maWcvdml0ZS5jb25maWcuYmFzZS50cyIsICJjb25maWcvcGx1Z2luL2FyY29TdHlsZUltcG9ydC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXHdvcmtzcGFjZVxcXFxlcHNpbG9uLXJ1bGUtd2ViXFxcXGNvbmZpZ1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcd29ya3NwYWNlXFxcXGVwc2lsb24tcnVsZS13ZWJcXFxcY29uZmlnXFxcXHZpdGUuY29uZmlnLmRldi50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovd29ya3NwYWNlL2Vwc2lsb24tcnVsZS13ZWIvY29uZmlnL3ZpdGUuY29uZmlnLmRldi50c1wiO2ltcG9ydCB7IG1lcmdlQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgZXNsaW50IGZyb20gJ3ZpdGUtcGx1Z2luLWVzbGludCc7XG5pbXBvcnQgYmFzZUNvbmZpZyBmcm9tICcuL3ZpdGUuY29uZmlnLmJhc2UnO1xuXG5leHBvcnQgZGVmYXVsdCBtZXJnZUNvbmZpZyhcbiAge1xuICAgIG1vZGU6ICdkZXZlbG9wbWVudCcsXG4gICAgc2VydmVyOiB7XG4gICAgICBvcGVuOiB0cnVlLFxuICAgICAgZnM6IHtcbiAgICAgICAgc3RyaWN0OiB0cnVlLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHBsdWdpbnM6IFtcbiAgICAgIGVzbGludCh7XG4gICAgICAgIGZpeDogdHJ1ZSxcbiAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICBpbmNsdWRlOiBbJ3NyYy8qKi8qLnRzJywgJ3NyYy8qKi8qLnRzeCcsICdzcmMvKiovKi52dWUnXSxcbiAgICAgICAgZXhjbHVkZTogWydub2RlX21vZHVsZXMnXSxcbiAgICAgIH0pLFxuICAgIF0sXG4gIH0sXG4gIGJhc2VDb25maWcsXG4pO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFx3b3Jrc3BhY2VcXFxcZXBzaWxvbi1ydWxlLXdlYlxcXFxjb25maWdcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXHdvcmtzcGFjZVxcXFxlcHNpbG9uLXJ1bGUtd2ViXFxcXGNvbmZpZ1xcXFx2aXRlLmNvbmZpZy5iYXNlLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi93b3Jrc3BhY2UvZXBzaWxvbi1ydWxlLXdlYi9jb25maWcvdml0ZS5jb25maWcuYmFzZS50c1wiO2ltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJztcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnO1xuaW1wb3J0IHN2Z0xvYWRlciBmcm9tICd2aXRlLXN2Zy1sb2FkZXInO1xuaW1wb3J0IGNvbmZpZ0FyY29TdHlsZUltcG9ydFBsdWdpbiBmcm9tICcuL3BsdWdpbi9hcmNvU3R5bGVJbXBvcnQnO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgdnVlKCksXG4gICAgc3ZnTG9hZGVyKHsgc3Znb0NvbmZpZzoge30gfSksXG4gICAgY29uZmlnQXJjb1N0eWxlSW1wb3J0UGx1Z2luKCksXG4gIF0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczogW1xuICAgICAge1xuICAgICAgICBmaW5kOiAnQCcsXG4gICAgICAgIHJlcGxhY2VtZW50OiByZXNvbHZlKF9fZGlybmFtZSwgJy4uL3NyYycpLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgZmluZDogJ2Fzc2V0cycsXG4gICAgICAgIHJlcGxhY2VtZW50OiByZXNvbHZlKF9fZGlybmFtZSwgJy4uL3NyYy9hc3NldHMnKSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGZpbmQ6ICd2dWUnLFxuICAgICAgICByZXBsYWNlbWVudDogJ3Z1ZS9kaXN0L3Z1ZS5lc20tYnVuZGxlci5qcycsXG4gICAgICB9LFxuICAgIF0sXG4gICAgZXh0ZW5zaW9uczogWycudHMnLCAnLmpzJ10sXG4gIH0sXG4gIGRlZmluZToge1xuICAgICdwcm9jZXNzLmVudic6IHt9LFxuICB9LFxuICBjc3M6IHtcbiAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgICBsZXNzOiB7XG4gICAgICAgIGFkZGl0aW9uYWxEYXRhOiBgQGltcG9ydCBcIkAvYXNzZXRzL3N0eWxlL3ZhcmlhYmxlLmxlc3NcIjtgLFxuICAgICAgICBqYXZhc2NyaXB0RW5hYmxlZDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFx3b3Jrc3BhY2VcXFxcZXBzaWxvbi1ydWxlLXdlYlxcXFxjb25maWdcXFxccGx1Z2luXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFx3b3Jrc3BhY2VcXFxcZXBzaWxvbi1ydWxlLXdlYlxcXFxjb25maWdcXFxccGx1Z2luXFxcXGFyY29TdHlsZUltcG9ydC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovd29ya3NwYWNlL2Vwc2lsb24tcnVsZS13ZWIvY29uZmlnL3BsdWdpbi9hcmNvU3R5bGVJbXBvcnQudHNcIjsvKipcbiAqIFRoZW1lIGltcG9ydFxuICogXHU2ODM3XHU1RjBGXHU2MzA5XHU5NzAwXHU1RjE1XHU1MTY1XG4gKiBodHRwczovL2dpdGh1Yi5jb20vYXJjby1kZXNpZ24vYXJjby1wbHVnaW5zL2Jsb2IvbWFpbi9wYWNrYWdlcy9wbHVnaW4tdml0ZS12dWUvUkVBRE1FLm1kXG4gKiBodHRwczovL2FyY28uZGVzaWduL3Z1ZS9kb2NzL3N0YXJ0XG4gKi9cbmltcG9ydCB7IHZpdGVQbHVnaW5Gb3JBcmNvIH0gZnJvbSAnQGFyY28tcGx1Z2lucy92aXRlLXZ1ZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbmZpZ0FyY29TdHlsZUltcG9ydFBsdWdpbigpIHtcbiAgcmV0dXJuIHZpdGVQbHVnaW5Gb3JBcmNvKHt9KTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBOFMsU0FBUyxtQkFBbUI7QUFDMVUsT0FBTyxZQUFZOzs7QUNENlIsU0FBUyxlQUFlO0FBQ3hVLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixPQUFPLGVBQWU7OztBQ0d0QixTQUFTLHlCQUF5QjtBQUVuQixTQUFSLDhCQUErQztBQUNwRCxTQUFPLGtCQUFrQixDQUFDLENBQUM7QUFDN0I7OztBRFZBLElBQU0sbUNBQW1DO0FBTXpDLElBQU8sMkJBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxJQUNKLFVBQVUsRUFBRSxZQUFZLENBQUMsRUFBRSxDQUFDO0FBQUEsSUFDNUIsNEJBQTRCO0FBQUEsRUFDOUI7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixhQUFhLFFBQVEsa0NBQVcsUUFBUTtBQUFBLE1BQzFDO0FBQUEsTUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sYUFBYSxRQUFRLGtDQUFXLGVBQWU7QUFBQSxNQUNqRDtBQUFBLE1BQ0E7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLGFBQWE7QUFBQSxNQUNmO0FBQUEsSUFDRjtBQUFBLElBQ0EsWUFBWSxDQUFDLE9BQU8sS0FBSztBQUFBLEVBQzNCO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixlQUFlLENBQUM7QUFBQSxFQUNsQjtBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0gscUJBQXFCO0FBQUEsTUFDbkIsTUFBTTtBQUFBLFFBQ0osZ0JBQWdCO0FBQUEsUUFDaEIsbUJBQW1CO0FBQUEsTUFDckI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7OztBRHBDRCxJQUFPLDBCQUFRO0FBQUEsRUFDYjtBQUFBLElBQ0UsTUFBTTtBQUFBLElBQ04sUUFBUTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sSUFBSTtBQUFBLFFBQ0YsUUFBUTtBQUFBLE1BQ1Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUEsUUFDTCxLQUFLO0FBQUEsUUFDTCxPQUFPO0FBQUEsUUFDUCxTQUFTLENBQUMsZUFBZSxnQkFBZ0IsY0FBYztBQUFBLFFBQ3ZELFNBQVMsQ0FBQyxjQUFjO0FBQUEsTUFDMUIsQ0FBQztBQUFBLElBQ0g7QUFBQSxFQUNGO0FBQUEsRUFDQTtBQUNGOyIsCiAgIm5hbWVzIjogW10KfQo=
