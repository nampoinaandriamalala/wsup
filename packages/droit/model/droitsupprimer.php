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


//On supprimer l'utilisateur
$sql = "delete from group_admin where id = $id";

$postgres->deleteSQL($conn, $sql);

$sortie = array("erreur" => "non", "notification" => "danger", "message" => "Le groupe a été supprimé.", "datas" => array());
echo json_encode($sortie);


//}
?>