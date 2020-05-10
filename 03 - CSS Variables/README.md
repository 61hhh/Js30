## Day3 定制个人相册

### 任务描述

使用 CSS4 中的自定义属性和 data -* 来自己做一个属于自己的相册吧，可以根据需求再添加更多的样式！

![](https://pic.downk.cc/item/5eb816d5c2a9a83be527c97d.png)

### 任务目的

#### HTML

1. ##### 掌握 HTML5 中新添加的 input 中的 type 属性值（例如：range、color）

   ```html
   button		//定义可点击按钮（多数情况下，用于通过 JavaScript 启动脚本）。
   checkbox	//定义复选框。
   file		//定义输入字段和 "浏览"按钮，供文件上传。
   hidden		//定义隐藏的输入字段。
   image		//定义图像形式的提交按钮。
   password	//定义密码字段。该字段中的字符被掩码。
   radio		//定义单选按钮。
   reset		//定义重置按钮。重置按钮会清除表单中的所有数据。
   submit		//定义提交按钮。提交按钮会把表单数据发送到服务器。
   text		//定义单行的输入字段，用户可在其中输入文本。默认宽度为 20 个字符。
   ```




#### CSS

1. ##### 掌握 CSS4 中的自定义属性

   变量声明：

   ```css
   body{/*声明变量时，变量名前面加两根连线*/
   	--foo:#7F583F;
   	--bar:#F7EFD2
   }
   ```

   它们与`color`、`font-size`等正式属性没有什么不同，只是没有默认含义。所以 CSS 变量（CSS variable）又叫做**"CSS 自定义属性"**（CSS custom properties）。因为变量与自定义的 CSS 属性其实是一回事。

   你可能会问，为什么选择两根连词线（`--`）表示变量？因为`$foo`被 Sass 用掉了，`@foo`被 Less 用掉了。为了不产生冲突，官方的 CSS 变量就改用两根连词线了。

   var()函数：

   ```css
   a{
   	color:var(--foo);
   	text-decoration-color:var(--bar);
   }/*var()函数用于读取变量*/
   ```

   var()函数还可以使用第二个参数，表示变量的默认值，第二个参数不处理内部的逗号或空格，都视作参数的一部分。

   **注**：变量值只能作属性值，不能用作属性名。

   参考：[CSS 变量教程](http://www.ruanyifeng.com/blog/2017/05/css-variables.html)

2. ##### 了解 box-sizing 属性的相关知识

   box-sizing 属性允许您以特定的方式定义匹配某个区域的特定元素。例如，假如您需要并排放置两个带边框的框，可通过将 box-sizing 设置为 "border-box"。这可令浏览器呈现出带有指定宽度和高度的框，并把边框和内边距放入框中。

   ```css
   box-sizing: content-box|border-box|inherit;
   content-box	
   /*这是由 CSS2.1 规定的宽度高度行为。
   宽度和高度分别应用到元素的内容框。
   在宽度和高度之外绘制元素的内边距和边框。*/
   border-box	
   /*为元素设定的宽度和高度决定了元素的边框盒。
   就是说，为元素指定的任何内边距和边框都将在已设定的宽度和高度内进行绘制。
   通过从已设定的宽度和高度分别减去边框和内边距才能得到内容的宽度和高度。*/
   inherit	/*规定应从父元素继承 box-sizing 属性的值。*/
   ```

   box-sizing 最主要的用法是规定容器元素的最终尺寸计算方式。如果你创造了一个 <div> 没有设置 box-sizing 属性为 border-box(不设置的话默认值为 content-box.)，同时你设置 **width:100px; border:10px solid red; padding:10px;** 那么最终 div 容器的实际宽度为：

   ```
   100px(width)+2*10px*(padding)+2*10px(border)=140px
   ```

   所以你会得到一个比你预期（100px）还要更大的容器，结果就是会破坏网页布局。

   **注**：容易 margin 的尺寸不会被计算入最终容器宽度，因为对他的定义为对这个容器的留白，但不属于容器本身。

   如果当我们定义一个容器的 box-sizing 属性为 border-box 时（表达式：br{box-sizing:border-box} ），那么我们创建一个和上段中相同设置的 <div> 容器时，那么他的最终宽度即为 100px, 那么它的内容部分(content)的有效宽度变成了 **100px-2\*10px-2\*10px =60px;** 所以你会得到一个你预期大小的盒子容器，但是只是被压缩了内容部分尺寸而已，但是对于整体布局而言益处颇多。

   

#### JavaScript

1. ##### 掌握 querySelectorAll() 方法的使用以及相关知识（例如：它是数组还是类数组对象？如何使用 ES6 方法将其转化为真正的数组？）

   获取文档中class="example"的所有元素。

   ```javascript
   var x = document.querySelectorAll(".example");
   ```

   它将符合条件的元素封装到一个数组中返回，返回值为NodeList对象，我们若要查找具体元素，就必须使用索引。

   ```javascript
   //本例中选择所有class为controls下的input元素
   //使用ES6胖箭头函数，forEach对每个元素执行一次添加事件监听
   const inputs = document.querySelectorAll('.controls input');
   inputs.forEach(input => input.addEventListener('change' ,handleChange));
   ```

2. ##### 掌握 dataset 的使用技巧

   应用自定义属性data-：

   ```html
   <div id="day-meal-expense" data-drink="tea" data-food="noodle" data-meal="lunch">$18.3</div>
   ```

   获取某个属性的值，可以使用dataset对象：

   ```javascript
    var expenseday=document.getElementById('day-meal-expense');
    var typeOfDrink=expenseday.dataset.drink;
    console.log(typeOfDrink);//tea
    console.log(expenseday.dataset.food);//noodle
    console.log(expenseday.dataset.meal);//lunch
   ```

   本例中js代码获取的this.dataset.size，就是html代码中相框宽度、模糊度的data-size，即data[size]=px；

   参考：[关于javascript中dataset的问题小结](https://www.jb51.net/article/74886.htm)

3. ##### 掌握 ES6 模板字符串的使用

4. ##### 掌握 ES6 胖箭头函数的使用

5. ##### 掌握 this 的使用和指向问题

   将this的指向问题学习整理，写了一篇博客[javascripts中this的指向]([https://61hhh.github.io/2020/04/10/javascripts%E4%B8%ADthis%E7%9A%84%E6%8C%87%E5%90%91/](https://61hhh.github.io/2020/04/10/javascripts中this的指向/))

6. ##### 熟悉 setProperty() 方法的使用

   setProperty() 方法用于设置一个新的 CSS 属性，同时也可以修改 CSS 声明块中已存在的属性。语法：

   ```javascript
   object.setProperty(propertyname, value, priority);
   ```

## 涉及特性

- [`:root`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:root)
- `var(--xxx)`：CSS 变量（[CSS Variables](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_variables)）
- `filter: blur()`
- 事件 `change`、`mousemove`

## 过程指南

### CSS 部分准备

1. 声明全局（`:root`）的 CSS 变量
2. 将变量应用到页面中对应元素 `<img>` 
3. 处理标题的 CSS 值

### JS 实时更新 CSS 值
1. 获取页面中 `input` 元素
2. 给每个 `input` 添加监听事件，使其在值变动，触发更新操作
3. 同 2 ，添加鼠标滑过时的事件监听
4. 编写处理更新操作的方法
	1.  获取参数值后缀
	- 获取参数名（blur、spacing、color）
	- 获取参数值（12px、#efefef）
	- 赋值给对应的 CSS 变量

## 基础知识

1. NodeList 和 Array 的区别

	可以打开 __proto__ 查看它的方法，其中有 `forEach()`、`item()`、`keys()` 等。而 Array 的 prototype 中有 `map()`、`pop()` 等数组才有的方法。
	
3. HTML5 中的自定义数据属性 `dataset`

	HTML5 中可以为元素添加非标准的自定义属性，只需要加上 `data-` 前缀，可以随便添加和命名。添加之后，可以通过元素的 `dataset` 属性来访问这些值，`dataset` 的值是 DOMStringMap 的一个实例化对象，其中包含之前所设定的自定义属性的“名-值”对。
	
4. [CSS variable](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_variables)

	这是一个 CSS3 的新特性，[IE 和 Edge 目前都还不支持](http://caniuse.com/#feat=css-variables)。命名写法是 `--变量名`，在引用这个变量时写法是 `var(--变量名)`。具体实例见下一条代码。
	
5. `:root` 伪类

	这个伪元素匹配的是文档的根元素，也就是 `<html>` 标签。
	
	所以常用于声明全局的 CSS 变量：
	
	```css
	:root {
	  --color: #fff;
	}
	```
	
	在使用时：
	
	```css
	img {
	  background: var(--base);
	}
	```
	
5. CSS 滤镜 [filter](https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter)

	CSS 的滤镜提供了一些图形特效，比如高斯模糊、锐化、变色等。它带有一些预设的函数，在使用时加上参数调用这些函数即可。[在 Chrome、Firefox 中都支持。](http://caniuse.com/#search=filter)

## 解决难点

1. **如何处理参数值（一个有 px 、另一个没有）**

	运用 `dataset` 储存后缀，有 px 后缀的标签中设置 `<input data-sizing: px>`：
	
	```html
	<input type="range" name="blur" min="0" max="25" value="10" data-sizing="px">
    <input type="color" name="base" value="#8aa8af">
	```
	
	JS 中通过 `dataset.sizing` 来获取后缀值：

	```javascript
	const suffix = this.dataset.sizing || ''; 
	```
	
	此时 suffix 获取到的值，针对颜色为空，而针对长度类的则为 'px'。
	
2. 	**如何用 JavaScript 改变 CSS 属性值？**

	在 JavaScript 中 `document.documentElement` 即代表文档根元素。所以要改变全局的 CSS 变量，可以这样写：
	
	```js
	document.documentElement.style.setProperty('--base', '#fff');
	```