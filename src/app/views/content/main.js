(function() {
  var C, _slice, changePoint, deviceWidth, global, pHeight, peopleCount, wHeight;

  deviceWidth = document.documentElement.clientWidth;

  document.documentElement.style.fontSize = (deviceWidth / 10) + "px";

  global = window;

  C = jq('.content');

  pHeight = 4540 / 72;

  wHeight = jq(window).height();

  changePoint = (-pHeight - wHeight / (deviceWidth / 10)) + "rem";

  _slice = [].slice;

  peopleCount = 11;

  Game.prototype.renderSeats_People = function() {
    var _this, c, column, i, j, k, l, len, len1, len2, r, ref, results, row, seat;
    _this = this;
    ref = this.seats;
    for (c = j = 0, len = ref.length; j < len; c = ++j) {
      column = ref[c];
      if (_slice.apply(arguments).indexOf(c) === -1) {
        continue;
      }
      for (r = k = 0, len1 = column.length; k < len1; r = ++k) {
        row = column[r];
        seat = this.seats[c][r];
        jq(".content .seat[c=" + c + "][r=" + r + "]").removeClass('yellow').removeClass('occupied');
        if (seat.yellow) {
          jq(".content .seat[c=" + c + "][r=" + r + "]").addClass('yellow');
        }
        if (seat.occupied) {
          jq(".content .seat[c=" + c + "][r=" + r + "]").addClass('occupied');
        }
      }
    }
    results = [];
    for (i = l = 0, len2 = arguments.length; l < len2; i = ++l) {
      c = arguments[i];
      jq(".content .seat[c=" + c + "],.content .seat[c=" + c + "] .people").off();
      jq(".content .seat[c=" + c + "].occupied .people").one('tap', function(ev) {
        _this.gameover();
        return ev.stopPropagation();
      });
      jq(".content .seat[c=" + c + "]").one('tap', function(ev) {
        if ($(this).hasClass('yellow')) {
          return _this.gameover();
        } else {
          _this.score++;
          _this.seats[$(this).attr('c')][$(this).attr('r')].clicked = true;
          $('.score').remove();
          return $('<p></p>').addClass('score animated zoomIn').text(_this.score).appendTo('body');
        }
      });
      jq(".content .seat[c=" + c + "] .people").css({
        backgroundImage: ""
      });
      results.push(jq(".content .seat[c=" + c + "].occupied .people").each(function(index) {
        return jq(this).css({
          backgroundImage: "url(app/img/" + ((index % peopleCount) + 1) + ".png)"
        });
      }));
    }
    return results;
  };

  Game.prototype.clear = function() {
    var c, column, j, len, r, ref, results, row;
    ref = this.seats;
    results = [];
    for (c = j = 0, len = ref.length; j < len; c = ++j) {
      column = ref[c];
      if (_slice.apply(arguments).indexOf(c) === -1) {
        continue;
      }
      results.push((function() {
        var k, len1, results1;
        results1 = [];
        for (r = k = 0, len1 = column.length; k < len1; r = ++k) {
          row = column[r];
          delete this.seats[c][r].yellow;
          delete this.seats[c][r].occupied;
          results1.push(delete this.seats[c][r].clicked);
        }
        return results1;
      }).call(this));
    }
    return results;
  };

  Game.prototype.render = function() {
    this.clear.apply(this, arguments);
    this.rollYSeatPeople.apply(this, arguments);
    return this.renderSeats_People.apply(this, arguments);
  };

  Game.prototype.rollYSeatPeople = function() {
    var c, r, results;
    this.yellowSeatNum = 5;
    this.people = 22;
    while (this.yellowSeatNum) {
      c = u.ran(arguments[0], arguments[1] + 1);
      r = u.ran(0, this.seatR);
      if (!this.seats[c][r].yellow) {
        this.seats[c][r].yellow = true;
        this.yellowSeatNum--;
      }
    }
    results = [];
    while (this.people) {
      c = u.ran(arguments[0], arguments[1] + 1);
      r = u.ran(0, this.seatR);
      if (!this.seats[c][r].occupied) {
        this.seats[c][r].occupied = true;
        results.push(this.people--);
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  Game.prototype.paint = function() {
    this.render(2, 3);
    return this.render(0, 1);
  };

  game.paint();

  Game.prototype.gameover = function() {
    var _this;
    _this = this;
    _this.m_wronge.play();
    _this.closeView();
    return _this.mStop();
  };

  Game.prototype.check = function(dis) {
    var c, column, j, k, len, len1, ref, s, seat;
    ref = this.seats;
    for (c = j = 0, len = ref.length; j < len; c = ++j) {
      column = ref[c];
      for (s = k = 0, len1 = column.length; k < len1; s = ++k) {
        seat = column[s];
        if (this.pHeight * 2 + dis - seat.y < 0 && !seat.occupied && !seat.clicked) {
          this.closeView();
          this.mStop();
          return false;
        }
      }
    }
  };

  Game.prototype.mStop = function() {
    this.m_bgm.currentTime = 0;
    this.m_bgm.pause();
    return jq('.content').stop();
  };

  Game.prototype.mStart = function() {
    var _this;
    _this = this;
    this.m_bgm.play();
    C.animate({
      bottom: (-(this.pHeight / 72) * 1 / 4) + "rem"
    }, {
      step: function(now, fx) {
        if (now * 72 < _this.cur * _this.step) {
          return _this.cur++;
        }
      },
      duration: 6000,
      easing: 'easeInCubic',
      complete: function() {
        return _this.mGoing();
      }
    });
  };

  Game.prototype.mGoing = function() {
    var _this;
    _this = this;
    C.animate({
      bottom: (-(this.pHeight / 72)) + "rem"
    }, {
      step: function(now, fx) {
        if (now * 72 < _this.cur * _this.step) {
          _this.cur++;
        }
        if (_this.cur === 11) {
          console.log(2, 3);
        }
        if (_this.cur === 33) {
          console.log(2, 3);
        }
        if (now <= fx.end) {
          return fx.now = 0;
        }
      },
      duration: _this.speed,
      easing: 'linear',
      complete: function() {
        console.log('complete');
        _this.speed -= 500;
        _this.cur = 1;
        _this.mGoing();
      }
    });
  };

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvY29udGVudC9tYWluLmpzIiwic291cmNlcyI6WyJ2aWV3cy9jb250ZW50L21haW4uY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTs7RUFBQSxXQUFBLEdBQWMsUUFBUSxDQUFDLGVBQWUsQ0FBQzs7RUFDdkMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsUUFBL0IsR0FBNEMsQ0FBQyxXQUFBLEdBQVksRUFBYixDQUFBLEdBQWdCOztFQUU1RCxNQUFBLEdBQVM7O0VBQ1QsQ0FBQSxHQUFJLEVBQUEsQ0FBRyxVQUFIOztFQUNKLE9BQUEsR0FBVSxJQUFBLEdBQUs7O0VBQ2YsT0FBQSxHQUFVLEVBQUEsQ0FBRyxNQUFILENBQVUsQ0FBQyxNQUFYLENBQUE7O0VBQ1YsV0FBQSxHQUFnQixDQUFDLENBQUMsT0FBRCxHQUFTLE9BQUEsR0FBUSxDQUFDLFdBQUEsR0FBWSxFQUFiLENBQWxCLENBQUEsR0FBbUM7O0VBQ25ELE1BQUEsR0FBUyxFQUFFLENBQUM7O0VBQ1osV0FBQSxHQUFjOztFQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWYsR0FBb0MsU0FBQTtBQUNuQyxRQUFBO0lBQUEsS0FBQSxHQUFRO0FBRVI7QUFBQSxTQUFBLDZDQUFBOztNQUNDLElBQVksTUFBTSxDQUFDLEtBQVAsQ0FBYSxTQUFiLENBQXVCLENBQUMsT0FBeEIsQ0FBZ0MsQ0FBaEMsQ0FBQSxLQUFzQyxDQUFDLENBQW5EO0FBQUEsaUJBQUE7O0FBQ0EsV0FBQSxrREFBQTs7UUFDQyxJQUFBLEdBQU8sSUFBQyxDQUFBLEtBQU0sQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFBO1FBQ2pCLEVBQUEsQ0FBRyxtQkFBQSxHQUFvQixDQUFwQixHQUFzQixNQUF0QixHQUE0QixDQUE1QixHQUE4QixHQUFqQyxDQUNDLENBQUMsV0FERixDQUNjLFFBRGQsQ0FFQyxDQUFDLFdBRkYsQ0FFYyxVQUZkO1FBR0EsSUFBRyxJQUFJLENBQUMsTUFBUjtVQUND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LEVBQWMsQ0FBZCxFQUREOztRQUdBLElBQUcsR0FBQSxJQUFPLEVBQUUsQ0FBQyxHQUFiO2lCQUVDLEVBQUUsQ0FBQyxHQUFILEdBQVMsRUFGVjs7TUFWSSxDQUROO01BY0MsUUFBQSxFQUFTLEtBQUssQ0FBQyxLQWRoQjtNQWVDLE1BQUEsRUFBTyxRQWZSO01BZ0JDLFFBQUEsRUFBUyxTQUFBO1FBQ1IsT0FBTyxDQUFDLEdBQVIsQ0FBWSxVQUFaO1FBQ0EsS0FBSyxDQUFDLEtBQU4sSUFBZTtRQUNmLEtBQUssQ0FBQyxHQUFOLEdBQVk7UUFDWixLQUFLLENBQUMsTUFBTixDQUFBO01BSlEsQ0FoQlY7S0FGRDtFQUZ1QjtBQTdIeEIiLCJzb3VyY2VzQ29udGVudCI6WyJkZXZpY2VXaWR0aCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aFxyXG5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuZm9udFNpemUgPSBcIiN7ZGV2aWNlV2lkdGgvMTB9cHhcIlxyXG5cclxuZ2xvYmFsID0gd2luZG93XHJcbkMgPSBqcSgnLmNvbnRlbnQnKVxyXG5wSGVpZ2h0ID0gNDU0MC83MiMgcGljdHVyZSBoZWlnaHRcclxud0hlaWdodCA9IGpxKHdpbmRvdykuaGVpZ2h0KCkjIHNjcmVlbiBoZWlnaHRcclxuY2hhbmdlUG9pbnQgPSBcIiN7LXBIZWlnaHQtd0hlaWdodC8oZGV2aWNlV2lkdGgvMTApfXJlbVwiO1xyXG5fc2xpY2UgPSBbXS5zbGljZVxyXG5wZW9wbGVDb3VudCA9IDExXHJcbkdhbWUucHJvdG90eXBlLnJlbmRlclNlYXRzX1Blb3BsZSA9ICgpLT4j5oyH5a6a5ZOq5Yeg6aG5LDAsMeWNs+WPquWhq+WKoOesrOS4gOW5heeahOm7hOW6p+WSjOWwj+S6ulxyXG5cdF90aGlzID0gQFxyXG5cdCMgY29uc29sZS5sb2cgSlNPTi5zdHJpbmdpZnkgQC5zZWF0cyxudWxsLDJcclxuXHRmb3IgY29sdW1uLGMgaW4gQHNlYXRzXHJcblx0XHRjb250aW51ZSBpZiBfc2xpY2UuYXBwbHkoYXJndW1lbnRzKS5pbmRleE9mKGMpID09IC0xXHJcblx0XHRmb3Igcm93LHIgaW4gY29sdW1uXHJcblx0XHRcdHNlYXQgPSBAc2VhdHNbY11bcl1cclxuXHRcdFx0anEgXCIuY29udGVudCAuc2VhdFtjPSN7Y31dW3I9I3tyfV1cIlxyXG5cdFx0XHRcdC5yZW1vdmVDbGFzcyAneWVsbG93J1xyXG5cdFx0XHRcdC5yZW1vdmVDbGFzcyAnb2NjdXBpZWQnXHJcblx0XHRcdGlmIHNlYXQueWVsbG93XHJcblx0XHRcdFx0anEgXCIuY29udGVudCAuc2VhdFtjPSN7Y31dW3I9I3tyfV1cIlxyXG5cdFx0XHRcdFx0LmFkZENsYXNzICd5ZWxsb3cnXHJcblx0XHRcdGlmIHNlYXQub2NjdXBpZWRcclxuXHRcdFx0XHRqcSBcIi5jb250ZW50IC5zZWF0W2M9I3tjfV1bcj0je3J9XVwiXHJcblx0XHRcdFx0XHQuYWRkQ2xhc3MgJ29jY3VwaWVkJ1xyXG5cdGZvciBjLGkgaW4gYXJndW1lbnRzXHJcblx0XHRqcSBcIi5jb250ZW50IC5zZWF0W2M9I3tjfV0sLmNvbnRlbnQgLnNlYXRbYz0je2N9XSAucGVvcGxlXCJcclxuXHRcdFx0Lm9mZigpI+ino+e7keafkOWHoOmhueeahOaJgOacieS6i+S7tlxyXG5cdFx0anEgXCIuY29udGVudCAuc2VhdFtjPSN7Y31dLm9jY3VwaWVkIC5wZW9wbGVcIlxyXG5cdFx0XHQub25lICd0YXAnLChldiktPiPnu5nkurrnu5Hlrprngrnlh7vnu5PmnZ/ml7bpl7RcclxuXHRcdFx0XHRfdGhpcy5nYW1lb3ZlcigpXHJcblx0XHRcdFx0ZXYuc3RvcFByb3BhZ2F0aW9uKClcclxuXHRcdGpxIFwiLmNvbnRlbnQgLnNlYXRbYz0je2N9XVwiXHJcblx0XHRcdC5vbmUgJ3RhcCcsKGV2KS0+I+e7mem7hOW6p+e7keWumueCueWHu+e7k+adn+aXtumXtFxyXG5cdFx0XHRcdGlmICQodGhpcykuaGFzQ2xhc3MgJ3llbGxvdydcclxuXHRcdFx0XHRcdF90aGlzLmdhbWVvdmVyKCkgXHJcblx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0X3RoaXMuc2NvcmUrK1xyXG5cdFx0XHRcdFx0X3RoaXMuc2VhdHNbJCh0aGlzKS5hdHRyKCdjJyldWyQodGhpcykuYXR0cigncicpXS5jbGlja2VkID0gdHJ1ZVxyXG5cdFx0XHRcdFx0JCAnLnNjb3JlJ1xyXG5cdFx0XHRcdFx0XHQucmVtb3ZlKClcclxuXHRcdFx0XHRcdCQgJzxwPjwvcD4nXHJcblx0XHRcdFx0XHRcdC5hZGRDbGFzcyAnc2NvcmUgYW5pbWF0ZWQgem9vbUluJ1xyXG5cdFx0XHRcdFx0XHQudGV4dCBfdGhpcy5zY29yZVxyXG5cdFx0XHRcdFx0XHQuYXBwZW5kVG8gJ2JvZHknXHJcblx0XHRqcSBcIi5jb250ZW50IC5zZWF0W2M9I3tjfV0gLnBlb3BsZVwiXHJcblx0XHRcdC5jc3NcclxuXHRcdFx0XHRiYWNrZ3JvdW5kSW1hZ2U6XCJcIlxyXG5cdFx0anEgXCIuY29udGVudCAuc2VhdFtjPSN7Y31dLm9jY3VwaWVkIC5wZW9wbGVcIlxyXG5cdFx0XHQuZWFjaCAoaW5kZXgpLT5cclxuXHRcdFx0XHRqcSB0aGlzXHJcblx0XHRcdFx0XHQuY3NzXHJcblx0XHRcdFx0XHRcdGJhY2tncm91bmRJbWFnZTpcInVybChhcHAvaW1nLyN7KGluZGV4JXBlb3BsZUNvdW50KSsxfS5wbmcpXCJcclxuR2FtZS5wcm90b3R5cGUuY2xlYXIgPSAoKS0+XHJcblx0Zm9yIGNvbHVtbixjIGluIEBzZWF0c1xyXG5cdFx0Y29udGludWUgaWYgX3NsaWNlLmFwcGx5KGFyZ3VtZW50cykuaW5kZXhPZihjKSA9PSAtMVxyXG5cdFx0Zm9yIHJvdyxyIGluIGNvbHVtblxyXG5cdFx0XHRkZWxldGUgQHNlYXRzW2NdW3JdLnllbGxvd1xyXG5cdFx0XHRkZWxldGUgQHNlYXRzW2NdW3JdLm9jY3VwaWVkXHJcblx0XHRcdGRlbGV0ZSBAc2VhdHNbY11bcl0uY2xpY2tlZFxyXG5HYW1lLnByb3RvdHlwZS5yZW5kZXIgPSAoKS0+XHJcblx0QGNsZWFyLmFwcGx5KEAsYXJndW1lbnRzKVxyXG5cdEByb2xsWVNlYXRQZW9wbGUuYXBwbHkoQCxhcmd1bWVudHMpXHJcblx0QHJlbmRlclNlYXRzX1Blb3BsZS5hcHBseShALGFyZ3VtZW50cylcclxuR2FtZS5wcm90b3R5cGUucm9sbFlTZWF0UGVvcGxlID0gKCktPiPku44zNuS4quaVsOaNruS4reWGs+WumjXkuKrpu4TluqflkowyMuS4quiiq+WNoOS9jee9rizlubblpI3liLYx5Lu9XHJcblx0QHllbGxvd1NlYXROdW0gPSA1XHJcblx0QHBlb3BsZSA9IDIyXHJcblx0d2hpbGUgQHllbGxvd1NlYXROdW1cclxuXHRcdGMgPSB1LnJhbiBhcmd1bWVudHNbMF0sYXJndW1lbnRzWzFdKzFcclxuXHRcdHIgPSB1LnJhbiAwLEBzZWF0UlxyXG5cdFx0aWYgIUBzZWF0c1tjXVtyXS55ZWxsb3dcclxuXHRcdFx0QHNlYXRzW2NdW3JdLnllbGxvdyA9IHRydWVcclxuXHRcdFx0QHllbGxvd1NlYXROdW0tLVxyXG5cdHdoaWxlIEBwZW9wbGVcclxuXHRcdGMgPSB1LnJhbiBhcmd1bWVudHNbMF0sYXJndW1lbnRzWzFdKzFcclxuXHRcdHIgPSB1LnJhbiAwLEBzZWF0UlxyXG5cdFx0aWYgIUBzZWF0c1tjXVtyXS5vY2N1cGllZFxyXG5cdFx0XHRAc2VhdHNbY11bcl0ub2NjdXBpZWQgPSB0cnVlXHJcblx0XHRcdEBwZW9wbGUtLVxyXG5cdCMgY29weVNlYXRzID0gY2xvbmUgc2VhdHNcclxuXHQjIGZvciBjb2x1bW4sYyBpbiBjb3B5U2VhdHNcclxuXHQjIFx0Zm9yIHJvdyxyIGluIGNvbHVtblxyXG5cdCMgXHRcdGNvcHlTZWF0c1tjXVtyXS55ICs9IEBwSGVpZ2h0XHJcblx0IyBAc2VhdHMgPSBzZWF0RGF0YS5jb25jYXQgY29weVNlYXRzICPlpI3liLbluqfkvY1cclxuR2FtZS5wcm90b3R5cGUucGFpbnQgPSAoKS0+XHJcblx0QHJlbmRlcigyLDMpXHJcblx0QHJlbmRlcigwLDEpXHJcbmdhbWUucGFpbnQoKVxyXG5HYW1lLnByb3RvdHlwZS5nYW1lb3ZlciA9ICgpLT5cclxuXHRfdGhpcyA9IEBcclxuXHRfdGhpcy5tX3dyb25nZS5wbGF5KClcclxuXHRfdGhpcy5jbG9zZVZpZXcoKVxyXG5cdF90aGlzLm1TdG9wKClcclxuXHJcbkdhbWUucHJvdG90eXBlLmNoZWNrID0gKGRpcyktPlxyXG5cdGZvciBjb2x1bW4sYyBpbiBAc2VhdHNcclxuXHRcdGZvciBzZWF0LHMgaW4gY29sdW1uXHJcblx0XHRcdCMgY29uc29sZS5sb2cgQHBIZWlnaHQqMitkaXMtc2VhdC55XHJcblx0XHRcdGlmIEBwSGVpZ2h0KjIrZGlzLXNlYXQueTwwIGFuZCAhc2VhdC5vY2N1cGllZCBhbmQgIXNlYXQuY2xpY2tlZFxyXG5cdFx0XHRcdCMgY29uc29sZS5sb2cgc2VhdCxjLHMsc2VhdHNcclxuXHRcdFx0XHRAY2xvc2VWaWV3KClcclxuXHRcdFx0XHRAbVN0b3AoKVxyXG5cdFx0XHRcdHJldHVybiBmYWxzZVxyXG4jIGdhbWUucGFpbnQoKVxyXG5HYW1lLnByb3RvdHlwZS5tU3RvcCA9ICgpLT5cclxuXHRAbV9iZ20uY3VycmVudFRpbWUgPSAwXHJcblx0QG1fYmdtLnBhdXNlKClcclxuXHRqcSAnLmNvbnRlbnQnXHJcblx0XHQuc3RvcCgpXHJcbkdhbWUucHJvdG90eXBlLm1TdGFydCA9ICgpLT5cclxuXHRfdGhpcyA9IEBcclxuXHRAbV9iZ20ucGxheSgpXHJcblx0Qy5hbmltYXRlXHJcblx0XHRib3R0b206IFwiI3stKEBwSGVpZ2h0LzcyKSoxLzR9cmVtXCIse1xyXG5cdFx0XHRzdGVwOihub3csZngpLT5cclxuXHRcdFx0XHRpZiBub3cqNzI8X3RoaXMuY3VyKl90aGlzLnN0ZXBcclxuXHRcdFx0XHRcdCMgX3RoaXMuY2hlY2sgbm93KjcyXHJcblx0XHRcdFx0XHRfdGhpcy5jdXIrK1xyXG5cdFx0XHRkdXJhdGlvbjo2MDAwXHJcblx0XHRcdGVhc2luZzonZWFzZUluQ3ViaWMnXHJcblx0XHRcdGNvbXBsZXRlOigpLT5cclxuXHRcdFx0XHRfdGhpcy5tR29pbmcoKVxyXG5cdFx0fVxyXG5cdHJldHVyblxyXG5HYW1lLnByb3RvdHlwZS5tR29pbmcgPSAoKS0+XHJcblx0X3RoaXMgPSBAXHJcblx0Qy5hbmltYXRlXHJcblx0XHRib3R0b206XCIjey0oQHBIZWlnaHQvNzIpfXJlbVwiLFxyXG5cdFx0e1xyXG5cdFx0XHRzdGVwOihub3csZngpLT5cclxuXHRcdFx0XHRpZiBub3cqNzI8X3RoaXMuY3VyKl90aGlzLnN0ZXBcclxuXHRcdFx0XHRcdCMgX3RoaXMuY2hlY2sgbm93KjcyXHJcblx0XHRcdFx0XHRfdGhpcy5jdXIrK1xyXG5cdFx0XHRcdGlmIF90aGlzLmN1ciA9PSAxMVxyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2cgMiwzXHJcblx0XHRcdFx0XHQjIF90aGlzLnJlbmRlcigwLDEpXHJcblx0XHRcdFx0aWYgX3RoaXMuY3VyID09IDMzXHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyAyLDNcclxuXHRcdFx0XHRcdCMgX3RoaXMucmVuZGVyKDAsMSlcclxuXHRcdFx0XHRpZiBub3cgPD0gZnguZW5kXHJcblx0XHRcdFx0XHQjIF90aGlzLnBhaW50KClcclxuXHRcdFx0XHRcdGZ4Lm5vdyA9IDBcclxuXHRcdFx0ZHVyYXRpb246X3RoaXMuc3BlZWRcclxuXHRcdFx0ZWFzaW5nOidsaW5lYXInXHJcblx0XHRcdGNvbXBsZXRlOigpLT5cclxuXHRcdFx0XHRjb25zb2xlLmxvZyAnY29tcGxldGUnXHJcblx0XHRcdFx0X3RoaXMuc3BlZWQgLT0gNTAwXHJcblx0XHRcdFx0X3RoaXMuY3VyID0gMVxyXG5cdFx0XHRcdF90aGlzLm1Hb2luZygpXHJcblx0XHRcdFx0cmV0dXJuXHRcclxuXHRcdH1cclxuXHRyZXR1cm4iXX0=
