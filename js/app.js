// ==========================================
// 1. SAHIFA ALMASHISH VA MODALLAR
// ==========================================
window.switchTab = function(tabId) {
  exitExplorerToDashboard();
  const tabs = ['dashboard', 'regions-matrix', 'tasks-panel', 'matrix-report', 'risk-groups', 'fired-list', 'operations', 'convicted', 'conflict-business', 'documents'];
  tabs.forEach(id => {
    const el = document.getElementById('tab-' + id);
    const btn = document.getElementById('btn-' + id);
    if (el) el.classList.add('hidden');
    if (btn) btn.classList.remove('active');
  });

  const current = document.getElementById('tab-' + tabId);
  if (current) current.classList.remove('hidden');

  const activeBtn = document.getElementById('btn-' + tabId);
  if (activeBtn) activeBtn.classList.add('active');

  const titles = {
    'dashboard': 'Boshqaruv va Chuqur Tahlillar',
    'regions-matrix': '14 ta Hudud Topshiriq Matritsasi (Agentlik va Palata)',
    'tasks-panel': 'Respublika Nazorat Topshiriqlari Ijrosi Paneli',
    'matrix-report': 'Xizmat Tekshiruvlari Hisobot Matritsasi (333 ta)',
    'risk-groups': 'Korrupsion Xavf Guruhlari (A, B, D Toifalar)',
    'fired-list': 'Komplayens Tashabbusi Bilan Bo\'shatilgan Xodimlar',
    'operations': 'Vakolatli Organlar O\'tkazgan Tezkor Tadbirlar',
    'convicted': 'Sudlangan va Mansab Huquqidan Mahrum Etilganlar Reyestri',
    'conflict-business': 'Manfaatlar To\'qnashuvi va Tadbirkorlik (STIR)',
    'documents': '5 Bosqichli Elektron Hujjatlar Arxivi'
  };
  if (document.getElementById('page-title')) {
    document.getElementById('page-title').innerText = titles[tabId] || 'Nazorat Portali';
  }
};

window.openModal = function(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('hidden');
};

window.closeModal = function(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('hidden');
};

// ==========================================
// 2. GRAFIK (HAQIQIY SON VA FOIZLARI BILAN)
// ==========================================
window.setTimeFilter = function(type) {
  ['week', 'month', 'year'].forEach(t => {
    const b = document.getElementById('filter-' + t);
    if (b) b.classList.remove('active');
  });
  const active = document.getElementById('filter-' + type);
  if (active) active.classList.add('active');

  if (type === 'week') {
    document.getElementById('kpi-investigations').innerText = '48 ta';
    document.getElementById('kpi-convicted').innerText = '2 nafar';
    document.getElementById('kpi-operations').innerText = '3 ta';
    document.getElementById('kpi-risk').innerText = '11 nafar';
    document.getElementById('kpi-fired').innerText = '4 nafar';
    document.getElementById('chart-badge').innerText = 'Haftalik';
    renderDynamicChart('week');
  } else if (type === 'month') {
    document.getElementById('kpi-investigations').innerText = '333 ta';
    document.getElementById('kpi-convicted').innerText = '18 nafar';
    document.getElementById('kpi-operations').innerText = '14 ta';
    document.getElementById('kpi-risk').innerText = '46 nafar';
    document.getElementById('kpi-fired').innerText = '25 nafar';
    document.getElementById('chart-badge').innerText = 'Oylik Dinamika';
    renderDynamicChart('month');
  } else if (type === 'year') {
    document.getElementById('kpi-investigations').innerText = '1,420 ta';
    document.getElementById('kpi-convicted').innerText = '74 nafar';
    document.getElementById('kpi-operations').innerText = '68 ta';
    document.getElementById('kpi-risk').innerText = '182 nafar';
    document.getElementById('kpi-fired').innerText = '94 nafar';
    document.getElementById('chart-badge').innerText = 'Yillik';
    renderDynamicChart('year');
  }
};

function renderDynamicChart(mode) {
  const container = document.getElementById('chartBarsContainer');
  if (!container) return;
  let pts = [];

  if (mode === 'week') {
    pts = [
      { l: 'Du', v: 1, t: '-1 ta', c: '#047857' },
      { l: 'Se', v: 3, t: '+2 ta', c: '#be123c' },
      { l: 'Cho', v: 4, t: '+1 ta', c: '#be123c' },
      { l: 'Pa', v: 2, t: '-2 ta', c: '#047857' },
      { l: 'Ju', v: 3, t: '+1 ta', c: '#1d4ed8' },
      { l: 'Sha', v: 1, t: '-2 ta', c: '#047857' }
    ];
  } else if (mode === 'year') {
    pts = [
      { l: '2023-y', v: 42, t: 'Baza', c: '#1d4ed8' },
      { l: '2024-y', v: 56, t: '+33%', c: '#1d4ed8' },
      { l: '2025-y', v: 71, t: '+26%', c: '#be123c' },
      { l: '2026-y', v: 68, t: '-4%', c: '#047857' }
    ];
  } else {
    pts = [
      { l: 'Aprel', v: 8, t: '-20%', c: '#047857' },
      { l: 'May', v: 12, t: '+50%', c: '#1d4ed8' },
      { l: 'Iyun', v: 9, t: '-25%', c: '#047857' },
      { l: 'Iyul', v: 16, t: '+77%', c: '#be123c' },
      { l: 'Avgust', v: 11, t: '-31%', c: '#047857' },
      { l: 'Sentabr', v: 14, t: '+27%', c: '#be123c' }
    ];
  }

  const maxV = Math.max(...pts.map(p => p.v));
  container.innerHTML = pts.map(p => {
    const h = Math.round((p.v / maxV) * 58) + 14;
    const isUp = p.t.includes('+');
    return `
      <div class="chart-col">
        <span class="trend-badge ${isUp ? 'trend-up' : 'trend-down'}">${p.t}</span>
        <b style="font-size: 11px; color: ${p.c}; margin-bottom: 2px;">${p.v} ta</b>
        <div class="chart-bar-elem" style="height: ${h}px; background: ${p.c};"></div>
        <span style="font-size: 10px; font-weight: 700; color: #475569; margin-top: 4px;">${p.l}</span>
      </div>
    `;
  }).join('');
}

