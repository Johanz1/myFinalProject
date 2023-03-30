const pixel = document.getElementById('pixel');

let x = 0;
let y = 0;
let lastX = 0;
let lastY = 0;
let opacity = 1;
const fadeOut = 0.025;

const initSpeed = 7;
let speed = initSpeed;
const maxSpeed = 100;
const acceleration = 0.7;

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
                setTimeout(startAnimation, 600);
            }
        
            if (lastY + y + pixel.offsetHeight >= window.innerHeight) {
                lastX = x;
                lastY = 0;
                y = 0;
                opacity = 1;
                speed = initSpeed;
                clearInterval(intervalId);
                isAnimating = false;
                
            }
        }, 16);
    }
}

startAnimation();