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

    // уменьшает округляя число
    function toReduceNumber(totalCover, pacs) {
      return Math.floor(totalCover / pacs);
    }

    // увеличивает округляя число
    function toEnlargeNumber(totalCover, pacs) {
      return Math.ceil(totalCover / pacs);
    }

    //количество упаковок для х6 пачек
    function getCountPacs(totalCover, pacs) {
      if (totalCover % pacs) {
        return toEnlargeNumber(totalCover, pacs);
      } else {
        return totalCover / pacs;
      }
    }

    // function sortByAge(arr) {
    //   arr.sort((a, b) =>
    //     a.sumTotal > b.sumTotal && a.countsOnePac > 0 ? 1 : -1
    //   );
    // }

    //применять такой вид сортировки из за того что js Chrome
    // использует нестабильный вид сортировки  и искажает результат.
    function sortByAge(arr) {
    
      arr.sort(function(a, b) { return a.sumTotal < b.sumTotal ? -1 : (a.sumTotal > b.sumTotal ? 1 : 0); });
  }


    function res(flag, countCover, pacOne, pacTwo) {
      if (flag < 0) {
        var r = toReduceNumber(countCover, pacOne) - 1;
      } else if (flag === 0) {
        var r = toReduceNumber(countCover, pacOne) * 0;
      } else {
        var r = toReduceNumber(countCover, pacOne);
      }

      let q = r * pacOne;
      let s = countCover - q;
      let q6 = getCountPacs(s, pacTwo);
      let result = r * pacOne + q6 * pacTwo;
      arrOne = makearr(pacOne, r, pacTwo, q6, result);
      return arrOne;
    }

    function makearr(pacOne, countsOne, pacTwo, countsTwo, result) {
      return {
        toFirstPac: pacOne,
        countsOnePac: countsOne,
        toSecondPac: pacTwo,
        countsSecondPac: countsTwo,
        sumTotal: result,
      };
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

      res1 = res(1, countCover, pacOne, pacTwo);
      res2 = res(-1, countCover, pacOne, pacTwo);
      res3 = res(0, countCover, pacOne, pacTwo);
      let arr = [res1, res2, res3];
      sortByAge(arr);

      alert(
        "You will need " +
          arr[0].countsOnePac +
          " packs of " +
          arr[0].toFirstPac +
          "pcs and  " +
          arr[0].countsSecondPac +
          " packs of " +
          arr[0].toSecondPac +
          "pcs"
      );
    }

    algoritm();
  });
});
