// KompNazorat 2.1 Ma'lumotlar Bazasi va 14 ta hudud matritsasi
const REGIONS = [
  "Toshkent shahri", "Toshkent viloyati", "Andijon viloyati", "Buxoro viloyati",
  "Farg‘ona viloyati", "Jizzax viloyati", "Xorazm viloyati", "Namangan viloyati",
  "Navoiy viloyati", "Qashqadaryo viloyati", "Qoraqalpog‘iston Resp.", 
  "Samarqand viloyati", "Sirdaryo viloyati", "Surxondaryo viloyati"
];

// 1. Hisobot matritsasi (333 ta tekshiruvning 14 hudud bo‘yicha to‘liq balansi)
const MATRIX_DATA = [
  { region: "Toshkent shahri", planned: 42, done: 39, inProgress: 3, violations: 18, rate: "93%" },
  { region: "Toshkent viloyati", planned: 30, done: 27, inProgress: 3, violations: 12, rate: "90%" },
  { region: "Samarqand viloyati", planned: 32, done: 28, inProgress: 4, violations: 14, rate: "88%" },
  { region: "Farg‘ona viloyati", planned: 28, done: 25, inProgress: 3, violations: 11, rate: "89%" },
  { region: "Andijon viloyati", planned: 26, done: 24, inProgress: 2, violations: 9, rate: "92%" },
  { region: "Namangan viloyati", planned: 25, done: 22, inProgress: 3, violations: 8, rate: "88%" },
  { region: "Qashqadaryo viloyati", planned: 24, done: 20, inProgress: 4, violations: 10, rate: "83%" },
  { region: "Buxoro viloyati", planned: 22, done: 20, inProgress: 2, violations: 7, rate: "91%" },
  { region: "Surxondaryo viloyati", planned: 21, done: 18, inProgress: 3, violations: 9, rate: "86%" },
  { region: "Xorazm viloyati", planned: 20, done: 18, inProgress: 2, violations: 6, rate: "90%" },
  { region: "Qoraqalpog‘iston Resp.", planned: 20, done: 17, inProgress: 3, violations: 8, rate: "85%" },
  { region: "Jizzax viloyati", planned: 16, done: 14, inProgress: 2, violations: 5, rate: "88%" },
  { region: "Navoiy viloyati", planned: 15, done: 14, inProgress: 1, violations: 4, rate: "93%" },
  { region: "Sirdaryo viloyati", planned: 12, done: 11, inProgress: 1, violations: 4, rate: "92%" }
]; // Jami 333 ta reja to'liq qamralgan

// 2. Korrupsion xavf toifalari (A, B, C) va har birida hududlar bo'yicha xodimlar
const RISK_CATEGORIES_DATA = {
  A: {
    title: "A - Toifa (Yuqori xavfli - Qizil)",
    total: 48,
    items: [
      { id: "R-101", name: "Ibrohimov Shuhrat", region: "Toshkent shahri", position: "Bosh hisobchi", riskDesc: "Davlat xaridlari shartnomalarini asossiz imzolash", date: "2026-03-05" },
      { id: "R-102", name: "Alimov Rustam", region: "Samarqand viloyati", position: "Moliya bo‘limi boshlig‘i", riskDesc: "Mablag‘larni maqsadsiz sarflash ehtimoli", date: "2026-02-18" },
      { id: "R-103", name: "Xalilov Bobur", region: "Andijon viloyati", position: "Ta'minot bosh mutaxassisi", riskDesc: "Affillangan shaxslarga tender yutishda ko‘maklashish", date: "2026-03-12" },
      { id: "R-104", name: "Sultonov Jasur", region: "Farg‘ona viloyati", position: "Nazorat inspektori", riskDesc: "Qoidabuzarliklarni yashirish holati", date: "2026-01-29" },
      { id: "R-105", name: "Nazarov Elyor", region: "Qashqadaryo viloyati", position: "Yetakchi muhandis", riskDesc: "Qurilish obyektlarida hajmlarni oshirib ko‘rsatish", date: "2026-03-01" }
    ]
  },
  B: {
    title: "B - Toifa (O‘rta xavfli - Sariq)",
    total: 94,
    items: [
      { id: "R-201", name: "Qodirov Dilshod", region: "Buxoro viloyati", position: "Kadrlar bo‘limi inspektori", riskDesc: "Qarindoshlik aloqalarini o‘z vaqtida deklaratsiya qilmaslik", date: "2026-02-14" },
      { id: "R-202", name: "Ergashev Jamshid", region: "Xorazm viloyati", position: "Omborxona mudiri", riskDesc: "Moddiy boyliklar hisobidagi noaniqliklar", date: "2026-02-22" },
      { id: "R-203", name: "Mirzayev Farrux", region: "Namangan viloyati", position: "Hisobchi-nazoratchi", riskDesc: "Birlamchi hujjatlarni kechiktirib topshirish", date: "2026-03-08" }
    ]
  },
  C: {
    title: "C - Toifa (Past xavfli - Yashil)",
    total: 191,
    items: [
      { id: "R-301", name: "Yoqubov Akrom", region: "Navoiy viloyati", position: "Ish yurituvchi", riskDesc: "Hujjatlar aylanmasidagi texnik xatoliklar", date: "2026-01-10" },
      { id: "R-302", name: "Valiyev Sherzod", region: "Sirdaryo viloyati", position: "Axborot xizmati xodimi", riskDesc: "Portalga ma'lumotlarni kech joylashtirish", date: "2026-02-01" }
    ]
  }
};