// ==========================================
// 3. BUTUN EKRAN PAPKA EXPLORER (HUDUD > BOSHQARMA > TUMAN > XODIM)
// ==========================================

let explorerPath = { cat: null, region: null, wing: null };

window.openExplorer = function(categoryKey, regionName, wing) {
  explorerPath = { cat: categoryKey, region: regionName, wing: wing };
  document.getElementById('dashboardMainView').classList.add('hidden');
  document.getElementById('explorerViewArea').classList.remove('hidden');
  renderExplorerContent();
};

window.exitExplorerToDashboard = function() {
  document.getElementById('explorerViewArea').classList.add('hidden');
  document.getElementById('dashboardMainView').classList.remove('hidden');
};

function renderExplorerContent() {
  const bc = document.getElementById('explorerBreadcrumb');
  const body = document.getElementById('explorerBody');

  const catNames = {
    'investigations': 'Xizmat Tekshiruvlari (333 ta)',
    'convicted': 'Sudlangan Xodimlar Reyestri (18 nafar)',
    'operations': 'Tezkor Tadbirlar (14 ta)',
    'risk': 'Korrupsion Xavf Guruhlari (A, B, D Toifalar)',
    'fired': 'Komplayens Bo\'shatgan Xodimlar (25 nafar)',
    'all': '14 ta Hududiy Boshqarma'
  };

  // 1-BOSQICH: HUDUDLAR RO'YXATI
  if (!explorerPath.region) {
    bc.innerHTML = `
      <span onclick="exitExplorerToDashboard()">&#128194; Bosh sahifa</span> &rarr; 
      <b>${catNames[explorerPath.cat] || 'Hududlar'}</b>
    `;

    body.innerHTML = `
      <div class="grid-2">
        ${window.regionsReportData.map(r => {
          let count = r.invCount;
          if (explorerPath.cat === 'convicted') count = r.convictedCount;
          if (explorerPath.cat === 'operations') count = r.opsCount;
          if (explorerPath.cat === 'risk') count = r.riskCount;
          if (explorerPath.cat === 'fired') count = r.firedCount;

          return `
            <div onclick="openExplorer('${explorerPath.cat}', '${r.name}', null)" class="folder-grid-item">
              <div>
                <b style="font-size: 14px; color: #0b132b;">&#128193; ${r.name}</b>
                <p style="font-size: 11px; color: #64748b; margin-top: 4px;">
                  Tekshiruvlar: <b>${r.invCount}</b> | Sudlangan: <b>${r.convictedCount}</b> \vert{} Xavf (A, B, D): <b>${r.riskCount}</b>
                </p>
              </div>
              <span class="badge ${count > 0 ? 'badge-rose' : 'badge-slate'}">${count} ta ish &rarr;</span>
            </div>
          `;
        }).join('')}
      </div>
    `;
    return;
  }

  // 2-BOSQICH: AGENTLIK VA PALATA
  if (!explorerPath.wing) {
    bc.innerHTML = `
      <span onclick="exitExplorerToDashboard()">&#128194; Bosh sahifa</span> &rarr; 
      <span onclick="openExplorer('${explorerPath.cat}', null, null)">${catNames[explorerPath.cat]}</span> &rarr; 
      <b>${explorerPath.region}</b>
    `;

    body.innerHTML = `
      <div style="margin-bottom: 14px;">
        <button onclick="openExplorer('${explorerPath.cat}', null, null)" class="btn btn-slate">&larr; Viloyatlarga qaytish</button>
      </div>
      <div class="grid-2">
        <div onclick="openExplorer('${explorerPath.cat}', '${explorerPath.region}', 'agentlik')" class="folder-grid-item" style="border-left: 5px solid #1d4ed8; padding: 20px;">
          <div>
            <b style="font-size: 15px; color: #1d4ed8;">&#128193; Kadastr Agentligi ${explorerPath.region} boshqarmasi</b>
            <p style="font-size: 12px; color: #64748b; margin-top: 6px;">Davlat yer nazorati, geodeziya, ma'muriy amaliyot bo'limi</p>
          </div>
          <span class="badge badge-blue">Tumanlar &rarr;</span>
        </div>

        <div onclick="openExplorer('${explorerPath.cat}', '${explorerPath.region}', 'palata')" class="folder-grid-item" style="border-left: 5px solid #4f46e5; padding: 20px;">
          <div>
            <b style="font-size: 15px; color: #4f46e5;">&#128193; Davlat Kadastrlari Palatasi ${explorerPath.region} boshqarmasi</b>
            <p style="font-size: 12px; color: #64748b; margin-top: 6px;">Ko'chmas mulkni ro'yxatga olish, arxiv ishlari va kadastr pasportlari</p>
          </div>
          <span class="badge badge-emerald">Tumanlar &rarr;</span>
        </div>
      </div>
    `;
    return;
  }

  // 3-BOSQICH: ANIQ TUMANLAR VA MAS'UL XODIMLAR JILDI
  bc.innerHTML = `
    <span onclick="exitExplorerToDashboard()">&#128194; Bosh sahifa</span> &rarr; 
    <span onclick="openExplorer('${explorerPath.cat}', null, null)">${catNames[explorerPath.cat]}</span> &rarr; 
    <span onclick="openExplorer('${explorerPath.cat}', '${explorerPath.region}', null)">${explorerPath.region}</span> &rarr; 
    <b>${explorerPath.wing === 'agentlik' ? 'Agentlik boshqarmasi' : 'Palata boshqarmasi'}</b>
  `;

  let list = [];
  if (window.deepDrillDatabase) {
    if (explorerPath.cat === 'all') {
      for (let k in window.deepDrillDatabase) {
        list.push(...window.deepDrillDatabase[k].filter(i => i.region === explorerPath.region && i.wing === explorerPath.wing));
      }
    } else {
      const raw = window.deepDrillDatabase[explorerPath.cat] || [];
      list = raw.filter(i => i.region === explorerPath.region && i.wing === explorerPath.wing);
    }
  }

  body.innerHTML = `
    <div style="margin-bottom: 14px;">
      <button onclick="openExplorer('${explorerPath.cat}', '${explorerPath.region}', null)" class="btn btn-slate">&larr; Boshqarmalarga qaytish</button>
    </div>
    <div style="display: flex; flex-direction: column; gap: 10px;">
      ${list.length > 0 ? list.map(item => `
        <div class="card" style="padding: 16px; border-left: 5px solid ${item.type === 'A' ? '#be123c' : item.type === 'B' ? '#d97706' : item.type === 'D' ? '#047857' : '#1d4ed8'};">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <b style="font-size: 14px; color: #0b132b;">&#128196; ${item.district} — ${item.officer}</b>${item.type ? `<span class="risk-badge-${item.type}">${item.type} toifa xavf</span>` : ''}
              </div>
              <p style="font-size: 11px; color: #475569; margin: 4px 0;">Lavozimi: <b>${item.role}</b> | JSHSHIR: <b style="color:#2563eb;">${item.pinfl}</b></p>
              <p style="font-size: 11px; color: #b45309; font-weight: 600;">Asos / Omil: ${item.reason}</p>
            </div>
            <button onclick="openPdfViewer('${item.docType}', '${item.code}', '${item.district}', '${item.date}', '${item.officer}:${item.reason}')" class="btn btn-slate" style="padding: 8px 14px;">
              &#128196; Asos Hujjat (PDF) &rarr;
            </button>
          </div>
        </div>
      `).join('') : `
        <div style="padding: 30px; text-align: center; color: #64748b; background: #fff; border-radius: 8px; border: 1px dashed #cbd5e1;">
          Ushbu boshqarma va unga qarashli tuman filiallarida hozircha ochiq ish mavjud emas (profilaktik monitoringda).
        </div>
      `}
    </div>
  `;
}

