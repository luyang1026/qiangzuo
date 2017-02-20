(function() {
  var countDown, countDownNumber, countDownTimer, numbers;

  $.fn.extend({
    animationCss: function(animationName, fn) {
      var animationEnd;
      animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
      return this.addClass("animated " + animationName).one(animationEnd, function() {
        $(this).removeClass("animated " + animationName);
        fn && fn.call($(this));
      });
    }
  });

  $('.start-view .beginning').animationCss('bounceInUp');

  countDownTimer = null;

  $('.start-view .btn-start').click(function() {
    $('.start-view .beginning').animationCss('bounceOutUp', function() {
      $(this).hide();
      countDown();
      return countDownTimer = setInterval(countDown, 1000);
    });
  });

  countDownNumber = 3;

  numbers = $('.start-view .count-down .number');

  countDown = function() {
    numbers.hide();
    countDownNumber--;
    console.log(countDownNumber);
    if (countDownNumber < 0) {
      clearInterval(countDownTimer);
      $('.start-view').hide();
      return;
    }
    return numbers.eq(countDownNumber).show();
  };

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3Mvc3RhcnQvc3RhcnQuanMiLCJzb3VyY2VzIjpbInZpZXdzL3N0YXJ0L3N0YXJ0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O0VBQUEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFMLENBQ0M7SUFBQSxZQUFBLEVBQWEsU0FBQyxhQUFELEVBQWUsRUFBZjtBQUNaLFVBQUE7TUFBQSxZQUFBLEdBQWU7YUFDZixJQUFJLENBQUMsUUFBTCxDQUFjLFdBQUEsR0FBWSxhQUExQixDQUNDLENBQUMsR0FERixDQUNNLFlBRE4sRUFDbUIsU0FBQTtRQUNqQixDQUFBLENBQUUsSUFBRixDQUFPLENBQUMsV0FBUixDQUFvQixXQUFBLEdBQVksYUFBaEM7UUFDQSxFQUFBLElBQUksRUFBRSxDQUFDLElBQUgsQ0FBUSxDQUFBLENBQUUsSUFBRixDQUFSO01BRmEsQ0FEbkI7SUFGWSxDQUFiO0dBREQ7O0VBU0EsQ0FBQSxDQUFFLHdCQUFGLENBQ0MsQ0FBQyxZQURGLENBQ2UsWUFEZjs7RUFHQSxjQUFBLEdBQWlCOztFQUNqQixDQUFBLENBQUUsd0JBQUYsQ0FDQyxDQUFDLEtBREYsQ0FDUSxTQUFBO0lBQ04sQ0FBQSxDQUFFLHdCQUFGLENBQ0MsQ0FBQyxZQURGLENBQ2UsYUFEZixFQUM2QixTQUFBO01BQzNCLENBQUEsQ0FBRSxJQUFGLENBQU8sQ0FBQyxJQUFSLENBQUE7TUFDQSxTQUFBLENBQUE7YUFDQSxjQUFBLEdBQWlCLFdBQUEsQ0FBWSxTQUFaLEVBQXNCLElBQXRCO0lBSFUsQ0FEN0I7RUFETSxDQURSOztFQVNBLGVBQUEsR0FBa0I7O0VBQ2xCLE9BQUEsR0FBVSxDQUFBLENBQUUsaUNBQUY7O0VBQ1YsU0FBQSxHQUFZLFNBQUE7SUFDWCxPQUFPLENBQUMsSUFBUixDQUFBO0lBQ0EsZUFBQTtJQUNBLE9BQU8sQ0FBQyxHQUFSLENBQWEsZUFBYjtJQUNBLElBQUcsZUFBQSxHQUFnQixDQUFuQjtNQUNDLGFBQUEsQ0FBYyxjQUFkO01BQ0EsQ0FBQSxDQUFFLGFBQUYsQ0FDQyxDQUFDLElBREYsQ0FBQTtBQUVBLGFBSkQ7O1dBS0EsT0FDQyxDQUFDLEVBREYsQ0FDSyxlQURMLENBRUMsQ0FBQyxJQUZGLENBQUE7RUFUVztBQXhCWiIsInNvdXJjZXNDb250ZW50IjpbIiQuZm4uZXh0ZW5kIFxyXG5cdGFuaW1hdGlvbkNzczooYW5pbWF0aW9uTmFtZSxmbiktPlxyXG5cdFx0YW5pbWF0aW9uRW5kID0gJ3dlYmtpdEFuaW1hdGlvbkVuZCBtb3pBbmltYXRpb25FbmQgTVNBbmltYXRpb25FbmQgb2FuaW1hdGlvbmVuZCBhbmltYXRpb25lbmQnXHJcblx0XHR0aGlzLmFkZENsYXNzIFwiYW5pbWF0ZWQgI3thbmltYXRpb25OYW1lfVwiXHJcblx0XHRcdC5vbmUgYW5pbWF0aW9uRW5kLCgpLT5cclxuXHRcdFx0XHQkKHRoaXMpLnJlbW92ZUNsYXNzIFwiYW5pbWF0ZWQgI3thbmltYXRpb25OYW1lfVwiXHJcblx0XHRcdFx0Zm4mJmZuLmNhbGwgJCB0aGlzXHJcblx0XHRcdFx0cmV0dXJuXHJcbiMgYmVnaW5uaW5nXHJcbiQgJy5zdGFydC12aWV3IC5iZWdpbm5pbmcnXHJcblx0LmFuaW1hdGlvbkNzcyAnYm91bmNlSW5VcCdcclxuXHJcbmNvdW50RG93blRpbWVyID0gbnVsbFxyXG4kICcuc3RhcnQtdmlldyAuYnRuLXN0YXJ0JyNjbGljayBzdGFydCBidXR0b25cclxuXHQuY2xpY2sgKCktPlxyXG5cdFx0JCAnLnN0YXJ0LXZpZXcgLmJlZ2lubmluZydcclxuXHRcdFx0LmFuaW1hdGlvbkNzcyAnYm91bmNlT3V0VXAnLCgpLT5cclxuXHRcdFx0XHQkKHRoaXMpLmhpZGUoKVxyXG5cdFx0XHRcdGNvdW50RG93bigpI3N0YXJ0IGNvdW50LWRvd25cclxuXHRcdFx0XHRjb3VudERvd25UaW1lciA9IHNldEludGVydmFsIGNvdW50RG93biwxMDAwXHJcblx0XHRyZXR1cm5cclxuI2NvdW50LWRvd25cclxuY291bnREb3duTnVtYmVyID0gM1xyXG5udW1iZXJzID0gJCAnLnN0YXJ0LXZpZXcgLmNvdW50LWRvd24gLm51bWJlcidcclxuY291bnREb3duID0gKCktPlxyXG5cdG51bWJlcnMuaGlkZSgpXHJcblx0Y291bnREb3duTnVtYmVyLS07XHJcblx0Y29uc29sZS5sb2cgIGNvdW50RG93bk51bWJlclxyXG5cdGlmIGNvdW50RG93bk51bWJlcjwwXHJcblx0XHRjbGVhckludGVydmFsIGNvdW50RG93blRpbWVyXHJcblx0XHQkICcuc3RhcnQtdmlldydcclxuXHRcdFx0LmhpZGUoKVxyXG5cdFx0cmV0dXJuXHJcblx0bnVtYmVyc1xyXG5cdFx0LmVxIGNvdW50RG93bk51bWJlclxyXG5cdFx0LnNob3coKVxyXG4iXX0=
