<?php
/**
 * Default
 * 
 * 
 * @package    
 * @subpackage Controller
 * @author     YOUR NAME <YOUREMAIL@jouve.com>
 */
include 'config/connexion.php';

//BDD
$postgres = new connexion();
$conn = $postgres->connect();

//var_dump($_POST);
//SQL
$sql = "select * from menu m order by m.niveau";
$dataOut = $postgres->getSQL($conn, $sql);

$enfant_array = [];

$dataOut = reorganisation($dataOut);


function reorganisation($dataOut) {
    $ordre = [];

    $test = true;
    $finish_count = 0;
    while ($test) {
        $test = false;
        $force_break = false;
        foreach ($dataOut as $key => $value) {
            
            if($force_break == true)
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
        if($finish_count > 500)     //Si boucle infinie
        {
            $test = false;
        }
    }

    return $dataOut;
}

function prendreEnfant($tableau, $niveau) {

    $enfant = [];
    foreach ($tableau as $key => $value) {
        $test_niveau = $value['niveau'];

        if ($niveau != $test_niveau) {
            $tab_menu = explode($niveau, $test_niveau);
//            if ($tab_menu[0] == $niveau) {
            $nombre = count($tab_menu);

            if ($nombre > 1) {
                if ($tab_menu[0] == "")
                    $enfant[] = $value;
            }
//            }
        }
    }

    return $enfant;
}

function getEnfants($array, $niveau, &$enfant_array) {
    $retour = [];
    foreach ($array as $ligne) {
        $compte_niv_parent = count(explode('-', $niveau));
        if (substr($ligne['niveau'], 0, strlen($niveau)) == $niveau && $compte_niv_parent + 1 == count(explode('-', $ligne['niveau'])) && !in_array($ligne['niveau'], $enfant_array)) {
            array_push($retour, $ligne);
            array_push($enfant_array, $ligne['niveau']);
        }
    }
    return $retour;
}

function ecrireenfant($array, $niveau, $ngShow, $class, &$enfant_array, &$cle, $padding) {
    $enfants = getEnfants($array, $niveau, $enfant_array);
    if (count($enfants) > 0) {
        echo '<ul class="' . $class . '" ng-class="collapse[' . $cle . ']" ' . $ngShow . '>';

        $padding += 10;
        foreach ($enfants as $key2 => $ligne) {
            $cle += 1;
            $url_enfant = $ligne['url'] == "" ? "#" : $ligne['url'];
            $libele_enfant = $ligne['libelle'];
            $variable_associer = $ligne['variable_associer'];

            $enfantNgShow = "";
            if ($variable_associer != "" && $variable_associer != null)
                $enfantNgShow = 'ng-if="' . $variable_associer . '"';

            $icon = $ligne['icon'];
            echo '<li class="correct-menu" style="padding-left:' . $padding . 'px;" ng-class="menu[' . $cle . ']" ng-click="activeMenu($event, ' . $cle . ')">'
            . '<a href="' . $url_enfant . '">'
            . '   <span class="block-libele-menu-a">' . $libele_enfant . '</span>'
            . '   <span class="block-libele-menu-b btn pull-right" style="margin-top:5px; padding-right: 0px;">' . $icon . '</span>'
            . '</a>'
            . '</li>';

            echo ecrireenfant($array, $ligne['niveau'], $enfantNgShow, 'sub-sub-menu', $enfant_array, $cle, $padding);
        }
        echo '</ul>';
    }
}

if (isset($_COOKIE['login']) && ($_COOKIE['login'] != null || $_COOKIE['login'] != "")) {
    ?>
    <div class="menu no-print" ng-show="showBanner" ng-controller="CtrlMenu" id="menuRaptor">
        <aside>
            <nav class="navbar navbar-inverse sidebar navbar-fixed-top" ng-class="menuSlide" role="navigation" id="navbarraptor">
                <div class="nav-side-menu">
                    <div class="brand uppercase" ng-controller="Ctrltitle as title" ng-cloak>{{nom_projet}}</div>

                    <i class="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content"></i>

                    <div class="menu-list">
                        <?php /* "activeMenu($event,x)"  permet activer "menu[x]" en active et par la même occasion d'ouvir le lien qui est contenu dans "li" */ ?>
                        <ul id="menu-content" class="menu-content collapse out">
                            <?php
                            //Ajout des menus du bdb du projet seulement pour 2 niveaux pour l'instant
                            if (is_array($dataOut)) {
                                $menus = [];
                                $cle = 0;

                                $libelle = "";
                                $niveau = "";
                                $url = "";
                                $variable_associer = "";
                                $icon = "";

                                $html = "";
                                $menus = [];

                                ///parent
                                $array_enfants = $dataOut;
                                foreach ($dataOut as $key => $value) {


                                    $cle ++;

                                    $tab_niveau = explode("-", $value['niveau']);
                                    if (count($tab_niveau) == 1) {
                                        $variable_associer = $value['variable_associer'];
                                    }

                                    $ngShow = "";
                                    if ($variable_associer != "" && $variable_associer != null)
                                        $ngShow = 'ng-if="' . $variable_associer . '"';

                                    $url = $value['url'];
                                    $icon = $value['icon'];
                                    $libelle = $value['libelle'];
                                    $niveau = $value['niveau'];

                                    $lien = '';

                                    if ($url != "") {  //Si il n'y a pas de url
                                        $lien = '<a href="' . $url . '">' . $icon . " " . $libelle . '  <span class="btn pull-right" style="margin-top:5px; padding-right: 0px;">' . $icon . '</span></a>';
                                    } else {
                                        $lien = '<span class="sans-url">' . $icon . " " . $libelle . '  <span class="btn pull-right" style="margin-top:5px; padding-right: 0px;">' . $icon . '</span></span>';
                                    }

                                    if (count($tab_niveau) == 1) {
                                        echo '<li ng-class="menu[' . $cle . ']" ng-click="activeMenu($event, ' . $cle . ')" ' . $ngShow . '>
                                                    ' . $lien . '
                                            </li>';
                                    }
                                    $padding = 0;
                                    ecrireenfant($dataOut, $niveau, $ngShow, 'sub-menu', $enfant_array, $cle, $padding);
                                }
                            }
                            ?>
                            <li class="nav-bottom">
                                <a href="deconnexion">
                                    <i class="fa fa-power-off fa-lg"></i> Déconnexion [<?php echo $_COOKIE['login']; ?>]<i class="fa fa-power-off fa-lg btn pull-right" style="margin-top: 5px;margin-right: 1px;"></i>
                                </a>
                            </li>
                            <li class="nav-bottom-menu-show-hide" ng-click="affichermenu()">                                                                    
                                <span ng-if="iconSlide">
                                    <i class="fa fa-lg btn pull-right fa-chevron-circle-right" aria-hidden="true" style="margin-top:5px" id="DivButton"></i>                                
                                </span>
                                <span ng-if="!iconSlide">
                                    <i class="fa fa-lg btn pull-right fa-chevron-circle-left" aria-hidden="true" style="margin-top:5px" id="DivButton"></i>                                
                                </span>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>

        </aside>

        <div class="banner-top" ng-class="menuSlide">
            <img class="image-logo" src="ressources/images/LogoJouveMada.png">
        </div>
    </div>

    <?php
} else {
    ?>
    <!--<div class="menu" ng-if="showBanner" ng-controller="CtrlMenu" id="menuRaptor">-->
    <div class="menu" ng-show="showBanner" ng-controller="CtrlMenu" id="menuRaptor">
        <div class="bs-example">
            <nav role="navigation" class="navbar navbar-default">
                <!-- Brand and toggle get grouped for better mobile display -->
                <div class="navbar-header">
                    <!--                    <button type="button" data-target="#navbarCollapse" data-toggle="collapse" class="navbar-toggle">
                                            <span class="sr-only">Toggle navigation</span>
                                            <span class="icon-bar"></span>
                                            <span class="icon-bar"></span>
                                            <span class="icon-bar"></span>
                                        </button>-->
                    <img class="image-logo" src="ressources/images/LogoJouveMada.png">
                    <a href="deconnexion" class="navbar-brand"><h2 style="padding-left: 20px;">Chargement de la page ...</h2></a>
                </div>
                <!-- Collection of nav links and other content for toggling -->
                <div id="navbarCollapse" class="collapse navbar-collapse">
                    <ul class="nav navbar-nav"></ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li><a href="deconnexion">Déconnexion x</a></li>
                    </ul>
                </div>
            </nav>
        </div>
    </div>
    <?php
}
?>