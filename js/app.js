// SAHIFA ALMASHISH
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

// MODALLARNI ISHONCHLI OCHISH VA YOPISH
window.openModal = function(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('hidden');
};

window.closeModal = function(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('hidden');
};

// VAQT FILTRI
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
    document.getElementById('chart-badge').innerText = 'Haftalik Dinamika';
    renderDynamicChart('week');
  } else if (type === 'month') {
    document.getElementById('kpi-investigations').innerText = '333 ta';
    document.getElementById('kpi-convicted').innerText = '18 nafar';
    document.getElementById('kpi-operations').innerText = '14 ta';
    document.getElementById('kpi-risk').innerText = '46 nafar';
    document.getElementById('kpi-fired').innerText = '25 nafar';
    document.getElementById('chart-badge').innerText = 'Oylik Dinamika (2026-yil)';
    renderDynamicChart('month');
  } else if (type === 'year') {
    document.getElementById('kpi-investigations').innerText = '1,420 ta';
    document.getElementById('kpi-convicted').innerText = '74 nafar';
    document.getElementById('kpi-operations').innerText = '68 ta';
    document.getElementById('kpi-risk').innerText = '182 nafar';
    document.getElementById('kpi-fired').innerText = '94 nafar';
    document.getElementById('chart-badge').innerText = 'Yillik Dinamika';
    renderDynamicChart('year');
  }
};

// KICHIKLASHTIRILGAN OYLIK DINAMIKA GRAFIGI
function renderDynamicChart(mode) {
  const container = document.getElementById('chartBarsContainer');
  if (!container) return;
  let dataPoints = [];

  if (mode === 'week') {
    dataPoints = [
      { label: 'Du', val: 1, trend: '-1', trendType: 'down', color: '#047857' },
      { label: 'Se', val: 3, trend: '+2', trendType: 'up', color: '#be123c' },
      { label: 'Cho', val: 4, trend: '+1', trendType: 'up', color: '#be123c' },
      { label: 'Pa', val: 2, trend: '-2', trendType: 'down', color: '#047857' },
      { label: 'Ju', val: 3, trend: '+1', trendType: 'up', color: '#1d4ed8' },
      { label: 'Sha', val: 1, trend: '-2', trendType: 'down', color: '#047857' }
    ];
  } else if (mode === 'year') {
    dataPoints = [
      { label: '23-y', val: 42, trend: 'Baza', trendType: 'down', color: '#1d4ed8' },
      { label: '24-y', val: 56, trend: '+33%', trendType: 'up', color: '#1d4ed8' },
      { label: '25-y', val: 71, trend: '+26%', trendType: 'up', color: '#be123c' },
      { label: '26-y', val: 68, trend: '-4%', trendType: 'down', color: '#047857' }
    ];
  } else {
    dataPoints = [
      { label: 'Apr', val: 8, trend: '-20%', trendType: 'down', color: '#047857' },
      { label: 'May', val: 12, trend: '+50%', trendType: 'up', color: '#1d4ed8' },
      { label: 'Iyun', val: 9, trend: '-25%', trendType: 'down', color: '#047857' },
      { label: 'Iyul', val: 16, trend: '+77%', trendType: 'up', color: '#be123c' },
      { label: 'Avg', val: 11, trend: '-31%', trendType: 'down', color: '#047857' },
      { label: 'Sen', val: 14, trend: '+27%', trendType: 'up', color: '#be123c' }
    ];
  }

  const maxVal = Math.max(...dataPoints.map(p => p.val));

  container.innerHTML = dataPoints.map(p => {
    const heightPx = Math.round((p.val / maxVal) * 55) + 10;
    const trendSymbol = p.trendType === 'up' ? '&#8593;' : '&#8595;';
    const trendClass = p.trendType === 'up' ? 'trend-up' : 'trend-down';
    return `
      <div class="chart-col">
        <span class="trend-badge ${trendClass}">${trendSymbol}${p.trend}</span>
        <div class="chart-bar-elem" style="height: ${heightPx}px; background: ${p.color};"></div>
        <span style="font-size: 10px; font-weight: 700; color: #475569; margin-top: 2px;">${p.label}</span>
      </div>
    `;
  }).join('');
}

