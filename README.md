# 代码提交说明
Conventional Commits 规范要求提交消息包含以下格式：
```
<type>(optional scope): <description>

[optional body]

[optional footer]
```
这里是各个部分的说明：

`<type>`: 提交的类型，表示提交的目的，常见的类型包括：

* feat：新功能（feature）。
* fix：修复 bug。
* docs：文档相关的修改。
* style：代码样式、格式化等非功能性的修改。
* refactor：重构代码，既不修复 bug 也不添加新功能。
* test：添加或修改测试。
* chore：其他不涉及代码的修改，如构建、工具、依赖等。
 
`(optional scope)`：可选项，表示修改的范围（模块、组件等）。通常可以省略。

`<description>`: 提交的简要描述，通常不超过 72 个字符。

`[optional body]`：可选项，更详细的说明，可以包含多行。

`[optional footer]`：可选项，通常包含关闭 issue 或关联其他提交的信息。

以下是一些提交消息的示例：

* feat(auth): add login feature: 新增登录功能。
* fix(button): fix button click issue: 修复按钮点击问题。
* docs(readme): update installation guide: 更新安装指南。
* style(header): format code: 格式化代码。
* refactor(api): refactor authentication logic: 重构身份验证逻辑。
* test(login): add unit tests for login: 为登录添加单元测试。
* chore(deps): update dependencies: 更新依赖项。