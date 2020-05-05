# 07 Array Cardio 💪 指南二

> 作者：61hhh
>
> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。

## 实现效果

这一部分继续熟悉 Array 的一些基本方法，包括 `some()`、`every()`、`find()`、`splice()`、`slice()`。

文档提供了用于操作的 people 和 comments 数组，模拟的是人员信息及评论数据，基于这两个数组可以练习一下上面提及的各个方法。

## 过程指南

针对 people 数组：

1. 是否有人超过 19 岁？
2. 是否所有人都是成年人？

针对 comments 数组：

1. 找到 ID 号为 823423 的评论
2. 删除 ID 号为 823423 的评论
	1. 获取此 ID 对应元素在数组中所处的位置
	2. 利用位置，删除该子元素
	2. 或者拼接新的数组
	
## 相关知识

### [some](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some) 和  [every](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every)

两者的相同之处是，都接受一个函数作为参数，对数组元素都执行一次此函数，都不会改变原数组的值。不同之处在于返回条件不同：

`some()` 中直到某个数组元素使此函数为 `true`，就立即返回 `true`。所以可以用来判断一个数组中，是否存在某个符合条件的值。

```js
    const someAns = people.some(p => {
      return new Date().getUTCFullYear - p.year >= 19 ;
    })
    console.log(someAns);
```

而 `every()` 中除非所有值都使此函数为 `true`，才会返回 `true` 值，否则为 `false`。主要用处，即判断是否所有元素都符合条件。

```js
    const everyAns = people.every(p => {
      return new Date().getUTCFullYear - p.year >= 19 ;
    })
    console.log(everyAns);
```

与 `some()` 相对应的话，`some()` 像是或运算，而 `every()` 则是与运算了。

### [find](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/find) 和 [fineIndex](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)

这两个 ES6 的新特性类似于 `some()` ，但对于符合条件的元素，返回值不是布尔类型。不一样的地方在于，`find()` 返回的是这个元素的值（或 `undefined`），而 `findIndex()` 返回的是这个元素的索引（或 `-1`）。

```js
	const comment = comments.find(comment => comment.id == 823423);
	const index = comments.findIndex(comment => comment.id == 823423);
```

### [slice](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) 和 [splice](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)

这两者比较相似的地方，大概只有：参数的第一个都是指的起始位置，且都接受负数，若是负数，代表倒数第几位。

而其他地方是需要区分清楚的：

- `slice()`：不修改原数组，按照参数复制一个新数组，参数表述复制的起点和终点索引（省略则代表到末尾），但终点索引位置的元素不包含在内。
- `splice()`：原数组会被修改。第二个参数代表要删掉的元素个数，之后可选的参数，表示要替补被删除位置的元素。

所以想要删除一个元素，有两种实现思路，一是把出它之外的元素给复制下来再合在一起，二是直接把它删除。

```js
	// 删除方法一，splice()
	comments.splice(index, 1);
	
	// 删除方法二，slice 拼接
	const newComments = [
		...comments.slice(0, index),
		...comments.slice(index + 1)
	];
```

上面的三个点（`...`）是 [ES6 中的扩展语法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_operator)，可以展开这个数组并方便的拼接。
