/**
 * Harshit Goswami — Portfolio Main JavaScript
 */

// ══ PRELOADER ══
(function () {
  const bar = document.getElementById('preBar');
  const pct = document.getElementById('prePercent');
  const pre = document.getElementById('preloader');
  let p = 0;

  if (!bar || !pct || !pre) return;

  const iv = setInterval(() => {
    p += Math.random() * 8 + 2;
    if (p >= 100) {
      p = 100;
      clearInterval(iv);
      setTimeout(() => {
        pre.classList.add('done');
        initAll();
      }, 300);
    }
    bar.style.width = p + '%';
    pct.textContent = Math.round(p) + '%';
  }, 60);
})();

function initAll() {
  initTyping();
  initCounters();
  initReveal();
  initSkillBars();
  initAccBars();
  initGHGraph();
  initFilters();
}

// ══ TYPING ANIMATION ══
function initTyping() {
  const words = [
    'Aspiring AI/ML Engineer',
    'Deep Learning Enthusiast',
    'Problem Solver',
    'Research Intern @ IIT Patna',
    'Python Developer'
  ];
  let wi = 0;
  let ci = 0;
  let del = false;
  const el = document.getElementById('typingText');
  if (!el) return;

  function tick() {
    const w = words[wi];
    if (!del) {
      el.textContent = w.slice(0, ci + 1);
      ci++;
      if (ci === w.length) {
        del = true;
        setTimeout(tick, 1600);
        return;
      }
    } else {
      el.textContent = w.slice(0, ci - 1);
      ci--;
      if (ci === 0) {
        del = false;
        wi = (wi + 1) % words.length;
      }
    }
    setTimeout(tick, del ? 55 : 95);
  }
  tick();
}

// ══ COUNTERS ══
function initCounters() {
  document.querySelectorAll('.stat-num[data-target]').forEach((el) => {
    const target = +el.dataset.target;
    let cur = 0;
    const iv = setInterval(() => {
      cur++;
      el.textContent = cur + (el.dataset.suffix || '');
      if (cur >= target) clearInterval(iv);
    }, 120);
  });
}

// ══ SCROLL REVEAL ══
function initReveal() {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 70);
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.08 }
  );
  document.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
}

// ══ SKILL PROGRESS BARS ══
function initSkillBars() {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.skill-fill').forEach((b) => {
            b.style.width = b.dataset.w + '%';
          });
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  document.querySelectorAll('.skill-cat').forEach((el) => obs.observe(el));
}

// ══ ACCURACY PROGRESS BARS ══
function initAccBars() {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.proj-acc-fill').forEach((b) => {
            b.style.width = b.dataset.w + '%';
          });
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll('.proj-card').forEach((el) => obs.observe(el));
}

// ══ PROJECT FILTERS ══
function initFilters() {
  document.querySelectorAll('.pf').forEach((btn) => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.pf').forEach((b) => b.classList.remove('active'));
      this.classList.add('active');
      const f = this.dataset.filter;
      document.querySelectorAll('.proj-card').forEach((card) => {
        const tags = card.dataset.tags || '';
        card.classList.toggle('hidden', f !== 'all' && !tags.includes(f));
      });
    });
  });
}

// ══ GITHUB GRAPH ══
function initGHGraph() {
  const canvas = document.getElementById('gh-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.clientWidth || 700;
  canvas.width = W;
  const cols = 52;
  const rows = 7;
  const sz = 11;
  const gap = 3;
  const colors = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'];
  const seed = 42;

  function rand(i) {
    let x = Math.sin(i + seed) * 10000;
    return x - Math.floor(x);
  }

  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      const idx = c * rows + r;
      const v = rand(idx);
      let ci = 0;
      if (v > 0.9) ci = 4;
      else if (v > 0.75) ci = 3;
      else if (v > 0.55) ci = 2;
      else if (v > 0.35) ci = 1;

      ctx.fillStyle = colors[ci];
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(c * (sz + gap), r * (sz + gap), sz, sz, 2);
      } else {
        ctx.rect(c * (sz + gap), r * (sz + gap), sz, sz);
      }
      ctx.fill();
    }
  }
}

