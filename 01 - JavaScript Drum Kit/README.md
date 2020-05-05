## Day1 有趣的架子鼓小游戏

### 任务描述

实现一个可以互动的架子鼓游戏，敲击键盘时会发出相应的音效，如果你是个大神，最后就会产生美妙动听的音乐哦~来试试吧。

### 目的知识

####  HTML

1. ##### 掌握 data-* 自定义属性的使用

   html5中可以使用data-来设置自定义属性，进行数据存放，即以data-为前缀加上自定义属性名

   ```html
   <div id="root" data-age="25">
   ROOT
   </div>
   ```

   之后可以通过js脚本获取/设置自定义属性，也可以用CSS属性选择器进行样式设计

   [HTML data-* 自定义属性](https://www.cnblogs.com/dolphinX/p/3348458.html)

2. ##### 了解 `<kbd></kbd>` 标签的用法

   该标签表示文本是从键盘上键入的，浏览器通常用等宽字体显示该标签中的文本

3. ##### 掌握 `<audio>` 标签的使用

   该标签定义声音，比如音乐或其他音频流，该标签是html5的新标签

#### CSS

1. ##### 掌握 vh、vm 为单位的宽高使用

   vw：相对于视口的宽度。视口被均分为100单位的vw（即浏览器可视区）100vw=可视区宽度 

   vh：相对于视口的高度。视口被均分为100单位的vh（即浏览器可视区）100vh=可视区高度

2. ##### 掌握 flexbox 的语法及使用

   [菜鸟教程-FlexBox](https://www.runoob.com/css3/css3-flexbox.html) 

   flexbox弹性盒子是CSS3的一种新的布局模式，保证当页面需要适应不同的屏幕大小及设备类型时确保元素拥有恰当行为的布局。 由弹性容器flex container和弹性子元素flex item组成，弹性容器内包含了多个弹性子元素 注意： 弹性容器外及弹性子元素内是正常渲染的。弹性盒子只定义了弹性子元素如何在弹性容器内布局。 弹性子元素通常在弹性盒子内一行显示。默认情况每个容器只有一行。

3. ##### 掌握 rem 为单位的根元素字体大小

   rem是CSS3新增的一个相对单位，它与em的区别在于，使用rem为元素设定字体大小时，仍是相对大小，不过相对的是HTML根元素，通过rem可以做到只修改根元素就成比例调整所有字体的大小，还可以避免字体大小逐层符合的连锁反应

4. ##### 掌握 transtion 和 transform 的用法

   [探究CSS3中的transition和transform属性](https://www.jianshu.com/p/80f6051389bd)

   - transform是转换，值改变所在元素的外观，它有很多手段(转换函数)来实现，比如位移、缩放、旋转等，转换是一瞬间完成的
   - transition是过渡，指某个CSS属性值怎样平滑的改变，就是常说的动效，改变有一个过程。

   ```css
   transition: [属性名] [持续时间] [速度曲线] [延迟时间];
   transition: height 2s ease .5s;//高度属性的值改变时，延时0.5秒后以ease曲线过渡，持续2秒
   // 等同于
   transition-property: width;
   transition-duration: 2s;
   transition-timing-function: ease;
   transition-delay: .5s;
   ```

   

5. ##### 了解 text-transform 的使用

   text-transform属性控制文本的大小写

   常见值：none--默认；capitalize--大写字母开头；uppercase--仅有大写字母；lowercase--仅有小写字母；inherit--从父元素继承该值。

#### JavaScript

1. ##### 掌握 querySelector()、querySelectorAll() 方法的使用

   HTML 的DOM querySelector()方法可以不需要额外的jQuery等支持，也可以方便的获取DOM元素，语法跟jQuery类似。

   querySelector() 方法仅仅返回匹配指定选择器的第一个元素。如果要返回所有的元素，就querySelectorAll() 方法替代。

2. ##### 掌握 classList 的使用

   classList 属性返回元素的类名，作为 DOMTokenList 对象。该属性用于在元素中添加，移除及切换 CSS 类。

   classList 属性是只读的，但你可以使用 add() 和 remove() 方法修改它。

   ```javascript
   增加 class — node.classList.add()
   
   删除 class — node.classList.remove()
   
   切换 class — node.classist.toggle()
   
   判断 class — node.classist.contains()
   ```

   

3. ##### 掌握 audio 在 JavaScript 中的方法

   audio元素可以在html中加入，也可以用js动态加载audio。本例中就是通过querySelector()方法来匹配对应按键的keycode加载audio元素

   ```javascript
   const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
   ```

   本例中使用audio.play()实现播放，更多的例如暂停audio.pause()，至于停止要用到设置currentTime

   ```javascript
   // currentTime 指示当前的播放的位置为 0 秒
   // 目的是为了在按下按键时重复地播放 0 秒位置的声音，这样就不需要等待当前音频播放完成
   audio.currentTime = 0;
   // 播放音频
   audio.play();
   ```

   

4. ##### 掌握 addEventListener() 方法的使用

   addEventListener()方法用于事件监听，可以使用removeEventListener()移除

   ```javascript
   element.addEventListener(event, function, useCapture);
   ```

   某一事件发生时分为3阶段

   捕获阶段——从根节点开始顺序而下至目标节点，检测每个节点是否注册了事件处理程序。如果注册了事件处理程序，并且 useCapture 为 true，则调用该事件处理程序。

   目标阶段——触发在目标对象本身注册的事件处理程序，也称正常事件派发阶段。

   冒泡阶段——从目标节点到根节点，检测每个节点是否注册了事件处理程序，如果注册了事件处理程序，并且 useCapture 为 false，则调用该事件处理程序。

5. ##### 掌握 ES6 中模板字符串的使用方法

   js可以使用双引号（""）和 + 来拼接输出模板，不过较为麻烦，举个例子：

   ```javascript
   $("#result").append(
           "He is <b>"+person.name+"</b>"+"and we wish to know his"+person.age+".That is all" 
           );
   ```

   因此ES6中提供了**模版字符串，****用`（反引号）标识，用${}将变量括起来。上面的例子可以用模版字符串写成下面这样：

   ```javascript
   $("#result").append(
           `He is <b>${person.name}</b>and we wish to know his${person.age}.that is all`
           );
   
   ```

   

6. ##### 掌握 ES6 中的胖箭头函数写法

   胖箭头函数是ES6新增的一种函数，相当于一个匿名函数，并简化了函数定义，它有两种格式：

   - 只含一个表达式，省略了{...}和return

   - 含多个语句，需要{...}和return

     

7. ##### 学习并掌握事件代理相关知识

   事件代理也叫事件委托，事件委托是利用事件的冒泡原理来实现的，何为事件冒泡呢？就是事件从最深的节点开始，然后逐步向上传播事件，即本来在子元素上的事件加到父级上。

   事件代理可以将原本在多个子元素中进行的DOM操作放到js程序中，改为只对父级这一个对象操作，与DOM的操作就只需要一次交互，能大大减少与DOM的交互次数，提高性能。原本要为子元素for循环添加事件现在可以省略，而且新增的子元素也不用添加事件了。

   [简述Js事件委托](https://www.jianshu.com/p/a77d8928c5c9)

8. ##### 了解 transitionend 

   `transitionend` 事件会在 [CSS transition](https://developer.mozilla.org/en-US/docs/CSS/Using_CSS_transitions) 结束后触发. 当transition完成前移除transition时，比如移除css的[`transition-property`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition-property) 属性，事件将不会被触发.如在transition完成前设置 [`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 为"`none"`，事件同样不会被触发。

   `transitionend` 事件是双向触发的 - 当完成到转换状态的过渡，以及完全恢复到默认或非转换状态时都会触发。 如果没有过渡延迟或持续时间，即两者的值都为0s或者都未声明， 则不发生过渡，并且任何过渡事件都不会触发。如果触发了 `transitioncancel` 事件，则`transitionend` 事件不会触发。

### 项目实现

2.1 键盘事件

2.2 播放声音

2.3 改变样式

### 步骤分解

1. **添加键盘事件监听**。在 window 上添加键盘 `keydown` 事件。
2. **对应事件处理程序。**
   1. **获取键码**
   2. **用 `querySelector` 获取元素**
   3. **获取 `data-key` 为对应键码的元素**
   4. **处理元素**。播放音频、添加样式。
3. **为所有的 `div.key` 添加 `transitionened` 事件**。
   1. **获取所有样式为 `key` 的元素**
   2. **为其添加事件监听**
4. **去除样式的事件处理程序**

### 解决难点

#### 将键盘按键与页面按钮对应

连接的帮手是 ``keydown`` 事件中的 `keyCode` 属性，`keyCode` 属性的值和 ASCII 编码值相同（对应小写字母）。在[这个网站]( http://keycode.info/ )可以用按键盘来查看对应的键码。

我们能获取到的初始页面中，按钮 `div` 和音频 `audio` 标签中都添加了一个属性 `data-key` 用于存储对应的键码，这样做的目的是，添加键盘事件监听后，触发键盘事件时即可获取事件的 `keyCode` 属性值，以此为线索，操作对应的按钮及音频。

````javascript
const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
````

#### 按键被按住不放时，可以马上响起连续鼓点声

每次播放音频之前，设置播放时间戳为 0：

````javascript
audio.currentTime = 0;
audio.play();
````

#### 如何使页面按钮恢复原状

利用一个叫 [`transitionend`](https://developer.mozilla.org/zh-CN/docs/Web/Events/transitionend) 的事件，它在 CSS transition 结束后会被触发。我们就可以利用这个事件，在每次打鼓的效果（尺寸变大、颜色变化）完成之后，去除相应样式。

在这个页面中，发生 `transition` 的样式属性不止一个（`box-shadow`, `transform`, `border-color`），所以需要添加一个判断语句，使每发生一次按键事件时，只去除一次样式。

````javascript
  function removeTransition(e) {
    if(e.propertyName !== 'transform') return false;

    this.classList.remove('playing');
  }
````

