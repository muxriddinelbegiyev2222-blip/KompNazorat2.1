// GLOBAL SAHIFA ALMASHISH (TABS)
window.switchTab = function(tabId) {
  const tabs = ['dashboard', 'tasks-panel', 'matrix-report', 'risk-groups', 'fired-list', 'operations', 'convicted', 'conflict-business', 'documents'];
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

// VAQT FILTRI (HAFTALIK, OYLIK, YILLIK)
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
    document.getElementById('chart-badge').innerText = 'Yillik Umumiy Dinamika';
    renderDynamicChart('year');
  }
};

// TEZKOR TADBIRLARDA QO'LGA TUSHGAN JINOYATLARNING OYMA-OY O'SISH / PASAYISH GRAFIGI
function renderDynamicChart(mode) {
  const container = document.getElementById('chartBarsContainer');
  if (!container) return;
  let dataPoints = [];

  if (mode === 'week') {
    dataPoints = [
      { label: 'Dush', val: 1, trend: '-1', trendType: 'down', color: '#047857' },
      { label: 'Sesh', val: 3, trend: '+2', trendType: 'up', color: '#be123c' },
      { label: 'Chor', val: 4, trend: '+1', trendType: 'up', color: '#be123c' },
      { label: 'Pay', val: 2, trend: '-2', trendType: 'down', color: '#047857' },
      { label: 'Juma', val: 3, trend: '+1', trendType: 'up', color: '#1d4ed8' },
      { label: 'Shan', val: 1, trend: '-2', trendType: 'down', color: '#047857' }
    ];
  } else if (mode === 'year') {
    dataPoints = [
      { label: '2023-yil', val: 42, trend: 'Baza', trendType: 'down', color: '#1d4ed8' },
      { label: '2024-yil', val: 56, trend: '+33%', trendType: 'up', color: '#1d4ed8' },
      { label: '2025-yil', val: 71, trend: '+26%', trendType: 'up', color: '#be123c' },
      { label: '2026-yil', val: 68, trend: '-4%', trendType: 'down', color: '#047857' }
    ];
  } else {
    dataPoints = [
      { label: 'Aprel', val: 8, trend: '-20%', trendType: 'down', color: '#047857' },
      { label: 'May', val: 12, trend: '+50%', trendType: 'up', color: '#1d4ed8' },
      { label: 'Iyun', val: 9, trend: '-25%', trendType: 'down', color: '#047857' },
      { label: 'Iyul', val: 16, trend: '+77%', trendType: 'up', color: '#be123c' },
      { label: 'Avgust', val: 11, trend: '-31%', trendType: 'down', color: '#047857' },
      { label: 'Sentabr', val: 14, trend: '+27%', trendType: 'up', color: '#be123c' }
    ];
  }

  const maxVal = Math.max(...dataPoints.map(p => p.val));

  container.innerHTML = dataPoints.map(p => {
    const heightPx = Math.round((p.val / maxVal) * 105) + 15;
    const trendSymbol = p.trendType === 'up' ? '&#8593;' : '&#8595;';
    const trendClass = p.trendType === 'up' ? 'trend-up' : 'trend-down';
    return `
      <div class="chart-col">
        <span class="trend-badge ${trendClass}">${trendSymbol} ${p.trend}</span>
        <span style="font-size: 11px; font-weight: 800; color: ${p.color};">${p.val} ta</span>
        <div class="chart-bar-elem" style="height: ${heightPx}px; background: ${p.color};"></div>
        <span style="font-size: 11px; font-weight: 700; color: #475569; margin-top: 4px;">${p.label}</span>
      </div>
    `;
  }).join('');
}

// DASHBOARD HUDUDLAR RO'YXATI (SONLARI BILAN)
function renderDashboardRegions() {
  const container = document.getElementById('dashboardRegionsList');
  if (!container || !window.regionsReportData) return;
  container.innerHTML = window.regionsReportData.slice(0, 5).map(r => `
    <div onclick="drillIntoRegionWorks('all', '${r.name}')" style="padding: 10px 14px; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; cursor: pointer; display: flex; justify-content: space-between; align-items: center;">
      <div>
        <b style="font-size: 13px; color: #0b132b;">${r.name}</b>
        <p style="font-size: 11px; color: #64748b; font-weight: 600; margin-top: 2px;">
          Tekshiruvlar: <b style="color: #d97706;">${r.invCount} ta</b> | A toifa xavf: <b style="color: #be123c;">${r.riskCount} ta</b> | Tezkor tadbir: <b style="color: #1d4ed8;">${r.opsCount} ta</b>
        </p>
      </div>
      <button class="btn btn-slate" style="padding: 4px 10px; font-size: 11px;">Hujjatlar &rarr;</button>
    </div>
  `).join('');
}

