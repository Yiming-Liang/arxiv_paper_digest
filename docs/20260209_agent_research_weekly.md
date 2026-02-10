# Agent Research Weekly - 2026-02-09

> 本周聚焦：Agent Memory、Long-Horizon Agent、Context Retrieval & Long Context
> 筛选范围：2026-02-02 至 2026-02-09 | 排除多模态论文

---

## 一、Agent Memory 研究进展

### 领域趋势洞察
本周 Agent Memory 研究呈现**三大主线**：(1) **Runtime Query-Aware Memory** 成为热点，BudgetMem 等工作探索显式的性能-成本控制机制；(2) **跨 Agent/团队 Memory 共享** 受到关注，Learning to Share 提出了并行系统中的选择性信息共享；(3) **Graph-Based Memory 系统化**，首篇全面综述从图视角梳理了 memory 的 taxonomy 和生命周期技术。此外，**经验积累与持续进化**也是重要方向，Self-Consolidation 和 UI-Mem 等框架探索 agent 的自我进化能力。

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

---

## 二、Long-Horizon Agent 研究进展

### 领域趋势洞察
本周 Long-Horizon Agent 研究聚焦于**结构化规划**和**边缘设备部署**两大方向。Table-as-Search 将长程信息搜索重构为表格补全任务，通过结构化状态管理提升长程探索的稳定性。AgentCPM-Explore 则突破了边缘 scale 模型的长程探索能力，证明 4B 参数模型通过系统训练框架可以达到 8B 甚至更大模型的性能。此外，OdysseyArena 等基准测试推动了对 agent 归纳能力和极端长程交互的评估。ProAct 和 Empirical-MCTS 则从训练范式角度探索如何让 agent 内化前瞻推理能力。

---

```
[7] Table-as-Search (TaS): Formulate Long-Horizon Agentic Information Seeking as Table Completion
作者：Tian Lan, Felix Henry, Bin Zhu et al. | 第一单位：Alibaba International Digital Commerce
链接：https://arxiv.org/abs/2602.06724

简单介绍：针对长程信息搜索中状态追踪困难的问题，提出 Table-as-Search 框架，将 InfoSeeking 任务重构为表格补全任务，通过结构化表模式管理搜索状态，统一 Deep Search、Wide Search 和 DeepWide Search，在长程 InfoSeeking 中展示出优越的鲁棒性、效率和可扩展性。
```
<details><summary>详细总结</summary>

**相关工作**：
- **长程 InfoSeeking 挑战**：在纯文本上下文中追踪搜索状态（规划过程和大量搜索结果）本质上很脆弱
- **现有 agent 困境**：难以在长程探索中保持专注和连贯性
- **本工作差异**：将任务重构为结构化表格补全，而非自由文本生成

**创新点**：
1. **表格化状态管理**：
   - 将查询映射到外部数据库中维护的结构化表模式
   - 行表示搜索候选，列表示约束或所需信息
2. **双重功能设计**：
   - 已填充单元格：严格记录历史和搜索结果
   - 空单元格：作为显式搜索计划
3. **统一三种 InfoSeeking 任务**：Deep Search、Wide Search、DeepWide Search
4. **结构化规划框架**：提供显式、可解释的搜索状态管理

**效果**：
- **显著超越**：显著优于多种 SOTA 基线（包括多 agent 框架和商业系统）
- **长程鲁棒性**：在长程 InfoSeeking 中展示优越鲁棒性
- **效率与可扩展性**：高效且可扩展

**代码：** https://github.com/AIDC-AI/Marco-Search-Agent

</details>

---

```
[8] AgentCPM-Explore: Realizing Long-Horizon Deep Exploration for Edge-Scale Agents
作者：Haotian Chen, Xin Cong, Shengda Fan et al. | 第一单位：清华大学等
链接：https://arxiv.org/abs/2602.06485

简单介绍：首个针对 4B 参数规模边缘 agent 模型的系统性研究，识别出阻碍边缘模型性能的三大瓶颈（SFT 灾难性遗忘、RL 奖励噪声敏感、长上下文冗余信息），提出 holistic 训练框架（参数空间模型融合、奖励信号去噪、上下文信息精炼），在 GAIA 文本任务上达到 97.09% 准确率，匹配或超越 8B 模型。
```
<details><summary>详细总结</summary>

**相关工作**：
- **大模型依赖**：现有系统严重依赖大规模模型，边缘 scale 模型能力未被充分探索
- **边缘模型瓶颈**：SFT 灾难性遗忘、RL 奖励噪声敏感、长上下文冗余信息导致的推理退化
- **本工作差异**：首个系统研究 4B 参数规模 agent 模型的训练方法

