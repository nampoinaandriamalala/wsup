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


$id = pg_escape_string($_POST['id']);
$variable = pg_escape_string(($_POST['variable'] == NULL) ? "" : $_POST['variable']);
$url = pg_escape_string(($_POST['url'] == NULL) ? "" : $_POST['url']);


$sql_update = "update raptor_def_page set variable = '$variable', url = '$url' where id = $id;";

$postgres->updateSQL($conn, $sql_update);

$sortie = array("erreur" => "non", "notification" => "success", "message" => "Opération terminée avec succès", "datas" => array());
echo json_encode($sortie);
