// KompNazorat 2.1 Asosiy interaktiv funksiyalar va render logikasi
document.addEventListener("DOMContentLoaded", () => {
  initClock();
  initNavigation();
  renderDashboard();
  renderMatrixTable();
  renderTasks();
  renderRiskSection();
  renderDismissed();
  renderOperational();
  renderConvicted();
  renderConflictMatrix();
  renderArchive();
});

// Soat
function initClock() {
  const clockEl = document.getElementById("live-clock");
  setInterval(() => {
    const now = new Date();
    clockEl.innerText = now.toLocaleTimeString("uz-UZ");
  }, 1000);
}

// Navigatsiya menyusi
function initNavigation() {
  const navItems = document.querySelectorAll(".nav-item");
  const tabContents = document.querySelectorAll(".tab-content");
  const breadcrumb = document.getElementById("breadcrumb-container");

  navItems.forEach(btn => {
    btn.addEventListener("click", () => {
      const tabId = btn.dataset.tab;
      navItems.forEach(b => b.classList.remove("active"));
      tabContents.forEach(t => t.classList.remove("active"));

      btn.classList.add("active");
      const targetTab = document.getElementById(`tab-${tabId}`);
      if (targetTab) targetTab.classList.add("active");

      breadcrumb.innerHTML = `<span>Bosh sahifa</span> &rarr; <b>${btn.innerText.trim()}</b>`;
    });
  });
}

// 1. DASHBOARD VA DIAGRAMMALAR
function renderDashboard() {
  // Chart 1: Hududlar bo'yicha bar chart
  const barContainer = document.getElementById("chart-regions-bars");
  barContainer.innerHTML = "";
  MATRIX_DATA.slice(0, 7).forEach(item => {
    const percent = Math.round((item.done / item.planned) * 100);
    const row = document.createElement("div");
    row.className = "bar-row";
    row.onclick = () => openDemoPdf("Tekshiruv hisoboti", item.region, `Hudud: ${item.region}\nRejalashtirilgan: ${item.planned} ta tekshiruv\nYakunlangan: ${item.done} ta\nAniqlangan qonunbuzarliklar: ${item.violations} ta.\nIjro samaradorligi: ${item.rate}. Kamchiliklarni bartaraf etish to‘g‘risida taqdimnoma kiritildi.`);
    row.innerHTML = `
      <div class="bar-label">${item.region}</div>
      <div class="bar-track">
        <div class="bar-fill" style="width: ${percent}%;"></div>
      </div>
      <div class="bar-val">${percent}%</div>
    `;
    barContainer.appendChild(row);
  });

  // Chart 2: Xavf balansi
  const riskBalance = document.getElementById("chart-risk-balance");
  riskBalance.innerHTML = `
    <div class="balance-item risk-a" onclick="switchTab('risk'); filterRiskCategory('A');">
      <b>A - Toifa (Yuqori xavfli)</b>
      <span>48 ta xodim &rarr;</span>
    </div>
    <div class="balance-item risk-b" onclick="switchTab('risk'); filterRiskCategory('B');">
      <b>B - Toifa (O‘rta xavfli)</b>
      <span>94 ta xodim &rarr;</span>
    </div>
    <div class="balance-item risk-c" onclick="switchTab('risk'); filterRiskCategory('C');">
      <b>C - Toifa (Past xavfli)</b>
      <span>191 ta xodim &rarr;</span>
    </div>
  `;
}