// 1-BOSQICH: DRILLDOWN (14 HUDUDGA KIRISH)
window.startDrillFlow = function(categoryKey) {
  const titleMap = {
    'investigations': 'Xizmat Tekshiruvlari — 14 ta Hudud Bo\'yicha Taqsimot (333 ta)',
    'convicted': 'Sudlangan Xodimlar — 14 ta Hudud Bo\'yicha Taqsimot (18 nafar)',
    'operations': 'Tezkor Tadbirlar — 14 ta Hudud Bo\'yicha Taqsimot (14 ta)',
    'risk': 'Korrupsion Xavf Guruhlari (A, B, D) — 14 ta Hudud Bo\'yicha',
    'fired': 'Komplayens Tashabbusi Bilan Bo\'shatilganlar — 14 ta Hudud Bo\'yicha'
  };

  document.getElementById('drillModalTitle').innerText = titleMap[categoryKey];
  const body = document.getElementById('drillModalBody');
  body.innerHTML = `
    <p style="font-size: 11px; color: #64748b; font-weight: 600; margin-bottom: 12px;">Qaysi viloyatning ishlarini ko'rmoqchisiz? Hududni tanlang (yonida aniq soni ko'rsatilgan):</p>
    <div class="grid-2">
      ${window.regionsReportData.map(reg => {
        let count = 0;
        if (categoryKey === 'investigations') count = reg.invCount;
        else if (categoryKey === 'convicted') count = reg.convictedCount;
        else if (categoryKey === 'operations') count = reg.opsCount;
        else if (categoryKey === 'risk') count = reg.riskCount;
        else if (categoryKey === 'fired') count = reg.firedCount;

        return `
          <div onclick="drillIntoRegionWorks('${categoryKey}', '${reg.name}')" class="card" style="padding: 12px; border: 1px solid #cbd5e1; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <b style="font-size: 13px; color: #0b132b;">${reg.name}</b>
              <p style="font-size: 10px; color: #1d4ed8; font-weight: 700; margin-top: 2px;">Ishlar va Hujjatlarni ochish &rarr;</p>
            </div>
            <span class="badge ${count>0?'badge-rose':'badge-slate'}" style="font-size: 12px;">${count} ta ish</span>
          </div>
        `;
      }).join('')}
    </div>
  `;
  openModal('drillModal');
};

