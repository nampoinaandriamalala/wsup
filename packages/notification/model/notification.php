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
    $sql = "select * from glpi_tickets order by date desc";
    $dataOut = $mysql->getSQL($connMySQL, $sql);

//$sortie = array("datas" => $dataOut);
    

    //echo json_encode(array(utf8_encode($dataOut)));
//    $result = [];
//    
//    foreach ($dataOut as $data) {
//        $data->name = utf8_encode($data->name);
//        $result[] = $data;
//    }
    
//    print_r($dataOut);
    print_r(json_encode( $dataOut, JSON_UNESCAPED_UNICODE ));
    
//        echo $encoded = json_encode($dataOut) ;
//        print_r(json_decode($encoded));
    
} catch (Exception $ex) {
    http_response_code(400);
    echo json_encode(['error' => $ex->getMessage()]);
}
?>
