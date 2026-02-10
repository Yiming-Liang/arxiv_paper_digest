# ArXiv Agent Memory 论文速览 - 2026-02-08

## 论文列表


[1] Learning Query-Aware Budget-Tier Routing for Runtime Agent Memory
作者：Haozhen Zhang et al. | 单位：信息未明确
链接：https://arxiv.org/abs/2602.06025

简单介绍：针对 LLM agent 运行时记忆处理问题，提出 BudgetMem 框架，通过查询感知的预算层级路由实现显式性能-成本控制，包含低/中/高三级预算模块。

<details><summary>详细总结</summary>

**相关工作**：
- 离线记忆构建 vs 运行时记忆利用
- 现有方法缺乏显式性能-成本控制

**创新点**：
1. BudgetMem 框架：结构化记忆处理为三预算层级模块
2. 轻量级路由策略：基于 RL 训练的神经网络策略
3. 三种层级策略：实现、推理、容量

**效果**：
- 在 LoCoMo、LongMemEval 和 HotpotQA 上测试
- 高预算时超越强基线
- 紧预算下更好准确率-成本前沿
</details>
---


[2] Shared LoRA Subspaces for almost Strict Continual Learning
作者：Prakhar Kaushik et al. | 单位：Johns Hopkins University
链接：https://arxiv.org/abs/2602.06043

简单介绍：提出 Share 方法，通过学习单一共享低秩子空间实现高效持续微调，实现 100 倍参数缩减和 281 倍内存节省。

<details><summary>详细总结</summary>

**相关工作**：
- 传统 LoRA 缺乏严格持续学习机制
- 数据回放/多适配器扩展性差

**创新点**：
1. 共享低秩子空间：动态更新机制
2. 正向知识迁移：最小化灾难性干扰
3. 统一模型替代多适配器

**效果**：
- 100 倍参数缩减，281 倍内存节省
- 性能与联合训练相当
- 跨图像分类、NLP、3D 姿态估计验证
</details>
---


[3] DyTopo: Dynamic Topology Routing for Multi-Agent Reasoning
作者：Yuxing Lu et al. | 单位：Southeast University
链接：https://arxiv.org/abs/2602.06039

简单介绍：提出 DyTopo 框架，通过语义匹配动态重建稀疏有向通信图，实现随迭代问题求解阶段自适应调整的通信拓扑。

<details><summary>详细总结</summary>

**相关工作**：
- 固定通信模式难以匹配阶段依赖需求

**创新点**：
1. 动态通信图重建
2. 语义匹配路由
3. 可解释协调追踪

**效果**：
- 代码生成和数学推理基准测试
- 平均超越最强基线 +6.2%
</details>
---


[4] V-Retrver: Evidence-Driven Agentic Reasoning for Universal Multimodal Retrieval
作者：Dongyang Chen et al. | 单位：信息未明确
链接：https://arxiv.org/abs/2602.06034

简单介绍：提出 V-Retrver 框架，将多模态检索重构为基于视觉检查的 agentic 推理过程，实现假设生成与目标视觉验证的交替。

<details><summary>详细总结</summary>

**相关工作**：
- 现有方法依赖静态视觉编码
- 缺乏主动验证视觉证据能力

**创新点**：
1. Agentic 推理框架
2. 多模态交错推理
3. 课程学习策略

**效果**：
- 平均提升 23.0% 检索准确率
- 感知驱动推理可靠性提升
</details>
---


[5] PhysicsAgentABM: Physics-Guided Generative Agent-Based Modeling
作者：Kavana Venkatesh et al. | 单位：University of Virginia
链接：https://arxiv.org/abs/2602.06030

简单介绍：提出 PhysicsAgentABM，通过行为一致性智能体簇进行推理，结合符号先验、神经动态模型和认知融合，实现可扩展且校准的仿真。

<details><summary>详细总结</summary>

**相关工作**：
- LLM 多智能体系统扩展昂贵
- 经典 ABM 难以整合个体信号

**创新点**：
1. 三层推理架构
2. ANCHOR 聚类策略：减少 6-8 倍 LLM 调用
3. 群体级推理解耦

**效果**：
- 公共卫生、金融、社会科学验证
- 事件时间准确性和校准优于基线
</details>
---

*搜索时间：2026-02-08 | 数据来源：ArXiv API*
