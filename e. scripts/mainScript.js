const pixel = document.getElementById('pixel');

let x = 0;
let y = 0;
let lastX = 0;
let lastY = 0;

const initSpeed = 7;
let speed = initSpeed;
const maxSpeed = 100;
const acceleration = 0.2;

let isAnimating = false;

function startAnimation() {
    if (!isAnimating) {
        isAnimating = true;

        const intervalId = setInterval(() => {
        speed = Math.min(speed + acceleration, maxSpeed);
        y += speed;
        pixel.style.transform = `translate(${lastX}px, ${lastY + y}px)`;

            if (lastY + y + pixel.offsetHeight >= window.innerHeight) {
                lastX = x;
                lastY = 0;
                y = 0;
                speed = initSpeed;

                clearInterval(intervalId);
                isAnimating = false;
                setTimeout(startAnimation, 3000);
            }
        }, 16);
    }
}

startAnimation();

document.addEventListener('mousemove', (event) => {
    x = event.clientX;
});