// DASHBOARDDAGI 14 TA HUDUD KARTALARI
function renderDashboardRegionsGrid() {
  const container = document.getElementById('dashboardRegionsGrid');
  if (!container || !window.regionsReportData) return;
  container.innerHTML = window.regionsReportData.map(r => `
    <div onclick="drillLevel2_Wings('all', '${r.name}')" class="card pointer hover-scale" style="padding: 12px; border-left: 4px solid #1d4ed8;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <b style="font-size: 13px; color: #0b132b;">${r.name}</b>
        <span class="badge badge-blue">Agentlik va Palataga kirish &rarr;</span>
      </div>
      <p style="font-size: 11px; color: #64748b; margin-top: 4px;">
        Tekshiruv: <b style="color:#d97706;">${r.invCount} ta</b> | Sudlangan: <b style="color:#be123c;">${r.convictedCount} ta</b> | Xavf (A): <b style="color:#b45309;">${r.riskCount} ta</b>
      </p>
    </div>
  `).join('');
}

// -------------------------------------------------------------
// 4 BOSQICHLI MUKAMMAL DRILL-DOWN IERARXIYASI
// -------------------------------------------------------------

// 1-BOSQICH: 14 TA HUDUD (VILOYATLAR) TANLOVI
window.drillLevel1_Regions = function(categoryKey) {
  const titleMap = {
    'investigations': 'Xizmat Tekshiruvlari — 14 ta Hudud (333 ta)',
    'convicted': 'Sudlangan Xodimlar — 14 ta Hudud (18 nafar)',
    'operations': 'Tezkor Tadbirlar — 14 ta Hudud (14 ta)',
    'risk': 'Korrupsion Xavf Guruhlari (A, B, D) — 14 ta Hudud',
    'fired': 'Komplayens Bo\'shatgan Xodimlar — 14 ta Hudud'
  };

  document.getElementById('drillHeaderTitle').innerText = titleMap[categoryKey] || '14 ta Hudud Tanlovi';
  const body = document.getElementById('drillContentBody');

  body.innerHTML = `
    <p style="font-size: 12px; color: #64748b; margin-bottom: 12px; font-weight: 600;">1-Qadam: Viloyatni tanlang (keyingi qadamda Kadastr Agentligi yoki Palataga bo'linadi):</p>
    <div class="grid-2">
      ${window.regionsReportData.map(reg => {
        let count = reg.invCount;
        if (categoryKey === 'convicted') count = reg.convictedCount;
        if (categoryKey === 'operations') count = reg.opsCount;
        if (categoryKey === 'risk') count = reg.riskCount;
        if (categoryKey === 'fired') count = reg.firedCount;

        return `
          <div onclick="drillLevel2_Wings('${categoryKey}', '${reg.name}')" class="card pointer hover-scale" style="padding: 12px; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <b style="font-size: 13px; color: #0b132b;">${reg.name}</b>
              <p style="font-size: 10px; color: #1d4ed8; font-weight: 700; margin-top: 2px;">Boshqarmalarni ochish &rarr;</p>
            </div>
            <span class="badge ${count>0?'badge-rose':'badge-slate'}">${count} ta ish</span>
          </div>
        `;
      }).join('')}
    </div>
  `;
  openModal('universalDrillModal');
};

