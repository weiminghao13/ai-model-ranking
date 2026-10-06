// ============================================================
// AI 模型数据库
// scores 取值 0-100，为综合公开榜单（LMSYS / 各权威基准 / 鱼皮实测）的参考估值
// video 字段为 B 站 BV 号，点击后内嵌播放测评
// ============================================================

// ---------- 文本大模型（智力 / 写作 / 代码 / 多模态 榜共用） ----------
window.TEXT_MODELS = [
  // ===== 国外头部 =====
  { id:'gpt6-astra', name:'GPT-6 Astra', vendor:'OpenAI', region:'global', open:false,
    date:'2026-09', context:1_100_000, priceIn:5, priceOut:15,
    scores:{ intel:98, writing:95, coding:96, vision:94, speed:70 },
    video:'BV1eCe36GELv', videoUP:'程序员鱼皮',
    tags:['最新发布','百万记性'], desc:'当前全球综合智力第一，推理、代码、多模态全能选手。' },

  { id:'claude-fable-51', name:'Claude Fable 5.1', vendor:'Anthropic', region:'global', open:false,
    date:'2026-08', context:1_000_000, priceIn:5, priceOut:25,
    scores:{ intel:97, writing:97, coding:98, vision:93, speed:72 },
    video:'BV1p7V36qE45', videoUP:'程序员鱼皮',
    tags:['编程第一','百万记性'], desc:'7 个第三方编程榜平均排名最高，长代码任务之王。' },

  { id:'gpt6-sol', name:'GPT-6 Sol', vendor:'OpenAI', region:'global', open:false,
    date:'2026-09', context:1_000_000, priceIn:3, priceOut:12,
    scores:{ intel:95, writing:94, coding:93, vision:92, speed:80 },
    tags:['性价比'], desc:'继承 GPT-6 Astra 大部分能力，价格更亲民。' },

  { id:'claude-opus-55', name:'Claude Opus 5.5', vendor:'Anthropic', region:'global', open:false,
    date:'2026-09', context:1_000_000, priceIn:5, priceOut:20,
    scores:{ intel:94, writing:96, coding:95, vision:90, speed:68 },
    tags:['写作强'], desc:'主打复杂全栈项目与高质量长文，成本比上代 Opus 低 40%。' },

  { id:'gemini-38-flash', name:'Gemini 3.8 Flash', vendor:'Google', region:'global', open:false,
    date:'2026-09', context:1_000_000, priceIn:0.3, priceOut:3.8,
    scores:{ intel:90, writing:88, coding:87, vision:95, speed:95 },
    tags:['百万记性','快'], desc:'速度极快、会看图，性价比高，适合大规模调用。' },

  { id:'gemini-37-pro', name:'Gemini 3.7 Pro', vendor:'Google', region:'global', open:false,
    date:'2026-07', context:2_000_000, priceIn:2, priceOut:12,
    scores:{ intel:93, writing:90, coding:90, vision:96, speed:75 },
    tags:['多模态强','超长上下文'], desc:'多模态理解天花板之一，2M 上下文，适合处理长文档+图片。' },

  { id:'grok-46', name:'Grok 4.6', vendor:'xAI', region:'global', open:false,
    date:'2026-08', context:500_000, priceIn:3, priceOut:15,
    scores:{ intel:89, writing:86, coding:85, vision:88, speed:82 },
    tags:['会看图'], desc:'风格犀利、实时信息强，适合追热点类问答。' },

  { id:'gpt55', name:'GPT-5.5', vendor:'OpenAI', region:'global', open:false,
    date:'2026-05', context:400_000, priceIn:1.25, priceOut:10,
    scores:{ intel:92, writing:92, coding:91, vision:89, speed:85 },
    video:'BV1p7V36qE45', videoUP:'程序员鱼皮',
    tags:['稳妥'], desc:'普通人首推，稳定省心、少封号，律师都用它处理 Word/Excel。' },

  { id:'claude-opus-48', name:'Claude Opus 4.8', vendor:'Anthropic', region:'global', open:false,
    date:'2026-05', context:1_000_000, priceIn:15, priceOut:75,
    scores:{ intel:93, writing:95, coding:94, vision:88, speed:65 },
    video:'BV1p7V36qE45', videoUP:'程序员鱼皮',
    tags:['写作强','偏贵'], desc:'能力强但门槛高、易封号，桌面端体验一般。' },

  // ===== 国内头部 =====
  { id:'kimi-k3', name:'Kimi K3', vendor:'月之暗面', region:'china', open:true,
    date:'2026-07', context:1_000_000, priceIn:0.6, priceOut:15,
    scores:{ intel:91, writing:92, coding:92, vision:90, speed:80 },
    tags:['国内最强','开源第一','百万记性'], desc:'全球首个 3T 级开源模型，国内综合智力第一，前端设计惊艳。' },

  { id:'deepseek-v4-pro', name:'DeepSeek V4 Pro 0813', vendor:'深度求索', region:'china', open:true,
    date:'2026-08', context:1_000_000, priceIn:0.3, priceOut:4,
    scores:{ intel:90, writing:88, coding:93, vision:85, speed:78 },
    video:'BV1NXgs6gEeZ', videoUP:'程序员鱼皮',
    tags:['编程好手','百万记性','开源'], desc:'跑分只差 Claude 0.1 分，国产编程王牌，API 极便宜。' },

  { id:'glm-53', name:'GLM-5.3', vendor:'智谱', region:'china', open:true,
    date:'2026-08', context:1_000_000, priceIn:0.5, priceOut:4.4,
    scores:{ intel:88, writing:89, coding:91, vision:86, speed:85 },
    video:'BV1VkgK6NEZS', videoUP:'程序员鱼皮',
    tags:['开源','编程强','便宜'], desc:'开源模型里最会写代码的之一，鱼皮实战综合表现最佳。' },

  { id:'qwen38-27b', name:'Qwen3.8 27B', vendor:'阿里通义', region:'china', open:true,
    date:'2026-08', context:256_000, priceIn:0.5, priceOut:2.5,
    scores:{ intel:86, writing:87, coding:88, vision:87, speed:88 },
    tags:['开源','快'], desc:'国产开源全能小钢炮，本地部署友好。' },

  { id:'minimax-m3', name:'MiniMax-M3', vendor:'MiniMax', region:'china', open:true,
    date:'2026-05', context:1_000_000, priceIn:0.2, priceOut:1.2,
    scores:{ intel:85, writing:90, coding:86, vision:84, speed:82 },
    tags:['开源','百万记性','写作好'], desc:'长文写作和 Agent 能力突出，价格白菜。' },

  { id:'deepseek-v4-flash', name:'DeepSeek V4 Flash 0731', vendor:'深度求索', region:'china', open:true,
    date:'2026-07', context:128_000, priceIn:0.1, priceOut:0.28,
    scores:{ intel:84, writing:82, coding:85, vision:80, speed:95 },
    video:'BV1NXgs6gEeZ', videoUP:'程序员鱼皮',
    tags:['最划算','便宜'], desc:'智力全球 #31，价格远低于同级，日常首选。' },

  { id:'seed21-pro', name:'Seed 2.1 Pro（豆包）', vendor:'字节豆包', region:'china', open:false,
    date:'2026-06', context:256_000, priceIn:0.8, priceOut:2,
    scores:{ intel:85, writing:88, coding:82, vision:89, speed:90 },
    tags:['会看图','中文好'], desc:'字节旗舰，中文创作和多模态体验顺滑。' },

  { id:'step5', name:'Step 5 Preview', vendor:'阶跃星辰', region:'china', open:false,
    date:'2026-09', context:1_000_000, priceIn:0.8, priceOut:2.7,
    scores:{ intel:83, writing:85, coding:80, vision:86, speed:80 },
    tags:['最新发布','百万记性'], desc:'刚发布的国产新旗舰，多模态全能方向。' },

  { id:'ernie45', name:'Ernie 4.5 VL', vendor:'百度文心', region:'china', open:true,
    date:'2025-06', context:128_000, priceIn:0.6, priceOut:1.3,
    scores:{ intel:80, writing:84, coding:76, vision:83, speed:80 },
    tags:['会看图'], desc:'百度老牌旗舰，中文知识问答扎实。' },

  { id:'longcat2', name:'LongCat-2.0', vendor:'美团龙猫', region:'china', open:false,
    date:'2026-06', context:1_000_000, priceIn:0.6, priceOut:3,
    scores:{ intel:78, writing:80, coding:82, vision:75, speed:78 },
    tags:['百万记性','会深思'], desc:'美团出品，长上下文推理场景。' },

  { id:'mimo-v25', name:'MiMo-V2.5-Pro', vendor:'小米', region:'china', open:true,
    date:'2026-06', context:1_000_000, priceIn:0.5, priceOut:2.6,
    scores:{ intel:79, writing:80, coding:81, vision:76, speed:82 },
    tags:['开源','百万记性'], desc:'小米开源推理模型，端侧+云端双形态。' },

  { id:'hy4', name:'混元 Hy4 Preview', vendor:'腾讯混元', region:'china', open:false,
    date:'2026-06', context:128_000, priceIn:0.1, priceOut:0.29,
    scores:{ intel:77, writing:80, coding:76, vision:78, speed:85 },
    tags:['便宜'], desc:'腾讯新版混元，微信生态深度集成。' },

  { id:'kat-coder', name:'KAT Coder PRO V2.5', vendor:'快手', region:'china', open:false,
    date:'2026-07', context:64_000, priceIn:0.6, priceOut:3,
    scores:{ intel:75, writing:76, coding:83, vision:70, speed:80 },
    tags:['垂直编程'], desc:'快手专攻代码场景的模型。' },

  { id:'ling3-flash', name:'Ling 3.0 Flash VL', vendor:'蚂蚁百灵', region:'china', open:false,
    date:'2026-09', context:131_000, priceIn:0.05, priceOut:0.18,
    scores:{ intel:74, writing:76, coding:72, vision:80, speed:95 },
    tags:['白菜价','会看图','最新'], desc:'蚂蚁新出的超便宜视觉小模型。' },

  // ===== 国外二线 =====
  { id:'llama4-scout', name:'Llama 4 Scout 17B', vendor:'Meta', region:'global', open:true,
    date:'2025-04', context:10_000_000, priceIn:0.05, priceOut:0.3,
    scores:{ intel:80, writing:78, coding:76, vision:80, speed:88 },
    tags:['开源','最长上下文'], desc:'10M 超长上下文，一次能读完一整套书。' },

  { id:'muse-spark-13', name:'Muse Spark 1.3', vendor:'Meta', region:'global', open:false,
    date:'2026-09', context:1_000_000, priceIn:0.8, priceOut:4.3,
    scores:{ intel:82, writing:83, coding:84, vision:82, speed:80 },
    tags:['百万记性','新发布'], desc:'Meta 新旗舰，多模态方向发力。' },

  { id:'mistral-medium-35', name:'Mistral Medium 3.5', vendor:'Mistral', region:'global', open:true,
    date:'2026-04', context:262_000, priceIn:0.4, priceOut:7.5,
    scores:{ intel:81, writing:82, coding:80, vision:75, speed:85 },
    tags:['开源','欧洲代表'], desc:'欧洲 AI 代表，开源生态成熟。' },

  { id:'ministral-3b', name:'Ministral 3B', vendor:'Mistral', region:'global', open:true,
    date:'2026-03', context:128_000, priceIn:0.02, priceOut:0.04,
    scores:{ intel:60, writing:62, coding:58, vision:55, speed:98 },
    tags:['最便宜','端侧'], desc:'有评测成绩的模型里输出最便宜，可跑在手机上。' },

  { id:'nemotron-3u', name:'Nemotron 3 Ultra 550B', vendor:'NVIDIA', region:'global', open:true,
    date:'2026-06', context:1_000_000, priceIn:0.5, priceOut:2.5,
    scores:{ intel:84, writing:80, coding:82, vision:78, speed:70 },
    tags:['开源','百万记性'], desc:'英伟达开源大力出奇迹。' },

  { id:'mai-code-11', name:'MAI-Code-1.1-Flash', vendor:'微软', region:'global', open:false,
    date:'2026-08', context:256_000, priceIn:0.2, priceOut:1.2,
    scores:{ intel:76, writing:74, coding:84, vision:70, speed:90 },
    tags:['代码专用','快'], desc:'微软专攻代码的小钢炮。' },

  { id:'command-a-plus', name:'Command A Plus', vendor:'Cohere', region:'global', open:true,
    date:'2026-05', context:128_000, priceIn:2, priceOut:10,
    scores:{ intel:78, writing:79, coding:76, vision:72, speed:75 },
    tags:['开源','企业级'], desc:'RAG 和企业检索场景老牌强者。' },

  { id:'sonar-pro', name:'Sonar PRO Search', vendor:'Perplexity', region:'global', open:false,
    date:'2025-10', context:200_000, priceIn:3, priceOut:15,
    scores:{ intel:80, writing:82, coding:70, vision:78, speed:75 },
    tags:['联网搜索'], desc:'深度联网搜索+引用，做调研一绝。' },

  { id:'nova-2-lite', name:'Nova Premier V1', vendor:'亚马逊', region:'global', open:false,
    date:'2025-10', context:1_000_000, priceIn:4, priceOut:13,
    scores:{ intel:78, writing:80, coding:74, vision:82, speed:78 },
    tags:['百万记性','AWS生态'], desc:'亚马逊 Titan 系列，AWS 用户顺手。' },

  { id:'fugu-ultra-v2', name:'Fugu Ultra V2', vendor:'Sakana AI', region:'global', open:false,
    date:'2026-09', context:1_000_000, priceIn:10, priceOut:30,
    scores:{ intel:82, writing:80, coding:78, vision:80, speed:65 },
    tags:['天价','新发布','百万记性'], desc:'日本 Sakana 新旗舰，贵但新颖。' },

  { id:'mercury-25', name:'Mercury 2.5', vendor:'Inception', region:'global', open:false,
    date:'2026-09', context:262_000, priceIn:0.05, priceOut:0.15,
    scores:{ intel:72, writing:74, coding:70, vision:70, speed:92 },
    tags:['白菜价','新发布'], desc:'便宜量大，适合做高频小任务。' },

  { id:'granite-42', name:'Granite 4.2 8B', vendor:'IBM', region:'global', open:true,
    date:'2026-08', context:131_000, priceIn:0.08, priceOut:0.25,
    scores:{ intel:65, writing:66, coding:64, vision:60, speed:95 },
    tags:['开源','企业合规'], desc:'IBM 企业级开源，合规敏感场景友好。' },

  { id:'solar-pro-4', name:'Solar Pro 4', vendor:'Upstage', region:'global', open:false,
    date:'2026-08', context:524_000, priceIn:0.3, priceOut:1.2,
    scores:{ intel:76, writing:78, coding:74, vision:72, speed:85 },
    tags:['韩文强'], desc:'韩国 Upstage，长文理解不错。' },

  { id:'reka-edge', name:'Reka Edge', vendor:'Reka AI', region:'global', open:false,
    date:'2026-03', context:128_000, priceIn:0.03, priceOut:0.1,
    scores:{ intel:62, writing:64, coding:60, vision:75, speed:95 },
    tags:['白菜价','会看图'], desc:'小而便宜的视觉模型。' },

  { id:'hermes-4', name:'Hermes 4 405B', vendor:'Nous Research', region:'global', open:true,
    date:'2026-07', context:128_000, priceIn:0.5, priceOut:3,
    scores:{ intel:75, writing:78, coding:72, vision:65, speed:75 },
    tags:['开源','角色扮演强'], desc:'开源社区微调标杆，创意写作有趣。' },

  { id:'gemma4-27b', name:'Gemma-SEA-LION-v4', vendor:'AI Singapore', region:'global', open:true,
    date:'2025-09', context:128_000, priceIn:0.15, priceOut:0.56,
    scores:{ intel:68, writing:70, coding:64, vision:60, speed:90 },
    tags:['开源','东南亚语言'], desc:'东南亚多语言优化版 Gemma。' },

  { id:'palmyra-x5', name:'Palmyra X5', vendor:'Writer', region:'global', open:false,
    date:'2026-04', context:1_000_000, priceIn:1.5, priceOut:6,
    scores:{ intel:74, writing:85, coding:65, vision:78, speed:75 },
    tags:['企业写作','百万记性'], desc:'Writer 公司主打企业长文档写作。' },

  { id:'trinity-large', name:'Trinity Large Thinking', vendor:'Arcee AI', region:'global', open:true,
    date:'2026-07', context:128_000, priceIn:0.2, priceOut:0.8,
    scores:{ intel:70, writing:72, coding:68, vision:60, speed:82 },
    tags:['开源','会深思'], desc:'侧重推理思考的开源模型。' },

  { id:'jamba-mini', name:'Jamba Mini', vendor:'AI21', region:'global', open:true,
    date:'2025-10', context:256_000, priceIn:0.1, priceOut:0.4,
    scores:{ intel:72, writing:74, coding:68, vision:65, speed:88 },
    tags:['开源','长上下文'], desc:'AI21 混合架构，长文便宜。' },

  { id:'apertus-70b', name:'Apertus 70B', vendor:'Swiss AI', region:'global', open:true,
    date:'2025-09', context:128_000, priceIn:0.5, priceOut:2.2,
    scores:{ intel:73, writing:74, coding:70, vision:65, speed:80 },
    tags:['开源','欧洲'], desc:'瑞士国家级开源模型。' },

  { id:'morph-v3', name:'Morph V3 Large', vendor:'Morph', region:'global', open:false,
    date:'2026-05', context:256_000, priceIn:0.5, priceOut:1.9,
    scores:{ intel:71, writing:73, coding:68, vision:65, speed:82 },
    tags:['长文'], desc:'长文理解优化。' },

  { id:'ornith-15', name:'Ornith 1.5 35B', vendor:'Deep Reinforce', region:'global', open:true,
    date:'2026-08', context:262_000, priceIn:0.1, priceOut:0.4,
    scores:{ intel:70, writing:72, coding:68, vision:72, speed:85 },
    tags:['开源','会看图'], desc:'新出的开源视觉小模型。' },

  { id:'laguna-s', name:'Laguna S 2.1', vendor:'Poolside', region:'global', open:true,
    date:'2026-07', context:1_000_000, priceIn:0.05, priceOut:0.18,
    scores:{ intel:68, writing:66, coding:78, vision:60, speed:85 },
    tags:['开源','代码','百万记性'], desc:'Poolside 专攻代码的开源模型。' },

  { id:'minicpm5', name:'MiniCPM5-2B', vendor:'面壁智能', region:'china', open:true,
    date:'2026-09', context:32_000, priceIn:0.2, priceOut:0.74,
    scores:{ intel:60, writing:62, coding:58, vision:70, speed:98 },
    tags:['开源','端侧','新发布'], desc:'面壁端侧小模型，手机就能跑。' },

  { id:'aion-3', name:'Aion 3.0', vendor:'aion-labs', region:'global', open:false,
    date:'2026-07', context:128_000, priceIn:1.5, priceOut:6,
    scores:{ intel:70, writing:72, coding:68, vision:65, speed:78 },
    tags:[], desc:'新锐实验室模型。' },

  { id:'sarvam-30b', name:'Sarvam 30B', vendor:'Sarvam AI', region:'global', open:true,
    date:'2026-02', context:64_000, priceIn:0.03, priceOut:0.1,
    scores:{ intel:62, writing:65, coding:58, vision:55, speed:90 },
    tags:['开源','印度语言'], desc:'印度多语言开源模型。' },

  { id:'vision-large', name:'Vision Large', vendor:'vispark', region:'global', open:false,
    date:'2024-05', context:1_000_000, priceIn:5, priceOut:22,
    scores:{ intel:70, writing:68, coding:60, vision:90, speed:70 },
    tags:['百万记性','多模态老旗舰'], desc:'早期多模态代表，能看图能听声。' },
];

