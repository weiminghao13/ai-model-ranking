# AI 模型风云榜

> 一个纯静态网页，横评当前最热门的 AI 大模型与文生图模型，附 B 站实测测评视频。

## ✨ 功能

- **5 大能力排行榜**：🧠 智力 / ✍️ 写作 / 💻 代码 / 👁️ 多模态 / 🎨 画图，共 65+ 热门模型
- **今日格局**：最聪明、最会编程、最划算、最便宜、记性最好、国内最强、写作最强、画图最强 —— 一眼看完当下 AI 圈格局
- **模型详情弹窗**：6 维雷达图 + 价格 / 上下文 / 发布日期 + B 站测评视频内嵌播放
- **性价比象限散点图**：X 轴价格、Y 轴智力、气泡大小=上下文，一眼看出"又强又便宜"的模型
- **实时搜索 + 筛选**：按模型名 / 厂商搜，按国内 / 国外 / 开源过滤
- **暗色玻璃拟态 UI**：渐变光晕背景、毛玻璃卡片、数字滚动动画

## 🚀 本地运行

无需任何构建工具，只需一个静态服务器：

```bash
cd ai_model_ranking
python -m http.server 8765
```

然后浏览器打开 <http://localhost:8765>。

> 注意：不要直接双击 `index.html` 用 `file://` 打开 —— B 站视频内嵌需要 HTTP 协议。

## 📁 项目结构

```
ai_model_ranking/
├── index.html      # 主页面
├── css/style.css   # 暗色玻璃拟态样式
└── js/
    ├── data.js     # 所有模型数据（想加模型改这里）
    ├── charts.js   # ECharts 雷达图 + 散点图
    └── app.js      # 排行榜 / 搜索 / 弹窗交互
```

## 🛠️ 如何添加新模型

打开 `js/data.js`，照着已有格式在对应数组里加一个对象即可：

```js
{ id:'my-model', name:'My Model', vendor:'某厂', region:'china', open:true,
  date:'2026-10', context:256_000, priceIn:0.5, priceOut:2,
  scores:{ intel:85, writing:86, coding:84, vision:82, speed:85 },
  video:'BVXXXXXXXXXX',  // B 站测评视频 BV 号，没有就删掉这行
  tags:['新发布'],
  desc:'一句话介绍。' },
```

页面会自动把它排进各个榜单。

## 📊 数据说明

- 分数为综合公开榜单（LMSYS Chatbot Arena、各权威基准测试、B站 UP 主实测）的**参考估值**，非精确跑分。
- B 站测评视频版权归原 UP 主所有（优先收录了「程序员鱼皮」等 UP 主的实测视频）。

## 📄 License

MIT
