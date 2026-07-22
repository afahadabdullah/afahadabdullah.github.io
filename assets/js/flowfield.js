/* Atmospheric flow-field particle animation.
   Attach with: <canvas class="pf-flowfield" data-density="1"></canvas>
   Vanilla JS, no deps. Respects prefers-reduced-motion. */
(function () {
  "use strict";
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  function initCanvas(canvas) {
    var ctx = canvas.getContext("2d");
    var particles = [];
    var W, H, raf;
    var density = parseFloat(canvas.dataset.density || "1");
    var t = 0;

    function resize() {
      var rect = canvas.parentElement.getBoundingClientRect();
      W = canvas.width = Math.max(rect.width, 300);
      H = canvas.height = Math.max(rect.height, 200);
      var n = Math.min(240, Math.floor((W * H) / 9000) * density);
      particles = [];
      for (var i = 0; i < n; i++) particles.push(spawn(true));
    }

    function spawn(anywhere) {
      return {
        x: Math.random() * W,
        y: anywhere ? Math.random() * H : (Math.random() < 0.5 ? 0 : H),
        life: 60 + Math.random() * 160,
        speed: 0.5 + Math.random() * 1.1
      };
    }

    /* smooth pseudo-noise wind field: sum of drifting sinusoids */
    function angleAt(x, y, tt) {
      var s = 0.0028;
      return (
        Math.sin(x * s * 1.3 + tt * 0.0006) +
        Math.cos(y * s * 1.7 - tt * 0.0004) +
        Math.sin((x + y) * s * 0.8 + tt * 0.0003)
      ) * 1.05;
    }

    function step() {
      /* translucent fade for streak trails */
      ctx.fillStyle = "rgba(7, 16, 40, 0.07)";
      ctx.fillRect(0, 0, W, H);
      t += 16;
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        var a = angleAt(p.x, p.y, t);
        var vx = Math.cos(a) * p.speed;
        var vy = Math.sin(a) * p.speed * 0.75;
        var nx = p.x + vx, ny = p.y + vy;
        /* color by "wind speed" — cyan for fast, deep blue for slow */
        var m = Math.min(1, Math.abs(vx) + Math.abs(vy));
        ctx.strokeStyle = "rgba(" + Math.floor(60 + 80 * m) + "," + Math.floor(150 + 80 * m) + ",220,0.55)";
        ctx.lineWidth = 1.1;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(nx, ny);
        ctx.stroke();
        p.x = nx; p.y = ny; p.life--;
        if (p.x < -4 || p.x > W + 4 || p.y < -4 || p.y > H + 4 || p.life <= 0) particles[i] = spawn(false);
      }
      raf = window.requestAnimationFrame(step);
    }

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) { window.cancelAnimationFrame(raf); }
      else { raf = window.requestAnimationFrame(step); }
    });

    window.addEventListener("resize", resize);
    resize();
    /* prime background so first frames aren't transparent */
    ctx.fillStyle = "rgba(7, 16, 40, 1)";
    ctx.fillRect(0, 0, W, H);
    step();
  }

  function boot() {
    document.querySelectorAll("canvas.pf-flowfield").forEach(initCanvas);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