// 2-BOSQICH: HUDUD TANLANGANDA ISHLAR RO'YXATI
window.drillIntoRegionWorks = function(categoryKey, regionName) {
  document.getElementById('drillModalTitle').innerText = `${regionName} — Ishlar va Asos Hujjatlar`;
  const body = document.getElementById('drillModalBody');
  body.innerHTML = `
    <button onclick="startDrillFlow('${categoryKey}')" class="btn btn-slate" style="margin-bottom: 14px;">&larr; Viloyatlarga qaytish</button>
  `;

  if (categoryKey === 'investigations' || categoryKey === 'all') {
    const list = window.investigationsData.filter(inv => inv.region.includes(regionName) || regionName.includes('Qashqadaryo') || regionName.includes('Samarqand'));
    body.innerHTML += `
      <h4 style="font-size: 12px; font-weight: 700; color: #d97706; margin-bottom: 8px;">Xizmat Tekshiruvlari Xulosalari va Dalolatnomalari:</h4>
      <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 14px;">
        ${list.map(inv => `
          <div style="padding: 12px; background: #fefce8; border: 1px solid #fef08a; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <b style="font-size: 13px; color: #a16207;">${inv.code} — ${inv.branch} (${inv.officer})</b>
              <p style="font-size: 11px; color: #475569; margin: 3px 0;">Asos: <b>${inv.type}</b> \vert{} Aniqlangan holat: <b>${inv.reason}</b></p>
              <p style="font-size: 11px; color: #b45309; font-weight: 700;">Natija: ${inv.result}</p>
            </div>
            <button onclick="openPdfViewer('investigation', '${inv.code}', '${inv.region}', '${inv.date}', '${inv.reason}')" class="btn btn-amber">&#128196; Xulosa PDF</button>
          </div>
        `).join('')}
      </div>
    `;
  }

  if (categoryKey === 'convicted' || categoryKey === 'all') {
    const list = window.convictedData.filter(c => c.region.includes(regionName) || regionName.includes('Samarqand') || regionName.includes('Toshkent'));
    body.innerHTML += `
      <h4 style="font-size: 12px; font-weight: 700; color: #be123c; margin-bottom: 8px;">Sudlangan Xodimlar Ish Jildlari:</h4>
      <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 14px;">
        ${list.map(c => `
          <div style="padding: 12px; background: #fff1f2; border: 1px solid #fecdd3; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <b style="font-size: 13px; color: #be123c;">${c.name}</b>
                  <p style="font-size: 11px; color: #475569;">Lavozimi: ${c.role} \vert{} JSHSHIR: <b>${c.pinfl}</b></p>
                  <p style="font-size: 11px; color: #be123c; font-weight: 600;">${c.court} (${c.date}):${c.articles} bilan ayblangan</p>
                </div>
                <button onclick="openPdfViewer('court', '${c.name}', '${c.court}', '${c.date}', '${c.articles}')" class="btn btn-rose">&#128196; Sud Hukmi PDF</button>
              </div>
        `).join('')}
      </div>
    `;
  }

  if (categoryKey === 'operations' || categoryKey === 'all') {
    const list = window.operationsData.filter(op => op.region.includes(regionName) || regionName.includes('Samarqand') || regionName.includes('Toshkent'));
    body.innerHTML += `
      <h4 style="font-size: 12px; font-weight: 700; color: #1d4ed8; margin-bottom: 8px;">Tezkor Tadbir Bayonnomalari:</h4>
      <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 14px;">
        ${list.map(op => `
          <div style="padding: 12px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="display: flex; gap: 8px; align-items: center;">
                <b style="font-size: 13px; color: #1d4ed8;">${op.code} — ${op.district}</b>${op.isCollab ? '<span class="badge badge-emerald">Komplayens Hamkorligida</span>' : '<span class="badge badge-slate">Organ Tashabbusi</span>'}
              </div>
              <p style="font-size: 11px; color: #475569; margin: 3px 0;">O'tkazgan organ: <b>${op.partner}</b> | Pora/Dalil: <b style="color: #be123c;">${op.proof}</b></p>
              <p style="font-size: 11px; color: #000; font-weight: 600;">${op.desc}</p>
            </div>
            <button onclick="openPdfViewer('operation', '${op.code}', '${op.district}', '${op.date}', '${op.desc}')" class="btn btn-blue">&#128196; Bayonnoma PDF</button>
          </div>
        `).join('')}
      </div>
    `;
  }

  if (categoryKey === 'risk' || categoryKey === 'all') {
    const list = window.riskGroupsData.filter(r => r.region.includes(regionName) || regionName.includes('Samarqand') || regionName.includes('Toshkent'));
    body.innerHTML += `
      <h4 style="font-size: 12px; font-weight: 700; color: #d97706; margin-bottom: 8px;">Korrupsion Xavf Guruhlari (A, B, D):</h4>
      <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 14px;">
        ${list.map(r => `
          <div style="padding: 12px; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <b>${r.name}</b> <span class="badge ${r.type==='A'?'badge-rose':'badge-amber'}">${r.type} toifa xavf</span>
              <p style="font-size: 11px; color: #475569; margin-top: 2px;">Lavozimi: ${r.role} \vert{} Omil: <b>${r.desc}</b></p>
            </div>
            <button onclick="openPdfViewer('risk', '${r.name}', '${regionName}', '${r.docDate}', '${r.desc}')" class="btn btn-slate">&#128196; Xavf Xulosasi PDF</button>
          </div>
        `).join('')}
      </div>
    `;
  }

  if (categoryKey === 'fired' || categoryKey === 'all') {
    const list = window.firedStaffData.filter(f => f.region.includes(regionName) || regionName.includes('Samarqand') || regionName.includes('Toshkent'));
    body.innerHTML += `
      <h4 style="font-size: 12px; font-weight: 700; color: #047857; margin-bottom: 8px;">Komplayens Tashabbusi Bilan Bo'shatilganlar:</h4>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        ${list.map(f => `
          <div style="padding: 12px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <b style="font-size: 13px; color: #047857;">${f.name}</b>
              <p style="font-size: 11px; color: #be123c; font-weight: 600;">Sabab: ${f.reason}</p>
              <p style="font-size: 11px; color: #475569;">Buyruq: <b>${f.orderNum}</b> (${f.orderDate})</p>
            </div>
            <button onclick="openPdfViewer('fired', '${f.name}', '${regionName}', '${f.orderDate}', '${f.reason}')" class="btn btn-emerald">&#128196; Buyruq PDF</button>
          </div>
        `).join('')}
      </div>
    `;
  }
};

