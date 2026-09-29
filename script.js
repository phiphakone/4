const progressBar = document.getElementById('progressBar');
const navDots = document.querySelectorAll('.nav-dots a');
const sections = document.querySelectorAll('.section');

function updateProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (scrollTop / docHeight) * 100 + '%';
  let current = 0;
  sections.forEach((sec, i) => {
    if (sec.getBoundingClientRect().top <= window.innerHeight / 2) current = i;
  });
  navDots.forEach((dot, i) => dot.classList.toggle('active', i === current));
}
window.addEventListener('scroll', updateProgress);
updateProgress();

navDots.forEach(dot => {
  dot.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(dot.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
  });
});

const revealElements = document.querySelectorAll('.card, .step, .complex-card, .code-panel, .student-table, .point, .thank-you, .compare-table-wrapper');
revealElements.forEach(el => el.classList.add('reveal'));
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
revealElements.forEach(el => observer.observe(el));

document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.code-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

// Bubble Sort visualizer for [5,1,4,2,8]
const steps = [
  { label: 'Ban đầu', values: [5,1,4,2,8], highlight: [], sortedUpTo: -1, explanation: 'Mảng ban đầu: 5, 1, 4, 2, 8. Bắt đầu so sánh cặp liền kề.' },
  { label: 'Vòng 1 – 5↔1', values: [1,5,4,2,8], highlight: [0,1], sortedUpTo: -1, explanation: '5 > 1 → đổi chỗ. Mảng: 1, 5, 4, 2, 8' },
  { label: 'Vòng 1 – 5↔4', values: [1,4,5,2,8], highlight: [1,2], sortedUpTo: -1, explanation: '5 > 4 → đổi chỗ. Mảng: 1, 4, 5, 2, 8' },
  { label: 'Vòng 1 – 5↔2', values: [1,4,2,5,8], highlight: [2,3], sortedUpTo: -1, explanation: '5 > 2 → đổi chỗ. Mảng: 1, 4, 2, 5, 8' },
  { label: 'Vòng 1 – 5↔8', values: [1,4,2,5,8], highlight: [3,4], sortedUpTo: 4, explanation: '5 < 8 → không đổi. 8 đã nổi về cuối.' },
  { label: 'Vòng 2 – 4↔2', values: [1,2,4,5,8], highlight: [1,2], sortedUpTo: 3, explanation: '4 > 2 → đổi chỗ. Mảng: 1, 2, 4, 5, 8. 5 về đúng chỗ.' },
  { label: 'Vòng 3 – Không đổi', values: [1,2,4,5,8], highlight: [], sortedUpTo: 4, explanation: 'Không còn cặp nào sai thứ tự → swapped = false → dừng sớm.' },
  { label: 'Hoàn tất', values: [1,2,4,5,8], highlight: [], sortedUpTo: 4, explanation: 'Mảng đã sắp xếp tăng dần: 1, 2, 4, 5, 8' }
];

let currentStep = 0;
const arrayState = document.getElementById('arrayState');
const stepLabel = document.getElementById('stepLabel');
const stepExplanation = document.getElementById('stepExplanation');
const prevBtn = document.getElementById('prevStep');
const nextBtn = document.getElementById('nextStep');
const maxVal = 8;

function renderStep(idx) {
  const step = steps[idx];
  stepLabel.textContent = step.label;
  stepExplanation.textContent = step.explanation;
  arrayState.innerHTML = '';
  step.values.forEach((val, i) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'bar-wrapper';
    if (step.highlight.includes(i)) wrapper.classList.add('min');
    if (i <= step.sortedUpTo) wrapper.classList.add('sorted');
    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.height = Math.max(22, (val / maxVal) * 180) + 'px';
    const label = document.createElement('span');
    label.textContent = val;
    wrapper.appendChild(bar);
    wrapper.appendChild(label);
    arrayState.appendChild(wrapper);
  });
  prevBtn.disabled = idx === 0;
  nextBtn.disabled = idx === steps.length - 1;
}

prevBtn.addEventListener('click', () => { if (currentStep > 0) { currentStep--; renderStep(currentStep); } });
nextBtn.addEventListener('click', () => { if (currentStep < steps.length - 1) { currentStep++; renderStep(currentStep); } });
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') nextBtn.click();
  if (e.key === 'ArrowLeft') prevBtn.click();
});
renderStep(0);