// ==========================================
// 4. DEMO PDF CHOP ETISH BILAN
// ==========================================
window.openPdfViewer = function(docType, p1, p2, p3, p4) {
  const paper = document.getElementById('pdfPaperContent');
  if (!paper) return;

  let html = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; border-bottom: 1px solid #ccc; padding-bottom: 8px;">
      <span style="font-size: 12px; font-weight: bold; color: #333;">O'zbekiston Respublikasi Kadastr Agentligi Komplayens Nazorati</span>
      <button onclick="window.print()" class="btn btn-blue">&#128438; Chop etish / PDF Saqlash</button>
    </div>
  `;

  if (docType === 'risk') {
    document.getElementById('pdfDocTitle').innerText = `Korrupsion Xavf Baholash Xulosasi — ${p1}`;
    html += `
      <div class="pdf-header">
        <h2>O'ZBEKISTON RESPUBLIKASI KADASTR AGENTLIGI</h2>
        <h2>XODIMNING KORRUPSION XAVF DARAJASINI BAHOLASH XULOSASI</h2>
        <p>Hujjat kodi: ${p1} | Filial: ${p2} | Sana: ${p3}</p>
      </div>
      <p style="text-indent: 30px; margin-bottom: 15px;">
        Korrupsiyaga qarshi ichki nazorat tuzilmasi o'tkazgan baholash natijasida quyidagi xavf omili aniqlangan:
      </p>
      <p style="text-indent: 30px; margin-bottom: 15px;">
        Xavf asosi: <b>${p4}</b>. Mazkur xodim bevosita moddiy javobgarlik va ruxsat beruvchi vakolatga egaligi sababli maxsus nazorat reyestriga kiritildi.
      </p>
      <div class="pdf-stamp">
        <div><p>Komplayens inspektori: ____________</p><p style="font-size: 10px; color: #666;">Elektron raqamli imzo tasdiqlangan</p></div>
        <div class="stamp-box" style="border-color: #be123c; color: #be123c;">KORRUPSION XAVF REYESTRI<br>XULOSA TASDIQLANDI</div>
      </div>
    `;
  } else if (docType === 'court') {
    document.getElementById('pdfDocTitle').innerText = `Sud Hukmi Nusxasi — ${p1}`;
    html += `
      <div class="pdf-header">
        <h2>O'ZBEKISTON RESPUBLIKASI NOMI BILAN</h2>
        <h2>JINOYAT ISHLARI BO'YICHA SUD HUKMI (NUSXA)</h2>
        <p>Hujjat kodi: ${p1} | Sud: ${p2} | Sana: ${p3}</p>
      </div>
      <p style="text-indent: 30px; margin-bottom: 15px;">
        Sud hay'ati, xodimning jinoiy javobgarligi masalasini ko'rib chiqib quyidagini aniqladi:
      </p>
      <p style="text-indent: 30px; font-weight: bold; margin-bottom: 25px;">
        HUKM: ${p4}. Davlat kadastrlari tizimida 2 yil muddatga mansabdorlik lavozimlarida ishlash huquqidan mahrum etilsin.
      </p>
      <div class="pdf-stamp">
        <div><p>Sudya: ____________</p><p style="font-size: 10px; color: #666;">Sud tizimi orqali tasdiqlangan</p></div>
        <div class="stamp-box" style="border-color: #be123c; color: #be123c;">SUD HUKMI QONUNIY<br>KUCHGA KIRGAN</div>
      </div>
    `;
  } else if (docType === 'operation') {
    document.getElementById('pdfDocTitle').innerText = `Tezkor Tadbir Bayonnomasi — ${p1}`;
    html += `
      <div class="pdf-header">
        <h2>VAKOLATLI HUQUQNI MUHOFAZA QILUVCHI ORGAN</h2>
        <h2>MAXSUS TEZKOR TADBIR BAYONNOMASI</h2>
        <p>Hujjat: ${p1} | Hudud: ${p2} | Sana: ${p3}</p>
      </div>
      <p style="text-indent: 30px; margin-bottom: 15px;">
        Tezkor tadbir natijasida fuqarodan noqonuniy yer pasporti rasmiylashtirish evaziga mablag' olayotgan xodim jinoyat ustida ushlandi.
      </p>
      <p style="text-indent: 30px; font-weight: bold; margin-bottom: 25px;">
        Ashyoviy dalillar va holat: ${p4}. Barcha dalillar tergov organiga taqdim etildi.
      </p>
      <div class="pdf-stamp">
        <div><p>Tezkor guruh rahbari: __________</p><p>Kadastr komplayens vakili: __________</p></div>
        <div class="stamp-box">TEZKOR HAMKORLIK<br>ASOSIY DALIL MUHRLANDI</div>
      </div>
    `;
  } else {
    document.getElementById('pdfDocTitle').innerText = `Rasmiy Buyruq Nusxasi — ${p1}`;
    html += `
      <div class="pdf-header">
        <h2>O'ZBEKISTON RESPUBLIKASI KADASTR AGENTLIGI</h2>
        <h2>MEHNAT SHARTNOMASINI BEKOR QILISH TO'G'RISIDA BUYRUQ</h2>
        <p>${p1} | ${p2} | ${p3}</p>
      </div>
      <p style="text-indent: 30px; margin-bottom: 25px;">Tafsilot: <b>${p4}</b>. Mehnat Kodeksining 161-moddasi bilan mehnat munosabatlari to'xtatildi.</p>
      <div class="pdf-stamp">
        <div><p>Boshqarma boshlig'i: ____________</p></div>
        <div class="stamp-box" style="border-color: #047857; color: #047857;">KADASTR AGENTLIGI<br>BUYRUQ IJRO ETILDI</div>
      </div>
    `;
  }

  paper.innerHTML = html;
  openModal('pdfViewerModal');
};

// ==========================================
// 5. HUDUDLAR KESIMIDAGI 3 TA YANGI MATRITSA JADVALI
// ==========================================

// MANFAATLAR TO'QNASHUVI MATRITSA JADVALI
function renderConflictMatritsaTable() {
  const tbody = document.getElementById('conflictMatritsaTableBody');
  if (!tbody || !window.regionsReportData) return;
  tbody.innerHTML = window.regionsReportData.map((r, i) => `
    <tr>
      <td>${i + 1}</td>
      <td style="font-weight: 700;">${r.name}</td>
      <td style="text-align: center; font-weight: 800;">${r.conflictCount + r.businessCount} ta</td>
      <td style="text-align: center; color: #d97706; font-weight: 700;">${r.conflictProcess} ta</td>
      <td style="text-align: center; color: #047857; font-weight: 700;">${r.conflictDone} ta</td>
      <td style="text-align: center; color: #be123c; font-weight: 700;">${r.conflictUndone} ta</td>
      <td style="text-align: center;"><span class="badge ${r.conflictUndone > 0 ? 'badge-rose' : 'badge-emerald'}">${r.conflictUndone > 0 ? 'Nazoratda' : 'Bartaraf etilgan'}</span></td>
    </tr>
  `).join('');
}

// BO'SHATILGANLAR RAQAMLI ASOS JADVALI
function renderFiredMatritsaTable() {
  const tbody = document.getElementById('firedMatritsaTableBody');
  if (!tbody || !window.regionsReportData) return;
  tbody.innerHTML = window.regionsReportData.map((r, i) => `
    <tr>
      <td>${i + 1}</td>
      <td style="font-weight: 700;">${r.name}</td>
      <td style="text-align: center; font-weight: 800; color: #be123c;">${r.firedCount} nafar</td>
      <td>Yer chegaralarini o'zboshimchalik bilan o'zgartirish, noqonuniy kadastr pasporti tuzish</td>
      <td style="font-weight: 600;">Mehnat Kodeksi 161-moddasi bilan mehnat shartnomasi bekor qilingan</td>
      <td style="text-align: center;"><span class="badge badge-emerald">Tizimdan chetlatilgan</span></td>
    </tr>
  `).join('');
}

// KORRUPSION XAVF (A, B, D) 3 TOIFALI JADVALI
function renderRiskCategoryTable() {
  const tbody = document.getElementById('riskCategoryTableBody');
  if (!tbody || !window.regionsReportData) return;
  tbody.innerHTML = window.regionsReportData.map((r, i) => `
    <tr>
      <td>${i + 1}</td>
      <td style="font-weight: 700;">${r.name}</td>
      <td style="text-align: center;"><b class="risk-badge-A">${r.riskA || 1} nafar</b></td>
      <td style="text-align: center;"><b class="risk-badge-B">${r.riskB || 1} nafar</b></td>
      <td style="text-align: center;"><b class="risk-badge-D">${r.riskD || 1} nafar</b></td>
      <td style="text-align: center; font-weight: 800;">${r.riskCount} nafar</td>
      <td style="text-align: center;"><span class="badge badge-amber">Audio/video nazorat & Rotatsiya</span></td>
    </tr>
  `).join('');
}

// ==========================================
// 6. YANGI XODIM KIRITISH FORMALARI
// ==========================================
window.saveNewRiskEmployee = function() {
  const name = document.getElementById('risk-input-name').value;
  const pinfl = document.getElementById('risk-input-pinfl').value;
  const region = document.getElementById('risk-input-region').value;
  const wing = document.getElementById('risk-input-wing').value;
  const district = document.getElementById('risk-input-district').value;
  const category = document.getElementById('risk-input-category').value;
  const role = document.getElementById('risk-input-role').value;
  const reason = document.getElementById('risk-input-reason').value;

  if (!name || !pinfl || !district) {
    alert("Iltimos, xodimning F.I.SH, JSHSHIR va tuman filiali nomini to'liq kiriting!");
    return;
  }

  // Bazaga yangi xodimni qo'shamiz
  if (!window.deepDrillDatabase.risk) window.deepDrillDatabase.risk = [];
  window.deepDrillDatabase.risk.unshift({
    region: region,
    wing: wing,
    district: district,
    officer: name,
    pinfl: pinfl,
    role: role || 'Yetakchi mutaxassis',
    type: category,
    reason: reason || 'Korrupsion xavf omili qayd etildi',
    action: 'Maxsus nazoratga olindi',
    code: 'XAVF-2026-' + Date.now().toString().slice(-3),
    date: '30.09.2026',
    docType: 'risk'
  });

  // Viloyat statistikasini oshiramiz
  const regObj = window.regionsReportData.find(r => r.name === region);
  if (regObj) {
    regObj.riskCount++;
    if (category === 'A') regObj.riskA = (regObj.riskA || 0) + 1;
    if (category === 'B') regObj.riskB = (regObj.riskB || 0) + 1;
    if (category === 'D') regObj.riskD = (regObj.riskD || 0) + 1;
  }

  renderRiskCategoryTable();
  renderOtherRegionsGrids();
  closeModal('newRiskModal');
  alert("Yangi xodim korrupsion xavf reyestriga muvaffaqiyatli kiritildi!");
};

// 5 BOSQICHLI ARXIV
window.initArchive = function() {
  const badge = document.getElementById('archivePathBadge');
  if (badge) badge.innerText = "1-Bosqich: Hujjat Toifalari";

  const area = document.getElementById('archiveViewArea');
  if (!area) return;

  const cats = [
    { id: 'ops', name: '1. Tezkor Tadbirlar Arxivi', desc: 'DXX, Departament, IIB reyd bayonnomalari' },
    { id: 'inv', name: '2. Xizmat Tekshiruvi Xulosalari', desc: 'Komplayens dalolatnomalari va xulosalari' },
    { id: 'conf', name: '3. Manfaatlar To\'qnashuvi', desc: 'Qarindoshlik va tijorat subyektlari jildlari' },
    { id: 'stir', name: '4. STIR Dalolatnomalari', desc: 'Tadbirkorlik va MCHJ ta\'sischilari ro\'yxati' },
    { id: 'court', name: '5. Sud Hukmlari Nusxalari', desc: 'Mansab taqiqi belgilangan rasmiy hukmlar' },
    { id: 'tasks', name: '6. Ijro Xatlari va Topshiriqlar', desc: 'Agentlik va Palata topshiriqlari ijrosi' }
  ];

  area.innerHTML = `
    <div class="grid-3">
      ${cats.map(c => `
        <div onclick="openArchiveStage2('${c.name}')" class="folder-grid-item" style="border-left: 4px solid #1d4ed8;">
          <div>
            <b style="font-size: 14px; color: #0b132b;">&#128193; ${c.name}</b>
            <p style="font-size: 11px; color: #64748b; margin-top: 4px;">${c.desc}</p>
          </div>
          <span class="badge badge-blue">Kirish &rarr;</span>
        </div>
      `).join('')}
    </div>
  `;
};

window.openArchiveStage2 = function(catName) {
  document.getElementById('archivePathBadge').innerText = `${catName} > Hududlar`;
  const area = document.getElementById('archiveViewArea');
  area.innerHTML = `
    <div style="margin-bottom: 12px;"><button onclick="initArchive()" class="btn btn-slate">&larr; Hujjat toifalariga qaytish</button></div>
    <div class="grid-4">
      ${window.regionsReportData.map(r => `
        <div onclick="openArchiveStage3('${catName}', '${r.name}')" class="folder-grid-item">
          <b>&#128193; ${r.name}</b>
          <span class="badge badge-slate">Ochish &rarr;</span>
        </div>
      `).join('')}
    </div>
  `;
};

window.openArchiveStage3 = function(catName, regionName) {
  document.getElementById('archivePathBadge').innerText = `${catName} > ${regionName} > Yillar`;
  const area = document.getElementById('archiveViewArea');
  area.innerHTML = `
    <div style="margin-bottom: 12px;"><button onclick="openArchiveStage2('${catName}')" class="btn btn-slate">&larr; Viloyatlarga qaytish</button></div>
    <div class="grid-2">
      <div onclick="openArchiveStage4('${catName}', '${regionName}', '2026-yil')" class="folder-grid-item" style="border-left: 5px solid #1d4ed8; padding: 20px;">
        <div><b style="font-size: 16px; color: #1d4ed8;">&#128193; 2026-yil</b><p style="font-size: 11px; color: #64748b; margin-top: 4px;">Joriy yilgi 12 oy arxiv jildlari</p></div>
        <span class="badge badge-blue">Oylar &rarr;</span>
      </div>
      <div onclick="openArchiveStage4('${catName}', '${regionName}', '2025-yil')" class="folder-grid-item" style="border-left: 5px solid #64748b; padding: 20px;">
        <div><b style="font-size: 16px; color: #475569;">&#128193; 2025-yil</b><p style="font-size: 11px; color: #64748b; margin-top: 4px;">Yopilgan yillik arxiv jildlari</p></div>
        <span class="badge badge-slate">Oylar &rarr;</span>
      </div>
    </div>
  `;
};

window.openArchiveStage4 = function(catName, regionName, year) {
  document.getElementById('archivePathBadge').innerText = `${catName} > ${regionName} > ${year} > Oylar`;
  const area = document.getElementById('archiveViewArea');
  const months = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentabr', 'Oktyabr', 'Noyabr', 'Dekabr'];
  area.innerHTML = `
    <div style="margin-bottom: 12px;"><button onclick="openArchiveStage3('${catName}', '${regionName}')" class="btn btn-slate">&larr; Yillarga qaytish</button></div>
    <div class="grid-4">
      ${months.map(m => `
        <div onclick="openArchiveStage5('${catName}', '${regionName}', '${year}', '${m}')" class="folder-grid-item">
          <b>&#128193; ${m}</b>
          <span class="badge badge-blue">Fayllar &rarr;</span>
        </div>
      `).join('')}
    </div>
  `;
};

window.openArchiveStage5 = function(catName, regionName, year, month) {
  document.getElementById('archivePathBadge').innerText = `${regionName} > ${year} > ${month} > Hujjatlar`;
  const area = document.getElementById('archiveViewArea');
  area.innerHTML = `
    <div style="margin-bottom: 12px;"><button onclick="openArchiveStage4('${catName}', '${regionName}', '${year}')" class="btn btn-slate">&larr; Oylarga qaytish</button></div>
    <div class="box" style="padding: 0; overflow: hidden;">
      <table>
        <thead><tr><th>Hujjat Kodi va Nomi</th><th>Boshqarma va Filial</th><th>Yuklangan Sana</th><th>Hajmi</th><th style="text-align: center;">Asos Hujjat</th></tr></thead>
        <tbody>
          <tr>
            <td><b>${regionName}_${month}_№041_Xulosa.pdf</b></td>
            <td>Davlat Kadastrlari Palatasi tuman filiali</td>
            <td>24.09.2026</td>
            <td>2.8 MB</td>
            <td style="text-align: center;"><button onclick="openPdfViewer('investigation', 'ARX-041', '${regionName}', '2026', '${catName} arxividan rasmiy dalolatnoma')" class="btn btn-blue">Ochish PDF</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
};

