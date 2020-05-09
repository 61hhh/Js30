# 15 LocalStorage

> 作者：61hhh 
> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。

## 实现效果
我们的目的是使网页模拟菜单/todoList的效果，在页面中添加新的菜品，而且在页面刷新之后也不清空(利用了localStorage的原理)。

现在的初始页面中，点击提交按钮（Add Item）时页面默认触发 `submit` 事件，并重新加载页面，这导致重新加载之后的页面中，已丢失刚提交的内容。页面所用到的 CSS 文件已经完成了，我们需要做的是完成 JavaScript 部分的内容，以实现目标效果。

作者使用的是submit提交form表单，基本的思想可以理解为：

- 更新JS资料
- 更新localStorage资料
- 更新画面



## 知识点
- Event
    - [event.preventDefault()](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/preventDefault)
    - [eventTarget.addEventListener()](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)
- [localStorage](https://developer.mozilla.org/zh-CN/docs/Web/API/Storage/LocalStorage)
    - `localStorage.setItem()`
    - `localStorage.getItem()`
- [JSON](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON)
    - `JSON.stringify()`
    - `JSON.parse()`

## 过程指南

1. 关于使用ES6模板添加`ul`的`li`标签实现html代码的更新：
    
    ```javascript
      function createList(plates = [], platesList) {
        platesList.innerHTML = plates.map((plate, i) => {
      return `
            <li>
              <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
              <label for="item${i}">${plate.text}</label>
            </li>
          `;
        }).join('');
      }
    ```

2. 默认情况下，在表单空间拥有焦点时按下 `Enter` 键或者点击提交按钮，会提交表单，提交时，浏览器会在发送请求给服务器之前触发 `submit` 事件，为了验证这个行为，我们可以添加事件监听后看看效果，此处先写一个处理函数。点击按钮后发现 `submit` 事件触发后的结果是， Console 中闪现 add后刷新整个页面，这是 `submit` 的默认行为，我们并不希望出现这种情况，因此要取消这种行为：

    ```javascript
    function addItem(e) {
      console.log('add');
      e.preventDefault();//加上取消submit的刷新操作
    }
    
    addItems.addEventListener('submit', addItem);
    ```

3. 对于 `addItem` ，  在事件监听中，`this` 可以获取当前 form 即我们为其添加事件监听的 `addItem` 元素，所以可以借此方便的获取输入框中的值。在 `addItem()` 方法中获取输入，并构造一个对象 `item` 来存储这个信息，把对象放入此前声明好的数组 `items`，同时更新数据，包括页面中的 HTML 内容、LocalStorage：

    ```javascript
     /* function addItem(){} 中 */
      function addItem(e) {
        e.preventDefault();
        // let text = this.querySelector("input:first-child").value;
        // const text = (this.querySelector('[name=item]')).value;
        const input = (this.querySelector('[name=item]'));
        
        items.push({ text: input.value, done: false});
        localStorage.setItem('items', JSON.stringify(items));
        createList(items, itemsList);
        this.reset();
      }
    ```

**注：LocalStorage 更新**  ：我们利用 LocalStorage 把信息存到本地，从而可以保证刷新后内容不变。但使用 `localStorage` 的时候，直接把 `items` 传入得到的值是 [object Object]，所以需要在把数据传进去之前就把内容转换成 String 类型的数据，之后读取时也使用 `JSON.parse()` 来将数据转换成 JSON 格式。

> 这样的原因是因为 localStorage 里面只会储存 String 类型数据，如果传入的是非 String 则会直接使用 toString 转换：`({}).toString() //"[object Object]"`，这时候就会发生异常，所以才需要先使用 `JSON.stringify()` 将 Object 转换成 json 格式，读取出来之后再利用 `JSON.parse()` 转换为 Object。