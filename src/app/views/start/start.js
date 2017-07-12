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
      this.score = 0;
      this.tap = jq('#m_btn');
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
      _this.tap.get(0).play();
      return _this.beginning.animationCss('bounceOutUp', function() {
        return jq(this).hide(_this.countDown());
      });
    });
  };

  Game.prototype.countDown = function() {
    var _this, m_cd;
    _this = this;
    m_cd = $('#m_countdown');
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
    m_cd.get(0).play();
  };

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3Mvc3RhcnQvc3RhcnQuanMiLCJzb3VyY2VzIjpbInZpZXdzL3N0YXJ0L3N0YXJ0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O0VBQUEsQ0FBQyxDQUFDLFVBQUYsQ0FBQTs7RUFDQSxNQUFBLEdBQVM7O0VBQ1QsTUFBTSxDQUFDLEVBQVAsR0FBWTs7RUFDWixNQUFNLENBQUMsV0FBUCxHQUFxQixRQUFRLENBQUMsZUFBZSxDQUFDOztFQUM5QyxRQUFRLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxRQUEvQixHQUE0QyxDQUFDLFdBQUEsR0FBWSxFQUFiLENBQUEsR0FBZ0I7O0VBQzVELEVBQUUsQ0FBQyxFQUFFLENBQUMsWUFBTixHQUFtQixTQUFDLGFBQUQsRUFBZSxFQUFmO0FBQ2pCLFFBQUE7SUFBQSxZQUFBLEdBQWU7V0FDZixJQUFJLENBQUMsUUFBTCxDQUFjLFdBQUEsR0FBWSxhQUExQixDQUNDLENBQUMsR0FERixDQUNNLFlBRE4sRUFDbUIsU0FBQTtNQUNqQixFQUFBLENBQUcsSUFBSCxDQUFRLENBQUMsV0FBVCxDQUFxQixXQUFBLEdBQVksYUFBakM7TUFDQSxFQUFBLElBQUksRUFBRSxDQUFDLElBQUgsQ0FBUSxFQUFBLENBQUcsSUFBSCxDQUFSO0lBRmEsQ0FEbkI7RUFGaUI7O0VBUW5CLE1BQU0sQ0FBQyxJQUFQLEdBQW9CO0lBQ1AsY0FBQTtNQUNYLElBQUMsQ0FBQSxPQUFELEdBQVcsSUFBQSxHQUFLO01BQ2hCLElBQUMsQ0FBQSxPQUFELEdBQVcsRUFBQSxDQUFHLE1BQUgsQ0FBVSxDQUFDLE1BQVgsQ0FBQTtNQUNYLElBQUMsQ0FBQSxTQUFELEdBQWEsRUFBQSxDQUFHLGFBQUg7TUFDYixJQUFDLENBQUEsU0FBRCxHQUFhLEVBQUEsQ0FBRyx3QkFBSDtNQUNiLElBQUMsQ0FBQSxRQUFELEdBQVksRUFBQSxDQUFHLFdBQUg7TUFDWixJQUFDLENBQUEsUUFBRCxHQUFZLENBQUEsQ0FBRSx3QkFBRjtNQUNaLElBQUMsQ0FBQSxnQkFBRCxHQUFvQixFQUFBLENBQUcsaUNBQUg7TUFDcEIsSUFBQyxDQUFBLE1BQUQsR0FBVTtNQUNWLElBQUMsQ0FBQSxLQUFELEdBQVM7TUFDVCxJQUFDLENBQUEsS0FBRCxHQUFTO01BQ1QsSUFBQyxDQUFBLEdBQUQsR0FBTyxFQUFBLENBQUcsUUFBSDtJQVhJOzttQkFZWixJQUFBLEdBQUssU0FBQTthQUNKLElBQUMsQ0FBQSxXQUFELENBQUE7SUFESTs7bUJBRUwsV0FBQSxHQUFZLFNBQUE7YUFDWCxFQUFBLENBQUcsY0FBSCxDQUNDLENBQUMsTUFERixDQUNZLElBQUMsQ0FBQSxPQUFGLEdBQVUsS0FEckI7SUFEVzs7Ozs7O0VBSWIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFmLEdBQTBCLFNBQUE7SUFDekIsSUFBQyxDQUFBLFNBQVMsQ0FBQyxJQUFYLENBQUE7SUFDQSxJQUFDLENBQUEsUUFBUSxDQUFDLElBQVYsQ0FBQTtJQUNBLElBQUMsQ0FBQSxTQUFTLENBQUMsWUFBWCxDQUF3QixZQUF4QjtXQUNBLElBQUMsQ0FBQSxpQkFBRCxDQUFBO0VBSnlCOztFQU0xQixJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFmLEdBQW1DLFNBQUE7QUFDbEMsUUFBQTtJQUFBLEtBQUEsR0FBUTtXQUNSLElBQUMsQ0FBQSxRQUFRLENBQUMsR0FBVixDQUFjLEtBQWQsRUFBb0IsU0FBQTtNQUNuQixLQUFLLENBQUMsR0FBRyxDQUFDLEdBQVYsQ0FBYyxDQUFkLENBQWdCLENBQUMsSUFBakIsQ0FBQTthQUNBLEtBQUssQ0FBQyxTQUFTLENBQUMsWUFBaEIsQ0FBNkIsYUFBN0IsRUFBMkMsU0FBQTtlQUMxQyxFQUFBLENBQUcsSUFBSCxDQUFRLENBQUMsSUFBVCxDQUFjLEtBQUssQ0FBQyxTQUFOLENBQUEsQ0FBZDtNQUQwQyxDQUEzQztJQUZtQixDQUFwQjtFQUZrQzs7RUFNbkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFmLEdBQTJCLFNBQUE7QUFDMUIsUUFBQTtJQUFBLEtBQUEsR0FBUTtJQUNSLElBQUEsR0FBTyxDQUFBLENBQUUsY0FBRjtJQUNQLElBQUMsQ0FBQSxnQkFBZ0IsQ0FBQyxJQUFsQixDQUFBO0lBQ0EsSUFBQyxDQUFBLFNBQVMsQ0FBQyxJQUFYLENBQUE7SUFDQSxJQUFDLENBQUEsUUFBUSxDQUFDLElBQVYsQ0FBQTtJQUNBLElBQUMsQ0FBQSxNQUFEO0lBQ0EsSUFBQyxDQUFBLEtBQUQsR0FBUyxVQUFBLENBQVcsU0FBQTthQUNuQixLQUFLLENBQUMsU0FBTixDQUFBO0lBRG1CLENBQVgsRUFFUixJQUZRO0lBR1QsSUFBRyxJQUFDLENBQUEsTUFBRCxHQUFRLENBQVg7TUFDQyxJQUFDLENBQUEsTUFBRCxHQUFVO01BQ1YsSUFBQyxDQUFBLFNBQVMsQ0FBQyxJQUFYLENBQUE7TUFDQSxJQUFDLENBQUEsUUFBUSxDQUFDLElBQVYsQ0FBQTtNQUNBLFlBQUEsQ0FBYSxJQUFDLENBQUEsS0FBZDtBQUNBLGFBTEQ7O0lBTUEsSUFBQyxDQUFBLGdCQUNBLENBQUMsRUFERixDQUNLLElBQUMsQ0FBQSxNQUROLENBRUMsQ0FBQyxJQUZGLENBQUE7SUFHQSxJQUFJLENBQUMsR0FBTCxDQUFTLENBQVQsQ0FBVyxDQUFDLElBQVosQ0FBQTtFQW5CMEI7QUE1QzNCIiwic291cmNlc0NvbnRlbnQiOlsiJC5ub0NvbmZsaWN0KClcclxuZ2xvYmFsID0gd2luZG93XHJcbndpbmRvdy5qcSA9IGpRdWVyeVxyXG5nbG9iYWwuZGV2aWNlV2lkdGggPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGhcclxuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLmZvbnRTaXplID0gXCIje2RldmljZVdpZHRoLzEwfXB4XCJcclxuanEuZm4uYW5pbWF0aW9uQ3NzPShhbmltYXRpb25OYW1lLGZuKS0+XHJcblx0XHRhbmltYXRpb25FbmQgPSAnd2Via2l0QW5pbWF0aW9uRW5kIG1vekFuaW1hdGlvbkVuZCBNU0FuaW1hdGlvbkVuZCBvYW5pbWF0aW9uZW5kIGFuaW1hdGlvbmVuZCdcclxuXHRcdHRoaXMuYWRkQ2xhc3MgXCJhbmltYXRlZCAje2FuaW1hdGlvbk5hbWV9XCJcclxuXHRcdFx0Lm9uZSBhbmltYXRpb25FbmQsKCktPlxyXG5cdFx0XHRcdGpxKHRoaXMpLnJlbW92ZUNsYXNzIFwiYW5pbWF0ZWQgI3thbmltYXRpb25OYW1lfVwiXHJcblx0XHRcdFx0Zm4mJmZuLmNhbGwganEgdGhpc1xyXG5cdFx0XHRcdHJldHVyblxyXG5cclxuZ2xvYmFsLkdhbWUgPSBjbGFzcyBHYW1lXHJcblx0Y29uc3RydWN0b3I6KCktPlxyXG5cdFx0QHBIZWlnaHQgPSA0NTQwLzcyIyBwaWN0dXJlIGhlaWdodFxyXG5cdFx0QHdIZWlnaHQgPSBqcSh3aW5kb3cpLmhlaWdodCgpIyBzY3JlZW4gaGVpZ2h0XHJcblx0XHRAc3RhcnRWaWV3ID0ganEgJy5zdGFydC12aWV3J1xyXG5cdFx0QGJlZ2lubmluZyA9IGpxICcuc3RhcnQtdmlldyAuYmVnaW5uaW5nJ1xyXG5cdFx0QGJhY2tkcm9wID0ganEgJy5iYWNrZHJvcCdcclxuXHRcdEBidG5TdGFydCA9ICQgJy5zdGFydC12aWV3IC5idG4tc3RhcnQnXHJcblx0XHRAY291bnREb3duTnVtYmVycyA9IGpxICcuc3RhcnQtdmlldyAuY291bnQtZG93biAubnVtYmVyJ1xyXG5cdFx0QG51bWJlciA9IDNcclxuXHRcdEB0aW1lciA9IG51bGxcclxuXHRcdEBzY29yZSA9IDBcclxuXHRcdEB0YXAgPSBqcSAnI21fYnRuJ1xyXG5cdGluaXQ6KCktPlxyXG5cdFx0QGdldERvbVJlYWR5KClcclxuXHRnZXREb21SZWFkeTooKS0+XHJcblx0XHRqcSAnLmNvbnRlbnQ+ZGl2JyMgc2V0IGRpdidzIGhlaWdodCBcclxuXHRcdFx0LmhlaWdodCBcIiN7QHBIZWlnaHR9cmVtXCJcclxuXHJcbkdhbWUucHJvdG90eXBlLmhvbWVQYWdlID0gKCktPlxyXG5cdEBzdGFydFZpZXcuc2hvdygpXHJcblx0QGJhY2tkcm9wLnNob3coKVxyXG5cdEBiZWdpbm5pbmcuYW5pbWF0aW9uQ3NzICdib3VuY2VJblVwJ1xyXG5cdEBob21lUGFnZUJpbmRFdmVudCgpXHJcblxyXG5HYW1lLnByb3RvdHlwZS5ob21lUGFnZUJpbmRFdmVudCA9ICgpLT5cclxuXHRfdGhpcyA9IEBcclxuXHRAYnRuU3RhcnQub25lICd0YXAnLCgpLT5cclxuXHRcdF90aGlzLnRhcC5nZXQoMCkucGxheSgpXHJcblx0XHRfdGhpcy5iZWdpbm5pbmcuYW5pbWF0aW9uQ3NzICdib3VuY2VPdXRVcCcsKCktPlxyXG5cdFx0XHRqcSh0aGlzKS5oaWRlIF90aGlzLmNvdW50RG93bigpI3N0YXJ0IGNvdW50LWRvd25cclxuR2FtZS5wcm90b3R5cGUuY291bnREb3duID0gKCktPlxyXG5cdF90aGlzID0gQFxyXG5cdG1fY2QgPSAkICcjbV9jb3VudGRvd24nXHJcblx0QGNvdW50RG93bk51bWJlcnMuaGlkZSgpXHJcblx0QHN0YXJ0Vmlldy5zaG93KClcclxuXHRAYmFja2Ryb3Auc2hvdygpXHJcblx0QG51bWJlci0tXHJcblx0QHRpbWVyID0gc2V0VGltZW91dCAoKS0+XHJcblx0XHRfdGhpcy5jb3VudERvd24oKVxyXG5cdCwxMDAwXHJcblx0aWYgQG51bWJlcjwwXHJcblx0XHRAbnVtYmVyID0gM1xyXG5cdFx0QHN0YXJ0Vmlldy5oaWRlKClcclxuXHRcdEBiYWNrZHJvcC5oaWRlKClcclxuXHRcdGNsZWFyVGltZW91dCBAdGltZXJcclxuXHRcdHJldHVyblxyXG5cdEBjb3VudERvd25OdW1iZXJzXHJcblx0XHQuZXEgQG51bWJlclxyXG5cdFx0LnNob3coKVxyXG5cdG1fY2QuZ2V0KDApLnBsYXkoKVxyXG5cdHJldHVyblxyXG4iXX0=
