(function() {
  var countDown, countDownNumber, countDownTimer, numbers;

  jq.fn.animationCss = function(animationName, fn) {
    var animationEnd;
    animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    return this.addClass("animated " + animationName).one(animationEnd, function() {
      jq(this).removeClass("animated " + animationName);
      fn && fn.call(jq(this));
    });
  };

  jq('.start-view .beginning').animationCss('bounceInUp');

  countDownTimer = null;

  jq('.start-view .btn-start').click(function() {
    jq('.start-view .beginning').animationCss('bounceOutUp', function() {
      jq(this).hide();
      countDown();
      return countDownTimer = setInterval(countDown, 1000);
    });
  });

  countDownNumber = 3;

  numbers = jq('.start-view .count-down .number');

  countDown = function() {
    numbers.hide();
    countDownNumber--;
    if (countDownNumber < 0) {
      clearInterval(countDownTimer);
      jq('.start-view').hide();
      mStart();
      return;
    }
    return numbers.eq(countDownNumber).show();
  };

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3Mvc3RhcnQvc3RhcnQuanMiLCJzb3VyY2VzIjpbInZpZXdzL3N0YXJ0L3N0YXJ0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O0VBQUEsRUFBRSxDQUFDLEVBQUUsQ0FBQyxZQUFOLEdBQW1CLFNBQUMsYUFBRCxFQUFlLEVBQWY7QUFDakIsUUFBQTtJQUFBLFlBQUEsR0FBZTtXQUNmLElBQUksQ0FBQyxRQUFMLENBQWMsV0FBQSxHQUFZLGFBQTFCLENBQ0MsQ0FBQyxHQURGLENBQ00sWUFETixFQUNtQixTQUFBO01BQ2pCLEVBQUEsQ0FBRyxJQUFILENBQVEsQ0FBQyxXQUFULENBQXFCLFdBQUEsR0FBWSxhQUFqQztNQUNBLEVBQUEsSUFBSSxFQUFFLENBQUMsSUFBSCxDQUFRLEVBQUEsQ0FBRyxJQUFILENBQVI7SUFGYSxDQURuQjtFQUZpQjs7RUFRbkIsRUFBQSxDQUFHLHdCQUFILENBQ0MsQ0FBQyxZQURGLENBQ2UsWUFEZjs7RUFHQSxjQUFBLEdBQWlCOztFQUNqQixFQUFBLENBQUcsd0JBQUgsQ0FDQyxDQUFDLEtBREYsQ0FDUSxTQUFBO0lBQ04sRUFBQSxDQUFHLHdCQUFILENBQ0MsQ0FBQyxZQURGLENBQ2UsYUFEZixFQUM2QixTQUFBO01BQzNCLEVBQUEsQ0FBRyxJQUFILENBQVEsQ0FBQyxJQUFULENBQUE7TUFDQSxTQUFBLENBQUE7YUFDQSxjQUFBLEdBQWlCLFdBQUEsQ0FBWSxTQUFaLEVBQXNCLElBQXRCO0lBSFUsQ0FEN0I7RUFETSxDQURSOztFQVNBLGVBQUEsR0FBa0I7O0VBQ2xCLE9BQUEsR0FBVSxFQUFBLENBQUcsaUNBQUg7O0VBQ1YsU0FBQSxHQUFZLFNBQUE7SUFDWCxPQUFPLENBQUMsSUFBUixDQUFBO0lBQ0EsZUFBQTtJQUNBLElBQUcsZUFBQSxHQUFnQixDQUFuQjtNQUNDLGFBQUEsQ0FBYyxjQUFkO01BQ0EsRUFBQSxDQUFHLGFBQUgsQ0FDQyxDQUFDLElBREYsQ0FBQTtNQUVBLE1BQUEsQ0FBQTtBQUNBLGFBTEQ7O1dBTUEsT0FDQyxDQUFDLEVBREYsQ0FDSyxlQURMLENBRUMsQ0FBQyxJQUZGLENBQUE7RUFUVztBQXZCWiIsInNvdXJjZXNDb250ZW50IjpbImpxLmZuLmFuaW1hdGlvbkNzcz0oYW5pbWF0aW9uTmFtZSxmbiktPlxyXG5cdFx0YW5pbWF0aW9uRW5kID0gJ3dlYmtpdEFuaW1hdGlvbkVuZCBtb3pBbmltYXRpb25FbmQgTVNBbmltYXRpb25FbmQgb2FuaW1hdGlvbmVuZCBhbmltYXRpb25lbmQnXHJcblx0XHR0aGlzLmFkZENsYXNzIFwiYW5pbWF0ZWQgI3thbmltYXRpb25OYW1lfVwiXHJcblx0XHRcdC5vbmUgYW5pbWF0aW9uRW5kLCgpLT5cclxuXHRcdFx0XHRqcSh0aGlzKS5yZW1vdmVDbGFzcyBcImFuaW1hdGVkICN7YW5pbWF0aW9uTmFtZX1cIlxyXG5cdFx0XHRcdGZuJiZmbi5jYWxsIGpxIHRoaXNcclxuXHRcdFx0XHRyZXR1cm5cclxuIyBiZWdpbm5pbmdcclxuanEgJy5zdGFydC12aWV3IC5iZWdpbm5pbmcnXHJcblx0LmFuaW1hdGlvbkNzcyAnYm91bmNlSW5VcCdcclxuXHJcbmNvdW50RG93blRpbWVyID0gbnVsbFxyXG5qcSAnLnN0YXJ0LXZpZXcgLmJ0bi1zdGFydCcjY2xpY2sgc3RhcnQgYnV0dG9uXHJcblx0LmNsaWNrICgpLT5cclxuXHRcdGpxICcuc3RhcnQtdmlldyAuYmVnaW5uaW5nJ1xyXG5cdFx0XHQuYW5pbWF0aW9uQ3NzICdib3VuY2VPdXRVcCcsKCktPlxyXG5cdFx0XHRcdGpxKHRoaXMpLmhpZGUoKVxyXG5cdFx0XHRcdGNvdW50RG93bigpI3N0YXJ0IGNvdW50LWRvd25cclxuXHRcdFx0XHRjb3VudERvd25UaW1lciA9IHNldEludGVydmFsIGNvdW50RG93biwxMDAwXHJcblx0XHRyZXR1cm5cclxuI2NvdW50LWRvd25cclxuY291bnREb3duTnVtYmVyID0gM1xyXG5udW1iZXJzID0ganEgJy5zdGFydC12aWV3IC5jb3VudC1kb3duIC5udW1iZXInXHJcbmNvdW50RG93biA9ICgpLT5cclxuXHRudW1iZXJzLmhpZGUoKVxyXG5cdGNvdW50RG93bk51bWJlci0tO1xyXG5cdGlmIGNvdW50RG93bk51bWJlcjwwXHJcblx0XHRjbGVhckludGVydmFsIGNvdW50RG93blRpbWVyXHJcblx0XHRqcSAnLnN0YXJ0LXZpZXcnXHJcblx0XHRcdC5oaWRlKClcclxuXHRcdG1TdGFydCgpXHJcblx0XHRyZXR1cm5cclxuXHRudW1iZXJzXHJcblx0XHQuZXEgY291bnREb3duTnVtYmVyXHJcblx0XHQuc2hvdygpXHJcbiJdfQ==
