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
             $sql = "select gc.id as id_poste,
					gl.name as location,
					'' as plan_id,
				    gc.name as nom_poste,
				    gc.contact as possesseur,
				    gc.contact as ip,
				    glpi.glpi_plugin_fusioninventory_inventorycomputercomputers.remote_addr as ip_adress
				    from glpi.glpi_computers as gc
				    inner join glpi.glpi_plugin_fusioninventory_inventorycomputercomputers 
				    	on gc.id=glpi.glpi_plugin_fusioninventory_inventorycomputercomputers.computers_id
				    inner join glpi.glpi_locations as gl on gc.locations_id=gl.id
                                    
				    ";
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