// 2-BOSQICH: HUDUDNING 2 GA BO'LINISHI (AGENTLIK VA PALATA VILOYAT BOSHQARMALARI)
window.drillLevel2_Wings = function(categoryKey, regionName) {
  document.getElementById('drillHeaderTitle').innerText = `${regionName} — Boshqarma Tanlovi`;
  const body = document.getElementById('drillContentBody');

  body.innerHTML = `
    <button onclick="${categoryKey==='all'?'closeModal(\'universalDrillModal\')':'drillLevel1_Regions(\''+categoryKey+'\')'}" class="btn btn-slate" style="margin-bottom: 14px;">&larr; Orqaga (Viloyatlarga qaytish)</button>
    <p style="font-size: 12px; color: #64748b; margin-bottom: 12px; font-weight: 600;">2-Qadam: Boshqarma yo'nalishini tanlang (ichiga kirganda tuman filiallari ochiladi):</p>
    
    <div class="grid-2">
      <div onclick="drillLevel3_Districts('${categoryKey}', '${regionName}', 'agentlik')" class="card pointer hover-scale" style="border-left: 4px solid #1d4ed8; padding: 16px;">
        <b style="font-size: 14px; color: #1d4ed8;">Kadastr Agentligi ${regionName} boshqarmasi</b>
        <p style="font-size: 11px; color: #64748b; margin-top: 6px;">Davlat yer nazorati, geodeziya va ma'muriy amaliyot tizimi</p>
        <div style="margin-top: 12px; text-align: right;"><span class="badge badge-blue">Tumanlar va Xodimlarni ochish &rarr;</span></div>
      </div>

      <div onclick="drillLevel3_Districts('${categoryKey}', '${regionName}', 'palata')" class="card pointer hover-scale" style="border-left: 4px solid #4f46e5; padding: 16px;">
        <b style="font-size: 14px; color: #4f46e5;">Davlat Kadastrlari Palatasi ${regionName} boshqarmasi</b>
        <p style="font-size: 11px; color: #64748b; margin-top: 6px;">Ko'chmas mulkni ro'yxatga olish, kadastr pasportlari va arxiv</p>
        <div style="margin-top: 12px; text-align: right;"><span class="badge badge-emerald">Tumanlar va Xodimlarni ochish &rarr;</span></div>
      </div>
    </div>
  `;
  openModal('universalDrillModal');
};

// 3-BOSQICH: TUMAN FILIALLARI VA MAS'UL XODIMLAR KESIMI
window.drillLevel3_Districts = function(categoryKey, regionName, wing) {
  const wingTitle = wing === 'agentlik' ? `Kadastr Agentligi ${regionName} boshqarmasi` : `Davlat Kadastrlari Palatasi ${regionName} boshqarmasi`;
  document.getElementById('drillHeaderTitle').innerText = `${wingTitle} — Tumanlar va Xodimlar`;
  const body = document.getElementById('drillContentBody');

  // Bazadan qidirish (agar kategoriya 'all' bo'lsa barcha turlardan yig'adi)
  let list = [];
  if (categoryKey === 'all') {
    for (let k in window.deepDrillDatabase) {
      list.push(...window.deepDrillDatabase[k].filter(item => (item.region.includes(regionName) || regionName.includes('Samarqand') || regionName.includes('Toshkent')) && item.wing === wing));
    }
  } else {
    const raw = window.deepDrillDatabase[categoryKey] || [];
    list = raw.filter(item => (item.region.includes(regionName) || regionName.includes('Samarqand') || regionName.includes('Toshkent')) && item.wing === wing);
  }

  body.innerHTML = `
    <button onclick="drillLevel2_Wings('${categoryKey}', '${regionName}')" class="btn btn-slate" style="margin-bottom: 14px;">&larr; Boshqarmalarga qaytish</button>
    <p style="font-size: 12px; color: #64748b; margin-bottom: 12px; font-weight: 600;">3-Qadam: Tuman filiali va xodimni tanlang (tugmani bosib demo PDF hujjatini ko'ring):</p>
    
    <div style="display: flex; flex-direction: column; gap: 10px;">
      ${list.length > 0 ? list.map(item => `
        <div class="card" style="padding: 12px 16px; border-left: 4px solid ${item.docType==='court'?'#be123c':item.docType==='operation'?'#1d4ed8':'#d97706'};">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <b style="font-size: 13px; color: #0b132b;">${item.district} —${item.officer}</b>
              <p style="font-size: 11px; color: #475569; margin: 3px 0;">Lavozimi: <b>${item.role}</b> | JSHSHIR: <b style="color:#2563eb;">${item.pinfl}</b></p>
              <p style="font-size: 11px; color: #b45309; font-weight: 600;">Holat/Sabab: ${item.reason}</p>
            </div>
            <button onclick="openPdfViewer('${item.docType}', '${item.code}', '${item.district}', '${item.date}', '${item.officer}:${item.reason}')" class="btn btn-slate" style="padding: 6px 12px; font-size: 11px;">
              &#128196; Demo PDF Hujjat &rarr;
            </button>
          </div>
        </div>
      `).join('') : `
        <div style="padding: 20px; text-align: center; color: #64748b; background: #f8fafc; border-radius: 8px;">
          Ushbu boshqarma va tuman filiallarida hozircha faol qonunbuzilish ishi mavjud emas (yoki profilaktik nazoratda).
        </div>
      `}
    </div>
  `;
  openModal('universalDrillModal');
};

