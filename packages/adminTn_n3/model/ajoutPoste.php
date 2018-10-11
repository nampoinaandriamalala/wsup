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
$siege = $_POST['siege'];
$niveau = $_POST['niveau'];
$batiment = $_POST['batiment'];
$lettre = $_POST['lettre'];
$numero = $_POST['numero'];
$id_bloc_svg = $_POST['id_bloc_svg'];


// Sur la table poste
$id = $_POST['id'];
$nom_poste = $_POST['id_poste'];
$ip = $_POST['ip'];
$possesseur=$_POST['possesseur'];

$sql = "select id_emplacement from emplacement where siege=$siege and niveau=$niveau and lettre=$lettre and numero=$numero";
$results = $postgres->getSQL($conn, $sql);


if (is_array($results) && count($results) > 0) {
    $id_emplacement = $results[0]['id_emplacement'];
} else {
    http_response_code(404);
    die("etape not found: $sql");
}
$sqlinsert_poste="insert into poste (id, id_pc, ip, possesseur, id_emplacement) values ($id,$nom_poste,$ip,$possesseur,$id_emplacement )";

?>