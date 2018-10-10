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
$postgres = new conmysql();
$conn = $postgres->connect();


//SQL
$sql = "select glpi.glpi_computers.id as id_poste,
    glpi.glpi_computers.name as nom_poste,
    glpi.glpi_plugin_fusioninventory_inventorycomputercomputers.remote_addr as ip_adress
    from (glpi.glpi_computers
    inner join glpi.glpi_plugin_fusioninventory_inventorycomputercomputers 
    on glpi.glpi_computers.id=glpi.glpi_plugin_fusioninventory_inventorycomputercomputers.computers_id)";
$dataOut = $postgres->getSQL($conn, $sql);

$sortie = array("datas" => $dataOut);
echo json_encode($sortie);
?>