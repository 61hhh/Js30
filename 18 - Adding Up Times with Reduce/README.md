# 18 使用reduce进行时间累加

> 作者：61hhh 
> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。

## 挑战任务
   初始文件`index-start.html`中提供了一个包含多个列表项的无序列表元素，每一个列表项均添加了`data-time`属性，该属性用**分**和**秒**表示了时间。要求将所有的时间累加在一起，并用`时:分:秒`来表示计算的结果。

## 基本思路
1.取得所有`li`中`data-time`属性的值，将时间换算为秒并累加求得总时间（单位：秒）;
2.手动计算将总时间转化为新的格式“XX小时XX分XX秒”;
3.将结果显示在页面上。

## 过程指南()
1.取得所有`li`标签
```js
let li = document.querySelectorAll("li");
```
2.遍历`li`元素节点，取得每个`data-time`的值并以：为界将其分解为含有两个元素的数组,每个数组中含有两项，第一项为表示分钟的字符串，第二项为表示秒的字符串，将两者进行运算转化为表示秒的数字，并添加进新的数组，将新数组`times`中各项累加。

```js
    let a = [...li]
      .map(item => item.dataset.time)
      .map(time =>{
        let  [min,sec] = time.split(":");
        return min*60 + sec*1;
        //方法1.因为times为数组类型，故可以直接使用reduce函数进行累加
      }).reduce((prev,next)=> prev + next, 0);
//方法2.不熟悉reduce函数的也可通过 for循环遍历、forEach遍历 各项进行结果累加
```
4.总时间格式转换
```js
    //00:00:00
    let sec = a % 60;
    let min = ((a - sec) / 60);
    let hour = Math.floor(min / 60);
```
5.将结果打印在界面上即可