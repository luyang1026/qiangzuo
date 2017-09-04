(function() {
  var C, _slice, deviceWidth, global, peopleCount;

  deviceWidth = document.documentElement.clientWidth;

  document.documentElement.style.fontSize = (deviceWidth / 10) + "px";

  global = window;

  C = jq('.content');

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
      bottom: ((-this.pHeight / 72 * 2) + (this.wHeight / this.rem)) + "rem"
    }, {
      step: function(now, fx) {
        if (now * 72 < _this.cur * _this.step) {
          _this.cur++;
        }
        if (this.pHeight / 72 - now > 200) {
          _this.render(0, 1);
        }
        if (now <= fx.end) {
          console.log(now, fx.end);
          _this.render(2, 3);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvY29udGVudC9tYWluLmpzIiwic291cmNlcyI6WyJ2aWV3cy9jb250ZW50L21haW4uY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTs7RUFBQSxXQUFBLEdBQWMsUUFBUSxDQUFDLGVBQWUsQ0FBQzs7RUFDdkMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsUUFBL0IsR0FBNEMsQ0FBQyxXQUFBLEdBQVksRUFBYixDQUFBLEdBQWdCOztFQUU1RCxNQUFBLEdBQVM7O0VBQ1QsQ0FBQSxHQUFJLEVBQUEsQ0FBRyxVQUFIOztFQUNKLE1BQUEsR0FBUyxFQUFFLENBQUM7O0VBQ1osV0FBQSxHQUFjOztFQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWYsR0FBb0MsU0FBQTtBQUNuQyxRQUFBO0lBQUEsS0FBQSxHQUFRO0FBRVI7QUFBQSxTQUFBLDZDQUFBOztNQUNDLElBQVksTUFBTSxDQUFDLEtBQVAsQ0FBYSxTQUFiLENBQXVCLENBQUMsT0FBeEIsQ0FBZ0MsQ0FBaEMsQ0FBQSxLQUFzQyxDQUFDLENBQW5EO0FBQUEsaUJBQUE7O0FBQ0EsV0FBQSxrREFBQTs7UUFDQyxJQUFBLEdBQU8sSUFBQyxDQUFBLEtBQU0sQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFBO1FBQ2pCLEVBQUEsQ0FBRyxtQkFBQSxHQUFvQixDQUFwQixHQUFzQixNQUF0QixHQUE0QixDQUE1QixHQUE4QixHQUFqQyxDQUNDLENBQUMsV0FERixDQUNjLFFBRGQsQ0FFQyxDQUFDLFdBRkYsQ0FFYyxVQUZkO1FBR0EsSUFBRyxJQUFJLENBQUMsTUFBUjtVQUNDLEVBQUEsQ0FBRyxtQkFBQSxHQUFvQixDQUFwQixHQUFzQixNQUF0QixHQUE0QixDQUE1QixHQUE4QixHQUFqQyxDQUNDLENBQUMsUUFERixDQUNXLFFBRFgsRUFERDs7UUFHQSxJQUFHLElBQUksQ0FBQyxRQUFSO1VBQ0MsRUFBQSxDQUFHLG1CQUFBLEdBQW9CLENBQXBCLEdBQXNCLE1BQXRCLEdBQTRCLENBQTVCLEdBQThCLEdBQWpDLENBQ0MsQ0FBQyxRQURGLENBQ1csVUFEWCxFQUREOztBQVJEO0FBRkQ7QUFhQTtTQUFBLHFEQUFBOztNQUNDLEVBQUEsQ0FBRyxtQkFBQSxHQUFvQixDQUFwQixHQUFzQixxQkFBdEIsR0FBMkMsQ0FBM0MsR0FBNkMsV0FBaEQsQ0FDQyxDQUFDLEdBREYsQ0FBQTtNQUVBLEVBQUEsQ0FBRyxtQkFBQSxHQUFvQixDQUFwQixHQUFzQixvQkFBekIsQ0FDQyxDQUFDLEdBREYsQ0FDTSxLQUROLEVBQ1ksU0FBQyxFQUFEO1FBQ1YsS0FBSyxDQUFDLFFBQU4sQ0FBQTtlQUNBLEVBQUUsQ0FBQyxlQUFILENBQUE7TUFGVSxDQURaO01BSUEsRUFBQSxDQUFHLG1CQUFBLEdBQW9CLENBQXBCLEdBQXNCLEdBQXpCLENBQ0MsQ0FBQyxHQURGLENBQ00sS0FETixFQUNZLFNBQUMsRUFBRDtRQUNWLElBQUcsQ0FBQSxDQUFFLElBQUYsQ0FBTyxDQUFDLFFBQVIsQ0FBaUIsUUFBakIsQ0FBSDtpQkFDQyxLQUFLLENBQUMsUUFBTixDQUFBLEVBREQ7U0FBQSxNQUFBO1VBR0MsS0FBSyxDQUFDLEtBQU47VUFDQSxLQUFLLENBQUMsS0FBTSxDQUFBLENBQUEsQ0FBRSxJQUFGLENBQU8sQ0FBQyxJQUFSLENBQWEsR0FBYixDQUFBLENBQW1CLENBQUEsQ0FBQSxDQUFFLElBQUYsQ0FBTyxDQUFDLElBQVIsQ0FBYSxHQUFiLENBQUEsQ0FBa0IsQ0FBQyxPQUFsRCxHQUE0RDtVQUM1RCxDQUFBLENBQUUsUUFBRixDQUNDLENBQUMsTUFERixDQUFBO2lCQUVBLENBQUEsQ0FBRSxTQUFGLENBQ0MsQ0FBQyxRQURGLENBQ1csdUJBRFgsQ0FFQyxDQUFDLElBRkYsQ0FFTyxLQUFLLENBQUMsS0FGYixDQUdDLENBQUMsUUFIRixDQUdXLE1BSFgsRUFQRDs7TUFEVSxDQURaO01BYUEsRUFBQSxDQUFHLG1CQUFBLEdBQW9CLENBQXBCLEdBQXNCLFdBQXpCLENBQ0MsQ0FBQyxHQURGLENBRUU7UUFBQSxlQUFBLEVBQWdCLEVBQWhCO09BRkY7bUJBR0EsRUFBQSxDQUFHLG1CQUFBLEdBQW9CLENBQXBCLEdBQXNCLG9CQUF6QixDQUNDLENBQUMsSUFERixDQUNPLFNBQUMsS0FBRDtlQUNMLEVBQUEsQ0FBRyxJQUFILENBQ0MsQ0FBQyxHQURGLENBRUU7VUFBQSxlQUFBLEVBQWdCLGNBQUEsR0FBYyxDQUFDLENBQUMsS0FBQSxHQUFNLFdBQVAsQ0FBQSxHQUFvQixDQUFyQixDQUFkLEdBQXFDLE9BQXJEO1NBRkY7TUFESyxDQURQO0FBdkJEOztFQWhCbUM7O0VBNENwQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQWYsR0FBdUIsU0FBQTtBQUN0QixRQUFBO0FBQUE7QUFBQTtTQUFBLDZDQUFBOztNQUNDLElBQVksTUFBTSxDQUFDLEtBQVAsQ0FBYSxTQUFiLENBQXVCLENBQUMsT0FBeEIsQ0FBZ0MsQ0FBaEMsQ0FBQSxLQUFzQyxDQUFDLENBQW5EO0FBQUEsaUJBQUE7Ozs7QUFDQTthQUFBLGtEQUFBOztVQUNDLE9BQU8sSUFBQyxDQUFBLEtBQU0sQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFBLENBQUUsQ0FBQztVQUNwQixPQUFPLElBQUMsQ0FBQSxLQUFNLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBQSxDQUFFLENBQUM7d0JBQ3BCLE9BQU8sSUFBQyxDQUFBLEtBQU0sQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFBLENBQUUsQ0FBQztBQUhyQjs7O0FBRkQ7O0VBRHNCOztFQU92QixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQWYsR0FBd0IsU0FBQTtJQUN2QixJQUFDLENBQUEsS0FBSyxDQUFDLEtBQVAsQ0FBYSxJQUFiLEVBQWUsU0FBZjtJQUNBLElBQUMsQ0FBQSxlQUFlLENBQUMsS0FBakIsQ0FBdUIsSUFBdkIsRUFBeUIsU0FBekI7V0FDQSxJQUFDLENBQUEsa0JBQWtCLENBQUMsS0FBcEIsQ0FBMEIsSUFBMUIsRUFBNEIsU0FBNUI7RUFIdUI7O0VBSXhCLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZixHQUFpQyxTQUFBO0FBQ2hDLFFBQUE7SUFBQSxJQUFDLENBQUEsYUFBRCxHQUFpQjtJQUNqQixJQUFDLENBQUEsTUFBRCxHQUFVO0FBQ1YsV0FBTSxJQUFDLENBQUEsYUFBUDtNQUNDLENBQUEsR0FBSSxDQUFDLENBQUMsR0FBRixDQUFNLFNBQVUsQ0FBQSxDQUFBLENBQWhCLEVBQW1CLFNBQVUsQ0FBQSxDQUFBLENBQVYsR0FBYSxDQUFoQztNQUNKLENBQUEsR0FBSSxDQUFDLENBQUMsR0FBRixDQUFNLENBQU4sRUFBUSxJQUFDLENBQUEsS0FBVDtNQUNKLElBQUcsQ0FBQyxJQUFDLENBQUEsS0FBTSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUEsQ0FBRSxDQUFDLE1BQWpCO1FBQ0MsSUFBQyxDQUFBLEtBQU0sQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFBLENBQUUsQ0FBQyxNQUFiLEdBQXNCO1FBQ3RCLElBQUMsQ0FBQSxhQUFELEdBRkQ7O0lBSEQ7QUFNQTtXQUFNLElBQUMsQ0FBQSxNQUFQO01BQ0MsQ0FBQSxHQUFJLENBQUMsQ0FBQyxHQUFGLENBQU0sU0FBVSxDQUFBLENBQUEsQ0FBaEIsRUFBbUIsU0FBVSxDQUFBLENBQUEsQ0FBVixHQUFhLENBQWhDO01BQ0osQ0FBQSxHQUFJLENBQUMsQ0FBQyxHQUFGLENBQU0sQ0FBTixFQUFRLElBQUMsQ0FBQSxLQUFUO01BQ0osSUFBRyxDQUFDLElBQUMsQ0FBQSxLQUFNLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBQSxDQUFFLENBQUMsUUFBakI7UUFDQyxJQUFDLENBQUEsS0FBTSxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUEsQ0FBRSxDQUFDLFFBQWIsR0FBd0I7cUJBQ3hCLElBQUMsQ0FBQSxNQUFELElBRkQ7T0FBQSxNQUFBOzZCQUFBOztJQUhELENBQUE7O0VBVGdDOztFQWVqQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQWYsR0FBdUIsU0FBQTtJQUN0QixJQUFDLENBQUEsTUFBRCxDQUFRLENBQVIsRUFBVSxDQUFWO1dBQ0EsSUFBQyxDQUFBLE1BQUQsQ0FBUSxDQUFSLEVBQVUsQ0FBVjtFQUZzQjs7RUFHdkIsSUFBSSxDQUFDLEtBQUwsQ0FBQTs7RUFDQSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQWYsR0FBMEIsU0FBQTtBQUN6QixRQUFBO0lBQUEsS0FBQSxHQUFRO0lBQ1IsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFmLENBQUE7SUFDQSxLQUFLLENBQUMsU0FBTixDQUFBO1dBQ0EsS0FBSyxDQUFDLEtBQU4sQ0FBQTtFQUp5Qjs7RUFNMUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFmLEdBQXVCLFNBQUMsR0FBRDtBQUN0QixRQUFBO0FBQUE7QUFBQSxTQUFBLDZDQUFBOztBQUNDLFdBQUEsa0RBQUE7O1FBRUMsSUFBRyxJQUFDLENBQUEsT0FBRCxHQUFTLENBQVQsR0FBVyxHQUFYLEdBQWUsSUFBSSxDQUFDLENBQXBCLEdBQXNCLENBQXRCLElBQTRCLENBQUMsSUFBSSxDQUFDLFFBQWxDLElBQStDLENBQUMsSUFBSSxDQUFDLE9BQXhEO1VBRUMsSUFBQyxDQUFBLFNBQUQsQ0FBQTtVQUNBLElBQUMsQ0FBQSxLQUFELENBQUE7QUFDQSxpQkFBTyxNQUpSOztBQUZEO0FBREQ7RUFEc0I7O0VBVXZCLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBZixHQUF1QixTQUFBO0lBQ3RCLElBQUMsQ0FBQSxLQUFLLENBQUMsV0FBUCxHQUFxQjtJQUNyQixJQUFDLENBQUEsS0FBSyxDQUFDLEtBQVAsQ0FBQTtXQUNBLEVBQUEsQ0FBRyxVQUFILENBQ0MsQ0FBQyxJQURGLENBQUE7RUFIc0I7O0VBS3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBZixHQUF3QixTQUFBO0FBQ3ZCLFFBQUE7SUFBQSxLQUFBLEdBQVE7SUFDUixJQUFDLENBQUEsS0FBSyxDQUFDLElBQVAsQ0FBQTtJQUNBLENBQUMsQ0FBQyxPQUFGLENBQ0M7TUFBQSxNQUFBLEVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBQyxDQUFBLE9BQUQsR0FBUyxFQUFWLENBQUQsR0FBZSxDQUFmLEdBQWlCLENBQWxCLENBQUEsR0FBb0IsS0FBOUI7S0FERCxFQUNvQztNQUNsQyxJQUFBLEVBQUssU0FBQyxHQUFELEVBQUssRUFBTDtRQUNKLElBQUcsR0FBQSxHQUFJLEVBQUosR0FBTyxLQUFLLENBQUMsR0FBTixHQUFVLEtBQUssQ0FBQyxJQUExQjtpQkFFQyxLQUFLLENBQUMsR0FBTixHQUZEOztNQURJLENBRDZCO01BS2xDLFFBQUEsRUFBUyxJQUx5QjtNQU1sQyxNQUFBLEVBQU8sYUFOMkI7TUFPbEMsUUFBQSxFQUFTLFNBQUE7ZUFDUixLQUFLLENBQUMsTUFBTixDQUFBO01BRFEsQ0FQeUI7S0FEcEM7RUFIdUI7O0VBZXhCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBZixHQUF3QixTQUFBO0FBQ3ZCLFFBQUE7SUFBQSxLQUFBLEdBQVE7SUFDUixDQUFDLENBQUMsT0FBRixDQUNDO01BQUEsTUFBQSxFQUFTLENBQUMsQ0FBQyxDQUFDLElBQUMsQ0FBQSxPQUFGLEdBQVUsRUFBVixHQUFhLENBQWQsQ0FBQSxHQUFpQixDQUFDLElBQUMsQ0FBQSxPQUFELEdBQVMsSUFBQyxDQUFBLEdBQVgsQ0FBbEIsQ0FBQSxHQUFrQyxLQUEzQztLQURELEVBRUM7TUFDQyxJQUFBLEVBQUssU0FBQyxHQUFELEVBQUssRUFBTDtRQUNKLElBQUcsR0FBQSxHQUFJLEVBQUosR0FBTyxLQUFLLENBQUMsR0FBTixHQUFVLEtBQUssQ0FBQyxJQUExQjtVQUVDLEtBQUssQ0FBQyxHQUFOLEdBRkQ7O1FBR0EsSUFBRyxJQUFDLENBQUEsT0FBRCxHQUFTLEVBQVQsR0FBWSxHQUFaLEdBQWdCLEdBQW5CO1VBQ0MsS0FBSyxDQUFDLE1BQU4sQ0FBYSxDQUFiLEVBQWUsQ0FBZixFQUREOztRQUVBLElBQUcsR0FBQSxJQUFPLEVBQUUsQ0FBQyxHQUFiO1VBQ0MsT0FBTyxDQUFDLEdBQVIsQ0FBWSxHQUFaLEVBQWdCLEVBQUUsQ0FBQyxHQUFuQjtVQUdBLEtBQUssQ0FBQyxNQUFOLENBQWEsQ0FBYixFQUFlLENBQWY7aUJBQ0EsRUFBRSxDQUFDLEdBQUgsR0FBUyxFQUxWOztNQU5JLENBRE47TUFhQyxRQUFBLEVBQVMsS0FBSyxDQUFDLEtBYmhCO01BY0MsTUFBQSxFQUFPLFFBZFI7TUFlQyxRQUFBLEVBQVMsU0FBQTtRQUNSLE9BQU8sQ0FBQyxHQUFSLENBQVksVUFBWjtRQUNBLEtBQUssQ0FBQyxLQUFOLElBQWU7UUFDZixLQUFLLENBQUMsR0FBTixHQUFZO1FBQ1osS0FBSyxDQUFDLE1BQU4sQ0FBQTtNQUpRLENBZlY7S0FGRDtFQUZ1QjtBQXJIeEIiLCJzb3VyY2VzQ29udGVudCI6WyJkZXZpY2VXaWR0aCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aFxyXG5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuZm9udFNpemUgPSBcIiN7ZGV2aWNlV2lkdGgvMTB9cHhcIlxyXG5cclxuZ2xvYmFsID0gd2luZG93XHJcbkMgPSBqcSgnLmNvbnRlbnQnKVxyXG5fc2xpY2UgPSBbXS5zbGljZVxyXG5wZW9wbGVDb3VudCA9IDExXHJcbkdhbWUucHJvdG90eXBlLnJlbmRlclNlYXRzX1Blb3BsZSA9ICgpLT4j5oyH5a6a5ZOq5Yeg6aG5LDAsMeWNs+WPquWhq+WKoOesrOS4gOW5heeahOm7hOW6p+WSjOWwj+S6ulxyXG5cdF90aGlzID0gQFxyXG5cdCMgY29uc29sZS5sb2cgSlNPTi5zdHJpbmdpZnkgQC5zZWF0cyxudWxsLDJcclxuXHRmb3IgY29sdW1uLGMgaW4gQHNlYXRzXHJcblx0XHRjb250aW51ZSBpZiBfc2xpY2UuYXBwbHkoYXJndW1lbnRzKS5pbmRleE9mKGMpID09IC0xXHJcblx0XHRmb3Igcm93LHIgaW4gY29sdW1uXHJcblx0XHRcdHNlYXQgPSBAc2VhdHNbY11bcl1cclxuXHRcdFx0anEgXCIuY29udGVudCAuc2VhdFtjPSN7Y31dW3I9I3tyfV1cIlxyXG5cdFx0XHRcdC5yZW1vdmVDbGFzcyAneWVsbG93J1xyXG5cdFx0XHRcdC5yZW1vdmVDbGFzcyAnb2NjdXBpZWQnXHJcblx0XHRcdGlmIHNlYXQueWVsbG93XHJcblx0XHRcdFx0anEgXCIuY29udGVudCAuc2VhdFtjPSN7Y31dW3I9I3tyfV1cIlxyXG5cdFx0XHRcdFx0LmFkZENsYXNzICd5ZWxsb3cnXHJcblx0XHRcdGlmIHNlYXQub2NjdXBpZWRcclxuXHRcdFx0XHRqcSBcIi5jb250ZW50IC5zZWF0W2M9I3tjfV1bcj0je3J9XVwiXHJcblx0XHRcdFx0XHQuYWRkQ2xhc3MgJ29jY3VwaWVkJ1xyXG5cdGZvciBjLGkgaW4gYXJndW1lbnRzXHJcblx0XHRqcSBcIi5jb250ZW50IC5zZWF0W2M9I3tjfV0sLmNvbnRlbnQgLnNlYXRbYz0je2N9XSAucGVvcGxlXCJcclxuXHRcdFx0Lm9mZigpI+ino+e7keafkOWHoOmhueeahOaJgOacieS6i+S7tlxyXG5cdFx0anEgXCIuY29udGVudCAuc2VhdFtjPSN7Y31dLm9jY3VwaWVkIC5wZW9wbGVcIlxyXG5cdFx0XHQub25lICd0YXAnLChldiktPiPnu5nkurrnu5Hlrprngrnlh7vnu5PmnZ/ml7bpl7RcclxuXHRcdFx0XHRfdGhpcy5nYW1lb3ZlcigpXHJcblx0XHRcdFx0ZXYuc3RvcFByb3BhZ2F0aW9uKClcclxuXHRcdGpxIFwiLmNvbnRlbnQgLnNlYXRbYz0je2N9XVwiXHJcblx0XHRcdC5vbmUgJ3RhcCcsKGV2KS0+I+e7mem7hOW6p+e7keWumueCueWHu+e7k+adn+aXtumXtFxyXG5cdFx0XHRcdGlmICQodGhpcykuaGFzQ2xhc3MgJ3llbGxvdydcclxuXHRcdFx0XHRcdF90aGlzLmdhbWVvdmVyKCkgXHJcblx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0X3RoaXMuc2NvcmUrK1xyXG5cdFx0XHRcdFx0X3RoaXMuc2VhdHNbJCh0aGlzKS5hdHRyKCdjJyldWyQodGhpcykuYXR0cigncicpXS5jbGlja2VkID0gdHJ1ZVxyXG5cdFx0XHRcdFx0JCAnLnNjb3JlJ1xyXG5cdFx0XHRcdFx0XHQucmVtb3ZlKClcclxuXHRcdFx0XHRcdCQgJzxwPjwvcD4nXHJcblx0XHRcdFx0XHRcdC5hZGRDbGFzcyAnc2NvcmUgYW5pbWF0ZWQgem9vbUluJ1xyXG5cdFx0XHRcdFx0XHQudGV4dCBfdGhpcy5zY29yZVxyXG5cdFx0XHRcdFx0XHQuYXBwZW5kVG8gJ2JvZHknXHJcblx0XHRqcSBcIi5jb250ZW50IC5zZWF0W2M9I3tjfV0gLnBlb3BsZVwiXHJcblx0XHRcdC5jc3NcclxuXHRcdFx0XHRiYWNrZ3JvdW5kSW1hZ2U6XCJcIlxyXG5cdFx0anEgXCIuY29udGVudCAuc2VhdFtjPSN7Y31dLm9jY3VwaWVkIC5wZW9wbGVcIlxyXG5cdFx0XHQuZWFjaCAoaW5kZXgpLT5cclxuXHRcdFx0XHRqcSB0aGlzXHJcblx0XHRcdFx0XHQuY3NzXHJcblx0XHRcdFx0XHRcdGJhY2tncm91bmRJbWFnZTpcInVybChhcHAvaW1nLyN7KGluZGV4JXBlb3BsZUNvdW50KSsxfS5wbmcpXCJcclxuR2FtZS5wcm90b3R5cGUuY2xlYXIgPSAoKS0+XHJcblx0Zm9yIGNvbHVtbixjIGluIEBzZWF0c1xyXG5cdFx0Y29udGludWUgaWYgX3NsaWNlLmFwcGx5KGFyZ3VtZW50cykuaW5kZXhPZihjKSA9PSAtMVxyXG5cdFx0Zm9yIHJvdyxyIGluIGNvbHVtblxyXG5cdFx0XHRkZWxldGUgQHNlYXRzW2NdW3JdLnllbGxvd1xyXG5cdFx0XHRkZWxldGUgQHNlYXRzW2NdW3JdLm9jY3VwaWVkXHJcblx0XHRcdGRlbGV0ZSBAc2VhdHNbY11bcl0uY2xpY2tlZFxyXG5HYW1lLnByb3RvdHlwZS5yZW5kZXIgPSAoKS0+XHJcblx0QGNsZWFyLmFwcGx5KEAsYXJndW1lbnRzKVxyXG5cdEByb2xsWVNlYXRQZW9wbGUuYXBwbHkoQCxhcmd1bWVudHMpXHJcblx0QHJlbmRlclNlYXRzX1Blb3BsZS5hcHBseShALGFyZ3VtZW50cylcclxuR2FtZS5wcm90b3R5cGUucm9sbFlTZWF0UGVvcGxlID0gKCktPiPku44zNuS4quaVsOaNruS4reWGs+WumjXkuKrpu4TluqflkowyMuS4quiiq+WNoOS9jee9rizlubblpI3liLYx5Lu9XHJcblx0QHllbGxvd1NlYXROdW0gPSA1XHJcblx0QHBlb3BsZSA9IDIyXHJcblx0d2hpbGUgQHllbGxvd1NlYXROdW1cclxuXHRcdGMgPSB1LnJhbiBhcmd1bWVudHNbMF0sYXJndW1lbnRzWzFdKzFcclxuXHRcdHIgPSB1LnJhbiAwLEBzZWF0UlxyXG5cdFx0aWYgIUBzZWF0c1tjXVtyXS55ZWxsb3dcclxuXHRcdFx0QHNlYXRzW2NdW3JdLnllbGxvdyA9IHRydWVcclxuXHRcdFx0QHllbGxvd1NlYXROdW0tLVxyXG5cdHdoaWxlIEBwZW9wbGVcclxuXHRcdGMgPSB1LnJhbiBhcmd1bWVudHNbMF0sYXJndW1lbnRzWzFdKzFcclxuXHRcdHIgPSB1LnJhbiAwLEBzZWF0UlxyXG5cdFx0aWYgIUBzZWF0c1tjXVtyXS5vY2N1cGllZFxyXG5cdFx0XHRAc2VhdHNbY11bcl0ub2NjdXBpZWQgPSB0cnVlXHJcblx0XHRcdEBwZW9wbGUtLVxyXG5HYW1lLnByb3RvdHlwZS5wYWludCA9ICgpLT5cclxuXHRAcmVuZGVyKDIsMylcclxuXHRAcmVuZGVyKDAsMSlcclxuZ2FtZS5wYWludCgpXHJcbkdhbWUucHJvdG90eXBlLmdhbWVvdmVyID0gKCktPlxyXG5cdF90aGlzID0gQFxyXG5cdF90aGlzLm1fd3JvbmdlLnBsYXkoKVxyXG5cdF90aGlzLmNsb3NlVmlldygpXHJcblx0X3RoaXMubVN0b3AoKVxyXG5cclxuR2FtZS5wcm90b3R5cGUuY2hlY2sgPSAoZGlzKS0+XHJcblx0Zm9yIGNvbHVtbixjIGluIEBzZWF0c1xyXG5cdFx0Zm9yIHNlYXQscyBpbiBjb2x1bW5cclxuXHRcdFx0IyBjb25zb2xlLmxvZyBAcEhlaWdodCoyK2Rpcy1zZWF0LnlcclxuXHRcdFx0aWYgQHBIZWlnaHQqMitkaXMtc2VhdC55PDAgYW5kICFzZWF0Lm9jY3VwaWVkIGFuZCAhc2VhdC5jbGlja2VkXHJcblx0XHRcdFx0IyBjb25zb2xlLmxvZyBzZWF0LGMscyxzZWF0c1xyXG5cdFx0XHRcdEBjbG9zZVZpZXcoKVxyXG5cdFx0XHRcdEBtU3RvcCgpXHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlXHJcbiMgZ2FtZS5wYWludCgpXHJcbkdhbWUucHJvdG90eXBlLm1TdG9wID0gKCktPlxyXG5cdEBtX2JnbS5jdXJyZW50VGltZSA9IDBcclxuXHRAbV9iZ20ucGF1c2UoKVxyXG5cdGpxICcuY29udGVudCdcclxuXHRcdC5zdG9wKClcclxuR2FtZS5wcm90b3R5cGUubVN0YXJ0ID0gKCktPlxyXG5cdF90aGlzID0gQFxyXG5cdEBtX2JnbS5wbGF5KClcclxuXHRDLmFuaW1hdGVcclxuXHRcdGJvdHRvbTogXCIjey0oQHBIZWlnaHQvNzIpKjEvNH1yZW1cIix7XHJcblx0XHRcdHN0ZXA6KG5vdyxmeCktPlxyXG5cdFx0XHRcdGlmIG5vdyo3MjxfdGhpcy5jdXIqX3RoaXMuc3RlcFxyXG5cdFx0XHRcdFx0IyBfdGhpcy5jaGVjayBub3cqNzJcclxuXHRcdFx0XHRcdF90aGlzLmN1cisrXHJcblx0XHRcdGR1cmF0aW9uOjYwMDBcclxuXHRcdFx0ZWFzaW5nOidlYXNlSW5DdWJpYydcclxuXHRcdFx0Y29tcGxldGU6KCktPlxyXG5cdFx0XHRcdF90aGlzLm1Hb2luZygpXHJcblx0XHR9XHJcblx0cmV0dXJuXHJcbkdhbWUucHJvdG90eXBlLm1Hb2luZyA9ICgpLT5cclxuXHRfdGhpcyA9IEBcclxuXHRDLmFuaW1hdGVcclxuXHRcdGJvdHRvbTpcIiN7KC1AcEhlaWdodC83MioyKSsoQHdIZWlnaHQvQHJlbSl9cmVtXCIsXHJcblx0XHR7XHJcblx0XHRcdHN0ZXA6KG5vdyxmeCktPlxyXG5cdFx0XHRcdGlmIG5vdyo3MjxfdGhpcy5jdXIqX3RoaXMuc3RlcFxyXG5cdFx0XHRcdFx0IyBfdGhpcy5jaGVjayBub3cqNzJcclxuXHRcdFx0XHRcdF90aGlzLmN1cisrXHJcblx0XHRcdFx0aWYoQHBIZWlnaHQvNzItbm93PjIwMCkgI1xyXG5cdFx0XHRcdFx0X3RoaXMucmVuZGVyKDAsMSlcclxuXHRcdFx0XHRpZiBub3cgPD0gZnguZW5kXHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhub3csZnguZW5kKVxyXG5cdFx0XHRcdFx0IyBkZWJ1Z2dlcjtcclxuXHRcdFx0XHRcdCMgX3RoaXMucGFpbnQoKVxyXG5cdFx0XHRcdFx0X3RoaXMucmVuZGVyKDIsMylcclxuXHRcdFx0XHRcdGZ4Lm5vdyA9IDBcclxuXHRcdFx0ZHVyYXRpb246X3RoaXMuc3BlZWRcclxuXHRcdFx0ZWFzaW5nOidsaW5lYXInXHJcblx0XHRcdGNvbXBsZXRlOigpLT5cclxuXHRcdFx0XHRjb25zb2xlLmxvZyAnY29tcGxldGUnXHJcblx0XHRcdFx0X3RoaXMuc3BlZWQgLT0gNTAwXHJcblx0XHRcdFx0X3RoaXMuY3VyID0gMVxyXG5cdFx0XHRcdF90aGlzLm1Hb2luZygpXHJcblx0XHRcdFx0cmV0dXJuXHRcclxuXHRcdH1cclxuXHRyZXR1cm4iXX0=
