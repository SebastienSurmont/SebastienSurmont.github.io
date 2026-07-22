const scrollers = document.querySelectorAll(".row-holder");

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  addAnimation();
}

function addAnimation() {
  scrollers.forEach(scroller => {
    scroller.setAttribute("data-animated", true);

    const scrollerInner = scroller.querySelector('.row');
    const scrollerContent = Array.from(scrollerInner.children);
    const direction = scrollerInner.getAttribute('data-direction');

    // Create a copy of the row's content to enable seamless scrolling
    scrollerContent.forEach(item => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);

      // Enable dragging for individual items to scroll the row
      addDragToScroll(item, scroller, scrollerInner, direction);
    });

    // Add drag to scroll the entire row if dragging outside elements
    addDragToScroll(scroller, scroller, scrollerInner, direction);
  });
}

// Drag-to-scroll functionality (applies to both row-holder and individual items)
function addDragToScroll(draggableElement, rowHolder, row, direction) {
  let isDown = false;
  let startX;
  let startScrollLeft;
  let hasDragged = false;
  const dragThreshold = 5;

  draggableElement.addEventListener('mousedown', (e) => {
    e.preventDefault();
    isDown = true;
    hasDragged = false;
    startX = e.pageX;
    startScrollLeft = rowHolder.scrollLeft;
    row.style.animationPlayState = 'paused';
  });

  document.addEventListener('mouseup', () => {
    isDown = false;
    row.style.animationPlayState = 'running';
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDown) return;

    const dx = e.pageX - startX;

    if (Math.abs(dx) > dragThreshold) {
      e.preventDefault();
      hasDragged = true;
      rowHolder.scrollLeft = startScrollLeft - dx * 2;

      // Seamless loop — content is doubled so halfway = one full copy
      const half = rowHolder.scrollWidth / 2;

      if (rowHolder.scrollLeft <= 0) {
        rowHolder.scrollLeft += half;
        startScrollLeft += half;
      } else if (rowHolder.scrollLeft >= half) {
        rowHolder.scrollLeft -= half;
        startScrollLeft -= half;
      }
    }
  });

  // Prevent click from firing after a drag
  draggableElement.addEventListener('click', (e) => {
    if (hasDragged) e.preventDefault();
  });
}

// Existing code for email and LinkedIn links
document.getElementById("emailLink").addEventListener("click", function() {
  var subject = "Subject of the email";
  var body = "Body of the email";

  var mailtoLink = "mailto:surmont.sebastien@gmail.com" +
                   "?subject=" + encodeURIComponent(subject) +
                   "&body=" + encodeURIComponent(body);

  window.location.href = mailtoLink;
});

document.getElementById("linkedinlink").addEventListener("click", function() {
  window.open('https://www.linkedin.com/in/s%C3%A9bastien-surmont-77b7a0252/', '_blank').focus();
});

// Existing random rotation functionality
document.querySelectorAll('.skill-item').forEach(item => {
  const randomRotation = (Math.random() * 40 - 20) + 'deg';
  item.style.setProperty('--rotate-offset', randomRotation);
  item.querySelector('.skill-icon').style.setProperty('--icon-offset', randomRotation);
});

document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', () => card.style.zIndex = 10);
  card.addEventListener('mouseleave', () => card.style.zIndex = '');
});

document.querySelectorAll('.view-toggle button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.body.dataset.view = btn.dataset.view;
  });
});