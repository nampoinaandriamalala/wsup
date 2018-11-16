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
$sql = "select DISTINCT
              gidm.size as designation,             
              count(gidm.size) as counttotal
        from glpi_computers as gc
        inner join glpi_items_devicememories as gidm on gidm.items_id = gc.id
        inner join glpi_devicememories as gdm on gdm.id = gidm.devicememories_id      
        GROUP BY gidm.size";


$dataOut = $mysql->getSQL($conn, $sql);

//$sortie = array("datas" => $dataOut);
echo json_encode($dataOut);
} catch (Exception $ex) {
    http_response_code(400);
    echo json_encode(['error' => $ex->getMessage()]);
}
?>