**创新点**：
1. **参数空间模型融合 (Parameter-Space Model Fusion)**：解决 SFT 灾难性遗忘
2. **奖励信号去噪 (Reward Signal Denoising)**：降低 RL 对奖励噪声的敏感性
3. **上下文信息精炼 (Contextual Information Refinement)**：处理长上下文冗余信息
4. **Holistic 训练框架**：整合上述三种技术的完整训练流程

**效果**：
- **SOTA 性能**：在 4B 类模型中达到 SOTA
- **超越 8B 模型**：在四个基准上匹配或超越 8B 类 SOTA 模型
- **超越大模型**：在五个基准上超越 Claude-4.5-Sonnet、DeepSeek-v3.2 等更大模型
- **GAIA 表现**：在 GAIA 文本任务上达到 97.09% 准确率 (pass@64)
- **核心结论**：边缘模型的瓶颈不是固有能力上限，而是推理稳定性

</details>

---

```
[9] OdysseyArena: Benchmarking LLMs for Long-Horizon, Active and Inductive Interactions
作者：Fangzhi Xu, Hang Yan, Qiushi Sun et al. | 第一单位：复旦大学等
链接：https://arxiv.org/abs/2602.05843

简单介绍：现有评估主要采用演绎范式，忽略了 agent 从经验中自主发现潜在转移规律的归纳能力。OdysseyArena 重新聚焦于长程、主动、归纳交互，形式化并实例化四个原语，提供 120 个标准化任务（OdysseyArena-Lite）和极端交互场景（>200步，OdysseyArena-Challenge），揭示即使前沿模型在归纳场景中也存在缺陷。
```
<details><summary>详细总结</summary>

**相关工作**：
- **演绎范式局限**：现有评估基于显式规则和静态目标，规划范围有限
- **归纳能力缺失**：忽视了 agent 自主发现潜在转移规律的能力
- **本工作差异**：首次系统评估 agent 的归纳效率和长程发现能力

**创新点**：
1. **归纳交互形式化**：形式化并实例化四个原语，将抽象转移动态转化为具体交互环境
2. **标准化基准 (OdysseyArena-Lite)**：
   - 120 个任务
   - 测量 agent 的归纳效率和长程发现能力
3. **极端挑战 (OdysseyArena-Challenge)**：
   - 极端交互场景（>200 步）
   - 压力测试 agent 稳定性
4. **统一评估框架**：系统评估 15+ 领先 LLM

**效果**：
- **发现瓶颈**：即使前沿模型在归纳场景中也存在缺陷
- **识别关键挑战**：发现复杂环境中自主发现的关键瓶颈
- **推动研究**：为长程归纳交互研究提供标准化评估平台

**代码：** https://github.com/xufangzhi/Odyssey-Arena

</details>

---

```
[10] ProAct: Agentic Lookahead in Interactive Environments
作者：Yangbin Yu, Mingyu Yang, Junyou Li et al. | 第一单位：未明确
链接：https://arxiv.org/abs/2602.05327

简单介绍：针对 LLM agents 在长程规划中的复合错误问题，提出 ProAct 框架，通过两阶段训练范式使 agent 内化准确的前瞻推理。Grounded LookAhead Distillation (GLAD) 将环境搜索轨迹压缩为简洁的因果推理链，Monte-Carlo Critic (MC-Critic) 通过轻量级环境 rollout 校准价值估计，4B 模型在 2048 和 Sokoban 上超越所有开源基线并匹敌 SOTA 闭源模型。
```
<details><summary>详细总结</summary>

**相关工作**：
- **长程规划挑战**：模拟未来状态时的复合错误
- **现有方法局限**：缺乏有效的前瞻推理内化机制
- **本工作差异**：通过蒸馏将搜索能力转化为模型内在能力

**创新点**：
1. **Grounded LookAhead Distillation (GLAD)**：
   - 基于环境搜索的轨迹进行监督微调
   - 将复杂搜索树压缩为简洁因果推理链
   - 学习预见逻辑而无需推理时搜索开销
2. **Monte-Carlo Critic (MC-Critic)**：
   - 即插即用的辅助价值估计器
   - 利用轻量级环境 rollout 校准价值估计
   - 为 PPO 和 GRPO 等策略梯度算法提供低方差信号
3. **两阶段训练范式**：GLAD + MC-Critic 的组合训练

**效果**：
- **规划准确率提升**：在随机（2048）和确定性（Sokoban）环境中均显著提升
- **4B 模型表现优异**：超越所有开源基线，匹敌 SOTA 闭源模型
- **强泛化性**：在未见过环境上表现鲁棒

