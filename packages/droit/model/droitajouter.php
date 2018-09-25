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


$abreviation = $_POST['abreviation'];
$creer = ($_POST['creer'] == 'true') ? 1 : 0;
$replanifier = ($_POST['replanifier'] == 'true') ? 1 : 0;
$supprimer = ($_POST['supprimer'] == 'true') ? 1 : 0;
$valider = ($_POST['valider'] == 'true') ? 1 : 0;
$devalider = ($_POST['devalider'] == 'true') ? 1 : 0;
$extraction = ($_POST['extraction'] == 'true') ? 1 : 0;


if ($abreviation == null || trim($abreviation) == "") {
    $sortie = array("erreur" => "oui", "notification" => "danger", "message" => "Veuillez saisir une abréviation.", "datas" => array());
    echo json_encode($sortie);
    exit();
}

//On met à ajour les données
$sql = "insert into group_admin (abrev_fonction,creer, replanifier,valider,devalider,extraction,supprimer) values ('$abreviation',$creer,$replanifier,$valider,$devalider,$extraction,$supprimer)";
$dataOut = $postgres->getSQL($conn, $sql);

$sortie = array("erreur" => "non", "notification" => "success", "message" => "Le groupe '$abreviation' a été ajouté.", "datas" => array());
echo json_encode($sortie);
?>