// 4-BOSQICH: RASMIY DEMO PDF BLANKI
window.openPdfViewer = function(docType, p1, p2, p3, p4) {
  const paper = document.getElementById('pdfPaperContent');
  let html = '';

  if (docType === 'investigation') {
    document.getElementById('pdfDocTitle').innerText = `Xizmat Tekshiruvi Xulosasi — ${p1}`;
    html = `
      <div class="pdf-header">
        <h2>O'ZBEKISTON RESPUBLIKASI KADASTR AGENTLIGI</h2>
        <h2>XIZMAT TEKSHIRUVI XULOSASI VA DALOLATNOMASI</h2>
        <p>Hujjat kodi: ${p1} | Filial: ${p2} | Sana: ${p3}</p>
      </div>
      <p style="text-indent: 30px; margin-bottom: 15px;">
        Korrupsiyaga qarshi ichki nazorat tuzilmasi tomonidan o'tkazilgan tekshiruv davomida quyidagi jiddiy qonunbuzilish aniqlandi:
      </p>
      <p style="text-indent: 30px; margin-bottom: 15px;">
        Holat tafsiloti: <b>${p4}</b>. Mazkur holat yuzasidan mas'ul xodimlar davlat yer kadastri rejimini qo'pol ravishda buzgan deb topildi.
      </p>
      <p style="text-indent: 30px; font-weight: bold; margin-bottom: 25px;">
        XULOSA: Materiallar huquqiy baho berish uchun prokuratura organlariga yuborilsin va xodim lavozimidan chetlatilsin.
      </p>
      <div class="pdf-stamp">
        <div><p>Komplayens inspektori: ____________</p><p style="font-size: 10px; color: #666;">Elektron raqamli imzo tasdiqlangan</p></div>
        <div class="stamp-box" style="border-color: #d97706; color: #d97706;">KOMPLAYENS NAZORATI<br>RASMIY TEKSHIRUV XULOSASI</div>
      </div>
    `;
  } else if (docType === 'court') {
    document.getElementById('pdfDocTitle').innerText = `Sud Hukmi Nusxasi — ${p1}`;
    html = `
      <div class="pdf-header">
        <h2>O'ZBEKISTON RESPUBLIKASI NOMI BILAN</h2>
        <h2>JINOYAT ISHLARI BO'YICHA SUD HUKMI (NUSXA)</h2>
        <p>Hujjat kodi: ${p1} | Sud: ${p2} | Sana: ${p3}</p>
      </div>
      <p style="text-indent: 30px; margin-bottom: 15px;">
        Sud hay'ati, kadastr tizimi xodimi bo'yicha jinoyat ishini ko'rib chiqib, uning mansab vakolatini suiiste'mol qilganligini isbotladi:
      </p>
      <p style="text-indent: 30px; font-weight: bold; margin-bottom: 25px;">
        HUKM: ${p4}. Kadastr va davlat ro'yxatidan o'tkazish tizimida 2 yil muddatga mansabdorlik lavozimlarida ishlash huquqidan mahrum etilsin.
      </p>
      <div class="pdf-stamp">
        <div><p>Sudya: ____________</p><p style="font-size: 10px; color: #666;">Yagona sud axborot tizimi orqali tasdiqlangan</p></div>
        <div class="stamp-box" style="border-color: #be123c; color: #be123c;">SUD HUKMI QONUNIY<br>KUCHGA KIRGAN</div>
      </div>
    `;
  } else if (docType === 'operation') {
    document.getElementById('pdfDocTitle').innerText = `Tezkor Tadbir Bayonnomasi — ${p1}`;
    html = `
      <div class="pdf-header">
        <h2>VAKOLATLI HUQUQNI MUHOFAZA QILUVCHI ORGAN</h2>
        <h2>MAXSUS TEZKOR TADBIR BAYONNOMASI</h2>
        <p>Hujjat: ${p1} | Hudud: ${p2} | Sana: ${p3}</p>
      </div>
      <p style="text-indent: 30px; margin-bottom: 15px;">
        O'tkazilgan tezkor tadbir natijasida noqonuniy yer pasporti rasmiylashtirish evaziga mablag' olayotgan xodim jinoyat ustida ushlandi.
      </p>
      <p style="text-indent: 30px; font-weight: bold; margin-bottom: 25px;">
        Ashyoviy dalillar va tafsilot: ${p4}. Barcha dalillar xolislar ishtirokida muhrlandi va tergovga taqdim etildi.
      </p>
      <div class="pdf-stamp">
        <div><p>Tezkor guruh rahbari: __________</p><p>Kadastr komplayens vakili: __________</p></div>
        <div class="stamp-box">TEZKOR HAMKORLIK<br>ASOSIY DALIL MUHRLANDI</div>
      </div>
    `;
  } else {
    document.getElementById('pdfDocTitle').innerText = `Rasmiy Hujjat — ${p1}`;
    html = `
      <div class="pdf-header">
        <h2>O'ZBEKISTON RESPUBLIKASI KADASTR AGENTLIGI</h2>
        <h2>BUYRUQ VA KOMPLAYENS DALOLATNOMASI</h2>
        <p>${p1} | ${p2} | ${p3}</p>
      </div>
      <p style="text-indent: 30px; margin-bottom: 25px;">Tafsilot: <b>${p4}</b>. Mehnat shartnomasi bekor qilingan va tizimga qayta kirishi bloklangan.</p>
      <div class="pdf-stamp">
        <div><p>Mas'ul rahbar: ____________</p></div>
        <div class="stamp-box" style="border-color: #047857; color: #047857;">KADASTR AGENTLIGI<br>BUYRUQ IJRO ETILDI</div>
      </div>
    `;
  }

  paper.innerHTML = html;
  openModal('pdfViewerModal');
};

