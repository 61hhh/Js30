# 10 JS 实现 Checkbox 中按住 Shift 的多选功能

> 作者：61hhh 
> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。

## 实现效果

初始文档中提供了一组 `checkbox` 类型的 `input` 元素，选中某个复选框时，其 `<p>` 标签中的文字会显示删除线。

![](https://pic.downk.cc/item/5eb81814c2a9a83be52ae508.png)

1. 获取所有的 `<input>` 元素，并添加事件监听

	```js
	    const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');
		checkboxes.forEach(input =>{
	      input.addEventListener("click",clickHandler);
	    });
	```
	
2. 编写`clickHandler()` 内部的处理逻辑

## 解决思路

在谈具体的代码时，先讲讲思路。首先来复现一下，当你按下 Shift 键进行多选时，发生了什么？

1. 选中 A 项
2. 按下 Shift
3. 再选中 B 项
4. A-B 之间的所有项都被选中

关键点就在于 A、B 划出了一个范围，在这个范围之内的元素状态发生了改变。A 是上一次操作选中的对象，B 是此次操作对象。下面的方案就依据划定范围的方法不同来进行区分。

### 方法一

Wes Bos 在文档里提供了一种解决办法：用一个变量`inBetween`，来标记这个范围。

变量初始值为 `false`，当按下 Shift 键且同时选中了某个元素A的时候，`遍历所有项`，遍历过程中，若遇到另一个元素B，则将标记值取反。同时，将所有标记为 `true` 的项设置为选中。

```js
let lastChecked;

function handleCheck(e) {
  // Check if they had the shift key down
  // AND check that they are checking it
  let inBetween = false;
  if (e.shiftKey && this.checked) {
    // go ahead and do what we please
    // loop over every single checkbox
    checkboxes.forEach(checkbox => {
      console.log(checkbox);
      if (checkbox === this || checkbox === lastChecked) {
        inBetween = !inBetween;
        console.log('Starting to check them in between!');
      }

      if (inBetween) {
        checkbox.checked = true;
      }
    });
  }

  lastChecked = this;
}   
```

**可能的问题：**初次加载页面时，按住 Shift 再点击某一项，此项之后的元素都会被选中。此外，对于取消选中，无法批量操作。

### 方法二

将`querySelectorAll`获取到的元素转换成数组，获取 A 和 B，利用 `indexOf()` 来获得 A 和 B 在数组中的索引值，由此即可确定范围，并能通过 `slice()` 来直接截取 A-B 的所有 DOM 元素，并进行状态改变的操作，`true` 表示选中，`false` 表示取消选中。

> 使用`querySelectorAll`默认获取到的不是一个标准数组，不转换的话，后面`indexOf()`会报错。

基本思路：

1. 使用`Array.from`将获取到的元素转换为数组
2. 变量`lastCheck`用于记录上一次的点击
3. 两层`if`判断
4. 第一层`this.checked`判断是否点击勾选了，是的话在执行语句最后会把当前序号赋值给`lastCheck`
5. 第二层`e.shiftKey`判断是否按下`shift`键并且上一次有点击，是的话`nowCheck`记录当前序号，然后遍历两个序号值之间的元素，将`checked`赋值为`true`。

```js
    const checkboxes = Array.from(
      document.querySelectorAll('.inbox input[type="checkbox"]')
    );
	
	let lastCheck = null;//上一个点击的序号
    function clickHandler(e){
      // console.log(e);
      // console.log(e.shiftKey);

      if(this.checked){
        if(e.shiftKey && lastCheck !== null){
          let nowCheck = checkboxes.indexOf(this);
          checkboxes.slice(
            Math.min(nowCheck,lastCheck),
            Math.max(nowCheck,lastCheck)
            ).forEach(input => (input.checked = true));
        }
        lastCheck = checkboxes.indexOf(this);
      }else{
        lastCheck = null;
      }
    }
```
