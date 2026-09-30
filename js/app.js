// ==========================================
// 1. SAHIFA ALMASHISH VA MODALLAR
// ==========================================
window.switchTab = function(tabId) {
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
// 2. TO'G'RI GORIZONTAL OYLIK GRAFIK
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
      { l: 'Du', v: 1, t: '-1', c: '#047857' },
      { l: 'Se', v: 3, t: '+2', c: '#be123c' },
      { l: 'Cho', v: 4, t: '+1', c: '#be123c' },
      { l: 'Pa', v: 2, t: '-2', c: '#047857' },
      { l: 'Ju', v: 3, t: '+1', c: '#1d4ed8' },
      { l: 'Sha', v: 1, t: '-2', c: '#047857' }
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
    const h = Math.round((p.v / maxV) * 58) + 12;
    const isUp = p.t.includes('+');
    return `
      <div class="chart-col">
        <span class="trend-badge ${isUp ? 'trend-up' : 'trend-down'}">${p.t}</span>
        <div class="chart-bar-elem" style="height: ${h}px; background: ${p.c};"></div>
        <span style="font-size: 10px; font-weight: 700; color: #475569; margin-top: 4px;">${p.l}</span>
      </div>
    `;
  }).join('');
}

// ==========================================
// 3. SAHIFANING O'ZIDA PAPKAGA KIRIB BORISH (IN-PAGE FOLDER DRILL-DOWN)
// ==========================================

let currentDrillState = { cat: 'all', region: null, wing: null };

window.enterDrillFolder = function(catKey) {
  currentDrillState = { cat: catKey, region: null, wing: null };
  const area = document.getElementById('inPageDrillArea');
  if (area) {
    area.classList.remove('hidden');
    area.scrollIntoView({ behavior: 'smooth' });
  }
  renderFolderLevel1_Regions();
};

window.closeInPageDrill = function() {
  const area = document.getElementById('inPageDrillArea');
  if (area) area.classList.add('hidden');
};

// 1-QADAM: VILOYATLAR PAPKASI
function renderFolderLevel1_Regions() {
  const bc = document.getElementById('drillBreadcrumb');
  const body = document.getElementById('drillFolderContent');
  bc.innerHTML = `<span>&#128194; Bosh sahifa</span> &rarr; <b>14 ta Viloyat</b>`;

  body.innerHTML = `
    <p style="font-size: 12px; color: #64748b; margin-bottom: 12px; font-weight: 600;">Viloyatni tanlang (ichiga kirganda Kadastr Agentligi va Kadastrlar Palatasi papkalari ochiladi):</p>
    <div class="grid-2">
      ${window.regionsReportData.map(r => `
        <div onclick="renderFolderLevel2_Wings('${r.name}')" class="folder-item">
          <div>
            <b style="font-size: 13px; color: #0b132b;">&#128193; ${r.name}</b>
            <p style="font-size: 11px; color: #64748b; margin-top: 3px;">Tekshiruvlar: <b>${r.invCount}</b> | Sudlangan: <b>${r.convictedCount}</b> \vert{} Xavf: <b>${r.riskCount}</b></p>
          </div>
          <span class="badge badge-blue">Ochish &rarr;</span>
        </div>
      `).join('')}
    </div>
  `;
}

