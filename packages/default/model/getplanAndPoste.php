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

    function formatInput(array $input = null) {
//        if ($input) {
//            return $input;
//        }
//
//        $method = $_SERVER['REQUEST_METHOD'];
//
//        if ($method == 'POST') {
//            return $_POST;
//        } elseif ($method == 'GET') {
//            return $_GET;
//        } else {
//            return [];
//        }
        return $_POST;
    }

    function response($data, $status_code = 200) {
        if (is_array($data) && isset($data['error'])) {
            if ($status_code == 200) {
                $status_code = 500;
            }
            http_response_code($status_code);
        }
        print_r(json_encode($data));
    }

    //BDD
    $postgres = new connexion();
    $conn = $postgres->connect();
    $action = formatInput()['action'];
    $data = formatInput();

    switch ($action) {
        case 'addEmplacement':
            $plan_id = $data['plan_id'];
            $placement_glpi = $data['placement_glpi'];
            //var_dump($_POST);
            //SQL
            $sql = "select * from placement_correspondance where plan_id = '$plan_id'";
            $exists = $postgres->getSQL($conn, $sql);
            if (is_array($exists) && count($exists) > 0) {
                $sql = "update placement_correspondance set placement_glpi = '$placement_glpi' where plan_id = '$plan_id'";
            } else {
                $sql = "insert into placement_correspondance (plan_id, placement_glpi) values ('$plan_id', '$placement_glpi');";
            }

            $dataOut = $postgres->insertSQL($conn, $sql);

            $sortie = array("erreur" => "non", "notification" => "success", "message" => "Opération terminée avec succès", "datas" => $dataOut);

            response($sortie);
            break;

        case 'getPostes':
            $mysql = new conmysql();
            $connMySQL = $mysql->connect();

            $sql = "select DISTINCT
                        gc.id as id_poste,
                        gl.name as location,
                        gc.name as nom_poste,
                        gc.contact as possesseur,
                        gc.operatingsystems_id as operatingsystem_id,
                        gpficc.remote_addr as ip_adress,
                        gdp.designation as processors_designation,
                        gop.name as name_system,
                        gidp.itemtype as itemtype_processors,
                        gdm.designation as designation_processeurs,
                        gdm.frequence as frequence_proc,
                        gidm.size as size_memories,
                        gdm.frequence as frequence_memory,
                        gdgc.designation as designation_graphic_card,
                        gidnc.mac as mac,
                        gdnc.designation as designation_mac,
                        gidhd.capacity as capacity_hdd
	

                                from glpi_computers as gc

                                inner join glpi_plugin_fusioninventory_inventorycomputercomputers as gpficc on gpficc.computers_id = gc.id
                                inner join glpi_operatingsystems as gop on gop.id = gc.operatingsystems_id 

                                left join glpi.glpi_locations as gl on gl.id = gc.locations_id

                                inner join glpi_items_deviceprocessors as gidp on gidp.items_id = gc.id
                                inner join glpi_deviceprocessors as gdp on gdp.id = gidp.deviceprocessors_id

                                inner join glpi_items_devicememories as gidm on gidm.items_id = gc.id
                                inner join glpi_devicememories as gdm on gdm.id = gidm.devicememories_id

                                inner join glpi_items_devicegraphiccards as gidgc on gidgc.items_id = gc.id
                                inner join glpi_devicegraphiccards as gdgc on gdgc.id = gidgc.devicegraphiccards_id

                                inner join glpi_items_devicenetworkcards as gidnc on gidnc.items_id = gc.id
                                inner join glpi_devicenetworkcards as gdnc on gdnc.id = gidnc.devicenetworkcards_id

                                inner join glpi_items_devicesoundcards as gidsc on gidsc.items_id = gc.id
                                inner join glpi_devicesoundcards as gdsc on gdsc.id = gidsc.devicesoundcards_id

                                inner join glpi_items_deviceharddrives as gidhd on gidhd.items_id = gc.id
                                inner join glpi_deviceharddrives as gdhd on gdhd.id = gidhd.deviceharddrives_id";
            
//                        		where gl.name in ('3/G/0001', '3/A/0007', '3/K/0013')	    


            $postes = $mysql->getSQL($connMySQL, $sql);
            $sql = "select * from placement_correspondance";
            $placements = $postgres->getSQL($conn, $sql);

            $postesPlacements = [];

            foreach ($postes as $key => $value) {
                $post_key = $value->location;
                $postesPlacements[$post_key] = $value;
            }

            // print_r($postesPlacements);

            foreach ($placements as $key => $value) {
                $post_key = $value['placement_glpi'];
                if (isset($postesPlacements[$post_key])) {
                    // print_r($postesPlacements[$post_key]->plan_id);
                    $postesPlacements[$post_key]->plan_id = $value['plan_id'];
                }
            }

            $result = [];

            foreach ($postesPlacements as $key => $value) {
                $result[] = $value;
            }

            response($result);

            break;

        default:
            return response(['error' => 'route not found'], 404);
    }
} catch (Exception $ex) {
    http_response_code(400);
    echo json_encode(['error' => $ex->getMessage()]);
}

