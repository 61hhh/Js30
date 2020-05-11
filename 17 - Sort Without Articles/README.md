# 17 数组的去前缀排序

> 作者：61hhh 
> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。

## 挑战任务
   初始文件`index-start.html`中提供了一个无序列表元素，并在`script`标签中提供了一个字符串数组。请为这些字符串排序，要求去除字符串中的`The`，`A`以及`An`的前缀后再进行排序，并把排序后的结果作为列表项展示在无序列表中。

## 实现效果
![](https://pic.downk.cc/item/5eb8f753c2a9a83be5e09500.png)

## 基本思路
1.基本的编程任务有两个要点，即**排序**和**展示**;<br>
2.数组排序部分最外层即为`Array.sort(arr)`函数，内层实现具体排序规则;<br>
3.展示部分即将排列好的新数组拼接成带有标签的HTML元素，然后一次性插入到列表中。

## 过程指南(ES6版)
1.声明去前缀函数，使用`String.replace()`函数实现，主要使用正则表达式语法实现。

```js
function strip(bandName) {
  return bandName.replace(/^(a |the |an )/i, '').trim();
}
```
2.使用`Array.sort()`对数组进行排序，可以先直接使用sort看一下，然后自己编写稳定的sort函数

```js
//bands.sort();

bands.sort((a,b)=>(strip(a) > strip(b) ? 1 : -1));

document.getElementById("bands").innerHTML = bands
  .map(band=>`<li>${band}</li>`)
  .join("");
```
3.对于ID类的，可以使用`getElementById`相对高效，将排序后的数组作为列表项插入其中。

```js
document.getElementById("bands").innerHTML = bands
  .map(band=>`<li>${band}</li>`)
  .join("");
```

注：`Array.prototype.sort(*param*)`方法虽然有返回值，但排序结果也影响原数组。而且默认sort函数会有不稳定排序的隐患