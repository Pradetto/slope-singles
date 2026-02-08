// Mountain + Snowboarders Animation
class MountainScene {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    window.addEventListener('resize', () => this.resize());
    
    this.snowflakes = [];
    this.riders = [];
    this.time = 0;
    
    this.initSnowflakes();
    this.initRiders();
    this.animate();
  }
  
  resize() {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
  }
  
  initSnowflakes() {
    for (let i = 0; i < 50; i++) {
      this.snowflakes.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: Math.random() * 2 + 1,
        speed: Math.random() * 1 + 0.5,
        drift: Math.random() * 0.5 - 0.25
      });
    }
  }
  
  initRiders() {
    // Two riders that will meet in the middle
    this.riders = [
      {
        x: -50,
        y: this.canvas.height * 0.4,
        speed: 2,
        emoji: '🏂',
        direction: 1
      },
      {
        x: this.canvas.width + 50,
        y: this.canvas.height * 0.5,
        speed: 1.8,
        emoji: '⛷️',
        direction: -1
      }
    ];
  }
  
  drawMountains() {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    
    // Back mountain
    ctx.fillStyle = 'rgba(51, 65, 85, 0.6)';
    ctx.beginPath();
    ctx.moveTo(0, h);
    ctx.lineTo(0, h * 0.6);
    ctx.lineTo(w * 0.3, h * 0.3);
    ctx.lineTo(w * 0.6, h * 0.5);
    ctx.lineTo(w, h * 0.4);
    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fill();
    
    // Front mountain
    ctx.fillStyle = 'rgba(71, 85, 105, 0.8)';
    ctx.beginPath();
    ctx.moveTo(0, h);
    ctx.lineTo(0, h * 0.7);
    ctx.lineTo(w * 0.4, h * 0.4);
    ctx.lineTo(w * 0.7, h * 0.6);
    ctx.lineTo(w, h * 0.5);
    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fill();
  }
  
  drawSnowflakes() {
    this.snowflakes.forEach(flake => {
      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      this.ctx.beginPath();
      this.ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
      this.ctx.fill();
      
      flake.y += flake.speed;
      flake.x += flake.drift;
      
      if (flake.y > this.canvas.height) {
        flake.y = -10;
        flake.x = Math.random() * this.canvas.width;
      }
      if (flake.x > this.canvas.width) flake.x = 0;
      if (flake.x < 0) flake.x = this.canvas.width;
    });
  }
  
  drawRiders() {
    const ctx = this.ctx;
    
    this.riders.forEach(rider => {
      ctx.font = '40px Arial';
      ctx.fillText(rider.emoji, rider.x, rider.y);
      
      rider.x += rider.speed * rider.direction;
      
      // Reset when off screen
      if (rider.direction > 0 && rider.x > this.canvas.width + 50) {
        rider.x = -50;
      } else if (rider.direction < 0 && rider.x < -50) {
        rider.x = this.canvas.width + 50;
      }
    });
    
    // Check if riders are close (meeting moment)
    const distance = Math.abs(this.riders[0].x - this.riders[1].x);
    if (distance < 100) {
      ctx.font = '30px Arial';
      ctx.fillText('💕', (this.riders[0].x + this.riders[1].x) / 2, Math.min(this.riders[0].y, this.riders[1].y) - 30);
    }
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Sky gradient
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
    gradient.addColorStop(0, '#1e293b');
    gradient.addColorStop(1, '#334155');
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.drawMountains();
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
