(function() {
  var C, changePoint, deviceWidth, global, pHeight, peopleCount, wHeight;

  deviceWidth = document.documentElement.clientWidth;

  document.documentElement.style.fontSize = (deviceWidth / 10) + "px";

  global = window;

  C = jq('.content');

  pHeight = 4540 / 72;

  wHeight = jq(window).height();

  changePoint = (-pHeight - wHeight / (deviceWidth / 10)) + "rem";

  peopleCount = 11;

  Game.prototype.putSeats = function(c, r) {
    var _this, people, seat;
    _this = this;
    seat = this.seats[c][r];
    people = jq('<span></span>').addClass(function() {
      var addedClass;
      addedClass = 'people';
      if (seat.occupied) {
        return addedClass += ' occupied';
      }
    }).one('tap', function(ev) {
      _this.m_wronge.play();
      _this.closeView();
      _this.mStop();
      ev.stopPropagation();
    });
    return jq('<div></div>').on('touchmove', function(ev) {
      return ev.stopPropagation();
    }).addClass(function() {
      var addedClass;
      addedClass = 'seat';
      if (seat.yellow) {
        addedClass += ' yellow';
      }
      if (c % 2) {
        addedClass += ' right';
      } else {
        addedClass += ' left';
      }
      return addedClass;
    }).one('tap', function() {
      if ($(this).hasClass('yellow')) {
        _this.m_wronge.play();
        _this.closeView();
        _this.mStop();
        return;
      }
      _this.score++;
      _this.m_correct.play();
      seat.clicked = true;
      $('.score').remove();
      return $('<p></p>').addClass('score animated zoomIn').text(_this.score).appendTo('body');
    }).css({
      left: (seat.x / 72) + "rem",
      top: (seat.y / 72) + "rem",
      width: (201 / 72) + "rem",
      height: (178 / 72) + "rem"
    }).append(people).appendTo('.content');
  };

  Game.prototype.putPeopleAndBar = function() {
    var bar, c, column, i, len, r, ref, results, row;
    jq('.content .people').each(function(index) {
      return jq(this).css({
        backgroundImage: "url(app/img/" + ((index % peopleCount) + 1) + ".png)",
        width: (224 / 72) + "rem",
        height: (145 / 72) + "rem",
        top: (16 / 72) + "rem",
        right: (11 / 72) + "rem"
      });
    });
    ref = this.bars;
    results = [];
    for (c = i = 0, len = ref.length; i < len; c = ++i) {
      column = ref[c];
      results.push((function() {
        var j, len1, results1;
        results1 = [];
        for (r = j = 0, len1 = column.length; j < len1; r = ++j) {
          row = column[r];
          bar = this.bars[c][r];
          results1.push(jq('<i></i>').addClass(function() {
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
          }).appendTo('.content'));
        }
        return results1;
      }).call(this));
    }
    return results;
  };

  Game.prototype.render = function() {
    var c, column, i, j, len, len1, r, ref, row;
    ref = this.seats;
    for (c = i = 0, len = ref.length; i < len; c = ++i) {
      column = ref[c];
      for (r = j = 0, len1 = column.length; j < len1; r = ++j) {
        row = column[r];
        this.putSeats(c, r);
      }
    }
    return this.putPeopleAndBar();
  };

  Game.prototype.rollYSeatPeople = function(part) {
    var c, from, r, to;
    if (part === 'upper') {
      from = 2;
      to = 4;
    } else {
      from = 0;
      to = 2;
    }
    while (this.yellowSeatNum) {
      c = u.ran(from, to);
      r = u.ran(0, this.seatR);
      if (!seatData[c][r].yellow) {
        seatData[c][r].yellow = true;
        this.yellowSeatNum--;
      }
    }
    while (this.people) {
      c = u.ran(from, to);
      r = u.ran(0, this.seatR);
      if (!seatData[c][r].occupied) {
        seatData[c][r].occupied = true;
        this.people--;
      }
    }
    return this.render();
  };

  Game.prototype.clear = function() {
    var c, column, i, len, r, results, row;
    this.yellowSeatNum = 5;
    this.people = 22;
    $('.content .seat,.content .seat .people').off();
    $('.content').empty();
    results = [];
    for (c = i = 0, len = seatData.length; i < len; c = ++i) {
      column = seatData[c];
      results.push((function() {
        var j, len1, results1;
        results1 = [];
        for (r = j = 0, len1 = column.length; j < len1; r = ++j) {
          row = column[r];
          delete seatData[c][r].yellow;
          delete seatData[c][r].occupied;
          results1.push(delete seatData[c][r].clicked);
        }
        return results1;
      })());
    }
    return results;
  };

  Game.prototype.paint = function() {
    this.clear();
    return this.rollYSeatPeople();
  };

  Game.prototype.check = function(dis) {
    var c, column, i, j, len, len1, ref, s, seat;
    ref = this.seats;
    for (c = i = 0, len = ref.length; i < len; c = ++i) {
      column = ref[c];
      for (s = j = 0, len1 = column.length; j < len1; s = ++j) {
        seat = column[s];
        if (this.pHeight * 2 + dis - seat.y < 0 && !seat.occupied && !seat.clicked) {
          this.closeView();
          this.mStop();
          return false;
        }
      }
    }
  };

  game.paint();

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
        if (now <= fx.end) {
          _this.paint();
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvY29udGVudC9tYWluLmpzIiwic291cmNlcyI6WyJ2aWV3cy9jb250ZW50L21haW4uY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTs7RUFBQSxXQUFBLEdBQWMsUUFBUSxDQUFDLGVBQWUsQ0FBQzs7RUFDdkMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsUUFBL0IsR0FBNEMsQ0FBQyxXQUFBLEdBQVksRUFBYixDQUFBLEdBQWdCOztFQUU1RCxNQUFBLEdBQVM7O0VBQ1QsQ0FBQSxHQUFJLEVBQUEsQ0FBRyxVQUFIOztFQUNKLE9BQUEsR0FBVSxJQUFBLEdBQUs7O0VBQ2YsT0FBQSxHQUFVLEVBQUEsQ0FBRyxNQUFILENBQVUsQ0FBQyxNQUFYLENBQUE7O0VBQ1YsV0FBQSxHQUFnQixDQUFDLENBQUMsT0FBRCxHQUFTLE9BQUEsR0FBUSxDQUFDLFdBQUEsR0FBWSxFQUFiLENBQWxCLENBQUEsR0FBbUM7O0VBRW5ELFdBQUEsR0FBYzs7RUFFZCxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQWYsR0FBMEIsU0FBQyxDQUFELEVBQUcsQ0FBSDtBQUN6QixRQUFBO0lBQUEsS0FBQSxHQUFRO0lBQ1IsSUFBQSxHQUFPLElBQUMsQ0FBQSxLQUFNLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBQTtJQUNqQixNQUFBLEdBQVMsRUFBQSxDQUFHLGVBQUgsQ0FDUixDQUFDLFFBRE8sQ0FDRSxTQUFBO0FBQ1QsVUFBQTtNQUFBLFVBQUEsR0FBYTtNQUNiLElBQTJCLElBQUksQ0FBQyxRQUFoQztlQUFBLFVBQUEsSUFBWSxZQUFaOztJQUZTLENBREYsQ0FJUixDQUFDLEdBSk8sQ0FJSCxLQUpHLEVBSUcsU0FBQyxFQUFEO01BQ1YsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFmLENBQUE7TUFDQSxLQUFLLENBQUMsU0FBTixDQUFBO01BQ0EsS0FBSyxDQUFDLEtBQU4sQ0FBQTtNQUNBLEVBQUUsQ0FBQyxlQUFILENBQUE7SUFKVSxDQUpI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YUFOMkI7TUFPbEMsUUFBQSxFQUFTLFNBQUE7ZUFDUixLQUFLLENBQUMsTUFBTixDQUFBO01BRFEsQ0FQeUI7S0FEcEM7RUFIdUI7O0VBZXhCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBZixHQUF3QixTQUFBO0FBQ3ZCLFFBQUE7SUFBQSxLQUFBLEdBQVE7SUFDUixDQUFDLENBQUMsT0FBRixDQUNDO01BQUEsTUFBQSxFQUFTLENBQUMsQ0FBQyxDQUFDLElBQUMsQ0FBQSxPQUFELEdBQVMsRUFBVixDQUFGLENBQUEsR0FBZ0IsS0FBekI7S0FERCxFQUVDO01BQ0MsSUFBQSxFQUFLLFNBQUMsR0FBRCxFQUFLLEVBQUw7UUFDSixJQUFHLEdBQUEsR0FBSSxFQUFKLEdBQU8sS0FBSyxDQUFDLEdBQU4sR0FBVSxLQUFLLENBQUMsSUFBMUI7VUFFQyxLQUFLLENBQUMsR0FBTixHQUZEOztRQUdBLElBQUcsR0FBQSxJQUFPLEVBQUUsQ0FBQyxHQUFiO1VBQ0MsS0FBSyxDQUFDLEtBQU4sQ0FBQTtpQkFDQSxFQUFFLENBQUMsR0FBSCxHQUFTLEVBRlY7O01BSkksQ0FETjtNQVFDLFFBQUEsRUFBUyxLQUFLLENBQUMsS0FSaEI7TUFTQyxNQUFBLEVBQU8sUUFUUjtNQVVDLFFBQUEsRUFBUyxTQUFBO1FBQ1IsT0FBTyxDQUFDLEdBQVIsQ0FBWSxVQUFaO1FBQ0EsS0FBSyxDQUFDLEtBQU4sSUFBZTtRQUNmLEtBQUssQ0FBQyxHQUFOLEdBQVk7UUFDWixLQUFLLENBQUMsTUFBTixDQUFBO01BSlEsQ0FWVjtLQUZEO0VBRnVCO0FBM0p4QiIsInNvdXJjZXNDb250ZW50IjpbImRldmljZVdpZHRoID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoXHJcbmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5mb250U2l6ZSA9IFwiI3tkZXZpY2VXaWR0aC8xMH1weFwiXHJcblxyXG5nbG9iYWwgPSB3aW5kb3dcclxuQyA9IGpxKCcuY29udGVudCcpXHJcbnBIZWlnaHQgPSA0NTQwLzcyIyBwaWN0dXJlIGhlaWdodFxyXG53SGVpZ2h0ID0ganEod2luZG93KS5oZWlnaHQoKSMgc2NyZWVuIGhlaWdodFxyXG5jaGFuZ2VQb2ludCA9IFwiI3stcEhlaWdodC13SGVpZ2h0LyhkZXZpY2VXaWR0aC8xMCl9cmVtXCI7XHJcblxyXG5wZW9wbGVDb3VudCA9IDExXHJcbiMgcHV0IHNlYXRzXHJcbkdhbWUucHJvdG90eXBlLnB1dFNlYXRzID0gKGMsciktPlxyXG5cdF90aGlzID0gQFxyXG5cdHNlYXQgPSBAc2VhdHNbY11bcl1cclxuXHRwZW9wbGUgPSBqcSAnPHNwYW4+PC9zcGFuPidcclxuXHRcdC5hZGRDbGFzcyAoKS0+XHJcblx0XHRcdGFkZGVkQ2xhc3MgPSAncGVvcGxlJ1xyXG5cdFx0XHRhZGRlZENsYXNzKz0nIG9jY3VwaWVkJyBpZiBzZWF0Lm9jY3VwaWVkXHJcblx0XHQub25lICd0YXAnLChldiktPlxyXG5cdFx0XHRfdGhpcy5tX3dyb25nZS5wbGF5KClcclxuXHRcdFx0X3RoaXMuY2xvc2VWaWV3KClcclxuXHRcdFx0X3RoaXMubVN0b3AoKVxyXG5cdFx0XHRldi5zdG9wUHJvcGFnYXRpb24oKVxyXG5cdFx0XHRyZXR1cm5cclxuXHRqcSAnPGRpdj48L2Rpdj4nXHJcblx0XHQub24gJ3RvdWNobW92ZScsKGV2KS0+XHJcblx0XHRcdGV2LnN0b3BQcm9wYWdhdGlvbigpXHJcblx0XHQuYWRkQ2xhc3MgKCktPlxyXG5cdFx0XHRhZGRlZENsYXNzID0gJ3NlYXQnXHJcblx0XHRcdGFkZGVkQ2xhc3MrPScgeWVsbG93JyBpZiBzZWF0LnllbGxvd1xyXG5cdFx0XHRpZiBjJTIgdGhlbiBhZGRlZENsYXNzKz0nIHJpZ2h0JyBlbHNlIGFkZGVkQ2xhc3MrPScgbGVmdCdcclxuXHRcdFx0YWRkZWRDbGFzc1xyXG5cdFx0Lm9uZSAndGFwJywoKS0+XHJcblx0XHRcdGlmICQodGhpcykuaGFzQ2xhc3MoJ3llbGxvdycpXHJcblx0XHRcdFx0X3RoaXMubV93cm9uZ2UucGxheSgpXHJcblx0XHRcdFx0X3RoaXMuY2xvc2VWaWV3KClcclxuXHRcdFx0XHRfdGhpcy5tU3RvcCgpXHJcblx0XHRcdFx0cmV0dXJuXHJcblx0XHRcdF90aGlzLnNjb3JlKytcclxuXHRcdFx0X3RoaXMubV9jb3JyZWN0LnBsYXkoKVxyXG5cdFx0XHRzZWF0LmNsaWNrZWQgPSB0cnVlXHJcblx0XHRcdCQgJy5zY29yZSdcclxuXHRcdFx0XHQucmVtb3ZlKClcclxuXHRcdFx0JCAnPHA+PC9wPidcclxuXHRcdFx0XHQuYWRkQ2xhc3MgJ3Njb3JlIGFuaW1hdGVkIHpvb21JbidcclxuXHRcdFx0XHQudGV4dCBfdGhpcy5zY29yZVxyXG5cdFx0XHRcdC5hcHBlbmRUbyAnYm9keSdcclxuXHRcdC5jc3NcclxuXHRcdFx0bGVmdDpcIiN7c2VhdC54LzcyfXJlbVwiXHJcblx0XHRcdHRvcDpcIiN7c2VhdC55LzcyfXJlbVwiXHJcblx0XHRcdHdpZHRoOlwiI3syMDEvNzJ9cmVtXCJcclxuXHRcdFx0aGVpZ2h0OlwiI3sxNzgvNzJ9cmVtXCJcclxuXHRcdC5hcHBlbmQgcGVvcGxlXHJcblx0XHQuYXBwZW5kVG8gJy5jb250ZW50J1xyXG5HYW1lLnByb3RvdHlwZS5wdXRQZW9wbGVBbmRCYXIgPSAoKS0+XHJcblx0anEoJy5jb250ZW50IC5wZW9wbGUnKVxyXG5cdFx0LmVhY2ggKGluZGV4KS0+XHJcblx0XHRcdGpxIHRoaXNcclxuXHRcdFx0XHQuY3NzXHJcblx0XHRcdFx0XHRiYWNrZ3JvdW5kSW1hZ2U6XCJ1cmwoYXBwL2ltZy8jeyhpbmRleCVwZW9wbGVDb3VudCkrMX0ucG5nKVwiXHJcblx0XHRcdFx0XHR3aWR0aDpcIiN7MjI0LzcyfXJlbVwiXHJcblx0XHRcdFx0XHRoZWlnaHQ6XCIjezE0NS83Mn1yZW1cIlxyXG5cdFx0XHRcdFx0dG9wOlwiI3sxNi83Mn1yZW1cIlxyXG5cdFx0XHRcdFx0cmlnaHQ6XCIjezExLzcyfXJlbVwiXHJcblx0Zm9yIGNvbHVtbixjIGluIEBiYXJzXHJcblx0XHRmb3Igcm93LHIgaW4gY29sdW1uXHJcblx0XHRcdGJhciA9IEBiYXJzW2NdW3JdXHJcblx0XHRcdGpxICc8aT48L2k+J1xyXG5cdFx0XHRcdC5hZGRDbGFzcyAoKS0+XHJcblx0XHRcdFx0XHRhZGRlZENsYXNzID0gJ2JhcidcclxuXHRcdFx0XHRcdGlmICEoYyUyKSB0aGVuIGFkZGVkQ2xhc3MrPSAnIGxlZnQnIGVsc2UgYWRkZWRDbGFzcys9JyByaWdodCdcclxuXHRcdFx0XHRcdGlmICEociUyKSB0aGVuIGFkZGVkQ2xhc3MrPSAnIHRvcCcgZWxzZSBhZGRlZENsYXNzKz0nIGJvdHRvbSdcclxuXHRcdFx0XHRcdGFkZGVkQ2xhc3NcclxuXHRcdFx0XHQuY3NzXHJcblx0XHRcdFx0XHR3aWR0aDpcIiN7MjE0LzcyfXJlbVwiXHJcblx0XHRcdFx0XHRoZWlnaHQ6XCIjezQzLzcyfXJlbVwiXHJcblx0XHRcdFx0XHR0b3A6XCIje2Jhci55LzcyfXJlbVwiXHJcblx0XHRcdFx0XHRsZWZ0OlwiI3tiYXIueC83Mn1yZW1cIlxyXG5cdFx0XHRcdC5hcHBlbmRUbyAnLmNvbnRlbnQnXHJcbkdhbWUucHJvdG90eXBlLnJlbmRlciA9ICgpLT5cclxuXHRmb3IgY29sdW1uLGMgaW4gQHNlYXRzXHJcblx0XHRmb3Igcm93LHIgaW4gY29sdW1uXHJcblx0XHRcdEBwdXRTZWF0cyBjLHJcclxuXHRAcHV0UGVvcGxlQW5kQmFyKClcclxuR2FtZS5wcm90b3R5cGUucm9sbFlTZWF0UGVvcGxlID0gKHBhcnQpLT4j5LuOMzbkuKrmlbDmja7kuK3lhrPlrpo15Liq6buE5bqn5ZKMMjLkuKrooqvljaDkvY3nva4s5bm25aSN5Yi2MeS7vVxyXG5cdGlmIHBhcnQgPT0gJ3VwcGVyJyAj6L+Z6YeM6KaB5YiG5Lik6YOo5YiG5Y675riy5p+T77yM5LiK5LiA6YOo5YiGXHJcblx0XHRmcm9tID0gMlxyXG5cdFx0dG8gPSA0XHJcblx0ZWxzZVxyXG5cdFx0ZnJvbSA9IDBcclxuXHRcdHRvID0gMlxyXG5cdHdoaWxlIEB5ZWxsb3dTZWF0TnVtXHJcblx0XHRjID0gdS5yYW4gZnJvbSx0b1xyXG5cdFx0ciA9IHUucmFuIDAsQHNlYXRSXHJcblx0XHRpZiAhc2VhdERhdGFbY11bcl0ueWVsbG93XHJcblx0XHRcdHNlYXREYXRhW2NdW3JdLnllbGxvdyA9IHRydWVcclxuXHRcdFx0QHllbGxvd1NlYXROdW0tLVxyXG5cdHdoaWxlIEBwZW9wbGVcclxuXHRcdGMgPSB1LnJhbiBmcm9tLHRvXHJcblx0XHRyID0gdS5yYW4gMCxAc2VhdFJcclxuXHRcdGlmICFzZWF0RGF0YVtjXVtyXS5vY2N1cGllZFxyXG5cdFx0XHRzZWF0RGF0YVtjXVtyXS5vY2N1cGllZCA9IHRydWVcclxuXHRcdFx0QHBlb3BsZS0tXHJcblx0IyBjb3B5U2VhdHMgPSBjbG9uZSBzZWF0RGF0YVxyXG5cdCMgZm9yIGNvbHVtbixjIGluIGNvcHlTZWF0c1xyXG5cdCMgXHRmb3Igcm93LHIgaW4gY29sdW1uXHJcblx0IyBcdFx0Y29weVNlYXRzW2NdW3JdLnkgKz0gQHBIZWlnaHRcclxuXHQjIEBzZWF0cyA9IHNlYXREYXRhLmNvbmNhdCBjb3B5U2VhdHMgI+WkjeWItuW6p+S9jVxyXG5cdEByZW5kZXIoKVxyXG5HYW1lLnByb3RvdHlwZS5jbGVhciA9ICgpLT5cclxuXHRAeWVsbG93U2VhdE51bSA9IDVcclxuXHRAcGVvcGxlID0gMjJcclxuXHQjIEBzZWF0cy5zcGxpY2UgMiwyXHJcblx0JCAnLmNvbnRlbnQgLnNlYXQsLmNvbnRlbnQgLnNlYXQgLnBlb3BsZSdcclxuXHRcdC5vZmYoKVxyXG5cdCQgJy5jb250ZW50J1xyXG5cdFx0LmVtcHR5KClcclxuXHRmb3IgY29sdW1uLGMgaW4gc2VhdERhdGFcclxuXHRcdGZvciByb3csciBpbiBjb2x1bW5cclxuXHRcdFx0ZGVsZXRlIHNlYXREYXRhW2NdW3JdLnllbGxvd1xyXG5cdFx0XHRkZWxldGUgc2VhdERhdGFbY11bcl0ub2NjdXBpZWRcclxuXHRcdFx0ZGVsZXRlIHNlYXREYXRhW2NdW3JdLmNsaWNrZWRcclxuR2FtZS5wcm90b3R5cGUucGFpbnQgPSAoKS0+XHJcblx0QGNsZWFyKClcclxuXHRAcm9sbFlTZWF0UGVvcGxlKClcclxuR2FtZS5wcm90b3R5cGUuY2hlY2sgPSAoZGlzKS0+XHJcblx0Zm9yIGNvbHVtbixjIGluIEBzZWF0c1xyXG5cdFx0Zm9yIHNlYXQscyBpbiBjb2x1bW5cclxuXHRcdFx0IyBjb25zb2xlLmxvZyBAcEhlaWdodCoyK2Rpcy1zZWF0LnlcclxuXHRcdFx0aWYgQHBIZWlnaHQqMitkaXMtc2VhdC55PDAgYW5kICFzZWF0Lm9jY3VwaWVkIGFuZCAhc2VhdC5jbGlja2VkXHJcblx0XHRcdFx0IyBjb25zb2xlLmxvZyBzZWF0LGMscyxzZWF0c1xyXG5cdFx0XHRcdEBjbG9zZVZpZXcoKVxyXG5cdFx0XHRcdEBtU3RvcCgpXHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlXHJcbmdhbWUucGFpbnQoKVxyXG5HYW1lLnByb3RvdHlwZS5tU3RvcCA9ICgpLT5cclxuXHRAbV9iZ20uY3VycmVudFRpbWUgPSAwXHJcblx0QG1fYmdtLnBhdXNlKClcclxuXHRqcSAnLmNvbnRlbnQnXHJcblx0XHQuc3RvcCgpXHJcbkdhbWUucHJvdG90eXBlLm1TdGFydCA9ICgpLT5cclxuXHRfdGhpcyA9IEBcclxuXHRAbV9iZ20ucGxheSgpXHJcblx0Qy5hbmltYXRlXHJcblx0XHRib3R0b206IFwiI3stKEBwSGVpZ2h0LzcyKSoxLzR9cmVtXCIse1xyXG5cdFx0XHRzdGVwOihub3csZngpLT5cclxuXHRcdFx0XHRpZiBub3cqNzI8X3RoaXMuY3VyKl90aGlzLnN0ZXBcclxuXHRcdFx0XHRcdCMgX3RoaXMuY2hlY2sgbm93KjcyXHJcblx0XHRcdFx0XHRfdGhpcy5jdXIrK1xyXG5cdFx0XHRkdXJhdGlvbjo2MDAwXHJcblx0XHRcdGVhc2luZzonZWFzZUluQ3ViaWMnXHJcblx0XHRcdGNvbXBsZXRlOigpLT5cclxuXHRcdFx0XHRfdGhpcy5tR29pbmcoKVxyXG5cdFx0fVxyXG5cdHJldHVyblxyXG5HYW1lLnByb3RvdHlwZS5tR29pbmcgPSAoKS0+XHJcblx0X3RoaXMgPSBAXHJcblx0Qy5hbmltYXRlXHJcblx0XHRib3R0b206XCIjey0oQHBIZWlnaHQvNzIpfXJlbVwiLFxyXG5cdFx0e1xyXG5cdFx0XHRzdGVwOihub3csZngpLT5cclxuXHRcdFx0XHRpZiBub3cqNzI8X3RoaXMuY3VyKl90aGlzLnN0ZXBcclxuXHRcdFx0XHRcdCMgX3RoaXMuY2hlY2sgbm93KjcyXHJcblx0XHRcdFx0XHRfdGhpcy5jdXIrK1xyXG5cdFx0XHRcdGlmIG5vdyA8PSBmeC5lbmRcclxuXHRcdFx0XHRcdF90aGlzLnBhaW50KClcclxuXHRcdFx0XHRcdGZ4Lm5vdyA9IDBcclxuXHRcdFx0ZHVyYXRpb246X3RoaXMuc3BlZWRcclxuXHRcdFx0ZWFzaW5nOidsaW5lYXInXHJcblx0XHRcdGNvbXBsZXRlOigpLT5cclxuXHRcdFx0XHRjb25zb2xlLmxvZyAnY29tcGxldGUnXHJcblx0XHRcdFx0X3RoaXMuc3BlZWQgLT0gNTAwXHJcblx0XHRcdFx0X3RoaXMuY3VyID0gMVxyXG5cdFx0XHRcdF90aGlzLm1Hb2luZygpXHJcblx0XHRcdFx0cmV0dXJuXHRcclxuXHRcdH1cclxuXHRyZXR1cm4iXX0=
