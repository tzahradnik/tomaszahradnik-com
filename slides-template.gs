/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  ŠABLONA PŘEDNÁŠKY – Tomáš Zahradník                        ║
 * ║  Google Apps Script                                          ║
 * ║                                                              ║
 * ║  Spuštění:                                                   ║
 * ║   1. script.google.com → Nový projekt                        ║
 * ║   2. Nahraďte obsah tímto kódem (V8 runtime)                 ║
 * ║   3. Spusťte funkci createPresentation()                     ║
 * ║   4. Odkaz se zobrazí v Logu (Ctrl+Enter)                    ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

// ── DESIGN TOKENY ─────────────────────────────────────────────────
const C = {
  primary:      '#6A4C93',
  primaryLight: '#8B6DB5',
  primaryDark:  '#4E3570',
  veryDark:     '#2D1654',
  accent:       '#C4A8E8',
  accentLight:  '#EDE4FF',
  surface:      '#FAFAF8',
  surfaceAlt:   '#F3EFF9',
  textPrimary:  '#1A1523',
  textSecond:   '#5C5470',
  textMuted:    '#9B93A8',
  border:       '#E8E0F0',
  white:        '#FFFFFF',
};

const F = { display: 'Playfair Display', body: 'Inter Tight' };
const W = 720;   // šířka slajdu v pt
const H = 405;   // výška slajdu v pt
const PAD = 40;  // standardní odsazení


// ── HLAVNÍ FUNKCE ─────────────────────────────────────────────────
function createPresentation() {
  const pres = SlidesApp.create('Šablona přednášky – Tomáš Zahradník');
  const [s1] = pres.getSlides();

  s01_title(s1);
  s02_agenda(pres.appendSlide());
  s03_text(pres.appendSlide());
  s04_kpi(pres.appendSlide());
  s05_image(pres.appendSlide());
  s06_scale(pres.appendSlide());
  s07_triangle(pres.appendSlide());
  s08_sources(pres.appendSlide());
  s09_about(pres.appendSlide());
  s10_qr(pres.appendSlide());
  s11_questions(pres.appendSlide());

  Logger.log('✅  Prezentace je připravena:\n' + pres.getUrl());
}


// ── HELPERS ───────────────────────────────────────────────────────

/** Textový box. opts: font, size, color, bold, italic, align, valign */
function addT(slide, text, l, top, w, h, opts) {
  opts = opts || {};
  const box = slide.insertTextBox(text, l, top, w, h);
  box.getFill().setTransparent();
  box.getBorder().setTransparent();

  const ts = box.getText().getTextStyle();
  ts.setFontFamily(opts.font  || F.body);
  ts.setFontSize(opts.size    || 12);
  ts.setForegroundColor(opts.color || C.textPrimary);
  ts.setBold(opts.bold   === true);
  ts.setItalic(opts.italic === true);

  box.getText().getParagraphStyle().setParagraphAlignment(
    opts.align === 'center' ? SlidesApp.ParagraphAlignment.CENTER :
    opts.align === 'right'  ? SlidesApp.ParagraphAlignment.END    :
                              SlidesApp.ParagraphAlignment.START
  );
  box.setContentAlignment(
    opts.valign === 'top'    ? SlidesApp.ContentAlignment.TOP    :
    opts.valign === 'bottom' ? SlidesApp.ContentAlignment.BOTTOM :
                               SlidesApp.ContentAlignment.MIDDLE
  );
  return box;
}

/** Obdélník. opts: border (barva), bw (tloušťka) */
function addR(slide, l, top, w, h, fill, opts) {
  opts = opts || {};
  const s = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, l, top, w, h);
  if (fill) s.getFill().setSolidFill(fill);
  else      s.getFill().setTransparent();
  if (opts.border) {
    s.getBorder().getLineFill().setSolidFill(opts.border);
    s.getBorder().setWeight(opts.bw || 1);
  } else {
    s.getBorder().setTransparent();
  }
  return s;
}

/** Kruh (cx/cy = střed, r = poloměr). opts: border, bw */
function addCircle(slide, cx, cy, r, fill, opts) {
  opts = opts || {};
  const s = slide.insertShape(SlidesApp.ShapeType.ELLIPSE,
                              cx - r, cy - r, r * 2, r * 2);
  if (fill) s.getFill().setSolidFill(fill);
  else      s.getFill().setTransparent();
  if (opts.border) {
    s.getBorder().getLineFill().setSolidFill(opts.border);
    s.getBorder().setWeight(opts.bw || 1.5);
  } else {
    s.getBorder().setTransparent();
  }
  return s;
}

