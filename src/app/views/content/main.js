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
    $('.content .seat').one('tap', function() {
      $('.score').remove();
      return $('<p></p>').addClass('score animated zoomIn').text(++score).appendTo('body');
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvY29udGVudC9tYWluLmpzIiwic291cmNlcyI6WyJ2aWV3cy9jb250ZW50L21haW4uY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTs7RUFBQSxXQUFBLEdBQWMsUUFBUSxDQUFDLGVBQWUsQ0FBQzs7RUFDdkMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsUUFBL0IsR0FBNEMsQ0FBQyxXQUFBLEdBQVksRUFBYixDQUFBLEdBQWdCOztFQUU1RCxNQUFBLEdBQVM7O0VBQ1QsQ0FBQSxHQUFJLEVBQUEsQ0FBRyxVQUFIOztFQUNKLE9BQUEsR0FBVSxJQUFBLEdBQUs7O0VBQ2YsT0FBQSxHQUFVLEVBQUEsQ0FBRyxNQUFILENBQVUsQ0FBQyxNQUFYLENBQUE7O0VBQ1YsV0FBQSxHQUFnQixDQUFDLENBQUMsT0FBRCxHQUFTLE9BQUEsR0FBUSxDQUFDLFdBQUEsR0FBWSxFQUFiLENBQWxCLENBQUEsR0FBbUM7O0VBQ25ELEtBQUEsR0FBUSxRQUFTLENBQUEsQ0FBQSxDQUFFLENBQUM7O0VBQ3BCLEtBQUEsR0FBUSxRQUFRLENBQUM7O0VBQ2pCLFdBQUEsR0FBYzs7RUFDZCxLQUFBLEdBQVE7O0VBRVIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFmLEdBQTBCLFNBQUMsQ0FBRCxFQUFHLENBQUg7QUFDekIsUUFBQTtJQUFBLElBQUEsR0FBTyxRQUFTLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBQTtJQUNuQixNQUFBLEdBQVMsRUFBQSxDQUFHLGVBQUgsQ0FDUixDQUFDLFFBRE8sQ0FDRSxTQUFBO0FBQ1QsVUFBQTtNQUFBLFVBQUEsR0FBYTtNQUNiLElBQTJCLElBQUksQ0FBQyxRQUFoQztlQUFBLFVBQUEsSUFBWSxZQUFaOztJQUZTLENBREY7V0FJVCxFQUFBLENBQUcsYUFBSCxDQUNDLENBQUMsUUFERixDQUNXLFNBQUE7QUFDVCxVQUFBO01BQUEsVUFBQSxHQUFhO01BQ2IsSUFBeUIsSUFBSSxDQUFDLE1BQTlCO1FB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O01BTUMsUUFBQSxFQUFTLFNBQUE7UUFDUixJQUFDLENBQUEsTUFBRCxDQUFBO01BRFEsQ0FOVjtLQUZEO0VBRHVCO0FBL0d4QiIsInNvdXJjZXNDb250ZW50IjpbImRldmljZVdpZHRoID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoXHJcbmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5mb250U2l6ZSA9IFwiI3tkZXZpY2VXaWR0aC8xMH1weFwiXHJcblxyXG5nbG9iYWwgPSB3aW5kb3dcclxuQyA9IGpxKCcuY29udGVudCcpXHJcbnBIZWlnaHQgPSA0NTQwLzcyIyBwaWN0dXJlIGhlaWdodFxyXG53SGVpZ2h0ID0ganEod2luZG93KS5oZWlnaHQoKSMgc2NyZWVuIGhlaWdodFxyXG5jaGFuZ2VQb2ludCA9IFwiI3stcEhlaWdodC13SGVpZ2h0LyhkZXZpY2VXaWR0aC8xMCl9cmVtXCI7XHJcbnNlYXRSID0gc2VhdERhdGFbMF0ubGVuZ3RoXHJcbnNlYXRDID0gc2VhdERhdGEubGVuZ3RoXHJcbnBlb3BsZUNvdW50ID0gMTFcclxuc2NvcmUgPSAwXHJcbiMgcHV0IHNlYXRzXHJcbkdhbWUucHJvdG90eXBlLnB1dFNlYXRzID0gKGMsciktPlxyXG5cdHNlYXQgPSBzZWF0RGF0YVtjXVtyXVxyXG5cdHBlb3BsZSA9IGpxICc8c3Bhbj48L3NwYW4+J1xyXG5cdFx0LmFkZENsYXNzICgpLT5cclxuXHRcdFx0YWRkZWRDbGFzcyA9ICdwZW9wbGUnXHJcblx0XHRcdGFkZGVkQ2xhc3MrPScgb2NjdXBpZWQnIGlmIHNlYXQub2NjdXBpZWRcclxuXHRqcSAnPGRpdj48L2Rpdj4nXHJcblx0XHQuYWRkQ2xhc3MgKCktPlxyXG5cdFx0XHRhZGRlZENsYXNzID0gJ3NlYXQnXHJcblx0XHRcdGFkZGVkQ2xhc3MrPScgeWVsbG93JyBpZiBzZWF0LnllbGxvd1xyXG5cdFx0XHRpZiBjIHRoZW4gYWRkZWRDbGFzcys9JyByaWdodCcgZWxzZSBhZGRlZENsYXNzKz0nIGxlZnQnXHJcblx0XHRcdGFkZGVkQ2xhc3NcclxuXHRcdC5jc3NcclxuXHRcdFx0bGVmdDpcIiN7c2VhdC54LzcyfXJlbVwiXHJcblx0XHRcdHRvcDpcIiN7c2VhdC55LzcyfXJlbVwiXHJcblx0XHRcdHdpZHRoOlwiI3syMDEvNzJ9cmVtXCJcclxuXHRcdFx0aGVpZ2h0OlwiI3sxNzgvNzJ9cmVtXCJcclxuXHRcdC5hcHBlbmQgcGVvcGxlXHJcblx0XHQuYXBwZW5kVG8gJy5jb250ZW50IC5waWMyLC5jb250ZW50IC5waWMxJ1xyXG5HYW1lLnByb3RvdHlwZS5wdXRQZW9wbGVBbmRCYXIgPSAoKS0+XHJcblx0anEoJy5jb250ZW50IC5wZW9wbGUnKVxyXG5cdFx0LmVhY2ggKGluZGV4KS0+XHJcblx0XHRcdGpxIHRoaXNcclxuXHRcdFx0XHQuY3NzXHJcblx0XHRcdFx0XHRiYWNrZ3JvdW5kSW1hZ2U6XCJ1cmwoYXBwL2ltZy8jeyhpbmRleCVwZW9wbGVDb3VudCkrMX0ucG5nKVwiXHJcblx0XHRcdFx0XHR3aWR0aDpcIiN7MjI0LzcyfXJlbVwiXHJcblx0XHRcdFx0XHRoZWlnaHQ6XCIjezE0NS83Mn1yZW1cIlxyXG5cdFx0XHRcdFx0dG9wOlwiI3sxNi83Mn1yZW1cIlxyXG5cdFx0XHRcdFx0cmlnaHQ6XCIjezExLzcyfXJlbVwiXHJcblx0Zm9yIGNvbHVtbixjIGluIGJhckRhdGFcclxuXHRcdGZvciByb3csciBpbiBjb2x1bW5cclxuXHRcdFx0YmFyID0gYmFyRGF0YVtjXVtyXVxyXG5cdFx0XHRqcSAnPGk+PC9pPidcclxuXHRcdFx0XHQuYWRkQ2xhc3MgKCktPlxyXG5cdFx0XHRcdFx0YWRkZWRDbGFzcyA9ICdiYXInXHJcblx0XHRcdFx0XHRpZiAhYyB0aGVuIGFkZGVkQ2xhc3MrPSAnIGxlZnQnIGVsc2UgYWRkZWRDbGFzcys9JyByaWdodCdcclxuXHRcdFx0XHRcdGlmICEociUyKSB0aGVuIGFkZGVkQ2xhc3MrPSAnIHRvcCcgZWxzZSBhZGRlZENsYXNzKz0nIGJvdHRvbSdcclxuXHRcdFx0XHRcdGFkZGVkQ2xhc3NcclxuXHRcdFx0XHQuY3NzXHJcblx0XHRcdFx0XHR3aWR0aDpcIiN7MjE0LzcyfXJlbVwiXHJcblx0XHRcdFx0XHRoZWlnaHQ6XCIjezQzLzcyfXJlbVwiXHJcblx0XHRcdFx0XHR0b3A6XCIje2Jhci55LzcyfXJlbVwiXHJcblx0XHRcdFx0XHRsZWZ0OlwiI3tiYXIueC83Mn1yZW1cIlxyXG5cdFx0XHRcdC5hcHBlbmRUbyAnLmNvbnRlbnQgLnBpYzIsLmNvbnRlbnQgLnBpYzEnXHJcbkdhbWUucHJvdG90eXBlLmJpbmRFdmVudCA9ICgpLT5cclxuXHRfdGhpcyA9IEBcclxuXHQkICcuY29udGVudCAuc2VhdCdcclxuXHRcdC5vbmUgJ3RhcCcsKCktPlxyXG5cdFx0XHQkICcuc2NvcmUnXHJcblx0XHRcdFx0LnJlbW92ZSgpXHJcblx0XHRcdCQgJzxwPjwvcD4nXHJcblx0XHRcdFx0LmFkZENsYXNzICdzY29yZSBhbmltYXRlZCB6b29tSW4nXHJcblx0XHRcdFx0LnRleHQgKytzY29yZVxyXG5cdFx0XHRcdC5hcHBlbmRUbyAnYm9keSdcclxuXHQkICcuY29udGVudCAuc2VhdCAucGVvcGxlJ1xyXG5cdFx0Lm9uZSAndGFwJywoZXYpLT5cclxuXHRcdFx0X3RoaXMuY2xvc2VWaWV3KClcclxuXHRcdFx0ZXYuc3RvcFByb3BhZ2F0aW9uKClcclxuR2FtZS5wcm90b3R5cGUucm9sbFlTZWF0UGVvcGxlID0gKCktPlxyXG5cdG51bSA9IDVcclxuXHRwZW9wbGUgPSAyMlxyXG5cdHdoaWxlIG51bVxyXG5cdFx0YyA9IHUucmFuIDAsc2VhdENcclxuXHRcdHIgPSB1LnJhbiAwLHNlYXRSXHJcblx0XHRpZiAhc2VhdERhdGFbY11bcl0ueWVsbG93XHJcblx0XHRcdHNlYXREYXRhW2NdW3JdLnllbGxvdyA9IHRydWVcclxuXHRcdFx0bnVtLS1cclxuXHR3aGlsZSBwZW9wbGVcclxuXHRcdGMgPSB1LnJhbiAwLHNlYXRDXHJcblx0XHRyID0gdS5yYW4gMCxzZWF0UlxyXG5cdFx0aWYgIXNlYXREYXRhW2NdW3JdLm9jY3VwaWVkXHJcblx0XHRcdHNlYXREYXRhW2NdW3JdLm9jY3VwaWVkID0gdHJ1ZVxyXG5cdFx0XHRwZW9wbGUtLVxyXG5HYW1lLnByb3RvdHlwZS5jbGVhciA9ICgpLT5cclxuXHQkICcucGljMidcclxuXHRcdC5lbXB0eSgpXHJcblx0Zm9yIGNvbHVtbixjIGluIHNlYXREYXRhXHJcblx0XHRmb3Igcm93LHIgaW4gY29sdW1uXHJcblx0XHRcdGRlbGV0ZSBzZWF0RGF0YVtjXVtyXS55ZWxsb3dcclxuXHRcdFx0ZGVsZXRlIHNlYXREYXRhW2NdW3JdLm9jY3VwaWVkXHJcbkdhbWUucHJvdG90eXBlLnBhaW50ID0gKCktPlxyXG5cdEBjbGVhcigpXHJcblx0QHJvbGxZU2VhdFBlb3BsZSgpXHJcblx0Zm9yIGNvbHVtbixjIGluIHNlYXREYXRhXHJcblx0XHRmb3Igcm93LHIgaW4gY29sdW1uXHJcblx0XHRcdEBwdXRTZWF0cyBjLHJcclxuXHRAcHV0UGVvcGxlQW5kQmFyKClcclxuXHRAYmluZEV2ZW50KClcclxuXHJcbmpxICcuY29udGVudD5kaXYnXHJcblx0LmhlaWdodCBcIiN7cEhlaWdodH1yZW1cIlxyXG5cclxuR2FtZS5wcm90b3R5cGUubVN0YXJ0ID0gKCktPlxyXG5cdEMuYW5pbWF0ZSBcclxuXHRcdGJvdHRvbTogXCIjey1wSGVpZ2h0KjEvNH1yZW1cIixcclxuXHQsNDAwLCdlYXNlSW5DdWJpYycsKCktPlxyXG5cdFx0QG1Hb2luZygpXHJcblx0cmV0dXJuXHJcbkdhbWUucHJvdG90eXBlLm1Hb2luZyA9ICgpLT5cclxuXHRDLmFuaW1hdGVcclxuXHRcdGJvdHRvbTpcIiN7LXBIZWlnaHQtd0hlaWdodC8oZGV2aWNlV2lkdGgvMTApfXJlbVwiLFxyXG5cdFx0e1xyXG5cdFx0XHRzdGVwOihub3csZngpLT5cclxuXHRcdFx0XHRpZiBub3cgPD0gZnguZW5kXHJcblx0XHRcdFx0XHRmeC5ub3cgPSAwXHJcblx0XHRcdGR1cmF0aW9uOjUwMDBcclxuXHRcdFx0ZWFzaW5nOidsaW5lYXInXHJcblx0XHRcdGNvbXBsZXRlOigpLT5cclxuXHRcdFx0XHRAbUdvaW5nKClcclxuXHRcdFx0XHRyZXR1cm5cdFxyXG5cdFx0fVxyXG5cdHJldHVybiJdfQ==