**代码：** https://github.com/GreatX3/ProAct

</details>

---

```
[11] Empirical-MCTS: Continuous Agent Evolution via Dual-Experience Monte Carlo Tree Search
作者：Hao Lu, Haoyuan Huang, Yulin Zhou et al. | 第一单位：未明确
链接：https://arxiv.org/abs/2602.04248

简单介绍：针对现有 MCTS 方法无状态、丢弃成功推理模式的问题，提出 Empirical-MCTS 双循环框架，通过 Pairwise-Experience-Evolutionary Meta-Prompting (PE-EMP) 和 Memory Optimization Agent 实现局部探索与全局 memory 优化的统一，在 AIME25、ARC-AGI-2 和 MathArena Apex 上显著超越无状态 MCTS 策略。
```
<details><summary>详细总结</summary>

**相关工作**：
- **Inference-time Scaling**：MCTS 显著增强 LLM 推理能力
- **现有 MCTS 局限**：主要无状态，每个问题实例后丢弃成功推理模式
- **人类问题解决**：人类通过经验积累智慧，而非每次重新学习
- **本工作差异**：将无状态搜索转化为连续的、非参数化的学习过程

**创新点**：
1. **双循环框架 (Dual-Loop Framework)**：统一局部探索与全局 memory 优化
2. **PE-EMP (Pairwise-Experience-Evolutionary Meta-Prompting)**：
   - 在局部搜索中作为反射式优化器
   - 使用成对反馈动态合成自适应标准
   - 实时演化 meta-prompts (system prompts)
3. **Memory Optimization Agent**：
   - 管理全局 repository 作为动态 policy prior
   - 使用原子操作跨问题蒸馏高质量洞察
4. **经验积累机制**：结构化搜索与经验积累耦合

**效果**：
- **AIME25**：显著超越无状态 MCTS 策略
- **ARC-AGI-2**：超越独立经验驱动 agents
- **MathArena Apex**：在复杂开放推理任务上表现优异
- **核心结论**：结构化搜索与经验积累耦合对于掌握复杂开放推理任务至关重要

</details>

---

## 三、Context Retrieval & Long Context 研究进展

### 领域趋势洞察
本周 Context Retrieval 和 Long Context 研究呈现**三大趋势**：(1) **结构化文档理解**成为焦点，DeepRead 利用文档原生结构（标题、段落边界）提升长文档问答；(2) **Context 检索评估基准**涌现，ContextBench 针对 coding agent 的上下文检索过程进行细粒度评估，CL-bench 则测试模型从复杂上下文中学习新知识的能力；(3) **长上下文推理效率**持续优化，LycheeDecode 通过混合头稀疏解码在 128K 上下文实现 2.7 倍加速。Bifrost 则探索了无需训练的上下文自适应方法。

---

```
[12] DeepRead: Document Structure-Aware Reasoning to Enhance Agentic Search
作者：Zhanli Li, Huiwen Tian, Lvzhou Luo et al. | 第一单位：中国科学院等
链接：https://arxiv.org/abs/2602.05014

简单介绍：针对现有 agentic 搜索将长文档视为扁平 chunk 集合、未充分利用文档层级结构和顺序话语结构的问题，提出 DeepRead，通过 LLM-based OCR 将 PDF 转为保留结构的 Markdown，引入坐标式元数据和 Retrieve/ReadSection 工具，实现类似人类的"定位-阅读"行为范式。
```
<details><summary>详细总结</summary>

**相关工作**：
- **Agentic RAG 演进**：从一次性被动检索向多轮决策驱动证据获取演进
- **文档处理局限**：现有框架将长文档视为扁平 chunk 集合
- **本工作差异**：显式利用文档原生先验（层级组织、顺序话语结构）

**创新点**：
1. **LLM-based OCR 转换**：将 PDF 转为保留标题和段落边界的结构化 Markdown
2. **坐标式元数据**：为每个段落分配编码章节身份和章节内顺序的坐标式元数据键
3. **双工具设计**：
   - **Retrieve 工具**：定位相关段落并暴露其结构坐标（带轻量级扫描上下文）
   - **ReadSection 工具**：在指定章节和段落范围内进行连续、保序阅读
4. **"定位-阅读"范式**：类似人类的文档阅读理解行为

**效果**：
- **显著提升**：在文档问答中显著优于 Search-o1 风格的 agentic 搜索
- **工具协同效应**：检索和阅读工具之间的协同效应得到验证
- **细粒度行为分析**：揭示类似人类的"定位-阅读"行为模式

</details>

---

