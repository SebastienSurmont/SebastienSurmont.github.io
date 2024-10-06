const scrollers = document.querySelectorAll(".row-holder");

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  addAnimation();
}

function addAnimation() {
  scrollers.forEach(scroller => {
    scroller.setAttribute("data-animated", true); 

    const scrollerInner = scroller.querySelector('.row');
    const scrollerContent = Array.from(scrollerInner.children);

    // Clone enough items to ensure we have enough for infinite scrolling
    const numberOfDuplicates = Math.ceil(scrollerContent.length * 2); // Adjust as needed for a seamless loop
    for (let i = 0; i < numberOfDuplicates; i++) {
      const duplicatedItem = scrollerContent[i % scrollerContent.length].cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    }

    // Add drag functionality to scroll the entire row
    addDragToScroll(scroller, scrollerInner);
  });
}

function addDragToScroll(rowHolder, row) {
  let isDown = false;
  let startX;
  let scrollLeft;
  let scrollWidth = row.scrollWidth / 2; // Total width of the scrollable content (half because it's duplicated)

  rowHolder.addEventListener('mousedown', (e) => {
    e.preventDefault(); // Prevent default drag behavior
    isDown = true;
    rowHolder.classList.add('active');
    startX = e.pageX - rowHolder.offsetLeft;
    scrollLeft = rowHolder.scrollLeft;
    row.style.animationPlayState = 'paused'; // Pause the animation during dragging
  });

  document.addEventListener('mouseup', () => {
    isDown = false;
    row.style.animationPlayState = 'running'; // Resume animation when the drag ends
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault(); // Prevent default text/image selection behavior
    const x = e.pageX - rowHolder.offsetLeft;
    const walk = (x - startX) * 2; // Scroll faster
    rowHolder.scrollLeft = scrollLeft - walk;

    // Infinite scrolling behavior: If we've scrolled past half the scrollable content, reset to the start
    if (rowHolder.scrollLeft >= scrollWidth) {
      rowHolder.scrollLeft = rowHolder.scrollLeft - scrollWidth;
    } else if (rowHolder.scrollLeft <= 0) {
      rowHolder.scrollLeft = scrollWidth + rowHolder.scrollLeft;
    }
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
