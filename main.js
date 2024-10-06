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
  let scrollLeft;
  const dragThreshold = 5; // Minimum distance to distinguish drag from click

  draggableElement.addEventListener('mousedown', (e) => {
    e.preventDefault(); // Prevent default drag behavior
    isDown = true;
    rowHolder.classList.add('active');
    startX = e.pageX - rowHolder.offsetLeft;
    scrollLeft = rowHolder.scrollLeft;
    row.style.animationPlayState = 'paused'; // Pause the animation during dragging

    // Prevent any background color change
    rowHolder.style.backgroundColor = 'transparent'; // Set to transparent or your desired color
  });

  document.addEventListener('mouseup', () => {
    isDown = false;
    row.style.animationPlayState = 'running'; // Resume animation when the drag ends
    rowHolder.style.backgroundColor = ''; // Reset to original color
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDown) return;

    // Calculate movement
    const x = e.pageX - rowHolder.offsetLeft;
    const walk = (x - startX) * 2; // Scroll faster

    // Check if movement exceeds threshold
    if (Math.abs(x - startX) > dragThreshold) {
      e.preventDefault(); // Prevent default text/image selection behavior
      rowHolder.scrollLeft = scrollLeft - walk;

      // Check scroll direction
      if (direction === "left") {
        if (rowHolder.scrollLeft >= rowHolder.scrollWidth - rowHolder.clientWidth) {
          // Reset scroll position to the start smoothly
          rowHolder.scrollLeft = 0; 
          // Continue dragging
          scrollLeft = rowHolder.scrollLeft; // Update scrollLeft to prevent jitter
        } else if (rowHolder.scrollLeft <= 0) {
          // Reset scroll position to the end smoothly
          rowHolder.scrollLeft = rowHolder.scrollWidth / 2; 
          // Continue dragging
          scrollLeft = rowHolder.scrollLeft; // Update scrollLeft to prevent jitter
        }
      } else if (direction === "right") {
        if (rowHolder.scrollLeft <= 0) {
          // Reset scroll position to the end smoothly
          rowHolder.scrollLeft = rowHolder.scrollWidth / 2; 
          // Continue dragging
          scrollLeft = rowHolder.scrollLeft; // Update scrollLeft to prevent jitter
        } else if (rowHolder.scrollLeft >= rowHolder.scrollWidth - rowHolder.clientWidth) {
          // Reset scroll position to the start smoothly
          rowHolder.scrollLeft = 0; 
          // Continue dragging
          scrollLeft = rowHolder.scrollLeft; // Update scrollLeft to prevent jitter
        }
      }
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
