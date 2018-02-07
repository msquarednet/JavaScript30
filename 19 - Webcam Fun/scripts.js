//remider: needs to run from localhost (due to webcam security)
const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
  navigator.mediaDevices.getUserMedia({video:true, audio:false})
    .then(localMediaStream => {
      console.log(localMediaStream)
      video.src = window.URL.createObjectURL(localMediaStream)
      video.play()
      // paintToCanvas() //to soon, it seems. use canplay event (below)
    })
    .catch(err => console.error('no webcam vid for you!', err))
}
function paintToCanvas() {
  const w = video.videoWidth
  const h = video.videoHeight  
  console.log(w,h)
  canvas.width = w; canvas.height = h; //need to set canvas to same size as video coming in...
  return setInterval(() => {
    ctx.drawImage(video, 0,0,w,h)
    let pixels = ctx.getImageData(0,0,w,h)  //debugger;
    // pixels = redEffect(pixels)
    // pixels = rgbSplit(pixels)
    pixels = greenScreen(pixels) 
    // ctx.globalAlpha = 0.1 //90% of previous is NOT overwritten :P
    ctx.putImageData(pixels,0,0)
  }, 100)
}
function takePhoto() {
  snap.currentTime=0; snap.play();
  const data = canvas.toDataURL('image/jpeg')  //console.log(data)
  const link = document.createElement('a')
  link.href = data
  //link.textContent = '[image]'
  link.innerHTML = `<img src="${data}" alt="[image]"/>`
  link.setAttribute('download', 'sceen-cap')
  strip.insertBefore(link, strip.firstChild)

}
function redEffect(px) {
  for(let i=0,l=px.data.length; i<l; i+=4) {
    // px[i]   //r
    // px[i+1] //g
    // px[i+2] //b
    px.data[i+0] = px.data[i+0]+100
    px.data[i+1] = px.data[i+1]-50
    px.data[i+2] = px.data[i+2]*0.5
  }
  return px
}
function rgbSplit(px) {
  for(let i=0,l=px.data.length; i<l; i+=4) {
    px.data[i-150] = px.data[i+0]
    px.data[i+100] = px.data[i+1]
    px.data[i-150] = px.data[i+2]
  }
  return px
}
function greenScreen(px) {
  const levels = {};
  [...document.querySelectorAll('.rgb input')].forEach((input) => {
    levels[input.name] = input.value
  })
  // console.log(levels)
  // debugger;
  for(let i=0,l=px.data.length; i<l; i+=4) {
    red = px.data[i + 0];
    green = px.data[i + 1];
    blue = px.data[i + 2];
    alpha = px.data[i + 3];

    if ( red >= levels.rmin && green >= levels.gmin && blue >= levels.bmin
      && red <= levels.rmax && green <= levels.gmax && blue <= levels.bmax) {
      // take it out!
      px.data[i + 3] = 0; //alpha
    }
  }
  return px
}

video.addEventListener('canplay', paintToCanvas)


getVideo()
