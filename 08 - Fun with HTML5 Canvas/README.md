# 08 HTML5 Canvas 实现彩虹画笔绘画板指南

> 作者：61hhh 
> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。

## 实现效果

用 HTML5 中的 Canvas 的路径绘制实现一个绘画板，可供鼠标画画，颜色呈彩虹色渐变，画笔大小同样呈渐变效果。

![](https://pic.downk.cc/item/5eb817c9c2a9a83be52a2ba5.png)

## 涉及特性

Canvas：

- 基本属性
	- `getContext()`
	- `strokeStyle`
	- `fillStyle`
	- `lineCap`
	- `lineJoin`
- 路径绘制
	- `beginPath()`
	- `lineTo()`
	- `moveTo()`
	

鼠标事件处理：

- `mousemove`
- `mousedown`
- `mouseup`
- `mouseout`

## 过程指南

1. 获取 HTML 中的 `<canvas>` 元素，并设定画板边框
2. `.getContext('2d')` 获取上下文，下面以 ctx 表示
3. 设定 ctx 基本属性
	- 线条颜色
	- 线条宽度
	- 线条末端形状
4. 绘画效果
	1. 设定一个用于标记绘画状态的变量
	2. 鼠标事件监听，不同类型的事件将标记变量设为不同值
	3. 编写发生绘制时触发的函数，设定绘制路径起点、终点
5. 线条彩虹渐变效果（运用 hsl 的 `h` 值的变化，累加）
6. 线条粗细渐变效果（设定一个范围，当超出这个范围时，线条粗细进行逆向改变

## 相关知识

### [Canvas](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API)

[**`<canvas>`**](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/canvas)是一个可以使用脚本(通常为[JavaScript](https://developer.mozilla.org/zh-CN/docs/JavaScript))来绘制图形的 [HTML](https://developer.mozilla.org/zh-CN/docs/HTML) 元素.

首先需要了解最基本的 Canvas 用法，它创建一个可以绘画的环境，由对某个元素获取其用于渲染的上下文开始：

```js
let canvas = document.querySelector('#draw');
var ctx = canvas.getContext('2d');
```

对于这个用于渲染的 ctx（），有一些基本样式属性可供修改，类似于配置你的调色盘：

- `strokeStyle`：线条描边的颜色
- `lineWidth`：线条的宽度
- `lineCap`：笔触的形状，有 round | butt | square 圆、平、方三种。
- `lineJoin`：线条相交的方式，有 round | bevel | miter 圆交、斜交、斜接三种。

Canvas 让 JS 具备了动态绘制图形的能力，但在这里例子中我们只需要使用到一些简单的[路径绘制方法](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes#绘制路径)，路径可以理解为两点和他们的连线，下面只列举了我们用到的方法：

- `beginPath()`：新建一条路径
- `stroke()`：绘制轮廓
- `moveTo()`：（此次）绘制操作的起点
- `lineTo()`：路径的终点

### 彩虹渐变颜色——HSL  

在这个挑战中，涉及到改变线条的颜色。我们需要利用 HSL 色彩模式，首先可以去这个网站 [http://mothereffinghsl.com](http://mothereffinghsl.com/) 感受一下 HSL 不同色彩值对应的效果。
- H(hue) 代表色调，取值为 0~360，专业术语叫色相
- S 是饱和度，可以理解为掺杂进去的灰度值，取值为 0~1
- L 则是亮度，取值也是 0~1，或者百分比。
	

这之中 H 值从 0 到 360 的变化代表了色相的角度的值域变化，利用这一点就可以实现绘制时线条颜色的渐变了，只需要在它的值超过 360 时恢复到 0 重新累加即可。采用ES6的写法

```js
初始设置
let colorDeg = 0;
ctx.strokeStyle = `hsl(${colorDeg},100%,50%)`;
在mousemove事件中：
      colorDeg = colorDeg <360 ? colorDeg+1 : 0;
      ctx.strokeStyle = `hsl(${colorDeg},100%,50%)`;
```

Alex有讲到：如果想实现黑白水墨效果，可以直接将颜色设置为黑色，通过透明度的改变来实现深浅不一的颜色。

## 疑难问题

### 如何让按下鼠标后的轨迹画在画布上？

#### 事件监听部分

解决这个问题，只需要将鼠标绘制时的动作分解清楚。思考或者模拟一下，在用鼠标画一条线时发生了什么：

1. 单击鼠标-按下准备开始
2. 移动鼠标-画线
3. 松开手指-结束画线

这几个分解动作都有对应的鼠标事件，在编写这部分时你可以对每个事件监听 `console.log(e)` 来查看当前触发事件的属性、类型。对应 ctx 的操作的即是第二阶段，所以可以设定 `mousemove` 事件监听触发的函数进行绘制。

```js
canvas.addEventListener('mousemove',/*画线func*/);
```

但只有这个并不够，你会发现只有 `mousemove` 事件监听时，只要鼠标在页面上划过都会触发函数。这时我们需要一个标记变量，来控制当前鼠标是不是处在按下的状态。

```js
let drawing = false;

    canvas.addEventListener('mousedown',(e)=>{
      drawing = true;
      [x,y] = [e.offsetX,e.offsetY];
    });
	canvas.addEventListener('mousemove',(e)=>{
        if(!drawing) return; //drwaing为true表示鼠标按下了，是绘画的前提条件
    	/*画线func*/
	}
canvas.addEventListener('mouseup', () => drawing = false);
canvas.addEventListener('mouseleave', () => drawing = false); // 鼠标移出画布范围时
```

#### Canvas 绘制部分

处理好事件监听，就可以编写绘制时触发的函数了。

```js
ctx.beginPath();
ctx.moveTo(x,y);
ctx.lineTo(e.offsetX,e.offsetY);
[x,y] = [e.offsetX,e.offsetY];
ctx.stroke();
```



### 如何让线条的颜色和粗细发生渐变？

上面已经简单介绍了 HSL 的独特性质，那如何把这个特性应用起来呢？很简单，只需要在每次新建路径时添加一个判断和累记的操作即可。颜色需要控制它的 H 值在 0~360 之间变化。

而线条粗细也是一样的道理，只需要保证它在你期望的范围内。首先观察WesBos的线条效果，发现是先变细再变粗，就像一个漏斗，而不是粗到细跳回粗再到细这样的循环，因此对线条宽度的设置因该是先减少到某一值，再增加。

```js
let lineWidth = 50;
ctx.lineWidth = lineWidth;
let lineflag =false;

ctx.lineWidth = lineWidth;
      if(lineflag ===false){
        if(lineWidth>10){
          lineflag = false;
          lineWidth = lineWidth - 1;
        }
        else{
          lineflag = true;
        }
      }
      else{
        if(lineWidth<50){
          lineflag = true;
          lineWidth = lineWidth + 1;
        }
        else{
          lineflag = false;
        }
      }
```

## 延伸思考

### 怎样设置，使得离开画板区域鼠标不松再进去，可以继续画

要实现离开后再进入可以接着画，需要用到两重判断，一个是判断是否按下的down，一个是判断之前是否绘制的drawing

```javascript
let drawing = false;
let down = false;

    canvas.addEventListener('mousedown',(e)=>{
      down = true;
      [x,y] = [e.offsetX,e.offsetY];
    });
	canvas.addEventListener('mousemove',(e)=>{
        if(!down || !drawing) return; //只有down和drawing都为true才能继续
    	/*画线func*/
	}
document.addEventListener('mouseup', () => down = false);
canvas.addEventListener('mouseleave', () => drawing = false); // 鼠标移出画布范围时
canvas.addEventListener('mouseenter', (e) =>{
    //再次进入时drwaing为true，要判断的就剩down，即鼠标是否按下
    	drawing = true; 
      	[x,y] = [e.offsetX,e.offsetY];
});
```