// ---------- 文生图 / 图像生成模型（画图榜专用） ----------
window.IMAGE_MODELS = [
  { id:'mj-v7', name:'Midjourney V7', vendor:'Midjourney', region:'global', open:false,
    date:'2025-11', price:'$30/月起',
    scores:{ image:97, aesthetics:99, textRender:40, edit:60, speed:65 },
    tags:['艺术感天花板','订阅制'], desc:'电影感、光影、风格一致性无可匹敌，设计师首选。' },

  { id:'gpt-image-25', name:'GPT Image 2.5 Flare', vendor:'OpenAI', region:'global', open:false,
    date:'2026-09', price:'$10/M',
    scores:{ image:95, aesthetics:88, textRender:98, edit:92, speed:80 },
    tags:['文字渲染最强','可编辑'], desc:'图里要写中文/英文标题、做电商海报的第一选择。' },

  { id:'seedream-5', name:'Seedream 5.0（即梦）', vendor:'字节豆包', region:'china', open:false,
    date:'2026-07', price:'¥0.6/张',
    scores:{ image:94, aesthetics:92, textRender:85, edit:85, speed:88 },
    tags:['国产第一梯队','人像强'], desc:'真实人像质感已追平 MJ，中文社交审美最懂。' },

  { id:'nano-banana-2', name:'Nano Banana 2 (Imagen)', vendor:'Google', region:'global', open:false,
    date:'2026-04', price:'$0.04/张',
    scores:{ image:93, aesthetics:90, textRender:85, edit:90, speed:85 },
    tags:['角色一致性','多参考图'], desc:'多参考图保持角色一致性最强，做连续插画首选。' },

  { id:'kling-img-3', name:'可灵图片 3.0', vendor:'快手', region:'china', open:false,
    date:'2026-07', price:'¥0.5/张',
    scores:{ image:90, aesthetics:88, textRender:82, edit:80, speed:82 },
    tags:['动态场景','写实人像'], desc:'高动态场景和组图风格统一出色。' },

  { id:'flux-kontext', name:'FLUX Kontext Pro', vendor:'Black Forest Labs', region:'global', open:true,
    date:'2026-03', price:'$0.05/张',
    scores:{ image:92, aesthetics:90, textRender:70, edit:95, speed:80 },
    tags:['开源','图片编辑王'], desc:'开源里图片局部编辑能力最强。' },

  { id:'sd35', name:'Stable Diffusion 3.5', vendor:'Stability AI', region:'global', open:true,
    date:'2024-10', price:'开源免费',
    scores:{ image:85, aesthetics:85, textRender:60, edit:80, speed:95 },
    tags:['开源','可本地部署','插件生态'], desc:'本地玩图天花板，ControlNet 生态无敌。' },

  { id:'recraft-v3', name:'Recraft V3', vendor:'Recraft', region:'global', open:false,
    date:'2025-08', price:'$12/月',
    scores:{ image:88, aesthetics:87, textRender:90, edit:88, speed:82 },
    tags:['矢量图','品牌设计'], desc:'一键生成 SVG 矢量图，做 logo 和插图神器。' },

  { id:'ideogram-3', name:'Ideogram 3', vendor:'Ideogram', region:'global', open:false,
    date:'2025-09', price:'$8/月',
    scores:{ image:87, aesthetics:86, textRender:95, edit:75, speed:80 },
    tags:['海报文字'], desc:'做带文字的海报、封面一绝。' },

  { id:'grok-imagine', name:'Grok Imagine Image 2.0', vendor:'xAI', region:'global', open:false,
    date:'2026-09', price:'含 X Premium',
    scores:{ image:86, aesthetics:85, textRender:65, edit:70, speed:85 },
    tags:['风格独特','新发布'], desc:'风格跳出主流模板，适合做差异化视觉。' },

  { id:'dalle-4', name:'DALL-E 4', vendor:'OpenAI', region:'global', open:false,
    date:'2025-09', price:'$0.04/张',
    scores:{ image:85, aesthetics:82, textRender:80, edit:75, speed:85 },
    tags:['老牌'], desc:'GPT 生态默认生图，省心稳定。' },

  { id:'wanxiang-2', name:'通义万相 2.1', vendor:'阿里通义', region:'china', open:false,
    date:'2025-12', price:'¥0.2/张',
    scores:{ image:84, aesthetics:83, textRender:78, edit:75, speed:88 },
    tags:['国产','电商图'], desc:'电商商品图和场景图性价比高。' },

  { id:'wenxin-yige', name:'文心一格 3.0', vendor:'百度', region:'china', open:false,
    date:'2025-08', price:'会员制',
    scores:{ image:80, aesthetics:80, textRender:75, edit:70, speed:82 },
    tags:['中文理解'], desc:'百度出品，中文 prompt 理解接地气。' },

  { id:'cogview-4', name:'CogView 4', vendor:'智谱', region:'china', open:true,
    date:'2025-06', price:'开源免费',
    scores:{ image:82, aesthetics:80, textRender:78, edit:72, speed:85 },
    tags:['开源','中文'], desc:'智谱开源中文生图模型。' },

  { id:'hypo-x', name:'Hypetext XL', vendor:'Hypothetical', region:'global', open:true,
    date:'2026-02', price:'开源免费',
    scores:{ image:78, aesthetics:76, textRender:85, edit:65, speed:90 },
    tags:['开源','文字图'], desc:'开源模型里文字渲染较突出。' },
];

