<?php

/**
 * Default
 * 
 * 
 * @package    
 * @subpackage Controller
 * @author     YOUR NAME <YOUREMAIL@jouve.com>
 */


$dataOut = array("version" => readAllRouter());

$sortie = array("erreur" => "non", "notification" => "success", "message" => "Opération terminée avec succès", "datas" => $dataOut);
echo json_encode($sortie);




//Fonction


function readAllRouter($chemin = "../../../ressources/router.js") {
    $input_lines = file_get_contents($chemin);
   
    preg_match_all("/.when[\(\"a-zA-Z0-9\/\-\,\'\{\}\.\:\n\t\s\ ]*[\)|\);]/", $input_lines, $output_array);
    $tab_info = [];
    foreach ($output_array[0] as $single) {
        $tab_split = explode('"', $single);
        $tab_split_controller = explode("'", $tab_split[4]);
        $info = array("url" => $tab_split[1],"template" => $tab_split[3],"controler" => $tab_split_controller[1]);
        $tab_info[] = $info;
    }
    return $tab_info;
}

?>