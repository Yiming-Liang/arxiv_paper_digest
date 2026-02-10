# 2026年2月10日 Agent Memory 领域最新研究进展

---

```
[1] BudgetMem: Learning Query-Aware Budget-Tier Routing for Runtime Agent Memory
作者：Haozhen Zhang, Haodong Yue, Tao Feng et al. | 第一单位：清华大学等
链接：https://arxiv.org/abs/2602.06025

简单介绍：针对现有 agent memory 系统依赖离线、query-agnostic 内存构建导致的效率低下问题，提出 BudgetMem 框架，通过三层预算路由（Low/Mid/High）实现显式的 query-aware 性能-成本控制，在 LoCoMo、LongMemEval 和 HotpotQA 基准上超越强基线。
```

<details><summary>详细总结</summary>

**相关工作**：
- **离线内存构建**：大多数现有系统在查询前静态构建 memory，可能丢弃关键信息
- **运行时内存利用**：虽然更灵活，但以往工作开销大且缺乏显式的性能-成本控制
- **本工作差异**：提出显式的 budget-tier routing 机制，通过轻量级神经网络策略动态选择 memory 模块的预算层级

**创新点**：
1. **BudgetMem 框架**：将 memory 处理结构化为多个 memory 模块，每个模块提供三层预算（Low/Mid/High）
2. **轻量级路由策略**：使用紧凑的神经网络策略进行 budget-tier routing，通过强化学习训练
3. **三层 tiering 策略**：Implementation（方法复杂度）、Reasoning（推理行为）、Capacity（模块模型大小）
4. **统一测试平台**：系统研究不同 tiering 策略在各种预算制度下的 trade-offs

**效果**：
- **高预算设置**：在 LoCoMo、LongMemEval、HotpotQA 上超越强基线
- **成本-准确率前沿**：在 tighter budgets 下实现更好的准确率-成本权衡
- **策略分析**：澄清了不同 tiering 策略在 varying budget regimes 下的优劣势

**代码：** https://github.com/ViktorAxelsen/BudgetMem

</details>

---

```
[2] Learning to Share (LTS): Selective Memory for Efficient Parallel Agentic Systems
作者：Joseph Fioresi, Parth Parag Kulkarni, Ashmal Vayani et al. | 第一单位：University of Central Florida
链接：https://arxiv.org/abs/2602.05965

简单介绍：针对并行 agentic 系统中多团队独立推理导致的大量重复计算问题，提出 Learning to Share (LTS) 框架，通过学习的选择性共享 memory 机制实现跨团队信息复用，在 AssistantBench 和 GAIA 基准上显著降低运行时间同时保持或提升任务性能。
```
<details><summary>详细总结</summary>

**相关工作**：
- **并行 agentic 系统**：部署多团队并行探索 diverse reasoning trajectories 以提高鲁棒性和解决方案质量
- **计算成本问题**：不同团队独立推理相似子问题时产生大量重叠计算
- **本工作差异**：引入全局共享 memory bank 和轻量级控制器，实现选择性跨团队信息复用

**创新点**：
1. **全局共享 Memory Bank**：所有团队可访问的共享 memory 机制
2. **轻量级 Memory 控制器**：决定 agent 的中间步骤是否应该加入 memory
3. **Stepwise RL 训练**：使用 usage-aware credit assignment 的逐步强化学习训练控制器
4. **信息全局有用性识别**：控制器能够识别在并行执行中全局有用的信息

**效果**：
- **效率提升**：显著降低整体运行时间
- **性能保持**：匹配或超越无 memory 并行基线的任务性能
- **基准测试**：在 AssistantBench 和 GAIA 上验证有效

**项目页：** https://joefioresi718.github.io/LTS_webpage/

</details>

---

```
[3] Graph-based Agent Memory: Taxonomy, Techniques, and Applications
作者：Chang Yang, Chuang Zhou, Yilin Xiao et al. | 第一单位：厦门大学、香港理工大学等
链接：https://arxiv.org/abs/2602.05665

简单介绍：首篇从 graph-based 视角系统性综述 agent memory 的论文，提出完整的 taxonomy（短期 vs 长期、知识 vs 经验、非结构 vs 结构），覆盖 memory 生命周期的关键技术（提取、存储、检索、演化），并总结了开源库、benchmarks 及未来研究方向。
```
<details><summary>详细总结</summary>

**相关工作**：
- **Agent memory 重要性**：memory 是 LLM-based agents 处理长程复杂任务的核心模块
- **Graph 结构优势**：能够建模关系依赖、组织层次信息、支持高效检索
- **本工作差异**：首次从 graph-based 视角全面综述 agent memory，提供 taxonomy 和关键技术系统分析

**创新点**：
1. **Taxonomy 分类框架**：
   - 短期 vs 长期 memory
   - 知识 vs 经验 memory
   - 非结构 vs 结构 memory
2. **Memory 生命周期技术**：
   - **Memory Extraction**：将数据转换为 memory 内容
   - **Storage**：高效组织数据
   - **Retrieval**：从 memory 检索相关内容支持推理
   - **Evolution**：更新 memory 内容实现自我进化
3. **开源资源总结**：收集相关研究论文、开源数据和项目
4. **未来方向**：识别关键挑战和研究机遇

