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

$id = $_POST['id'];
$creer = ($_POST['creer']=='true')?1:0;
$replanifier = ($_POST['replanifier']=='true')?1:0;
$supprimer = ($_POST['supprimer']=='true')?1:0;
$valider = ($_POST['valider'] == 'true')?1:0;
$devalider = ($_POST['devalider'] == 'true')?1:0;
$extraction = ($_POST['extraction'] == 'true')?1:0;


//On met à ajour les données
$sql = "update group_admin set replanifier = $replanifier, valider = $valider , devalider = $devalider , extraction = $extraction, supprimer = $supprimer , creer = $creer where id = $id";
$dataOut = $postgres->getSQL($conn, $sql);

$sortie = array("erreur" => "non", "notification" => "success", "message" => "les modification ont été sauvegardées", "datas" => array());
echo json_encode($sortie);

?>