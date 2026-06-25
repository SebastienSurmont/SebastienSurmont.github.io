const rows = document.querySelectorAll(".row");
const scrollAmount = 500;

// Store current offset per row
const offsets = Array(rows.length).fill(0);

document.querySelectorAll('.slider-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const rowIndex = parseInt(btn.getAttribute('data-row'));
    const row = rows[rowIndex];
    const isLeft = btn.classList.contains('slider-btn-left');

    offsets[rowIndex] += isLeft ? scrollAmount : -scrollAmount;
    row.style.transform = `translateX(${offsets[rowIndex]}px)`;
  });
});