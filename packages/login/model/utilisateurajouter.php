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



$matricule = $_POST['matricule'];

if (trim($matricule) == "") {
    $tab_sortie = array("erreur" => "oui");
    echo json_encode($tab_sortie);
    exit();
}

$consultater = $_POST['consulter'];
$ajouter = $_POST['ajouter'];
$editer = $_POST['editer'];
$supprimer = $_POST['supprimer'];
$admin = $_POST['admin'];
//<<<<<<< HEAD
$adresseemail = pg_escape_string($_POST['adresseemail']);
//=======
//$prenom = $_POST['prenom'];

//>>>>>>> d6674ae438fa7d8b28bdce64201aae1abe82f1fb

//Si existe 

$sql = "select count(*) as nombre from utilisateur u where u.matricule = '$matricule'";
$dataOut = $postgres->insertSQL($conn, $sql);

$nombre = $dataOut[0]['nombre'];

if ($nombre > 0) {
    $tab_sortie = array("erreur" => "oui");
    echo json_encode($tab_sortie);
    exit();
}

//On selectionne le fournisseur corespondant au nom fournisseur et on enregistre le nouveau donné
//<<<<<<< HEAD
$sql = "insert into utilisateur (matricule,consulter,ajouter,editer,supprimer,administrateur,email) values ('$matricule',$consultater,$ajouter,$editer,$supprimer,$admin,'$adresseemail') RETURNING id";
//=======
//$sql = "insert into utilisateur (matricule,consulter,ajouter,editer,supprimer,administrateur, prenom) values ('$matricule',$consultater,$ajouter,$editer,$supprimer,$admin, '$prenom') RETURNING id";
/*print_r($sql);
exit();*/
//>>>>>>> d6674ae438fa7d8b28bdce64201aae1abe82f1fb

$dataOut = $postgres->insertSQL($conn, $sql);

$id = $dataOut[0]['id'];

//TEST si il y a erreur
if (is_numeric($id)) {
    
    $sortie = array("erreur" => "non", "notification" => "success", "message" => "Opération terminée avec succès", "datas" => $dataOut);
    echo json_encode($sortie);
    
} else {
    
    $sortie = array("erreur" => "non", "notification" => "success", "message" => "Opération terminée avec succès", "datas" => array());
    echo json_encode($sortie);
    
}
