<?php

/**
 * Default
 * 
 * 
 * @package    
 * @subpackage Controller
 * @author     YOUR NAME <YOUREMAIL@jouve.com>
 */
include '../../../config/autoload.php';

//BDD
$postgres = new connexion();
$conn = $postgres->connect();

//var_dump($_POST);
//SQL
$sql = "select * from pg_stat_activity";
$dataOut = $postgres->getSQL($conn, $sql);


$sortie = array("erreur" => "non", "notification" => "success", "message" => "Opération terminée avec succès", "datas" => $dataOut);
echo json_encode($sortie);
?>