// FORMALAR
window.saveNewTask = function() {
  const title = document.getElementById('task-title').value;
  if (!title) return alert("Topshiriq sarlavhasini yozing!");
  alert("Topshiriq kiritildi va nazoratga olindi!");
  closeModal('newTaskModal');
};

window.saveNewConvicted = function() {
  const name = document.getElementById('conv-name').value;
  if (!name) return alert("Xodim F.I.SH kiritilishi shart!");
  alert("Sudlangan xodim bazaga kiritildi!");
  closeModal('newConvictedModal');
};

window.saveNewOperation = function() {
  alert("Tezkor tadbir saqlandi!");
  closeModal('newOperationModal');
};

window.saveNewInvestigation = function() {
  alert("Xizmat tekshiruvi ochildi!");
  closeModal('newInvestigationModal');
};

window.exportMatrixToExcel = function() {
  alert("333 ta xizmat tekshiruvi matritsasi Excel formatida eksport qilinmoqda...");
};

function renderDashboardRegionsGrid() {
  const container = document.getElementById('dashboardRegionsGrid');
  if (!container || !window.regionsReportData) return;
  container.innerHTML = window.regionsReportData.map(r => `
    <div onclick="openExplorer('all', '${r.name}', null)" class="folder-grid-item" style="border-left: 4px solid #1d4ed8;">
      <div>
        <b style="font-size: 13px; color: #0b132b;">&#128193; ${r.name}</b>
        <p style="font-size: 11px; color: #64748b; margin-top: 4px;">
          Tekshiruv: <b style="color:#d97706;">${r.invCount} ta</b> | Sudlangan: <b style="color:#be123c;">${r.convictedCount} ta</b> | Xavf (A, B, D): <b style="color:#b45309;">${r.riskCount} ta</b>
        </p>
      </div>
      <span class="badge badge-blue">Agentlik va Palataga kirish &rarr;</span>
    </div>
  `).join('');
}

