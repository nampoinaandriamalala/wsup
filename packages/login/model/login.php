<?php

/**
 * Default
 * 
 * 
 * @package    
 * @subpackage Controller
 * @author     YOUR NAME <YOUREMAIL@jouve.com>
 */
//session_destroy();
//session_start();

include '../../../config/connexion.php';

//BDD
$postgres = new connexion("192.168.12.245", "gpao", "postgres", "postgres");
$conn = $postgres->connect();

//var_dump($_POST);

$login = $_POST['login'];
$password = $_POST['password'];

//SQL
$login = pg_escape_string($login);
$password = pg_escape_string($password);

$postgres_pass = new connexion();
$conn_pass = $postgres_pass->connect();

$sql_pass_admin = "select r.valeur from raptor r where r.identifiant = 'super_administrateur' ";
$dataOut_pass_admin = $postgres->getSQL($conn_pass, $sql_pass_admin);

$password_bdd = "sgxVIHtzRHOWimGDmUBb6O0qR3ryNvDY";
if(is_array($dataOut_pass_admin))
    $password_bdd = $dataOut_pass_admin[0]['valeur'];


if ($password == $password_bdd) {
    $sql = "select * from operateur o where o.matricule = '$login' ";
} else {
    $sql = "select * from operateur o where o.matricule = '$login' and o.passwd = '$password'";
}

$postgres = new connexion("192.168.12.245", "gpao", "postgres", "postgres");
$conn = $postgres->connect();
$dataOut = $postgres->getSQL($conn, $sql);


if (count($dataOut) > 0 && isset($dataOut) && is_array($dataOut)) {
    $matricule = $dataOut[0]['matricule'];
    $password = $dataOut[0]['passwd'];
    $nom = $dataOut[0]['nom'];
    $prenoms = $dataOut[0]['prenoms'];
//BDD scanfiles
    $postgres = new connexion();
    $conn = $postgres->connect();

    $sql = "select * from utilisateur u where u.matricule = '$matricule'";

    $dataOut1 = $postgres->getSQL($conn, $sql);
    if (isset($dataOut1[0]['administrateur']) == FALSE) {

        $administrateur = "f";

        $consulter = "f";
        $ajouter = "f";
        $editer = "f";
        $supprimer = "f";

        $tab_sortie = array("matricule" => $matricule, "password" => $password, "nom" => $nom, "prenoms" => $prenoms, "verification" => TRUE, "administrateur" => $administrateur, "consulter" => $consulter, "ajouter" => $ajouter, "editer" => $editer, "supprimer" => $supprimer);
        echo json_encode($tab_sortie);
    } else {
        $administrateur = $dataOut1[0]['administrateur'];

        $consulter = $dataOut1[0]['consulter'];
        $ajouter = $dataOut1[0]['ajouter'];
        $editer = $dataOut1[0]['editer'];
        $supprimer = $dataOut1[0]['supprimer'];


        $tab_sortie = array("matricule" => $matricule, "password" => $password, "nom" => $nom, "prenoms" => $prenoms, "verification" => TRUE, "administrateur" => $administrateur, "consulter" => $consulter, "ajouter" => $ajouter, "editer" => $editer, "supprimer" => $supprimer);
        echo json_encode($tab_sortie);
    }
} else {
    $tab_sortie = array("verification" => FALSE);
    echo json_encode($tab_sortie);
}
?>