// 3-BOSQICH: RASMIY DEMO PDF HUJJAT OYNCHASI
window.openPdfViewer = function(docType, p1, p2, p3, p4) {
  const paper = document.getElementById('pdfPaperContent');
  let html = '';

  if (docType === 'investigation') {
    document.getElementById('pdfDocTitle').innerText = `Xizmat Tekshiruvi Xulosasi — ${p1}`;
    html = `
      <div class="pdf-header">
        <h2>O'zbekiston Respublikasi Kadastr Agentligi</h2>
        <h2>Xizmat Tekshiruvi Xulosasi va Dalolatnomasi</h2>
        <p>Hujjat kodi: ${p1} | Hudud: ${p2} | Sana: ${p3}</p>
      </div>
      <p style="text-indent: 30px; margin-bottom: 15px;">
        Korrupsiyaga qarshi ichki nazorat tuzilmasi mutaxassislari tomonidan o'tkazilgan o'rganishlar davomida quyidagi qonunbuzilish holatlari aniqlandi:
      </p>
      <p style="text-indent: 30px; margin-bottom: 15px;">
        Holat: <b>${p4}</b>. Mazkur holat bo'yicha mas'ul xodimlar davlat xizmatlari ko'rsatish tartibini buzib, yer maydonlarini auksionsiz berish yoki manfaatlar to'qnashuviga yo'l qo'ygan.
      </p>
      <p style="text-indent: 30px; font-weight: bold; margin-bottom: 25px;">
        XULOSA: To'plangan materiallar tegishli huquqiy baho berish uchun prokuratura organlariga oshirilsin hamda aybdor xodimlarga nisbatan mehnat shartnomasini bekor qilish chorasi qo'llansin.
      </p>
      <div class="pdf-stamp">
        <div><p>Komplayens inspektori: ____________</p><p style="font-size: 10px; color: #666;">Elektron tasdiqlangan</p></div>
        <div class="stamp-box" style="border-color: #d97706; color: #d97706;">KOMPLAYENS NAZORATI<br>XIZMAT TEKSHIRUVI XULOSASI</div>
      </div>
    `;
  } else if (docType === 'court') {
    document.getElementById('pdfDocTitle').innerText = `Sud Hukmi — ${p1}`;
    html = `
      <div class="pdf-header">
        <h2>O'zbekiston Respublikasi Nomi Bilan</h2>
        <h2>Sud Hukmi</h2>
        <p>${p2} | Ish № 1-441/2026 | Sana: ${p3}</p>
      </div>
      <p style="text-indent: 30px; margin-bottom: 15px;">
        Sudya hay'ati raisligida, ayblanuvchi <b>${p1}</b> ga nisbatan Jinoyat Kodeksining <b>${p4}</b> bilan jinoyat ishini ko'rib chiqdi.
      </p>
      <p style="text-indent: 30px; margin-bottom: 15px;">
        Sudlanuvchi kadastr tizimidagi mansab vakolatidan foydalanib, noqonuniy yer rasmiylashtirish va pora olish jinoyatini sodir etganlikda aybdor deb topildi.
      </p>
      <p style="text-indent: 30px; font-weight: bold; margin-bottom: 25px;">
        HUKM QILINDI: ${p1} JKning tegishli moddalari bilan aybdor deb topilsin. Davlat kadastrlari tizimida 2 yil muddatga mansabdorlik lavozimlarida ishlash huquqidan mahrum etilsin.
      </p>
      <div class="pdf-stamp">
        <div><p>Sudya: ________________ (Imzo)</p><p style="font-size: 10px; color: #666;">Elektron raqamli imzo bilan tasdiqlangan</p></div>
        <div class="stamp-box">JINOYAT ISHLARI BO'YICHA SUD<br>GERBLI RASMIY MUHR</div>
      </div>
    `;
  } else if (docType === 'operation') {
    document.getElementById('pdfDocTitle').innerText = `Tezkor Tadbir Bayonnomasi — ${p1}`;
    html = `
      <div class="pdf-header">
        <h2>Vakolatli Organ va Kadastr Komplayens Bo'limi</h2>
        <h2>Tezkor Tadbir Bayonnomasi</h2>
        <p>Hujjat kodi: ${p1} | O'tkazilgan filial: ${p2} | Sana: ${p3}</p>
      </div>
      <p style="text-indent: 30px; margin-bottom: 15px;">
        Tadbir davomida mas'ul xodim fuqaroning yer maydoniga noqonuniy egalik huquqini belgilash evaziga ashyoviy dalil sifatida belgilangan pul mablag'ini olayotgan vaqtida jinoyat ustida ushlandi.
      </p>
      <p style="text-indent: 30px; font-weight: bold; margin-bottom: 25px;">
        Asos: ${p4}. Holat yuzasidan barcha ashyoviy dalillar xolislar ishtirokida muhrlandi va tergov organiga topshirildi.
      </p>
      <div class="pdf-stamp">
        <div><p>Komplayens mutaxassisi: __________</p><p>Tezkor guruh rahbari: __________</p></div>
        <div class="stamp-box" style="border-color: #be123c; color: #be123c;">TEZKOR GURUH NAZORATIDA<br>MAXSUS TADBIR TASDIQLANDI</div>
      </div>
    `;
  } else if (docType === 'fired') {
    document.getElementById('pdfDocTitle').innerText = `Ishdan Bo'shatish Buyrug'i — ${p1}`;
    html = `
      <div class="pdf-header">
        <h2>O'zbekiston Respublikasi Kadastr Agentligi</h2>
        <h2>Buyruq (Nusxa)</h2>
        <p>${p2} boshqarmasi | Sana: ${p3}</p>
      </div>
      <p style="text-align: center; font-weight: bold; margin-bottom: 15px;">
        "Xodim ${p1} bilan tuzilgan mehnat shartnomasini komplayens tekshiruvi xulosasiga ko'ra bekor qilish to'g'risida"
      </p>
      <p style="text-indent: 30px; margin-bottom: 15px;">
        Korrupsiyaga qarshi ichki nazorat tuzilmasi tomonidan o'tkazilgan xizmat tekshiruvi xulosasiga ko'ra, xodim tomonidan sohaviy standartlar va qonunchilik talablari qo'pol ravishda buzilgan.
      </p>
      <p style="text-indent: 30px; font-weight: bold; margin-bottom: 25px;">
        BUYURAMAN: Xodim ${p1} egallab turgan lavozimidan Mehnat Kodeksining 161-moddasi bilan ozod etilsin va kadastr tizimiga qayta ishga olinishi taqiqlansin.
      </p>
      <div class="pdf-stamp">
        <div><p>Boshqarma boshlig'i: ____________</p><p>Komplayens xulosasi: ____________</p></div>
        <div class="stamp-box" style="border-color: #047857; color: #047857;">KADASTR AGENTLIGI<br>BUYRUQ RASMIY TASDIQLANDI</div>
      </div>
    `;
  } else if (docType === 'risk') {
    document.getElementById('pdfDocTitle').innerText = `Korrupsion Xavf Xulosasi — ${p1}`;
    html = `
      <div class="pdf-header">
        <h2>Kadastr Agentligi Korrupsiyaga Qarshi Ichki Nazorat Bo'limi</h2>
        <h2>Xodimning Korrupsion Xavfini Baholash Xulosasi</h2>
        <p>Boshqarma: ${p2} | Hujjat sanasi: ${p3}</p>
      </div>
      <p style="text-indent: 30px; margin-bottom: 25px;">
        Aniqlangan xavf omili: <b>${p4}</b>. Mazkur xodim bevosita moddiy javobgar bo'lganligi sababli, <b>A TOIFA (YUQORI XAVF)</b> guruhiga kiritilsin va maxsus monitoringga olinsin.
      </p>
      <div class="pdf-stamp">
        <div><p>Komplayens inspektori: ____________</p></div>
        <div class="stamp-box" style="border-color: #d97706; color: #d97706;">XAVF GURUHI TASDIQLANDI<br>KOMPLAYENS REYESTRI</div>
      </div>
    `;
  }

  paper.innerHTML = html;
  openModal('pdfViewerModal');
};

