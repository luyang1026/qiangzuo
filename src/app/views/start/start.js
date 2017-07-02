(function() {
  var Game, global;

  $.noConflict();

  global = window;

  window.jq = jQuery;

  global.deviceWidth = document.documentElement.clientWidth;

  document.documentElement.style.fontSize = (deviceWidth / 10) + "px";

  jq.fn.animationCss = function(animationName, fn) {
    var animationEnd;
    animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    return this.addClass("animated " + animationName).one(animationEnd, function() {
      jq(this).removeClass("animated " + animationName);
      fn && fn.call(jq(this));
    });
  };

  global.Game = Game = (function() {
    function Game() {
      this.pHeight = 4540 / 72;
      this.wHeight = jq(window).height();
      this.startView = jq('.start-view');
      this.beginning = jq('.start-view .beginning');
      this.backdrop = jq('.backdrop');
      this.btnStart = $('.start-view .btn-start');
      this.countDownNumbers = jq('.start-view .count-down .number');
      this.number = 3;
      this.timer = null;
    }

    Game.prototype.init = function() {
      return this.getDomReady();
    };

    Game.prototype.getDomReady = function() {
      return jq('.content>div').height(this.pHeight + "rem");
    };

    return Game;

  })();

  Game.prototype.homePage = function() {
    this.startView.show();
    this.backdrop.show();
    this.beginning.animationCss('bounceInUp');
    return this.homePageBindEvent();
  };

  Game.prototype.homePageBindEvent = function() {
    var _this;
    _this = this;
    return this.btnStart.one('tap', function() {
      return _this.beginning.animationCss('bounceOutUp', function() {
        return jq(this).hide(_this.countDown());
      });
    });
  };

  Game.prototype.countDown = function() {
    var _this;
    _this = this;
    this.countDownNumbers.hide();
    this.startView.show();
    this.backdrop.show();
    this.number--;
    this.timer = setTimeout(function() {
      return _this.countDown();
    }, 1000);
    if (this.number < 0) {
      this.number = 3;
      this.startView.hide();
      this.backdrop.hide();
      clearTimeout(this.timer);
      return;
    }
    this.countDownNumbers.eq(this.number).show();
  };

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3Mvc3RhcnQvc3RhcnQuanMiLCJzb3VyY2VzIjpbInZpZXdzL3N0YXJ0L3N0YXJ0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O0VBQUEsQ0FBQyxDQUFDLFVBQUYsQ0FBQTs7RUFDQSxNQUFBLEdBQVM7O0VBQ1QsTUFBTSxDQUFDLEVBQVAsR0FBWTs7RUFDWixNQUFNLENBQUMsV0FBUCxHQUFxQixRQUFRLENBQUMsZUFBZSxDQUFDOztFQUM5QyxRQUFRLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxRQUEvQixHQUE0QyxDQUFDLFdBQUEsR0FBWSxFQUFiLENBQUEsR0FBZ0I7O0VBQzVELEVBQUUsQ0FBQyxFQUFFLENBQUMsWUFBTixHQUFtQixTQUFDLGFBQUQsRUFBZSxFQUFmO0FBQ2pCLFFBQUE7SUFBQSxZQUFBLEdBQWU7V0FDZixJQUFJLENBQUMsUUFBTCxDQUFjLFdBQUEsR0FBWSxhQUExQixDQUNDLENBQUMsR0FERixDQUNNLFlBRE4sRUFDbUIsU0FBQTtNQUNqQixFQUFBLENBQUcsSUFBSCxDQUFRLENBQUMsV0FBVCxDQUFxQixXQUFBLEdBQVksYUFBakM7TUFDQSxFQUFBLElBQUksRUFBRSxDQUFDLElBQUgsQ0FBUSxFQUFBLENBQUcsSUFBSCxDQUFSO0lBRmEsQ0FEbkI7RUFGaUI7O0VBUW5CLE1BQU0sQ0FBQyxJQUFQLEdBQW9CO0lBQ1AsY0FBQTtNQUNYLElBQUMsQ0FBQSxPQUFELEdBQVcsSUFBQSxHQUFLO01BQ2hCLElBQUMsQ0FBQSxPQUFELEdBQVcsRUFBQSxDQUFHLE1BQUgsQ0FBVSxDQUFDLE1BQVgsQ0FBQTtNQUNYLElBQUMsQ0FBQSxTQUFELEdBQWEsRUFBQSxDQUFHLGFBQUg7TUFDYixJQUFDLENBQUEsU0FBRCxHQUFhLEVBQUEsQ0FBRyx3QkFBSDtNQUNiLElBQUMsQ0FBQSxRQUFELEdBQVksRUFBQSxDQUFHLFdBQUg7TUFDWixJQUFDLENBQUEsUUFBRCxHQUFZLENBQUEsQ0FBRSx3QkFBRjtNQUNaLElBQUMsQ0FBQSxnQkFBRCxHQUFvQixFQUFBLENBQUcsaUNBQUg7TUFDcEIsSUFBQyxDQUFBLE1BQUQsR0FBVTtNQUNWLElBQUMsQ0FBQSxLQUFELEdBQVM7SUFURTs7bUJBVVosSUFBQSxHQUFLLFNBQUE7YUFDSixJQUFDLENBQUEsV0FBRCxDQUFBO0lBREk7O21CQUVMLFdBQUEsR0FBWSxTQUFBO2FBQ1gsRUFBQSxDQUFHLGNBQUgsQ0FDQyxDQUFDLE1BREYsQ0FDWSxJQUFDLENBQUEsT0FBRixHQUFVLEtBRHJCO0lBRFc7Ozs7OztFQUliLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBZixHQUEwQixTQUFBO0lBQ3pCLElBQUMsQ0FBQSxTQUFTLENBQUMsSUFBWCxDQUFBO0lBQ0EsSUFBQyxDQUFBLFFBQVEsQ0FBQyxJQUFWLENBQUE7SUFDQSxJQUFDLENBQUEsU0FBUyxDQUFDLFlBQVgsQ0FBd0IsWUFBeEI7V0FDQSxJQUFDLENBQUEsaUJBQUQsQ0FBQTtFQUp5Qjs7RUFNMUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBZixHQUFtQyxTQUFBO0FBQ2xDLFFBQUE7SUFBQSxLQUFBLEdBQVE7V0FDUixJQUFDLENBQUEsUUFBUSxDQUFDLEdBQVYsQ0FBYyxLQUFkLEVBQW9CLFNBQUE7YUFDbkIsS0FBSyxDQUFDLFNBQVMsQ0FBQyxZQUFoQixDQUE2QixhQUE3QixFQUEyQyxTQUFBO2VBQzFDLEVBQUEsQ0FBRyxJQUFILENBQVEsQ0FBQyxJQUFULENBQWMsS0FBSyxDQUFDLFNBQU4sQ0FBQSxDQUFkO01BRDBDLENBQTNDO0lBRG1CLENBQXBCO0VBRmtDOztFQUtuQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQWYsR0FBMkIsU0FBQTtBQUMxQixRQUFBO0lBQUEsS0FBQSxHQUFRO0lBQ1IsSUFBQyxDQUFBLGdCQUFnQixDQUFDLElBQWxCLENBQUE7SUFDQSxJQUFDLENBQUEsU0FBUyxDQUFDLElBQVgsQ0FBQTtJQUNBLElBQUMsQ0FBQSxRQUFRLENBQUMsSUFBVixDQUFBO0lBQ0EsSUFBQyxDQUFBLE1BQUQ7SUFDQSxJQUFDLENBQUEsS0FBRCxHQUFTLFVBQUEsQ0FBVyxTQUFBO2FBQ25CLEtBQUssQ0FBQyxTQUFOLENBQUE7SUFEbUIsQ0FBWCxFQUVSLElBRlE7SUFHVCxJQUFHLElBQUMsQ0FBQSxNQUFELEdBQVEsQ0FBWDtNQUNDLElBQUMsQ0FBQSxNQUFELEdBQVU7TUFDVixJQUFDLENBQUEsU0FBUyxDQUFDLElBQVgsQ0FBQTtNQUNBLElBQUMsQ0FBQSxRQUFRLENBQUMsSUFBVixDQUFBO01BQ0EsWUFBQSxDQUFhLElBQUMsQ0FBQSxLQUFkO0FBQ0EsYUFMRDs7SUFNQSxJQUFDLENBQUEsZ0JBQ0EsQ0FBQyxFQURGLENBQ0ssSUFBQyxDQUFBLE1BRE4sQ0FFQyxDQUFDLElBRkYsQ0FBQTtFQWYwQjtBQXpDM0IiLCJzb3VyY2VzQ29udGVudCI6WyIkLm5vQ29uZmxpY3QoKVxyXG5nbG9iYWwgPSB3aW5kb3dcclxud2luZG93LmpxID0galF1ZXJ5XHJcbmdsb2JhbC5kZXZpY2VXaWR0aCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aFxyXG5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuZm9udFNpemUgPSBcIiN7ZGV2aWNlV2lkdGgvMTB9cHhcIlxyXG5qcS5mbi5hbmltYXRpb25Dc3M9KGFuaW1hdGlvbk5hbWUsZm4pLT5cclxuXHRcdGFuaW1hdGlvbkVuZCA9ICd3ZWJraXRBbmltYXRpb25FbmQgbW96QW5pbWF0aW9uRW5kIE1TQW5pbWF0aW9uRW5kIG9hbmltYXRpb25lbmQgYW5pbWF0aW9uZW5kJ1xyXG5cdFx0dGhpcy5hZGRDbGFzcyBcImFuaW1hdGVkICN7YW5pbWF0aW9uTmFtZX1cIlxyXG5cdFx0XHQub25lIGFuaW1hdGlvbkVuZCwoKS0+XHJcblx0XHRcdFx0anEodGhpcykucmVtb3ZlQ2xhc3MgXCJhbmltYXRlZCAje2FuaW1hdGlvbk5hbWV9XCJcclxuXHRcdFx0XHRmbiYmZm4uY2FsbCBqcSB0aGlzXHJcblx0XHRcdFx0cmV0dXJuXHJcblxyXG5nbG9iYWwuR2FtZSA9IGNsYXNzIEdhbWVcclxuXHRjb25zdHJ1Y3RvcjooKS0+XHJcblx0XHRAcEhlaWdodCA9IDQ1NDAvNzIjIHBpY3R1cmUgaGVpZ2h0XHJcblx0XHRAd0hlaWdodCA9IGpxKHdpbmRvdykuaGVpZ2h0KCkjIHNjcmVlbiBoZWlnaHRcclxuXHRcdEBzdGFydFZpZXcgPSBqcSAnLnN0YXJ0LXZpZXcnXHJcblx0XHRAYmVnaW5uaW5nID0ganEgJy5zdGFydC12aWV3IC5iZWdpbm5pbmcnXHJcblx0XHRAYmFja2Ryb3AgPSBqcSAnLmJhY2tkcm9wJ1xyXG5cdFx0QGJ0blN0YXJ0ID0gJCAnLnN0YXJ0LXZpZXcgLmJ0bi1zdGFydCdcclxuXHRcdEBjb3VudERvd25OdW1iZXJzID0ganEgJy5zdGFydC12aWV3IC5jb3VudC1kb3duIC5udW1iZXInXHJcblx0XHRAbnVtYmVyID0gM1xyXG5cdFx0QHRpbWVyID0gbnVsbFxyXG5cdGluaXQ6KCktPlxyXG5cdFx0QGdldERvbVJlYWR5KClcclxuXHRnZXREb21SZWFkeTooKS0+XHJcblx0XHRqcSAnLmNvbnRlbnQ+ZGl2JyMgc2V0IGRpdidzIGhlaWdodCBcclxuXHRcdFx0LmhlaWdodCBcIiN7QHBIZWlnaHR9cmVtXCJcclxuXHJcbkdhbWUucHJvdG90eXBlLmhvbWVQYWdlID0gKCktPlxyXG5cdEBzdGFydFZpZXcuc2hvdygpXHJcblx0QGJhY2tkcm9wLnNob3coKVxyXG5cdEBiZWdpbm5pbmcuYW5pbWF0aW9uQ3NzICdib3VuY2VJblVwJ1xyXG5cdEBob21lUGFnZUJpbmRFdmVudCgpXHJcblxyXG5HYW1lLnByb3RvdHlwZS5ob21lUGFnZUJpbmRFdmVudCA9ICgpLT5cclxuXHRfdGhpcyA9IEBcclxuXHRAYnRuU3RhcnQub25lICd0YXAnLCgpLT5cclxuXHRcdF90aGlzLmJlZ2lubmluZy5hbmltYXRpb25Dc3MgJ2JvdW5jZU91dFVwJywoKS0+XHJcblx0XHRcdGpxKHRoaXMpLmhpZGUgX3RoaXMuY291bnREb3duKCkjc3RhcnQgY291bnQtZG93blxyXG5HYW1lLnByb3RvdHlwZS5jb3VudERvd24gPSAoKS0+XHJcblx0X3RoaXMgPSBAXHJcblx0QGNvdW50RG93bk51bWJlcnMuaGlkZSgpXHJcblx0QHN0YXJ0Vmlldy5zaG93KClcclxuXHRAYmFja2Ryb3Auc2hvdygpXHJcblx0QG51bWJlci0tXHJcblx0QHRpbWVyID0gc2V0VGltZW91dCAoKS0+XHJcblx0XHRfdGhpcy5jb3VudERvd24oKVxyXG5cdCwxMDAwXHJcblx0aWYgQG51bWJlcjwwXHJcblx0XHRAbnVtYmVyID0gM1xyXG5cdFx0QHN0YXJ0Vmlldy5oaWRlKClcclxuXHRcdEBiYWNrZHJvcC5oaWRlKClcclxuXHRcdGNsZWFyVGltZW91dCBAdGltZXJcclxuXHRcdHJldHVyblxyXG5cdEBjb3VudERvd25OdW1iZXJzXHJcblx0XHQuZXEgQG51bWJlclxyXG5cdFx0LnNob3coKVxyXG5cdHJldHVyblxyXG4iXX0=
