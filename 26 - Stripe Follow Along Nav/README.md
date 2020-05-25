# 26 Strip Follow Along Nav 中文指南

> 作者：61hhh 
> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。

## 挑战任务
初始文档`index-start.html`中提供了一组导航按钮，本次的编程任务需要实现的效果是当鼠标悬停于导航按钮时，显示对应下拉菜单的内容。（说明：下拉菜单内容及白色背景已写好，只需要根据需要改变其CSS属性使元素显示出来或改变其位置即可）。

## 编程思路  
基本思路是监听导航按钮的鼠标移入移出事件，再对应的事件函数添加`dropdownbackground`，其中有两层，一层是`dropdownbackground`背景，一层是其中的内容。

## 过程指南   
1.监听每一个导航栏按钮的鼠标移入移出事件
```js
const menus = document.querySelectorAll('.cool > li');
const dropdownBackground = document.querySelector('.dropdownBackground');
function enterHandler(){
    //xxx
}
function leaveHandler(){
    //xxx
}
  menus.forEach(menu =>menu.addEventListener("mouseenter",enterHandler))
  menus.forEach(menu =>menu.addEventListener("mouseleave",leaveHandler))
```
2.对应的`enterHandler leaveHandler`是鼠标的移入移出操作，进入时采用`add`，通过`getBoundingClientRect()` 获取元素的位置并将`drop`标签移到对应位置，离开时`remove`掉对应的class实现，其中`add('trigger-enter-active')`是通过预先判断是否有`trigger-enter`再添加的方式，使得淡入淡出的效果更直观

```js
  function enterHandler(){
    this.classList.add("trigger-enter");
    setTimeout(()=>{
      this.classList.contains('trigger-enter') && this.classList.add('trigger-enter-active');
    },160);
    //处理坐标、宽高，获取里面内容的dropdown
    const dropdown = this.querySelector(".dropdown");
    const rect = dropdown.getBoundingClientRect();
    const nav = document.querySelector(".top");
    const navRect = nav.getBoundingClientRect();
    
    // console.log(rect);

    dropdownBackground.classList.add("open");
    dropdownBackground.style.width = (rect.width)+ "px";
    dropdownBackground.style.height = (rect.height) + "px";
    dropdownBackground.style.top = (rect.top - navRect.top) + "px";
    dropdownBackground.style.left =(rect.left - navRect.left) + "px";
  }

  function leaveHandler(){
    this.classList.remove("trigger-enter");
    this.classList.remove('trigger-enter-active');
    dropdownBackground.classList.remove("open");
  }
```
