<?php

/**
 * Default
 * 
 * 
 * @package    
 * @subpackage Controller
 * @author     Anjara Landrice <smohamady@jouve.com>
 */
include '../../../config/autoload.php';

//BDD
$postgres = new connexion();
$conn = $postgres->connect();

//Sut la table emplacement
$id_emplacement = $_POST['id_emplacement'];

$id_bloc_svg = $_POST['id_bloc_svg'];


// Sur la table poste
$id = $_POST['id'];
$nom_poste = $_POST['id_poste'];
$ip = $_POST['ip'];
$possesseur=$_POST['possesseur'];
$matricule_responsable=$_POST['matricule_responsable'];
$date=$_POST['date'];


if (is_array($results) && count($results) > 0) {
    $id_emplacement = $results[0]['id_emplacement'];
} else {
    http_response_code(404);
    die("etape not found: $sql");
}
$sql="insert into poste (id, id_pc, ip, possesseur, id_emplacement,matricule_responsable,date) values ($id,$nom_poste,$ip,$possesseur,$id_emplacement,$matricule_responsable,$date)";
$results = $postgres->getSQL($conn, $sql);
?>