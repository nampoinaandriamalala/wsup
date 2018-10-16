<?php

/**
 * Default
 * 
 * 
 * @package    
 * @subpackage Controller
 * @author     Anjara Landrice <alrandrianambinina@jouve.com>
 */
include '../../../config/autoload.php';
include '../../../config/catcherrors.php';


try {
    //BDD
    $postgres = new connexion();
    $conn = $postgres->connect();

    //Sut la table emplacement
    //$id_emplacement = $_POST['id_emplacement'];

    //$id_bloc_svg = $_POST['id_bloc_svg'];


    // Sur la table(bdd) poste
    //$id = $_POST['id'];

    $nom_poste = $_POST['nomposte'];
    $ip = $_POST['ip'];
    $possesseur=$_POST['possesseur'];
    $matricule_responsable=$_POST['matricule_responsable'];
    $date=$_POST['date'];


    // Pour la table(bdd) emplacement
    $siege = $_POST['siege'];
    $niveau = $_POST['niveau'];
    $lettre = $_POST['lettre'];
    $numero = $_POST['numero'];


    $sql = "select id_emplacement from emplacement where siege='$siege' and niveau='$niveau' and lettre= '$lettre'";
    $results = $postgres->getSQL($conn, $sql);

    if (is_array($results) && count($results) > 0) {
        $id_emplacement = $results[0]['id_emplacement'];

        $sql = "select * from poste where nom_poste='$nom_poste' and  ip='$ip' and  possesseur='$possesseur' and  id_emplacement='$id_emplacement' ";

        $exists = $postgres->getSQL($conn, $sql);
        if (is_array($exists) && count($exists) > 0) {
            throw new Exception("Ce poste existe déjà", 1);   
        }

        $sql="insert into poste (nom_poste, ip, possesseur, id_emplacement,matricule_responsable,date) values ('$nom_poste','$ip','$possesseur','$id_emplacement','$matricule_responsable','$date')";
    } else {
        http_response_code(404);
        die("etape not found: $sql");
    }
    $dataOut = $postgres->insertSQL($conn, $sql);
    echo json_encode($dataOut);   
} catch (Exception $ex) {
    http_response_code(400);
    echo json_encode(['error' => $ex->getMessage()]);  
}
?>