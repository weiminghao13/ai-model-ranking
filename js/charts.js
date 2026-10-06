// ============================================================
// ECharts 渲染：模型雷达图 + 性价比散点图
// ============================================================

const Charts = {
  radarChart: null,
  scatterChart: null,

  // 模型详情弹窗里的雷达图
  renderRadar(model, dims) {
    const el = document.getElementById('radarChart');
    if (!el) return;
    if (!this.radarChart) this.radarChart = echarts.init(el);

    const indicators = dims.map(d => ({ name: d.label, max: 100 }));
    const values = dims.map(d => model.scores[d.key] ?? 0);

    this.radarChart.setOption({
      backgroundColor: 'transparent',
      tooltip: {},
      radar: {
        indicator: indicators,
        shape: 'polygon',
        splitNumber: 4,
        axisName: { color: '#8b95a7', fontSize: 12 },
        splitArea: { areaStyle: { color: ['rgba(255,255,255,0.02)','rgba(255,255,255,0.04)'] } },
        splitLine: { lineStyle: { color: 'rgba(255,255,255,0.08)' } },
        axisLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } },
      },
      series: [{
        type: 'radar',
        data: [{
          value: values,
          name: model.name,
          areaStyle: { color: 'rgba(110,168,255,0.35)' },
          lineStyle: { color: '#6ea8ff', width: 2 },
          itemStyle: { color: '#6ea8ff' },
        }]
      }]
    }, true);
  },

  // 性价比散点图：X=每百万输出价格, Y=智力分数, 气泡大小=上下文
  renderScatter(textModels) {
    const el = document.getElementById('scatterChart');
    if (!el) return;
    if (!this.scatterChart) this.scatterChart = echarts.init(el);

    const data = textModels
      .filter(m => m.priceOut && m.scores.intel >= 60)
      .map(m => ({
        name: m.name,
        value: [m.priceOut, m.scores.intel, Math.log10(m.context || 10000) * 20, m.vendor, m.region],
        itemStyle: { color: m.region === 'china' ? '#ff6b6b' : '#6ea8ff' }
      }));

    this.scatterChart.setOption({
      backgroundColor: 'transparent',
      tooltip: {
        formatter: p => `<b>${p.data.name}</b><br/>厂商：${p.data.value[3]}<br/>输出价格：$${p.data.value[0]}/M<br/>智力：${p.data.value[1]}<br/>上下文：${fmtCtx(p.data.value[2])}`
      },
      grid: { left: 60, right: 30, top: 30, bottom: 50 },
      xAxis: {
        name: '输出价格 $/M tokens（对数）',
        nameLocation: 'middle', nameGap: 30,
        type: 'log',
        axisLabel: { color: '#8b95a7' },
        axisLine: { lineStyle: { color: 'rgba(255,255,255,0.15)' } },
        splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } },
      },
      yAxis: {
        name: '智力分数',
        type: 'value', min: 55, max: 100,
        axisLabel: { color: '#8b95a7' },
        axisLine: { lineStyle: { color: 'rgba(255,255,255,0.15)' } },
        splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } },
      },
      series: [{
        type: 'scatter',
        symbolSize: d => d[2],
        data: data,
        emphasis: { scale: 1.3 },
        label: {
          show: true, position: 'top', color: '#e8ecf4', fontSize: 10,
          formatter: p => p.data.name.length > 12 ? p.data.name.slice(0,11)+'…' : p.data.name
        }
      }]
    }, true);
  }
};

// 辅助：把气泡大小反推回上下文文本（仅用于 tooltip 估算）
function fmtCtx(bubbleSize) {
  // bubbleSize = log10(context)*20，逆推
  const logVal = bubbleSize / 20;
  const ctx = Math.pow(10, logVal);
  if (ctx >= 1_000_000) return (ctx/1_000_000).toFixed(1) + 'M';
  if (ctx >= 1000) return (ctx/1000).toFixed(0) + 'K';
  return ctx + '';
}

window.addEventListener('resize', () => {
  Charts.radarChart && Charts.radarChart.resize();
  Charts.scatterChart && Charts.scatterChart.resize();
});
