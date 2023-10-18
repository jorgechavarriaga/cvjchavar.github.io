$(function () {
  $(".letras").keyup(function () {
    $(".letras").val($(this).val());
    if ($.trim($(this).val()) != "") {
      generateFancy($(this).val());
    } else {
      generateFancy("ChavaZystem Tech");
    }
  });
  var ct = 89;
  function generateFancy(txt) {
    var fancyText = "";
    var result = forward(txt);
    var finalRes = result.split("\n\n");
    var sn = 1;
    $.each(finalRes, function (inx, vl) {
      $("#copy_" + inx).val(vl);
      sn++;
    });
    for (k = 89; k <= ct; k++) {
      $("#copy_" + k).val(crazyWithFlourishOrSymbols(txt));
    }
  }
});
