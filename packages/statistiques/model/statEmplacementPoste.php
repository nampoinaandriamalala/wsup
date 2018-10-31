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
include '../../../config/conmysql.php';
include '../../../config/catcherrors.php';

try {

$postgres = new connexion();
$conn = $postgres->connect();
$Outresult = [];

$sql_placementglpi = "select placement_glpi from placement_correspondance";
$resultplacement = $postgres->getSQL($conn, $sql_placementglpi);

$mysql = new conmysql();
$connMySQL = $mysql->connect();

foreach ($resultplacement as $key => $value) {
    $placement = $resultplacement[$key]['placement_glpi'];
    $sql_nouvelle = "select count(placement_glpi) from placement_correspondance";
    $totalPoste = $postgres->getSQL($conn, $sql_nouvelle)[0]['count'];

    $sql_modif = "select count(name) from glpi.glpi_locations where name = '$placement'";
    $resultmodif = $mysql->getSQL($connMySQL, $sql_modif);
//[0]['count']
    
    array_push($Outresult, array("c" => array(array('v' => $placement), array('v' => $totalPoste), array('v' => $resultmodif),)));
}

$sortie = array("erreur" => "non", "notification" => "success", "message" => "Opération terminée avec succès", $Outresult);
echo json_encode($sortie);

} catch (Exception $ex) {
    http_response_code(400);
    echo json_encode(['error' => $ex->getMessage()]);
}

?>
