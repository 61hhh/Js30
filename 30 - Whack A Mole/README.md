# 30 Whack A mole中文指南

> 作者：61hhh 
> 简介：[JavaScript30](https://javascript30.com) 是 [Wes Bos](https://github.com/wesbos) 推出的一个 30 天挑战。项目免费提供了 30 个视频教程、30 个挑战的起始文档和 30 个挑战解决方案源代码。目的是帮助人们用纯 JavaScript 来写东西，不借助框架和库，也不使用编译器和引用。

## 挑战任务
写一个打地鼠小游戏，在指定时间内，随机的冒出地鼠，点击会加分

原FINISH的地鼠冒出是通过添加一个up的class来实现，这样弊端就是可以直接F12在控制台中修改，相当于作弊

## 编程思路  

基本思路就是获取元素对象，然后设置倒计时、随机mole，点击冒起的mole时加分，由于原FINISH可以直接在控制台修改，因此可以通过Proxy来操作，保证对mole的操作都是通过Proxy执行

## 过程指南   
1.获取得分板，地鼠所在的`div`元素，设置地鼠状态

```js
  const scoreBoard = document.querySelector('.score');
  const moles = [...document.querySelectorAll('.mole')];
  const status = moles.reduce((prev,current,index)=>{
    prev[index] = false;
    return prev;
  },{});
```

2.由于start的button直接使用了`onClick="startGame()"`形式，因此添加对应的startGame函数

```js
  let score = 0;//得分
  let timeUp = true;//计时结束

  const setScore = function(s){
    score = s;
    scoreBoard.textContent = score;
  }
  const startGame = function(){
    if(!timeUp) return;
    setScore(0);
    timeUp = false;
    getRandomMole();//随机冒地鼠
    setTimeout(()=>{
      (timeUp = true) , alert("time is up!");
    },10000);
  };
```

3.增加设置地鼠函数、随机函数

```js
  const setMole = function(mole,time){
    molesProxy[mole] = true;
    setTimeout(()=>{
      if(!timeUp) getRandomMole();
    },500);
    setTimeout(()=>{
      molesProxy[mole] = false
    },time);
  };

  const getRandomMole = function(){
    const mole = Math.floor(Math.random() * moles.length);
    const time = Math.random() * (1500-1000) + 1000;
    if(molesProxy[mole]) return getRandomMole();
    setMole(mole,time);
  };
```

4.增加Proxy代理、点击地鼠的事件

```js
  const clickHandler = function(){
    if(molesProxy[moles.indexOf(this)]){
      setScore(score+1);
      molesProxy[moles.indexOf(this)] = false;
    }
  };

  const molesProxy = new Proxy(status,{
    get(target,key){
      return target[key];
    },
    set(target,key,value){
      target[key] = value;
      moles[key].removeEventListener("click",clickHandler);
      if(value){
        moles[key].addEventListener("click",clickHandler);
        moles[key].classList.add("up");
      }else{
        moles[key].classList.remove("up");
      }
    }
  });
```



