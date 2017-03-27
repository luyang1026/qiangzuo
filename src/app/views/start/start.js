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

  Game = (function() {
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
    return this.btnStart.on('tap', function() {
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
      return _this.countDown.call(_this);
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

  global.game = new Game();

  game.init();

  game.homePage();

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3Mvc3RhcnQvc3RhcnQuanMiLCJzb3VyY2VzIjpbInZpZXdzL3N0YXJ0L3N0YXJ0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O0VBQUEsQ0FBQyxDQUFDLFVBQUYsQ0FBQTs7RUFDQSxNQUFBLEdBQVM7O0VBQ1QsTUFBTSxDQUFDLEVBQVAsR0FBWTs7RUFDWixNQUFNLENBQUMsV0FBUCxHQUFxQixRQUFRLENBQUMsZUFBZSxDQUFDOztFQUM5QyxRQUFRLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxRQUEvQixHQUE0QyxDQUFDLFdBQUEsR0FBWSxFQUFiLENBQUEsR0FBZ0I7O0VBQzVELEVBQUUsQ0FBQyxFQUFFLENBQUMsWUFBTixHQUFtQixTQUFDLGFBQUQsRUFBZSxFQUFmO0FBQ2pCLFFBQUE7SUFBQSxZQUFBLEdBQWU7V0FDZixJQUFJLENBQUMsUUFBTCxDQUFjLFdBQUEsR0FBWSxhQUExQixDQUNDLENBQUMsR0FERixDQUNNLFlBRE4sRUFDbUIsU0FBQTtNQUNqQixFQUFBLENBQUcsSUFBSCxDQUFRLENBQUMsV0FBVCxDQUFxQixXQUFBLEdBQVksYUFBakM7TUFDQSxFQUFBLElBQUksRUFBRSxDQUFDLElBQUgsQ0FBUSxFQUFBLENBQUcsSUFBSCxDQUFSO0lBRmEsQ0FEbkI7RUFGaUI7O0VBUWI7SUFDTyxjQUFBO01BQ1gsSUFBQyxDQUFBLE9BQUQsR0FBVyxJQUFBLEdBQUs7TUFDaEIsSUFBQyxDQUFBLE9BQUQsR0FBVyxFQUFBLENBQUcsTUFBSCxDQUFVLENBQUMsTUFBWCxDQUFBO01BQ1gsSUFBQyxDQUFBLFNBQUQsR0FBYSxFQUFBLENBQUcsYUFBSDtNQUNiLElBQUMsQ0FBQSxTQUFELEdBQWEsRUFBQSxDQUFHLHdCQUFIO01BQ2IsSUFBQyxDQUFBLFFBQUQsR0FBWSxFQUFBLENBQUcsV0FBSDtNQUNaLElBQUMsQ0FBQSxRQUFELEdBQVksQ0FBQSxDQUFFLHdCQUFGO01BQ1osSUFBQyxDQUFBLGdCQUFELEdBQW9CLEVBQUEsQ0FBRyxpQ0FBSDtNQUNwQixJQUFDLENBQUEsTUFBRCxHQUFVO01BQ1YsSUFBQyxDQUFBLEtBQUQsR0FBUztJQVRFOzttQkFVWixJQUFBLEdBQUssU0FBQTthQUNKLElBQUMsQ0FBQSxXQUFELENBQUE7SUFESTs7bUJBRUwsV0FBQSxHQUFZLFNBQUE7YUFDWCxFQUFBLENBQUcsY0FBSCxDQUNDLENBQUMsTUFERixDQUNZLElBQUMsQ0FBQSxPQUFGLEdBQVUsS0FEckI7SUFEVzs7Ozs7O0VBSWIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFmLEdBQTBCLFNBQUE7SUFDekIsSUFBQyxDQUFBLFNBQVMsQ0FBQyxJQUFYLENBQUE7SUFDQSxJQUFDLENBQUEsUUFBUSxDQUFDLElBQVYsQ0FBQTtJQUNBLElBQUMsQ0FBQSxTQUFTLENBQUMsWUFBWCxDQUF3QixZQUF4QjtXQUNBLElBQUMsQ0FBQSxpQkFBRCxDQUFBO0VBSnlCOztFQU0xQixJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFmLEdBQW1DLFNBQUE7QUFDbEMsUUFBQTtJQUFBLEtBQUEsR0FBUTtXQUNSLElBQUMsQ0FBQSxRQUFRLENBQUMsRUFBVixDQUFhLEtBQWIsRUFBbUIsU0FBQTthQUNsQixLQUFLLENBQUMsU0FBUyxDQUFDLFlBQWhCLENBQTZCLGFBQTdCLEVBQTJDLFNBQUE7ZUFDekMsRUFBQSxDQUFHLElBQUgsQ0FBUSxDQUFDLElBQVQsQ0FBYyxLQUFLLENBQUMsU0FBTixDQUFBLENBQWQ7TUFEeUMsQ0FBM0M7SUFEa0IsQ0FBbkI7RUFGa0M7O0VBS25DLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBZixHQUEyQixTQUFBO0FBQzFCLFFBQUE7SUFBQSxLQUFBLEdBQVE7SUFDUixJQUFDLENBQUEsZ0JBQWdCLENBQUMsSUFBbEIsQ0FBQTtJQUNBLElBQUMsQ0FBQSxTQUFTLENBQUMsSUFBWCxDQUFBO0lBQ0EsSUFBQyxDQUFBLFFBQVEsQ0FBQyxJQUFWLENBQUE7SUFDQSxJQUFDLENBQUEsTUFBRDtJQUNBLElBQUMsQ0FBQSxLQUFELEdBQVMsVUFBQSxDQUFXLFNBQUE7YUFDbkIsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFoQixDQUFxQixLQUFyQjtJQURtQixDQUFYLEVBRVIsSUFGUTtJQUdULElBQUcsSUFBQyxDQUFBLE1BQUQsR0FBUSxDQUFYO01BQ0MsSUFBQyxDQUFBLE1BQUQsR0FBVTtNQUNWLElBQUMsQ0FBQSxTQUFTLENBQUMsSUFBWCxDQUFBO01BQ0EsSUFBQyxDQUFBLFFBQVEsQ0FBQyxJQUFWLENBQUE7TUFDQSxZQUFBLENBQWEsSUFBQyxDQUFBLEtBQWQ7QUFDQSxhQUxEOztJQU1BLElBQUMsQ0FBQSxnQkFDQSxDQUFDLEVBREYsQ0FDSyxJQUFDLENBQUEsTUFETixDQUVDLENBQUMsSUFGRixDQUFBO0VBZjBCOztFQW9CM0IsTUFBTSxDQUFDLElBQVAsR0FBa0IsSUFBQSxJQUFBLENBQUE7O0VBQ2xCLElBQUksQ0FBQyxJQUFMLENBQUE7O0VBQ0EsSUFBSSxDQUFDLFFBQUwsQ0FBQTtBQS9EQSIsInNvdXJjZXNDb250ZW50IjpbIiQubm9Db25mbGljdCgpXHJcbmdsb2JhbCA9IHdpbmRvd1xyXG53aW5kb3cuanEgPSBqUXVlcnlcclxuZ2xvYmFsLmRldmljZVdpZHRoID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoXHJcbmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5mb250U2l6ZSA9IFwiI3tkZXZpY2VXaWR0aC8xMH1weFwiXHJcbmpxLmZuLmFuaW1hdGlvbkNzcz0oYW5pbWF0aW9uTmFtZSxmbiktPlxyXG5cdFx0YW5pbWF0aW9uRW5kID0gJ3dlYmtpdEFuaW1hdGlvbkVuZCBtb3pBbmltYXRpb25FbmQgTVNBbmltYXRpb25FbmQgb2FuaW1hdGlvbmVuZCBhbmltYXRpb25lbmQnXHJcblx0XHR0aGlzLmFkZENsYXNzIFwiYW5pbWF0ZWQgI3thbmltYXRpb25OYW1lfVwiXHJcblx0XHRcdC5vbmUgYW5pbWF0aW9uRW5kLCgpLT5cclxuXHRcdFx0XHRqcSh0aGlzKS5yZW1vdmVDbGFzcyBcImFuaW1hdGVkICN7YW5pbWF0aW9uTmFtZX1cIlxyXG5cdFx0XHRcdGZuJiZmbi5jYWxsIGpxIHRoaXNcclxuXHRcdFx0XHRyZXR1cm5cclxuXHJcbmNsYXNzIEdhbWVcclxuXHRjb25zdHJ1Y3RvcjooKS0+XHJcblx0XHRAcEhlaWdodCA9IDQ1NDAvNzIjIHBpY3R1cmUgaGVpZ2h0XHJcblx0XHRAd0hlaWdodCA9IGpxKHdpbmRvdykuaGVpZ2h0KCkjIHNjcmVlbiBoZWlnaHRcclxuXHRcdEBzdGFydFZpZXcgPSBqcSAnLnN0YXJ0LXZpZXcnXHJcblx0XHRAYmVnaW5uaW5nID0ganEgJy5zdGFydC12aWV3IC5iZWdpbm5pbmcnXHJcblx0XHRAYmFja2Ryb3AgPSBqcSAnLmJhY2tkcm9wJ1xyXG5cdFx0QGJ0blN0YXJ0ID0gJCAnLnN0YXJ0LXZpZXcgLmJ0bi1zdGFydCdcclxuXHRcdEBjb3VudERvd25OdW1iZXJzID0ganEgJy5zdGFydC12aWV3IC5jb3VudC1kb3duIC5udW1iZXInXHJcblx0XHRAbnVtYmVyID0gM1xyXG5cdFx0QHRpbWVyID0gbnVsbFxyXG5cdGluaXQ6KCktPlxyXG5cdFx0QGdldERvbVJlYWR5KClcclxuXHRnZXREb21SZWFkeTooKS0+XHJcblx0XHRqcSAnLmNvbnRlbnQ+ZGl2JyMgc2V0IGRpdidzIGhlaWdodCBcclxuXHRcdFx0LmhlaWdodCBcIiN7QHBIZWlnaHR9cmVtXCJcclxuXHJcbkdhbWUucHJvdG90eXBlLmhvbWVQYWdlID0gKCktPlxyXG5cdEBzdGFydFZpZXcuc2hvdygpXHJcblx0QGJhY2tkcm9wLnNob3coKVxyXG5cdEBiZWdpbm5pbmcuYW5pbWF0aW9uQ3NzICdib3VuY2VJblVwJ1xyXG5cdEBob21lUGFnZUJpbmRFdmVudCgpXHJcblxyXG5HYW1lLnByb3RvdHlwZS5ob21lUGFnZUJpbmRFdmVudCA9ICgpLT5cclxuXHRfdGhpcyA9IEBcclxuXHRAYnRuU3RhcnQub24gJ3RhcCcsKCktPlxyXG5cdFx0X3RoaXMuYmVnaW5uaW5nLmFuaW1hdGlvbkNzcyAnYm91bmNlT3V0VXAnLCgpLT5cclxuXHRcdFx0XHRqcSh0aGlzKS5oaWRlIF90aGlzLmNvdW50RG93bigpI3N0YXJ0IGNvdW50LWRvd25cclxuR2FtZS5wcm90b3R5cGUuY291bnREb3duID0gKCktPlxyXG5cdF90aGlzID0gQFxyXG5cdEBjb3VudERvd25OdW1iZXJzLmhpZGUoKVxyXG5cdEBzdGFydFZpZXcuc2hvdygpXHJcblx0QGJhY2tkcm9wLnNob3coKVxyXG5cdEBudW1iZXItLVxyXG5cdEB0aW1lciA9IHNldFRpbWVvdXQgKCktPlxyXG5cdFx0X3RoaXMuY291bnREb3duLmNhbGwoX3RoaXMpXHJcblx0LDEwMDBcclxuXHRpZiBAbnVtYmVyPDBcclxuXHRcdEBudW1iZXIgPSAzXHJcblx0XHRAc3RhcnRWaWV3LmhpZGUoKVxyXG5cdFx0QGJhY2tkcm9wLmhpZGUoKVxyXG5cdFx0Y2xlYXJUaW1lb3V0IEB0aW1lclxyXG5cdFx0cmV0dXJuXHJcblx0QGNvdW50RG93bk51bWJlcnNcclxuXHRcdC5lcSBAbnVtYmVyXHJcblx0XHQuc2hvdygpXHJcblx0cmV0dXJuXHJcblxyXG5nbG9iYWwuZ2FtZSA9IG5ldyBHYW1lKClcclxuZ2FtZS5pbml0KClcclxuZ2FtZS5ob21lUGFnZSgpIl19