/** Standardní záhlaví světlého slajdu */
function addHeader(slide, title) {
  addR(slide, 0, 0, W, 52, C.primaryDark);
  addR(slide, 0, 0, 4, 52, C.accent);
  addT(slide, title, 20, 0, W - 72, 52,
       { font: F.display, size: 19, color: C.white, valign: 'middle' });
  addT(slide, 'TŽ', W - 60, 0, 52, 52,
       { font: F.body, size: 11, color: C.accent,
         bold: true, align: 'center', valign: 'middle' });
}

/** Spodní accent čára + volitelný popisek */
function addFooter(slide, label) {
  addR(slide, 0, H - 3, W, 3, C.primary);
  if (label) {
    addT(slide, label, PAD, H - 22, W / 2, 18, { size: 8, color: C.textMuted });
  }
}

/** Speaker notes */
function addNotes(slide, text) {
  slide.getNotesPage().getSpeakerNotesShape().getText().setText(text);
}


// ── SLIDE 01 – TITULNÍ ────────────────────────────────────────────
function s01_title(s) {
  s.getBackground().setSolidFill(C.veryDark);

  // Dekorativní kruhy (částečně mimo slajd = jemný glow v rozích)
  addCircle(s, -50, -30, 200, C.primary);
  addCircle(s, W + 40, H + 30, 180, C.primaryDark);

  addT(s, 'P Ř E D N Á Š K A', 0, 36, W, 20,
       { size: 8.5, color: C.accent, bold: true, align: 'center' });

  addT(s, 'Název přednášky', 60, 80, W - 120, 110,
       { font: F.display, size: 44, color: C.white,
         align: 'center', valign: 'middle' });

  addT(s, 'Podnadpis nebo krátký popis tématu', 80, 200, W - 160, 36,
       { size: 14, color: C.accent, align: 'center', valign: 'middle' });

  // Dělicí čára
  addR(s, 80, 248, W - 160, 1, C.primaryLight);

  addT(s, 'Tomáš Zahradník', PAD, 258, 260, 28,
       { size: 10, color: C.white, bold: true, valign: 'middle' });
  addT(s, 'Datum  ·  Místo', W - PAD - 200, 258, 200, 28,
       { size: 10, color: C.textMuted, align: 'right', valign: 'middle' });

  addR(s, 0, H - 4, W, 4, C.primary);
  addNotes(s, 'TITULNÍ SLAJD\n— upravte název a podnadpis\n— doplňte datum a místo konání');
}


// ── SLIDE 02 – AGENDA ─────────────────────────────────────────────
function s02_agenda(s) {
  s.getBackground().setSolidFill(C.surface);
  addHeader(s, 'Obsah přednášky');

  const items = [
    'Téma 1 – klíčové sdělení',
    'Téma 2 – klíčové sdělení',
    'Téma 3 – klíčové sdělení',
    'Téma 4 – klíčové sdělení',
    'Téma 5 – klíčové sdělení',
  ];

  const startY = 66;
  const itemH  = 54;

  items.forEach((item, i) => {
    const y = startY + i * itemH;
    addCircle(s, PAD + 14, y + 24, 14, C.primary);
    addT(s, String(i + 1), PAD, y + 10, 28, 28,
         { size: 11, color: C.white, bold: true,
           align: 'center', valign: 'middle' });
    addT(s, item, PAD + 34, y + 6, W - PAD * 2 - 40, 40,
         { size: 13, color: C.textPrimary, valign: 'middle' });
    if (i < items.length - 1) {
      addR(s, PAD + 34, y + itemH - 1, W - PAD * 2 - 40, 1, C.border);
    }
  });

  addFooter(s, 'tomaszahradnik.com');
  addNotes(s, 'AGENDA\n— upravte témata\n— doporučeně 4–6 položek');
}


// ── SLIDE 03 – TEXT / ODRÁŽKY ─────────────────────────────────────
function s03_text(s) {
  s.getBackground().setSolidFill(C.surface);
  addHeader(s, 'Název sekce');

  const bullets = [
    ['Klíčová myšlenka nebo tvrzení', 'Doplňující poznámka, kontext nebo příklad…'],
    ['Podpůrný argument nebo data',   'Zdroj, citace nebo číslo k podpoře tvrzení…'],
    ['Závěr nebo výzva k akci',       'Co si má posluchač odnést nebo udělat dál…'],
  ];

  const startY = 68;
  const itemH  = 88;

  bullets.forEach(([main, sub], i) => {
    const y = startY + i * itemH;
    addCircle(s, PAD + 7, y + 14, 6, C.primary);
    addT(s, main, PAD + 22, y, W - PAD * 2 - 28, 30,
         { size: 14, color: C.textPrimary, bold: true, valign: 'middle' });
    addT(s, sub, PAD + 22, y + 30, W - PAD * 2 - 28, 28,
         { size: 11, color: C.textMuted, italic: true, valign: 'top' });
    if (i < bullets.length - 1) {
      addR(s, PAD, y + itemH - 4, W - PAD * 2, 1, C.border);
    }
  });

  addFooter(s, 'tomaszahradnik.com');
  addNotes(s, 'TEXTOVÝ SLAJD\n— max. 3–4 odrážky\n— detaily patří do speaker notes, ne na slajd');
}


