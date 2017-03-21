(function() {
  var C, bindEvent, changePoint, clear, deviceWidth, global, mGoing, pHeight, peopleCount, putPeopleAndBar, putSeats, rollYSeatPeople, score, seatC, seatR, wHeight;

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
    return $('.content .seat .people').on('tap', function(ev) {
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

  window.paint = function() {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvY29udGVudC9tYWluLmpzIiwic291cmNlcyI6WyJ2aWV3cy9jb250ZW50L21haW4uY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTs7RUFBQSxXQUFBLEdBQWMsUUFBUSxDQUFDLGVBQWUsQ0FBQzs7RUFDdkMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsUUFBL0IsR0FBNEMsQ0FBQyxXQUFBLEdBQVksRUFBYixDQUFBLEdBQWdCOztFQUU1RCxNQUFBLEdBQVM7O0VBQ1QsQ0FBQSxHQUFJLEVBQUEsQ0FBRyxVQUFIOztFQUNKLE9BQUEsR0FBVSxJQUFBLEdBQUs7O0VBQ2YsT0FBQSxHQUFVLEVBQUEsQ0FBRyxNQUFILENBQVUsQ0FBQyxNQUFYLENBQUE7O0VBQ1YsV0FBQSxHQUFnQixDQUFDLENBQUMsT0FBRCxHQUFTLE9BQUEsR0FBUSxDQUFDLFdBQUEsR0FBWSxFQUFiLENBQWxCLENBQUEsR0FBbUM7O0VBQ25ELEtBQUEsR0FBUTs7RUFDUixLQUFBLEdBQVE7O0VBQ1IsV0FBQSxHQUFjOztFQUNkLEtBQUEsR0FBUTs7RUFFUixRQUFBLEdBQVcsU0FBQyxDQUFELEVBQUcsQ0FBSDtBQUNWLFFBQUE7SUFBQSxJQUFBLEdBQU8sUUFBUyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUE7SUFDbkIsTUFBQSxHQUFTLEVBQUEsQ0FBRyxlQUFILENBQ1IsQ0FBQyxRQURPLENBQ0UsU0FBQTtBQUNULFVBQUE7TUFBQSxVQUFBLEdBQWE7TUFDYixJQUEyQixJQUFJLENBQUMsUUFBaEM7ZUFBQSxVQUFBLElBQVksWUFBWjs7SUFGUyxDQURGO1dBSVQsRUFBQSxDQUFHLGFBQUgsQ0FDQyxDQUFDLFFBREYsQ0FDVyxTQUFBO0FBQ1QsVUFBQTtNQUFBLFVBQUEsR0FBYTtNQUNiLElBQXlCLElBQUksQ0FBQyxNQUE5QjtRQUFBLFVBQUEsSUFBWSxVQUFaOztNQUNBLElBQUcsQ0FBSDtRQUFVLFVBQUEsSUFBWSxTQUF0QjtPQUFBLE1BQUE7UUFBb0MsVUFBQSxJQUFZLFFBQWhEOzthQUNBO0lBSlMsQ0FEWCxDQU1DLENBQUMsR0FORixDQU9FO01BQUEsSUFBQSxFQUFPLENBQUMsSUFBSSxDQUFDLENBQUwsR0FBTyxFQUFSLENBQUEsR0FBVyxLQUFsQjtNQUNBLEdBQUEsRUFBTSxDQUFDLElBQUksQ0FBQyxDQUFMLEdBQU8sRUFBUixDQUFBLEdBQVcsS0FEakI7TUFFQSxLQUFBLEVBQVEsQ0FBQyxHQUFBLEdBQUksRUFBTCxDQUFBLEdBQVEsS0FGaEI7TUFHQSxNQUFBLEVBQVMsQ0FBQyxHQUFBLEdBQUksRUFBTCxDQUFBLEdBQVEsS0FIakI7S0FQRixDQVdDLENBQUMsTUFYRixDQVdTLE1BWFQsQ0FZQyxDQUFDLFFBWkYsQ0FZVyxnQkFaWDtFQU5VOztFQW1CWCxlQUFBLEdBQWtCLFNBQUE7QUFDakIsUUFBQTtJQUFBLEVBQUEsQ0FBRyxrQkFBSCxDQUNDLENBQUMsSUFERixDQUNPLFNBQUMsS0FBRDthQUNMLEVBQUEsQ0FBRyxJQUFILENBQ0MsQ0FBQyxHQURGLENBRUU7UUFBQSxlQUFBLEVBQWdCLGNBQUEsR0FBYyxDQUFDLENBQUMsS0FBQSxHQUFNLFdBQVAsQ0FBQSxHQUFvQixDQUFyQixDQUFkLEdBQXFDLE9BQXJEO1FBQ0EsS0FBQSxFQUFRLENBQUMsR0FBQSxHQUFJLEVBQUwsQ0FBQSxHQUFRLEtBRGhCO1FBRUEsTUFBQSxFQUFTLENBQUMsR0FBQSxHQUFJLEVBQUwsQ0FBQSxHQUFRLEtBRmpCO1FBR0EsR0FBQSxFQUFNLENBQUMsRUFBQSxHQUFHLEVBQUosQ0FBQSxHQUFPLEtBSGI7UUFJQSxLQUFBLEVBQVEsQ0FBQyxFQUFBLEdBQUcsRUFBSixDQUFBLEdBQU8sS0FKZjtPQUZGO0lBREssQ0FEUDtBQVNBO1NBQUEsaURBQUE7Ozs7QUFDQzthQUFBLGtEQUFBOztVQUNDLEdBQUEsR0FBTSxPQUFRLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBQTt3QkFDakIsRUFBQSxDQUFHLFNBQUgsQ0FDQyxDQUFDLFFBREYsQ0FDVyxTQUFBO0FBQ1QsZ0JBQUE7WUFBQSxVQUFBLEdBQWE7WUFDYixJQUFHLENBQUMsQ0FBSjtjQUFXLFVBQUEsSUFBYSxRQUF4QjthQUFBLE1BQUE7Y0FBcUMsVUFBQSxJQUFZLFNBQWpEOztZQUNBLElBQUcsQ0FBQyxDQUFDLENBQUEsR0FBRSxDQUFILENBQUo7Y0FBZSxVQUFBLElBQWEsT0FBNUI7YUFBQSxNQUFBO2NBQXdDLFVBQUEsSUFBWSxVQUFwRDs7bUJBQ0E7VUFKUyxDQURYLENBTUMsQ0FBQyxHQU5GLENBT0U7WUFBQSxLQUFBLEVBQVEsQ0FBQyxHQUFBLEdBQUksRUFBTCxDQUFBLEdBQVEsS0FBaEI7WUFDQSxNQUFBLEVBQVMsQ0FBQyxFQUFBLEdBQUcsRUFBSixDQUFBLEdBQU8sS0FEaEI7WUFFQSxHQUFBLEVBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBSixHQUFNLEVBQVAsQ0FBQSxHQUFVLEtBRmhCO1lBR0EsSUFBQSxFQUFPLENBQUMsR0FBRyxDQUFDLENBQUosR0FBTSxFQUFQLENBQUEsR0FBVSxLQUhqQjtXQVBGLENBV0MsQ0FBQyxRQVhGLENBV1csZ0JBWFg7QUFGRDs7O0FBREQ7O0VBVmlCOztFQXlCbEIsU0FBQSxHQUFZLFNBQUE7SUFDWCxDQUFBLENBQUUsZ0JBQUYsQ0FDQyxDQUFDLEVBREYsQ0FDSyxLQURMLEVBQ1csU0FBQTtNQUNULE9BQU8sQ0FBQyxHQUFSLENBQVksTUFBWjtNQUNBLENBQUEsQ0FBRSxRQUFGLENBQ0MsQ0FBQyxNQURGLENBQUE7YUFFQSxDQUFBLENBQUUsU0FBRixDQUNDLENBQUMsUUFERixDQUNXLHVCQURYLENBRUMsQ0FBQyxJQUZGLENBRU8sRUFBRSxLQUZULENBR0MsQ0FBQyxRQUhGLENBR1csTUFIWDtJQUpTLENBRFg7V0FTQSxDQUFBLENBQUUsd0JBQUYsQ0FDQyxDQUFDLEVBREYsQ0FDSyxLQURMLEVBQ1csU0FBQyxFQUFEO01BQ1QsU0FBQSxDQUFBO2FBQ0EsRUFBRSxDQUFDLGVBQUgsQ0FBQTtJQUZTLENBRFg7RUFWVzs7RUFjWixlQUFBLEdBQWtCLFNBQUE7QUFDakIsUUFBQTtJQUFBLEdBQUEsR0FBTTtJQUNOLE1BQUEsR0FBUztBQUNULFdBQU0sR0FBTjtNQUNDLENBQUEsR0FBSSxDQUFDLENBQUMsR0FBRixDQUFNLENBQU4sRUFBUSxLQUFSO01BQ0osQ0FBQSxHQUFJLENBQUMsQ0FBQyxHQUFGLENBQU0sQ0FBTixFQUFRLEtBQVI7TUFDSixJQUFHLENBQUMsUUFBUyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUEsQ0FBRSxDQUFDLE1BQW5CO1FBQ0MsUUFBUyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUEsQ0FBRSxDQUFDLE1BQWYsR0FBd0I7UUFDeEIsR0FBQSxHQUZEOztJQUhEO0FBTUE7V0FBTSxNQUFOO01BQ0MsQ0FBQSxHQUFJLENBQUMsQ0FBQyxHQUFGLENBQU0sQ0FBTixFQUFRLEtBQVI7TUFDSixDQUFBLEdBQUksQ0FBQyxDQUFDLEdBQUYsQ0FBTSxDQUFOLEVBQVEsS0FBUjtNQUNKLElBQUcsQ0FBQyxRQUFTLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBQSxDQUFFLENBQUMsUUFBbkI7UUFDQyxRQUFTLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBQSxDQUFFLENBQUMsUUFBZixHQUEwQjtxQkFDMUIsTUFBQSxJQUZEO09BQUEsTUFBQTs2QkFBQTs7SUFIRCxDQUFBOztFQVRpQjs7RUFlbEIsS0FBQSxHQUFRLFNBQUE7QUFDUCxRQUFBO0lBQUEsQ0FBQSxDQUFFLE9BQUYsQ0FDQyxDQUFDLEtBREYsQ0FBQTtBQUVBO1NBQUEsa0RBQUE7Ozs7QUFDQzthQUFBLGtEQUFBOztVQUNDLE9BQU8sUUFBUyxDQUFBLENBQUEsQ0FBRyxDQUFBLENBQUEsQ0FBRSxDQUFDO3dCQUN0QixPQUFPLFFBQVMsQ0FBQSxDQUFBLENBQUcsQ0FBQSxDQUFBLENBQUUsQ0FBQztBQUZ2Qjs7O0FBREQ7O0VBSE87O0VBT1IsTUFBTSxDQUFDLEtBQVAsR0FBZSxTQUFBO0FBQ2QsUUFBQTtJQUFBLEtBQUEsQ0FBQTtJQUNBLGVBQUEsQ0FBQTtBQUNBLFNBQUEsa0RBQUE7O0FBQ0MsV0FBQSxrREFBQTs7UUFDQyxRQUFBLENBQVMsQ0FBVCxFQUFXLENBQVg7QUFERDtBQUREO0lBR0EsZUFBQSxDQUFBO1dBQ0EsU0FBQSxDQUFBO0VBUGM7O0VBU2YsS0FBQSxDQUFBOztFQUNBLEVBQUEsQ0FBRyxjQUFILENBQ0MsQ0FBQyxNQURGLENBQ1ksT0FBRCxHQUFTLEtBRHBCOztFQUdBLE1BQU0sQ0FBQyxNQUFQLEdBQWdCLFNBQUE7SUFDZixDQUFDLENBQUMsT0FBRixDQUNDO01BQUEsTUFBQSxFQUFVLENBQUMsQ0FBQyxPQUFELEdBQVMsQ0FBVCxHQUFXLENBQVosQ0FBQSxHQUFjLEtBQXhCO0tBREQsRUFFQyxHQUZELEVBRUssYUFGTCxFQUVtQixTQUFBO2FBQ2xCLE1BQUEsQ0FBQTtJQURrQixDQUZuQjtFQURlOztFQU1oQixNQUFBLEdBQVMsU0FBQTtJQUNSLENBQUMsQ0FBQyxPQUFGLENBQ0M7TUFBQSxNQUFBLEVBQVMsQ0FBQyxDQUFDLE9BQUQsR0FBUyxPQUFBLEdBQVEsQ0FBQyxXQUFBLEdBQVksRUFBYixDQUFsQixDQUFBLEdBQW1DLEtBQTVDO0tBREQsRUFFQztNQUNDLElBQUEsRUFBSyxTQUFDLEdBQUQsRUFBSyxFQUFMO1FBQ0osSUFBRyxHQUFBLElBQU8sRUFBRSxDQUFDLEdBQWI7aUJBQ0MsRUFBRSxDQUFDLEdBQUgsR0FBUyxFQURWOztNQURJLENBRE47TUFJQyxRQUFBLEVBQVMsSUFKVjtNQUtDLE1BQUEsRUFBTyxRQUxSO01BTUMsUUFBQSxFQUFTLFNBQUE7UUFDUixNQUFBLENBQUE7TUFEUSxDQU5WO0tBRkQ7RUFEUTtBQWhIVCIsInNvdXJjZXNDb250ZW50IjpbImRldmljZVdpZHRoID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoXHJcbmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5mb250U2l6ZSA9IFwiI3tkZXZpY2VXaWR0aC8xMH1weFwiXHJcblxyXG5nbG9iYWwgPSB3aW5kb3dcclxuQyA9IGpxKCcuY29udGVudCcpXHJcbnBIZWlnaHQgPSA0NTQwLzcyIyBwaWN0dXJlIGhlaWdodFxyXG53SGVpZ2h0ID0ganEod2luZG93KS5oZWlnaHQoKSMgc2NyZWVuIGhlaWdodFxyXG5jaGFuZ2VQb2ludCA9IFwiI3stcEhlaWdodC13SGVpZ2h0LyhkZXZpY2VXaWR0aC8xMCl9cmVtXCI7XHJcbnNlYXRSID0gMThcclxuc2VhdEMgPSAyXHJcbnBlb3BsZUNvdW50ID0gMTFcclxuc2NvcmUgPSAwXHJcbiMgcHV0IHNlYXRzXHJcbnB1dFNlYXRzID0gKGMsciktPlxyXG5cdHNlYXQgPSBzZWF0RGF0YVtjXVtyXVxyXG5cdHBlb3BsZSA9IGpxICc8c3Bhbj48L3NwYW4+J1xyXG5cdFx0LmFkZENsYXNzICgpLT5cclxuXHRcdFx0YWRkZWRDbGFzcyA9ICdwZW9wbGUnXHJcblx0XHRcdGFkZGVkQ2xhc3MrPScgb2NjdXBpZWQnIGlmIHNlYXQub2NjdXBpZWRcclxuXHRqcSAnPGRpdj48L2Rpdj4nXHJcblx0XHQuYWRkQ2xhc3MgKCktPlxyXG5cdFx0XHRhZGRlZENsYXNzID0gJ3NlYXQnXHJcblx0XHRcdGFkZGVkQ2xhc3MrPScgeWVsbG93JyBpZiBzZWF0LnllbGxvd1xyXG5cdFx0XHRpZiBjIHRoZW4gYWRkZWRDbGFzcys9JyByaWdodCcgZWxzZSBhZGRlZENsYXNzKz0nIGxlZnQnXHJcblx0XHRcdGFkZGVkQ2xhc3NcclxuXHRcdC5jc3NcclxuXHRcdFx0bGVmdDpcIiN7c2VhdC54LzcyfXJlbVwiXHJcblx0XHRcdHRvcDpcIiN7c2VhdC55LzcyfXJlbVwiXHJcblx0XHRcdHdpZHRoOlwiI3syMDEvNzJ9cmVtXCJcclxuXHRcdFx0aGVpZ2h0OlwiI3sxNzgvNzJ9cmVtXCJcclxuXHRcdC5hcHBlbmQgcGVvcGxlXHJcblx0XHQuYXBwZW5kVG8gJy5jb250ZW50IC5waWMyJ1xyXG5wdXRQZW9wbGVBbmRCYXIgPSAoKS0+XHJcblx0anEoJy5jb250ZW50IC5wZW9wbGUnKVxyXG5cdFx0LmVhY2ggKGluZGV4KS0+XHJcblx0XHRcdGpxIHRoaXNcclxuXHRcdFx0XHQuY3NzXHJcblx0XHRcdFx0XHRiYWNrZ3JvdW5kSW1hZ2U6XCJ1cmwoYXBwL2ltZy8jeyhpbmRleCVwZW9wbGVDb3VudCkrMX0ucG5nKVwiXHJcblx0XHRcdFx0XHR3aWR0aDpcIiN7MjI0LzcyfXJlbVwiXHJcblx0XHRcdFx0XHRoZWlnaHQ6XCIjezE0NS83Mn1yZW1cIlxyXG5cdFx0XHRcdFx0dG9wOlwiI3sxNi83Mn1yZW1cIlxyXG5cdFx0XHRcdFx0cmlnaHQ6XCIjezExLzcyfXJlbVwiXHJcblx0Zm9yIGNvbHVtbixjIGluIGJhckRhdGFcclxuXHRcdGZvciByb3csciBpbiBjb2x1bW5cclxuXHRcdFx0YmFyID0gYmFyRGF0YVtjXVtyXVxyXG5cdFx0XHRqcSAnPGk+PC9pPidcclxuXHRcdFx0XHQuYWRkQ2xhc3MgKCktPlxyXG5cdFx0XHRcdFx0YWRkZWRDbGFzcyA9ICdiYXInXHJcblx0XHRcdFx0XHRpZiAhYyB0aGVuIGFkZGVkQ2xhc3MrPSAnIGxlZnQnIGVsc2UgYWRkZWRDbGFzcys9JyByaWdodCdcclxuXHRcdFx0XHRcdGlmICEociUyKSB0aGVuIGFkZGVkQ2xhc3MrPSAnIHRvcCcgZWxzZSBhZGRlZENsYXNzKz0nIGJvdHRvbSdcclxuXHRcdFx0XHRcdGFkZGVkQ2xhc3NcclxuXHRcdFx0XHQuY3NzXHJcblx0XHRcdFx0XHR3aWR0aDpcIiN7MjE0LzcyfXJlbVwiXHJcblx0XHRcdFx0XHRoZWlnaHQ6XCIjezQzLzcyfXJlbVwiXHJcblx0XHRcdFx0XHR0b3A6XCIje2Jhci55LzcyfXJlbVwiXHJcblx0XHRcdFx0XHRsZWZ0OlwiI3tiYXIueC83Mn1yZW1cIlxyXG5cdFx0XHRcdC5hcHBlbmRUbyAnLmNvbnRlbnQgLnBpYzInXHJcbmJpbmRFdmVudCA9ICgpLT5cclxuXHQkICcuY29udGVudCAuc2VhdCdcclxuXHRcdC5vbiAndGFwJywoKS0+XHJcblx0XHRcdGNvbnNvbGUubG9nICdzZWF0J1xyXG5cdFx0XHQkICcuc2NvcmUnXHJcblx0XHRcdFx0LnJlbW92ZSgpXHJcblx0XHRcdCQgJzxwPjwvcD4nXHJcblx0XHRcdFx0LmFkZENsYXNzICdzY29yZSBhbmltYXRlZCB6b29tSW4nXHJcblx0XHRcdFx0LnRleHQgKytzY29yZVxyXG5cdFx0XHRcdC5hcHBlbmRUbyAnYm9keSdcclxuXHQkICcuY29udGVudCAuc2VhdCAucGVvcGxlJ1xyXG5cdFx0Lm9uICd0YXAnLChldiktPlxyXG5cdFx0XHRjbG9zZVZpZXcoKVxyXG5cdFx0XHRldi5zdG9wUHJvcGFnYXRpb24oKVxyXG5yb2xsWVNlYXRQZW9wbGUgPSAoKS0+XHJcblx0bnVtID0gNVxyXG5cdHBlb3BsZSA9IDIyXHJcblx0d2hpbGUgbnVtXHJcblx0XHRjID0gdS5yYW4gMCxzZWF0Q1xyXG5cdFx0ciA9IHUucmFuIDAsc2VhdFJcclxuXHRcdGlmICFzZWF0RGF0YVtjXVtyXS55ZWxsb3dcclxuXHRcdFx0c2VhdERhdGFbY11bcl0ueWVsbG93ID0gdHJ1ZVxyXG5cdFx0XHRudW0tLVxyXG5cdHdoaWxlIHBlb3BsZVxyXG5cdFx0YyA9IHUucmFuIDAsc2VhdENcclxuXHRcdHIgPSB1LnJhbiAwLHNlYXRSXHJcblx0XHRpZiAhc2VhdERhdGFbY11bcl0ub2NjdXBpZWRcclxuXHRcdFx0c2VhdERhdGFbY11bcl0ub2NjdXBpZWQgPSB0cnVlXHJcblx0XHRcdHBlb3BsZS0tXHJcbmNsZWFyID0gKCktPlxyXG5cdCQgJy5waWMyJ1xyXG5cdFx0LmVtcHR5KClcclxuXHRmb3IgY29sdW1uLGMgaW4gc2VhdERhdGFcclxuXHRcdGZvciByb3csciBpbiBjb2x1bW5cclxuXHRcdFx0ZGVsZXRlIHNlYXREYXRhW2NdW3JdLnllbGxvd1xyXG5cdFx0XHRkZWxldGUgc2VhdERhdGFbY11bcl0ub2NjdXBpZWRcclxud2luZG93LnBhaW50ID0gKCktPlxyXG5cdGNsZWFyKClcclxuXHRyb2xsWVNlYXRQZW9wbGUoKVxyXG5cdGZvciBjb2x1bW4sYyBpbiBzZWF0RGF0YVxyXG5cdFx0Zm9yIHJvdyxyIGluIGNvbHVtblxyXG5cdFx0XHRwdXRTZWF0cyBjLHJcclxuXHRwdXRQZW9wbGVBbmRCYXIoKVxyXG5cdGJpbmRFdmVudCgpXHJcblxyXG5wYWludCgpXHJcbmpxICcuY29udGVudD5kaXYnXHJcblx0LmhlaWdodCBcIiN7cEhlaWdodH1yZW1cIlxyXG5cclxuZ2xvYmFsLm1TdGFydCA9ICgpLT5cclxuXHRDLmFuaW1hdGUgXHJcblx0XHRib3R0b206IFwiI3stcEhlaWdodCoxLzR9cmVtXCIsXHJcblx0LDQwMCwnZWFzZUluQ3ViaWMnLCgpLT5cclxuXHRcdG1Hb2luZygpXHJcblx0cmV0dXJuXHJcbm1Hb2luZyA9ICgpLT5cclxuXHRDLmFuaW1hdGVcclxuXHRcdGJvdHRvbTpcIiN7LXBIZWlnaHQtd0hlaWdodC8oZGV2aWNlV2lkdGgvMTApfXJlbVwiLFxyXG5cdFx0e1xyXG5cdFx0XHRzdGVwOihub3csZngpLT5cclxuXHRcdFx0XHRpZiBub3cgPD0gZnguZW5kXHJcblx0XHRcdFx0XHRmeC5ub3cgPSAwXHJcblx0XHRcdGR1cmF0aW9uOjUwMDBcclxuXHRcdFx0ZWFzaW5nOidsaW5lYXInXHJcblx0XHRcdGNvbXBsZXRlOigpLT5cclxuXHRcdFx0XHRtR29pbmcoKVxyXG5cdFx0XHRcdHJldHVyblx0XHJcblx0XHR9XHJcblx0cmV0dXJuIl19
