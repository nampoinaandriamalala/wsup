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
$postgres = new connexion("192.168.12.245", "gpao", "postgres", "postgres");
$conn = $postgres->connect();

//var_dump($_POST);

$login = $_POST['matricule'];

//SQL
$login = pg_escape_string($login);


//SQL
$sql = "select o.nom, o.prenoms from operateur o where o.matricule = '$login'";
$dataOut = $postgres->getSQL($conn, $sql);

$sortie = array("erreur" => "non", "notification" => "success", "message" => "Opération terminée avec succès", "datas" => $dataOut);
echo json_encode($sortie);
?>