// 2. 14 HUDUD HISOBOT MATRITSASI
function renderMatrixTable() {
  const tbody = document.querySelector("#matrix-table tbody");
  tbody.innerHTML = "";
  MATRIX_DATA.forEach((row, idx) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${idx + 1}</td>
      <td><b>${row.region}</b></td>
      <td>${row.planned}</td>
      <td><span class="status-pill pill-success">${row.done}</span></td>
      <td><span class="status-pill pill-warning">${row.inProgress}</span></td>
      <td><span class="status-pill pill-danger">${row.violations}</span></td>
      <td><b>${row.rate}</b></td>
      <td>
        <button class="btn-doc" onclick="openDemoPdf('Hisobot Dalolatnomasi', '${row.region}', 'Matritsa ko‘rsatkichi: ${row.region} bo‘yicha 2026-yil rejasidagi ${row.planned} ta tekshiruvdan ${row.done} tasi to‘liq yakunlandi. Aniqlangan ${row.violations} ta holat bo‘yicha huquqiy baho berildi va komplayens taqdimnomasi rasmiylashtirildi.')">
          📑 Demo PDF
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// 3. TOPSHIRIQLAR NAZORATI
function renderTasks() {
  const container = document.getElementById("tasks-region-container");
  container.innerHTML = "";
  REGIONS.forEach((reg, i) => {
    const card = document.createElement("div");
    card.className = "region-task-card";
    card.innerHTML = `
      <h3>${reg} <span class="status-pill pill-primary">${(i % 3) + 2} ta topshiriq</span></h3>
      <ul class="task-list">
        <li class="task-list-item">
          <span>1. Moliyaviy hujjatlar ichki auditi</span>
          <button class="btn-doc" onclick="openDemoPdf('Topshiriq Ijrosi', '${reg}', '${reg} hududiy bo‘limiga yuklatilgan moliyaviy audit tekshiruvi topshirig‘i to‘liq bajarildi. Ijro hujjati tasdiqlandi.')">PDF</button>
        </li>
        <li class="task-list-item">
          <span>2. Korrupsiyaga qarshi profilaktika suhbati</span>
          <button class="btn-doc" onclick="openDemoPdf('Profilaktika Bayonnomasi', '${reg}', '${reg} bo‘yicha xodimlar bilan o‘tkazilgan korrupsiyaga qarshi tadbir bayonnomasi va ro‘yxati.')">PDF</button>
        </li>
      </ul>
    `;
    container.appendChild(card);
  });
}

// 4. KORRUPSION XAVF (A, B, C)
function renderRiskSection() {
  document.getElementById("risk-count-a").innerText = RISK_CATEGORIES_DATA.A.total;
  document.getElementById("risk-count-b").innerText = RISK_CATEGORIES_DATA.B.total;
  document.getElementById("risk-count-c").innerText = RISK_CATEGORIES_DATA.C.total;
}

function filterRiskCategory(catKey) {
  const area = document.getElementById("risk-drilldown-area");
  const data = RISK_CATEGORIES_DATA[catKey];
  area.style.display = "block";
  let html = `
    <h3 style="margin-bottom: 14px; color: #1e293b;">${data.title} - 14 Hudud Xodimlari Kesimida Drill-down</h3>
    <table class="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>F.I.SH</th>
          <th>Hudud</th>
          <th>Lavozimi</th>
          <th>Xavf tavsifi</th>
          <th>Sana</th>
          <th>Harakat</th>
        </tr>
      </thead>
      <tbody>
  `;
  data.items.forEach(item => {
    html += `
      <tr>
        <td>${item.id}</td>
        <td><b>${item.name}</b></td>
        <td>${item.region}</td>
        <td>${item.position}</td>
        <td><span class="status-pill pill-danger">${item.riskDesc}</span></td>
        <td>${item.date}</td>
        <td>
          <button class="btn-doc" onclick="openDemoPdf('Xavf Xulosasi: ${item.name}', '${item.region}', 'Xodim: ${item.name}\\nLavozimi: ${item.position}\\nHudud: ${item.region}\\nXavf darajasi: ${catKey}-toifa\\nTavsif: ${item.riskDesc}.\\nKomplayens xulosasi: Shaxsiy nazoratga olingan va rotatsiya qilish tavsiya etilgan.')">
            📄 Xulosa PDF
          </button>
        </td>
      </tr>
    `;
  });
  html += `</tbody></table>`;
  area.innerHTML = html;
  area.scrollIntoView({ behavior: 'smooth' });
}

// 5. BO‘SHATILGAN XODIMLAR
function renderDismissed() {
  const tbody = document.querySelector("#dismissed-table tbody");
  tbody.innerHTML = "";
  DISMISSED_DATA.forEach((row, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${i + 1}</td>
      <td><b>${row.name}</b></td>
      <td>${row.region}</td>
      <td>${row.position}</td>
      <td><span class="status-pill pill-danger">${row.reason}</span></td>
      <td>${row.date}</td>
      <td>
        <button class="btn-doc" onclick="openDemoPdf('Bo‘shatish To‘g‘risida Buyruq', '${row.region}', 'Buyruq №: ${row.orderNum}\\nF.I.SH: ${row.name}\\nEgallagan lavozimi: ${row.position}\\nAsos: Komplayens nazorati dalolatnomasi va ${row.reason}. Shartnoma bekor qilingan.')">
          📑 Buyruq PDF
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// 6. TEZKOR TADBIRLAR
function renderOperational(filter = 'all') {
  const tbody = document.querySelector("#operational-table tbody");
  tbody.innerHTML = "";
  const list = filter === 'all' ? OPERATIONAL_DATA : OPERATIONAL_DATA.filter(o => o.agency === filter);
  list.forEach((row, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${i + 1}</td>
      <td><span class="status-pill ${row.agency === 'Agentlik' ? 'pill-primary' : 'pill-warning'}">${row.agency}</span></td>
      <td>${row.region}</td>
      <td><b>${row.topic}</b></td>
      <td>${row.date}</td>
      <td>${row.result}</td>
      <td>
        <button class="btn-doc" onclick="openDemoPdf('Tezkor Tadbir Bayonnomasi', '${row.region}', 'Organ: ${row.agency}\\nHudud: ${row.region}\\nMavzu: ${row.topic}\\nNatija: ${row.result}\\nQonuniy chora ko‘rish uchun prokuraturaga yuborilgan.')">
          ⚡ Hujjat PDF
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function filterOperational(agency) {
  document.querySelectorAll(".filters-bar .filter-chip").forEach(chip => {
    chip.classList.toggle("active", chip.innerText.includes(agency) || (agency === 'all' && chip.innerText.includes('Barcha')));
  });
  renderOperational(agency);
}

// 7. SUDLANGANLAR REYESTRI
function renderConvicted() {
  const tbody = document.querySelector("#convicted-table tbody");
  tbody.innerHTML = "";
  CONVICTED_DATA.forEach((row, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${i + 1}</td>
      <td><b>${row.fullName}</b></td>
      <td>${row.region}</td>
      <td><span class="status-pill pill-danger">${row.article}</span></td>
      <td>${row.judgmentDate}</td>
      <td><span class="status-pill pill-warning">${row.status}</span></td>
      <td>
        <button class="btn-doc" onclick="openDemoPdf('Sud Hukmi Nusxasi', '${row.region}', 'Sud hujjati raqami: ${row.courtDocId}\\nMahkum: ${row.fullName}\\nModda: ${row.article}\\nSudlanganlik muddati: ${row.judgmentDate} yildan hisoblangan.')">
          ⚖️ Hukm PDF
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// 8. MANFAATLAR TO‘QNASHUVI
function renderConflictMatrix() {
  const tbody = document.querySelector("#conflict-matrix-table tbody");
  tbody.innerHTML = "";
  CONFLICT_MATRIX_DATA.forEach((row, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${i + 1}</td>
      <td><b>${row.region}</b></td>
      <td><span class="status-pill pill-danger">${row.detected} ta</span></td>
      <td><span class="status-pill pill-success">${row.resolved} ta</span></td>
      <td><span class="status-pill pill-warning">${row.pending} ta</span></td>
      <td><b>${row.businessCases} ta holat</b></td>
      <td>
        <button class="btn-doc" onclick="showConflictDrilldown('${row.region}', ${row.detected}, ${row.resolved}, ${row.pending})">
          🔍 Xodimlar ro‘yxati
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function showConflictDrilldown(region, det, res, pend) {
  const area = document.getElementById("conflict-details-area");
  area.style.display = "block";
  area.innerHTML = `
    <h3 style="margin-bottom: 12px; color: #1e293b;">${region} - Manfaatlar to‘qnashuvi aniqlangan shaxslar</h3>
    <p style="margin-bottom: 14px; font-size: 14px; color: #64748b;">Jami aniqlangan: ${det} ta | Bartaraf etilgan: ${res} ta | Jarayonda: ${pend} ta</p>
    <table class="data-table">
      <thead>
        <tr>
          <th>Xodim</th>
          <th>Tashkilot</th>
          <th>To‘qnashuv shakli</th>
          <th>Holat</th>
          <th>PDF Qaror</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><b>Sh. E. Oripov</b></td>
          <td>${region} Boshqarmasi</td>
          <td>Yaqin qarindoshi ta'sischiligidagi MCHJ bilan shartnoma tuzilgan</td>
          <td><span class="status-pill pill-warning">Bartaraf etilmoqda</span></td>
          <td><button class="btn-doc" onclick="openDemoPdf('Manfaatlar to‘qnashuvi xulosasi', '${region}', 'Xodim: Sh. E. Oripov\\nHolat: Davlat xaridlarida yaqin qarindoshlik aloqasini yashirish.\\nKo‘rilgan chora: Shartnoma bekor qilingan, rotatsiya chorasi belgilangan.')">PDF</button></td>
        </tr>
      </tbody>
    </table>
  `;
  area.scrollIntoView({ behavior: 'smooth' });
}

// 9. 5 BOSQICHLI ARXIV
function renderArchive() {
  const container = document.getElementById("archive-stages-container");
  container.innerHTML = "";
  ARCHIVE_STAGES_DATA.forEach(stage => {
    const card = document.createElement("div");
    card.className = "archive-stage-card";
    card.innerHTML = `
      <div>
        <span class="stage-badge">${stage.stage}-BOSQICH</span>
        <h3 style="margin-top: 8px; font-size: 17px;">${stage.name}</h3>
        <p style="font-size: 14px; color: #64748b; margin-top: 4px;">Hujjatlar soni: <b>${stage.totalDocs} ta</b> | Turi: ${stage.docType}</p>
      </div>
      <div>
        <button class="btn-doc" style="padding: 10px 16px;" onclick="openDemoPdf('${stage.name} - Yig‘majild', 'O‘zbekiston Respublikasi', 'Bosqich: ${stage.stage}\\nHujjatlar to‘plami: ${stage.totalDocs} ta yig‘majild.\\nArxiv holati: Barcha komplayens tekshiruvlari yakunlangan va raqamli reestrga muhrlangan.')">
          🗄️ Yig‘majild PDF
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

// UMUMIY DRILLDOWN (Dashboarddan to'g'ridan-to'g'ri kirish)
function drillDownDashboard(type, val) {
  if (type === 'inspections') {
    switchTab('matrix');
  } else if (type === 'risk') {
    switchTab('risk');
    filterRiskCategory(val);
  } else if (type === 'conflict') {
    switchTab('conflict');
  } else if (type === 'operational') {
    switchTab('operational');
    filterOperational(val);
  }
}

function switchTab(tabKey) {
  const navBtn = document.querySelector(`.nav-item[data-tab="${tabKey}"]`);
  if (navBtn) navBtn.click();
}

// INTERAKTIV PDF MODAL OYNASINI OCHISH
function openDemoPdf(title, region, bodyContent) {
  const modal = document.getElementById("pdf-modal");
  const code = "KN-DOC-" + Math.floor(100000 + Math.random() * 900000);
  
  document.getElementById("modal-doc-title").innerText = title;
  document.getElementById("modal-doc-code").innerText = code;
  document.getElementById("paper-region-title").innerText = region.toUpperCase() + " BOSHQARMASI";
  document.getElementById("paper-act-title").innerText = title.toUpperCase();
  document.getElementById("paper-body-text").innerText = bodyContent;
  
  const today = new Date().toLocaleDateString("uz-UZ");
  document.getElementById("paper-doc-date").innerText = `Sana: ${today}`;
  document.getElementById("paper-doc-place").innerText = `Hudud: ${region}`;

  modal.style.display = "flex";
}

function closeDocModal() {
  document.getElementById("pdf-modal").style.display = "none";
}
