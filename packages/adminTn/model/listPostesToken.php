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

//BDD
$mysql = new conmysql();
$conn = $mysql->connect();
$term = $_GET['term'];

//SQL
$sql = "select glpi.glpi_computers.id as id,
    glpi.glpi_computers.name as label,
    glpi.glpi_plugin_fusioninventory_inventorycomputercomputers.remote_addr as value
    from (glpi.glpi_computers
    inner join glpi.glpi_plugin_fusioninventory_inventorycomputercomputers 
    on glpi.glpi_computers.id=glpi.glpi_plugin_fusioninventory_inventorycomputercomputers.computers_id) 
    where glpi.glpi_computers.name like '%$term%' or glpi.glpi_plugin_fusioninventory_inventorycomputercomputers.remote_addr like '%$term%'";
$dataOut = $mysql->getSQL($conn, $sql);

//$sortie = array("datas" => $dataOut);
echo json_encode($dataOut);
?>