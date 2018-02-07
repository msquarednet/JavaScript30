const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');


function togglePlay() {  // if (video.paused) {video.play()} else {video.pause()}
  const method = video.paused ? 'play' : 'pause';
  video[method]();  
  //update btn appearance, elsewhere.
}
function updateButton(e) {
  toggle.textContent = (e.type==='pause') ? '►' : '❚ ❚';
}
function skip(e) {
  // console.log('skip...', this.dataset)
  video.currentTime += parseFloat(this.dataset.skip)
}
function handleRangeUpdate() {
  //console.log(this.value, this.name) //name of input is same as video.property name, so...
  video[this.name] = this.value
}
function handleProgress() {
  const perc = video.currentTime/video.duration*100
  progressBar.style.flexBasis = `${perc}%`
}
function scrub(e) {
  if (mouseisdown) {
    const scrubTime = e.offsetX/progress.offsetWidth*video.duration
    video.currentTime = scrubTime
  }
}

video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', handleProgress)

toggle.addEventListener('click', togglePlay)

skipButtons.forEach(b => b.addEventListener('click', skip))
ranges.forEach(r => r.addEventListener('change', handleRangeUpdate))

let mouseisdown = false;
progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', scrub)
// progress.addEventListener('mousemove', (e) => mouseisdown && scrub(e)) //sneaky alternative
progress.addEventListener('mousedown', () => mouseisdown=true)
progress.addEventListener('mouseup', () => mouseisdown=false)



