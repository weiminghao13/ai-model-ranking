// ============================================================
// 主应用：渲染今日格局 / 排行榜 / 搜索筛选 / 详情弹窗
// ============================================================

const TEXT_MODELS = window.MODEL_DATA.TEXT_MODELS;
const IMAGE_MODELS = window.MODEL_DATA.IMAGE_MODELS;
const HIGHLIGHTS = window.MODEL_DATA.HIGHLIGHTS;

// 维度配置
const DIMS = {
  intel:   { label: '智力',   list: TEXT_MODELS, scoreKey: 'intel' },
  writing: { label: '写作',   list: TEXT_MODELS, scoreKey: 'writing' },
  coding:  { label: '代码',   list: TEXT_MODELS, scoreKey: 'coding' },
  vision:  { label: '多模态', list: TEXT_MODELS, scoreKey: 'vision' },
  image:   { label: '画图',   list: IMAGE_MODELS, scoreKey: 'image' },
};

// 雷达图维度
const RADAR_DIMS_TEXT = [
  { key: 'intel', label: '智力' },
  { key: 'writing', label: '写作' },
  { key: 'coding', label: '代码' },
  { key: 'vision', label: '多模态' },
  { key: 'speed', label: '速度' },
];
const RADAR_DIMS_IMAGE = [
  { key: 'image', label: '画图' },
  { key: 'aesthetics', label: '美学' },
  { key: 'textRender', label: '文字渲染' },
  { key: 'edit', label: '编辑能力' },
  { key: 'speed', label: '速度' },
];

let currentTab = 'intel';
let currentFilter = 'all';
let currentSearch = '';

// ---------- 工具函数 ----------
function fmtCtx(tokens) {
  if (!tokens) return '—';
  if (tokens >= 1_000_000) return (tokens/1_000_000).toFixed(1) + 'M';
  if (tokens >= 1000) return (tokens/1000).toFixed(0) + 'K';
  return tokens + '';
}
function fmtPrice(m) {
  if (m.priceIn != null && m.priceOut != null) return `$${m.priceIn}/$${m.priceOut}`;
  return m.price || '—';
}
function findModel(id) {
  return TEXT_MODELS.find(m => m.id === id) || IMAGE_MODELS.find(m => m.id === id);
}
function regionLabel(m) {
  if (m.region === 'china') return { text: '国内', cls: 'china' };
  return { text: '国外', cls: '' };
}

// ---------- 今日格局 ----------
function renderHighlights() {
  const grid = document.getElementById('highlightGrid');
  grid.innerHTML = HIGHLIGHTS.map(h => {
    const m = findModel(h.modelId);
    if (!m) return '';
    return `
      <div class="hl-card glass" data-id="${m.id}">
        <div class="hl-key">${h.key}</div>
        <div class="hl-model">${m.name}</div>
        <div class="hl-val">${h.sub}</div>
        <div class="hl-desc">${h.desc}</div>
      </div>`;
  }).join('');
  grid.querySelectorAll('.hl-card').forEach(card => {
    card.addEventListener('click', () => openModal(card.dataset.id));
  });
}

// ---------- 排行榜 ----------
function getFilteredList() {
  const dim = DIMS[currentTab];
  let list = dim.list.slice();
  // 筛选
  if (currentFilter === 'china') list = list.filter(m => m.region === 'china');
  if (currentFilter === 'global') list = list.filter(m => m.region === 'global');
  if (currentFilter === 'open') list = list.filter(m => m.open);
  // 搜索
  if (currentSearch) {
    const q = currentSearch.toLowerCase();
    list = list.filter(m => m.name.toLowerCase().includes(q) || m.vendor.toLowerCase().includes(q));
  }
  // 排序
  list.sort((a,b) => (b.scores[dim.scoreKey]||0) - (a.scores[dim.scoreKey]||0));
  return list;
}

