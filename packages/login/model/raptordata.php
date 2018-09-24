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

$type = "";

if (isset($_POST["type"]))
    $type = pg_escape_string($_POST["type"]);

$where = "";

switch ($type) {
    case "0":
        break;
    default:
        $where = "  where r.identifiant <> 'super_administrateur'  ";
        break;
}

$sql = "select * from raptor r 
        $where 
        order by r.identifiant";
//var_dump($_POST);
//SQL

$dataOut = $postgres->getSQL($conn, $sql);

$sortie = array("erreur" => "non", "notification" => "success", "message" => "Opération terminée avec succès", "datas" => $dataOut);
echo json_encode($sortie);



