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
          //if (typeRules(this.type, this.value)) {
          if (is_rules(this.type, this.value)) {
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

    if (typeEl !== "checkbox") {
      if (is_rules(typeEl, letter)) {
        $(this).css({ borderColor: "green" });
      } else {
        $(this).css({ borderColor: "red" });
      }
    }
  });

  function is_rules(ruleName, leters) {
    var rules = {
      text: /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/g,
      password: /^([0-9a-zA-Zа-яА-я-_]){8,16}$/g,
      email: /.+@.+\..+/g,
    };

    return rules[ruleName].test(leters);
  }
});
