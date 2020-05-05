## Day5 制作唯美交互的网页图集

## 实现效果

点击任意一张图片，图片展开，同时从图片上下两方分别移入文字。点击已经展开的图片后，图片被压缩，同时该图片上下两端的文字被挤走。

初始文档的 DOM 结构：以 `.panels` 为父 `div` 之下，有 5 个类名为 `.panel` 的 `div`，这 5 个各含有 3 个子 `p` 标签。而相应的 CSS 样式中，动画时间等特性已经设定好，只需要完成不同状态下的页面布局以及事件监听即可。

## 涉及特性

- display: flex
  - flex-direction
  - justify-content
  - align-items
- transform: translateY()
- element.classList.toggle()
- transitionend 事件

## 过程指南

### CSS 部分

CSS 在这个过程中占了重点，运用 `flex` 可以使各个元素按一定比例占据页面。在调试的时候，可以把边框显示出来方便查看效果。（`border: 1px solid #f00;`）

1. 将 `.panels` 设置为 `display:flex`
2. 设定每个子 panel 的 `flex` 值为 1
3. 针对每个子 panel，设为 `display:flex`，设置其 flex 主轴方向
4. 控制 `.panle` 的子元素 `<p>` 中的文字垂直、水平居中（单独看每个 panel，其中的文字也可以用 flex 的思路来使其三等分后居中）
   1. 设置为 `display:flex`
   2. 设置 `flex` 值
   3. 设置其子元素的布局方式：垂直水平居中（沿主轴、侧轴居中）
5. 设定点击图片后文字移动的样式
6. 设定点击图片展开后的图片的 `flex` 值

### JS 部分

1. 获取所有类名为 `panel` 的元素
2. 为其添加 `click` 事件监听，编写触发事件调用的函数（给触发的 DOM 元素添加/去掉样式，实现拉伸/压缩的效果）
3. 为其添加 `transitionend` 事件监听，编写调用的函数（添加/去掉样式，实现文字的飞入/飞出效果）

## 相关知识

### [Flexbox](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout/Using_CSS_flexible_boxes)

![MDN flexbox 图示](https://mdn.mozillademos.org/files/12998/flexbox.png)

这一个挑战的关键部分就在于理解如何使用 Flexbox，挑战的文档里嵌套了三个 flex 容器，作为弹性盒子，它们各自的作用是：

- `.panels`：使其中的 `.panel` 按横向的 flex 等分排布（此处为五等分）
- `.panel`：使其中的 `<p>` 按纵向的 flex 等分排布（此处为三等分）
- `p` ：借用 flex 相对于主轴及侧轴的对齐方式，使其中的文字垂直水平居中

这里容易混淆的是不同 CSS 属性的应用对象，想区分很简单，只需记住针对容器内子元素的特性较少（只有 5 个），可以这样联想：针对某一个具体的小元素进行设置，可供发挥的空间比较少，而针对 Flex 容器本身，有统筹大局的责任，故特性多一些。下面简单介绍一些基本的特性（没有完全列出）。

#### 针对 Flex items 的特性（Children）

- `flex-growth`：伸展值
- `flex-shrink`：可接受的压缩值
- `flex-basis`：元素默认的尺寸值
- `flex`：以上三个值按顺序的缩写

#### 针对 Flex container 的特性（Parent）

- `display: flex`：将这个元素设置成弹性盒子
- `flex-direction`：主轴方向
  - `row`：横向
  - `column`：纵向
- `justify-content`：沿主轴的的对齐方式
- `align-items`：沿侧轴的对齐方式
- `align-content`：子元素中文本沿侧轴的对齐方式（只有一行时无效）

可以在下面几个地方试一下 Flex 的各种特性：

- [http://demo.agektmr.com/flexbox/](http://demo.agektmr.com/flexbox/)
- [http://the-echoplex.net/flexyboxes/](http://the-echoplex.net/flexyboxes/)
- [http://codepen.io/justd/pen/yydezN](