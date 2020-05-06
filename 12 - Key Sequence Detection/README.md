# 12 键盘输入序列的验证指南

> 作者：61hhh 
> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。

## 实现效果

初始文档里仅仅提供了一个 `script` 标签，供我们从 [Cornify.com](https://www.cornify.com/) 加载一个 JS 文件，调用其中的 `cornify_add()` 方法时，会在页面中追加 `p` 标签，并在 DOM 中插入一个图标。

由于网络问题cornify.js载入不了，网站访问都进不去，所以改了一下增加两个`p`标签，当暗号正确就修改标签内容

而这个挑战要实现的效果是，当在此页面完整输入了“暗号”（一串事先定义好的字符串）时，生成新的 Cornify 特效。

## 解决思路

1. 指定可激发特效的字符串`secretCode`
2. 监听并获取输入的字符`input`
3. 处理输入，在符合条件时，调用显示函数`show`

## 过程指南

1. 声明一个空数组，用于存放的输入字符，同时声明“暗号”，暗号是“上上下下左右左右BA”，通过`console.log(e.keycode)`获取按键的`keycode`写入

	````js
	  const secretCode = [38,38,40,40,37,39,37,39,66,65];
	  const input = [];
	````

2. 添加键盘的 `keyup` 事件监听，用箭头函数的参数来接收事件。注意此处的 `keyup` 事件是针对页面的，所以在调试时单击页面后时焦点在页面中才生效，在 Console 面板中是不会触发的。
	```js
	 window.addEventListener('keyup', function(e) {
	 	
 })
	```
	
3. 验证输入的字符。此处方法是将每一个输入的字符存入 `input` 数组，然后处理数组，使其呈现队列的性质，也就是输入一个字符时，会挤出原有的的字符，保证其最大长度始终为 `secretCode` 的长度。这样做的目的是为了便于验证暗号，只有完整无误的输入一次暗号时，才会触发相应的效果。当然这只是其中一种处理办法，也还有其他办法。
	```js
     window.addEventListener('keyup',function(e){
	
	    // console.log(e.key,e.keyCode);
	    input.push(e.keyCode);
	
	    // while(input.length > secretCode.length){
	    //   input.shift();
       // }
       // input = input.splice(-secretCode.length,secretCode.length);
   
       input.splice(
         -secretCode.length - 1, input.length - secretCode.length
       );
   
       console.log(input , secretCode);
       if(input.join(',') === secretCode.join(',')){
         console.log('DING DING!');
         // cornify_add();
         show();
       }
       function show(){
         document.getElementById('result').innerHTML = "⬆⬆⬇⬇⬅➡⬅➡🅱🅰 开启秘籍！"
       }
   
     });
   ```

输入暗号后触发特效的页面也就完成了