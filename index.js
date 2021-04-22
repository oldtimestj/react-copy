class Component {
  constructor(props) {
    this.props = props;
  }
  createDomFromDomString (domString) {
    let div = document.createElement('div');
    div.innerHTML = domString;
    return div.children[0];
  }
  // setState中包含了页面渲染操作
  setState (partialState) {
    this.state = Object.assign(this.state, partialState);
    // 老的button节点
    let oldElement = this.domElement;
    // 新的button节点
    let newElement = this.createDomFromDomString();
    // 用新的节点替换老的节点实现累加更新
    oldElement.parentElement.replaceChild(newElement, oldElement);
  }
  // 负责把一个DOM模板字符串转换成真实的DOM元素
  createDomFromDomString () {
    // this Counter组件实例
    let htmlString = this.render();
    // 从一个DOM字符串创建一个dom元素
    let div = document.createElement('div');
    div.innerHTML = htmlString;
    this.domElement = div.children[0];
    // 将DOM节点的component属性等于当前的组件实例
    this.domElement.component = this;
    // this.domElement.addEventListener('click', this.add.bind(this));
    // 返回的是一个DOM元素
    return this.domElement;
  }
  // 把渲染好的DOM元素进行挂载
  mount (container) {
    container.appendChild(this.createDomFromDomString());
  }
}
window.trigger = function (event, method) {
  event.target.component[method].call(event.target.component);
}
class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { number: 0 }
  }
  add () {
    // 只改变状态，页面无法重新渲染
    // this.state = { number: this.state.number + 1 };
    this.setState({ number: this.state.number + 1 });

  }
  render () {
    return `<button onclick="trigger(event, 'add')">${this.props.name}: ${this.state.number}</button>`;
  }
}