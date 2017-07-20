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
      this.speed = 8000;
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

  game.homePage();

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3Mvc3RhcnQvc3RhcnQuanMiLCJzb3VyY2VzIjpbInZpZXdzL3N0YXJ0L3N0YXJ0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLE1BQUE7O0VBQUEsQ0FBQyxDQUFDLFVBQUYsQ0FBQTs7RUFDQSxNQUFBLEdBQVM7O0VBQ1QsTUFBTSxDQUFDLEVBQVAsR0FBWTs7RUFDWixNQUFNLENBQUMsV0FBUCxHQUFxQixRQUFRLENBQUMsZUFBZSxDQUFDOztFQUM5QyxRQUFRLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxRQUEvQixHQUE0QyxDQUFDLFdBQUEsR0FBWSxFQUFiLENBQUEsR0FBZ0I7O0VBQzVELEVBQUUsQ0FBQyxFQUFFLENBQUMsWUFBTixHQUFtQixTQUFDLGFBQUQsRUFBZSxFQUFmO0FBQ2pCLFFBQUE7SUFBQSxZQUFBLEdBQWU7V0FDZixJQUFJLENBQUMsUUFBTCxDQUFjLFdBQUEsR0FBWSxhQUExQixDQUNDLENBQUMsR0FERixDQUNNLFlBRE4sRUFDbUIsU0FBQTtNQUNqQixFQUFBLENBQUcsSUFBSCxDQUFRLENBQUMsV0FBVCxDQUFxQixXQUFBLEdBQVksYUFBakM7TUFDQSxFQUFBLElBQUksRUFBRSxDQUFDLElBQUgsQ0FBUSxFQUFBLENBQUcsSUFBSCxDQUFSO0lBRmEsQ0FEbkI7RUFGaUI7O0VBT25CLE1BQU0sQ0FBQyxLQUFQLEdBQWUsU0FBQyxHQUFEO0FBQ2QsUUFBQTtJQUFBLElBQUcsT0FBTyxHQUFQLEtBQWdCLFFBQW5CO2FBQ0MsSUFERDtLQUFBLE1BRUssSUFBRyxHQUFBLFlBQWUsS0FBbEI7TUFDSixHQUFBLEdBQU07QUFDTixXQUFBLDZDQUFBOztRQUNDLEdBQUksQ0FBQSxDQUFBLENBQUosR0FBUyxLQUFBLENBQU0sSUFBTjtBQURWO2FBRUEsSUFKSTtLQUFBLE1BS0EsSUFBRyxHQUFBLFlBQWUsTUFBbEI7TUFDSixJQUFBLEdBQU87QUFDUCxXQUFBLFVBQUE7O1FBQ0MsSUFBSyxDQUFBLEdBQUEs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QVgsQ0FBQTtJQUNBLElBQUMsQ0FBQSxRQUFRLENBQUMsSUFBVixDQUFBO0lBQ0EsSUFBQyxDQUFBLE1BQUQ7SUFDQSxJQUFDLENBQUEsS0FBRCxHQUFTLFVBQUEsQ0FBVyxTQUFBO2FBQ25CLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBaEIsQ0FBcUIsS0FBckI7SUFEbUIsQ0FBWCxFQUVSLElBRlE7SUFHVCxJQUFHLElBQUMsQ0FBQSxNQUFELEdBQVEsQ0FBWDtNQUNDLElBQUMsQ0FBQSxNQUFELEdBQVU7TUFDVixJQUFDLENBQUEsU0FBUyxDQUFDLElBQVgsQ0FBQTtNQUNBLElBQUMsQ0FBQSxRQUFRLENBQUMsSUFBVixDQUFBO01BQ0EsSUFBQyxDQUFBLE1BQUQsQ0FBQTtNQUVBLFlBQUEsQ0FBYSxJQUFDLENBQUEsS0FBZDtBQUNBLGFBUEQ7O0lBUUEsSUFBQyxDQUFBLGdCQUNBLENBQUMsRUFERixDQUNLLElBQUMsQ0FBQSxNQUROLENBRUMsQ0FBQyxJQUZGLENBQUE7RUF2QjBCOztFQTRCM0IsTUFBTSxDQUFDLElBQVAsR0FBa0IsSUFBQSxJQUFBLENBQUE7O0VBQ2xCLElBQUksQ0FBQyxJQUFMLENBQUE7O0VBQ0EsTUFBQSxHQUFTLFNBQUE7V0FDUixVQUFBLENBQVcsU0FBQTthQUNWLElBQUksQ0FBQyxNQUFMLENBQUE7SUFEVSxDQUFYLEVBRUMsRUFGRDtFQURROztFQUtULElBQUksQ0FBQyxRQUFMLENBQUE7QUF6S0EiLCJzb3VyY2VzQ29udGVudCI6WyIkLm5vQ29uZmxpY3QoKVxyXG5nbG9iYWwgPSB3aW5kb3dcclxud2luZG93LmpxID0galF1ZXJ5XHJcbmdsb2JhbC5kZXZpY2VXaWR0aCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aFxyXG5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuZm9udFNpemUgPSBcIiN7ZGV2aWNlV2lkdGgvMTB9cHhcIlxyXG5qcS5mbi5hbmltYXRpb25Dc3M9KGFuaW1hdGlvbk5hbWUsZm4pLT5cclxuXHRcdGFuaW1hdGlvbkVuZCA9ICd3ZWJraXRBbmltYXRpb25FbmQgbW96QW5pbWF0aW9uRW5kIE1TQW5pbWF0aW9uRW5kIG9hbmltYXRpb25lbmQgYW5pbWF0aW9uZW5kJ1xyXG5cdFx0dGhpcy5hZGRDbGFzcyBcImFuaW1hdGVkICN7YW5pbWF0aW9uTmFtZX1cIlxyXG5cdFx0XHQub25lIGFuaW1hdGlvbkVuZCwoKS0+XHJcblx0XHRcdFx0anEodGhpcykucmVtb3ZlQ2xhc3MgXCJhbmltYXRlZCAje2FuaW1hdGlvbk5hbWV9XCJcclxuXHRcdFx0XHRmbiYmZm4uY2FsbCBqcSB0aGlzXHJcblx0XHRcdFx0cmV0dXJuXHJcbmdsb2JhbC5jbG9uZSA9IChvYmopLT5cclxuXHRpZiB0eXBlb2Ygb2JqIGlzbnQgJ29iamVjdCdcclxuXHRcdG9ialxyXG5cdGVsc2UgaWYgb2JqIGluc3RhbmNlb2YgQXJyYXlcclxuXHRcdGFyciA9IFtdXHJcblx0XHRmb3IgaXRlbSxpIGluIG9ialxyXG5cdFx0XHRhcnJbaV0gPSBjbG9uZSBpdGVtXHJcblx0XHRhcnJcclxuXHRlbHNlIGlmIG9iaiBpbnN0YW5jZW9mIE9iamVjdFxyXG5cdFx0anNvbiA9IHt9XHJcblx0XHRmb3Iga2V5LHZhbHVlIG9mIG9ialxyXG5cdFx0XHRqc29uW2tleV0gPSBjbG9uZSBvYmpba2V5XVxyXG5cdFx0anNvblxyXG5cclxuZ2xvYmFsLkdhbWUgPSBjbGFzcyBHYW1lXHJcblx0Y29uc3RydWN0b3I6KCktPlxyXG5cdFx0QHJlbSA9IGRldmljZVdpZHRoLzEwXHJcblx0XHRAcEhlaWdodCA9IDQ1NDBcclxuXHRcdEB3SGVpZ2h0ID0ganEod2luZG93KS5oZWlnaHQoKSMgc2NyZWVuIGhlaWdodFxyXG5cdFx0QHN0YXJ0VmlldyA9IGpxICcuc3RhcnQtdmlldydcclxuXHRcdEBiZWdpbm5pbmcgPSBqcSAnLnN0YXJ0LXZpZXcgLmJlZ2lubmluZydcclxuXHRcdEBiYWNrZHJvcCA9IGpxICcuYmFja2Ryb3AnXHJcblx0XHRAYnRuU3RhcnQgPSAkICcuc3RhcnQtdmlldyAuYnRuLXN0YXJ0J1xyXG5cdFx0QGNvdW50RG93bk51bWJlcnMgPSBqcSAnLnN0YXJ0LXZpZXcgLmNvdW50LWRvd24gLm51bWJlcidcclxuXHRcdEBudW1iZXIgPSAzXHJcblx0XHRAdGltZXIgPSBudWxsXHJcblx0XHRAc2VhdHMgPSBzZWF0RGF0YVxyXG5cdFx0QGJhcnMgPSBiYXJEYXRhXHJcblx0XHRAeWVsbG93U2VhdE51bSA9IDVcclxuXHRcdEBwZW9wbGUgPSAyMlxyXG5cdFx0QHNlYXRSID0gc2VhdERhdGFbMF0ubGVuZ3RoXHJcblx0XHRAc2VhdEMgPSAyfHxzZWF0RGF0YS5sZW5ndGhcclxuXHRcdEBzY29yZSA9IDBcclxuXHRcdEBoU2NvcmUgPSArbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2hTY29yZScpIG9yIDBcclxuXHRcdEBjdXIgPSAxXHJcblx0XHRAc3RlcCA9IC0xMDBcclxuXHRcdEBzcGVlZCA9IDgwMDBcclxuXHRcdEBtX2JnbSA9ICQoJyNtX2JnbScpLmdldCgwKVxyXG5cdFx0QG1fYnRuID0gJCgnI21fYnRuJykuZ2V0KDApXHJcblx0XHRAbV9jb3JyZWN0ID0gJCgnI21fY29ycmVjdCcpLmdldCgwKVxyXG5cdFx0QG1fd3JvbmdlID0gJCgnI21fd3JvbmdlJykuZ2V0KDApXHJcblx0XHRAbV9jb3VudGRvd24gPSAkKCcjbV9jb3VudGRvd24nKS5nZXQoMClcclxuXHRcdEBtX25ld3JlY29yZCA9ICQoJyNtX25ld3JlY29yZCcpLmdldCgwKVxyXG5cdGluaXQ6KCktPlxyXG5cdFx0QGdldERvbVJlYWR5KClcclxuXHRcdEBhcnJhbmdlQmFyc19TZWF0cygpXHJcblx0XHRAcHV0RG9tU2VhdHNfQmFycygpXHJcblx0Z2V0RG9tUmVhZHk6KCktPlxyXG5cdFx0anEgJy5jb250ZW50JyMgc2V0IGNvbnRlbnQncyBoZWlnaHQgXHJcblx0XHRcdC5oZWlnaHQgXCIje0BwSGVpZ2h0LzcyKjJ9cmVtXCJcclxuXHRcdCQgJ2JvZHknXHJcblx0XHRcdC5vbiAndG91Y2htb3ZlJywoZXYpLT5cclxuXHRcdFx0XHRldi5wcmV2ZW50RGVmYXVsdCgpXHJcblx0YXJyYW5nZUJhcnNfU2VhdHM6KCktPiPlpI3liLbluqfkvY3lj4rmibbmiYtcclxuXHRcdGNvcHlCYXJzID0gY2xvbmUgYmFyRGF0YVxyXG5cdFx0Zm9yIGNvbHVtZSxjIGluIGNvcHlCYXJzXHJcblx0XHRcdGZvciByb3csciBpbiBjb2x1bWVcclxuXHRcdFx0XHRjb3B5QmFyc1tjXVtyXS55ICs9IEBwSGVpZ2h0XHJcblx0XHRAYmFycyA9IEBiYXJzLmNvbmNhdCBjb3B5QmFyc1xyXG5cdFx0Y29weVNlYXRzID0gY2xvbmUgc2VhdERhdGFcclxuXHRcdGZvciBjb2x1bW4sYyBpbiBjb3B5U2VhdHNcclxuXHRcdFx0Zm9yIHJvdyxyIGluIGNvbHVtblxyXG5cdFx0XHRcdGNvcHlTZWF0c1tjXVtyXS55ICs9IEBwSGVpZ2h0XHJcblx0XHRAc2VhdHMgPSBzZWF0RGF0YS5jb25jYXQgY29weVNlYXRzICPluqfkvY3nmoTmlbDmja7nu5PmnoTkuLrvvJoxLDLpobnmmK/nrKzkuIDlvKDlm77nmoRzZWF0cyjlvIDlp4vlnKjpobXpnaLkuIrpnaIp77yMMyw06aG55piv56ys5LqM5byg5Zu+55qEc2VhdHMo5byA5aeL5Zyo5bGP5bmV5YaFKVxyXG5cdHB1dERvbVNlYXRzX0JhcnM6KCktPlxyXG5cdFx0Zm9yIGNvbHVtbixjIGluIEBiYXJzXHJcblx0XHRcdGZvciByb3csciBpbiBjb2x1bW5cclxuXHRcdFx0XHRiYXIgPSBAYmFyc1tjXVtyXVxyXG5cdFx0XHRcdGpxICc8aT48L2k+J1xyXG5cdFx0XHRcdFx0LmFkZENsYXNzICgpLT5cclxuXHRcdFx0XHRcdFx0YWRkZWRDbGFzcyA9ICdiYXInXHJcblx0XHRcdFx0XHRcdGlmICEoYyUyKSB0aGVuIGFkZGVkQ2xhc3MrPSAnIGxlZnQnIGVsc2UgYWRkZWRDbGFzcys9JyByaWdodCdcclxuXHRcdFx0XHRcdFx0aWYgIShyJTIpIHRoZW4gYWRkZWRDbGFzcys9ICcgdG9wJyBlbHNlIGFkZGVkQ2xhc3MrPScgYm90dG9tJ1xyXG5cdFx0XHRcdFx0XHRhZGRlZENsYXNzXHJcblx0XHRcdFx0XHQuY3NzXHJcblx0XHRcdFx0XHRcdHdpZHRoOlwiI3syMTQvNzJ9cmVtXCJcclxuXHRcdFx0XHRcdFx0aGVpZ2h0OlwiI3s0My83Mn1yZW1cIlxyXG5cdFx0XHRcdFx0XHR0b3A6XCIje2Jhci55LzcyfXJlbVwiXHJcblx0XHRcdFx0XHRcdGxlZnQ6XCIje2Jhci54LzcyfXJlbVwiXHJcblx0XHRcdFx0XHQuYXBwZW5kVG8gJy5jb250ZW50J1xyXG5cdFx0Zm9yIGNvbHVtbixjIGluIEBzZWF0c1xyXG5cdFx0XHRmb3Igcm93LHIgaW4gY29sdW1uXHJcblx0XHRcdFx0c2VhdCA9IHJvd1xyXG5cdFx0XHRcdHBlb3BsZSA9IGpxICc8c3Bhbj48L3NwYW4+J1xyXG5cdFx0XHRcdFx0LmFkZENsYXNzICdwZW9wbGUnXHJcblx0XHRcdFx0anEgJzxkaXY+PC9kaXY+J1xyXG5cdFx0XHRcdFx0Lm9uICd0b3VjaG1vdmUnLChldiktPlxyXG5cdFx0XHRcdFx0XHRldi5zdG9wUHJvcGFnYXRpb24oKVxyXG5cdFx0XHRcdFx0LmFkZENsYXNzICgpLT5cclxuXHRcdFx0XHRcdFx0YWRkZWRDbGFzcyA9ICdzZWF0J1xyXG5cdFx0XHRcdFx0XHRpZiBjJTIgdGhlbiBhZGRlZENsYXNzKz0nIHJpZ2h0JyBlbHNlIGFkZGVkQ2xhc3MrPScgbGVmdCdcclxuXHRcdFx0XHRcdFx0YWRkZWRDbGFzc1xyXG5cdFx0XHRcdFx0LmNzc1xyXG5cdFx0XHRcdFx0XHRsZWZ0OlwiI3tzZWF0LngvNzJ9cmVtXCJcclxuXHRcdFx0XHRcdFx0dG9wOlwiI3tzZWF0LnkvNzJ9cmVtXCJcclxuXHRcdFx0XHRcdFx0d2lkdGg6XCIjezIwMS83Mn1yZW1cIlxyXG5cdFx0XHRcdFx0XHRoZWlnaHQ6XCIjezE3OC83Mn1yZW1cIlxyXG5cdFx0XHRcdFx0LmF0dHJcclxuXHRcdFx0XHRcdFx0YzpjLFxyXG5cdFx0XHRcdFx0XHRyOnJcclxuXHRcdFx0XHRcdC5hcHBlbmQgcGVvcGxlXHJcblx0XHRcdFx0XHQuYXBwZW5kVG8gJy5jb250ZW50J1xyXG5HYW1lLnByb3RvdHlwZS5ob21lUGFnZSA9ICgpLT5cclxuXHRAc3RhcnRWaWV3LnNob3coKVxyXG5cdEBiZWdpbm5pbmcuc2hvdygpXHJcblx0QGJhY2tkcm9wLnNob3coKVxyXG5cdEBiZWdpbm5pbmcuYW5pbWF0aW9uQ3NzICdib3VuY2VJblVwJ1xyXG5cdEBob21lUGFnZUJpbmRFdmVudCgpXHJcblx0QGhTY29yZSA9ICtsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaFNjb3JlJykgb3IgMFxyXG5cdGpxICcuc3RhcnQtdmlldyAuaGlzdG9yeS1zY29yZSdcclxuXHRcdC50ZXh0IEBoU2NvcmVcclxuXHRqcSAnLmNvbnRlbnQnXHJcblx0XHQuY3NzICdib3R0b20nLDBcclxuXHJcbkdhbWUucHJvdG90eXBlLmhvbWVQYWdlQmluZEV2ZW50ID0gKCktPlxyXG5cdF90aGlzID0gQFxyXG5cdEBidG5TdGFydC5vZmYoKVxyXG5cdEBidG5TdGFydC5vbmUgJ3RhcCcsKCktPlxyXG5cdFx0X3RoaXMubV9idG4ucGxheSgpXHJcblx0XHRfdGhpcy5iZWdpbm5pbmcuYW5pbWF0aW9uQ3NzICdib3VuY2VPdXRVcCcsKCktPlxyXG5cdFx0XHRcdGpxKHRoaXMpLmhpZGUgX3RoaXMuY291bnREb3duKCkjc3RhcnQgY291bnQtZG93blxyXG5cclxuR2FtZS5wcm90b3R5cGUuY291bnREb3duID0gKCktPlxyXG5cdF90aGlzID0gQFxyXG5cdEBtX2NvdW50ZG93bi5wbGF5KClcclxuXHRAc2NvcmUgPSAwXHJcblx0JCAnLnNjb3JlJ1xyXG5cdFx0LnRleHQgMFxyXG5cdGpxICcuY29udGVudCdcclxuXHRcdC5jc3MgJ2JvdHRvbScsMFxyXG5cdEBjb3VudERvd25OdW1iZXJzLmhpZGUoKVxyXG5cdEBzdGFydFZpZXcuc2hvdygpXHJcblx0QGJhY2tkcm9wLnNob3coKVxyXG5cdEBudW1iZXItLVxyXG5cdEB0aW1lciA9IHNldFRpbWVvdXQgKCktPlxyXG5cdFx0X3RoaXMuY291bnREb3duLmNhbGwoX3RoaXMpXHJcblx0LDEwMDBcclxuXHRpZiBAbnVtYmVyPDBcclxuXHRcdEBudW1iZXIgPSAzXHJcblx0XHRAc3RhcnRWaWV3LmhpZGUoKVxyXG5cdFx0QGJhY2tkcm9wLmhpZGUoKVxyXG5cdFx0QG1TdGFydCgpXHJcblx0XHQjIHRlc3RHbygpXHJcblx0XHRjbGVhclRpbWVvdXQgQHRpbWVyXHJcblx0XHRyZXR1cm5cclxuXHRAY291bnREb3duTnVtYmVyc1xyXG5cdFx0LmVxIEBudW1iZXJcclxuXHRcdC5zaG93KClcclxuXHRyZXR1cm5cclxuXHJcbmdsb2JhbC5nYW1lID0gbmV3IEdhbWUoKVxyXG5nYW1lLmluaXQoKVxyXG50ZXN0R28gPSAoKS0+XHJcblx0c2V0VGltZW91dCAoKS0+XHJcblx0XHRnYW1lLm1TdGFydCgpXHJcblx0LDEwXHJcbiMgdGVzdEdvKClcclxuZ2FtZS5ob21lUGFnZSgpIl19