// 2-QADAM: VILOYAT ICHIDAGI 2 TA BOSHQARMA PAPKASI (AGENTLIK VA PALATA)
window.renderFolderLevel2_Wings = function(regionName) {
  currentDrillState.region = regionName;
  const bc = document.getElementById('drillBreadcrumb');
  const body = document.getElementById('drillFolderContent');
  bc.innerHTML = `
    <span onclick="renderFolderLevel1_Regions()" class="pointer" style="text-decoration: underline;">&#128194; Viloyatlar</span> &rarr; 
    <b>${regionName}</b>
  `;

  body.innerHTML = `
    <div style="margin-bottom: 12px;">
      <button onclick="renderFolderLevel1_Regions()" class="btn btn-slate">&larr; Viloyatlarga qaytish</button>
    </div>
    <p style="font-size: 12px; color: #64748b; margin-bottom: 12px; font-weight: 600;">Boshqarma yo'nalishini tanlang (ichiga kirganda tuman filiallari ochiladi):</p>
    
    <div class="grid-2">
      <div onclick="renderFolderLevel3_Districts('agentlik')" class="folder-item" style="border-left: 5px solid #1d4ed8; padding: 18px;">
        <div>
          <b style="font-size: 14px; color: #1d4ed8;">&#128193; Kadastr Agentligi ${regionName} boshqarmasi</b>
          <p style="font-size: 11px; color: #64748b; margin-top: 6px;">Davlat yer nazorati, geodeziya va noqonuniy yerlarni aniqlash bo'limlari</p>
        </div>
        <span class="badge badge-blue">Tumanlar &rarr;</span>
      </div>

      <div onclick="renderFolderLevel3_Districts('palata')" class="folder-item" style="border-left: 5px solid #4f46e5; padding: 18px;">
        <div>
          <b style="font-size: 14px; color: #4f46e5;">&#128193; Davlat Kadastrlari Palatasi ${regionName} boshqarmasi</b>
          <p style="font-size: 11px; color: #64748b; margin-top: 6px;">Ko'chmas mulkni ro'yxatga olish, arxiv ishlari va kadastr pasportlari</p>
        </div>
        <span class="badge badge-emerald">Tumanlar &rarr;</span>
      </div>
    </div>
  `;
};

// 3-QADAM: TUMAN FILIALLARI VA ANIQ XODIMLAR JILDI
window.renderFolderLevel3_Districts = function(wing) {
  currentDrillState.wing = wing;
  const regionName = currentDrillState.region;
  const wingName = wing === 'agentlik' ? `Kadastr Agentligi ${regionName} boshqarmasi` : `Davlat Kadastrlari Palatasi ${regionName} boshqarmasi`;

  const bc = document.getElementById('drillBreadcrumb');
  const body = document.getElementById('drillFolderContent');
  bc.innerHTML = `
    <span onclick="renderFolderLevel1_Regions()" class="pointer" style="text-decoration: underline;">&#128194; Viloyatlar</span> &rarr; 
    <span onclick="renderFolderLevel2_Wings('${regionName}')" class="pointer" style="text-decoration: underline;">${regionName}</span> &rarr; 
    <b>${wing === 'agentlik' ? 'Agentlik boshqarmasi' : 'Palata boshqarmasi'}</b>
  `;

  let list = [];
  if (window.deepDrillDatabase) {
    if (currentDrillState.cat === 'all') {
      for (let k in window.deepDrillDatabase) {
        list.push(...window.deepDrillDatabase[k].filter(i => (i.region.includes(regionName) || regionName.includes('Samarqand') || regionName.includes('Toshkent')) && i.wing === wing));
      }
    } else {
      const raw = window.deepDrillDatabase[currentDrillState.cat] || [];
      list = raw.filter(i => (i.region.includes(regionName) || regionName.includes('Samarqand') || regionName.includes('Toshkent')) && i.wing === wing);
    }
  }

  body.innerHTML = `
    <div style="margin-bottom: 12px;">
      <button onclick="renderFolderLevel2_Wings('${regionName}')" class="btn btn-slate">&larr; Boshqarmalarga qaytish</button>
    </div>
    <p style="font-size: 12px; color: #64748b; margin-bottom: 12px; font-weight: 600;">Tuman filiallari va qonunbuzilishda aniqlangan xodimlar jildlari:</p>
    
    <div style="display: flex; flex-direction: column; gap: 10px;">
      ${list.length > 0 ? list.map(item => `
        <div class="card" style="padding: 14px; border-left: 5px solid ${item.docType === 'court' ? '#be123c' : item.docType === 'operation' ? '#1d4ed8' : '#d97706'};">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <b style="font-size: 14px; color: #0b132b;">&#128196; ${item.district} —${item.officer}</b>
              <p style="font-size: 11px; color: #475569; margin: 4px 0;">Lavozim: <b>${item.role}</b> | JSHSHIR: <b style="color:#2563eb;">${item.pinfl}</b></p>
              <p style="font-size: 11px; color: #b45309; font-weight: 600;">Sabab: ${item.reason}</p>
            </div>
            <button onclick="openPdfViewer('${item.docType}', '${item.code}', '${item.district}', '${item.date}', '${item.officer}:${item.reason}')" class="btn btn-slate" style="padding: 8px 14px; font-size: 11px;">
              &#128196; Asos PDF Hujjati &rarr;
            </button>
          </div>
        </div>
      `).join('') : `
        <div style="padding: 30px; text-align: center; color: #64748b; background: #f8fafc; border-radius: 8px; border: 1px dashed #cbd5e1;">
          Ushbu boshqarma va tuman filiallarida hozircha ochiq ish mavjud emas (profilaktik monitoringda).
        </div>
      `}
    </div>
  `;
};

