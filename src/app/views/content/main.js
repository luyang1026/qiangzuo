(function() {
  var C, changePoint, deviceWidth, global, pHeight, peopleCount, score, seatC, seatR, wHeight;

  deviceWidth = document.documentElement.clientWidth;

  document.documentElement.style.fontSize = (deviceWidth / 10) + "px";

  global = window;

  C = jq('.content');

  pHeight = 4540 / 72;

  wHeight = jq(window).height();

  changePoint = (-pHeight - wHeight / (deviceWidth / 10)) + "rem";

  seatR = seatData[0].length;

  seatC = seatData.length;

  peopleCount = 11;

  score = 0;

  Game.prototype.putSeats = function(c, r) {
    var people, seat;
    seat = seatData[c][r];
    people = jq('<span></span>').addClass(function() {
      var addedClass;
      addedClass = 'people';
      if (seat.occupied) {
        return addedClass += ' occupied';
      }
    });
    return jq('<div></div>').addClass(function() {
      var addedClass;
      addedClass = 'seat';
      if (seat.yellow) {
        addedClass += ' yellow';
      }
      if (c) {
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
    }).append(people).appendTo('.content .pic2,.content .pic1');
  };

  Game.prototype.putPeopleAndBar = function() {
    var bar, c, column, i, len, r, results, row;
    jq('.content .people').each(function(index) {
      return jq(this).css({
        backgroundImage: "url(app/img/" + ((index % peopleCount) + 1) + ".png)",
        width: (224 / 72) + "rem",
        height: (145 / 72) + "rem",
        top: (16 / 72) + "rem",
        right: (11 / 72) + "rem"
      });
    });
    results = [];
    for (c = i = 0, len = barData.length; i < len; c = ++i) {
      column = barData[c];
      results.push((function() {
        var j, len1, results1;
        results1 = [];
        for (r = j = 0, len1 = column.length; j < len1; r = ++j) {
          row = column[r];
          bar = barData[c][r];
          results1.push(jq('<i></i>').addClass(function() {
            var addedClass;
            addedClass = 'bar';
            if (!c) {
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
          }).appendTo('.content .pic2,.content .pic1'));
        }
        return results1;
      })());
    }
    return results;
  };

  Game.prototype.bindEvent = function() {
    var _this;
    _this = this;
    $('.content .seat').one('tap', function(ev) {
      if (!$(this).hasClass('yellow')) {
        $('.score').remove();
        return $('<p></p>').addClass('score animated zoomIn').text(++_this.score).appendTo('body');
      } else {
        _this.closeView();
        return ev.stopPropagation();
      }
    });
    return $('.content .seat .people').one('tap', function(ev) {
      _this.closeView();
      return ev.stopPropagation();
    });
  };

  Game.prototype.rollYSeatPeople = function() {
    var c, num, people, r, results;
    num = 5;
    people = 22;
    while (num) {
      c = u.ran(0, seatC);
      r = u.ran(0, seatR);
      if (!seatData[c][r].yellow) {
        seatData[c][r].yellow = true;
        num--;
      }
    }
    results = [];
    while (people) {
      c = u.ran(0, seatC);
      r = u.ran(0, seatR);
      if (!seatData[c][r].occupied) {
        seatData[c][r].occupied = true;
        results.push(people--);
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  Game.prototype.clear = function() {
    var c, column, i, len, r, results, row;
    $('.pic2').empty();
    results = [];
    for (c = i = 0, len = seatData.length; i < len; c = ++i) {
      column = seatData[c];
      results.push((function() {
        var j, len1, results1;
        results1 = [];
        for (r = j = 0, len1 = column.length; j < len1; r = ++j) {
          row = column[r];
          delete seatData[c][r].yellow;
          results1.push(delete seatData[c][r].occupied);
        }
        return results1;
      })());
    }
    return results;
  };

  Game.prototype.paint = function() {
    var c, column, i, j, len, len1, r, row;
    this.clear();
    this.rollYSeatPeople();
    for (c = i = 0, len = seatData.length; i < len; c = ++i) {
      column = seatData[c];
      for (r = j = 0, len1 = column.length; j < len1; r = ++j) {
        row = column[r];
        this.putSeats(c, r);
      }
    }
    this.putPeopleAndBar();
    return this.bindEvent();
  };

  jq('.content>div').height(pHeight + "rem");

  Game.prototype.mStart = function() {
    C.animate({
      bottom: (-pHeight * 1 / 4) + "rem"
    }, 400, 'easeInCubic', function() {
      return this.mGoing();
    });
  };

  Game.prototype.mGoing = function() {
    C.animate({
      bottom: (-pHeight - wHeight / (deviceWidth / 10)) + "rem"
    }, {
      step: function(now, fx) {
        if (now <= fx.end) {
          return fx.now = 0;
        }
      },
      duration: 5000,
      easing: 'linear',
      complete: function() {
        this.mGoing();
      }
    });
  };

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvY29udGVudC9tYWluLmpzIiwic291cmNlcyI6WyJ2aWV3cy9jb250ZW50L21haW4uY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTs7RUFBQSxXQUFBLEdBQWMsUUFBUSxDQUFDLGVBQWUsQ0FBQzs7RUFDdkMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsUUFBL0IsR0FBNEMsQ0FBQyxXQUFBLEdBQVksRUFBYixDQUFBLEdBQWdCOztFQUU1RCxNQUFBLEdBQVM7O0VBQ1QsQ0FBQSxHQUFJLEVBQUEsQ0FBRyxVQUFIOztFQUNKLE9BQUEsR0FBVSxJQUFBLEdBQUs7O0VBQ2YsT0FBQSxHQUFVLEVBQUEsQ0FBRyxNQUFILENBQVUsQ0FBQyxNQUFYLENBQUE7O0VBQ1YsV0FBQSxHQUFnQixDQUFDLENBQUMsT0FBRCxHQUFTLE9BQUEsR0FBUSxDQUFDLFdBQUEsR0FBWSxFQUFiLENBQWxCLENBQUEsR0FBbUM7O0VBQ25ELEtBQUEsR0FBUSxRQUFTLENBQUEsQ0FBQSxDQUFFLENBQUM7O0VBQ3BCLEtBQUEsR0FBUSxRQUFRLENBQUM7O0VBQ2pCLFdBQUEsR0FBYzs7RUFDZCxLQUFBLEdBQVE7O0VBRVIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFmLEdBQTBCLFNBQUMsQ0FBRCxFQUFHLENBQUg7QUFDekIsUUFBQTtJQUFBLElBQUEsR0FBTyxRQUFTLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBQTtJQUNuQixNQUFBLEdBQVMsRUFBQSxDQUFHLGVBQUgsQ0FDUixDQUFDLFFBRE8sQ0FDRSxTQUFBO0FBQ1QsVUFBQTtNQUFBLFVBQUEsR0FBYTtNQUNiLElBQTJCLElBQUksQ0FBQyxRQUFoQztlQUFBLFVBQUEsSUFBWSxZQUFaOztJQUZTLENBREY7V0FJVCxFQUFBLENBQUcsYUFBSCxDQUNDLENBQUMsUUFERixDQUNXLFNBQUE7QUFDVCxVQUFBO01BQUEsVUFBQSxHQUFhO01BQ2IsSUFBeUIsSUFBSSxDQUFDLE1BQTlCO1FB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Q0MsSUFBQSxFQUFLLFNBQUMsR0FBRCxFQUFLLEVBQUw7UUFDSixJQUFHLEdBQUEsSUFBTyxFQUFFLENBQUMsR0FBYjtpQkFDQyxFQUFFLENBQUMsR0FBSCxHQUFTLEVBRFY7O01BREksQ0FETjtNQUlDLFFBQUEsRUFBUyxJQUpWO01BS0MsTUFBQSxFQUFPLFFBTFI7TUFNQyxRQUFBLEVBQVMsU0FBQTtRQUNSLElBQUMsQ0FBQSxNQUFELENBQUE7TUFEUSxDQU5WO0tBRkQ7RUFEdUI7QUFuSHhCIiwic291cmNlc0NvbnRlbnQiOlsiZGV2aWNlV2lkdGggPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGhcclxuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLmZvbnRTaXplID0gXCIje2RldmljZVdpZHRoLzEwfXB4XCJcclxuXHJcbmdsb2JhbCA9IHdpbmRvd1xyXG5DID0ganEoJy5jb250ZW50JylcclxucEhlaWdodCA9IDQ1NDAvNzIjIHBpY3R1cmUgaGVpZ2h0XHJcbndIZWlnaHQgPSBqcSh3aW5kb3cpLmhlaWdodCgpIyBzY3JlZW4gaGVpZ2h0XHJcbmNoYW5nZVBvaW50ID0gXCIjey1wSGVpZ2h0LXdIZWlnaHQvKGRldmljZVdpZHRoLzEwKX1yZW1cIjtcclxuc2VhdFIgPSBzZWF0RGF0YVswXS5sZW5ndGhcclxuc2VhdEMgPSBzZWF0RGF0YS5sZW5ndGhcclxucGVvcGxlQ291bnQgPSAxMVxyXG5zY29yZSA9IDBcclxuIyBwdXQgc2VhdHNcclxuR2FtZS5wcm90b3R5cGUucHV0U2VhdHMgPSAoYyxyKS0+XHJcblx0c2VhdCA9IHNlYXREYXRhW2NdW3JdXHJcblx0cGVvcGxlID0ganEgJzxzcGFuPjwvc3Bhbj4nXHJcblx0XHQuYWRkQ2xhc3MgKCktPlxyXG5cdFx0XHRhZGRlZENsYXNzID0gJ3Blb3BsZSdcclxuXHRcdFx0YWRkZWRDbGFzcys9JyBvY2N1cGllZCcgaWYgc2VhdC5vY2N1cGllZFxyXG5cdGpxICc8ZGl2PjwvZGl2PidcclxuXHRcdC5hZGRDbGFzcyAoKS0+XHJcblx0XHRcdGFkZGVkQ2xhc3MgPSAnc2VhdCdcclxuXHRcdFx0YWRkZWRDbGFzcys9JyB5ZWxsb3cnIGlmIHNlYXQueWVsbG93XHJcblx0XHRcdGlmIGMgdGhlbiBhZGRlZENsYXNzKz0nIHJpZ2h0JyBlbHNlIGFkZGVkQ2xhc3MrPScgbGVmdCdcclxuXHRcdFx0YWRkZWRDbGFzc1xyXG5cdFx0LmNzc1xyXG5cdFx0XHRsZWZ0OlwiI3tzZWF0LngvNzJ9cmVtXCJcclxuXHRcdFx0dG9wOlwiI3tzZWF0LnkvNzJ9cmVtXCJcclxuXHRcdFx0d2lkdGg6XCIjezIwMS83Mn1yZW1cIlxyXG5cdFx0XHRoZWlnaHQ6XCIjezE3OC83Mn1yZW1cIlxyXG5cdFx0LmFwcGVuZCBwZW9wbGVcclxuXHRcdC5hcHBlbmRUbyAnLmNvbnRlbnQgLnBpYzIsLmNvbnRlbnQgLnBpYzEnXHJcbkdhbWUucHJvdG90eXBlLnB1dFBlb3BsZUFuZEJhciA9ICgpLT5cclxuXHRqcSgnLmNvbnRlbnQgLnBlb3BsZScpXHJcblx0XHQuZWFjaCAoaW5kZXgpLT5cclxuXHRcdFx0anEgdGhpc1xyXG5cdFx0XHRcdC5jc3NcclxuXHRcdFx0XHRcdGJhY2tncm91bmRJbWFnZTpcInVybChhcHAvaW1nLyN7KGluZGV4JXBlb3BsZUNvdW50KSsxfS5wbmcpXCJcclxuXHRcdFx0XHRcdHdpZHRoOlwiI3syMjQvNzJ9cmVtXCJcclxuXHRcdFx0XHRcdGhlaWdodDpcIiN7MTQ1LzcyfXJlbVwiXHJcblx0XHRcdFx0XHR0b3A6XCIjezE2LzcyfXJlbVwiXHJcblx0XHRcdFx0XHRyaWdodDpcIiN7MTEvNzJ9cmVtXCJcclxuXHRmb3IgY29sdW1uLGMgaW4gYmFyRGF0YVxyXG5cdFx0Zm9yIHJvdyxyIGluIGNvbHVtblxyXG5cdFx0XHRiYXIgPSBiYXJEYXRhW2NdW3JdXHJcblx0XHRcdGpxICc8aT48L2k+J1xyXG5cdFx0XHRcdC5hZGRDbGFzcyAoKS0+XHJcblx0XHRcdFx0XHRhZGRlZENsYXNzID0gJ2JhcidcclxuXHRcdFx0XHRcdGlmICFjIHRoZW4gYWRkZWRDbGFzcys9ICcgbGVmdCcgZWxzZSBhZGRlZENsYXNzKz0nIHJpZ2h0J1xyXG5cdFx0XHRcdFx0aWYgIShyJTIpIHRoZW4gYWRkZWRDbGFzcys9ICcgdG9wJyBlbHNlIGFkZGVkQ2xhc3MrPScgYm90dG9tJ1xyXG5cdFx0XHRcdFx0YWRkZWRDbGFzc1xyXG5cdFx0XHRcdC5jc3NcclxuXHRcdFx0XHRcdHdpZHRoOlwiI3syMTQvNzJ9cmVtXCJcclxuXHRcdFx0XHRcdGhlaWdodDpcIiN7NDMvNzJ9cmVtXCJcclxuXHRcdFx0XHRcdHRvcDpcIiN7YmFyLnkvNzJ9cmVtXCJcclxuXHRcdFx0XHRcdGxlZnQ6XCIje2Jhci54LzcyfXJlbVwiXHJcblx0XHRcdFx0LmFwcGVuZFRvICcuY29udGVudCAucGljMiwuY29udGVudCAucGljMSdcclxuR2FtZS5wcm90b3R5cGUuYmluZEV2ZW50ID0gKCktPlxyXG5cdF90aGlzID0gQFxyXG5cdCQgJy5jb250ZW50IC5zZWF0J1xyXG5cdFx0Lm9uZSAndGFwJywoZXYpLT5cclxuXHRcdFx0aWYgISQodGhpcykuaGFzQ2xhc3MoJ3llbGxvdycpXHJcblx0XHRcdFx0JCAnLnNjb3JlJ1xyXG5cdFx0XHRcdFx0LnJlbW92ZSgpXHJcblx0XHRcdFx0JCAnPHA+PC9wPidcclxuXHRcdFx0XHRcdC5hZGRDbGFzcyAnc2NvcmUgYW5pbWF0ZWQgem9vbUluJ1xyXG5cdFx0XHRcdFx0LnRleHQgKytfdGhpcy5zY29yZVxyXG5cdFx0XHRcdFx0LmFwcGVuZFRvICdib2R5J1xyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0X3RoaXMuY2xvc2VWaWV3KClcclxuXHRcdFx0XHRldi5zdG9wUHJvcGFnYXRpb24oKVxyXG5cdCQgJy5jb250ZW50IC5zZWF0IC5wZW9wbGUnXHJcblx0XHQub25lICd0YXAnLChldiktPlxyXG5cdFx0XHRfdGhpcy5jbG9zZVZpZXcoKVxyXG5cdFx0XHRldi5zdG9wUHJvcGFnYXRpb24oKVxyXG5HYW1lLnByb3RvdHlwZS5yb2xsWVNlYXRQZW9wbGUgPSAoKS0+XHJcblx0bnVtID0gNVxyXG5cdHBlb3BsZSA9IDIyXHJcblx0d2hpbGUgbnVtXHJcblx0XHRjID0gdS5yYW4gMCxzZWF0Q1xyXG5cdFx0ciA9IHUucmFuIDAsc2VhdFJcclxuXHRcdGlmICFzZWF0RGF0YVtjXVtyXS55ZWxsb3dcclxuXHRcdFx0c2VhdERhdGFbY11bcl0ueWVsbG93ID0gdHJ1ZVxyXG5cdFx0XHRudW0tLVxyXG5cdHdoaWxlIHBlb3BsZVxyXG5cdFx0YyA9IHUucmFuIDAsc2VhdENcclxuXHRcdHIgPSB1LnJhbiAwLHNlYXRSXHJcblx0XHRpZiAhc2VhdERhdGFbY11bcl0ub2NjdXBpZWRcclxuXHRcdFx0c2VhdERhdGFbY11bcl0ub2NjdXBpZWQgPSB0cnVlXHJcblx0XHRcdHBlb3BsZS0tXHJcbkdhbWUucHJvdG90eXBlLmNsZWFyID0gKCktPlxyXG5cdCQgJy5waWMyJ1xyXG5cdFx0LmVtcHR5KClcclxuXHRmb3IgY29sdW1uLGMgaW4gc2VhdERhdGFcclxuXHRcdGZvciByb3csciBpbiBjb2x1bW5cclxuXHRcdFx0ZGVsZXRlIHNlYXREYXRhW2NdW3JdLnllbGxvd1xyXG5cdFx0XHRkZWxldGUgc2VhdERhdGFbY11bcl0ub2NjdXBpZWRcclxuR2FtZS5wcm90b3R5cGUucGFpbnQgPSAoKS0+XHJcblx0QGNsZWFyKClcclxuXHRAcm9sbFlTZWF0UGVvcGxlKClcclxuXHRmb3IgY29sdW1uLGMgaW4gc2VhdERhdGFcclxuXHRcdGZvciByb3csciBpbiBjb2x1bW5cclxuXHRcdFx0QHB1dFNlYXRzIGMsclxyXG5cdEBwdXRQZW9wbGVBbmRCYXIoKVxyXG5cdEBiaW5kRXZlbnQoKVxyXG5cclxuanEgJy5jb250ZW50PmRpdidcclxuXHQuaGVpZ2h0IFwiI3twSGVpZ2h0fXJlbVwiXHJcblxyXG5HYW1lLnByb3RvdHlwZS5tU3RhcnQgPSAoKS0+XHJcblx0Qy5hbmltYXRlIFxyXG5cdFx0Ym90dG9tOiBcIiN7LXBIZWlnaHQqMS80fXJlbVwiLFxyXG5cdCw0MDAsJ2Vhc2VJbkN1YmljJywoKS0+XHJcblx0XHRAbUdvaW5nKClcclxuXHRyZXR1cm5cclxuR2FtZS5wcm90b3R5cGUubUdvaW5nID0gKCktPlxyXG5cdEMuYW5pbWF0ZVxyXG5cdFx0Ym90dG9tOlwiI3stcEhlaWdodC13SGVpZ2h0LyhkZXZpY2VXaWR0aC8xMCl9cmVtXCIsXHJcblx0XHR7XHJcblx0XHRcdHN0ZXA6KG5vdyxmeCktPlxyXG5cdFx0XHRcdGlmIG5vdyA8PSBmeC5lbmRcclxuXHRcdFx0XHRcdGZ4Lm5vdyA9IDBcclxuXHRcdFx0ZHVyYXRpb246NTAwMFxyXG5cdFx0XHRlYXNpbmc6J2xpbmVhcidcclxuXHRcdFx0Y29tcGxldGU6KCktPlxyXG5cdFx0XHRcdEBtR29pbmcoKVxyXG5cdFx0XHRcdHJldHVyblx0XHJcblx0XHR9XHJcblx0cmV0dXJuIl19