```
[13] ContextBench: A Benchmark for Context Retrieval in Coding Agents
作者：Han Li, Letian Zhu, Bohan Zhang et al. | 第一单位：未明确
链接：https://arxiv.org/abs/2602.05892

简单介绍：现有 coding agent 评估主要关注最终任务成功，缺乏对上下文检索过程的洞察。ContextBench 是面向 coding agent 上下文检索的过程导向评估基准，包含 1,136 个 issue-resolution 任务和人工标注的 gold contexts，测量上下文召回率、精确率和效率，揭示 agent scaffolding 在上下文检索中仅带来边际提升（"The Bitter Lesson"）。
```
<details><summary>详细总结</summary>

**相关工作**：
- **End-to-End 评估局限**：现有评估关注最终成功率，忽略中间过程
- **Context 检索黑盒**：缺乏对 agent 如何检索和使用代码上下文的洞察
- **本工作差异**：过程导向评估，追踪 agent 轨迹并测量中间指标

**创新点**：
1. **大规模数据集**：
   - 1,136 个 issue-resolution 任务
   - 来自 66 个 repositories，覆盖 8 种编程语言
   - 人工标注的 gold contexts
2. **自动化评估框架**：
   - 追踪 agent 轨迹
   - 测量上下文召回率、精确率和效率
3. **过程导向指标**：提供中间 gold-context 指标，解构 issue-resolution 过程
4. **细粒度分析**：揭示探索和利用上下文之间的差距

**核心发现**：
- **Bitter Lesson**：复杂的 agent scaffolding 在上下文检索中仅带来边际提升
- **Recall > Precision**：LLMs 一致偏好召回而非精确
- **探索-利用差距**：探索的上下文与利用的上下文之间存在显著差距

**代码：** https://cioutn.github.io/context-bench/

</details>

---

```
[14] LycheeDecode: Accelerating Long-Context LLM Inference via Hybrid-Head Sparse Decoding
作者：Gang Lin, Dongfang Li, Zhuoen Chen et al. | 第一单位：未明确
链接：https://arxiv.org/abs/2602.04541

简单介绍：针对长上下文 LLM 推理中 KV cache 快速扩展导致的内存和延迟瓶颈，提出 LycheeDecode，通过细粒度混合头注意力机制和硬件高效的 top-k 选择策略，将注意力头分为检索头和稀疏头，在 128K 上下文长度实现 2.7 倍加速，生成质量匹敌甚至超越全注意力基线。
```
<details><summary>详细总结</summary>

**相关工作**：
- **KV Cache 瓶颈**：长上下文推理中 KV cache 快速扩展
- **粗粒度共享局限**：跨层共享同一组关键 token 忽视注意力头的功能多样性
- **本工作差异**：细粒度混合头注意力，保留注意力头的功能多样性

**创新点**：
1. **HardKuma-based 机制**：
   - 将注意力头分为检索头（动态识别关键 token）和稀疏头（复用关键 token）
2. **硬件高效的 top-k 选择策略**：确保高效计算
3. **细粒度策略**：克服现有粗粒度方法的性能瓶颈
4. **功能多样性保留**：不同注意力头承担不同功能角色

**效果**：
- **生成质量**：在 Llama3 和 Qwen3 上，生成质量匹敌甚至超越全注意力基线
- **显著加速**：在 128K 上下文长度实现 2.7 倍加速
- **多基准验证**：在 LongBench、RULER（长上下文理解）和 AIME24、OlympiadBench（复杂推理）上验证

**会议：** ICLR 2026

</details>

---

```
[15] Bifrost: Steering Strategic Trajectories to Bridge Contextual Gaps for Self-Improving Agents
作者：Quan M. Tran, Zhuo Huang, Wenbin Zhang et al. | 第一单位：未明确
链接：https://arxiv.org/abs/2602.05810

简单介绍：针对自改进 agent 在跨任务复用轨迹时的上下文不匹配问题，提出 Bifrost，利用上下文差异精确引导历史轨迹适应目标任务。发现上下文-轨迹相关性（上下文偏移与轨迹偏移高度平行），在表示层面使用 agent hidden states 进行轨迹自适应，无需训练即可实现有效复用。
```
<details><summary>详细总结</summary>

**相关工作**：
- **轨迹复用挑战**：跨任务时存在上下文不匹配
- **现有方法局限**：要么丢弃轨迹，要么使用启发式操作，导致微调成本高或性能无保证
- **本工作差异**：无需训练，利用上下文差异进行精确的轨迹自适应

