// Enhanced Mountain Scene with Particles & Better Animation
class MountainScene {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    window.addEventListener('resize', () => this.resize());
    
    this.snowflakes = [];
    this.particles = [];
    this.riders = [];
    this.hearts = [];
    this.time = 0;
    this.meetingMoment = false;
    
    this.initSnowflakes();
    this.initParticles();
    this.initRiders();
    this.animate();
  }
  
  resize() {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
  }
  
  initSnowflakes() {
    for (let i = 0; i < 80; i++) {
      this.snowflakes.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: Math.random() * 2.5 + 0.5,
        speed: Math.random() * 1.5 + 0.5,
        drift: Math.random() * 0.8 - 0.4,
        opacity: Math.random() * 0.6 + 0.4
      });
    }
  }
  
  initParticles() {
    // Sparkle particles for atmosphere
    for (let i = 0; i < 30; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height * 0.7,
        radius: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.3 + 0.1,
        opacity: Math.random(),
        growing: true
      });
    }
  }
  
  initRiders() {
    this.riders = [
      {
        x: -60,
        y: this.canvas.height * 0.45,
        targetY: this.canvas.height * 0.45,
        speed: 2.2,
        emoji: '🏂',
        size: 48,
        direction: 1,
        trail: []
      },
      {
        x: this.canvas.width + 60,
        y: this.canvas.height * 0.55,
        targetY: this.canvas.height * 0.55,
        speed: 2,
        emoji: '⛷️',
        size: 48,
        direction: -1,
        trail: []
      }
    ];
  }
  
  drawMountains() {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    
    // Back mountains (lighter)
    ctx.fillStyle = 'rgba(51, 65, 85, 0.4)';
    ctx.beginPath();
    ctx.moveTo(0, h);
    ctx.lineTo(0, h * 0.65);
    ctx.quadraticCurveTo(w * 0.2, h * 0.4, w * 0.35, h * 0.35);
    ctx.quadraticCurveTo(w * 0.5, h * 0.3, w * 0.65, h * 0.45);
    ctx.lineTo(w, h * 0.5);
    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fill();
    
    // Front mountains (darker)
    ctx.fillStyle = 'rgba(71, 85, 105, 0.7)';
    ctx.beginPath();
    ctx.moveTo(0, h);
    ctx.lineTo(0, h * 0.75);
    ctx.quadraticCurveTo(w * 0.25, h * 0.5, w * 0.45, h * 0.45);
    ctx.quadraticCurveTo(w * 0.65, h * 0.4, w * 0.8, h * 0.6);
    ctx.lineTo(w, h * 0.55);
    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fill();
    
    // Snow caps
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.beginPath();
    ctx.moveTo(w * 0.4, h * 0.47);
    ctx.lineTo(w * 0.45, h * 0.45);
    ctx.lineTo(w * 0.5, h * 0.48);
    ctx.closePath();
    ctx.fill();
  }
  
  drawSnowflakes() {
    this.snowflakes.forEach(flake => {
      this.ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
      this.ctx.beginPath();
      this.ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
      this.ctx.fill();
      
      flake.y += flake.speed;
      flake.x += flake.drift + Math.sin(this.time * 0.01 + flake.y) * 0.3;
      
      if (flake.y > this.canvas.height) {
        flake.y = -10;
        flake.x = Math.random() * this.canvas.width;
      }
      if (flake.x > this.canvas.width) flake.x = 0;
      if (flake.x < 0) flake.x = this.canvas.width;
    });
  }
  
  drawParticles() {
    this.particles.forEach(p => {
      this.ctx.fillStyle = `rgba(147, 197, 253, ${p.opacity})`;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fill();
      
      if (p.growing) {
        p.opacity += 0.02;
        if (p.opacity >= 1) p.growing = false;
      } else {
        p.opacity -= 0.02;
        if (p.opacity <= 0) p.growing = true;
      }
      
      p.y += p.speed;
      if (p.y > this.canvas.height * 0.7) {
        p.y = Math.random() * this.canvas.height * 0.3;
      }
    });
  }
  
  drawRiders() {
    const ctx = this.ctx;
    const w = this.canvas.width;
    
    this.riders.forEach((rider, index) => {
      // Trail effect
      rider.trail.push({ x: rider.x, y: rider.y, opacity: 0.5 });
      if (rider.trail.length > 8) rider.trail.shift();
      
      rider.trail.forEach((point, i) => {
        const opacity = (i / rider.trail.length) * point.opacity;
        ctx.globalAlpha = opacity;
        ctx.font = `${rider.size * 0.6}px Arial`;
        ctx.fillText(rider.emoji, point.x - rider.size / 2, point.y);
      });
      ctx.globalAlpha = 1;
      
      // Main rider
      ctx.font = `${rider.size}px Arial`;
      ctx.fillText(rider.emoji, rider.x - rider.size / 2, rider.y);
      
      // Add slight bounce
      rider.y = rider.targetY + Math.sin(this.time * 0.05 + index) * 3;
      
      rider.x += rider.speed * rider.direction;
      
      // Reset when off screen
      if (rider.direction > 0 && rider.x > w + 60) {
        rider.x = -60;
      } else if (rider.direction < 0 && rider.x < -60) {
        rider.x = w + 60;
      }
    });
    
    // Check if riders are close (meeting moment)
    const distance = Math.abs(this.riders[0].x - this.riders[1].x);
    if (distance < 100) {
      if (!this.meetingMoment) {
        this.meetingMoment = true;
        // Create heart burst
        for (let i = 0; i < 10; i++) {
          this.hearts.push({
            x: (this.riders[0].x + this.riders[1].x) / 2,
            y: Math.min(this.riders[0].y, this.riders[1].y) - 40,
            vx: (Math.random() - 0.5) * 3,
            vy: -Math.random() * 4 - 2,
            opacity: 1,
            rotation: Math.random() * Math.PI * 2
          });
        }
      }
    } else {
      this.meetingMoment = false;
    }
    
    // Draw hearts
    this.hearts = this.hearts.filter(heart => {
      ctx.globalAlpha = heart.opacity;
      ctx.font = '24px Arial';
      ctx.save();
      ctx.translate(heart.x, heart.y);
      ctx.rotate(heart.rotation);
      ctx.fillText('💕', -12, 12);
      ctx.restore();
      
      heart.x += heart.vx;
      heart.y += heart.vy;
      heart.vy += 0.1; // gravity
      heart.opacity -= 0.015;
      heart.rotation += 0.05;
      
      return heart.opacity > 0;
    });
    ctx.globalAlpha = 1;
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Dynamic sky gradient
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
    const hue1 = 210 + Math.sin(this.time * 0.001) * 10;
    const hue2 = 240 + Math.sin(this.time * 0.001) * 10;
    gradient.addColorStop(0, `hsl(${hue1}, 30%, 20%)`);
    gradient.addColorStop(1, `hsl(${hue2}, 25%, 25%)`);
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.drawMountains();
    this.drawParticles();
    this.drawSnowflakes();
    this.drawRiders();
    
    this.time++;
    requestAnimationFrame(() => this.animate());
  }
}

// Initialize when canvas is ready
function initAnimation() {
  const canvas = document.getElementById('heroCanvas');
  if (canvas) {
    new MountainScene('heroCanvas');
  }
}
