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

$valeur = pg_escape_string($_POST['valeur']);
$identifiant = pg_escape_string($_POST['identifiant']);

//SQL
$sql = " update raptor set valeur = '$valeur' where identifiant = '$identifiant'";
$dataOut = $postgres->getSQL($conn, $sql);

$sortie = array("erreur" => "non", "notification" => "success", "message" => "Opération terminée avec succès", "datas" => $dataOut);
echo json_encode($sortie);