// 29 USTUNLI MATRITSA
function renderMatrixTable() {
  const tbody = document.getElementById('matrixTbody');
  if (!tbody || !window.regionsReportData) return;
  tbody.innerHTML = '';
  let totals = { total: 0, hmmqo: 0, ichki: 0, hmmqo_prok: 0, hmmqo_iib: 0, hmmqo_dxx: 0, hmmqo_other: 0, ichki_prok: 0, ichki_iib: 0, ichki_dxx: 0, ichki_other: 0, hmmqo_crim: 0, hmmqo_adm: 0, hmmqo_83: 0, hmmqo_84: 0, hmmqo_rej: 0, hmmqo_proc: 0, hmmqo_fire: 0, hmmqo_disc: 0, ichki_crim: 0, ichki_adm: 0, ichki_83: 0, ichki_84: 0, ichki_rej: 0, ichki_proc: 0, ichki_fire: 0, ichki_disc: 0 };
  window.regionsReportData.forEach(r => { for (let k in totals) { totals[k] += (r[k] || 0); } });

  tbody.innerHTML += `
    <tr style="background: #e2e8f0; font-weight: 700;">
      <td colspan="2">JAMI</td>
      <td style="background:#bbf7d0;">${totals.total}</td><td>${totals.hmmqo}</td><td>${totals.ichki}</td>
      <td>${totals.hmmqo_prok}</td><td>${totals.hmmqo_iib}</td><td>${totals.hmmqo_dxx}</td><td>${totals.hmmqo_other}</td>
      <td>${totals.ichki_prok}</td><td>${totals.ichki_iib}</td><td>${totals.ichki_dxx}</td><td>${totals.ichki_other}</td>
      <td style="color:#be123c;">${totals.hmmqo_crim}</td><td>${totals.hmmqo_adm}</td><td>${totals.hmmqo_83}</td><td>${totals.hmmqo_84}</td><td>${totals.hmmqo_rej}</td><td>${totals.hmmqo_proc}</td><td style="color:#be123c;">${totals.hmmqo_fire}</td><td>${totals.hmmqo_disc}</td>
      <td style="color:#be123c;">${totals.ichki_crim}</td><td>${totals.ichki_adm}</td><td>${totals.ichki_83}</td><td>${totals.ichki_84}</td><td>${totals.ichki_rej}</td><td>${totals.ichki_proc}</td><td style="color:#be123c;">${totals.ichki_fire}</td><td>${totals.ichki_disc}</td>
    </tr>
  `;

  window.regionsReportData.forEach((r, idx) => {
    tbody.innerHTML += `
      <tr>
        <td>${idx + 1}</td>
        <td style="text-align:left; font-weight:600;">${r.name}</td>
        <td style="background:#f0fdf4; font-weight:700;">${r.total}</td><td>${r.hmmqo}</td><td>${r.ichki}</td>
        <td>${r.hmmqo_prok || '-'}</td><td>${r.hmmqo_iib || '-'}</td><td>${r.hmmqo_dxx || '-'}</td><td>${r.hmmqo_other || '-'}</td>
        <td>${r.ichki_prok || '-'}</td><td>${r.ichki_iib || '-'}</td><td>${r.ichki_dxx || '-'}</td><td>${r.ichki_other || '-'}</td>
        <td>${r.hmmqo_crim || '-'}</td><td>${r.hmmqo_adm || '-'}</td><td>${r.hmmqo_83 || '-'}</td><td>${r.hmmqo_84 || '-'}</td><td>${r.hmmqo_rej || '-'}</td><td>${r.hmmqo_proc || '-'}</td><td style="color:#be123c; font-weight:700;">${r.hmmqo_fire || '-'}</td><td>${r.hmmqo_disc || '-'}</td>
        <td>${r.ichki_crim || '-'}</td><td>${r.ichki_adm || '-'}</td><td>${r.ichki_83 || '-'}</td><td>${r.ichki_84 || '-'}</td><td>${r.ichki_rej || '-'}</td><td>${r.ichki_proc || '-'}</td><td style="color:#be123c; font-weight:700;">${r.ichki_fire || '-'}</td><td>${r.ichki_disc || '-'}</td>
      </tr>
    `;
  });
}

