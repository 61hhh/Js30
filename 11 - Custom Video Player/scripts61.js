/* Get Our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('.skip');
const ranges = player.querySelectorAll('.player__slider');

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

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    console.log(icon);
    toggle.textContent = icon;
}
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
  
function skip() {
   video.currentTime += parseFloat(this.dataset.skip);
}
skipButtons.forEach(button => button.addEventListener('click', skip));

function handleRangeUpdate() {
    // video.volume,video.palybackRate
    video[this.name] = this.value;
}
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}
video.addEventListener('timeupdate', handleProgress);

function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

// 额外添加的功能

//1.添加时间功能
const progressTimer = document.querySelector('.progress_timer')
const durationTimer = document.querySelector('.total_timer')
// 0.实现时间
// 1.获取所需的元素
// 2.时间格式为：hh:mm:ss
// 3.获取总时间，并格式化
// 4.获取当前视频时间，并格式化
// 5.渲染到页面
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

//全屏
const expand = document.querySelector('.expand');
expand.addEventListener('click',function(){
    player.webkitRequestFullScreen()
})