// ══ CASE STUDY DATA & MODAL ══
const caseStudies = {
  p1: {
    title: 'Spacecraft Anomaly Detection — Explainable Multi-Modal Digital Twin',
    cat: 'Deep Learning',
    problem:
      'Spacecraft telemetry generates thousands of sensor readings per second. Identifying anomalous patterns manually is error-prone and delayed. The goal was to automate real-time anomaly detection with high precision with explainability and a visual digital twin for insights.',
    approach:
      'Implemented a multi-model pipeline: GNN-VAE for graph-based anomaly detection, Transformer for sequence modeling, and LSTM-AE for reconstruction error analysis. Fused multi-modal features with attention mechanisms. Developed a generative digital twin using GANs to visualize normal vs anomalous states.',
    model:
      'GNN-VAE: Graph Neural Network Variational Autoencoder with 3 GCN layers and latent dim=64. Transformer: 4 layers, 8 heads, d_model=128. LSTM-AE: 2-layer LSTM encoder-decoder with latent dim=32. GAN: DCGAN architecture for digital twin generation.',
    results: [
      { n: '89%', l: 'Test Accuracy' },
      { n: '35%', l: 'Faster Detection' },
      { n: '10K+', l: 'Data Samples' }
    ]
  },
  p2: {
    title: 'Electricity Consumption Prediction',
    cat: 'Machine Learning',
    problem:
      'Energy companies struggle to optimize distribution due to unpredictable consumption spikes. Accurate forecasting helps prevent outages and reduce waste.',
    approach:
      'Applied Regression Tree algorithm on historical consumption data. Performed feature engineering (hour, season, temperature proxy), scaling, and hyperparameter tuning via grid search.',
    model:
      'Decision Tree Regressor with max_depth=8, min_samples_split=20. Cross-validated on 80/20 train-test split. Evaluated with MAE, RMSE, and R² score.',
    results: [
      { n: '67%', l: 'Accuracy' },
      { n: '15%', l: 'Accuracy Gain' },
      { n: '5K+', l: 'Records' }
    ]
  },
  p3: {
    title: 'Transliteration System',
    cat: 'NLP',
    problem:
      'Traditional object detection systems often struggle with achieving high accuracy and low-latency performance simultaneously in real-time environments, limiting their effectiveness in applications such as surveillance, smart monitoring, and edge-AI systems.',
    approach:
      'The proposed system uses a hybrid neural transliteration pipeline to convert Romanized Hindi text into Devanagari script while preserving phonetic pronunciation. The architecture combines language detection, Roman text normalization, dictionary-based lookup, BPE tokenization, and a lightweight BiGRU Seq2Seq model with Bahdanau Attention for accurate and low-latency transliteration. A three-stage curriculum learning strategy using Aksharantar and Dakshina datasets improves phonetic mapping, spelling variation handling, and contextual understanding. The model is further optimized using INT8 quantization and ONNX export for efficient real-time deployment on edge and mobile devices through a FastAPI-based web application.',
    model:
      'Roman Input Text → Language Detection & Normalization → Dictionary Backoff + BPE Tokenization → Encoder (BiGRU, 256 Hidden Units, 128-D Embeddings) → Bahdanau Attention (Source Masking) → Decoder (GRU, 256 Hidden Units) → Devanagari Output',
    results: [
      { n: '88.1%', l: '' },
      { n: '80%', l: 'Time Saved' },
      { n: '500+', l: 'Resumes Tested' }
    ]
  },
  p4: {
    title: 'AI Conversational Chatbot',
    cat: 'NLP',
    problem:
      'Domain-specific chatbots require understanding nuanced intent beyond keyword matching. The challenge was building a generalization-capable bot for academic Q&A.',
    approach:
      'Implemented Seq2Seq with Bahdanau attention mechanism. Trained on custom domain corpus. Added intent classifier layer using BiLSTM for robust query understanding.',
    model:
      'Encoder BiLSTM → Attention → Decoder LSTM → Softmax. Intent classifier: BiLSTM + Dense + Softmax (10 intent classes). PyTorch implementation.',
    results: [
      { n: '78%', l: 'Intent Accuracy' },
      { n: '10', l: 'Intent Classes' },
      { n: '3K+', l: 'Training Pairs' }
    ]
  },
  p5: {
    title: 'Real-Time Object Detection System',
    cat: 'Computer Vision',
    problem:
      'Custom object detection from scratch requires massive compute. Transfer learning on MobileNetV2 enables efficient real-time inference on consumer hardware.',
    approach:
      'The system follows a dual-pipeline deep learning approach for real-time object detection and image classification. The detection pipeline uses YOLOv8 models with advanced augmentation techniques such as Mosaic, MixUp, and Copy-Paste augmentation for high-accuracy real-time detection, while the classification pipeline uses transfer learning with MobileNetV2 and EfficientNet architectures. The workflow includes data preprocessing, augmentation, cosine learning rate scheduling with warmup, progressive fine-tuning, real-time webcam inference, benchmarking, model evaluation, and deployment optimization using ONNX/TFLite export for edge-AI applications.',
    model:
      'Input Image/Video → Data Preprocessing & Augmentation (Mosaic, MixUp, CutMix, Copy-Paste, Random Erasing) → Detection Pipeline (YOLOv8n/s/m/l/x) + Classification Pipeline (MobileNetV2 / EfficientNetB0 / B3 / V2S) → Transfer Learning (Head Training → Progressive Unfreezing) → Warmup + Cosine Annealing LR Scheduling → Fine-Tuning (BatchNorm Freezing + Label Smoothing + Weight Decay) → Real-Time Inference (Configurable Confidence & IoU Thresholds) → Evaluation (mAP@50, mAP@50:95, Confusion Matrix, Grad-CAM) → Optimization & Deployment (ONNX / TFLite / TensorRT) → Edge-AI Ready Output',
    results: [
      { n: '91%', l: 'Top-5 Accuracy' },
      { n: '30 FPS', l: 'Inference Speed' },
      { n: '2K+', l: 'Training Images' }
    ]
  },
  p6: {
    title: 'ML Prediction Dashboard (Flask)',
    cat: 'Web / Deployed',
    problem:
      'ML models often live in notebooks and never reach users. The goal was building a production-grade web app that lets non-technical users upload data and get predictions instantly.',
    approach:
      'Trained a Random Forest model, serialized with joblib. Built Flask REST API with file upload, batch prediction, and SHAP-based explanations. Deployed on Render (free tier).',
    model:
      'Random Forest (n_estimators=200, max_depth=10) → joblib serialization → Flask /predict endpoint → SHAP TreeExplainer → Chart.js visualizations.',
    results: [
      { n: '85%', l: 'Model Accuracy' },
      { n: '<2h', l: 'Deploy Time' },
      { n: 'REST', l: 'API Ready' }
    ]
  }
};