window.exportMatrixToExcel = function() {
  const table = document.getElementById("matrixTable");
  if (typeof XLSX !== 'undefined') {
    const wb = XLSX.utils.table_to_book(table, {sheet: "Hisobot_Matritsasi_333"});
    XLSX.writeFile(wb, "Kadastr_Antikorrupsiya_Matritsa_333.xlsx");
  } else {
    alert("Rasmiy hisobot matritsasi (333 ta tekshiruv) yuklab olinmoqda...");
  }
};

// JADVALLARNI QURISH
function renderRiskTable() {
  const tbody = document.getElementById('riskTableBody');
  if (!tbody || !window.riskGroupsData) return;
  tbody.innerHTML = window.riskGroupsData.map(r => `
    <tr>
      <td><b>${r.name}</b><br><small style="color: #2563eb;">${r.pinfl}</small></td>
      <td>${r.region}<br><small style="color: #64748b;">${r.role}</small></td>
      <td><span class="badge ${r.type==='A'?'badge-rose':'badge-amber'}">${r.type} toifa xavf</span></td>
      <td>${r.desc}</td>
      <td style="color: #047857; font-weight: 600;">${r.action}</td>
      <td style="text-align: center;"><button onclick="openPdfViewer('risk', '${r.name}', '${r.region}', '${r.docDate}', '${r.desc}')" class="btn btn-slate" style="padding: 4px 8px;">Xulosa PDF</button></td>
    </tr>
  `).join('');
}

function renderFiredTable() {
  const tbody = document.getElementById('firedTableBody');
  if (!tbody || !window.firedStaffData) return;
  tbody.innerHTML = window.firedStaffData.map(f => `
    <tr>
      <td><b>${f.name}</b></td>
      <td>${f.region}</td>
      <td style="color: #be123c; font-weight: 600;">${f.reason}</td>
      <td><b>${f.orderNum}</b> (${f.orderDate})</td>
      <td>${f.result}</td>
      <td style="text-align: center;"><button onclick="openPdfViewer('fired', '${f.name}', '${f.region}', '${f.orderDate}', '${f.reason}')" class="btn btn-emerald" style="padding: 4px 8px;">Buyruq PDF</button></td>
    </tr>
  `).join('');
}

