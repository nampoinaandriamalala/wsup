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
              gdp.designation as designation,
              SUBSTR(gdp.designation,1,20) as valeursub,
              count(gdp.designation) as counttotal
        from glpi_computers as gc
        inner join glpi_items_deviceprocessors as gidp on gidp.items_id = gc.id
        inner join glpi_deviceprocessors as gdp on gdp.id = gidp.deviceprocessors_id       
        GROUP BY valeursub";


$dataOut = $mysql->getSQL($conn, $sql);

//$sortie = array("datas" => $dataOut);
echo json_encode($dataOut);
} catch (Exception $ex) {
    http_response_code(400);
    echo json_encode(['error' => $ex->getMessage()]);
}
?>