// 3. Bo'shatilgan xodimlar (Komplayens tashabbusi bilan)
const DISMISSED_DATA = [
  { id: "D-01", name: "Karimov Sherali Vohidovich", region: "Toshkent shahri", position: "Xaridlar bo‘lim boshlig‘i", reason: "O‘zR MK 161-moddasi (Xizmat vakolatini suiiste'mol qilish)", date: "2026-02-10", orderNum: "14-K/2026" },
  { id: "D-02", name: "Toshmatov Botir Aliyevich", region: "Samarqand viloyati", position: "Bosh mutaxassis", reason: "O‘zR MK 161-moddasi (Manfaatlar to‘qnashuvini yashirish)", date: "2026-02-15", orderNum: "19-K/2026" },
  { id: "D-03", name: "Rasulov Otabek Rustamovich", region: "Andijon viloyati", position: "Tuman filiali rahbari", reason: "Korrupsiyaga qarshi kurashish talablarini buzish", date: "2026-02-28", orderNum: "23-K/2026" },
  { id: "D-04", name: "Mansurov Zokir Akromovich", region: "Farg‘ona viloyati", position: "Hisobchi", reason: "O‘zR MK 161-moddasi (Soxta hisobot tuzish)", date: "2026-03-04", orderNum: "29-K/2026" },
  { id: "D-05", name: "Normatov Ulug‘bek Shokirovich", region: "Qashqadaryo viloyati", position: "Ombor mudiri", reason: "Talon-torojlik va ortiqcha kamomad", date: "2026-03-11", orderNum: "34-K/2026" }
];

// 4. Tezkor tadbirlar (Agentlik va Palata kesimida)
const OPERATIONAL_DATA = [
  { id: "OP-01", agency: "Agentlik", region: "Toshkent shahri", topic: "Noxolis tender savdolarini to‘xtatish bo‘yicha tezkor reyd", date: "2026-03-02", result: "2 ta noqonuniy lot bekor qilindi, hujjatlar prokuraturaga yuborildi" },
  { id: "OP-02", agency: "Palata", region: "Toshkent viloyati", topic: "Litsenziyasiz faoliyat yuritish va korrupsion zanjirlarni aniqlash", date: "2026-03-06", result: "3 nafar mas'ul shaxsga nisbatan ma'muriy bayonnoma tuzildi" },
  { id: "OP-03", agency: "Agentlik", region: "Samarqand viloyati", topic: "Budjet mablag‘larini maqsadsiz ishlatish bo‘yicha tezkor monitoring", date: "2026-03-10", result: "140 mln so‘m asossiz to‘lovlar davlat foydasiga qaytarildi" },
  { id: "OP-04", agency: "Palata", region: "Farg‘ona viloyati", topic: "Bojxona va omborxona nazoratidagi tezkor amaliyot", date: "2026-03-14", result: "Barcha tovarlar xatlandi, jinoiy ish qo‘zg‘atildi" },
  { id: "OP-05", agency: "Agentlik", region: "Buxoro viloyati", topic: "Qurilish-ta'mirlash ishlarida sun'iy narx oshirish holatlari", date: "2026-03-18", result: "Tekshiruv dalolatnomasi rasmiylashtirildi" }
];

