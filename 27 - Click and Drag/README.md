# 27 Click And Drag 中文指南

> 作者：61hhh 
> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。

## 挑战任务
初始文档`index-start.html`中提供了一组条幅，本次的编程任务需要实现的效果是当鼠标拖动画面移动时，条幅同步向水平方向移动。

## 编程思路  
在最外层的items元素上监听鼠标的按下，移动，弹起事件并编写相应的回调函数即可，在对应的回调函数中获取到鼠标横向滑动的距离，将该距离值翻倍后赋值予条幅的scrollLeft属性可调整元素在水平方向上滚动的位置。   
>style.css中已为条幅编写好active类，当鼠标移动时只需要将此类添加给对应的类即可看到很棒的CSS特效。

鼠标拖曳事件可以分为：

- 开始：鼠标按下事件`mousedown`
- 拖动：鼠标移动事件`mousemove`
- 结束：鼠标弹起事件`mouseup` && 鼠标离开事件`mouseleave`

## 过程指南   

1.在条幅容器上监听鼠标按下事件   

```js
  const list = document.querySelector('.items');
  let startX = 0;  
  list.addEventListener('mousedown',startDrag);
  function startDrag(e){
    list.classList.add('active');
    //鼠标按下去
    console.log(e);
    startX = e.pageX;
  };
```
2.在条幅容器上监听鼠标弹起事件   
```js
  list.addEventListener('mouseup',stopDrag);
  list.addEventListener('mouseleave',stopDrag);
  function stopDrag(){
    list.classList.remove('active');
  };
```
3.在条幅容器上监听鼠标移动事件   
```js
  list.addEventListener('mousemove',dragHandler);
  function dragHandler(e){
    if(list.classList.contains('active')){
      let move = e.pageX - startX;
      list.scrollLeft -= move * 3;
      startX = e.pageX;
    }
  };
```
