;(function(){
    let timer;
    const buttons = document.querySelectorAll(".timer__controls > button");
    const timeLeft = document.querySelector(".display__time-left");
    const endTime = document.querySelector(".display__end-time");

    const TimeCounter = function(sec){
        // console.log(sec);
        clearInterval(timer);
        const now = new Date().getTime();
        const end = now + sec * 1000;

        //倒数计时
        setCountdown(end);
        //显示最后时间
        showEndTime(end);
    }

    function setCountdown(end){
        clearInterval(timer);
        timer = setInterval(function(){
            const leftTime = Math.floor((end - Date.now()) / 1000);
            if(leftTime >= 0){//计时未结束
                const leftMin = Math.floor(leftTime / 60);
                const leftSec = leftTime % 60;
                // leftSec = leftSec < 10 ? "0" + leftSec : leftSec;
                timeLeft.innerHTML = `${leftMin}:${leftSec}`;
            }else{
                timeLeft.innerHTML = `计时over!`;
                clearInterval(timer);
            }
        },16);
    }

    function showEndTime(time){
        const endDate = new Date(time);
        let hour = endDate.getHours();
        let minutes = endDate.getMinutes();
        // minutes = minutes < 10 ? "0" + minutes : minutes;
        endTime.innerHTML = `结束时间： ${hour}:${minutes}`;
    }
    
    //设置时间
    const setTimer = function () {
        const sec = parseInt(this.dataset.time);
        TimeCounter(sec);
    };

    buttons.forEach(button => button.addEventListener("click",setTimer));

    document.querySelector("#custom").addEventListener("submit",function(e){
        e.preventDefault();
        const value = parseInt(this.minutes.value);
        if(value){//判断输入，如果是字符parseInt得到的就是Nan，就不会log和reset
            TimeCounter(value*60);
            this.reset();
        }
    });
})()