<?php

  function connect($db)
  {
      try {
          $conn = new PDO("mysql:host={$db['host']};dbname={$db['db']}", $db['username'], $db['password']);

          // set the PDO error mode to exception
          $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

          return $conn;
      } catch (PDOException $exception) {
          exit($exception->getMessage());
      }
  }

 function getParams($input)
 {
    $filterParams = [];
    foreach($input as $param => $value)
    {
            $filterParams[] = "$param=:$param";
    }
    return implode(", ", $filterParams);
	}

	function bindAllValues($statement, $params)
  {
		foreach($params as $param => $value)
    {
				$statement->bindValue(':'.$param, $value);
		}
		return $statement;
   }

  function testData($input) 
  {
    $errors = array();
    $fields = array('name', 'reference', 'price', 'weight', 'category', 'stock');
    foreach ($fields as &$valor) {
      if (empty($input[$valor]))
        array_push($errors, "Campo {$valor} no puede estar vacío");
      elseif(in_array($valor, ["price", "weight", "stock"], true))
        if (!is_numeric($input[$valor]))
          array_push($errors, "Campo {$valor} no es numérico");
        if ($input[$valor] < 0)
          array_push($errors, "Campo {$valor} es menor a cero");
    }
    
    return $errors;
  }
 ?>