// ── SLIDE 04 – KPI / ČÍSLA ────────────────────────────────────────
function s04_kpi(s) {
  s.getBackground().setSolidFill(C.surface);
  addHeader(s, 'Výsledky a čísla');

  const kpis = [
    { value: '3×',  label: 'růst obratu',         sub: 'meziročně' },
    { value: '87 %', label: 'spokojenost klientů', sub: 'průměr 2023–2024' },
    { value: '12',  label: 'aktivních projektů',   sub: 'souběžně' },
  ];

  const boxW = (W - PAD * 2 - 24) / 3;
  const boxH = 236;
  const sx   = PAD;
  const sy   = 66;

  kpis.forEach((kpi, i) => {
    const x = sx + i * (boxW + 12);
    addR(s, x, sy, boxW, boxH, C.white, { border: C.border, bw: 1.5 });
    addR(s, x, sy, boxW, 4, C.primary);
    addT(s, kpi.value, x, sy + 20, boxW, 90,
         { font: F.display, size: 48, color: C.primary,
           bold: true, align: 'center', valign: 'middle' });
    addT(s, kpi.label, x, sy + 112, boxW, 36,
         { size: 13, color: C.textPrimary,
           bold: true, align: 'center', valign: 'middle' });
    addT(s, kpi.sub, x, sy + 150, boxW, 26,
         { size: 9.5, color: C.textMuted, align: 'center', valign: 'top' });
  });

  addFooter(s, 'tomaszahradnik.com');
  addNotes(s, 'KPI SLAJD\n— upravte hodnoty a popisky\n— ideálně 2–4 metriky');
}


// ── SLIDE 05 – OBRÁZEK ────────────────────────────────────────────
function s05_image(s) {
  s.getBackground().setSolidFill(C.surface);
  addHeader(s, 'Název sekce');

  const imgW = W - PAD * 2;
  const imgH = 228;
  const imgY = 64;

  addR(s, PAD, imgY, imgW, imgH, C.surfaceAlt, { border: C.border, bw: 1.5 });
  addT(s, '[ Vložte obrázek: Insert → Image ]',
       PAD, imgY, imgW, imgH,
       { size: 13, color: C.textMuted, align: 'center', valign: 'middle' });

  addR(s, PAD, imgY + imgH + 10, imgW, 1, C.border);
  addT(s, 'Popisek – zdroj nebo komentář k obrázku',
       PAD, imgY + imgH + 14, imgW, 24,
       { size: 10, color: C.textMuted, align: 'center' });

  addFooter(s, 'tomaszahradnik.com');
  addNotes(s, 'SLAJD S OBRÁZKEM\n— vložte obrázek přes Insert → Image\n— smažte placeholder obdélník\n— upravte popisek');
}


// ── SLIDE 06 – ŠKÁLA ──────────────────────────────────────────────
function s06_scale(s) {
  s.getBackground().setSolidFill(C.surface);
  addHeader(s, 'Interaktivní škála');

  addT(s, 'Jak byste ohodnotili…? [upravte otázku]', 0, 64, W, 36,
       { font: F.display, size: 17, color: C.textPrimary,
         align: 'center', valign: 'middle' });

  const n      = 10;
  const rc     = 22;
  const gap    = 8;
  const totalW = n * (rc * 2) + (n - 1) * gap;
  const startX = (W - totalW) / 2;
  const scaleY = 164;

  for (let i = 1; i <= n; i++) {
    const cx     = startX + (i - 1) * (rc * 2 + gap) + rc;
    const filled = i >= 8;
    addCircle(s, cx, scaleY, rc,
              filled ? C.primary : C.white,
              filled ? {} : { border: C.border, bw: 1.5 });
    addT(s, String(i), cx - rc, scaleY - rc, rc * 2, rc * 2,
         { size: 12, color: filled ? C.white : C.textSecond,
           bold: true, align: 'center', valign: 'middle' });
  }

  addT(s, 'Vůbec ne', startX - 8, scaleY + rc + 10, 80, 20,
       { size: 9, color: C.textMuted });
  addT(s, 'Rozhodně ano', startX + totalW - 80, scaleY + rc + 10, 88, 20,
       { size: 9, color: C.textMuted, align: 'right' });

  addT(s, 'Zvedněte ruku nebo hlasujte v chatu',
       0, H - 52, W, 28,
       { size: 11, color: C.textMuted, align: 'center', italic: true });

  addFooter(s);
  addNotes(s, 'ŠKÁLOVÝ SLAJD\n— upravte otázku\n— 8–10 jsou předvyplněny fialovou (příklad)\n— lze použít jako hlasovací nebo warm-up slajd');
}


