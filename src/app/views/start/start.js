(function() {
  var countDown, countDownNumber, countDownTimer, numbers;

  $.fn.animationCss = function(animationName, fn) {
    var animationEnd;
    animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    return this.addClass("animated " + animationName).one(animationEnd, function() {
      $(this).removeClass("animated " + animationName);
      fn && fn.call($(this));
    });
  };

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
    if (countDownNumber < 0) {
      clearInterval(countDownTimer);
      $('.start-view').hide();
      mStart();
      return;
    }
    return numbers.eq(countDownNumber).show();
  };

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3Mvc3RhcnQvc3RhcnQuanMiLCJzb3VyY2VzIjpbInZpZXdzL3N0YXJ0L3N0YXJ0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O0VBQUEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxZQUFMLEdBQWtCLFNBQUMsYUFBRCxFQUFlLEVBQWY7QUFDaEIsUUFBQTtJQUFBLFlBQUEsR0FBZTtXQUNmLElBQUksQ0FBQyxRQUFMLENBQWMsV0FBQSxHQUFZLGFBQTFCLENBQ0MsQ0FBQyxHQURGLENBQ00sWUFETixFQUNtQixTQUFBO01BQ2pCLENBQUEsQ0FBRSxJQUFGLENBQU8sQ0FBQyxXQUFSLENBQW9CLFdBQUEsR0FBWSxhQUFoQztNQUNBLEVBQUEsSUFBSSxFQUFFLENBQUMsSUFBSCxDQUFRLENBQUEsQ0FBRSxJQUFGLENBQVI7SUFGYSxDQURuQjtFQUZnQjs7RUFRbEIsQ0FBQSxDQUFFLHdCQUFGLENBQ0MsQ0FBQyxZQURGLENBQ2UsWUFEZjs7RUFHQSxjQUFBLEdBQWlCOztFQUNqQixDQUFBLENBQUUsd0JBQUYsQ0FDQyxDQUFDLEtBREYsQ0FDUSxTQUFBO0lBQ04sQ0FBQSxDQUFFLHdCQUFGLENBQ0MsQ0FBQyxZQURGLENBQ2UsYUFEZixFQUM2QixTQUFBO01BQzNCLENBQUEsQ0FBRSxJQUFGLENBQU8sQ0FBQyxJQUFSLENBQUE7TUFDQSxTQUFBLENBQUE7YUFDQSxjQUFBLEdBQWlCLFdBQUEsQ0FBWSxTQUFaLEVBQXNCLElBQXRCO0lBSFUsQ0FEN0I7RUFETSxDQURSOztFQVNBLGVBQUEsR0FBa0I7O0VBQ2xCLE9BQUEsR0FBVSxDQUFBLENBQUUsaUNBQUY7O0VBQ1YsU0FBQSxHQUFZLFNBQUE7SUFDWCxPQUFPLENBQUMsSUFBUixDQUFBO0lBQ0EsZUFBQTtJQUNBLElBQUcsZUFBQSxHQUFnQixDQUFuQjtNQUNDLGFBQUEsQ0FBYyxjQUFkO01BQ0EsQ0FBQSxDQUFFLGFBQUYsQ0FDQyxDQUFDLElBREYsQ0FBQTtNQUVBLE1BQUEsQ0FBQTtBQUNBLGFBTEQ7O1dBTUEsT0FDQyxDQUFDLEVBREYsQ0FDSyxlQURMLENBRUMsQ0FBQyxJQUZGLENBQUE7RUFUVztBQXZCWiIsInNvdXJjZXNDb250ZW50IjpbIiQuZm4uYW5pbWF0aW9uQ3NzPShhbmltYXRpb25OYW1lLGZuKS0+XHJcblx0XHRhbmltYXRpb25FbmQgPSAnd2Via2l0QW5pbWF0aW9uRW5kIG1vekFuaW1hdGlvbkVuZCBNU0FuaW1hdGlvbkVuZCBvYW5pbWF0aW9uZW5kIGFuaW1hdGlvbmVuZCdcclxuXHRcdHRoaXMuYWRkQ2xhc3MgXCJhbmltYXRlZCAje2FuaW1hdGlvbk5hbWV9XCJcclxuXHRcdFx0Lm9uZSBhbmltYXRpb25FbmQsKCktPlxyXG5cdFx0XHRcdCQodGhpcykucmVtb3ZlQ2xhc3MgXCJhbmltYXRlZCAje2FuaW1hdGlvbk5hbWV9XCJcclxuXHRcdFx0XHRmbiYmZm4uY2FsbCAkIHRoaXNcclxuXHRcdFx0XHRyZXR1cm5cclxuIyBiZWdpbm5pbmdcclxuJCAnLnN0YXJ0LXZpZXcgLmJlZ2lubmluZydcclxuXHQuYW5pbWF0aW9uQ3NzICdib3VuY2VJblVwJ1xyXG5cclxuY291bnREb3duVGltZXIgPSBudWxsXHJcbiQgJy5zdGFydC12aWV3IC5idG4tc3RhcnQnI2NsaWNrIHN0YXJ0IGJ1dHRvblxyXG5cdC5jbGljayAoKS0+XHJcblx0XHQkICcuc3RhcnQtdmlldyAuYmVnaW5uaW5nJ1xyXG5cdFx0XHQuYW5pbWF0aW9uQ3NzICdib3VuY2VPdXRVcCcsKCktPlxyXG5cdFx0XHRcdCQodGhpcykuaGlkZSgpXHJcblx0XHRcdFx0Y291bnREb3duKCkjc3RhcnQgY291bnQtZG93blxyXG5cdFx0XHRcdGNvdW50RG93blRpbWVyID0gc2V0SW50ZXJ2YWwgY291bnREb3duLDEwMDBcclxuXHRcdHJldHVyblxyXG4jY291bnQtZG93blxyXG5jb3VudERvd25OdW1iZXIgPSAzXHJcbm51bWJlcnMgPSAkICcuc3RhcnQtdmlldyAuY291bnQtZG93biAubnVtYmVyJ1xyXG5jb3VudERvd24gPSAoKS0+XHJcblx0bnVtYmVycy5oaWRlKClcclxuXHRjb3VudERvd25OdW1iZXItLTtcclxuXHRpZiBjb3VudERvd25OdW1iZXI8MFxyXG5cdFx0Y2xlYXJJbnRlcnZhbCBjb3VudERvd25UaW1lclxyXG5cdFx0JCAnLnN0YXJ0LXZpZXcnXHJcblx0XHRcdC5oaWRlKClcclxuXHRcdG1TdGFydCgpXHJcblx0XHRyZXR1cm5cclxuXHRudW1iZXJzXHJcblx0XHQuZXEgY291bnREb3duTnVtYmVyXHJcblx0XHQuc2hvdygpXHJcbiJdfQ==
