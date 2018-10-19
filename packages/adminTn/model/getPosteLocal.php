<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
include '../../../config/autoload.php';

//BDD
$postgres = new connexion();
$conn = $postgres->connect();

//var_dump($_POST);
//SQL
$sql = "select * from poste";
$dataOut = $postgres->getSQL($conn, $sql);

$sortie = array("datas" => $dataOut);
echo json_encode($sortie);
?>

