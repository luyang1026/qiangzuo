(function() {
  window.closeView = function() {
    var homepage, replay, share;
    homepage = $('.end-view .homepage-btn');
    replay = $('.end-view .replay-btn');
    share = $('.end-view .share-btn');
    $('.end-view').addClass('zoomIn animated');
    $('.end-view').show();
    $('.backdrop').show();
    replay.on('tap', function() {
      $('.backdrop').slideUp(200);
      $('.end-view').hide();
      $('.end-view').removeClass('zoomOut zoomIn animated');
      return paint();
    });
  };

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvZW5kL2VuZC5qcyIsInNvdXJjZXMiOlsidmlld3MvZW5kL2VuZC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFBQSxNQUFNLENBQUMsU0FBUCxHQUFtQixTQUFBO0FBQ2xCLFFBQUE7SUFBQSxRQUFBLEdBQVcsQ0FBQSxDQUFFLHlCQUFGO0lBQ1gsTUFBQSxHQUFTLENBQUEsQ0FBRSx1QkFBRjtJQUNULEtBQUEsR0FBUSxDQUFBLENBQUUsc0JBQUY7SUFDUixDQUFBLENBQUUsV0FBRixDQUNDLENBQUMsUUFERixDQUNXLGlCQURYO0lBRUEsQ0FBQSxDQUFFLFdBQUYsQ0FDQyxDQUFDLElBREYsQ0FBQTtJQUVBLENBQUEsQ0FBRSxXQUFGLENBQ0MsQ0FBQyxJQURGLENBQUE7SUFFQSxNQUNDLENBQUMsRUFERixDQUNLLEtBREwsRUFDVyxTQUFBO01BQ1QsQ0FBQSxDQUFFLFdBQUYsQ0FDQyxDQUFDLE9BREYsQ0FDVSxHQURWO01BRUEsQ0FBQSxDQUFFLFdBQUYsQ0FDQyxDQUFDLElBREYsQ0FBQTtNQUVBLENBQUEsQ0FBRSxXQUFGLENBQ0MsQ0FBQyxXQURGLENBQ2MseUJBRGQ7YUFFQSxLQUFBLENBQUE7SUFQUyxDQURYO0VBVmtCO0FBQW5CIiwic291cmNlc0NvbnRlbnQiOlsid2luZG93LmNsb3NlVmlldyA9ICgpLT5cclxuXHRob21lcGFnZSA9ICQgJy5lbmQtdmlldyAuaG9tZXBhZ2UtYnRuJ1xyXG5cdHJlcGxheSA9ICQgJy5lbmQtdmlldyAucmVwbGF5LWJ0bidcclxuXHRzaGFyZSA9ICQgJy5lbmQtdmlldyAuc2hhcmUtYnRuJ1xyXG5cdCQgJy5lbmQtdmlldydcclxuXHRcdC5hZGRDbGFzcyAnem9vbUluIGFuaW1hdGVkJ1xyXG5cdCQgJy5lbmQtdmlldydcclxuXHRcdC5zaG93KClcclxuXHQkICcuYmFja2Ryb3AnXHJcblx0XHQuc2hvdygpXHJcblx0cmVwbGF5XHJcblx0XHQub24gJ3RhcCcsKCktPlxyXG5cdFx0XHQkICcuYmFja2Ryb3AnXHJcblx0XHRcdFx0LnNsaWRlVXAoMjAwKVxyXG5cdFx0XHQkICcuZW5kLXZpZXcnXHJcblx0XHRcdFx0LmhpZGUoKVxyXG5cdFx0XHQkICcuZW5kLXZpZXcnXHJcblx0XHRcdFx0LnJlbW92ZUNsYXNzICd6b29tT3V0IHpvb21JbiBhbmltYXRlZCdcclxuXHRcdFx0cGFpbnQoKVxyXG5cdHJldHVybiJdfQ==
