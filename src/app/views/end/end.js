(function() {
  window.closeView = function() {
    var homepage, replay, share;
    homepage = $('.end-view .homepage-btn');
    replay = $('.end-view .replay-btn');
    share = $('.end-view .share-btn');
    $('.end-view').show(function() {
      return $('.end-view .ending').addClass('zoomIn animated');
    });
    replay.on('tap', function() {
      $('.end-view .ending').removeClass('zoomIn animated');
      $('.end-view .ending').addClass('zoomOut animated');
      $('.backdrop').hide();
      $('.end-view').hide();
      console.log('omg');
      return paint();
    });
  };

}).call(this);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3MvZW5kL2VuZC5qcyIsInNvdXJjZXMiOlsidmlld3MvZW5kL2VuZC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFBQSxNQUFNLENBQUMsU0FBUCxHQUFtQixTQUFBO0FBQ2xCLFFBQUE7SUFBQSxRQUFBLEdBQVcsQ0FBQSxDQUFFLHlCQUFGO0lBQ1gsTUFBQSxHQUFTLENBQUEsQ0FBRSx1QkFBRjtJQUNULEtBQUEsR0FBUSxDQUFBLENBQUUsc0JBQUY7SUFDUixDQUFBLENBQUUsV0FBRixDQUNDLENBQUMsSUFERixDQUNPLFNBQUE7YUFDTCxDQUFBLENBQUUsbUJBQUYsQ0FDQyxDQUFDLFFBREYsQ0FDVyxpQkFEWDtJQURLLENBRFA7SUFJQSxNQUNDLENBQUMsRUFERixDQUNLLEtBREwsRUFDVyxTQUFBO01BQ1QsQ0FBQSxDQUFFLG1CQUFGLENBQ0MsQ0FBQyxXQURGLENBQ2MsaUJBRGQ7TUFFQSxDQUFBLENBQUUsbUJBQUYsQ0FDQyxDQUFDLFFBREYsQ0FDVyxrQkFEWDtNQUVBLENBQUEsQ0FBRSxXQUFGLENBQ0MsQ0FBQyxJQURGLENBQUE7TUFFQSxDQUFBLENBQUUsV0FBRixDQUNDLENBQUMsSUFERixDQUFBO01BRUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxLQUFaO2FBQ0EsS0FBQSxDQUFBO0lBVlMsQ0FEWDtFQVJrQjtBQUFuQiIsInNvdXJjZXNDb250ZW50IjpbIndpbmRvdy5jbG9zZVZpZXcgPSAoKS0+XHJcblx0aG9tZXBhZ2UgPSAkICcuZW5kLXZpZXcgLmhvbWVwYWdlLWJ0bidcclxuXHRyZXBsYXkgPSAkICcuZW5kLXZpZXcgLnJlcGxheS1idG4nXHJcblx0c2hhcmUgPSAkICcuZW5kLXZpZXcgLnNoYXJlLWJ0bidcclxuXHQkICcuZW5kLXZpZXcnXHJcblx0XHQuc2hvdyAoKS0+XHJcblx0XHRcdCQgJy5lbmQtdmlldyAuZW5kaW5nJ1xyXG5cdFx0XHRcdC5hZGRDbGFzcyAnem9vbUluIGFuaW1hdGVkJ1xyXG5cdHJlcGxheVxyXG5cdFx0Lm9uICd0YXAnLCgpLT5cclxuXHRcdFx0JCAnLmVuZC12aWV3IC5lbmRpbmcnXHJcblx0XHRcdFx0LnJlbW92ZUNsYXNzICd6b29tSW4gYW5pbWF0ZWQnXHJcblx0XHRcdCQgJy5lbmQtdmlldyAuZW5kaW5nJ1xyXG5cdFx0XHRcdC5hZGRDbGFzcyAnem9vbU91dCBhbmltYXRlZCdcclxuXHRcdFx0JCAnLmJhY2tkcm9wJ1xyXG5cdFx0XHRcdC5oaWRlKClcclxuXHRcdFx0JCAnLmVuZC12aWV3J1xyXG5cdFx0XHRcdC5oaWRlKClcclxuXHRcdFx0Y29uc29sZS5sb2cgJ29tZydcclxuXHRcdFx0cGFpbnQoKVxyXG5cdHJldHVybiJdfQ==
