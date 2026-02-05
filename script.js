document.addEventListener('DOMContentLoaded', () => {
    // Add some dynamic entry animations
    const links = document.querySelectorAll('.link-item');
    links.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.1 + 0.3}s`;
    });

    // Embers Effect
    const canvas = document.getElementById('embers');
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }

    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = height + Math.random() * 100;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = -Math.random() * 1.5 - 0.5;
            this.size = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.5 + 0.1;
            this.fadeSpeed = Math.random() * 0.005 + 0.002;
            this.color = `rgba(255, ${Math.floor(Math.random() * 100)}, 0,`;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.opacity -= this.fadeSpeed;

            if (this.opacity <= 0 || this.y < -50) {
                this.reset();
            }
        }

        draw() {
            ctx.fillStyle = this.color + this.opacity + ')';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        const particleCount = Math.floor(width * 0.15); // Density based on width
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
            // Randomize startup position
            particles[i].y = Math.random() * height;
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    initParticles();
    animate();
});

// Add animation keyframes dynamically
const styleParams = document.createElement('style');
styleParams.innerHTML = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(styleParams);