function renderTasksTable() {
  const tbody = document.getElementById('tasksTableBody');
  if (!tbody || !window.tasksData) return;
  tbody.innerHTML = window.tasksData.map(t => `
    <tr>
      <td><b>${t.id}</b> — ${t.title}</td>
      <td>${t.region}</td>
      <td>${t.target}</td>
      <td>${t.date}</td>
      <td>${t.deadline}</td>
      <td><span class="badge ${t.status === 'Bajarildi' ? 'badge-emerald' : 'badge-amber'}">${t.status}</span></td>
      <td style="text-align: center;"><button onclick="openPdfViewer('investigation', '${t.id}', '${t.region}', '${t.date}', '${t.title}')" class="btn btn-slate" style="padding: 4px 8px;">Topshiriq PDF</button></td>
    </tr>
  `).join('');
}

function renderMatrixTable() {
  const tbody = document.getElementById('matrixTbody');
  if (!tbody || !window.regionsReportData) return;
  tbody.innerHTML = '';
  let totals = { total: 0, hmmqo: 0, ichki: 0, hmmqo_prok: 0, hmmqo_iib: 0, hmmqo_dxx: 0, hmmqo_other: 0, ichki_prok: 0, ichki_iib: 0, ichki_dxx: 0, ichki_other: 0, hmmqo_crim: 0, hmmqo_adm: 0, hmmqo_83: 0, hmmqo_84: 0, hmmqo_rej: 0, hmmqo_proc: 0, hmmqo_fire: 0, hmmqo_disc: 0, ichki_crim: 0, ichki_adm: 0, ichki_83: 0, ichki_84: 0, ichki_rej: 0, ichki_proc: 0, ichki_fire: 0, ichki_disc: 0 };
  window.regionsReportData.forEach(r => { for (let k in totals) { totals[k] += (r[k] || 0); } });

  tbody.innerHTML += `
    <tr style="background: #e2e8f0; font-weight: 700;">
      <td colspan="2">JAMI</td><td style="background:#bbf7d0;">${totals.total}</td><td>${totals.hmmqo}</td><td>${totals.ichki}</td>
      <td>${totals.hmmqo_prok}</td><td>${totals.hmmqo_iib}</td><td>${totals.hmmqo_dxx}</td><td>${totals.hmmqo_other}</td>
      <td>${totals.ichki_prok}</td><td>${totals.ichki_iib}</td><td>${totals.ichki_dxx}</td><td>${totals.ichki_other}</td>
      <td style="color:#be123c;">${totals.hmmqo_crim}</td><td>${totals.hmmqo_adm}</td><td>${totals.hmmqo_83}</td><td>${totals.hmmqo_84}</td><td>${totals.hmmqo_rej}</td><td>${totals.hmmqo_proc}</td><td style="color:#be123c;">${totals.hmmqo_fire}</td><td>${totals.hmmqo_disc}</td>
      <td style="color:#be123c;">${totals.ichki_crim}</td><td>${totals.ichki_adm}</td><td>${totals.ichki_83}</td><td>${totals.ichki_84}</td><td>${totals.ichki_rej}</td><td>${totals.ichki_proc}</td><td style="color:#be123c;">${totals.ichki_fire}</td><td>${totals.ichki_disc}</td>
    </tr>
  `;

  window.regionsReportData.forEach((r, idx) => {
    tbody.innerHTML += `
      <tr>
        <td>${idx + 1}</td><td style="text-align:left; font-weight:600;">${r.name}</td>
        <td style="background:#f0fdf4; font-weight:700;">${r.total}</td><td>${r.hmmqo}</td><td>${r.ichki}</td>
        <td>${r.hmmqo_prok || '-'}</td><td>${r.hmmqo_iib || '-'}</td><td>${r.hmmqo_dxx || '-'}</td><td>${r.hmmqo_other || '-'}</td>
        <td>${r.ichki_prok || '-'}</td><td>${r.ichki_iib || '-'}</td><td>${r.ichki_dxx || '-'}</td><td>${r.ichki_other || '-'}</td>
        <td>${r.hmmqo_crim || '-'}</td><td>${r.hmmqo_adm || '-'}</td><td>${r.hmmqo_83 || '-'}</td><td>${r.hmmqo_84 || '-'}</td><td>${r.hmmqo_rej || '-'}</td><td>${r.hmmqo_proc || '-'}</td><td style="color:#be123c; font-weight:700;">${r.hmmqo_fire || '-'}</td><td>${r.hmmqo_disc || '-'}</td>
        <td>${r.ichki_crim || '-'}</td><td>${r.ichki_adm || '-'}</td><td>${r.ichki_83 || '-'}</td><td>${r.ichki_84 || '-'}</td><td>${r.ichki_rej || '-'}</td><td>${r.ichki_proc || '-'}</td><td style="color:#be123c; font-weight:700;">${r.ichki_fire || '-'}</td><td>${r.ichki_disc || '-'}</td>
      </tr>
    `;
  });
}

