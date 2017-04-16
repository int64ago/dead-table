const tpl = `
{#if editing}
<ui.button title="保存设置" action="save" type="error" on-click={this.doSave()} />
{#else}
<ui.button title="个性化设置" action="edit" type="primary" on-click={this.doEdit()} />
{/if}
<div class="u-fontsize">调整字号：<number.input value={fontSize} /></div>
<div style="overflow-x: auto">
<table class="m-table m-table-striped m-table-hover" style="font-size: {fontSize}px">
    <thead>
        <tr>
        {#list _headers as header}
        {#if header.children}
        <th colspan={header.children.length} style="width: {fontSize * header.width}px">{header.name}</th>
        {#else}
        <th rowspan="2" style="width: {fontSize * header.width}px">
        {header.name}
        {#if editing}
        <div class="u-edit {this.isDeleted(header) ? 'red' : 'green'}" on-click={this.toggle(header)}></div>
        {/if}
        </th>
        {/if}
        {/list}
        </tr>
        <tr>
        {#list _headers as header}
        {#list header.children || [] as _header}
        <th style="width: {fontSize * _header.width}px">
        {_header.name}
        {#if editing}
        <div class="u-edit {this.isDeleted(_header) ? 'red' : 'green'}" on-click={this.toggle(_header)}></div>
        {/if}
        </th>
        {/list}
        {/list}
        </tr>
    </thead>
    <tbody>
        {#list 1..10 as col}
        <tr>
        {#list _list as item}
        <td style="width: {fontSize * item.width}px">{item.name}</td>
        {/list}
        </tr>
        {/list}
    </tbody>
</table>
</div>
`

const headers = [
  { index: 1, name: '表格标啊题1' },
  { name: '分组标啊啊啊题2', children: [ { index: 2, name: '表格标题啊啊啊啊啊2.1' }, { index: 3, name: '表啊格标题2.2' } ] },
  { index: 4, name: '表标题3' },
  { index: 5, name: '表题4' },
  { index: 6, name: '题5' },
  { index: 7, name: '表格标的是是对方题6' },
  { index: 8, name: '表格标啊啊啊题7' },
  { index: 9, name: '表格标胜多负少题8' },
  { index: 10, name: '表标题9' },
  { index: 11, name: '表格撒地方题10' },
  { index: 12, name: '表格标收到题11' },
  { index: 13, name: '表格题12' },
  { index: 14, name: '表格标地方反对题13' },
  { index: 15, name: '表格题14' },
  { index: 16, name: '表格标收到题15' },
];

const list = [
  { index: 1, name: '123' },
  { index: 2, name: '表格内容手动阀手动阀撒旦飞洒地方' },
  { index: 3, name: '表格内容' },
  { index: 4, name: '表格内容水岸东方' },
  { index: 5, name: '表格内容顺丰' },
  { index: 6, name: '表格内容啊手动阀手动阀' },
  { index: 7, name: '表格内容叼叼哒' },
  { index: 8, name: '表格内容懂点' },
  { index: 9, name: '表格内容随时' },
  { index: 10, name: '表格内容啊啊啊手动阀手动阀但是' },
  { index: 11, name: '表格内容啥地方啥地方啥地方啥地方啥地方啥地方是' },
  { index: 12, name: '表格' },
  { index: 13, name: '666' },
  { index: 14, name: '表格内' },
  { index: 15, name: '表格水岸东方' },
  { index: 16, name: '表格内容' },
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
      deleted: [4, 5],
      editing: false,
      fontSize: 14,
      headers,
      list,
    });
  },

  computed: {
    _headers: function(data) {
      if (!data.editing) {
        let headers = data.headers.filter(d => !~data.deleted.indexOf(d.index));
        // for (let x of headers) {
        //   if (x.children) {
        //     x.children = x.children.filter(d => !~data.deleted.indexOf(d.index));
        //   }
        // }
        // headers = headers.filter(d => !d.children || d.children.length);
        return headers;
      }
      return data.headers;
    },
    _list: function(data) {
      if (!data.editing) {
        return data.list.filter(d => !~data.deleted.indexOf(d.index));
      }
      return data.list;
    }
  },
  isDeleted(item) {
    const { deleted } = this.data;
    return !!~deleted.indexOf(item.index)
  },
  doSave() {
    this.data.editing = false;
  },
  doEdit() {
    this.data.editing = true;
  },
  toggle(item) {
    let idx = this.data.deleted.indexOf(item.index);
    if (!!~idx) {
      this.data.deleted.splice(idx, 1);
    } else {
      this.data.deleted.push(item.index);
    }
  }
});

new App().$inject('#app');