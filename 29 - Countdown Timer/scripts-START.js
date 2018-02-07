let intervalID
const displayH1 = document.querySelector('.display__time-left')
const displayP = document.querySelector('.display__end-time')

function timer(secs) {  //setInterval not so great... so...
  clearInterval(intervalID)
  const now = Date.now()
  const then= now + secs*1000
  // console.log(now, then)
  displayTimeLeft(secs)
  displayEndTime(then)
  intervalID = setInterval(() => {
    const secsLeft = Math.round((then - Date.now())/1000)
    if (secsLeft<0) {
      clearInterval(intervalID);  return;
    }
    displayTimeLeft(secsLeft)
  },1000)
}

function displayTimeLeft(s) {
  // console.log(s)
  const min = Math.floor(s/60)
  const sec = s%60
  displayH1.textContent = `${min}:${sec < 10 ? '0'+sec : sec}`
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp)
  const hrs = end.getHours()
  const min = end.getMinutes()
  const sec = end.getSeconds()
  displayP.textContent  = `Be back at ${hrs%12}:${min<10?'0'+min:min}:${sec<10?'0'+sec:sec}`
}

function btnclick(e) {
  const secs = parseInt(this.dataset.time)
  timer(secs)
}

document.querySelectorAll('.timer__button').forEach(b => b.addEventListener('click', btnclick))
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault()
  const secs = parseInt(this.minutes.value,10)*60
  timer(secs)
  this.reset()
})
  
