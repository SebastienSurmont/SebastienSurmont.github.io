const scrollers = document.querySelectorAll(".row-holder");

if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches){
  addAnimation();
}

function addAnimation(){
  scrollers.forEach(scroller =>{
    scroller.setAttribute("data-animated", true); 

    const scrollerInner = scroller.querySelector('.row');
    const scrollerContent = Array.from(scrollerInner.children);

    scrollerContent.forEach(item => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    })
  });
}
document.getElementById("emailLink").addEventListener("click", function() {
  var subject = "Subject of the email";
  var body = "Body of the email";

  // Create mailto link
  var mailtoLink = "mailto:surmont.sebastien@gmail.com" +
                   "?subject=" + encodeURIComponent(subject) +
                   "&body=" + encodeURIComponent(body);

  // Open default email client
  window.location.href = mailtoLink;
});





