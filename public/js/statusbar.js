$(function() {
  $(".meter > span").each(function() {
    $(this)
      .data("origWidth", $(this).width())
      .width(0)
      .animate({
        width: $(this).data("origWidth")
      }, 1200);
  });
});

(function() {
  'use strict';

  window.updatePct = function updatePct($status, newValue, millisec) {
    /* millisec is the number of ms to change from 100% to 0% */
    $status.stop();
    var pctStr = parseStyle($status.attr('style')).width;
    var oldPct = +pctStr.replace(' ','').replace('%','') / 100;
    if (!millisec) {
      $status.css({width: formatPct(newValue)});
    } else {
      var dt = Math.abs(newValue - oldPct) * millisec;
      $status.animate({width: formatPct(newValue)}, dt);
    }
  };

})();
