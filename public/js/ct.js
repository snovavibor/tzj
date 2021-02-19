$(document).ready(function () {
  $("#dataForCalc").on("submit", function (e) {
    e.preventDefault();

    var arr = [];

    $(this)
      .find("select")
      .each(function () {
        arr.push(parseFloat(this.value));
      });

    let coverShablon = 4,
      pacOne = 8,
      pacTwo = 6,
      areaUser = getArea(),
      countCover = getCountCover();

    // площадь требуемая пользователю
    function getArea() {
      return arr[0] * arr[1];
    }

    //  количество ковриков 2x2
    function getCountCover() {
      return areaUser / coverShablon;
    }

    function is_Notfloat(num, pac) {
      if (num % pac === 0) {
        return true;
      }
      return false;
    }

    function fastMessage(numBox, pac) {
      alert("You will need " + numBox + " packs of " + pac + "pcs");
    }

    //применять такой вид сортировки из за того что js Chrome
    // использует нестабильный вид сортировки  и искажает результат.
    function sortByAge(arr) {
      arr.sort(function (a, b) {
        return a.sumTotal < b.sumTotal ? -1 : a.sumTotal > b.sumTotal ? 1 : 0;
      });
    }

    //механизм расчета
    function algoritm() {
      if (countCover <= pacTwo) {
        fastMessage(1, pacTwo);
        return;
      }
      if (countCover > pacTwo && countCover <= pacOne) {
        fastMessage(1, pacOne);
        return;
      }

      if (is_Notfloat(countCover, pacOne)) {
        countBoxCover = countCover / pacOne;

        fastMessage(countBoxCover, pacOne);

        return;
      }
      
      var info = [];
      
      f = 0;
      x = 1;
      for (let i = 0; x > 0; i++) {
        x = (countCover - 6 * i) / 8;
        sum = 8 * x + 6 * i;
        if (x > 0 && i !== 0) {
          result = 8 * Math.ceil(x) + 6 * i;
          if (i > 0) {
            info.push({ x8: Math.ceil(x), x6: i, sumTotal: result });
          }
        }
      }

      sortByAge(info);

      alert(
        "You will need " +
          info[0].x8 +
          " packs of " +
          pacOne +
          "pcs and  " +
          info[0].x6 +
          " packs of " +
          pacTwo +
          "pcs"
      );
    }

    algoritm();
  });
});
