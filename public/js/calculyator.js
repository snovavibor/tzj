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

    function fastMessage(box, pac) {
      alert("You will need " + box + " packs of " + pac + "pcs");
    }

    function countIteration(totalCover, pac) {
      iteration = 0;

      while (totalCover % pac) {
        iteration++;
        totalCover++;
      }
      return iteration;
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

    //механизм расчета 
    function algoritm() {
        
      if (is_Notfloat(countCover, pacOne)) {
        countBoxCover = countCover / pacOne;

        fastMessage(countBoxCover, pacOne);

        return;
      }

      iterationForPacone = countIteration(countCover, pacOne);

      iterationForPatwo = countIteration(countCover, pacTwo);

      // TO DO: возможно оформить и switch ... )))

      if (iterationForPacone === pacTwo && iterationForPatwo === 0) {
        countOnlyx8 = toReduceNumber(countCover, pacOne) - 1;
      } else if (iterationForPatwo === 0) {
        countOnlyx8 = toReduceNumber(countCover, pacOne);
      } else if (iterationForPacone - iterationForPatwo <= 0) {
        countOnlyx8 = toEnlargeNumber(countCover, pacOne);

        fastMessage(countOnlyx8, pacOne);

        return;
      } else {
        countOnlyx8 = toReduceNumber(countCover, pacOne) - 1;
      }

      if (parseFloat(countOnlyx8) > 1.5) {
        diffC = countCover - countOnlyx8 * pacOne;

        countOnlyx6 = getCountPacs(diffC, pacTwo);
      } else {
        countOnlyx8 = 0;

        countOnlyx6 = getCountPacs(countCover, pacTwo);
      }

      alert(
        "You will need " +
          countOnlyx8 +
          " packs of " +
          pacOne +
          "pcs and  " +
          countOnlyx6 +
          " packs of " +
          pacTwo +
          "pcs"
      );
    }

    algoritm();
  });
});
