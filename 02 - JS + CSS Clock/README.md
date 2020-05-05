## Day2 行走的时钟

### 任务描述

动手实现一个网页版的时钟吧！它不仅仅可以给你带来乐趣，更重要的是让你更牢固地掌握 new Date() 方法的使用。

### 任务目的

#### HTML

1. ##### 掌握 flexbox 布局，使元素在页面居中（也可使用 position 布局）

   采用Flex布局的元素，称为Flex容器，简称“容器”，它所有的子元素自动成为容器成员，称为Flex项目，简称“项目”。

   容器默认存在两个轴：main axis（水平主轴）和cross axis（垂直交叉轴）

   容器属性：设置在容器上

   ```html
   flex-direction;
   //决定主轴方向(即项目排列方向)
   flex-wrap;
   //默认情况下，项目都排在一条线（又称"轴线"）上。flex-wrap属性定义，如果一条轴线排不下，如何换行
   flex-flow;
   //是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap。
   justify-content;
   //定义了项目在主轴上的对齐方式。
   align-items;
   //定义项目在交叉轴上如何对齐
   align-content;
   //定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用
   ```

   项目的属性：设置在项目上

   ```
   order;
   //定义了项目的排列顺序，数值越小越靠前，默认为0
   flex-grow;
   //定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大
   flex-shrink;
   //定义项目的缩小比例，默认为1，即如果空间不足，该项目将缩小
   flex-basis;
   //定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。
   flex;
   //是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。
   align-self;
   //允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。
   ```

   

   [Flex布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

#### CSS

1. ##### 掌握 CSS3 中的 :nth-child() 伪类的使用

   语法：E:nth-child(n){Rules}：用于匹配父元素的第n个子元素E

   当然这个伪类选择器功能不止这些，还可以倍数选择、倍数分组选择、奇偶匹配等

   示例代码：将父元素的第二个li子元素颜色设置为红

   ```html
   <!DOCTYPE html>
   <html lang="zh-cn">
   <head>
   <meta charset="utf-8" />
   <title>结构性伪类选择符 E:nth-child(n)_CSS参考手册_web前端开发参考手册系列</title>
   <style>
   h1{font-size:16px;}
   li:nth-child(2){color:#f00;}
   </style>
   </head>
   <body>
   <h1>第二行要变成红色 <code>li:nth-child(2){color:#f00;}</code></h1>
   <ul>
   	<li>结构性伪类选择符 E:nth-child(n)</li>
   	<li>结构性伪类选择符 E:nth-child(n)</li>
   	<li>结构性伪类选择符 E:nth-child(n)</li>
   </ul>
   </body>
   </html>
   ```

   

2. ##### 掌握 position 中 absolute 和 relative 的使用

   absolute：绝对定位，默认参照浏览器的左上角，配合TOP、RIGHT、LEFT、BOTTOM、LEFT进行定位。

   <1>绝对定位使元素框从文档流完全删除，相当于该元素从原文档中删除了

   <2>它的位置是相对于已定位的祖先元素，如果没有默认为body

   <3>因为绝对定义的框与文档流无关，因此可以通过设置Z-index控制这些框覆盖其他元素

   relative：相对定位，设置为相对定位的元素框会偏移某个距离。元素仍然保持其未定位前的形状，它原本所占的空间仍保留。

   <1>相对定位不会删除元素框在文档流的位置，而是在原文档位置基础上进行移动

   

3. ##### 掌握 transform-origin 属性的使用

   语法：transform-origin: *x-axis y-axis z-axis*;

   transform-Origin属性允许您更改转换元素的位置。2D转换元素可以改变元素的X和Y轴。 3D转换元素，还可以更改元素的Z轴。

4. ##### 熟悉 rotate() 函数的运用

   语法：rotate(angle--旋转的角度)

   通过设置角度参数值来设定旋转幅度，rotate函数可以旋转元素.

   如果元素设定了perspective值，就可以使用rotate3d()函数实现三维空间的选择：rotateX(angle)--rotateY(angle)--rotateZ(angle)

   关联元素：transform-origin

#### JavaScript

1. ##### 掌握 setInterval() 方法的使用

   语法：setInterval ( code, milliseconds[, args...] )

   code：要执行的函数或js代码；

   milliseconds：执行函数或代码的间隔时间，单位为毫秒

   [args..]：可选参数，用于传参

2. ##### 掌握 new Date() 方法的使用

   ```javascript
   var nowDate=new Date() //获取系统当前时间
   nowDate.getYear();//获取当前年份2位。getFullYear 获取4位
   nowDate.getMonth();//获取当前月份0开始，0-11
   nowDate.getDate();//获取当前日期0-31
   nowDate.getDay();//获取星期
   //。。。
   ```

3. ##### 掌握 ES6 模板字符串的用法
