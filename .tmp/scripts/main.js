'use strict';

$(document).ready(function () {

  var s = skrollr.init({
    forceHeight: false
  });

  $('.lots').slick({
    autoplay: true,
    arrows: false,
    dots: true,
    fade: true,
    autoplaySpeed: 4000
  });

  $('.lots').on('init', function () {
    var $this = $(this);
    $('.slick-dots li a').on('click', function () {
      $this.slick('slickPause');
    });
  });
});
//# sourceMappingURL=main.js.map