// BOSHQA BO'LIMLARNI CHIQARISH
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
      <td><span class="badge ${t.status==='Bajarildi'?'badge-emerald':'badge-amber'}">${t.status}</span></td>
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
        <td>${r.hmmqo_prok||'-'}</td><td>${r.hmmqo_iib||'-'}</td><td>${r.hmmqo_dxx||'-'}</td><td>${r.hmmqo_other||'-'}</td>
        <td>${r.ichki_prok||'-'}</td><td>${r.ichki_iib||'-'}</td><td>${r.ichki_dxx||'-'}</td><td>${r.ichki_other||'-'}</td>
        <td>${r.hmmqo_crim||'-'}</td><td>${r.hmmqo_adm||'-'}</td><td>${r.hmmqo_83||'-'}</td><td>${r.hmmqo_84||'-'}</td><td>${r.hmmqo_rej||'-'}</td><td>${r.hmmqo_proc||'-'}</td><td style="color:#be123c; font-weight:700;">${r.hmmqo_fire||'-'}</td><td>${r.hmmqo_disc||'-'}</td>
        <td>${r.ichki_crim||'-'}</td><td>${r.ichki_adm||'-'}</td><td>${r.ichki_83||'-'}</td><td>${r.ichki_84||'-'}</td><td>${r.ichki_rej||'-'}</td><td>${r.ichki_proc||'-'}</td><td style="color:#be123c; font-weight:700;">${r.ichki_fire||'-'}</td><td>${r.ichki_disc||'-'}</td>
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
      <td><span class="badge ${c.status==='chetlatilgan'?'badge-emerald':'badge-rose'}">${c.status==='chetlatilgan'?'Chetlatilgan':'Ishlamoqda'}</span></td>
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
    <div class="card pointer hover-scale" style="padding: 14px;" onclick="drillLevel2_Wings('all', '${r.name}')">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px;">
        <b style="font-size: 13px; color: #0b132b;">${r.name}</b>
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
    <div onclick="drillLevel2_Wings('risk', '${r.name}')" class="card pointer hover-scale" style="border-left: 4px solid #b45309; padding: 12px;">
      <b>${r.name}</b> <span class="badge badge-rose">${r.riskCount} ta xavf</span>
      <p style="font-size: 11px; color: #64748b; margin-top: 4px;">Agentlik va Palata xodimlar dosyesi &rarr;</p>
    </div>
  `).join('');

  if (firedBox) firedBox.innerHTML = window.regionsReportData.map(r => `
    <div onclick="drillLevel2_Wings('fired', '${r.name}')" class="card pointer hover-scale" style="border-left: 4px solid #047857; padding: 12px;">
      <b>${r.name}</b> <span class="badge badge-emerald">${r.firedCount} ta bo'shatilgan</span>
      <p style="font-size: 11px; color: #64748b; margin-top: 4px;">Xulosalar va Buyruqlar PDF &rarr;</p>
    </div>
  `).join('');

  if (opsBox) opsBox.innerHTML = window.regionsReportData.map(r => `
    <div onclick="drillLevel2_Wings('operations', '${r.name}')" class="card pointer hover-scale" style="border-left: 4px solid #1d4ed8; padding: 12px;">
      <b>${r.name}</b> <span class="badge badge-blue">${r.opsCount} ta tezkor tadbir</span>
      <p style="font-size: 11px; color: #64748b; margin-top: 4px;">DXX, Departament reyd bayonnomalari &rarr;</p>
    </div>
  `).join('');

  if (confBox) confBox.innerHTML = window.regionsReportData.map(r => `
    <div onclick="drillLevel2_Wings('all', '${r.name}')" class="card pointer hover-scale" style="border-left: 4px solid #047857; padding: 12px;">
      <b>${r.name}</b> <span class="badge badge-emerald">${r.conflictCount + r.businessCount} ta holat</span>
      <p style="font-size: 11px; color: #64748b; margin-top: 4px;">MCHJ ta'sischilari va qarindoshlik &rarr;</p>
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
        <div onclick="openArchiveRegions('${name}')" class="card pointer hover-scale">
          <b style="font-size: 13px;">&#128193; ${i+1}.${name}</b>
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
        <div onclick="openPdfViewer('investigation', 'ARXIV-${r.id}', '${r.name}', '2026', '${catName} arxivi')" class="card pointer hover-scale">
          <b>${r.name}</b><p style="font-size: 11px; color: #64748b;">Hujjatlarni ochish PDF &rarr;</p>
        </div>
      `).join('')}
    </div>
  `;
};

// FORMALARNI SAQLASH
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
