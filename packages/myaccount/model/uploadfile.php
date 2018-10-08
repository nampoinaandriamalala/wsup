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

//$matricule = $_POST['matricule'];
//BDD
$postgres = new connexion();
$conn = $postgres->connect();

$target_dir = "../../../temp/uploads/";
$target_dir_rename = $target_dir;


//$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
$nom_fichier = date("Ymdhms");

$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
$uploadOk = 1;
$imageFileType = pathinfo($target_file, PATHINFO_EXTENSION);

$target_dir_rename = $target_dir_rename.'/'.$nom_fichier.'.'.$imageFileType;


$nom_final = $nom_fichier.'.'.$imageFileType;

// Check if file already exists
if (file_exists($target_file)) {
    //echo "Sorry, file already exists.";
    //$uploadOk = 0;
    //Remove file
    unlink($target_file);
}
// Check file size
if ($_FILES["fileToUpload"]["size"] > 500000) {
    $tab_sortie = array("erreur" => "oui", "message" => "Désolé, le fichier est trop grand.");
    echo json_encode($tab_sortie);
    $uploadOk = 0;
    exit();
}
// Allow certain file formats
//if ($imageFileType != "csv") {
//    $uploadOk = 0;
//    $tab_sortie = array("erreur" => "oui", "message" => "Désolé, veuillez utiliser un fichier csv.");
//    echo json_encode($tab_sortie);
//    exit();
//}
// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    $tab_sortie = array("erreur" => "oui", "message" => "Désolé, votre fichier n'a pas été traité.");
    echo json_encode($tab_sortie);
    exit();
} else {
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_dir_rename)) {
        //echo "le fichier " . basename($_FILES["fileToUpload"]["name"]) . " a bien été envoyé.<br />";
        //Lire le fichier CSV
        
        $tab_sortie = array("erreur" => "non", "message" => "Opération terminée avec succès", "notification" => "success","nom_fichier" => $nom_final);
        echo json_encode($tab_sortie);
    } else {
        $tab_sortie = array("erreur" => "oui", "message" => "Désolé, il y a eu erreur lors de l'envoye du fichier." , "notification" => "warning", "nom_fichier" => "");
        echo json_encode($tab_sortie);
        exit();
    }
}

?>