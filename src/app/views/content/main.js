(function() {
  var deviceWidth;

  deviceWidth = document.documentElement.clientWidth;

  document.documentElement.style.fontSize = (deviceWidth / 72) + "px";

  console.log(deviceWidth);

}).call(this);
