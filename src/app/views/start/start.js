(function() {
  var Game, global, testGo;

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

  global.clone = function(obj) {
    var arr, i, item, j, json, key, len, value;
    if (typeof obj !== 'object') {
      return obj;
    } else if (obj instanceof Array) {
      arr = [];
      for (i = j = 0, len = obj.length; j < len; i = ++j) {
        item = obj[i];
        arr[i] = clone(item);
      }
      return arr;
    } else if (obj instanceof Object) {
      json = {};
      for (key in obj) {
        value = obj[key];
        json[key] = clone(obj[key]);
      }
      return json;
    }
  };

  global.Game = Game = (function() {
    function Game() {
      this.rem = deviceWidth / 10;
      this.pHeight = 4540;
      this.wHeight = jq(window).height();
      this.startView = jq('.start-view');
      this.beginning = jq('.start-view .beginning');
      this.backdrop = jq('.backdrop');
      this.btnStart = $('.start-view .btn-start');
      this.countDownNumbers = jq('.start-view .count-down .number');
      this.number = 3;
      this.timer = null;
      this.seats = seatData;
      this.bars = barData;
      this.yellowSeatNum = 5;
      this.people = 22;
      this.seatR = seatData[0].length;
      this.seatC = 2 || seatData.length;
      this.score = 0;
      this.hScore = +localStorage.getItem('hScore') || 0;
      this.cur = 1;
      this.step = -100;
      this.speed = 9000;
      this.m_bgm = $('#m_bgm').get(0);
      this.m_btn = $('#m_btn').get(0);
      this.m_correct = $('#m_correct').get(0);
      this.m_wronge = $('#m_wronge').get(0);
      this.m_countdown = $('#m_countdown').get(0);
      this.m_newrecord = $('#m_newrecord').get(0);
    }

    Game.prototype.init = function() {
      this.getDomReady();
      this.arrangeBars_Seats();
      return this.putDomSeats_Bars();
    };

    Game.prototype.getDomReady = function() {
      jq('.content').height((this.pHeight / 72 * 2) + "rem");
      return $('body').on('touchmove', function(ev) {
        return ev.preventDefault();
      });
    };

    Game.prototype.arrangeBars_Seats = function() {
      var c, colume, column, copyBars, copySeats, j, k, l, len, len1, len2, len3, m, r, row;
      copyBars = clone(barData);
      for (c = j = 0, len = copyBars.length; j < len; c = ++j) {
        colume = copyBars[c];
        for (r = k = 0, len1 = colume.length; k < len1; r = ++k) {
          row = colume[r];
          copyBars[c][r].y += this.pHeight;
        }
      }
      this.bars = this.bars.concat(copyBars);
      copySeats = clone(seatData);
      for (c = l = 0, len2 = copySeats.length; l < len2; c = ++l) {
        column = copySeats[c];
        for (r = m = 0, len3 = column.length; m < len3; r = ++m) {
          row = column[r];
          copySeats[c][r].y += this.pHeight;
        }
      }
      return this.seats = seatData.concat(copySeats);
    };

    Game.prototype.putDomSeats_Bars = function() {
      var bar, c, column, j, k, l, len, len1, len2, people, r, ref, ref1, results, row, seat;
      ref = this.bars;
      for (c = j = 0, len = ref.length; j < len; c = ++j) {
        column = ref[c];
        for (r = k = 0, len1 = column.length; k < len1; r = ++k) {
          row = column[r];
          bar = this.bars[c][r];
          jq('<i></i>').addClass(function() {
            var addedClass;
            addedClass = 'bar';
            if (!(c % 2)) {
              addedClass += ' left';
            } else {
              addedClass += ' right';
            }
            if (!(r % 2)) {
              addedClass += ' top';
            } else {
              addedClass += ' bottom';
            }
            return addedClass;
          }).css({
            width: (214 / 72) + "rem",
            height: (43 / 72) + "rem",
            top: (bar.y / 72) + "rem",
            left: (bar.x / 72) + "rem"
          }).appendTo('.content');
        }
      }
      ref1 = this.seats;
      results = [];
      for (c = l = 0, len2 = ref1.length; l < len2; c = ++l) {
        column = ref1[c];
        results.push((function() {
          var len3, m, results1;
          results1 = [];
          for (r = m = 0, len3 = column.length; m < len3; r = ++m) {
            row = column[r];
            seat = row;
            people = jq('<span></span>').addClass('people');
            results1.push(jq('<div></div>').on('touchmove', function(ev) {
              return ev.stopPropagation();
            }).addClass(function() {
              var addedClass;
              addedClass = 'seat';
              if (c % 2) {
                addedClass += ' right';
              } else {
                addedClass += ' left';
              }
              return addedClass;
            }).css({
              left: (seat.x / 72) + "rem",
              top: (seat.y / 72) + "rem",
              width: (201 / 72) + "rem",
              height: (178 / 72) + "rem"
            }).attr({
              c: c,
              r: r
            }).append(people).appendTo('.content'));
          }
          return results1;
        })());
      }
      return results;
    };

    return Game;

  })();

  Game.prototype.homePage = function() {
    this.startView.show();
    this.beginning.show();
    this.backdrop.show();
    this.beginning.animationCss('bounceInUp');
    this.homePageBindEvent();
    this.hScore = +localStorage.getItem('hScore') || 0;
    jq('.start-view .history-score').text(this.hScore);
    return jq('.content').css('bottom', 0);
  };

  Game.prototype.homePageBindEvent = function() {
    var _this;
    _this = this;
    this.btnStart.off();
    return this.btnStart.one('tap', function() {
      _this.m_btn.play();
      return _this.beginning.animationCss('bounceOutUp', function() {
        return jq(this).hide(_this.countDown());
      });
    });
  };

  Game.prototype.countDown = function() {
    var _this;
    _this = this;
    this.m_countdown.play();
    this.score = 0;
    $('.score').text(0);
    jq('.content').css('bottom', 0);
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
      this.mStart();
      clearTimeout(this.timer);
      return;
    }
    this.countDownNumbers.eq(this.number).show();
  };

  global.game = new Game();

  game.init();

  testGo = function() {
    return setTimeout(function() {
      return game.mStart();
    }, 10);
  };

  testGo();

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3Mvc3RhcnQvc3RhcnQuanMiLCJzb3VyY2VzIjpbInZpZXdzL3N0YXJ0L3N0YXJ0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O0VBQUEsQ0FBQyxDQUFDLFVBQUYsQ0FBQTs7RUFDQSxNQUFBLEdBQVM7O0VBQ1QsTUFBTSxDQUFDLEVBQVAsR0FBWTs7RUFDWixNQUFNLENBQUMsV0FBUCxHQUFxQixRQUFRLENBQUMsZUFBZSxDQUFDOztFQUM5QyxRQUFRLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxRQUEvQixHQUE0QyxDQUFDLFdBQUEsR0FBWSxFQUFiLENBQUEsR0FBZ0I7O0VBQzVELEVBQUUsQ0FBQyxFQUFFLENBQUMsWUFBTixHQUFtQixTQUFDLGFBQUQsRUFBZSxFQUFmO0FBQ2pCLFFBQUE7SUFBQSxZQUFBLEdBQWU7V0FDZixJQUFJLENBQUMsUUFBTCxDQUFjLFdBQUEsR0FBWSxhQUExQixDQUNDLENBQUMsR0FERixDQUNNLFlBRE4sRUFDbUIsU0FBQTtNQUNqQixFQUFBLENBQUcsSUFBSCxDQUFRLENBQUMsV0FBVCxDQUFxQixXQUFBLEdBQVksYUFBakM7TUFDQSxFQUFBLElBQUksRUFBRSxDQUFDLElBQUgsQ0FBUSxFQUFBLENBQUcsSUFBSCxDQUFSO0lBRmEsQ0FEbkI7RUFGaUI7O0VBT25CLE1BQU0sQ0FBQyxLQUFQLEdBQWUsU0FBQyxHQUFEO0FBQ2QsUUFBQTtJQUFBLElBQUcsT0FBTyxHQUFQLEtBQWdCLFFBQW5CO2FBQ0MsSUFERDtLQUFBLE1BRUssSUFBRyxHQUFBLFlBQWUsS0FBbEI7TUFDSixHQUFBLEdBQU07QUFDTixXQUFBLDZDQUFBOztRQUNDLEdBQUksQ0FBQSxDQUFBLENBQUosR0FBUyxLQUFBLENBQU0sSUFBTjtBQURWO2FBRUEsSUFKSTtLQUFBLE1BS0EsSUFBRyxHQUFBLFlBQWUsTUFBbEI7TUFDSixJQUFBLEdBQU87QUFDUCxXQUFBLFVBQUE7O1FBQ0MsSUFBSyxDQUFBLEdBQUEs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QVgsQ0FBQTtJQUNBLElBQUMsQ0FBQSxRQUFRLENBQUMsSUFBVixDQUFBO0lBQ0EsSUFBQyxDQUFBLE1BQUQ7SUFDQSxJQUFDLENBQUEsS0FBRCxHQUFTLFVBQUEsQ0FBVyxTQUFBO2FBQ25CLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBaEIsQ0FBcUIsS0FBckI7SUFEbUIsQ0FBWCxFQUVSLElBRlE7SUFHVCxJQUFHLElBQUMsQ0FBQSxNQUFELEdBQVEsQ0FBWDtNQUNDLElBQUMsQ0FBQSxNQUFELEdBQVU7TUFDVixJQUFDLENBQUEsU0FBUyxDQUFDLElBQVgsQ0FBQTtNQUNBLElBQUMsQ0FBQSxRQUFRLENBQUMsSUFBVixDQUFBO01BQ0EsSUFBQyxDQUFBLE1BQUQsQ0FBQTtNQUVBLFlBQUEsQ0FBYSxJQUFDLENBQUEsS0FBZDtBQUNBLGFBUEQ7O0lBUUEsSUFBQyxDQUFBLGdCQUNBLENBQUMsRUFERixDQUNLLElBQUMsQ0FBQSxNQUROLENBRUMsQ0FBQyxJQUZGLENBQUE7RUF2QjBCOztFQTRCM0IsTUFBTSxDQUFDLElBQVAsR0FBa0IsSUFBQSxJQUFBLENBQUE7O0VBQ2xCLElBQUksQ0FBQyxJQUFMLENBQUE7O0VBQ0EsTUFBQSxHQUFTLFNBQUE7V0FDUixVQUFBLENBQVcsU0FBQTthQUNWLElBQUksQ0FBQyxNQUFMLENBQUE7SUFEVSxDQUFYLEVBRUMsRUFGRDtFQURROztFQUlULE1BQUEsQ0FBQTtBQTdLQSIsInNvdXJjZXNDb250ZW50IjpbIiQubm9Db25mbGljdCgpXHJcbmdsb2JhbCA9IHdpbmRvd1xyXG53aW5kb3cuanEgPSBqUXVlcnlcclxuZ2xvYmFsLmRldmljZVdpZHRoID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoXHJcbmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5mb250U2l6ZSA9IFwiI3tkZXZpY2VXaWR0aC8xMH1weFwiXHJcbmpxLmZuLmFuaW1hdGlvbkNzcz0oYW5pbWF0aW9uTmFtZSxmbiktPlxyXG5cdFx0YW5pbWF0aW9uRW5kID0gJ3dlYmtpdEFuaW1hdGlvbkVuZCBtb3pBbmltYXRpb25FbmQgTVNBbmltYXRpb25FbmQgb2FuaW1hdGlvbmVuZCBhbmltYXRpb25lbmQnXHJcblx0XHR0aGlzLmFkZENsYXNzIFwiYW5pbWF0ZWQgI3thbmltYXRpb25OYW1lfVwiXHJcblx0XHRcdC5vbmUgYW5pbWF0aW9uRW5kLCgpLT5cclxuXHRcdFx0XHRqcSh0aGlzKS5yZW1vdmVDbGFzcyBcImFuaW1hdGVkICN7YW5pbWF0aW9uTmFtZX1cIlxyXG5cdFx0XHRcdGZuJiZmbi5jYWxsIGpxIHRoaXNcclxuXHRcdFx0XHRyZXR1cm5cclxuZ2xvYmFsLmNsb25lID0gKG9iaiktPlxyXG5cdGlmIHR5cGVvZiBvYmogaXNudCAnb2JqZWN0J1xyXG5cdFx0b2JqXHJcblx0ZWxzZSBpZiBvYmogaW5zdGFuY2VvZiBBcnJheVxyXG5cdFx0YXJyID0gW11cclxuXHRcdGZvciBpdGVtLGkgaW4gb2JqXHJcblx0XHRcdGFycltpXSA9IGNsb25lIGl0ZW1cclxuXHRcdGFyclxyXG5cdGVsc2UgaWYgb2JqIGluc3RhbmNlb2YgT2JqZWN0XHJcblx0XHRqc29uID0ge31cclxuXHRcdGZvciBrZXksdmFsdWUgb2Ygb2JqXHJcblx0XHRcdGpzb25ba2V5XSA9IGNsb25lIG9ialtrZXldXHJcblx0XHRqc29uXHJcblxyXG5nbG9iYWwuR2FtZSA9IGNsYXNzIEdhbWVcclxuXHRjb25zdHJ1Y3RvcjooKS0+XHJcblx0XHRAcmVtID0gZGV2aWNlV2lkdGgvMTBcclxuXHRcdEBwSGVpZ2h0ID0gNDU0MFxyXG5cdFx0QHdIZWlnaHQgPSBqcSh3aW5kb3cpLmhlaWdodCgpIyBzY3JlZW4gaGVpZ2h0XHJcblx0XHRAc3RhcnRWaWV3ID0ganEgJy5zdGFydC12aWV3J1xyXG5cdFx0QGJlZ2lubmluZyA9IGpxICcuc3RhcnQtdmlldyAuYmVnaW5uaW5nJ1xyXG5cdFx0QGJhY2tkcm9wID0ganEgJy5iYWNrZHJvcCdcclxuXHRcdEBidG5TdGFydCA9ICQgJy5zdGFydC12aWV3IC5idG4tc3RhcnQnXHJcblx0XHRAY291bnREb3duTnVtYmVycyA9IGpxICcuc3RhcnQtdmlldyAuY291bnQtZG93biAubnVtYmVyJ1xyXG5cdFx0QG51bWJlciA9IDNcclxuXHRcdEB0aW1lciA9IG51bGxcclxuXHRcdEBzZWF0cyA9IHNlYXREYXRhXHJcblx0XHRAYmFycyA9IGJhckRhdGFcclxuXHRcdEB5ZWxsb3dTZWF0TnVtID0gNVxyXG5cdFx0QHBlb3BsZSA9IDIyXHJcblx0XHRAc2VhdFIgPSBzZWF0RGF0YVswXS5sZW5ndGhcclxuXHRcdEBzZWF0QyA9IDJ8fHNlYXREYXRhLmxlbmd0aFxyXG5cdFx0QHNjb3JlID0gMFxyXG5cdFx0QGhTY29yZSA9ICtsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaFNjb3JlJykgb3IgMFxyXG5cdFx0QGN1ciA9IDFcclxuXHRcdEBzdGVwID0gLTEwMFxyXG5cdFx0QHNwZWVkID0gOTAwMFxyXG5cdFx0QG1fYmdtID0gJCgnI21fYmdtJykuZ2V0KDApXHJcblx0XHRAbV9idG4gPSAkKCcjbV9idG4nKS5nZXQoMClcclxuXHRcdEBtX2NvcnJlY3QgPSAkKCcjbV9jb3JyZWN0JykuZ2V0KDApXHJcblx0XHRAbV93cm9uZ2UgPSAkKCcjbV93cm9uZ2UnKS5nZXQoMClcclxuXHRcdEBtX2NvdW50ZG93biA9ICQoJyNtX2NvdW50ZG93bicpLmdldCgwKVxyXG5cdFx0QG1fbmV3cmVjb3JkID0gJCgnI21fbmV3cmVjb3JkJykuZ2V0KDApXHJcblx0XHQjIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnY3VyJywge1xyXG5cdFx0IyBcdGdldDooKXtcclxuXHRcdCMgXHRcdHJldHVyblxyXG5cdFx0IyBcdH1cclxuXHRcdCMgfSlcclxuXHRpbml0OigpLT5cclxuXHRcdEBnZXREb21SZWFkeSgpXHJcblx0XHRAYXJyYW5nZUJhcnNfU2VhdHMoKVxyXG5cdFx0QHB1dERvbVNlYXRzX0JhcnMoKVxyXG5cdGdldERvbVJlYWR5OigpLT5cclxuXHRcdGpxICcuY29udGVudCcjIHNldCBjb250ZW50J3MgaGVpZ2h0IFxyXG5cdFx0XHQuaGVpZ2h0IFwiI3tAcEhlaWdodC83MioyfXJlbVwiXHJcblx0XHQkICdib2R5J1xyXG5cdFx0XHQub24gJ3RvdWNobW92ZScsKGV2KS0+XHJcblx0XHRcdFx0ZXYucHJldmVudERlZmF1bHQoKVxyXG5cdGFycmFuZ2VCYXJzX1NlYXRzOigpLT4j5aSN5Yi25bqn5L2N5Y+K5om25omLXHJcblx0XHRjb3B5QmFycyA9IGNsb25lIGJhckRhdGFcclxuXHRcdGZvciBjb2x1bWUsYyBpbiBjb3B5QmFyc1xyXG5cdFx0XHRmb3Igcm93LHIgaW4gY29sdW1lXHJcblx0XHRcdFx0Y29weUJhcnNbY11bcl0ueSArPSBAcEhlaWdodFxyXG5cdFx0QGJhcnMgPSBAYmFycy5jb25jYXQgY29weUJhcnNcclxuXHRcdGNvcHlTZWF0cyA9IGNsb25lIHNlYXREYXRhXHJcblx0XHRmb3IgY29sdW1uLGMgaW4gY29weVNlYXRzXHJcblx0XHRcdGZvciByb3csciBpbiBjb2x1bW5cclxuXHRcdFx0XHRjb3B5U2VhdHNbY11bcl0ueSArPSBAcEhlaWdodFxyXG5cdFx0QHNlYXRzID0gc2VhdERhdGEuY29uY2F0IGNvcHlTZWF0cyAj5bqn5L2N55qE5pWw5o2u57uT5p6E5Li677yaMSwy6aG55piv56ys5LiA5byg5Zu+55qEc2VhdHMo5byA5aeL5Zyo6aG16Z2i5LiK6Z2iKe+8jDMsNOmhueaYr+esrOS6jOW8oOWbvueahHNlYXRzKOW8gOWni+WcqOWxj+W5leWGhSlcclxuXHRwdXREb21TZWF0c19CYXJzOigpLT5cclxuXHRcdGZvciBjb2x1bW4sYyBpbiBAYmFyc1xyXG5cdFx0XHRmb3Igcm93LHIgaW4gY29sdW1uXHJcblx0XHRcdFx0YmFyID0gQGJhcnNbY11bcl1cclxuXHRcdFx0XHRqcSAnPGk+PC9pPidcclxuXHRcdFx0XHRcdC5hZGRDbGFzcyAoKS0+XHJcblx0XHRcdFx0XHRcdGFkZGVkQ2xhc3MgPSAnYmFyJ1xyXG5cdFx0XHRcdFx0XHRpZiAhKGMlMikgdGhlbiBhZGRlZENsYXNzKz0gJyBsZWZ0JyBlbHNlIGFkZGVkQ2xhc3MrPScgcmlnaHQnXHJcblx0XHRcdFx0XHRcdGlmICEociUyKSB0aGVuIGFkZGVkQ2xhc3MrPSAnIHRvcCcgZWxzZSBhZGRlZENsYXNzKz0nIGJvdHRvbSdcclxuXHRcdFx0XHRcdFx0YWRkZWRDbGFzc1xyXG5cdFx0XHRcdFx0LmNzc1xyXG5cdFx0XHRcdFx0XHR3aWR0aDpcIiN7MjE0LzcyfXJlbVwiXHJcblx0XHRcdFx0XHRcdGhlaWdodDpcIiN7NDMvNzJ9cmVtXCJcclxuXHRcdFx0XHRcdFx0dG9wOlwiI3tiYXIueS83Mn1yZW1cIlxyXG5cdFx0XHRcdFx0XHRsZWZ0OlwiI3tiYXIueC83Mn1yZW1cIlxyXG5cdFx0XHRcdFx0LmFwcGVuZFRvICcuY29udGVudCdcclxuXHRcdGZvciBjb2x1bW4sYyBpbiBAc2VhdHNcclxuXHRcdFx0Zm9yIHJvdyxyIGluIGNvbHVtblxyXG5cdFx0XHRcdHNlYXQgPSByb3dcclxuXHRcdFx0XHRwZW9wbGUgPSBqcSAnPHNwYW4+PC9zcGFuPidcclxuXHRcdFx0XHRcdC5hZGRDbGFzcyAncGVvcGxlJ1xyXG5cdFx0XHRcdGpxICc8ZGl2PjwvZGl2PidcclxuXHRcdFx0XHRcdC5vbiAndG91Y2htb3ZlJywoZXYpLT5cclxuXHRcdFx0XHRcdFx0ZXYuc3RvcFByb3BhZ2F0aW9uKClcclxuXHRcdFx0XHRcdC5hZGRDbGFzcyAoKS0+XHJcblx0XHRcdFx0XHRcdGFkZGVkQ2xhc3MgPSAnc2VhdCdcclxuXHRcdFx0XHRcdFx0aWYgYyUyIHRoZW4gYWRkZWRDbGFzcys9JyByaWdodCcgZWxzZSBhZGRlZENsYXNzKz0nIGxlZnQnXHJcblx0XHRcdFx0XHRcdGFkZGVkQ2xhc3NcclxuXHRcdFx0XHRcdC5jc3NcclxuXHRcdFx0XHRcdFx0bGVmdDpcIiN7c2VhdC54LzcyfXJlbVwiXHJcblx0XHRcdFx0XHRcdHRvcDpcIiN7c2VhdC55LzcyfXJlbVwiXHJcblx0XHRcdFx0XHRcdHdpZHRoOlwiI3syMDEvNzJ9cmVtXCJcclxuXHRcdFx0XHRcdFx0aGVpZ2h0OlwiI3sxNzgvNzJ9cmVtXCJcclxuXHRcdFx0XHRcdC5hdHRyXHJcblx0XHRcdFx0XHRcdGM6YyxcclxuXHRcdFx0XHRcdFx0cjpyXHJcblx0XHRcdFx0XHQuYXBwZW5kIHBlb3BsZVxyXG5cdFx0XHRcdFx0LmFwcGVuZFRvICcuY29udGVudCdcclxuR2FtZS5wcm90b3R5cGUuaG9tZVBhZ2UgPSAoKS0+XHJcblx0QHN0YXJ0Vmlldy5zaG93KClcclxuXHRAYmVnaW5uaW5nLnNob3coKVxyXG5cdEBiYWNrZHJvcC5zaG93KClcclxuXHRAYmVnaW5uaW5nLmFuaW1hdGlvbkNzcyAnYm91bmNlSW5VcCdcclxuXHRAaG9tZVBhZ2VCaW5kRXZlbnQoKVxyXG5cdEBoU2NvcmUgPSArbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2hTY29yZScpIG9yIDBcclxuXHRqcSAnLnN0YXJ0LXZpZXcgLmhpc3Rvcnktc2NvcmUnXHJcblx0XHQudGV4dCBAaFNjb3JlXHJcblx0anEgJy5jb250ZW50J1xyXG5cdFx0LmNzcyAnYm90dG9tJywwXHJcblxyXG5HYW1lLnByb3RvdHlwZS5ob21lUGFnZUJpbmRFdmVudCA9ICgpLT5cclxuXHRfdGhpcyA9IEBcclxuXHRAYnRuU3RhcnQub2ZmKClcclxuXHRAYnRuU3RhcnQub25lICd0YXAnLCgpLT5cclxuXHRcdF90aGlzLm1fYnRuLnBsYXkoKVxyXG5cdFx0X3RoaXMuYmVnaW5uaW5nLmFuaW1hdGlvbkNzcyAnYm91bmNlT3V0VXAnLCgpLT5cclxuXHRcdFx0XHRqcSh0aGlzKS5oaWRlIF90aGlzLmNvdW50RG93bigpI3N0YXJ0IGNvdW50LWRvd25cclxuXHJcbkdhbWUucHJvdG90eXBlLmNvdW50RG93biA9ICgpLT5cclxuXHRfdGhpcyA9IEBcclxuXHRAbV9jb3VudGRvd24ucGxheSgpXHJcblx0QHNjb3JlID0gMFxyXG5cdCQgJy5zY29yZSdcclxuXHRcdC50ZXh0IDBcclxuXHRqcSAnLmNvbnRlbnQnXHJcblx0XHQuY3NzICdib3R0b20nLDBcclxuXHRAY291bnREb3duTnVtYmVycy5oaWRlKClcclxuXHRAc3RhcnRWaWV3LnNob3coKVxyXG5cdEBiYWNrZHJvcC5zaG93KClcclxuXHRAbnVtYmVyLS1cclxuXHRAdGltZXIgPSBzZXRUaW1lb3V0ICgpLT5cclxuXHRcdF90aGlzLmNvdW50RG93bi5jYWxsKF90aGlzKVxyXG5cdCwxMDAwXHJcblx0aWYgQG51bWJlcjwwXHJcblx0XHRAbnVtYmVyID0gM1xyXG5cdFx0QHN0YXJ0Vmlldy5oaWRlKClcclxuXHRcdEBiYWNrZHJvcC5oaWRlKClcclxuXHRcdEBtU3RhcnQoKVxyXG5cdFx0IyB0ZXN0R28oKVxyXG5cdFx0Y2xlYXJUaW1lb3V0IEB0aW1lclxyXG5cdFx0cmV0dXJuXHJcblx0QGNvdW50RG93bk51bWJlcnNcclxuXHRcdC5lcSBAbnVtYmVyXHJcblx0XHQuc2hvdygpXHJcblx0cmV0dXJuXHJcblxyXG5nbG9iYWwuZ2FtZSA9IG5ldyBHYW1lKClcclxuZ2FtZS5pbml0KClcclxudGVzdEdvID0gKCktPlxyXG5cdHNldFRpbWVvdXQgKCktPlxyXG5cdFx0Z2FtZS5tU3RhcnQoKVxyXG5cdCwxMFxyXG50ZXN0R28oKVxyXG4jZ2FtZS5ob21lUGFnZSgpIl19
