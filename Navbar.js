$(function(){
  $("#navbar-placeholder").load("NavBar.html", function() {
      // Get the current page URL
      var currentPageUrl = window.location.href;

      // Remove active class from all navbar links
      $("#navbar-placeholder nav ul li").removeClass("active");

      // Loop through each navbar link to find the one corresponding to the current page
      $("#navbar-placeholder nav ul li").each(function() {
          var linkUrl = $(this).find("a").attr("href");
          if (currentPageUrl.includes(linkUrl)) {
              $(this).addClass("active");
          }
      });
  });
});