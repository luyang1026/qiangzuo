(function() {
  var C, changePoint, deviceWidth, global, i, item, j, len, len1, mGoing, pHeight, row, seatC, seatR, wHeight;

  deviceWidth = document.documentElement.clientWidth;

  document.documentElement.style.fontSize = (deviceWidth / 10) + "px";

  global = window;

  C = $('.content');

  pHeight = 4540 / 72;

  wHeight = $(window).height();

  changePoint = (-pHeight - wHeight / (deviceWidth / 10)) + "rem";

  seatR = 18;

  seatC = 2;

  console.log(item);

  for (i = 0, len = seatData.length; i < len; i++) {
    row = seatData[i];
    for (j = 0, len1 = row.length; j < len1; j++) {
      item = row[j];
      console.log(1);
    }
  }

  $('.content div').height(pHeight + "rem");

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvY29udGVudC9tYWluLmpzIiwic291cmNlcyI6WyJ2aWV3cy9jb250ZW50L21haW4uY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsTUFBQTs7RUFBQSxXQUFBLEdBQWMsUUFBUSxDQUFDLGVBQWUsQ0FBQzs7RUFDdkMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsUUFBL0IsR0FBNEMsQ0FBQyxXQUFBLEdBQVksRUFBYixDQUFBLEdBQWdCOztFQUU1RCxNQUFBLEdBQVM7O0VBQ1QsQ0FBQSxHQUFJLENBQUEsQ0FBRSxVQUFGOztFQUNKLE9BQUEsR0FBVSxJQUFBLEdBQUs7O0VBQ2YsT0FBQSxHQUFVLENBQUEsQ0FBRSxNQUFGLENBQVMsQ0FBQyxNQUFWLENBQUE7O0VBQ1YsV0FBQSxHQUFnQixDQUFDLENBQUMsT0FBRCxHQUFTLE9BQUEsR0FBUSxDQUFDLFdBQUEsR0FBWSxFQUFiLENBQWxCLENBQUEsR0FBbUM7O0VBQ25ELEtBQUEsR0FBUTs7RUFDUixLQUFBLEdBQVE7O0VBRVIsT0FBTyxDQUFDLEdBQVIsQ0FBWSxJQUFaOztBQUNBLE9BQUEsMENBQUE7O0FBQUEsU0FBQSx1Q0FBQTs7TUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLENBQVo7QUFBQTtBQUFBOztFQUVBLENBQUEsQ0FBRSxjQUFGLENBQ0MsQ0FBQyxNQURGLENBQ1ksT0FBRCxHQUFTLEtBRHBCOztFQUdBLE1BQU0sQ0FBQyxNQUFQLEdBQWdCLFNBQUE7SUFDZixDQUFDLENBQUMsT0FBRixDQUNDO01BQUEsTUFBQSxFQUFVLENBQUMsQ0FBQyxPQUFELEdBQVMsQ0FBVCxHQUFXLENBQVosQ0FBQSxHQUFjLEtBQXhCO0tBREQsRUFFQyxHQUZELEVBRUssYUFGTCxFQUVtQixTQUFBO2FBQ2xCLE1BQUEsQ0FBQTtJQURrQixDQUZuQjtFQURlOztFQU1oQixNQUFBLEdBQVMsU0FBQTtJQUNSLENBQUMsQ0FBQyxPQUFGLENBQ0M7TUFBQSxNQUFBLEVBQVMsQ0FBQyxDQUFDLE9BQUQsR0FBUyxPQUFBLEdBQVEsQ0FBQyxXQUFBLEdBQVksRUFBYixDQUFsQixDQUFBLEdBQW1DLEtBQTVDO0tBREQsRUFFQztNQUNDLElBQUEsRUFBSyxTQUFDLEdBQUQsRUFBSyxFQUFMO1FBQ0osSUFBRyxHQUFBLElBQU8sRUFBRSxDQUFDLEdBQWI7aUJBQ0MsRUFBRSxDQUFDLEdBQUgsR0FBUyxFQURWOztNQURJLENBRE47TUFJQyxRQUFBLEVBQVMsSUFKVjtNQUtDLE1BQUEsRUFBTyxRQUxSO01BTUMsUUFBQSxFQUFTLFNBQUE7UUFDUixNQUFBLENBQUE7TUFEUSxDQU5WO0tBRkQ7RUFEUTtBQXZCVCIsInNvdXJjZXNDb250ZW50IjpbImRldmljZVdpZHRoID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoXHJcbmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5mb250U2l6ZSA9IFwiI3tkZXZpY2VXaWR0aC8xMH1weFwiXHJcblxyXG5nbG9iYWwgPSB3aW5kb3dcclxuQyA9ICQoJy5jb250ZW50JylcclxucEhlaWdodCA9IDQ1NDAvNzIjIHBpY3R1cmUgaGVpZ2h0XHJcbndIZWlnaHQgPSAkKHdpbmRvdykuaGVpZ2h0KCkjIHNjcmVlbiBoZWlnaHRcclxuY2hhbmdlUG9pbnQgPSBcIiN7LXBIZWlnaHQtd0hlaWdodC8oZGV2aWNlV2lkdGgvMTApfXJlbVwiO1xyXG5zZWF0UiA9IDE4XHJcbnNlYXRDID0gMlxyXG4jIOW+gHAy5LiK5pS+5bqn5L2NXHJcbmNvbnNvbGUubG9nIGl0ZW1cclxuY29uc29sZS5sb2cgMSBmb3IgaXRlbSBpbiByb3cgZm9yIHJvdyBpbiBzZWF0RGF0YVxyXG5cclxuJCAnLmNvbnRlbnQgZGl2J1xyXG5cdC5oZWlnaHQgXCIje3BIZWlnaHR9cmVtXCJcclxuXHJcbmdsb2JhbC5tU3RhcnQgPSAoKS0+XHJcblx0Qy5hbmltYXRlIFxyXG5cdFx0Ym90dG9tOiBcIiN7LXBIZWlnaHQqMS80fXJlbVwiLFxyXG5cdCw0MDAsJ2Vhc2VJbkN1YmljJywoKS0+XHJcblx0XHRtR29pbmcoKVxyXG5cdHJldHVyblxyXG5tR29pbmcgPSAoKS0+XHJcblx0Qy5hbmltYXRlXHJcblx0XHRib3R0b206XCIjey1wSGVpZ2h0LXdIZWlnaHQvKGRldmljZVdpZHRoLzEwKX1yZW1cIixcclxuXHRcdHtcclxuXHRcdFx0c3RlcDoobm93LGZ4KS0+XHJcblx0XHRcdFx0aWYgbm93IDw9IGZ4LmVuZFxyXG5cdFx0XHRcdFx0Zngubm93ID0gMFxyXG5cdFx0XHRkdXJhdGlvbjo1MDAwXHJcblx0XHRcdGVhc2luZzonbGluZWFyJ1xyXG5cdFx0XHRjb21wbGV0ZTooKS0+XHJcblx0XHRcdFx0bUdvaW5nKClcclxuXHRcdFx0XHRyZXR1cm5cdFxyXG5cdFx0fVxyXG5cdHJldHVybiJdfQ==