function renderOperationsGrid() {
  const container = document.getElementById('operationsGrid');
  if (!container || !window.operationsData) return;
  container.innerHTML = window.operationsData.map(op => `
    <div class="card" style="border-left: 4px solid #1d4ed8;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <b style="font-size: 13px;">${op.code} — ${op.region}</b>
        <span class="badge badge-blue">${op.date}</span>
      </div>
      <div style="margin-top: 6px; display: flex; gap: 8px; align-items: center;">
        <span style="font-size: 11px; color: #475569;">Organ: <b>${op.partner}</b></span>
        ${op.isCollab ? '<span class="badge badge-emerald">Komplayens Hamkorligida</span>' : '<span class="badge badge-slate">Organ Tashabbusi</span>'}
      </div>
      <p style="margin-top: 6px; color: #000; font-weight: 600;">${op.desc}</p>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px; border-top: 1px solid #f1f5f9; padding-top: 8px;">
        <span style="color: #be123c; font-weight: 700;">Dalil: ${op.proof}</span>
        <button onclick="openPdfViewer('operation', '${op.code}', '${op.district}', '${op.date}', '${op.desc}')" class="btn btn-blue" style="padding: 4px 8px;">Bayonnoma PDF</button>
      </div>
    </div>
  `).join('');
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
      <td>${c.region}</td>
      <td>${c.court}</td>
      <td><span class="badge badge-rose">${c.articles}</span></td>
      <td>${c.punishment}</td>
      <td><span class="badge badge-emerald">Chetlatilgan</span></td>
      <td style="text-align: center;"><button onclick="openPdfViewer('court', '${c.name}', '${c.court}', '${c.date}', '${c.articles}')" class="btn btn-rose" style="padding: 4px 8px;">Hukm PDF</button></td>
    </tr>
  `).join('');
};

function renderCombinedConflictBusiness() {
  const container = document.getElementById('combinedConflictBusinessGrid');
  if (!container || !window.combinedConflictBusinessData) return;
  container.innerHTML = window.combinedConflictBusinessData.map(c => `
    <div class="card" style="border-left: 4px solid ${c.type.includes('STIR')?'#eab308':'#06b6d4'};">
      <div style="display:flex; justify-content:space-between;">
        <b>${c.name}</b>
        <span class="badge ${c.type.includes('STIR')?'badge-amber':'badge-emerald'}">${c.type}</span>
      </div>
      <p style="font-size:11px; margin-top:4px;">Hudud: <b>${c.region}</b> | Lavozim: ${c.role} | JSHSHIR: <b>${c.pinfl}</b></p>
      <p style="font-size:11px; color:#be123c; font-weight:600; margin-top:4px;">Holat: ${c.detail}</p>
      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px; border-top:1px solid #f1f5f9; padding-top:6px;">
        <span style="font-size:10px; color:#047857; font-weight:700;">Chora: ${c.action}</span>
        <button onclick="openPdfViewer('risk', '${c.name}', '${c.region}', '2026', '${c.detail}')" class="btn btn-slate" style="padding:4px 8px;">Dalolatnoma PDF</button>
      </div>
    </div>
  `).join('');
}

// 5 BOSQICHLI ARXIV TIZIMI
window.initArchive = function() {
  const area = document.getElementById('archiveViewArea');
  if (!area) return;
  area.innerHTML = `
    <div class="grid-3">
      <div onclick="openArchiveRegions('Tezkor Tadbir Bayonnomalari')" class="card">
        <b style="font-size: 14px;">&#128193; 1. Tezkor Tadbirlar Arxivi</b>
        <p style="font-size: 11px; color: #64748b; margin-top: 4px;">DXX, Departament, IIB reydlari</p>
      </div>
      <div onclick="openArchiveRegions('Xizmat Tekshiruvi Xulosalari')" class="card">
        <b style="font-size: 14px;">&#128193; 2. Tekshiruv Xulosalari</b>
        <p style="font-size: 11px; color: #64748b; margin-top: 4px;">Dalolatnomalar va xulosalar</p>
      </div>
      <div onclick="openArchiveRegions('Manfaatlar Toqnashuvi')" class="card">
        <b style="font-size: 14px;">&#128193; 3. Manfaatlar To'qnashuvi</b>
        <p style="font-size: 11px; color: #64748b; margin-top: 4px;">Qarindoshlik deklaratsiyalari</p>
      </div>
      <div onclick="openArchiveRegions('Tadbirkorlik STIR')" class="card">
        <b style="font-size: 14px;">&#128193; 4. STIR Dalolatnomalari</b>
        <p style="font-size: 11px; color: #64748b; margin-top: 4px;">MCHJ ta'sischilari ro'yxati</p>
      </div>
      <div onclick="openArchiveRegions('Sud Hukmlari')" class="card">
        <b style="font-size: 14px;">&#128193; 5. Sud Hukmlari</b>
        <p style="font-size: 11px; color: #64748b; margin-top: 4px;">Tasdiqlangan PDF nusxalar</p>
      </div>
      <div onclick="openArchiveRegions('Ijro Xatlari')" class="card">
        <b style="font-size: 14px;">&#128193; 6. Ijro Xatlari</b>
        <p style="font-size: 11px; color: #64748b; margin-top: 4px;">Agentlik va Palata xatlari</p>
      </div>
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
        <div onclick="openArchiveYears('${catName}', '${r.name}')" class="card">
          <b>${r.name}</b>
          <p style="font-size: 11px; color: #64748b;">Viloyat arxivi</p>
        </div>
      `).join('')}
    </div>
  `;
};

window.openArchiveYears = function(catName, regName) {
  document.getElementById('archivePath').innerText = `${catName} / ${regName}`;
  const area = document.getElementById('archiveViewArea');
  area.innerHTML = `
    <button onclick="openArchiveRegions('${catName}')" class="btn btn-slate" style="margin-bottom: 12px;">&larr; Viloyatlarga qaytish</button>
    <div class="grid-2">
      <div onclick="openArchiveMonths('${catName}', '${regName}', '2026-yil')" class="card"><b>2026-yil</b><p style="font-size: 11px; color: #64748b;">12 oy papkalari</p></div>
      <div onclick="openArchiveMonths('${catName}', '${regName}', '2025-yil')" class="card"><b>2025-yil</b><p style="font-size: 11px; color: #64748b;">Yopilgan arxiv</p></div>
    </div>
  `;
};

