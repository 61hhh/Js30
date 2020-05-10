# 16 文字阴影的鼠标随动效果

> 作者：61hhh 
> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。

## 挑战任务
   初始文件`index-start.html`中提供了一个包含了`h1`元素的`div`元素，`h1`元素已经设置了`text-Shadow`的样式。本次编程挑战中需要完成的效果是根据用户当前的鼠标位置来操纵文字阴影的位置。

![](https://pic.downk.cc/item/5eb815c1c2a9a83be525018b.png)

## 基本知识
`text-shadow`样式为标准CSS3样式，用于添加**一个或多个**文字阴影，用于其的语法格式为：
```css
text-shadow: h-shadow v-shadow blur color
```

## 过程指南
1.在`script`标签中，我们使用3个变量，一个指向`div`元素，一个指向其子元素`h1`，最后一个变量`factor`用于标记阴影距离`h1`中心的距离和鼠标距离`h1`中心距离的比例，用于计算阴影的具体位置。

2.在`hero`元素上监听鼠标移动事件`mousemove`，并添加事件处理的函数：

```js
hero.addEventListener('mousemove',function(e){
    //处理代码
});
```

3.位置的获取：采用`offsetX`和`offsetY`来获取鼠标的位置，可以`console.log`一下：

```javascript
console.log(offsetX / this.offsetWidth,offsetY / this.offsetHeight);
```

然后我们就可以找到鼠标移动的每一个位置坐标，注意鼠标在`div`标签时`log`的比值会很小，因为`offsetX、offsetY`是相对与当前的块级元素的，因此相当于用`div`的偏移量除以整体页面宽高，此时应该加上外部的偏移：

```js
        if(this.target !== this){
          offsetX += e.target.offsetLeft;
          offsetY += e.target.offsetTop;
        }//this.target是指鼠标的位置，this指整体e的位置
```
![](https://pic.downk.cc/item/5eb81502c2a9a83be52318ed.png)

4.取得鼠标位置后，就可以对应生成阴影的位置了，采用ES6写法设置阴影的style：

```js
        text.style.textShadow = `
          ${lengthX }px ${lengthY }px 2px rgba(255,255,0,0.8),
          ${lengthX * -1}px ${lengthY }px 2px rgba(0,255,255,0.8),
          ${lengthX }px ${lengthY *-1}px 2px rgba(255,0,255,0.8),
          ${lengthX *-1}px ${lengthY *-1}px 2px rgba(0,0,0,0.8)
        `;
```