function renderConvictedTable() {
  const tbody = document.getElementById('convictedTableBody');
  if (!tbody || !window.convictedData) return;
  tbody.innerHTML = window.convictedData.map(c => `
    <tr>
      <td><b>${c.name}</b><br><small style="color: #2563eb;">${c.pinfl}</small></td>
      <td>${c.region}<br><small style="color: #64748b;">${c.role}</small></td>
      <td>${c.court}<br><small style="color: #64748b;">${c.date}</small></td>
      <td><span class="badge badge-rose">${c.articles}</span></td>
      <td>${c.punishment}</td>
      <td><span class="badge ${c.status === 'chetlatilgan' ? 'badge-emerald' : 'badge-rose'}">${c.status === 'chetlatilgan' ? 'Chetlatilgan' : 'Ishlamoqda'}</span></td>
      <td style="text-align: center;"><button onclick="openPdfViewer('court', '${c.name}', '${c.court}', '${c.date}', '${c.articles}')" class="btn btn-rose" style="padding: 4px 8px;">Hukm PDF</button></td>
    </tr>
  `).join('');
}

function renderRegionsMatrixGrid() {
  const container = document.getElementById('regionsMatrixGridContainer');
  if (!container || !window.regionsReportData) return;
  container.innerHTML = window.regionsReportData.map(r => `
    <div class="folder-grid-item" style="padding: 14px;" onclick="switchTab('dashboard'); openExplorer('all', '${r.name}', null);">
      <div>
        <b style="font-size: 13px; color: #0b132b;">&#128193; ${r.name}</b>
        <div style="font-size: 11px; margin-top: 4px;">
          Agentlik: <b style="color:#047857;">${r.agentlik.done} baj.</b> | Palata: <b style="color:#047857;">${r.palata.done} baj.</b>
        </div>
      </div>
      <span class="badge badge-blue">Tumanlar &rarr;</span>
    </div>
  `).join('');
}

