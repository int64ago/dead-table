const tpl = `
<ui.button title="显示全部" type="primary" />
<div class="u-fontsize">调整字号：<number.input value={fontSize} /></div>
<div style="overflow-x: auto">
<table class="m-table m-table-striped m-table-hover" style="font-size: {fontSize}px">
    <thead>
        <tr>
        {#list headers as header}
        {#if header.children}
        <th colspan={header.children.length} style="width: {fontSize * header.width}px">{header.name}</th>
        {#else}
        <th rowspan="2" style="width: {fontSize * header.width}px">{header.name}</th>
        {/if}
        {/list}
        </tr>
        <tr>
        {#list headers as header}
        {#list header.children || [] as _header}
        <th style="width: {fontSize * _header.width}px">{_header.name}</th>
        {/list}
        {/list}
        </tr>
    </thead>
    <tbody>
        {#list 1..10 as col}
        <tr>
        {#list list as item}
        <td style="width: {fontSize * item.width}px">{item.name}</td>
        {/list}
        </tr>
        {/list}
    </tbody>
</table>
</div>
`

const headers = [
  { name: '表格标啊题1' },
  { name: '分组标啊啊啊题2', children: [ { name: '表格标题啊啊啊啊啊2.1' }, { name: '表啊格标题2.2' } ] },
  { name: '表标题3' },
  { name: '表题4' },
  { name: '题5' },
  { name: '表格标的是是对方题6' },
  { name: '表格标啊啊啊题7' },
  { name: '表格标胜多负少题8' },
  { name: '表标题9' },
  { name: '表格撒地方题10' },
  { name: '表格标收到题11' },
  { name: '表格题12' },
  { name: '表格标地方反对题13' },
  { name: '表格题14' },
  { name: '表格标收到题15' },
];

const list = [
  { name: '123' },
  { name: '表格内容手动阀手动阀撒旦飞洒地方' },
  { name: '表格内容' },
  { name: '表格内容水岸东方' },
  { name: '表格内容顺丰' },
  { name: '表格内容啊手动阀手动阀' },
  { name: '表格内容叼叼哒' },
  { name: '表格内容懂点' },
  { name: '表格内容随时' },
  { name: '表格内容啊啊啊手动阀手动阀但是' },
  { name: '表格内容啥地方啥地方啥地方啥地方啥地方啥地方是' },
  { name: '表格' },
  { name: '666' },
  { name: '表格内' },
  { name: '表格水岸东方' },
  { name: '表格内容' },
];

const _headers = [];
for (let x of headers) {
  for (let y of x.children || [x]) {
    _headers.push(y);
  }
}

for (let i = 0; i < list.length; ++i) {
  const width = Math.max((_headers[i].name + '').length, (list[i].name + '').length);
  list[i].width = width;
  _headers[i].width = width;
}

for (let header of headers) {
  if (header.children) {
    header.width = header.children.map(x => x.width).reduce((a, b) => a + b, 0);
  }
}

const App = NEKUI.Component.extend({
  template: tpl,
  config() {
    this.defaults({
      fontSize: 14,
      headers,
      list,
    });
  }
});

new App().$inject('#app');