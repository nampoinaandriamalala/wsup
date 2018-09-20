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
$postgres = new connexion();
$conn = $postgres->connect();

//var_dump($_POST);
//SQL
$sql = "select * from menu m order by m.niveau";
$dataOut = $postgres->getSQL($conn, $sql);
$dataOut = reorganisation($dataOut);
echo json_encode($dataOut);

function reorganisation($dataOut) {
    $ordre = [];

    $test = true;
    $finish_count = 0;
    while ($test) {
        $test = false;
        $force_break = false;
        foreach ($dataOut as $key => $value) {

            if ($force_break == true)
                break;

            $tab_niv = explode('-', $dataOut[$key]['niveau']);
            if (array_key_exists($key + 1, $dataOut)) {
                $tab_niv_another = explode('-', $dataOut[$key + 1]['niveau']);
                $count = count($tab_niv_another);

                if (count($tab_niv) > count($tab_niv_another)) {
                    $count = count($tab_niv);
                }
                for ($index = 0; $index < $count; $index++) {
                    if (array_key_exists($index, $tab_niv) && array_key_exists($index, $tab_niv_another)) {
                        $note_niv = intval($tab_niv[$index]);
                        $note_niv_another = intval($tab_niv_another[$index]);

                        if ($note_niv > $note_niv_another) {
                            $avant = $dataOut[$key];
                            $apres = $dataOut[$key + 1];
                            $dataOut[$key] = $apres;
                            $dataOut[$key + 1] = $avant;

                            $test = true;
                            $force_break = true;
                            break;
                        }
                    } else if (!array_key_exists($index, $tab_niv) && array_key_exists($index, $tab_niv_another)) {
                        break;
                    } else if (array_key_exists($index, $tab_niv) && !array_key_exists($index, $tab_niv_another)) {
                        break;
                    }
                }
            }
        }

        $finish_count++;
        if ($finish_count > 500) {     //Si boucle infinie
            $test = false;
        }
    }

    return $dataOut;
}

?>