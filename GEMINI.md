# CBB 项目核心架构与开发指南 (Core Architecture & Development Guide)

CBB (Common Building Blocks) 是一个高度工程化、标准化的 **Monorepo 基础设施项目**。它的核心价值在于通过一套严谨的工具链和工程规范，沉淀出一系列可独立复用、高质量的业务与技术组件。

## 真正架构：基于 Rig 的标准化 Monorepo (The True Architecture)

本项目的真正架构并非某个具体的终端应用，而是**一整套标准化的构建、测试与配置体系**。它解决了大型项目中配置冗余、规范不一和依赖混乱的问题。

### 1. 核心支柱：Rig 配置中心 (Rig Configuration System)
位于 `run-control/` 目录下的 `web-rig` 和 `node-rig` 是整个项目的架构基石。
*   **统一化**: 所有的 lint 规则 (ESLint)、格式化 (Prettier)、编译配置 (TypeScript) 和构建逻辑 (Vite/Heft) 都集中在此处。
*   **无感继承**: 各子项目通过引用 Rig 预设，实现了“零配置”启动，确保了整个仓库的代码风格和构建行为高度一致。
*   **隔离原则**: 严禁子项目间使用相对路径 (`../../`) 引用文件，必须通过 workspace 协议以包名形式引用，强制实现解耦。

### 2. 构建体系：Heft + Rush
*   **Heft**: 作为生产环境的构建引擎，负责处理 TypeScript 编译、API 提取 (API Extractor)、单元测试 (Jest) 等复杂任务，产出符合工业标准的包。
*   **Rush**: 负责多项目管理、依赖链接、Phased Builds 以及发布流水线。

### 3. 技术栈重心：排版与渲染引擎 (Layout & Rendering Engine)
从 `libraries/` 的依赖关系可以看出，项目的一个重要方向是**高性能排版与渲染**：
*   **`layout-engine`**: 核心布局引擎，支持图文混排、公式渲染及碰撞检测。
*   **`katex-wrapper` / `mathjax-wrapper`**: 为公式渲染提供的标准化封装。
*   **`html-parser` / `serializer`**: 处理内容的序列化与解析。
*   **`drawing-board`**: 交互式 Canvas 画板组件。

## 目录结构深度解析 (Directory Deep Dive)

*   **`run-control/`**: **架构核心**。存放共享的工具链配置 (Rigs)。
*   **`libraries/`**: 业务与技术逻辑的沉淀池。强调职责单一，仅输出 ESM 格式，不做过度降级，保持代码现代性。
*   **`components/`**: 跨框架或特定框架的 UI 组件。利用 `vue-demi` 等技术实现组件的极致复用。
*   **`apps/`**: **Demo 与 Starter 区域**。包含微前端 (Wujie) 等技术的演示工程，用于验证底层 Building Blocks 的集成效果，而非项目的主体架构。
*   **`cli/`**: 提升开发效率的内部工具，如自动迁移工具。
*   **`assets/`**: 标准化管理的静态资源资产库。

## 开发工作流 (Workflow)

1.  **初始化**: `rush install`
2.  **全量构建**: `rush build`
3.  **新增功能**: 
    *   在 `libraries/` 或 `components/` 中创建新包。
    *   通过 `rig.json` 继承预设配置。
    *   在 `apps/` 目录下通过 Demo 验证功能。
4.  **变更提交**: 必须执行 `rush change` 生成变更描述。

## 项目哲学
*   **最小化模板**: 消除项目间的重复代码和配置文件。
*   **显式依赖**: 所有依赖必须在 `package.json` 中声明，且通过 Rush 建立符号链接。
*   **文档即产物**: 鼓励使用 API Extractor 自动生成 API 文档，保持代码与文档的一致。
