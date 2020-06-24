<?php
include "config.php";
include "utils.php";

$dbConn =  connect($db);

// Make a purchase
if(isset($_REQUEST['action'])){
	
  if($_REQUEST['action']=='purchase'){
    if (isset($_REQUEST['id']) && isset($_REQUEST['quantity']))
    {
      $sql = $dbConn->prepare("SELECT * FROM products where id=:id");
      $sql->bindValue(':id', $_REQUEST['id']);
      $sql->execute();
      $sql->setFetchMode(PDO::FETCH_ASSOC);
      $stock = $sql->fetchColumn(6);
      if ($stock >= $_REQUEST['quantity']){
        $newStock = $stock - $_REQUEST['quantity'];
        $sql = "
          UPDATE products
          SET stock = $newStock ,last_sale = CURRENT_TIMESTAMP
          WHERE id='{$_REQUEST['id']}'
           ";
        $statement = $dbConn->prepare($sql);
        $statement->execute();
        header("HTTP/1.1 200 OK");
        echo json_encode(array(
          'status' => true,
          'message' => "Compra realizada, para el producto id: ".$_REQUEST['id']
        ));
      } else {
        header("HTTP/1.1 200 OK");
        echo json_encode(array(
          'status' => false,
          'message' => "No hay stock para el producto id: ".$_REQUEST['id']
        ));
      }
      exit();
    } else {
      header("HTTP/1.1 400 OK");
      echo json_encode(array(
        'status' => false,
        'message' => 'Para crear una nueva compra, suministrar id del producto y cantidad'
      ));
      exit();
    }
  }
}


// List products
if ($_SERVER['REQUEST_METHOD'] == 'GET')
{
    if (isset($_GET['id']))
    {
      $sql = $dbConn->prepare("SELECT * FROM products where id=:id");
      $sql->bindValue(':id', $_GET['id']);
      $sql->execute();
      header("HTTP/1.1 200 OK");
      echo json_encode(  $sql->fetch(PDO::FETCH_ASSOC)  );
      exit();
	  }
    else {
      $sql = $dbConn->prepare("SELECT * FROM products");
      $sql->execute();
      $sql->setFetchMode(PDO::FETCH_ASSOC);
      header("HTTP/1.1 200 OK");
      echo json_encode( $sql->fetchAll()  );
      exit();
	}
}

// Save new product
if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
    $now = date_create()->format('Y-m-d H:i:s');
    $input = $_POST;
    $validate = testData($input);
    if(count($validate) == 0){
      $sql = "INSERT INTO products
          (name, reference, price, weight, category, stock)
          VALUES
          (:name, :reference, :price, :weight, :category, :stock)";
      $statement = $dbConn->prepare($sql);
      bindAllValues($statement, $input);
      $statement->execute();
      $postId = $dbConn->lastInsertId();
      if($postId)
      {
        $input['id'] = $postId;
        header("HTTP/1.1 201 OK");
        echo json_encode($input);
        exit();
	    }
    } else {
      header("HTTP/1.1 400 OK");
      echo json_encode($validate, JSON_UNESCAPED_UNICODE | JSON_FORCE_OBJECT);
      exit();
    }
}

// Delete product
if ($_SERVER['REQUEST_METHOD'] == 'DELETE')
{
	$id = $_GET['id'];
  $statement = $dbConn->prepare("DELETE FROM products where id=:id");
  $statement->bindValue(':id', $id);
  $statement->execute();
  header("HTTP/1.1 200 OK");
  echo json_encode('Producto eliminado');
	exit();
}

// Update product
if ($_SERVER['REQUEST_METHOD'] == 'PUT')
{
    $input = $_GET;
    $productId = $input['id'];
    $fields = getParams($input);

    $sql = "
          UPDATE products
          SET $fields
          WHERE id='$productId'
           ";

    $statement = $dbConn->prepare($sql);
    bindAllValues($statement, $input);

    $statement->execute();
    header("HTTP/1.1 200 OK");
    echo json_encode('Producto actualizado');
    exit();
}

header("HTTP/1.1 400 Bad Request");

?>
