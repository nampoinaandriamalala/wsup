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
//BDD
    $mysql = new conmysql();
    $conn = $mysql->connect();


//SQL
    $sql = "SELECT DISTINCT
              gidp.name as designation,
              count(gidp.name) as counttotal
        from `glpi_computers` as gc
        INNER JOIN `glpi_states` as gidp on gidp.id = gc.states_id  
        GROUP BY gc.states_id";


    $dataOut = $mysql->getSQL($conn, $sql);

    $tab_sortie = [];
    foreach ($dataOut as $key => $value) {
        $tab = [];
        
        $tab['designation'] = utf8_encode($value->designation);
        $tab['counttotal'] = utf8_encode($value->counttotal);

        $tab_sortie[] = $tab;
    }


//$sortie = array("datas" => $dataOut);
    echo json_encode($tab_sortie);
} catch (Exception $ex) {
    http_response_code(400);
    echo json_encode(['error' => $ex->getMessage()]);
}
?>