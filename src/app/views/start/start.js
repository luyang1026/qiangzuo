(function() {
  var countDown, countDownNumber, countDownTimer, numbers;

  $.noConflict();

  window.jq = jQuery;

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3Mvc3RhcnQvc3RhcnQuanMiLCJzb3VyY2VzIjpbInZpZXdzL3N0YXJ0L3N0YXJ0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O0VBQUEsQ0FBQyxDQUFDLFVBQUYsQ0FBQTs7RUFDQSxNQUFNLENBQUMsRUFBUCxHQUFZOztFQUNaLEVBQUUsQ0FBQyxFQUFFLENBQUMsWUFBTixHQUFtQixTQUFDLGFBQUQsRUFBZSxFQUFmO0FBQ2pCLFFBQUE7SUFBQSxZQUFBLEdBQWU7V0FDZixJQUFJLENBQUMsUUFBTCxDQUFjLFdBQUEsR0FBWSxhQUExQixDQUNDLENBQUMsR0FERixDQUNNLFlBRE4sRUFDbUIsU0FBQTtNQUNqQixFQUFBLENBQUcsSUFBSCxDQUFRLENBQUMsV0FBVCxDQUFxQixXQUFBLEdBQVksYUFBakM7TUFDQSxFQUFBLElBQUksRUFBRSxDQUFDLElBQUgsQ0FBUSxFQUFBLENBQUcsSUFBSCxDQUFSO0lBRmEsQ0FEbkI7RUFGaUI7O0VBUW5CLEVBQUEsQ0FBRyx3QkFBSCxDQUNDLENBQUMsWUFERixDQUNlLFlBRGY7O0VBR0EsY0FBQSxHQUFpQjs7RUFDakIsRUFBQSxDQUFHLHdCQUFILENBQ0MsQ0FBQyxLQURGLENBQ1EsU0FBQTtJQUNOLEVBQUEsQ0FBRyx3QkFBSCxDQUNDLENBQUMsWUFERixDQUNlLGFBRGYsRUFDNkIsU0FBQTtNQUMzQixFQUFBLENBQUcsSUFBSCxDQUFRLENBQUMsSUFBVCxDQUFBO01BQ0EsU0FBQSxDQUFBO2FBQ0EsY0FBQSxHQUFpQixXQUFBLENBQVksU0FBWixFQUFzQixJQUF0QjtJQUhVLENBRDdCO0VBRE0sQ0FEUjs7RUFTQSxlQUFBLEdBQWtCOztFQUNsQixPQUFBLEdBQVUsRUFBQSxDQUFHLGlDQUFIOztFQUNWLFNBQUEsR0FBWSxTQUFBO0lBQ1gsT0FBTyxDQUFDLElBQVIsQ0FBQTtJQUNBLGVBQUE7SUFDQSxJQUFHLGVBQUEsR0FBZ0IsQ0FBbkI7TUFDQyxhQUFBLENBQWMsY0FBZDtNQUNBLEVBQUEsQ0FBRyxhQUFILENBQ0MsQ0FBQyxJQURGLENBQUE7TUFFQSxNQUFBLENBQUE7QUFDQSxhQUxEOztXQU1BLE9BQ0MsQ0FBQyxFQURGLENBQ0ssZUFETCxDQUVDLENBQUMsSUFGRixDQUFBO0VBVFc7QUF6QloiLCJzb3VyY2VzQ29udGVudCI6WyIkLm5vQ29uZmxpY3QoKVxyXG53aW5kb3cuanEgPSBqUXVlcnlcclxuanEuZm4uYW5pbWF0aW9uQ3NzPShhbmltYXRpb25OYW1lLGZuKS0+XHJcblx0XHRhbmltYXRpb25FbmQgPSAnd2Via2l0QW5pbWF0aW9uRW5kIG1vekFuaW1hdGlvbkVuZCBNU0FuaW1hdGlvbkVuZCBvYW5pbWF0aW9uZW5kIGFuaW1hdGlvbmVuZCdcclxuXHRcdHRoaXMuYWRkQ2xhc3MgXCJhbmltYXRlZCAje2FuaW1hdGlvbk5hbWV9XCJcclxuXHRcdFx0Lm9uZSBhbmltYXRpb25FbmQsKCktPlxyXG5cdFx0XHRcdGpxKHRoaXMpLnJlbW92ZUNsYXNzIFwiYW5pbWF0ZWQgI3thbmltYXRpb25OYW1lfVwiXHJcblx0XHRcdFx0Zm4mJmZuLmNhbGwganEgdGhpc1xyXG5cdFx0XHRcdHJldHVyblxyXG4jIGJlZ2lubmluZ1xyXG5qcSAnLnN0YXJ0LXZpZXcgLmJlZ2lubmluZydcclxuXHQuYW5pbWF0aW9uQ3NzICdib3VuY2VJblVwJ1xyXG5cclxuY291bnREb3duVGltZXIgPSBudWxsXHJcbmpxICcuc3RhcnQtdmlldyAuYnRuLXN0YXJ0JyNjbGljayBzdGFydCBidXR0b25cclxuXHQuY2xpY2sgKCktPlxyXG5cdFx0anEgJy5zdGFydC12aWV3IC5iZWdpbm5pbmcnXHJcblx0XHRcdC5hbmltYXRpb25Dc3MgJ2JvdW5jZU91dFVwJywoKS0+XHJcblx0XHRcdFx0anEodGhpcykuaGlkZSgpXHJcblx0XHRcdFx0Y291bnREb3duKCkjc3RhcnQgY291bnQtZG93blxyXG5cdFx0XHRcdGNvdW50RG93blRpbWVyID0gc2V0SW50ZXJ2YWwgY291bnREb3duLDEwMDBcclxuXHRcdHJldHVyblxyXG4jY291bnQtZG93blxyXG5jb3VudERvd25OdW1iZXIgPSAzXHJcbm51bWJlcnMgPSBqcSAnLnN0YXJ0LXZpZXcgLmNvdW50LWRvd24gLm51bWJlcidcclxuY291bnREb3duID0gKCktPlxyXG5cdG51bWJlcnMuaGlkZSgpXHJcblx0Y291bnREb3duTnVtYmVyLS07XHJcblx0aWYgY291bnREb3duTnVtYmVyPDBcclxuXHRcdGNsZWFySW50ZXJ2YWwgY291bnREb3duVGltZXJcclxuXHRcdGpxICcuc3RhcnQtdmlldydcclxuXHRcdFx0LmhpZGUoKVxyXG5cdFx0bVN0YXJ0KClcclxuXHRcdHJldHVyblxyXG5cdG51bWJlcnNcclxuXHRcdC5lcSBjb3VudERvd25OdW1iZXJcclxuXHRcdC5zaG93KClcclxuIl19