// ── SLIDE 07 – PYRAMIDA / TROJÚHELNÍK ─────────────────────────────
function s07_triangle(s) {
  s.getBackground().setSolidFill(C.veryDark);

  addT(s, 'Prioritní pyramida', 0, 14, W, 42,
       { font: F.display, size: 22, color: C.white,
         align: 'center', valign: 'middle' });

  // Tři vrstvy – každá vrstva je širší (jde shora dolů)
  const layers = [
    { label: 'VIZE',    sub: 'strategie a směr',   color: C.primaryLight, w: 200 },
    { label: 'TAKTIKA', sub: 'kampaně a obsah',     color: C.primary,      w: 360 },
    { label: 'ZÁKLAD',  sub: 'procesy a nástroje',  color: C.primaryDark,  w: 500 },
  ];

  const layerH = 72;
  const gap    = 4;
  const baseY  = H - 28 - layers.length * (layerH + gap) + gap;

  layers.forEach((layer, i) => {
    const y = baseY + i * (layerH + gap);
    const x = (W - layer.w) / 2;
    addR(s, x, y, layer.w, layerH, layer.color);
    addT(s, layer.label, x, y, layer.w, layerH / 2,
         { size: 13, color: C.white, bold: true,
           align: 'center', valign: 'bottom' });
    addT(s, layer.sub, x, y + layerH / 2, layer.w, layerH / 2,
         { size: 10, color: C.accent, align: 'center', valign: 'top' });
  });

  addR(s, 0, H - 3, W, 3, C.accent);
  addNotes(s, 'PYRAMIDA\n— upravte labely a sub-popisky dle tématu\n— pořadí vrstev: nahoře = nejmenší/nejvyšší priorita\n— lze přidat 4. vrstvu stejným vzorem');
}


// ── SLIDE 08 – ZDROJE / ODKAZY ────────────────────────────────────
function s08_sources(s) {
  s.getBackground().setSolidFill(C.surface);
  addHeader(s, 'Zdroje a doporučená literatura');

  const sources = [
    'Autor, Název knihy (rok) – nakladatelství',
    'Autor, „Název článku", Médium (rok) – odkaz',
    'Autor, „Název studie", organizace (rok)',
    'Autor, „Název článku", Médium (rok) – odkaz',
    'tomaszahradnik.com – další zdroje a kontakt',
  ];

  const startY = 68;
  const itemH  = 54;

  sources.forEach((src, i) => {
    const y = startY + i * itemH;
    addT(s, String(i + 1).padStart(2, '0'), PAD, y + 6, 28, 36,
         { size: 10, color: C.accent, bold: true, valign: 'middle' });
    addT(s, src, PAD + 36, y + 6, W - PAD * 2 - 36, 36,
         { size: 12, color: C.textPrimary, valign: 'middle' });
    if (i < sources.length - 1) {
      addR(s, PAD, y + itemH - 1, W - PAD * 2, 1, C.border);
    }
  });

  addFooter(s, 'tomaszahradnik.com');
  addNotes(s, 'ZDROJE\n— doplňte skutečné zdroje\n— jednotný formát citací');
}


