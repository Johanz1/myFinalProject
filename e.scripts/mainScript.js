let pixel = document.getElementById('pixel');

let count = 2;
for (let i = 0; i < count; i++){
    let glitchBox = document.createElement('div')
    glitchBox.className = 'box';
    pixel.appendChild(glitchBox);
}

setInterval(function(){
    let glitch = document.getElementsByClassName('box');
    for(let i = 0; i < glitch.length; i++){
        glitch[i].style.left = Math.floor(Math.random()*100) + 'px';
        glitch[i].style.top = Math.floor(Math.random()*-20) + 'px'
        glitch[i].style.width = Math.floor(Math.random()*5) + 'vw';
        glitch[i].style.height = Math.floor(Math.random()*20) + 'vh';
    }
}, 300)

count = 3;
for (let i = 0; i < count; i++){
    let glitchBox = document.createElement('div')
    glitchBox.className = 'box0';
    pixel.appendChild(glitchBox);
}

setInterval(function(){
    let glitch = document.getElementsByClassName('box0');
    for(let i = 0; i < glitch.length; i++){
        glitch[i].style.left = Math.floor(Math.random()*30) + 'px';
        glitch[i].style.top = Math.floor(Math.random()*20) + 'px'
        glitch[i].style.width = Math.floor(Math.random()*30) + 'px';
        glitch[i].style.height = Math.floor(Math.random()*30) + 'px';
    }
}, 300)

count = 3;
for (let i = 0; i < count; i++){
    let glitchBox = document.createElement('div')
    glitchBox.className = 'box1';
    pixel.appendChild(glitchBox);
}

setInterval(function(){
    let glitch = document.getElementsByClassName('box1');
    for(let i = 0; i < glitch.length; i++){
        glitch[i].style.left = Math.floor(Math.random()*30) + 'px';
        glitch[i].style.top = Math.floor(Math.random()*-20) + 'px'
        glitch[i].style.width = Math.floor(Math.random()*20) + 'px';
        glitch[i].style.height = Math.floor(Math.random()*10) + 'px';
    }
}, 300)

count = 3;
for (let i = 0; i < count; i++){
    let glitchBox = document.createElement('div')
    glitchBox.className = 'box2';
    pixel.appendChild(glitchBox);
}

setInterval(function(){
    let glitch = document.getElementsByClassName('box2');
    for(let i = 0; i < glitch.length; i++){
        glitch[i].style.left = Math.floor(Math.random()*-40) + 'px';
        glitch[i].style.top = Math.floor(Math.random()*-100) + 'px'
        glitch[i].style.width = Math.floor(Math.random()*40) + 'px';
        glitch[i].style.height = Math.floor(Math.random()*30) + 'px';
    }
}, 300)

let x = 0;
let y = 0;
let lastX = 0;
let lastY = 0;
let opacity = 1;
const fadeOut = 0.02;

const initSpeed = 7;
let speed = initSpeed;
const maxSpeed = 100;
const acceleration = 2;

let isAnimating = false;

document.addEventListener('mousemove', (event) => {
    x = event.clientX - 10;
});

function startAnimation() {

    if (!isAnimating) {
        
        isAnimating = true;

        const intervalId = setInterval(() => {
            peed = Math.min(speed + acceleration, maxSpeed);
            y += speed;
            pixel.style.transform = `translate(${lastX}px, ${lastY + y}px)`;
            opacity -= fadeOut;
            pixel.style.opacity = opacity;
            
            if (opacity <= 0) {
                pixel.hidden;
                setTimeout(startAnimation, 300);
            }
        
            if (lastY + y + pixel.offsetHeight >= window.innerHeight) {
                lastX = x;
                lastY = 0;
                y = 0;
                opacity = 1;
                speed = initSpeed;
                clearInterval(intervalId);
                isAnimating = false;
                setTimeout(startAnimation, 300);
            }
        }, 16);
    }
}

startAnimation();