window.openArchiveMonths = function(catName, regName, year) {
  document.getElementById('archivePath').innerText = `${catName} / ${regName} / ${year}`;
  const area = document.getElementById('archiveViewArea');
  area.innerHTML = `
    <button onclick="openArchiveYears('${catName}', '${regName}')" class="btn btn-slate" style="margin-bottom: 12px;">&larr; Yillarga qaytish</button>
    <div class="grid-4">
      ${['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentabr', 'Oktyabr', 'Noyabr', 'Dekabr'].map(m => `
        <div onclick="openArchiveFiles('${catName}', '${regName}', '${year}', '${m}')" class="card"><b>${m}</b></div>
      `).join('')}
    </div>
  `;
};

window.openArchiveFiles = function(catName, regName, year, month) {
  document.getElementById('archivePath').innerText = `${catName} / ${regName} / ${year} / ${month}`;
  const area = document.getElementById('archiveViewArea');
  area.innerHTML = `
    <button onclick="openArchiveMonths('${catName}', '${regName}', '${year}')" class="btn btn-slate" style="margin-bottom: 12px;">&larr; Oylarga qaytish</button>
    <div class="box" style="padding: 0; overflow: hidden;">
      <table>
        <thead><tr><th>Hujjat Kodi va Nomi</th><th>Yuklangan Sana</th><th style="text-align: center;">Demo PDF Ko'rish</th></tr></thead>
        <tbody>
          <tr>
            <td><b>${regName}_${catName}_№041.pdf</b> (2.8 MB)</td>
            <td>24.09.2026, 14:30</td>
            <td style="text-align: center;"><button onclick="openPdfViewer('court', 'Aliyev Vali', '${regName} sudi', '24.09.2026', 'JK 210-m')" class="btn btn-rose" style="padding: 4px 10px;">Ochish PDF</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
};

// FORMA FUNKSIYALARI
window.saveNewTask = function() {
  const title = document.getElementById('task-title').value;
  if (!title) { alert("Topshiriq sarlavhasini kiriting!"); return; }
  alert("Topshiriq muvaffaqiyatli yuborildi va nazoratga olindi!");
  closeModal('newTaskModal');
};

window.saveNewConvicted = function() {
  const name = document.getElementById('conv-name').value;
  const pinfl = document.getElementById('conv-pinfl').value;
  const region = document.getElementById('conv-region').value;
  const role = document.getElementById('conv-role').value;
  const articles = document.getElementById('conv-articles').value;

  if (!name || !pinfl) { alert("F.I.SH va JSHSHIR kiritilishi shart!"); return; }

  window.convictedData.unshift({
    pinfl: pinfl, name: name, region: region, role: role || 'Mutaxassis', court: 'Shahar sudi', date: '29.09.2026', articles: articles || '205-m', punishment: '2 yil mansab taqiqi', status: 'chetlatilgan'
  });

  renderConvictedTable();
  closeModal('newConvictedModal');
  alert("Sudlangan xodim bazaga kiritildi!");
};

window.saveNewRisk = function() {
  const name = document.getElementById('risk-name').value;
  const pinfl = document.getElementById('risk-pinfl').value;
  const type = document.getElementById('risk-type').value;
  const desc = document.getElementById('risk-desc').value;

  if (!name || !pinfl) { alert("F.I.SH va JSHSHIR kiritilishi shart!"); return; }

  window.riskGroupsData.unshift({
    pinfl: pinfl, name: name, region: 'Samarqand viloyati', role: 'Kiritilgan mutaxassis', type: type, desc: desc || 'Xavf omili aniqlandi', action: 'Nazorat ostida', docNum: 'XAVF-YANGI', docDate: '29.09.2026'
  });

  renderRiskTable();
  closeModal('newRiskModal');
  alert("Korrupsion xavf guruhiga saqlandi!");
};

window.saveNewOperation = function() {
  const region = document.getElementById('op-region').value;
  const district = document.getElementById('op-district').value;
  const partner = document.getElementById('op-partner').value;
  const proof = document.getElementById('op-proof').value;
  const isCollab = document.getElementById('op-collab').checked;

  window.operationsData.unshift({
    code: '#TT-2026-YANGI', 
    date: '29.09.2026', 
    region: region, 
    district: district || 'Markaziy tuman filiali', 
    partner: partner, 
    isCollab: isCollab,
    proof: proof || '3,000 AQSH', 
    desc: 'Pora olayotganda ushlangan', 
    result: 'Jinoyat ishi ochildi'
  });

  renderOperationsGrid();
  closeModal('newOperationModal');
  alert("Tezkor tadbir saqlandi!");
};

// DASTUR DASTLABKI YUKLANGANDA BARCHASINI ISHGA TUSHIRISH
window.addEventListener('DOMContentLoaded', () => {
  renderDynamicChart('month');
  renderDashboardRegions();
  renderMatrixTable();
  renderRiskTable();
  renderFiredTable();
  renderOperationsGrid();
  renderConvictedTable();
  renderCombinedConflictBusiness();
  initArchive();
});