// 4-QADAM: DEMO PDF VARAQASI
window.openPdfViewer = function(docType, p1, p2, p3, p4) {
  const paper = document.getElementById('pdfPaperContent');
  if (!paper) return;

  let html = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; border-bottom: 1px solid #ccc; padding-bottom: 8px;">
      <span style="font-size: 12px; font-weight: bold; color: #333;">Davlat Kadastrlari Yagona Komplayens Tizimi</span>
      <button onclick="window.print()" class="btn btn-blue">&#128438; Chop etish / PDF Saqlash</button>
    </div>
  `;

  if (docType === 'investigation') {
    document.getElementById('pdfDocTitle').innerText = `Xizmat Tekshiruvi Xulosasi — ${p1}`;
    html += `
      <div class="pdf-header">
        <h2>O'ZBEKISTON RESPUBLIKASI KADASTR AGENTLIGI</h2>
        <h2>XIZMAT TEKSHIRUVI XULOSASI VA DALOLATNOMASI</h2>
        <p>Hujjat kodi: ${p1} | Filial: ${p2} | Sana: ${p3}</p>
      </div>
      <p style="text-indent: 30px; margin-bottom: 15px;">
        Korrupsiyaga qarshi ichki nazorat tuzilmasi mutaxassislari o'tkazgan tekshiruv davomida quyidagi qonunbuzilish aniqlandi:
      </p>
      <p style="text-indent: 30px; margin-bottom: 15px;">
        Holat: <b>${p4}</b>. Mazkur holat bo'yicha mas'ul xodimlar sohaviy qonunchilikni buzib, yer maydonlarini noqonuniy ro'yxatga olgan.
      </p>
      <p style="text-indent: 30px; font-weight: bold; margin-bottom: 25px;">
        XULOSA: Materiallar prokuratura organlariga yuborilsin va xodim lavozimidan ozod etilsin.
      </p>
      <div class="pdf-stamp">
        <div><p>Komplayens inspektori: ____________</p><p style="font-size: 10px; color: #666;">Elektron raqamli imzo tasdiqlangan</p></div>
        <div class="stamp-box" style="border-color: #d97706; color: #d97706;">KOMPLAYENS NAZORATI<br>RASMIY TEKSHIRUV XULOSASI</div>
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
        Dalillar va holat: ${p4}. Ashyoviy dalillar tergovga taqdim etildi.
      </p>
      <div class="pdf-stamp">
        <div><p>Tezkor guruh rahbari: __________</p><p>Kadastr komplayens vakili: __________</p></div>
        <div class="stamp-box">TEZKOR HAMKORLIK<br>ASOSIY DALIL MUHRLANDI</div>
      </div>
    `;
  } else {
    document.getElementById('pdfDocTitle').innerText = `Rasmiy Hujjat — ${p1}`;
    html += `
      <div class="pdf-header">
        <h2>O'ZBEKISTON RESPUBLIKASI KADASTR AGENTLIGI</h2>
        <h2>KOMPLAYENS BUYRUG'I VA XULOSASI</h2>
        <p>${p1} | ${p2} | ${p3}</p>
      </div>
      <p style="text-indent: 30px; margin-bottom: 25px;">Tafsilot: <b>${p4}</b>. Mehnat shartnomasi bekor qilingan.</p>
      <div class="pdf-stamp">
        <div><p>Mas'ul rahbar: ____________</p></div>
        <div class="stamp-box" style="border-color: #047857; color: #047857;">KADASTR AGENTLIGI<br>BUYRUQ IJRO ETILDI</div>
      </div>
    `;
  }

  paper.innerHTML = html;
  openModal('pdfViewerModal');
};

// ==========================================
// 4. BOSHQA MODULLAR VA BAZA FUNKSIYALARI
// ==========================================

function renderDashboardRegionsGrid() {
  const container = document.getElementById('dashboardRegionsGrid');
  if (!container || !window.regionsReportData) return;
  container.innerHTML = window.regionsReportData.map(r => `
    <div onclick="enterDrillFolder('all'); renderFolderLevel2_Wings('${r.name}');" class="card pointer" style="padding: 12px; border-left: 4px solid #1d4ed8;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <b style="font-size: 13px; color: #0b132b;">&#128193; ${r.name}</b>
        <span class="badge badge-blue">Agentlik va Palataga kirish &rarr;</span>
      </div>
      <p style="font-size: 11px; color: #64748b; margin-top: 4px;">
        Tekshiruv: <b style="color:#d97706;">${r.invCount} ta</b> | Sudlangan: <b style="color:#be123c;">${r.convictedCount} ta</b> | Xavf (A): <b style="color:#b45309;">${r.riskCount} ta</b>
      </p>
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

window.filterConvicted = function() {
  const q = document.getElementById('convictedSearch').value.toLowerCase().trim();
  const tbody = document.getElementById('convictedTableBody');
  if (!tbody || !window.convictedData) return;
  tbody.innerHTML = window.convictedData.filter(c => c.name.toLowerCase().includes(q) || c.pinfl.includes(q)).map(c => `
    <tr>
      <td><b>${c.name}</b><br><small style="color: #2563eb;">${c.pinfl}</small></td>
      <td>${c.region}</td><td>${c.court}</td><td><span class="badge badge-rose">${c.articles}</span></td><td>${c.punishment}</td>
      <td><span class="badge badge-emerald">Chetlatilgan</span></td>
      <td style="text-align: center;"><button onclick="openPdfViewer('court', '${c.name}', '${c.court}', '${c.date}', '${c.articles}')" class="btn btn-rose" style="padding: 4px 8px;">Hukm PDF</button></td>
    </tr>
  `).join('');
};

function renderRegionsMatrixGrid() {
  const container = document.getElementById('regionsMatrixGridContainer');
  if (!container || !window.regionsReportData) return;
  container.innerHTML = window.regionsReportData.map(r => `
    <div class="card pointer" style="padding: 14px;" onclick="enterDrillFolder('all'); renderFolderLevel2_Wings('${r.name}');">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px;">
        <b style="font-size: 13px; color: #0b132b;">&#128193; ${r.name}</b>
        <span class="badge badge-blue">Tumanlar &rarr;</span>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 10px;">
        <div style="background: #f8fafc; padding: 10px; border-radius: 8px; border: 1px solid #e2e8f0;">
          <b style="color: #1d4ed8; font-size: 11px; display: block;">Kadastr Agentligi</b>
          <div style="font-size: 11px; margin-top: 4px;">Bajarildi: <b style="color:#047857;">${r.agentlik.done}</b> | Kechikkan: <b style="color:#be123c;">${r.agentlik.overdue}</b></div>
        </div>
        <div style="background: #f8fafc; padding: 10px; border-radius: 8px; border: 1px solid #e2e8f0;">
          <b style="color: #4f46e5; font-size: 11px; display: block;">Kadastr Palatasi</b>
          <div style="font-size: 11px; margin-top: 4px;">Bajarildi: <b style="color:#047857;">${r.palata.done}</b> | Kechikkan: <b style="color:#be123c;">${r.palata.overdue}</b></div>
        </div>
      </div>
    </div>
  `).join('');
}

function renderOtherRegionsGrids() {
  const riskBox = document.getElementById('riskRegionsGridContainer');
  const firedBox = document.getElementById('firedRegionsGridContainer');
  const opsBox = document.getElementById('operationsRegionsGrid');
  const confBox = document.getElementById('conflictBusinessRegionsGrid');

  if (riskBox) riskBox.innerHTML = window.regionsReportData.map(r => `
    <div onclick="enterDrillFolder('risk'); renderFolderLevel2_Wings('${r.name}');" class="card pointer" style="border-left: 4px solid #b45309; padding: 12px;">
      <b>&#128193; ${r.name}</b> <span class="badge badge-rose">${r.riskCount} ta xavf</span>
      <p style="font-size: 11px; color: #64748b; margin-top: 4px;">Xodimlar dosyesi &rarr;</p>
    </div>
  `).join('');

  if (firedBox) firedBox.innerHTML = window.regionsReportData.map(r => `
    <div onclick="enterDrillFolder('fired'); renderFolderLevel2_Wings('${r.name}');" class="card pointer" style="border-left: 4px solid #047857; padding: 12px;">
      <b>&#128193; ${r.name}</b> <span class="badge badge-emerald">${r.firedCount} ta bo'shatilgan</span>
      <p style="font-size: 11px; color: #64748b; margin-top: 4px;">Buyruqlar PDF &rarr;</p>
    </div>
  `).join('');

  if (opsBox) opsBox.innerHTML = window.regionsReportData.map(r => `
    <div onclick="enterDrillFolder('operations'); renderFolderLevel2_Wings('${r.name}');" class="card pointer" style="border-left: 4px solid #1d4ed8; padding: 12px;">
      <b>&#128193; ${r.name}</b> <span class="badge badge-blue">${r.opsCount} ta tezkor tadbir</span>
      <p style="font-size: 11px; color: #64748b; margin-top: 4px;">Reyd bayonnomalari &rarr;</p>
    </div>
  `).join('');

  if (confBox) confBox.innerHTML = window.regionsReportData.map(r => `
    <div onclick="enterDrillFolder('all'); renderFolderLevel2_Wings('${r.name}');" class="card pointer" style="border-left: 4px solid #047857; padding: 12px;">
      <b>&#128193; ${r.name}</b> <span class="badge badge-emerald">${r.conflictCount + r.businessCount} ta holat</span>
      <p style="font-size: 11px; color: #64748b; margin-top: 4px;">MCHJ va qarindoshlik &rarr;</p>
    </div>
  `).join('');
}

// 5 BOSQICHLI ARXIV
window.initArchive = function() {
  const area = document.getElementById('archiveViewArea');
  if (!area) return;
  area.innerHTML = `
    <div class="grid-3">
      ${['Tezkor Tadbirlar Arxivi', 'Tekshiruv Xulosalari', 'Manfaatlar To\'qnashuvi', 'STIR Dalolatnomalari', 'Sud Hukmlari', 'Ijro Xatlari'].map((name, i) => `
        <div onclick="openArchiveRegions('${name}')" class="card pointer">
          <b style="font-size: 13px;">&#128193; ${i + 1}.${name}</b>
          <p style="font-size: 11px; color: #64748b; margin-top: 4px;">14 ta viloyat bo'yicha papkalar</p>
        </div>
      `).join('')}
    </div>
  `;
};

window.openArchiveRegions = function(catName) {
  document.getElementById('archivePath').innerText = catName;
  const area = document.getElementById('archiveViewArea');
  area.innerHTML = `
    <button onclick="initArchive()" class="btn btn-slate" style="margin-bottom: 12px;">&larr; Hujjat turlariga qaytish</button>
    <div class="grid-4">
      ${window.regionsReportData.map(r => `
        <div onclick="openPdfViewer('investigation', 'ARXIV-${r.id}', '${r.name}', '2026', '${catName} arxivi')" class="card pointer">
          <b>&#128193; ${r.name}</b><p style="font-size: 11px; color: #64748b;">Hujjatlarni ochish PDF &rarr;</p>
        </div>
      `).join('')}
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

// DASTUR DASTLABKI YUKLANGANDA
window.addEventListener('DOMContentLoaded', () => {
  renderDynamicChart('month');
  renderDashboardRegionsGrid();
  renderRegionsMatrixGrid();
  renderTasksTable();
  renderMatrixTable();
  renderConvictedTable();
  renderOtherRegionsGrids();
  initArchive();
});