**创新点**：
1. **上下文-轨迹相关性发现**：上下文偏移与轨迹偏移高度平行
2. **BrIdge contextual gap FoR imprOvised trajectory STeering (Bifrost)**：
   - 利用上下文差异精确引导历史轨迹适应目标任务
   - 缓解上下文偏移导致的错位
3. **表示层面自适应**：
   - 使用 agent hidden states 进行轨迹自适应
   - 在共享空间中准确对齐目标上下文
4. **无需训练**：training-free 方法

**效果**：
- **一致超越**：在多个基准上一致超越现有轨迹复用和微调自改进方法
- **有效复用**：即使存在显著上下文偏移，agent 也能有效利用过去经验

</details>

---

```
[16] CL-bench: A Benchmark for Context Learning
作者：Shihan Dou, Ming Zhang, Zhangyue Yin et al. | 第一单位：复旦大学等
链接：https://arxiv.org/abs/2602.03587

简单介绍：现有 LMs 主要利用预训练知识进行推理，但现实世界任务更复杂且依赖上下文：模型必须从任务特定上下文中学习并利用预训练之外的新知识。CL-bench 是首个 context learning 基准，包含 500 个复杂上下文、1,899 个任务，要求模型学习新领域知识、规则系统、复杂流程和经验数据导出的规律，揭示前沿模型平均仅解决 17.2% 的任务。
```
<details><summary>详细总结</summary>

**相关工作**：
- **预训练知识局限**：现有 LMs 主要依赖预训练知识
- **Context Learning 缺失**：从上下文中学习并利用新知识的 capability 被 largely overlooked
- **长上下文 vs Context Learning**：长上下文任务主要测试检索或阅读理解，in-context learning 主要学习简单任务模式

**创新点**：
1. **真实世界基准**：
   - 500 个复杂上下文
   - 1,899 个任务
   - 31,607 个验证标准
   - 由经验丰富的领域专家精心制作
2. **多样化学习内容**：
   - 新领域特定知识
   - 规则系统
   - 复杂流程
   - 经验数据导出的规律
3. **超越现有任务**：远超长上下文任务和 in-context learning 任务的复杂度

**核心发现**：
- **模型表现不佳**：10 个前沿 LM 平均仅解决 17.2% 的任务
- **最佳模型局限**：即使 GPT-5.1 也仅解决 23.7%
- **Critical Bottleneck**：Context learning 是处理真实世界复杂上下文依赖任务的关键瓶颈

**意义**：
- **新 capability 评估**：首次系统评估 LMs 的 context learning 能力
- **推动研究**：为构建具有这一基础能力的 LMs 提供评估平台

</details>

---

## 本周综合洞察

### 研究趋势总览

| 主题 | 核心趋势 | 代表论文 |
|------|----------|----------|
| **Agent Memory** | Runtime Query-Aware、跨 Agent 共享、Graph-Based、自进化 | BudgetMem、LTS、Graph Survey、Self-Consolidation |
| **Long-Horizon Agent** | 结构化规划、边缘 scale 探索、归纳能力评估、前瞻推理内化 | Table-as-Search、AgentCPM-Explore、OdysseyArena、ProAct |
| **Context Retrieval** | 结构化文档理解、过程导向评估、长上下文效率优化 | DeepRead、ContextBench、LycheeDecode |

### 关键趋势总结

1. **从被动 Memory 到主动控制**：BudgetMem 和 InfMem 展示了通过 query-aware routing 和 System-2 控制实现显式 memory 管理的新方向

2. **Memory 共享与协作**：Learning to Share 提出并行 agentic 系统中的选择性 memory 共享，多 agent 协作中的信息复用成为热点

3. **边缘 Scale Agent 突破**：AgentCPM-Explore 证明 4B 参数模型通过系统训练可以达到甚至超越大模型的长程探索能力

4. **结构化 Context 理解**：DeepRead 和 Table-as-Search 展示了利用文档/任务结构提升长上下文理解的有效路径

5. **过程导向评估兴起**：ContextBench 和 CL-bench 推动从 end-to-end 成功率向中间过程指标的评估转变

6. **经验积累与持续学习**：Empirical-MCTS 和 Self-Consolidation 探索 agent 通过 memory 实现持续学习和进化的机制

### 技术演进方向
- **Memory**：静态 → 动态/runtime → 主动控制/query-aware
- **Context**：扁平 chunk → 结构化文档 → 层次化表示
- **评估**：End-to-end → 过程导向 → 细粒度中间指标
- **效率**：全注意力 → 稀疏解码 → 混合头机制
- **Scale**：大模型中心 → 边缘 scale 优化 → 效率与能力并重

---

*Generated by EamonBot 🔥 | 2026-02-09*
