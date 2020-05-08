# 13 图片随屏幕滚动而滑入滑出的效果指南
> 作者：61hhh 
> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。

## 实现效果

页面中的文章有几张配图，随着页面上下滚动，图片位置划过图片一半时，图片从两侧滑入；图片位置离开可见区域时，图片向两侧滑出。

## 知识点

涉及页面尺寸的属性：

- `window.scrollY` 文档从顶部开始滚动过的像素值
- `window.innerHeight viewport` 部分的高度
- `ele.height` 元素的高度
- `ele.offsetTop` 当前元素顶部相对于其 offsetParent 元素的顶部的距离。

`debounce` 的作用：
降低事件监听的频率，使用了 Lodash 中的 debounce 方法。

## 解决思路

1. 获取页面中的所有图片元素
2. 滚动事件监听
3. 尺寸获取及处理
4. 滚动至指定区域的条件判断

![](http://img.salute61.top/13.png)

## 过程指南

1. 获取所有涉及到的图片
    ```js
    const images = document.querySelectorAll('.slide-in');
    ```
    
2. 滚动事件监听
    ```js
        function scrollHandler(){
          console.log("scroll",window.scrollY);
          console.log(window.scrollY);
          });
    }
        window.addEventListener('scroll', debounce(scrollHandler));
    ```
    针对页面的滚动事件进行监听，可以先`console.log`事件对象来看看。同时在接下来的调试过程中也能利用这打出各个尺寸的值，来帮助我们感受每个尺寸的含义。此外由于每次滚动都触发监听事件，会降低 JavaScript 运行性能，所以用 `debounce` 函数来降低触发的次数。
    
    页面的滑动过程经过了两个临界点，一个是下滑到图片出现了一半，另一个是完全滑过图片使图片已不再视窗之内，分别决定了图片的显示和隐藏。
    
    ```js
          images.forEach(img => {
            let windowTop = window.scroolY;//页面顶部
            let windowBottom = windowTop + window.innerHeight;//页面底部
            let imageMiddle = img.offsetTop + img.Height / 2 ;//图片中部
    ```
    
4. 对于满足显示条件的，给此图片添加 `.active` 类，不满足的则去掉。
    ```js
            if((imageMiddle < windowBottom) && (imageMiddle > windowTop) ){
                //只要图片中段在页面内就会一直加，不过由于已经有了active因此不明显
              	img.classList.add('active');
            }else{
              	img.classList.remove('active');
            }
    ```