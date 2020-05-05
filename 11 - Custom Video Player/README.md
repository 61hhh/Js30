# 11 自定义视频播放器

> 作者：61hhh 
> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。

## 实现目标

![](http://img.salute61.top/11.png)

实现一个自定义的控制条，项目本身并没有太多的逻辑结构，主要是关于`video`标签和相关函数的使用。

* 为 `video` 元素添加自定义样式的播放控制面板
    * 可滑动调节音量、播放速度
    * 可通过按钮快进、回退
    * 可点击视频画面或按钮播放或暂停视频播放
    * 可点击或拖动进度条选择视频播放进度

## 解决思路

作者提供了html和CSS的基础代码，因此我们主要做的就是添加Js代码，简化思路就是：

- 获取对应操作的元素
- 为对应动作添加操作事件

## 知识点
* `video` 对象的各种属性、方法和事件
	* `paused`
  	* `play()`
  	* `pause()`
  	* `currentTime`



## 过程指南

### 关于函数耦合

[维基百科：耦合性]([https://zh.wikipedia.org/wiki/%E8%80%A6%E5%90%88%E6%80%A7_(%E8%A8%88%E7%AE%97%E6%A9%9F%E7%A7%91%E5%AD%B8)](https://zh.wikipedia.org/wiki/耦合性_(計算機科學))：无论是小代码，或者大程序，code环节都有一个要求——高内聚低耦合。

在作者的`js`代码中，他将很多功能都各自写作一个函数，通过视频本身的状态作为参数，这样可以降低函数模块的耦合性，便于修改维护等操作。

### **播放/暂停**

#### 功能实现
视频最主要的功能自然就是播放和暂停了，而且其他功能也需要视频播放之后才能看出效果，所以我们先来实现这个功能。
`video` 对象有一个叫 `paused` 的属性来判断视频是否在播放；另外还提供了两个方法来进行播放和暂停的操作：`.play()` 方法可以播放视频，`.pause()` 方法暂停播放。可以根据视频的播放状态来判断该执行哪个：

```javascript
function togglePlay() {
    //中括号取元素属性值,更简洁
    const method = video.paused ? 'play' : 'pause';
    video[method]();
    
    // if(video.pause){
    //     video.paly();    
    // }else{
    //     video.pause();
    // }
}

video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
```

相比我们一般的`if else`判断的写法，作者采用中括号取元素属性值的方法明显更为简洁。

#### **图标切换**
为了让用户知晓播放器状态，我们需要直观地通过图标来展示。当然，我们可以在 `togglePlay()` 方法中处理，不过更好的方式是给播放器加上另一个事件监听，用视频本身的播放状态来判断。

这是因为，除了点击播放/暂停按钮以外，我们还可以通过比如键盘快捷键、第三方插件甚至耳机上的操作按钮等其他方式来控制。因此，通过视频本身的播放状态来判断是最不容易出错的。代码如下：

```javascript
// 操作
function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}
// 事件
video.addEventListener('play', updateButton)；
video.addEventListener('pause', updateButton)；
```

上面的代码中，我们使用了关键字 `this`。其实在调用 `updateButton` 的时候，这个方法已经被绑定在了 `addEventListener` 的调用者上，也就是绑定到了 `video` 上。因此，`this.paused` 在这里就相当于 `video.paused`。

### **快退/快进**
在 HTML 中，我们已经给快退/快进键添加了一个 `data-skip` 属性，对应的值即为快退/快进的秒数。

我们先来写事件处理。首先要有一个回调函数，叫 `skip`。事件监听的对象，当然是 `skipButtons`，对应的就是快退/快进两个按键。可以尝试一下，如果我们直接在命令行输出这个 `skipButtons`，会得到一个数组。因此，我们需要用 `forEach` 来遍历一下，给每一个按钮都添加上事件监听：

```javascript
// 逻辑
function skip() {
    //修改video的currentTime属性值来设置视频的当前播放时间
   video.currentTime += parseFloat(this.dataset.skip);
}
// 事件
skipButtons.forEach(button => button.addEventListener('click', skip));
```

**注意：**这里就不能用 `this` 来访问 `video` 对象了，因为在这里面，`this` 指向的是遍历得到的每一个 `button`，而我们是要修改 `video` 的 `currentTime` 属性。

`data-**` 作为自定义的属性之前的challenge中有涉及到，在 JavaScript 中需要通过 `.dataset.**` 来访问。因为我们获取到的是字符串，所以要通过 `parseFloat` 来转换一下。

### **音量和播放速度**
`volume和playbackRate`属性是通过`input`元素设置为`range`类型行实现的，并且直接把他们的`name`属性设置为`volume和playbackRate`，因为他们是 `video` 对象里对应音量和播放速度的两个属性名。这样起名并不是必须的，但可以让我们后面 js 的操作更精简。

通过监听两个 `input` 元素的 `change` 事件，我们就可以通过其 `value` 值改变视频属性了：

```javascript
function handleRangeUpdate() {
    video[this.name] = this.value;
}

//遍历 ranges 给两个滑动条都绑定事件
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
```
在html代码中将`input` 的 `name` 值和 `video` 对象中的属性名设置为一样的，这样在 `handleRangeUpdate` 函数中就可以利用 `this.name` 的写法来代表属性，这里的 `this` 一样是 `addEventListener` 的调用者，即 `range`。

由于 `change` 事件只在 `blur`，也就是元素失去焦点的时候才会触发，会造成放开滑鼠才能生效的情况。可以同时监听鼠标在该元素上的 `mousemove` 事件来执行更新的操作。

### **进度条操作**
我们的进度条需要能在鼠标点击和拖动的时候改变视频播放的进度。我们先实现进度条随着视频播放更新进度的功能。

进度条显示进度的原理很简单，`progress__filled` 这个元素是一个 `flex` 定位的元素，我们改变其 `flex-basis` 的百分比值就可以调节它所占父元素的宽度。`flex-basis` 值代表 `flex` 元素在**主轴**方向上的初始尺寸。关于 `flex-basis` 的更多信息请参考 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-basis)；

同时随着视频的播放，进度条也应该自动的改变，也许你会想到利用 `setInterval` 设置一个定时器，其实 `video` 元素给我们提供了更好的方法—— `timeupdate` 事件。这个事件会在媒体文件的 `currentTime` 属性改变的时触发，更多信息请参考 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/Events/timeupdate)。

```javascript
// 根据当前播放时间来调节进度条
function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}
video.addEventListener('timeupdate', handleProgress);
```
还有就是我们需要实现播放进度条可控，这样点击、拖动进度条使得播放进度随之改变，对应的逻辑就是获取宽度就需要得到鼠标点击的位置，这可以通过事件对象的 `offsetX` 属性来找到，该属性代表鼠标点击位置相对于该元素的水平偏移。得到偏移之后计算出该位置的百分比，那么也就知道了进度的百分比，对于拖动可以通过设置一个标志来判断当前是否出于拖动状态，然后配合 `mousedown`、`mouseup` 事件来更新这个标志：

```javascript
...
// 根据点击位置设置播放时间
function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
```

实际使用的时候会发现拖拽和视频的更新并不是实时的，会有一定延迟，这是因为 `mousemove` 事件触发的频率非常高，视频更新的速度跟不上。

**注：**拖动`mousemove`时，要有`mousedown`才会执行`scrub(e)`，即拖动时鼠标应处于按下状态，这时才会调用scrub()函数修改进度条。

## 拓展

### 实时时间显示

本来是在一个`div`中设置两个`span`标签来显示，但是出现了F12控制台看得到数字显示，而视频中看不到的情况

```html
<div class="timer">
	<span class="progress_timer">00:00:00</span>/
	<span class="duration_timer">00:00:00</span>
</div>
```

改用`button`直接显示，不太好看不过可以看到结果：

```html
<button class="progress_timer" >00:00:00</button>
<button class="total_timer">00:00:00</button>
```

获取两个标签的元素，然后设置一个`let {totalT,presentT}`变量，添加两个对应事件，获取两个时间，一个是总时间一个是当前时间，，赋值给元素。其中格式转换函数`formatTime(t)`用于设置时间格式。主要用到的函数

- `this.duration`
- `this.currentTime`

```javascript
const progressTimer = document.querySelector('.progress_timer')
const durationTimer = document.querySelector('.total_timer')

let {totalT,presentT} = {totalT:0,presentT:0}
video.addEventListener('canplay',function(){
	totalT = this.duration
	var videoDuration = formatTime(totalT)
	durationTimer.innerHTML = videoDuration
})
video.addEventListener('timeupdate',function(){
	presentT = this.currentTime
	var videoCurrent = formatTime(presentT)
	progressTimer.innerHTML = videoCurrent
})
function formatTime(t){
	var h = parseInt(t/3600)
	h = h<10?'0'+h:h 
	var m = parseInt(t%3600/60)
	m = m<10?'0'+m:m
	var s = parseInt(t%60)
	s = s<10?'0'+s:s
	return h+':'+m+':'+s
}
```

### 全屏功能

参照上面添加一个`button`用于点击全屏，获取元素后，添加点击事件，如果采用`video.webkitRequestFullScreen()`会覆盖进度条，因此改为使用`player.webkitRequestFullScreen()`

```html
<button class="expand">[👈👉]</button>

const expand = document.querySelector('.expand');
expand.addEventListener('click',function(){
    player.webkitRequestFullScreen()
})
```

