# 29 Countdown Timer 中文指南

> 作者：61hhh 
> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。

## 挑战任务
初始文档`index-start.html`中提供了一个倒计时控制器，从`html`文档的结构可以看出，顶部的按钮可以用来增加倒计时时间，常用的时间间隔已将参数绑定在`data-time`属性上;`display`类用来显示计时的结果。   
本次编程挑战的任务是通过javascript代码基于当前时间生成一个倒计时，将`剩余时间`和`结束时间`分别显示在`diaplay__time-left`类标签和`display__end-time`类标签上。

## 编程思路  
监听按点击事件`click`来为倒计时增加时间，使用`setInterval`函数每秒执行判断函数，若倒计时事件到，则清除当前计时器，若时间未到，则计算并刷新页面上应该显示的时间。

- 设置时间
- 为button添加点击事件
- 添加倒计时响应函数、结束时间显示函数

## 过程指南   
1.定义变量及获取需要操作的DOM元素的引用。   
```js
    let timer;
    const buttons = document.querySelectorAll(".timer__controls > button");
    const timeLeft = document.querySelector(".display__time-left");
    const endTime = document.querySelector(".display__end-time");
```
2.为button和自定义form添加对应的点击`click`和提交`submit`事件响应函数   

```js
  	//设置时间
    const setTimer = function () {
        const sec = parseInt(this.dataset.time);
        TimeCounter(sec);
    };

	buttons.forEach(button => button.addEventListener("click",setTimer));

    document.querySelector("#custom").addEventListener("submit",function(e){
        e.preventDefault();
        const value = parseInt(this.minutes.value);
        if(value){//判断输入，如果是字符parseInt得到的就是Nan，就不会log和reset
            TimeCounter(value*60);
            this.reset();
        }
    });
```
3.添加计时功能，其中有两个子功能：倒数计时、显示结束时间

```js
    const TimeCounter = function(sec){
        // console.log(sec);
        clearInterval(timer);//清除旧的timer
        const now = new Date().getTime();
        const end = now + sec * 1000;

        //倒数计时
        setCountdown(end);
        //显示最后时间
        showEndTime(end);
    }
```

-    倒数计时函数

  ```js
      function setCountdown(end){
          clearInterval(timer);
          timer = setInterval(function(){
              const leftTime = Math.floor((end - Date.now()) / 1000);
              if(leftTime >= 0){//计时未结束
                  const leftMin = Math.floor(leftTime / 60);
                  const leftSec = leftTime % 60;
                  // leftSec = leftSec < 10 ? "0" + leftSec : leftSec;
                  timeLeft.innerHTML = `${leftMin}:${leftSec}`;
              }else{
                  timeLeft.innerHTML = `计时over!`;
                  clearInterval(timer);
              }
          },16);
      }
  ```

- 结束时间函数

  ```js
      function showEndTime(time){
          const endDate = new Date(time);
          let hour = endDate.getHours();
          let minutes = endDate.getMinutes();
          // minutes = minutes < 10 ? "0" + minutes : minutes;
          endTime.innerHTML = `结束时间： ${hour}:${minutes}`;
      }
  ```

  





