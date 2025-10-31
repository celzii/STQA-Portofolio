// script.js - ringan: menambahkan perilaku sederhana (contoh: smooth scroll jika internal link)
document.addEventListener('DOMContentLoaded', function() {
  // Smooth scroll for same-site anchors (if used)
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e){
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({behavior: 'smooth'});
    });
  });

  // Add a small dynamic chip to pertemuan headers (e.g., "Pertemuan-01" and progress "1 / N")
  try {
    const title = document.querySelector('.site-title');
    if (title && /Pertemuan/i.test(title.textContent)) {
      const match = title.textContent.match(/Pertemuan[- ]?0?(\d{1,2})/i);
      if (match) {
        const num = parseInt(match[1], 10);
        const total = Math.max(document.querySelectorAll('.nav-card').length, 8);
        const chip = document.createElement('span');
        chip.className = 'title-chip';
        chip.innerHTML = `<span class="chip-main">Pertemuan ${String(num).padStart(2,'0')}</span><small class="chip-sub">${num} / ${total}</small>`;
        // insert before the title for a tidy layout
        title.parentNode.insertBefore(chip, title);
        // Keep the chip but shorten the H1 to only the topic on any pertemuan page
        // replace prefix like "Pertemuan-01 — " so the heading shows only the topic (e.g. "Strategi Testing")
        title.textContent = title.textContent.replace(/Pertemuan[- ]?0?\d+\s*[-—–]\s*/i, '').trim();
      }
    }
  } catch (e) {
    // non-fatal
    console.warn('header chip init failed', e);
  }
});