function renderOtherRegionsGrids() {
  const riskBox = document.getElementById('riskRegionsGridContainer');
  const firedBox = document.getElementById('firedRegionsGridContainer');
  const opsBox = document.getElementById('operationsRegionsGrid');
  const confBox = document.getElementById('conflictBusinessRegionsGrid');

  if (riskBox) riskBox.innerHTML = window.regionsReportData.map(r => `
    <div onclick="switchTab('dashboard'); openExplorer('risk', '${r.name}', null);" class="folder-grid-item" style="border-left: 4px solid #b45309; padding: 12px;">
      <div>
        <b>&#128193; ${r.name}</b>
        <p style="font-size: 11px; color: #64748b; margin-top: 4px;">
          <b class="risk-badge-A">A: ${r.riskA || 1}</b> | 
          <b class="risk-badge-B">B: ${r.riskB || 1}</b> | 
          <b class="risk-badge-D">D: ${r.riskD || 1}</b>
        </p>
      </div>
      <span class="badge badge-rose">${r.riskCount} ta xavf &rarr;</span>
    </div>
  `).join('');

  if (firedBox) firedBox.innerHTML = window.regionsReportData.map(r => `
    <div onclick="switchTab('dashboard'); openExplorer('fired', '${r.name}', null);" class="folder-grid-item" style="border-left: 4px solid #047857; padding: 12px;">
      <div><b>&#128193; ${r.name}</b><p style="font-size: 11px; color: #64748b;">Buyruqlar va xulosalar jildi</p></div>
      <span class="badge badge-emerald">${r.firedCount} ta bo'shatilgan &rarr;</span>
    </div>
  `).join('');

  if (opsBox) opsBox.innerHTML = window.regionsReportData.map(r => `
    <div onclick="switchTab('dashboard'); openExplorer('operations', '${r.name}', null);" class="folder-grid-item" style="border-left: 4px solid #1d4ed8; padding: 12px;">
      <div><b>&#128193; ${r.name}</b><p style="font-size: 11px; color: #64748b;">Qo'lga olingan xodimlar va reyd bayonnomalari</p></div>
      <span class="badge badge-blue">${r.opsCount} ta tadbir &rarr;</span>
    </div>
  `).join('');

  if (confBox) confBox.innerHTML = window.regionsReportData.map(r => `
    <div onclick="switchTab('dashboard'); openExplorer('all', '${r.name}', null);" class="folder-grid-item" style="border-left: 4px solid #047857; padding: 12px;">
      <div><b>&#128193; ${r.name}</b><p style="font-size: 11px; color: #64748b;">MCHJ ta'sischilari va qarindoshlik</p></div>
      <span class="badge badge-emerald">${r.conflictCount + r.businessCount} ta holat &rarr;</span>
    </div>
  `).join('');
}

// DASTUR DASTLABKI YUKLANGANDA
window.addEventListener('DOMContentLoaded', () => {
  renderDynamicChart('month');
  renderDashboardRegionsGrid();
  renderRegionsMatrixGrid();
  renderTasksTable();
  renderMatrixTable();
  renderConvictedTable();
  renderOtherRegionsGrids();
  renderConflictMatritsaTable();
  renderFiredMatritsaTable();
  renderRiskCategoryTable();
  initArchive();
});
