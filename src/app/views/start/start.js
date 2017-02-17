(function() {
  var countDown, countDownNumber, numbers;

  $.fn.extend({
    animationCss: function(animationName, fn) {
      var animationEnd;
      animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
      return this.addClass("animated " + animationName).one(animationEnd, function() {
        $(this).removeClass("animated " + animationName);
        fn && fn.call($(this));
      });
    }
  });

  $('.start-view .beginning').animationCss('bounceInUp');

  $('.start-view .btn-start').click(function() {
    $('.start-view .beginning').animationCss('bounceOutUp', function() {
      var timer;
      $(this).hide();
      countDown();
      return timer = setInterval(countDown, 1000);
    });
  });

  countDownNumber = 3;

  timer;

  numbers = $('.start-view .count-down .number');

  countDown = function() {
    numbers.hide();
    countDownNumber--;
    console.log(countDownNumber);
    numbers.eq(countDownNumber).show();
    if (countDownNumber <= 0) {
      return clearInterval(timer);
    }
  };

}).call(this);
