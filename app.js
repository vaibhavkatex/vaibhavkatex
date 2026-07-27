document.addEventListener('DOMContentLoaded', () => {
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
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

    for (let i = 0; i < 2; i++) {
      particles.push(new Particle(mouseX, mouseY));
    }
  });

  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 1.5 + 0.3;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.size = Math.random() * 2.5 + 1;
      this.alpha = 1;
      this.decay = Math.random() * 0.03 + 0.015;
      const colors = ['#70a5fd', '#bc8cff', '#3fb950'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
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
      ctx.shadowBlur = 6;
      ctx.shadowColor = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
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

  const hoverable = document.querySelectorAll('a, button, .glass-card, .pill-badge, .project-box');
  hoverable.forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('active-hover'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('active-hover'));
  });

  const readmeCodeBlock = document.getElementById('readmeCodeBlock');
  const copyReadmeBtn = document.getElementById('copyReadmeBtn');

  const rawReadmeMarkdown = `# Hi 👋, I'm Vaibhav

### 🤖 Aspiring AI & Machine Learning Engineer | AI Automation Builder | Open Source Learner

<p align="center">
  <img src="https://img.shields.io/badge/Focus-AI%20%26%20Machine%20Learning-8A2BE2?style=for-the-badge&logo=python&logoColor=white" />
  <img src="https://img.shields.io/badge/Building-n8n%20AI%20Automations-FF4500?style=for-the-badge&logo=n8n&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Learning%20In%20Public-00FF7F?style=for-the-badge" />
</p>

---

## 🚀 About Me

I'm passionate about building intelligent software, AI-powered automations, and solving real-world problems through code.

- 🌱 Currently learning **Python for AI & Machine Learning**
- 🤖 Building **AI-powered n8n automation workflows**
- 🏡 Developing automation solutions for **Real Estate Businesses**
- 💻 Building and sharing projects every single day
- 📚 Learning in public and improving consistently
- 🎮 Part-time Gamer • Full-time Learner
- 🎯 Goal: Become a Professional AI Engineer

---

## 🛠️ Tech Stack

### 💻 Languages
<p>
  <img src="https://skillicons.dev/icons?i=python,c,cpp,java" alt="Languages" />
</p>

### ⚙️ Tools & Platforms
<p>
  <img src="https://skillicons.dev/icons?i=git,github,vscode" alt="Tools" />
  &nbsp;
  <img src="https://img.shields.io/badge/n8n-EA4B71?style=for-the-badge&logo=n8n&logoColor=white" alt="n8n" />
</p>

### 📚 Currently Learning
<p>
  <img src="https://skillicons.dev/icons?i=python,tensorflow" alt="Python & TensorFlow" />
  <img src="https://img.shields.io/badge/NumPy-013243?style=for-the-badge&logo=numpy&logoColor=white" alt="NumPy" />
  <img src="https://img.shields.io/badge/Pandas-150458?style=for-the-badge&logo=pandas&logoColor=white" alt="Pandas" />
  <img src="https://img.shields.io/badge/Pygame-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Pygame" />
  <img src="https://img.shields.io/badge/Machine%20Learning-FF6F00?style=for-the-badge" alt="Machine Learning" />
  <img src="https://img.shields.io/badge/Data%20Analysis-0A66C2?style=for-the-badge" alt="Data Analysis" />
</p>

---

## ⚡ Current Projects

- 🏡 **AI-powered n8n Automation System** for a Real Estate Business
- 🤖 **AI Workflow Automations** with LLMs
- 📊 **Python Automation & Data Analysis Projects** (NumPy & Pandas)
- 🎮 **Pygame & Machine Learning Experiments**

---

## 🎯 2026 Goals

- [ ] 🚀 Build **100+ Python Projects**
- [ ] 🧠 Master Core AI & Machine Learning Concepts
- [ ] ⚡ Build Production-Ready AI Automation Systems
- [ ] 🌍 Contribute to Open Source Projects
- [ ] 💼 Land an AI/ML Engineering Role
- [ ] 📈 Share Learning Journey by Building in Public

---

## 📊 GitHub Stats & Streak

<p align="center">
  <img height="165" src="https://github-readme-stats.vercel.app/api?username=vaibhavkatex&show_icons=true&theme=tokyonight&hide_border=true" alt="Vaibhav's GitHub Stats" />
  &nbsp;&nbsp;
  <img height="165" src="https://github-readme-stats.vercel.app/api/top-langs/?username=vaibhavkatex&layout=compact&theme=tokyonight&hide_border=true" alt="Top Languages" />
</p>

<p align="center">
  <img src="https://streak-stats.demolab.com?user=vaibhavkatex&theme=tokyonight&hide_border=true" alt="GitHub Streak" />
</p>

---

## 🌐 Connect With Me

<p align="center">
  <a href="https://github.com/vaibhavkatex" target="_blank">
    <img src="https://img.icons8.com/fluency/96/github.png" alt="GitHub" width="48"/>
  </a>
  &nbsp;&nbsp;
  <a href="https://www.linkedin.com/in/vaibhav-kate-47300840b" target="_blank">
    <img src="https://img.icons8.com/fluency/96/linkedin.png" alt="LinkedIn" width="48"/>
  </a>
  &nbsp;&nbsp;
  <a href="https://www.instagram.com/vaibhavkate___" target="_blank">
    <img src="https://img.icons8.com/fluency/96/instagram-new.png" alt="Instagram" width="48"/>
  </a>
  &nbsp;&nbsp;
  <a href="https://wa.me/919356076623" target="_blank">
    <img src="https://img.icons8.com/fluency/96/whatsapp.png" alt="WhatsApp" width="48"/>
  </a>
</p>

<p align="center">
  <img src="https://komarev.com/ghpvc/?username=vaibhavkatex&label=Profile%20Views&color=0e75b6&style=flat" alt="Profile Views" />
</p>

---

<div align="center">

### 🚀 *"Learn • Build • Share • Repeat"*

⭐ **Thanks for visiting my profile!**

</div>`;

  if (readmeCodeBlock) {
    readmeCodeBlock.textContent = rawReadmeMarkdown;
  }

  if (copyReadmeBtn) {
    copyReadmeBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(rawReadmeMarkdown).then(() => {
        copyReadmeBtn.innerHTML = `<i class="fa-solid fa-check"></i> Copied!`;
        setTimeout(() => {
          copyReadmeBtn.innerHTML = `<i class="fa-regular fa-copy"></i> Copy Markdown Code`;
        }, 2000);
      });
    });
  }
});
