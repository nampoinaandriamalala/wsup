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



$sql = "select * from utilisateur u order by u.matricule";

$dataOut = $postgres->getSQL($conn, $sql);



//Gpao
$postgres = new connexion("192.168.12.245", "gpao", "postgres", "postgres");
$conn = $postgres->connect();


$dataOut_operateur = null;

foreach ($dataOut as $key => $value) {
//SQL
    $matricule = $value['matricule'];
    $sql = "select o.nom, o.prenoms from operateur o where o.matricule = '$matricule'";
    $dataOut_operateur = $postgres->getSQL($conn, $sql);
    if (is_array($dataOut_operateur)) {
        $dataOut[$key]['nom'] = $dataOut_operateur[0]['nom'];
        $dataOut[$key]['prenoms'] = $dataOut_operateur[0]['prenoms'];
    } else {
        $dataOut[$key]['nom'] = "";
        $dataOut[$key]['prenoms'] = "";
    }
}

if (count($dataOut) > 0 && isset($dataOut) && is_array($dataOut)) {
    //var_dump($dataOut);
    $tab_sortie = array("verification" => TRUE, 'data' => $dataOut);
    echo json_encode($dataOut);
} else {
    $tab_sortie = array("verification" => FALSE);
    echo json_encode($tab_sortie);
} 