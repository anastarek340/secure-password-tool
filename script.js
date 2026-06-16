const pwd = document.getElementById("pwd");
const bar = document.getElementById("bar");
const scoreText = document.getElementById("scoreText");
const scoreNum = document.getElementById("scoreNum");
const tips = document.getElementById("tips");

const common = ["123456", "password", "qwerty"];

function check(p) {
  let score = 0;
  let t = [];

  if (p.length >= 12) score += 30;
  else t.push("Use at least 12 characters");

  if (/[a-z]/.test(p)) score += 10;
  else t.push("Add lowercase");

  if (/[A-Z]/.test(p)) score += 10;
  else t.push("Add uppercase");

  if (/[0-9]/.test(p)) score += 15;
  else t.push("Add numbers");

  if (/[^A-Za-z0-9]/.test(p)) score += 20;
  else t.push("Add symbols");

  if (common.includes(p.toLowerCase())) {
    score = 10;
    t.push("Avoid common passwords");
  }

  if (score > 100) score = 100;

  return { score, t };
}

function update() {
  const v = pwd.value;
  const r = check(v);

  bar.style.width = r.score + "%";
  scoreNum.textContent = r.score;

  let label = "Weak";
  if (r.score > 80) label = "Strong";
  else if (r.score > 50) label = "Medium";

  scoreText.textContent = "Strength: " + label;

  tips.innerHTML = "";
  r.t.forEach(x => {
    const li = document.createElement("li");
    li.textContent = x;
    tips.appendChild(li);
  });
}

pwd.addEventListener("input", update);

// show/hide
document.getElementById("toggle").onclick = () => {
  pwd.type = pwd.type === "password" ? "text" : "password";
};

// generate
document.getElementById("generate").onclick = () => {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$";
  let p = "";
  for (let i = 0; i < 12; i++) {
    p += chars[Math.floor(Math.random() * chars.length)];
  }
  pwd.value = p;
  update();
};

// copy
document.getElementById("copy").onclick = async () => {
  await navigator.clipboard.writeText(pwd.value);
  alert("Copied!");
};

update();