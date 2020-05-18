# 24 Sticky Nav 中文指南

> 作者：61hhh 
> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。

## 挑战任务
初始文档`index-start.html`提供了一篇仿博客文章的HTML文件布局，包括标题栏，导航以及正文部分，本次的编程挑战任务为：编写代码，使得当页面向下滚动至标题栏从可视区消失时，将导航栏固定在页面顶部，并显示页面LOGO（初始文档中已提供）以便后续导航；当页面向上滚动至标题栏重新出现在可视区域时，导航栏恢复初始设置。

## 实现效果
![结果展示](https://pic.downk.cc/item/5ec27e64c2a9a83be518ac9c.png)

## 编程思路
通过为指定元素设置`position:fixed`样式即可将其固定至页面指定位置。代码编写中配合监听页面滚动事件，判断页面的当前滚动位置，动态切换指定元素的`position`属性即可。

## 过程指南    
> html页面中在导航栏提供了LOGO标签，初始最大宽度被设置为0而隐藏，固定导航栏时可同时修改LOGO标签的max-width属性，将其显示出来   

1.获取导航栏相对于整个文档的位置，将其记录为切换点   
```js
  let nav = document.querySelector("#main");
  let navPosition = nav.offsetTop;
```
2.编写动态改变导航栏样式的函数
```js   
  function scrollHandler(){
    // console.log(window.scrollY,nav.offsetTop);
    if(window.scrollY >= navPosition){
      //fixed menu
      document.body.classList.add("fixed-nav");
    }else{
      //normal
      document.body.classList.remove("fixed-nav");
    }
  }
```
3.将调整函数绑定至窗口滚动事件

由于`fixed`之后`offsetTop`位置就被置0了，此时再鼠标拖上去菜单栏会卡在最上面不会到原位，因此要增加判断`resize`

```js
  window.addEventListener("scroll",scrollHandler);
  window.addEventListener("resize",function(){
    navPosition = nav.offsetTop;
  })
```