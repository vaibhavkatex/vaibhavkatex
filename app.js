document.addEventListener('DOMContentLoaded', () => {

  /* ============================================================
     1. CUSTOM CURSOR & CANVAS PARTICLE TRAIL SYSTEM
     ============================================================ */
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  let cursorMode = 'cyber';
  const particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;

    if (cursorMode !== 'minimal') {
      createParticles(mouseX, mouseY, 2);
    }
  });

  window.addEventListener('click', (e) => {
    cursorRing.classList.remove('click-pulse');
    void cursorRing.offsetWidth;
    cursorRing.classList.add('click-pulse');

    createParticles(e.clientX, e.clientY, cursorMode === 'particles' ? 18 : 10, true);
  });

  class Particle {
    constructor(x, y, isBurst = false) {
      this.x = x;
      this.y = y;
      const angle = Math.random() * Math.PI * 2;
      const speed = isBurst ? Math.random() * 4 + 1.5 : Math.random() * 1.5 + 0.3;
      
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.size = isBurst ? Math.random() * 4 + 2 : Math.random() * 2.5 + 1;
      this.alpha = 1;
      this.decay = Math.random() * 0.03 + 0.015;

      if (cursorMode === 'cyber') {
        const colors = ['#70a5fd', '#bc8cff', '#38bdf8'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      } else if (cursorMode === 'particles') {
        const colors = ['#f472b6', '#facc15', '#70a5fd', '#fb923c'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      } else {
        this.color = '#70a5fd';
      }
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= this.decay;
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  function createParticles(x, y, count, isBurst = false) {
    for (let i = 0; i < count; i++) {
      particles.push(new Particle(x, y, isBurst));
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;

    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;

    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].draw();
      if (particles[i].alpha <= 0) {
        particles.splice(i, 1);
      }
    }

    requestAnimationFrame(animate);
  }
  animate();

  // Magnet effect
  const magnetTargets = document.querySelectorAll('.magnet-target, a, button, .xp-card, .xp-stat-card');
  magnetTargets.forEach(target => {
    target.addEventListener('mouseenter', () => {
      cursorRing.classList.add('active-hover');
    });
    target.addEventListener('mouseleave', () => {
      cursorRing.classList.remove('active-hover');
    });
  });

  // Cursor Mode Switcher
  const cursorModeBtns = document.querySelectorAll('.cursor-mode-btn');
  cursorModeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      cursorModeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      cursorMode = btn.getAttribute('data-mode');
    });
  });

  /* ============================================================
     2. NAVIGATION TAB SYSTEM
     ============================================================ */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const activePane = document.getElementById(targetTab);
      if (activePane) {
        activePane.classList.add('active');
      }
    });
  });

  /* ============================================================
     3. README MARKDOWN CODE EXPORTER
     ============================================================ */
  const readmeCodeBlock = document.getElementById('readmeCodeBlock');
  const copyReadmeBtn = document.getElementById('copyReadmeBtn');

  const rawReadmeMarkdown = `<div align="center">

<!-- 1. HEADER HERO CARD -->
<table border="0" cellspacing="0" cellpadding="0" width="100%">
  <tr>
    <td align="center" style="background-color: #0d1117; border: 1px solid #30363d; border-radius: 16px; padding: 30px;">
      <img src="https://img.icons8.com/isometric-line/120/brain.png" width="90" alt="Vaibhav Brain Logo" />
      <h1 align="center"><b>Vaibhav</b></h1>
      <p align="center"><b>🤖 Aspiring AI & Machine Learning Engineer | AI Automation Builder | Open Source Learner</b></p>
      <p align="center">
        <img src="https://img.shields.io/badge/Focus-AI%20%26%20Machine%20Learning-8A2BE2?style=for-the-badge&logo=python&logoColor=white" />
        <img src="https://img.shields.io/badge/Building-n8n%20AI%20Automations-FF4500?style=for-the-badge&logo=n8n&logoColor=white" />
        <img src="https://img.shields.io/badge/Status-Learning%20In%20Public-00FF7F?style=for-the-badge" />
      </p>
    </td>
  </tr>
</table>

<br/>

<!-- 2. 3-COLUMN METRICS STATS CARDS -->
<table border="0" cellspacing="10" cellpadding="0" width="100%">
  <tr>
    <td align="center" width="33%" style="background-color: #161b22; border: 1px solid #30363d; border-radius: 12px; padding: 20px 10px;">
      <h1 align="center" style="margin: 0; color: #58a6ff; font-size: 32px;">100+</h1>
      <p align="center" style="margin: 4px 0 0 0; color: #8b949e; font-size: 11px;"><b>PROJECTS GOAL</b></p>
    </td>
    <td align="center" width="33%" style="background-color: #161b22; border: 1px solid #30363d; border-radius: 12px; padding: 20px 10px;">
      <h1 align="center" style="margin: 0; color: #bc8cff; font-size: 32px;">n8n</h1>
      <p align="center" style="margin: 4px 0 0 0; color: #8b949e; font-size: 11px;"><b>AI AUTOMATIONS</b></p>
    </td>
    <td align="center" width="33%" style="background-color: #161b22; border: 1px solid #30363d; border-radius: 12px; padding: 20px 10px;">
      <h1 align="center" style="margin: 0; color: #3fb950; font-size: 32px;">2026</h1>
      <p align="center" style="margin: 4px 0 0 0; color: #8b949e; font-size: 11px;"><b>AI ENGINEER TARGET</b></p>
    </td>
  </tr>
</table>

<br/>

<!-- 3. 3-COLUMN SKILLS & FOCUS PANEL -->
<table border="0" cellspacing="0" cellpadding="0" width="100%">
  <tr>
    <td style="background-color: #0d1117; border: 1px solid #30363d; border-radius: 16px; padding: 25px;">
      <table border="0" cellspacing="0" cellpadding="0" width="100%">
        <tr>
          <!-- LANGUAGES -->
          <td width="33%" valign="top" align="left">
            <h4 align="left" style="color: #58a6ff; margin: 0 0 10px 0;">💻 LANGUAGES</h4>
            <p align="left">
              <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" /><br/>
              <img src="https://img.shields.io/badge/C-A8B9CC?style=for-the-badge&logo=c&logoColor=black" /><br/>
              <img src="https://img.shields.io/badge/C++-00599C?style=for-the-badge&logo=cplusplus&logoColor=white" /><br/>
              <img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" />
            </p>
          </td>

          <!-- TOOLS -->
          <td width="33%" valign="top" align="left">
            <h4 align="left" style="color: #bc8cff; margin: 0 0 10px 0;">⚙️ TOOLS</h4>
            <p align="left">
              <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" /><br/>
              <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" /><br/>
              <img src="https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white" /><br/>
              <img src="https://img.shields.io/badge/n8n-EA4B71?style=for-the-badge&logo=n8n&logoColor=white" />
            </p>
          </td>

          <!-- FOCUS -->
          <td width="33%" valign="top" align="left">
            <h4 align="left" style="color: #3fb950; margin: 0 0 10px 0;">🎯 FOCUS</h4>
            <p align="left">
              <img src="https://img.shields.io/badge/AI_%26_ML-8A2BE2?style=for-the-badge&logo=python&logoColor=white" /><br/>
              <img src="https://img.shields.io/badge/n8n_Workflows-FF4500?style=for-the-badge&logo=n8n&logoColor=white" /><br/>
              <img src="https://img.shields.io/badge/Real_Estate_AI-0A66C2?style=for-the-badge&logo=openai&logoColor=white" /><br/>
              <img src="https://img.shields.io/badge/Data_Analysis-150458?style=for-the-badge&logo=pandas&logoColor=white" />
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>

<br/>

<!-- 4. CENTERED SOCIAL PILL BUTTONS -->
<p align="center">
  <a href="https://github.com/vaibhavkatex" target="_blank">
    <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" />
  </a>
  &nbsp;&nbsp;
  <a href="https://www.linkedin.com/in/vaibhav-kate-47300840b" target="_blank">
    <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" />
  </a>
  &nbsp;&nbsp;
  <a href="https://www.instagram.com/vaibhavkate___" target="_blank">
    <img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white" />
  </a>
  &nbsp;&nbsp;
  <a href="https://wa.me/919356076623" target="_blank">
    <img src="https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" />
  </a>
</p>

</div>

---

## 🚀 About Me

\`\`\`yaml
Name: Vaibhav
Role: Aspiring AI & Machine Learning Engineer
Focus: AI-Powered Automations (n8n), Python ML Ecosystem, Real Estate Solutions
Passions: Building in Public, Game Dev (Pygame), Open Source Learning
Current_Goal: Mastering Python, NumPy, Pandas, TensorFlow & AI Agents
\`\`\`

---

## ⚡ Current Projects

- 🏡 **AI-Powered n8n Automation System**: Autonomous lead qualifier & workflow for Real Estate businesses.
- 🤖 **AI Workflow Automations**: Smart agentic pipelines connecting LLMs with web apps.
- 📊 **Python Data Analysis & Automation**: Data processing scripts with NumPy & Pandas.
- 🎮 **Pygame & ML Projects**: Interactive games and foundational machine learning experiments.

---

## 🎯 2026 Goals Checklist

- [ ] 🚀 Build **100+ Python & AI Projects**
- [ ] 🧠 Master Core AI & Machine Learning Concepts
- [ ] ⚡ Deploy Production-Ready AI Automation Systems
- [ ] 🌍 Active Open Source Contributions
- [ ] 💼 Land a Professional AI/ML Engineering Role
- [ ] 📈 Document & Share the Journey Publicly

---

## 📊 GitHub Analytics

<p align="center">
  <img height="165" src="https://github-readme-stats.vercel.app/api?username=vaibhavkatex&show_icons=true&theme=tokyonight&hide_border=true&title_color=70a5fd&text_color=bf94e4&icon_color=79dafa" alt="Vaibhav's GitHub Stats" />
  &nbsp;
  <img height="165" src="https://github-readme-stats.vercel.app/api/top-langs/?username=vaibhavkatex&layout=compact&theme=tokyonight&hide_border=true&title_color=70a5fd&text_color=bf94e4" alt="Top Languages" />
</p>

<p align="center">
  <img src="https://streak-stats.demolab.com?user=vaibhavkatex&theme=tokyonight&hide_border=true&background=0D1117&stroke=30363D&ring=70A5FD&fire=FF4500" alt="GitHub Streak" />
</p>

---

<p align="center">
  <img src="https://komarev.com/ghpvc/?username=vaibhavkatex&label=Profile%20Views&color=70a5fd&style=flat-square" alt="Profile Views" />
</p>

<div align="center">

> *"Learn • Build • Share • Repeat"*  
⭐ **Open to collaborations, freelance work, and interesting AI ideas!**

</div>`;

  if (readmeCodeBlock) {
    readmeCodeBlock.textContent = rawReadmeMarkdown;
  }

  if (copyReadmeBtn) {
    copyReadmeBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(rawReadmeMarkdown).then(() => {
        const originalText = copyReadmeBtn.innerHTML;
        copyReadmeBtn.innerHTML = `<i class="fa-solid fa-check"></i> Copied Markdown!`;
        copyReadmeBtn.style.background = 'linear-gradient(135deg, #4ade80, #16a34a)';
        copyReadmeBtn.style.color = '#ffffff';

        setTimeout(() => {
          copyReadmeBtn.innerHTML = originalText;
          copyReadmeBtn.style.background = '';
          copyReadmeBtn.style.color = '';
        }, 2500);
      });
    });
  }

  // Goals counter
  const goalCbs = document.querySelectorAll('.goal-cb');
  const goalsProgress = document.getElementById('goalsProgress');

  function updateGoals() {
    const total = goalCbs.length;
    const checked = Array.from(goalCbs).filter(cb => cb.checked).length;
    if (goalsProgress) {
      goalsProgress.textContent = `${checked} / ${total} Completed`;
    }
  }

  goalCbs.forEach(cb => cb.addEventListener('change', updateGoals));
  updateGoals();
});
