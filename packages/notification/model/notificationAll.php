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
       
    $sql = "select gt.id,
		gt.name,
		gt.date,
		gt.status,
		gt.requesttypes_id,
		gt.content,
		gt.priority,
		gt.type,
		gr.name as typedemnde
                    from glpi_tickets as gt
                    inner join glpi_requesttypes as gr on gr.id=gt.requesttypes_id
                    order by gt.date desc ";
    $dataOut = $mysql->getSQL($connMySQL, $sql);
    $tab_sortie = [];
    foreach ($dataOut as $key => $value) {
        $tab = [];
        $tab['id'] = $value->id;
        $tab['name'] = utf8_encode($value->name);
        $tab['date'] = $value->date;     
        $tab['requesttypes_id'] = $value->requesttypes_id;
        $tab['content'] = utf8_encode($value->content);
        $tab['priority'] = $value->priority;
        $tab['type'] = $value->type;
        $tab['typedemnde'] = $value->typedemnde;

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
