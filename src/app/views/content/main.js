(function() {
  var C, bindEvent, changePoint, deviceWidth, global, mGoing, pHeight, paint, peopleCount, putPeopleAndBar, putSeats, rollYSeatPeople, score, seatC, seatR, wHeight;

  $.noConflict();

  window.jq = jQuery;

  deviceWidth = document.documentElement.clientWidth;

  document.documentElement.style.fontSize = (deviceWidth / 10) + "px";

  global = window;

  C = jq('.content');

  pHeight = 4540 / 72;

  wHeight = jq(window).height();

  changePoint = (-pHeight - wHeight / (deviceWidth / 10)) + "rem";

  seatR = 18;

  seatC = 2;

  peopleCount = 11;

  score = 0;

  putSeats = function(c, r) {
    var people, seat;
    seat = seatData[c][r];
    console.log(seat.occupied);
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
    }).append(people).appendTo('.content .pic2');
  };

  putPeopleAndBar = function() {
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
          }).appendTo('.content .pic2'));
        }
        return results1;
      })());
    }
    return results;
  };

  bindEvent = function() {
    return $('.content .seat').tap(function() {
      $('.score').remove();
      return $('<p></p>').addClass('score animated zoomIn').text(++score).appendTo('body');
    });
  };

  rollYSeatPeople = function() {
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

  paint = function() {
    var c, column, i, j, len, len1, r, row;
    rollYSeatPeople();
    for (c = i = 0, len = seatData.length; i < len; c = ++i) {
      column = seatData[c];
      for (r = j = 0, len1 = column.length; j < len1; r = ++j) {
        row = column[r];
        putSeats(c, r);
      }
    }
    putPeopleAndBar();
    return bindEvent();
  };

  paint();

  jq('.content>div').height(pHeight + "rem");

  global.mStart = function() {
    C.animate({
      bottom: (-pHeight * 1 / 4) + "rem"
    }, 400, 'easeInCubic', function() {
      return mGoing();
    });
  };

  mGoing = function() {
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
        mGoing();
      }
    });
  };

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvY29udGVudC9tYWluLmpzIiwic291cmNlcyI6WyJ2aWV3cy9jb250ZW50L21haW4uY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTs7RUFBQSxDQUFDLENBQUMsVUFBRixDQUFBOztFQUNBLE1BQU0sQ0FBQyxFQUFQLEdBQVk7O0VBQ1osV0FBQSxHQUFjLFFBQVEsQ0FBQyxlQUFlLENBQUM7O0VBQ3ZDLFFBQVEsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLFFBQS9CLEdBQTRDLENBQUMsV0FBQSxHQUFZLEVBQWIsQ0FBQSxHQUFnQjs7RUFFNUQsTUFBQSxHQUFTOztFQUNULENBQUEsR0FBSSxFQUFBLENBQUcsVUFBSDs7RUFDSixPQUFBLEdBQVUsSUFBQSxHQUFLOztFQUNmLE9BQUEsR0FBVSxFQUFBLENBQUcsTUFBSCxDQUFVLENBQUMsTUFBWCxDQUFBOztFQUNWLFdBQUEsR0FBZ0IsQ0FBQyxDQUFDLE9BQUQsR0FBUyxPQUFBLEdBQVEsQ0FBQyxXQUFBLEdBQVksRUFBYixDQUFsQixDQUFBLEdBQW1DOztFQUNuRCxLQUFBLEdBQVE7O0VBQ1IsS0FBQSxHQUFROztFQUNSLFdBQUEsR0FBYzs7RUFDZCxLQUFBLEdBQVE7O0VBRVIsUUFBQSxHQUFXLFNBQUMsQ0FBRCxFQUFHLENBQUg7QUFDVixRQUFBO0lBQUEsSUFBQSxHQUFPLFFBQVMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFBO0lBQ25CLE9BQU8sQ0FBQyxHQUFSLENBQVksSUFBSSxDQUFDLFFBQWpCO0lBQ0EsTUFBQSxHQUFTLEVBQUEsQ0FBRyxlQUFILENBQ1IsQ0FBQyxRQURPLENBQ0UsU0FBQTtBQUNULFVBQUE7TUFBQSxVQUFBLEdBQWE7TUFDYixJQUEyQixJQUFJLENBQUMsUUFBaEM7ZUFBQSxVQUFBLElBQVksWUFBWjs7SUFGUyxDQURGO1dBSVQsRUFBQSxDQUFHLGFBQUgsQ0FDQyxDQUFDLFFBREYsQ0FDVyxTQUFBO0FBQ1QsVUFBQTtNQUFBLFVBQUEs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RkwsRUFFbUIsU0FBQTthQUNsQixNQUFBLENBQUE7SUFEa0IsQ0FGbkI7RUFEZTs7RUFNaEIsTUFBQSxHQUFTLFNBQUE7SUFDUixDQUFDLENBQUMsT0FBRixDQUNDO01BQUEsTUFBQSxFQUFTLENBQUMsQ0FBQyxPQUFELEdBQVMsT0FBQSxHQUFRLENBQUMsV0FBQSxHQUFZLEVBQWIsQ0FBbEIsQ0FBQSxHQUFtQyxLQUE1QztLQURELEVBRUM7TUFDQyxJQUFBLEVBQUssU0FBQyxHQUFELEVBQUssRUFBTDtRQUNKLElBQUcsR0FBQSxJQUFPLEVBQUUsQ0FBQyxHQUFiO2lCQUNDLEVBQUUsQ0FBQyxHQUFILEdBQVMsRUFEVjs7TUFESSxDQUROO01BSUMsUUFBQSxFQUFTLElBSlY7TUFLQyxNQUFBLEVBQU8sUUFMUjtNQU1DLFFBQUEsRUFBUyxTQUFBO1FBQ1IsTUFBQSxDQUFBO01BRFEsQ0FOVjtLQUZEO0VBRFE7QUF0R1QiLCJzb3VyY2VzQ29udGVudCI6WyIkLm5vQ29uZmxpY3QoKVxyXG53aW5kb3cuanEgPSBqUXVlcnlcclxuZGV2aWNlV2lkdGggPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGhcclxuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLmZvbnRTaXplID0gXCIje2RldmljZVdpZHRoLzEwfXB4XCJcclxuXHJcbmdsb2JhbCA9IHdpbmRvd1xyXG5DID0ganEoJy5jb250ZW50JylcclxucEhlaWdodCA9IDQ1NDAvNzIjIHBpY3R1cmUgaGVpZ2h0XHJcbndIZWlnaHQgPSBqcSh3aW5kb3cpLmhlaWdodCgpIyBzY3JlZW4gaGVpZ2h0XHJcbmNoYW5nZVBvaW50ID0gXCIjey1wSGVpZ2h0LXdIZWlnaHQvKGRldmljZVdpZHRoLzEwKX1yZW1cIjtcclxuc2VhdFIgPSAxOFxyXG5zZWF0QyA9IDJcclxucGVvcGxlQ291bnQgPSAxMVxyXG5zY29yZSA9IDBcclxuIyBwdXQgc2VhdHNcclxucHV0U2VhdHMgPSAoYyxyKS0+XHJcblx0c2VhdCA9IHNlYXREYXRhW2NdW3JdXHJcblx0Y29uc29sZS5sb2cgc2VhdC5vY2N1cGllZFxyXG5cdHBlb3BsZSA9IGpxICc8c3Bhbj48L3NwYW4+J1xyXG5cdFx0LmFkZENsYXNzICgpLT5cclxuXHRcdFx0YWRkZWRDbGFzcyA9ICdwZW9wbGUnXHJcblx0XHRcdGFkZGVkQ2xhc3MrPScgb2NjdXBpZWQnIGlmIHNlYXQub2NjdXBpZWRcclxuXHRqcSAnPGRpdj48L2Rpdj4nXHJcblx0XHQuYWRkQ2xhc3MgKCktPlxyXG5cdFx0XHRhZGRlZENsYXNzID0gJ3NlYXQnXHJcblx0XHRcdGFkZGVkQ2xhc3MrPScgeWVsbG93JyBpZiBzZWF0LnllbGxvd1xyXG5cdFx0XHRpZiBjIHRoZW4gYWRkZWRDbGFzcys9JyByaWdodCcgZWxzZSBhZGRlZENsYXNzKz0nIGxlZnQnXHJcblx0XHRcdGFkZGVkQ2xhc3NcclxuXHRcdC5jc3NcclxuXHRcdFx0bGVmdDpcIiN7c2VhdC54LzcyfXJlbVwiXHJcblx0XHRcdHRvcDpcIiN7c2VhdC55LzcyfXJlbVwiXHJcblx0XHRcdHdpZHRoOlwiI3syMDEvNzJ9cmVtXCJcclxuXHRcdFx0aGVpZ2h0OlwiI3sxNzgvNzJ9cmVtXCJcclxuXHRcdC5hcHBlbmQgcGVvcGxlXHJcblx0XHQuYXBwZW5kVG8gJy5jb250ZW50IC5waWMyJ1xyXG5wdXRQZW9wbGVBbmRCYXIgPSAoKS0+XHJcblx0anEoJy5jb250ZW50IC5wZW9wbGUnKVxyXG5cdFx0LmVhY2ggKGluZGV4KS0+XHJcblx0XHRcdGpxIHRoaXNcclxuXHRcdFx0XHQuY3NzXHJcblx0XHRcdFx0XHRiYWNrZ3JvdW5kSW1hZ2U6XCJ1cmwoYXBwL2ltZy8jeyhpbmRleCVwZW9wbGVDb3VudCkrMX0ucG5nKVwiXHJcblx0XHRcdFx0XHR3aWR0aDpcIiN7MjI0LzcyfXJlbVwiXHJcblx0XHRcdFx0XHRoZWlnaHQ6XCIjezE0NS83Mn1yZW1cIlxyXG5cdFx0XHRcdFx0dG9wOlwiI3sxNi83Mn1yZW1cIlxyXG5cdFx0XHRcdFx0cmlnaHQ6XCIjezExLzcyfXJlbVwiXHJcblx0Zm9yIGNvbHVtbixjIGluIGJhckRhdGFcclxuXHRcdGZvciByb3csciBpbiBjb2x1bW5cclxuXHRcdFx0YmFyID0gYmFyRGF0YVtjXVtyXVxyXG5cdFx0XHRqcSAnPGk+PC9pPidcclxuXHRcdFx0XHQuYWRkQ2xhc3MgKCktPlxyXG5cdFx0XHRcdFx0YWRkZWRDbGFzcyA9ICdiYXInXHJcblx0XHRcdFx0XHRpZiAhYyB0aGVuIGFkZGVkQ2xhc3MrPSAnIGxlZnQnIGVsc2UgYWRkZWRDbGFzcys9JyByaWdodCdcclxuXHRcdFx0XHRcdGlmICEociUyKSB0aGVuIGFkZGVkQ2xhc3MrPSAnIHRvcCcgZWxzZSBhZGRlZENsYXNzKz0nIGJvdHRvbSdcclxuXHRcdFx0XHRcdGFkZGVkQ2xhc3NcclxuXHRcdFx0XHQuY3NzXHJcblx0XHRcdFx0XHR3aWR0aDpcIiN7MjE0LzcyfXJlbVwiXHJcblx0XHRcdFx0XHRoZWlnaHQ6XCIjezQzLzcyfXJlbVwiXHJcblx0XHRcdFx0XHR0b3A6XCIje2Jhci55LzcyfXJlbVwiXHJcblx0XHRcdFx0XHRsZWZ0OlwiI3tiYXIueC83Mn1yZW1cIlxyXG5cdFx0XHRcdC5hcHBlbmRUbyAnLmNvbnRlbnQgLnBpYzInXHJcbmJpbmRFdmVudCA9ICgpLT5cclxuXHQkICcuY29udGVudCAuc2VhdCdcclxuXHRcdC50YXAgKCktPlxyXG5cdFx0XHQkICcuc2NvcmUnXHJcblx0XHRcdFx0LnJlbW92ZSgpXHJcblx0XHRcdCQgJzxwPjwvcD4nXHJcblx0XHRcdFx0LmFkZENsYXNzICdzY29yZSBhbmltYXRlZCB6b29tSW4nXHJcblx0XHRcdFx0LnRleHQgKytzY29yZVxyXG5cdFx0XHRcdC5hcHBlbmRUbyAnYm9keSdcclxucm9sbFlTZWF0UGVvcGxlID0gKCktPlxyXG5cdG51bSA9IDVcclxuXHRwZW9wbGUgPSAyMlxyXG5cdHdoaWxlIG51bVxyXG5cdFx0YyA9IHUucmFuIDAsc2VhdENcclxuXHRcdHIgPSB1LnJhbiAwLHNlYXRSXHJcblx0XHRpZiAhc2VhdERhdGFbY11bcl0ueWVsbG93XHJcblx0XHRcdHNlYXREYXRhW2NdW3JdLnllbGxvdyA9IHRydWVcclxuXHRcdFx0bnVtLS1cclxuXHR3aGlsZSBwZW9wbGVcclxuXHRcdGMgPSB1LnJhbiAwLHNlYXRDXHJcblx0XHRyID0gdS5yYW4gMCxzZWF0UlxyXG5cdFx0aWYgIXNlYXREYXRhW2NdW3JdLm9jY3VwaWVkXHJcblx0XHRcdHNlYXREYXRhW2NdW3JdLm9jY3VwaWVkID0gdHJ1ZVxyXG5cdFx0XHRwZW9wbGUtLVxyXG5wYWludCA9ICgpLT5cclxuXHRyb2xsWVNlYXRQZW9wbGUoKVxyXG5cdGZvciBjb2x1bW4sYyBpbiBzZWF0RGF0YVxyXG5cdFx0Zm9yIHJvdyxyIGluIGNvbHVtblxyXG5cdFx0XHRwdXRTZWF0cyBjLHJcclxuXHRwdXRQZW9wbGVBbmRCYXIoKVxyXG5cdGJpbmRFdmVudCgpXHJcblxyXG5wYWludCgpXHJcbmpxICcuY29udGVudD5kaXYnXHJcblx0LmhlaWdodCBcIiN7cEhlaWdodH1yZW1cIlxyXG5cclxuZ2xvYmFsLm1TdGFydCA9ICgpLT5cclxuXHRDLmFuaW1hdGUgXHJcblx0XHRib3R0b206IFwiI3stcEhlaWdodCoxLzR9cmVtXCIsXHJcblx0LDQwMCwnZWFzZUluQ3ViaWMnLCgpLT5cclxuXHRcdG1Hb2luZygpXHJcblx0cmV0dXJuXHJcbm1Hb2luZyA9ICgpLT5cclxuXHRDLmFuaW1hdGVcclxuXHRcdGJvdHRvbTpcIiN7LXBIZWlnaHQtd0hlaWdodC8oZGV2aWNlV2lkdGgvMTApfXJlbVwiLFxyXG5cdFx0e1xyXG5cdFx0XHRzdGVwOihub3csZngpLT5cclxuXHRcdFx0XHRpZiBub3cgPD0gZnguZW5kXHJcblx0XHRcdFx0XHRmeC5ub3cgPSAwXHJcblx0XHRcdGR1cmF0aW9uOjUwMDBcclxuXHRcdFx0ZWFzaW5nOidsaW5lYXInXHJcblx0XHRcdGNvbXBsZXRlOigpLT5cclxuXHRcdFx0XHRtR29pbmcoKVxyXG5cdFx0XHRcdHJldHVyblx0XHJcblx0XHR9XHJcblx0cmV0dXJuIl19
