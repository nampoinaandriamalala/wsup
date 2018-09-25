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

$sql = "select distinct f.abrev_fonction from fonction f 
    where f.abrev_fonction <> ''
order by f.abrev_fonction";
$dataOut_abrev = $postgres->getSQL($conn, $sql);

$sortie = array("erreur" => "non", "notification" => "success", "message" => "", "datas" => $dataOut_abrev);
echo json_encode($sortie);