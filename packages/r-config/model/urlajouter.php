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


$variable = pg_escape_string(($_POST['variable'] == NULL) ? "" : $_POST['variable']);
$url = pg_escape_string(($_POST['url'] == NULL) ? "" : $_POST['url']);


$sql_insert = "insert into raptor_def_page (variable,url) values ('$variable','$url');";

$sortie = $postgres->insertSQL($conn, $sql_insert);

$sortie = array("erreur" => "non", "notification" => "success", "message" => "Opération terminée avec succès", "datas" => array());
echo json_encode($sortie);