function renderTable() {
  const dim = DIMS[currentTab];
  const list = getFilteredList();
  const table = document.getElementById('rankTable');
  const note = document.getElementById('tableNote');

  const isImage = currentTab === 'image';
  const headHtml = `
    <div class="rank-row head">
      <div>#</div><div>模型 / 厂商</div><div style="text-align:right">分数</div>
      <div>${isImage ? '说明' : '能力条'}</div>
      <div style="text-align:right">上下文</div><div style="text-align:right">价格</div>
    </div>`;

  const rows = list.map((m, i) => {
    const rank = i + 1;
    const score = m.scores[dim.scoreKey] || 0;
    const rl = regionLabel(m);
    const tags = [];
    tags.push(`<span class="tag ${rl.cls}">${rl.text}</span>`);
    if (m.open) tags.push(`<span class="tag open">开源</span>`);
    if (m.video) tags.push(`<span class="tag video">▶ 测评</span>`);

    const barW = score + '%';
    const middleCell = isImage
      ? `<div style="font-size:12px;color:var(--text-dim)">${m.tags[0]||''}</div>`
      : `<div class="score-bar-wrap"><div class="score-bar" style="width:${barW}"></div></div>`;

    return `
      <div class="rank-row row-${rank<=3?rank:''}" data-id="${m.id}">
        <div class="rank-num">${rank<=3 ? ['🥇','🥈','🥉'][rank-1] : rank}</div>
        <div class="rank-model">
          <div class="rank-name">${m.name}</div>
          <div class="rank-vendor">${m.vendor}</div>
          <div class="rank-tags">${tags.join('')}</div>
        </div>
        <div class="rank-score">${score}</div>
        ${middleCell}
        <div class="rank-ctx">${fmtCtx(m.context)}</div>
        <div class="rank-price">${fmtPrice(m)}</div>
      </div>`;
  }).join('');

  table.innerHTML = headHtml + rows;
  note.textContent = `共 ${list.length} 个模型 · 按「${dim.label}」分数降序 · 点击任意行查看详情与 B 站测评`;

  table.querySelectorAll('.rank-row[data-id]').forEach(row => {
    row.addEventListener('click', () => openModal(row.dataset.id));
  });
}

// ---------- 详情弹窗 ----------
function openModal(id) {
  const m = findModel(id);
  if (!m) return;
  const isImage = IMAGE_MODELS.find(x => x.id === id);
  const radarDims = isImage ? RADAR_DIMS_IMAGE : RADAR_DIMS_TEXT;
  const rl = regionLabel(m);

  // 视频 iframe
  let videoHtml;
  if (m.video) {
    const url = `https://player.bilibili.com/player.html?bvid=${m.video}&autoplay=0&high_quality=1`;
    videoHtml = `
      <div class="video-box">
        <h4>📺 ${m.videoUP || 'B 站'} 测评 · <a href="https://www.bilibili.com/video/${m.video}" target="_blank" style="color:var(--accent)">${m.video}</a></h4>
        <iframe class="video-frame" src="${url}" allowfullscreen="true"></iframe>
      </div>`;
  } else {
    videoHtml = `<div class="video-box"><h4>📺 测评视频</h4><div class="no-video">暂无该模型的 B 站测评收录<br>去 B 站搜「${m.name} 测评」看看吧</div></div>`;
  }

  // meta
  const metaHtml = `
    <div><span>厂商</span><br><b>${m.vendor}</b></div>
    <div><span>发布</span><br><b>${m.date || '—'}</b></div>
    <div><span>属性</span><br><b>${m.open ? '开源' : '闭源'} · ${rl.text}</b></div>
    <div><span>上下文</span><br><b>${fmtCtx(m.context)}</b></div>
    ${m.priceIn != null ? `<div><span>输入价格</span><br><b>$${m.priceIn}/M</b></div>` : ''}
    ${m.priceOut != null ? `<div><span>输出价格</span><br><b>$${m.priceOut}/M</b></div>` : ''}
    ${m.price ? `<div><span>计费</span><br><b>${m.price}</b></div>` : ''}
  `;

  document.getElementById('modalBody').innerHTML = `
    <div class="modal-title">${m.name}</div>
    <div class="modal-vendor">${m.vendor} · ${m.date || ''}</div>
    <div class="modal-desc">${m.desc || ''}</div>
    <div class="modal-meta">${metaHtml}</div>
    <div class="modal-grid">
      <div><div id="radarChart"></div></div>
      <div>${videoHtml}</div>
    </div>
  `;

  document.getElementById('modalMask').classList.add('show');
  setTimeout(() => Charts.renderRadar(m, radarDims), 50);
}

function closeModal() {
  document.getElementById('modalMask').classList.remove('show');
  document.getElementById('modalBody').innerHTML = '';
}

// ---------- Hero 数字滚动 ----------
function animateStats() {
  document.querySelectorAll('.stat .num').forEach(el => {
    const target = +el.dataset.target;
    const dur = 1200;
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start)/dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1-p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}

// ---------- 事件绑定 ----------
function bindEvents() {
  // Tab
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentTab = tab.dataset.dim;
      renderTable();
    });
  });

  // Filter
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.f;
      renderTable();
    });
  });

  // Search
  document.getElementById('searchBox').addEventListener('input', e => {
    currentSearch = e.target.value.trim();
    renderTable();
  });

  // Modal close
  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('modalMask').addEventListener('click', e => {
    if (e.target.id === 'modalMask') closeModal();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}

// ---------- 启动 ----------
renderHighlights();
renderTable();
bindEvents();
animateStats();
setTimeout(() => Charts.renderScatter(TEXT_MODELS), 100);