function openModal(id) {
  const d = caseStudies[id];
  if (!d) return;
  const modalBody = document.getElementById('modalBody');
  if (!modalBody) return;

  modalBody.innerHTML = `
    <div class="modal-label">${d.cat} · Case Study</div>
    <div class="modal-title">${d.title}</div>
    <div class="modal-section"><div class="modal-section-hd">Problem</div><p>${d.problem}</p></div>
    <div class="modal-section"><div class="modal-section-hd">Approach</div><p>${d.approach}</p></div>
    <div class="modal-section"><div class="modal-section-hd">Model Architecture</div><p style="font-family:'JetBrains Mono',monospace;font-size:0.82rem;background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:8px;padding:1rem;line-height:1.9">${d.model}</p></div>
    <div class="modal-section"><div class="modal-section-hd">Results</div>
      <div class="modal-result-grid">${d.results.map((r) => `<div class="modal-result-item"><div class="modal-result-num">${r.n}</div><div class="modal-result-lbl">${r.l}</div></div>`).join('')}</div>
    </div>`;
  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(e) {
  if (e.target === document.getElementById('modal-overlay')) closeModalBtn();
}

function closeModalBtn() {
  const overlay = document.getElementById('modal-overlay');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
}

// ══ AI INTERACTIVE CHATBOT ══
const aiKB = {
  project: [
    'Harshit has built 6 AI projects: Spacecraft Anomaly Detection (89% accuracy), Electricity Prediction, Transliteration Engine, NLP Chatbot, Real-Time Object Detection (91% accuracy), and a deployed Flask ML Dashboard!'
  ],
  skill: [
    'Harshit is proficient in Python (Advanced), TensorFlow, PyTorch, Scikit-learn, NLP, Computer Vision with OpenCV, and Flask for deployment. His core strength is Deep Learning and Anomaly Detection.'
  ],
  collab: [
    "You can reach Harshit at harshit.goswami.engg@gmail.com or connect on LinkedIn at linkedin.com/in/harshit-g-625987280. He's open to internships, research collaborations, and AI project partnerships!"
  ],
  iit: [
    "Harshit did a Research Internship at IIT Patna — one of India's premier technology institutes. He worked on applied ML research, experimental design, and collaborated with faculty on academic initiatives."
  ],
  education: [
    'Harshit is pursuing B.Tech in Artificial Intelligence at VIT Chennai, expected to graduate in 2027. He has a strong foundation in ML, DL, linear algebra, and statistics.'
  ],
  accuracy: [
    'His best project accuracy is 91% (Object Detection) followed by 89% (Spacecraft Anomaly Detection), 88.1% (Transliteration), 85% (Flask ML Dashboard), 78% (Chatbot), and 67% (Electricity Prediction).'
  ],
  contact: [
    'Email: harshit.goswami.engg@gmail.com | Phone: +91 99285 73740 | GitHub: HarshIIT01 | LinkedIn: harshit-g-625987280'
  ],
  hello: [
    "Hi there! Great to meet you! I'm Harshit's portfolio AI. Ask me about his projects, skills, or how to get in touch!"
  ],
  hi: [
    'Hey! Ask me anything about Harshit — his projects, skills, research, or collaboration opportunities.'
  ]
};

function getAIReply(msg) {
  const m = msg.toLowerCase();
  for (const [key, replies] of Object.entries(aiKB)) {
    if (m.includes(key)) return replies[0];
  }
  return "Great question! For detailed info, you can reach Harshit directly at harshit.goswami.engg@gmail.com or check his GitHub at github.com/HarshIIT01. He'd love to chat! 🚀";
}

function appendMsg(text, role) {
  const chat = document.getElementById('aiChat');
  if (!chat) return null;
  const div = document.createElement('div');
  div.className = 'chat-msg ' + role;
  if (role === 'bot') {
    div.innerHTML = '<div class="bot-name">Harshit\'s AI</div>' + text;
  } else {
    div.textContent = text;
  }
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
  return div;
}

function sendAIMsg() {
  const inp = document.getElementById('aiInput');
  if (!inp) return;
  const msg = inp.value.trim();
  if (!msg) return;
  inp.value = '';
  appendMsg(msg, 'user');
  const typing = appendMsg('<div class="typing-dots"><span></span><span></span><span></span></div>', 'bot');
  setTimeout(() => {
    if (typing) {
      typing.innerHTML = '<div class="bot-name">Harshit\'s AI</div>' + getAIReply(msg);
      const chat = document.getElementById('aiChat');
      if (chat) chat.scrollTop = 9999;
    }
  }, 900 + Math.random() * 600);
}

function quickAsk(el) {
  const inp = document.getElementById('aiInput');
  if (inp && el) {
    inp.value = el.textContent;
    sendAIMsg();
  }
}

// ══ CONTACT FORM ══
function submitForm() {
  const nameEl = document.getElementById('fname');
  const emailEl = document.getElementById('femail');
  const msgEl = document.getElementById('fmessage');
  if (!nameEl || !emailEl || !msgEl) return;

  const n = nameEl.value.trim();
  const e = emailEl.value.trim();
  const m = msgEl.value.trim();

  if (!n || !e || !m) {
    alert('Please fill in your name, email and message.');
    return;
  }
  const suc = document.getElementById('formSuccess');
  if (suc) {
    suc.classList.add('show');
    nameEl.value = '';
    emailEl.value = '';
    msgEl.value = '';
    setTimeout(() => suc.classList.remove('show'), 5000);
  }
}

// ══ RESUME DOWNLOAD ══
function downloadResume(e) {
  if (e && e.preventDefault) e.preventDefault();
  window.open('https://drive.google.com/file/d/1uRko6VBXv7HHOIf9YwzwbjqzLyhHK1Rg/view?usp=sharing', '_blank');
}

// ══ NAV ACTIVE ON SCROLL ══
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-center a');
  let cur = '';
  sections.forEach((s) => {
    if (window.scrollY >= s.offsetTop - 140) cur = s.id;
  });
  links.forEach((a) => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + cur);
  });
});

// ══ MOBILE NAV ══
function toggleMobileNav() {
  const nl = document.getElementById('navLinks');
  const nr = document.querySelector('.nav-resume');
  if (!nl) return;

  const isOpen = nl.style.display === 'flex';
  nl.style.cssText = isOpen
    ? ''
    : 'display:flex;flex-direction:column;position:fixed;top:70px;left:0;right:0;background:rgba(8,11,16,0.97);padding:1.5rem;gap:1.25rem;border-bottom:1px solid var(--border);z-index:199';
  if (nr) nr.style.display = isOpen ? '' : 'block';
}
