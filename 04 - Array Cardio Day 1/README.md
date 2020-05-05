1. ## Day4 Array prototype 方法学习

   ### 任务描述

   使用 Array.prototype.method() 来完成挑战吧！在此挑战中，你能学会使用 Array 的原型方法来简化代码的书写，包括但不限于 filter()、map()、sort()、reduce() 等方法的学习和实践。

   ### 任务目的

   #### JavaScript

   1. ##### 熟练掌握 filter() 方法的使用

      概述：**filter()** 方法使用指定的函数测试所有元素，并创建一个包含所有通过测试的元素的新数组。

      ```javascript
      let a = [1,2,3];
      console.log(a.filter(x => x > 2)); // [3]
      ```

      

   2. ##### 熟练掌握 sort() 方法的使用

      概述：**sort()** 方法对数组的元素做排序，并返回这个数组。 sort 排序可能是不稳定的。默认按照字符串的Unicode 码位点（code point）排序，即将元素转换为字符串再比较它们的UTF-16代码单元值序列时构建，因为它取决于具体实现，因此无法保证排序的时间和空间复杂性

      ```javascript
      let a = [1,12,11,16,122];
      console.log(a.sort());//[1,11,12,122,16]
      ```

      

   3. ##### 熟练掌握 map() 方法的使用

      概述：**map()** 方法返回一个由原数组中的每个元素调用一个指定方法后的返回值组成的新数组。

      ```javascript
      let a = [1,2,3];
      console.log(a.map(x => x + 1));  // [2, 3, 4]
      ```

      

   4. ##### 熟练掌握 reduce() 方法的使用

      **reduce()** 方法接收一个函数作为累加器（accumulator），数组中的每个值（从左到右）开始合并，最终为一个值。

      ```javascript
      const a = [1,2,3];
      console.log(a.reduce((x,y) => x * y)); // 6
      ```

      

   5. ##### 掌握额外的例如 includes()、forEach()、slice() 等方法的学习

      概述：**forEach()** 方法对数组的每个元素执行一次提供的函数(回调函数)。

      ```javascript
      let a = [1,2,3];
      a.forEach( x => {
          console.log(x + 1);
      });
      // 2
      // 3
      // 4
      ```

      概述：**includes()** 方法用来判断当前数组是否包含某指定的值，如果是，则返回 true，否则返回 false。

      ```javascript
      let a = [1,2,3];
      a.includes(2);  // true
      a.includes(4);  // false
      ```

      概述：**slice()** 方法会浅复制（shallow copy）数组的一部分到一个新的数组，并返回这个新数组。

      ```javascript
      const a = [1,2,3];
      const b = a.slice(0);
      console.log(b);  // [1, 2, 3]
      ```

      

   ### 参考资料

   1. [MDN Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)
   2. [Hushaby丶 的简书 —— 引用类型之 Array（一）](http://www.jianshu.com/p/9546aa0d1c33)
   3. [Hushaby丶 的简书 —— 引用类型之 Array（二）](http://www.jianshu.com/p/8dd1af6d868e)
