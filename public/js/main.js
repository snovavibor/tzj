$(document).ready(function () {
  $(".form").on("submit", function (e) {
    e.preventDefault();

    errorArr = [];

    checkFieldsForm(this);

    isFalse = errorArr.includes(false);

    if (!isFalse) {
      var form = $(this).serialize();

      $.ajax({
        method: "POST",
        url: "repozitory.php",
        data: form,
        cache: false,
        processData: false,
        success: function (result) {
          if (result) {
            console.log(result);
            alert("Данные отправлены");
            errorArr = [];
            $("input").val("");
            location.reload();
          }
        },
      });
    }
  });

  /**
   * проверяет поля на пустоту
   * если поле не содержит данных добавляет в массив errorAr => false для этого поля
   *
   * @param {string} id
   */
  function checkFieldsForm(isform) {
    $(isform)
      .find("input")
      .each(function () {
        if (this.type !== "checkbox") {
          if (typeRules(this.type, this.value)) {
            errorArr.push(true);
          } else {
            errorArr.push(false);
          }
        }
      });
  }

  /**
   * событие на изменение поля
   */
  $("input").on("change", function (e) {
    e.target = this;

    let letter = $(this).val();

    let typeEl = this.type;

    if (typeRules(typeEl, letter)) {
      $(this).css({ borderColor: "green" });
    } else {
      $(this).css({ borderColor: "red" });
    }
  });

  /**
   * В зависимости от типа поля вызываются соответствующие правила для
   * для проверки введенного символа
   *
   * @param {string} type
   * @param {string} letter
   */
  function typeRules(type, letter) {
    switch (type) {
      case "text":
        return rulesText(letter);
        break;
      case "email":
        return rulesEmail(letter);
        break;
      case "password":
        return rulesPassword(letter);
        break;
    }
  }

  /**
   * правила для полей формы
   *
   * @param {string} letter
   */
  function rulesText(letter) {
    let preg = /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/g;
    return preg.test(letter);
  }

  function rulesPassword(letter) {
    let preg = /^([0-9a-zA-Zа-яА-я-_]){8,16}$/g;
    return preg.test(letter);
  }

  function rulesEmail(letter) {
    let preg = /.+@.+\..+/g;
    return preg.test(letter);
  }
});
