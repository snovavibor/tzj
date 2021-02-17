<?php


function renderFields()
{

  for ($num = 2; $num <= 30; $num += 2) {

?>

    <option value='<?= $num; ?>'><?= $num; ?></option>
<?php
  }
}

?>
<!DOCTYPE html>
<html lang="en">

<head>
  <!-- Required meta tags -->
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale = 1.0, user-scalable=no, shrink-to-fit=no" />
  <link rel="icon" href="images/favicon-32x32.png" type="image/x-icon">

  <link rel="stylesheet" href="css/normalize.css" />
  <link rel="stylesheet" href="css/main.css" />

  <title>Test z</title>
</head>

<body>

  <a href="/">Назад на главную</a>

  <div class="container" style="width:100%;">

    <form action="" id="dataForCalc">

      <div class="fields-wrap flex justify-content-between text-center" style="width:80%; margin:auto;">

        <div class="fields-length" style="width:50%; ;">
          <p>длина</p>
          <select name="fields-length" id="fields-length" style="width:80%; padding:10px">

            <?php

            renderFields();

            ?>

          </select>

        </div>

        <div class="fields-width" style="width:50%">
          <p>ширина</p>
          <select name="fields-width" id="fields-width" style="width:80%; padding:10px">

            <?php

            renderFields();

            ?>

          </select>

        </div>

      </div>

      <div class="btn-block text-center" style="padding: 10px">
        <button id="calcBth">Расчитать</button>
      </div>


    </form>

  </div>


  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>

  <script src="js/calculyator.js"></script>
</body>

</html>