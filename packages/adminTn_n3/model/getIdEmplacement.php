<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
include '../../../config/autoload.php';



//$id_emplacement = $_POST['id_emplacement'];
$siege = $_POST['siege'];
$niveau = $_POST['niveau'];
$batiment = $_POST['batiment'];
$lettre = $_POST['lettre'];
$numero = $_POST['numero'];
//$id_bloc_svg = $_POST['id_bloc_svg'];



//BDD
$postgres = new connexion();
$conn = $postgres->connect();

//var_dump($_POST);
//SQL
$sql = "select id_emplacement from emplacement where siege=$siege and niveau=$niveau and batiment=$batiment and lettre= $lettre";
$dataOut = $postgres->getSQL($conn, $sql);

$sortie = array("datas" => $dataOut);
echo json_encode($sortie);
?>

