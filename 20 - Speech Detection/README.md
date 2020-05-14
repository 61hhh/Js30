# 20 Speech Detection 中文指南

> 作者：61hhh 
> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。

## 挑战任务
本次的挑战任务，是利用浏览器内置`Web speech API`,将自己所说的话输出在页面上,仅chrome浏览器支持。  
**说明：**由于只有chrome浏览器实现了该接口，而语音识别需要将捕捉到的信息发送至google服务器进行处理，因此用chrome才能看到效果

## 相关知识
有关语音识别接口`SpeechRecognition`的说明，可查看[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/SpeechRecognition)中的相关解释。

## 基本思路   
1.新建语音识别对象;   
2.开启语音识别服务;   
3.通过监听`result`事件，实时获取捕获到的语音信息;   
4.通过监听`end`事件，当一次语音捕获结束后，重新开启该功能，实现持续的语音监听功能。   

## 过程指南
1.由于目前只有chrome浏览器实现了此功能，故直接使用带有前缀的构造函数来构建一个语音识别对象。   
```js
  const recognition = new SpeechRecognition();
```
2.设置语音识别对象的基本属性，并开启该功能。
```js
speech.interimResults = true;
//返回即时语音，即时语音是指SpeechRecognitionResult.isFinal 为false时捕获到的信息。
speech.lang = 'zh-CN';//设置语音识别类别为英语

	//监听事件
  speech.addEventListener('result', (e) => {
      const results = Array.from(e.results) 
      // e.results中保存的是识别的结果，本来并不是数组，需要将其转换为数组，方便使用其map、join等方法。
        .map(result => result[0])
        .map(result => result.transcript) // 获取到每一段话，是一个数组类型
        .join(''); // 将每一段话连接成字符串
      
      //转换指定的话
      const xcScript = transcript.replace(/日本天皇|新津暴徒|阴间带师/gi, '孙🐶');
      p.textContent = xcScript;
       //将结果输出在页面上
      if (e.results[0].isFinal) {
      	p = document.createElement('p');
      	words.appendChild(p);
    		}
      }

recognition.addEventListener('end', recognition.start);
recognition.start();//开启功能
```
3.监听收到结果事件，将语音识别结果输出在DOM元素上。   
```js
  speech.addEventListener('result', (e) => {
      const results = Array.from(e.results) 
      // e.results中保存的是识别的结果，本来并不是数组，需要将其转换为数组，方便使用其map、join等方法。
        .map(result => result[0])
        .map(result => result.transcript) // 获取到每一段话，是一个数组类型
        .join(''); // 将每一段话连接成字符串
      
      //转换指定的话
      const xcScript = transcript.replace(/日本天皇|新津暴徒|阴间带师/gi, '孙🐶');
      p.textContent = xcScript;
       //将结果输出在页面上
      if (e.results[0].isFinal) {
      	p = document.createElement('p');
      	words.appendChild(p);
    		}
      }
```

由于国内网络原因，可考虑使用[科大讯飞的语音识别sdk](http://www.xfyun.cn/)，感兴趣的同学可自行尝试实现。