// ── SLIDE 09 – O MNĚ ──────────────────────────────────────────────
function s09_about(s) {
  s.getBackground().setSolidFill(C.surface);

  // Levá tmavá polovina
  addR(s, 0, 0, W / 2, H, C.primaryDark);
  addR(s, 0, 0, 4, H, C.accent);

  // Velký monogram
  addT(s, 'TŽ', 0, 20, W / 2, 100,
       { font: F.display, size: 60, color: C.primary,
         bold: true, align: 'center', valign: 'middle' });

  addT(s, 'Tomáš Zahradník', 0, 122, W / 2, 42,
       { font: F.display, size: 20, color: C.white,
         align: 'center', valign: 'middle' });

  addT(s, 'Interim CMO  ·  Mentor', 0, 164, W / 2, 26,
       { size: 11, color: C.accent, align: 'center' });

  addT(s, 'info@tomaszahradnik.com', 0, 198, W / 2, 22,
       { size: 9.5, color: C.textMuted, align: 'center' });

  addT(s, 'tomaszahradnik.com', 0, 218, W / 2, 22,
       { size: 9.5, color: C.textMuted, align: 'center' });

  // Pravá polovina – fakta
  const facts = [
    '15+ let v B2B a e-commerce marketingu',
    'Řídil marketingové týmy 3–12 lidí',
    'Startupy i korporáty – různé kontexty',
    'Mentoruje junior a mid marketéry',
    'Vlastní SaaS a e-commerce projekty',
  ];

  addT(s, 'Co dělám', W / 2 + PAD, 16, W / 2 - PAD * 2, 34,
       { font: F.display, size: 15, color: C.primaryDark, valign: 'middle' });
  addR(s, W / 2 + PAD, 52, 40, 2, C.primary);

  facts.forEach((fact, i) => {
    const y = 64 + i * 62;
    addCircle(s, W / 2 + PAD + 7, y + 16, 5, C.primary);
    addT(s, fact, W / 2 + PAD + 20, y + 2, W / 2 - PAD * 2 - 26, 32,
         { size: 11, color: C.textPrimary, valign: 'middle' });
  });

  addR(s, 0, H - 3, W, 3, C.primary);
  addNotes(s, 'O MNĚ\n— upravte body dle aktuálního kontextu\n— volitelně přidejte fotku přes Insert → Image');
}


// ── SLIDE 10 – QR KÓD / DOBROVOLNÁ PLATBA ────────────────────────
function s10_qr(s) {
  s.getBackground().setSolidFill(C.veryDark);

  addCircle(s, W + 20, -20, 160, C.primaryDark);  // dekorativní glow

  addT(s, 'Pokud vám přednáška přinesla hodnotu…',
       0, 24, W, 36,
       { size: 15, color: C.accent, align: 'center', valign: 'middle' });

  // QR placeholder
  const qrSize = 144;
  const qrX    = W / 2 - qrSize - 30;
  const qrY    = 76;

  addR(s, qrX, qrY, qrSize, qrSize, C.surfaceAlt,
       { border: C.border, bw: 2 });
  addT(s, 'QR kód\n(vložte sem)', qrX, qrY, qrSize, qrSize,
       { size: 11, color: C.textMuted, align: 'center', valign: 'middle' });

  // Info vedle QR
  const infoX = W / 2 + 20;
  addT(s, 'Dobrovolný příspěvek', infoX, qrY + 6, 240, 32,
       { font: F.display, size: 16, color: C.white });
  addT(s, 'Naskenujte QR kód\nnebo použijte odkaz níže:',
       infoX, qrY + 42, 240, 44,
       { size: 11, color: C.textMuted });
  addT(s, '→  [váš platební odkaz]', infoX, qrY + 92, 240, 28,
       { size: 12, color: C.accent });

  addT(s, 'Není povinné. Pokud ne, doporučte přednášku dál. 🙏',
       0, H - 48, W, 32,
       { size: 10, color: C.textMuted, align: 'center', italic: true });

  addR(s, 0, H - 3, W, 3, C.accent);
  addNotes(s, 'QR SLAJD\n— vložte skutečný QR kód přes Insert → Image\n— smažte placeholder obdélník\n— doplňte platební odkaz (Ko-fi, PayPal…)');
}


// ── SLIDE 11 – OTÁZKY ─────────────────────────────────────────────
function s11_questions(s) {
  s.getBackground().setSolidFill(C.veryDark);

  // Soustředné kruhy jako dekorace
  addCircle(s, W / 2, H / 2 - 10, 170, C.primaryDark);
  addCircle(s, W / 2, H / 2 - 10, 120, C.primary);

  // Otazník
  addT(s, '?', 0, H / 2 - 100, W, 100,
       { font: F.display, size: 68, color: C.white,
         bold: true, align: 'center', valign: 'middle' });

  addT(s, 'Máte otázky?', 0, H / 2 + 28, W, 52,
       { font: F.display, size: 28, color: C.white,
         align: 'center', valign: 'middle' });

  addT(s, 'info@tomaszahradnik.com  ·  tomaszahradnik.com',
       0, H - 52, W, 32,
       { size: 11, color: C.accent, align: 'center', valign: 'middle' });

  addR(s, 0, H - 3, W, 3, C.accent);
  addNotes(s, 'OTÁZKY\n— nechte na obrazovce po dobu Q&A\n— doplňte sociální sítě pokud chcete');
}