// ---------- 今日格局亮点 ----------
window.HIGHLIGHTS = [
  { key:'最聪明',     modelId:'gpt6-astra',      sub:'ECI 98',           desc:'206 个受测模型中智力第一' },
  { key:'最会编程',   modelId:'claude-fable-51', sub:'前 2%',            desc:'7 个第三方编程榜平均排名最高' },
  { key:'最划算',     modelId:'deepseek-v4-flash',sub:'$0.28/M',         desc:'智力全球 #31，价格远低于同级' },
  { key:'最便宜',     modelId:'ministral-3b',    sub:'$0.04/M',         desc:'有评测成绩的模型里输出最便宜' },
  { key:'记性最好',   modelId:'llama4-scout',    sub:'10M tokens',       desc:'上下文窗口，一次能读进去的字数' },
  { key:'国内最强',   modelId:'kimi-k3',         sub:'全球 #11',         desc:'国内第一，开源第一' },
  { key:'写作最强',   modelId:'claude-opus-48',  sub:'写作 95',          desc:'长文、公文、小说综合最稳' },
  { key:'画图最强',   modelId:'mj-v7',           sub:'美学 99',          desc:'艺术感和电影感天花板' },
];

// 暴露到全局
window.MODEL_DATA = { TEXT_MODELS: window.TEXT_MODELS, IMAGE_MODELS: window.IMAGE_MODELS, HIGHLIGHTS: window.HIGHLIGHTS };
