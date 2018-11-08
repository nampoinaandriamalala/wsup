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
    $connMySQL = $mysql->connect();


//SQL
    $sql = "select * from glpi_tickets order by date desc limit 20";
    $dataOut = $mysql->getSQL($connMySQL, $sql);
    $tab_sortie = [];
    foreach ($dataOut as $key => $value) {
        $tab = [];
        $tab['id'] = $value->id;
        $tab['entities_id'] = $value->entities_id;
        $tab['name'] = utf8_encode($value->name);
        $tab['date'] = $value->date;
        $tab['closedate'] = $value->closedate;
        $tab['solvedate'] = $value->solvedate;
        $tab['date_mod'] = $value->date_mod;
        $tab['users_id_lastupdater'] = $value->users_id_lastupdater;
        $tab['status'] = $value->status;
        $tab['users_id_recipient'] = $value->users_id_recipient;
        $tab['requesttypes_id'] = $value->requesttypes_id;
        $tab['itemtype'] = $value->itemtype;
        $tab['items_id'] = $value->items_id;
        $tab['content'] = utf8_encode($value->content);
        $tab['urgency'] = $value->urgency;
        $tab['impact'] = $value->impact;
        $tab['priority'] = $value->priority;
        $tab['itilcategories_id'] = $value->itilcategories_id;
        $tab['type'] = $value->type;
        $tab['solutiontypes_id'] = $value->solutiontypes_id;
        $tab['solution'] = $value->solution;
        $tab['global_validation'] = $value->global_validation;
        $tab['slas_id'] = $value->slas_id;
        $tab['slalevels_id'] = $value->slalevels_id;
        $tab['due_date'] = $value->due_date;
        $tab['begin_waiting_date'] = $value->begin_waiting_date;
        $tab['sla_waiting_duration'] = $value->sla_waiting_duration;
        $tab['waiting_duration'] = $value->waiting_duration;
        $tab['close_delay_stat'] = $value->close_delay_stat;
        $tab['solve_delay_stat'] = $value->solve_delay_stat;
        $tab['takeintoaccount_delay_stat'] = $value->takeintoaccount_delay_stat;
        $tab['actiontime'] = $value->actiontime;
        $tab['is_deleted'] = $value->is_deleted;
        $tab['locations_id'] = $value->locations_id;
        $tab['validation_percent'] = $value->validation_percent;

        $tab_sortie[] = $tab;
    }

//    var_dump($tab_sortie);
//    exit();
//$sortie = array("datas" => $dataOut);
    //echo json_encode(array(utf8_encode($dataOut)));
//    $result = [];
//    
//    foreach ($dataOut as $data) {
//        $data->name = utf8_encode($data->name);
//        $result[] = $data;
//    }
//    print_r($dataOut);
    //echo json_encode($dataOut, JSON_UNESCAPED_UNICODE);
//        echo $encoded = json_encode($dataOut) ;
//        print_r(json_decode($encoded));
//    $array = array_map('htmlentities', $dataOut);
//
////encode
//    $json = html_entity_decode(json_encode($array));
//    echo $json;
//    echo json_encode($dataOut, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
//    $rows = array();
//
//// Loop over the db resultset and put encoded values into $rows
//    while ($row = mysql_fetch_assoc($result)) {
//        $rows[] = array_map('utf8_encode', $row);
//    }
// Output $rows
//    echo json_encode($rows);
//    foreach ($dataOut as $key => $value) {
//       $dataOut[$key]['name'] = utf8_encode($dataOut[$key]['name']);
//       $dataOut[$key]['content'] = utf8_encode($dataOut[$key]['content']);
//        
//    }

    echo json_encode($tab_sortie);
} catch (Exception $ex) {
    http_response_code(400);
    echo json_encode(['error' => $ex->getMessage()]);
}
?>