// 5. Sudlanganlar reyestri (Kamida 40 ta namunaviy ro'yxat)
const CONVICTED_DATA = [];
const SAMPLE_SURNAMES = ["Abdullayev", "Rahimov", "Qodirov", "Sodiqov", "Karimov", "Yo‘ldoshev", "Mirzayev", "Nazarov", "Hasanov", "Olimov"];
const SAMPLE_NAMES = ["Anvar", "Sardor", "Davron", "Bekzod", "Jasur", "Farhod", "Ulug‘bek", "Sherzod", "Aziz", "Temur"];
const SAMPLE_CRIMES = [
  "167-modda 3-qismi (O‘zlashtirish yoki rastrata qilish)",
  "205-modda (Hokimiyat yoki mansab vakolatini suiiste'mol qilish)",
  "209-modda (Mansab soxtakorligi)",
  "210-modda (Pora olish)",
  "211-modda (Pora berishda vositachilik)"
];

for (let i = 1; i <= 42; i++) {
  const sName = SAMPLE_SURNAMES[i % SAMPLE_SURNAMES.length];
  const fName = SAMPLE_NAMES[(i * 3) % SAMPLE_NAMES.length];
  const region = REGIONS[i % REGIONS.length];
  const crime = SAMPLE_CRIMES[i % SAMPLE_CRIMES.length];
  const year = 2023 + (i % 3);
  CONVICTED_DATA.push({
    id: `SUD-${100 + i}`,
    fullName: `${sName} ${fName} ${sName[0]}-o‘g‘li`,
    region: region,
    article: crime,
    judgmentDate: `${year}-0${(i % 9) + 1}-1${i % 8}`,
    status: i % 2 === 0 ? "Sudlanganligi tugallanmagan" : "Jazo muddati o‘talmoqda",
    courtDocId: `JIB-${2026 - (i % 2)}-${1000 + i}`
  });
}

// 6. Manfaatlar to'qnashuvi va tadbirkorlik (14 ta hudud monitoring jadvali)
const CONFLICT_MATRIX_DATA = [
  { region: "Toshkent shahri", detected: 14, resolved: 11, pending: 3, businessCases: 8 },
  { region: "Toshkent viloyati", detected: 9, resolved: 7, pending: 2, businessCases: 5 },
  { region: "Samarqand viloyati", detected: 8, resolved: 6, pending: 2, businessCases: 4 },
  { region: "Farg‘ona viloyati", detected: 7, resolved: 5, pending: 2, businessCases: 4 },
  { region: "Andijon viloyati", detected: 6, resolved: 5, pending: 1, businessCases: 3 },
  { region: "Namangan viloyati", detected: 5, resolved: 4, pending: 1, businessCases: 3 },
  { region: "Qashqadaryo viloyati", detected: 6, resolved: 4, pending: 2, businessCases: 4 },
  { region: "Buxoro viloyati", detected: 4, resolved: 3, pending: 1, businessCases: 2 },
  { region: "Surxondaryo viloyati", detected: 5, resolved: 3, pending: 2, businessCases: 3 },
  { region: "Xorazm viloyati", detected: 4, resolved: 3, pending: 1, businessCases: 2 },
  { region: "Qoraqalpog‘iston Resp.", detected: 5, resolved: 4, pending: 1, businessCases: 3 },
  { region: "Jizzax viloyati", detected: 3, resolved: 2, pending: 1, businessCases: 2 },
  { region: "Navoiy viloyati", detected: 3, resolved: 3, pending: 0, businessCases: 1 },
  { region: "Sirdaryo viloyati", detected: 2, resolved: 2, pending: 0, businessCases: 1 }
];

// 7. 5 Bosqichli arxiv ma'lumotlari
const ARCHIVE_STAGES_DATA = [
  { stage: 1, name: "1-Bosqich: Birlamchi signallar va qonunbuzarliklar ro‘yxatga olish", totalDocs: 142, status: "Tugallangan", docType: "Ro‘yxatga olish bayonnomasi" },
  { stage: 2, name: "2-Bosqich: Komplayens ekspertizasi va dastlabki tekshiruv dalolatnomalari", totalDocs: 98, status: "Tugallangan", docType: "Ekspertiza xulosasi" },
  { stage: 3, name: "3-Bosqich: Idoralararo muvofiqlashtirish va tezkor chora ko‘rish", totalDocs: 74, status: "Tugallangan", docType: "Muvofiqlashtirish xati" },
  { stage: 4, name: "4-Bosqich: Intizomiy, ma'muriy va huquqiy jazo choralari", totalDocs: 53, status: "Tugallangan", docType: "Buyruq va qarorlar" },
  { stage: 5, name: "5-Bosqich: Yakuniy bartaraf etish hisobotlari va arxivlangan yig‘majild", totalDocs: 333, status: "Yig‘ilgan va muhrlangan", docType: "Arxiv yopilish dalolatnomasi" }
];