**效果**：
- **系统性**：首次全面综述 graph-based agent memory
- **实用性**：提供 actionable insights 促进高效可靠的 memory 系统开发
- **资源聚合**：GitHub 收集相关资源 https://github.com/DEEP-PolyU/Awesome-GraphMemory

</details>

---

```
[4] UI-Mem: Self-Evolving Experience Memory for Online Reinforcement Learning in Mobile GUI Agents
作者：Han Xiao, Guozhi Wang, Hao Wang et al. | 第一单位：未明确
链接：https://arxiv.org/abs/2602.05832

简单介绍：针对在线 RL 在 GUI agent 中的信用分配效率低和跨任务重复错误问题，提出 UI-Mem 框架，引入层次化经验记忆积累结构化知识（工作流、子任务技能、失败模式），支持跨任务和跨应用迁移，通过 Stratified Group Sampling 和 Self-Evolving Loop 实现 memory 与策略的持续对齐。
```
<details><summary>详细总结</summary>

**相关工作**：
- **在线 RL for GUI Agents**：通过环境交互增强 GUI agent，但信用分配效率低
- **经验迁移缺失**：缺乏经验迁移导致跨任务重复错误
- **传统 Replay Buffer**：与 UI-Mem 的层次化经验记忆形成对比

**创新点**：
1. **层次化经验记忆 (Hierarchical Experience Memory)**：
   - 积累工作流、子任务技能、失败模式
   - 参数化模板存储，支持跨任务和跨应用迁移
2. **Stratified Group Sampling**：
   - 在每个 rollout group 的不同轨迹中注入不同级别的 guidance
   - 保持 outcome diversity，驱动无指导策略内化指导行为
3. **Self-Evolving Loop**：
   - 持续抽象新策略和错误
   - 保持 memory 与 agent 进化策略的对齐

**效果**：
- **显著超越**：显著超越传统 RL 基线和静态复用策略
- **强泛化性**：在未见过的应用上表现良好
- **项目页：** https://ui-mem.github.io

</details>

---

```
[5] InfMem: Learning System-2 Memory Control for Long-Context Agent
作者：Xinyu Wang, Mingze Li, Peng Lu et al. | 第一单位：McGill University
链接：https://arxiv.org/abs/2602.02704

简单介绍：针对超长文档（32k-1M tokens）中稀疏证据的多跳推理问题，提出 InfMem 控制中心 agent，通过 PreThink-Retrieve-Write 协议实现 System-2 风格的主动记忆管理，在保持有界内存的同时显著提升推理准确率并降低推理成本。
```
<details><summary>详细总结</summary>

**相关工作**：
- **Streaming agents**：采用被动内存更新策略，难以保留多跳推理所需的低显著性桥接证据
- **MemAgent**：作为主要对比基线
- **本工作差异**：从被动流式处理转向主动控制式内存管理，引入认知科学 System-2 理论

**创新点**：
1. **PreThink-Retrieve-Write 协议**：
   - PreThink 阶段：监控当前内存是否足以回答问题，若不足则合成问题条件化的检索查询并预测检索规模
   - Retrieve 阶段：对整个文档执行定向查询，支持非单调访问相关片段
   - Write 阶段：将当前片段与检索证据联合整合到有界覆写内存中
2. **自适应早停机制**：一旦在内存中巩固足够证据即终止检索-写入循环
3. **SFT-to-RL 训练方法**：先用推理正确轨迹进行监督微调预热，再应用基于验证器的强化学习

**效果**：
- **准确率提升**：在 32k-1M token 超长 QA 基准(LongBench QA)上显著提升
   - Qwen3-1.7B：平均绝对准确率 +10.17 分
   - Qwen3-4B：平均绝对准确率 +11.84 分
   - Qwen2.5-7B：平均绝对准确率 +8.23 分
- **效率优化**：通过自适应早停，推理时间平均减少 3.9 倍（最高达 5.1 倍）

</details>

---

```
[6] Self-Consolidation for Self-Evolving Agents
作者：Hongzhuo Yu, Fei Zhu, Guo-Sen Xie et al. | 第一单位：未明确
链接：https://arxiv.org/abs/2602.01966

简单介绍：针对现有 agent 系统作为静态系统缺乏终身交互进化能力的问题，提出自进化框架，引入对比反思策略总结错误模式和可复用洞察，通过自巩固机制将非参数化文本经验蒸馏为紧凑可学习参数，实现 agent 的长期进化。
```
<details><summary>详细总结</summary>

**相关工作**：
- **静态 Agent 系统**：现有 LLM agents 通常作为静态系统运行
- **轨迹检索方法**：主要依赖检索成功的过去轨迹作为演示，但忽略了失败尝试的教学价值
- **文本经验累积问题**：持续累积文本经验增加检索时间并引入噪声

**创新点**：
1. **对比反思策略 (Contrastive Reflection)**：
   - 显式总结错误易发模式
   - 捕获可复用的洞察
2. **自巩固机制 (Self-Consolidation)**：
   - 将非参数化文本经验蒸馏为紧凑可学习参数
   - 使 agent 能够将大量历史经验内化到其潜在空间中
3. **互补进化机制**：对比反思 + 自巩固的双重机制

**效果**：
- **长期进化优势**：在长期 agent 进化中展示优势
- **克服遗忘**：避免仅关注成功而忽略失败的问题
- **克服上下文限制**：解决文本经验累积导致的上下文窗口耗尽问题

</details>