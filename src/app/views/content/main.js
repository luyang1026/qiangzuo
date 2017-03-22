(function() {
  var C, bindEvent, changePoint, clear, deviceWidth, global, mGoing, pHeight, peopleCount, putPeopleAndBar, putSeats, rollYSeatPeople, score, seatC, seatR, wHeight;

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

  putSeats = function(c, r) {
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
    $('.content .seat').on('tap', function() {
      console.log('seat');
      $('.score').remove();
      return $('<p></p>').addClass('score animated zoomIn').text(++score).appendTo('body');
    });
    return $('.content .seat .people').one('tap', function(ev) {
      closeView();
      return ev.stopPropagation();
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

  clear = function() {
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

  global.paint = function() {
    var c, column, i, j, len, len1, r, row;
    clear();
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvY29udGVudC9tYWluLmpzIiwic291cmNlcyI6WyJ2aWV3cy9jb250ZW50L21haW4uY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTs7RUFBQSxXQUFBLEdBQWMsUUFBUSxDQUFDLGVBQWUsQ0FBQzs7RUFDdkMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsUUFBL0IsR0FBNEMsQ0FBQyxXQUFBLEdBQVksRUFBYixDQUFBLEdBQWdCOztFQUU1RCxNQUFBLEdBQVM7O0VBQ1QsQ0FBQSxHQUFJLEVBQUEsQ0FBRyxVQUFIOztFQUNKLE9BQUEsR0FBVSxJQUFBLEdBQUs7O0VBQ2YsT0FBQSxHQUFVLEVBQUEsQ0FBRyxNQUFILENBQVUsQ0FBQyxNQUFYLENBQUE7O0VBQ1YsV0FBQSxHQUFnQixDQUFDLENBQUMsT0FBRCxHQUFTLE9BQUEsR0FBUSxDQUFDLFdBQUEsR0FBWSxFQUFiLENBQWxCLENBQUEsR0FBbUM7O0VBQ25ELEtBQUEsR0FBUSxRQUFTLENBQUEsQ0FBQSxDQUFFLENBQUM7O0VBQ3BCLEtBQUEsR0FBUSxRQUFRLENBQUM7O0VBQ2pCLFdBQUEsR0FBYzs7RUFDZCxLQUFBLEdBQVE7O0VBRVIsUUFBQSxHQUFXLFNBQUMsQ0FBRCxFQUFHLENBQUg7QUFDVixRQUFBO0lBQUEsSUFBQSxHQUFPLFFBQVMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFBO0lBQ25CLE1BQUEsR0FBUyxFQUFBLENBQUcsZUFBSCxDQUNSLENBQUMsUUFETyxDQUNFLFNBQUE7QUFDVCxVQUFBO01BQUEsVUFBQSxHQUFhO01BQ2IsSUFBMkIsSUFBSSxDQUFDLFFBQWhDO2VBQUEsVUFBQSxJQUFZLFlBQVo7O0lBRlMsQ0FERjtXQUlULEVBQUEsQ0FBRyxhQUFILENBQ0MsQ0FBQyxRQURGLENBQ1csU0FBQTtBQUNULFVBQUE7TUFBQSxVQUFBLEdBQWE7TUFDYixJQUF5QixJQUFJLENBQUMsTUFBOUI7UUFBQSxVQUFBLElBQVksVUFBWjs7TUFD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LENBQUE7SUFDQSxlQUFBLENBQUE7QUFDQSxTQUFBLGtEQUFBOztBQUNDLFdBQUEsa0RBQUE7O1FBQ0MsUUFBQSxDQUFTLENBQVQsRUFBVyxDQUFYO0FBREQ7QUFERDtJQUdBLGVBQUEsQ0FBQTtXQUNBLFNBQUEsQ0FBQTtFQVBjOztFQVNmLEtBQUEsQ0FBQTs7RUFDQSxFQUFBLENBQUcsY0FBSCxDQUNDLENBQUMsTUFERixDQUNZLE9BQUQsR0FBUyxLQURwQjs7RUFHQSxNQUFNLENBQUMsTUFBUCxHQUFnQixTQUFBO0lBQ2YsQ0FBQyxDQUFDLE9BQUYsQ0FDQztNQUFBLE1BQUEsRUFBVSxDQUFDLENBQUMsT0FBRCxHQUFTLENBQVQsR0FBVyxDQUFaLENBQUEsR0FBYyxLQUF4QjtLQURELEVBRUMsR0FGRCxFQUVLLGFBRkwsRUFFbUIsU0FBQTthQUNsQixNQUFBLENBQUE7SUFEa0IsQ0FGbkI7RUFEZTs7RUFNaEIsTUFBQSxHQUFTLFNBQUE7SUFDUixDQUFDLENBQUMsT0FBRixDQUNDO01BQUEsTUFBQSxFQUFTLENBQUMsQ0FBQyxPQUFELEdBQVMsT0FBQSxHQUFRLENBQUMsV0FBQSxHQUFZLEVBQWIsQ0FBbEIsQ0FBQSxHQUFtQyxLQUE1QztLQURELEVBRUM7TUFDQyxJQUFBLEVBQUssU0FBQyxHQUFELEVBQUssRUFBTDtRQUNKLElBQUcsR0FBQSxJQUFPLEVBQUUsQ0FBQyxHQUFiO2lCQUNDLEVBQUUsQ0FBQyxHQUFILEdBQVMsRUFEVjs7TUFESSxDQUROO01BSUMsUUFBQSxFQUFTLElBSlY7TUFLQyxNQUFBLEVBQU8sUUFMUjtNQU1DLFFBQUEsRUFBUyxTQUFBO1FBQ1IsTUFBQSxDQUFBO01BRFEsQ0FOVjtLQUZEO0VBRFE7QUFoSFQiLCJzb3VyY2VzQ29udGVudCI6WyJkZXZpY2VXaWR0aCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aFxyXG5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuZm9udFNpemUgPSBcIiN7ZGV2aWNlV2lkdGgvMTB9cHhcIlxyXG5cclxuZ2xvYmFsID0gd2luZG93XHJcbkMgPSBqcSgnLmNvbnRlbnQnKVxyXG5wSGVpZ2h0ID0gNDU0MC83MiMgcGljdHVyZSBoZWlnaHRcclxud0hlaWdodCA9IGpxKHdpbmRvdykuaGVpZ2h0KCkjIHNjcmVlbiBoZWlnaHRcclxuY2hhbmdlUG9pbnQgPSBcIiN7LXBIZWlnaHQtd0hlaWdodC8oZGV2aWNlV2lkdGgvMTApfXJlbVwiO1xyXG5zZWF0UiA9IHNlYXREYXRhWzBdLmxlbmd0aFxyXG5zZWF0QyA9IHNlYXREYXRhLmxlbmd0aFxyXG5wZW9wbGVDb3VudCA9IDExXHJcbnNjb3JlID0gMFxyXG4jIHB1dCBzZWF0c1xyXG5wdXRTZWF0cyA9IChjLHIpLT5cclxuXHRzZWF0ID0gc2VhdERhdGFbY11bcl1cclxuXHRwZW9wbGUgPSBqcSAnPHNwYW4+PC9zcGFuPidcclxuXHRcdC5hZGRDbGFzcyAoKS0+XHJcblx0XHRcdGFkZGVkQ2xhc3MgPSAncGVvcGxlJ1xyXG5cdFx0XHRhZGRlZENsYXNzKz0nIG9jY3VwaWVkJyBpZiBzZWF0Lm9jY3VwaWVkXHJcblx0anEgJzxkaXY+PC9kaXY+J1xyXG5cdFx0LmFkZENsYXNzICgpLT5cclxuXHRcdFx0YWRkZWRDbGFzcyA9ICdzZWF0J1xyXG5cdFx0XHRhZGRlZENsYXNzKz0nIHllbGxvdycgaWYgc2VhdC55ZWxsb3dcclxuXHRcdFx0aWYgYyB0aGVuIGFkZGVkQ2xhc3MrPScgcmlnaHQnIGVsc2UgYWRkZWRDbGFzcys9JyBsZWZ0J1xyXG5cdFx0XHRhZGRlZENsYXNzXHJcblx0XHQuY3NzXHJcblx0XHRcdGxlZnQ6XCIje3NlYXQueC83Mn1yZW1cIlxyXG5cdFx0XHR0b3A6XCIje3NlYXQueS83Mn1yZW1cIlxyXG5cdFx0XHR3aWR0aDpcIiN7MjAxLzcyfXJlbVwiXHJcblx0XHRcdGhlaWdodDpcIiN7MTc4LzcyfXJlbVwiXHJcblx0XHQuYXBwZW5kIHBlb3BsZVxyXG5cdFx0LmFwcGVuZFRvICcuY29udGVudCAucGljMidcclxucHV0UGVvcGxlQW5kQmFyID0gKCktPlxyXG5cdGpxKCcuY29udGVudCAucGVvcGxlJylcclxuXHRcdC5lYWNoIChpbmRleCktPlxyXG5cdFx0XHRqcSB0aGlzXHJcblx0XHRcdFx0LmNzc1xyXG5cdFx0XHRcdFx0YmFja2dyb3VuZEltYWdlOlwidXJsKGFwcC9pbWcvI3soaW5kZXglcGVvcGxlQ291bnQpKzF9LnBuZylcIlxyXG5cdFx0XHRcdFx0d2lkdGg6XCIjezIyNC83Mn1yZW1cIlxyXG5cdFx0XHRcdFx0aGVpZ2h0OlwiI3sxNDUvNzJ9cmVtXCJcclxuXHRcdFx0XHRcdHRvcDpcIiN7MTYvNzJ9cmVtXCJcclxuXHRcdFx0XHRcdHJpZ2h0OlwiI3sxMS83Mn1yZW1cIlxyXG5cdGZvciBjb2x1bW4sYyBpbiBiYXJEYXRhXHJcblx0XHRmb3Igcm93LHIgaW4gY29sdW1uXHJcblx0XHRcdGJhciA9IGJhckRhdGFbY11bcl1cclxuXHRcdFx0anEgJzxpPjwvaT4nXHJcblx0XHRcdFx0LmFkZENsYXNzICgpLT5cclxuXHRcdFx0XHRcdGFkZGVkQ2xhc3MgPSAnYmFyJ1xyXG5cdFx0XHRcdFx0aWYgIWMgdGhlbiBhZGRlZENsYXNzKz0gJyBsZWZ0JyBlbHNlIGFkZGVkQ2xhc3MrPScgcmlnaHQnXHJcblx0XHRcdFx0XHRpZiAhKHIlMikgdGhlbiBhZGRlZENsYXNzKz0gJyB0b3AnIGVsc2UgYWRkZWRDbGFzcys9JyBib3R0b20nXHJcblx0XHRcdFx0XHRhZGRlZENsYXNzXHJcblx0XHRcdFx0LmNzc1xyXG5cdFx0XHRcdFx0d2lkdGg6XCIjezIxNC83Mn1yZW1cIlxyXG5cdFx0XHRcdFx0aGVpZ2h0OlwiI3s0My83Mn1yZW1cIlxyXG5cdFx0XHRcdFx0dG9wOlwiI3tiYXIueS83Mn1yZW1cIlxyXG5cdFx0XHRcdFx0bGVmdDpcIiN7YmFyLngvNzJ9cmVtXCJcclxuXHRcdFx0XHQuYXBwZW5kVG8gJy5jb250ZW50IC5waWMyJ1xyXG5iaW5kRXZlbnQgPSAoKS0+XHJcblx0JCAnLmNvbnRlbnQgLnNlYXQnXHJcblx0XHQub24gJ3RhcCcsKCktPlxyXG5cdFx0XHRjb25zb2xlLmxvZyAnc2VhdCdcclxuXHRcdFx0JCAnLnNjb3JlJ1xyXG5cdFx0XHRcdC5yZW1vdmUoKVxyXG5cdFx0XHQkICc8cD48L3A+J1xyXG5cdFx0XHRcdC5hZGRDbGFzcyAnc2NvcmUgYW5pbWF0ZWQgem9vbUluJ1xyXG5cdFx0XHRcdC50ZXh0ICsrc2NvcmVcclxuXHRcdFx0XHQuYXBwZW5kVG8gJ2JvZHknXHJcblx0JCAnLmNvbnRlbnQgLnNlYXQgLnBlb3BsZSdcclxuXHRcdC5vbmUgJ3RhcCcsKGV2KS0+XHJcblx0XHRcdGNsb3NlVmlldygpXHJcblx0XHRcdGV2LnN0b3BQcm9wYWdhdGlvbigpXHJcbnJvbGxZU2VhdFBlb3BsZSA9ICgpLT5cclxuXHRudW0gPSA1XHJcblx0cGVvcGxlID0gMjJcclxuXHR3aGlsZSBudW1cclxuXHRcdGMgPSB1LnJhbiAwLHNlYXRDXHJcblx0XHRyID0gdS5yYW4gMCxzZWF0UlxyXG5cdFx0aWYgIXNlYXREYXRhW2NdW3JdLnllbGxvd1xyXG5cdFx0XHRzZWF0RGF0YVtjXVtyXS55ZWxsb3cgPSB0cnVlXHJcblx0XHRcdG51bS0tXHJcblx0d2hpbGUgcGVvcGxlXHJcblx0XHRjID0gdS5yYW4gMCxzZWF0Q1xyXG5cdFx0ciA9IHUucmFuIDAsc2VhdFJcclxuXHRcdGlmICFzZWF0RGF0YVtjXVtyXS5vY2N1cGllZFxyXG5cdFx0XHRzZWF0RGF0YVtjXVtyXS5vY2N1cGllZCA9IHRydWVcclxuXHRcdFx0cGVvcGxlLS1cclxuY2xlYXIgPSAoKS0+XHJcblx0JCAnLnBpYzInXHJcblx0XHQuZW1wdHkoKVxyXG5cdGZvciBjb2x1bW4sYyBpbiBzZWF0RGF0YVxyXG5cdFx0Zm9yIHJvdyxyIGluIGNvbHVtblxyXG5cdFx0XHRkZWxldGUgc2VhdERhdGFbY11bcl0ueWVsbG93XHJcblx0XHRcdGRlbGV0ZSBzZWF0RGF0YVtjXVtyXS5vY2N1cGllZFxyXG5nbG9iYWwucGFpbnQgPSAoKS0+XHJcblx0Y2xlYXIoKVxyXG5cdHJvbGxZU2VhdFBlb3BsZSgpXHJcblx0Zm9yIGNvbHVtbixjIGluIHNlYXREYXRhXHJcblx0XHRmb3Igcm93LHIgaW4gY29sdW1uXHJcblx0XHRcdHB1dFNlYXRzIGMsclxyXG5cdHB1dFBlb3BsZUFuZEJhcigpXHJcblx0YmluZEV2ZW50KClcclxuXHJcbnBhaW50KClcclxuanEgJy5jb250ZW50PmRpdidcclxuXHQuaGVpZ2h0IFwiI3twSGVpZ2h0fXJlbVwiXHJcblxyXG5nbG9iYWwubVN0YXJ0ID0gKCktPlxyXG5cdEMuYW5pbWF0ZSBcclxuXHRcdGJvdHRvbTogXCIjey1wSGVpZ2h0KjEvNH1yZW1cIixcclxuXHQsNDAwLCdlYXNlSW5DdWJpYycsKCktPlxyXG5cdFx0bUdvaW5nKClcclxuXHRyZXR1cm5cclxubUdvaW5nID0gKCktPlxyXG5cdEMuYW5pbWF0ZVxyXG5cdFx0Ym90dG9tOlwiI3stcEhlaWdodC13SGVpZ2h0LyhkZXZpY2VXaWR0aC8xMCl9cmVtXCIsXHJcblx0XHR7XHJcblx0XHRcdHN0ZXA6KG5vdyxmeCktPlxyXG5cdFx0XHRcdGlmIG5vdyA8PSBmeC5lbmRcclxuXHRcdFx0XHRcdGZ4Lm5vdyA9IDBcclxuXHRcdFx0ZHVyYXRpb246NTAwMFxyXG5cdFx0XHRlYXNpbmc6J2xpbmVhcidcclxuXHRcdFx0Y29tcGxldGU6KCktPlxyXG5cdFx0XHRcdG1Hb2luZygpXHJcblx0XHRcdFx0cmV0dXJuXHRcclxuXHRcdH1cclxuXHRyZXR1cm4iXX0=
