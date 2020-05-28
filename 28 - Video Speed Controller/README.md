# 28 Video Speed Controller 中文指南

> 作者：61hhh 
> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。

## 挑战任务
初始文档`index-start.html`中提供了一个视频播放区域（使用的是H5原生的控制器）以及一个表示播放速度的滑块区域，本次的编程任务需要实现的效果是当鼠标在滑块上移动时，实时改变视频播放的速度。

## 编程思路  
本次的编程任务难度系数较低，在右侧速度条上监听鼠标点击事件，调整滑块的高度来表示不同的填充百分比，即不同的播放速度，将速度赋值给video对象的`playbackRate`属性即可实时改变播放速度。难点在于高度的百分比转换。

## 过程指南   
```js
  //在上一节基础上，继续学做move的判断
  const speed  = document.querySelector('.speed');
  const bar = document.querySelector('.speed-bar');
  const video = document.querySelector('video');

  function moveHandler(e){
    const y = e.pageY - this.offsetTop;
    let percent = y / this.offsetHeight;
    const height = Math.round(percent * 100) + "%";

    bar.style.height = height;

    //速度范围 0-1 => 0.5-2 
    //(0-1)*(max - min) + min
    percent = percent * 1.5 + 0.5;
    //check确认
    percent = percent > 2 ? 2 : percent < 0.5 ? 0.5 : percent;
    //显示
    bar.textContent = Math.round(percent *100) / 100 + "x";
    console.log(percent);

    video.playbackRate = percent;
  }

  speed.addEventListener("mousemove",moveHandler);
  
```

