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



    function ping($host) {        
       $fP = fSockOpen($host, 80, $errno, $errstr, 10);
        if (!$fP) {
            return "pingko";
        }
        $msgok = "pingok";
        return $msgok;
    }

    $nom_poste = $_POST['nomposte'];
    $ip = $_POST['ip'];
    $possesseur = $_POST['possesseur'];
    $matricule_responsable = $_POST['matricule_responsable'];
    $date = $_POST['date'];


    // Pour la table(bdd) emplacement
    $siege = $_POST['siege'];
    $niveau = $_POST['niveau'];
    $lettre = $_POST['lettre'];
    $numero = $_POST['numero'];


    $sql = "select * from poste";
    $results = $postgres->getSQL($conn, $sql);

    if (is_array($results) && count($results) > 0) {       
        
        $idping = array($results[0]['id']);
        $nom_posteping = array($results[0]['nom_poste']);
        $ipping= array($results[0]['ip']);
        $possesseurping = array($results[0]['possesseur']);
        $id_emplacementping = array($results[0]['id_emplacement']);
        $matricule_responsableping = array($results[0]['matricule_responsable']);
        $dateping = array($results[0]['date']);
        
        $curr_timestamp = date('d-m-Y H:i:s');
        
        $etatping=array();
        
        echo $ipping;
        
        foreach ($iptestping as &$ipping){
            ping($iptestping);
            array_push($etatping,$ipping);
        }
        
        $sql="insert into etat (id_poste, etat, date) values ('$idping','$etatping','$curr_timestamp')";

        
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