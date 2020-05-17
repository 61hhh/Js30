# 23 Speech Synthesis 中文指南

> 作者：61hhh 
> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。

## 挑战任务
初始文档`index-start.html`提供了一个阅读器，你需要完成如下编程任务：   
1.使用相应的WebAPI接口获得浏览器支持的语言种类列表，并填充至页面的下拉菜单中，选择中文;   
2.在文本域中输入对应语言的文字，点击`speak`按钮后浏览器会阅读输入的文字；   
3.在浏览器阅读时，点击`stop`按钮，浏览器会停止阅读；   
4.拖动`rate`和`pitch`滑块可改变阅读速度和音高。

## 相关知识   
1.`SpeechSynthesisUtterance`接口   
  本接口用于设置阅读器阅读的配置参数，包括语言，阅读速度，语调等，实例化`SpeechSynthesisUtterance`后，可以通过为其属性赋值来完成参数配置，详细信息请直接参考MDN中的[SpeechSynthesisUtterance接口说明](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance)。   
2.`SpeechSynthesis`接口   
  本接口用于控制阅读器行为，包括获取浏览器支持的朗读语言，文本朗读，暂停，停止等，接口属性中定义有paused,speaking等只读属性来表明当前的状态,详细使用方式请参考MDN中的[SpeechSynthesis接口说明](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis)。

## 编程思路
    本次编程任务使用相应接口的最基本功能即可实现，编程中根据挑战任务中的说明逐步实现即可。

## 过程指南
1.取得`speechSynthesis`对象，并取得浏览器支持的朗读语言，将所有支持的选项动态添加至下拉列表
```js
//将获取支持语言并添加至下拉列表的代码段封装在一个函数中
  function populateVoices() {
    voices = this.getVoices();//获取系统支持的语言
    voicesDropdown.innerHTML = voices
      .filter(voice => voice.lang.includes('en'))//筛选器选取语言，注释掉就会显示所有语言
      .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
      .join('');
  }

//由事件触发该函数。
  speechSynthesis.addEventListener('voiceschanged', populateVoices);
```
2.点击`speak`按钮后朗读（为方便说明，以下代码段与所提供的完成代码顺序不完全一致）   
```js
//实例化配置对象
 const msg = new SpeechSynthesisUtterance();

//获取默认的朗读内容
 msg.text = document.querySelector('[name="text"]').value;

//点击speak按钮时阅读文字
  function play() {
    stop();
      speechSynthesis.speak(msg);
  }

//将阅读函数绑定至`speak`按钮的点击事件上
  speakButton.addEventListener('click', play);
```
3.点击`stop`按钮停止朗读
```js
//停止朗读
  function stop() {
    speechSynthesis.cancel();
  }
//将停止朗读函数绑定至`stop`按钮的点击事件上
  stopButton.addEventListener('click', stop);
```
4.参数配置可更改   
```js
//index-start.html中提供的选择器将返回rate值,pitch值以及阅读内容对应的DOM元素
  const options = document.querySelectorAll('[type="range"], [name="text"]');
//将阅读参数赋值至msg的同名实例属性
  function setOption() {
    console.log(this.name, this.value);
    msg[this.name] = this.value;
    play();
  }
  options.forEach(option => option.addEventListener('change', setOption));
```




