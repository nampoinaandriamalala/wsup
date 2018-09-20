<?php

/**
 * Default
 * 
 * 
 * @package    
 * @subpackage Controller
 * @author     YOUR NAME <YOUREMAIL@jouve.com>
 */
$tab_route = $_POST['route'];
$tab_simple = [];
$tab_administrateur = [];

foreach ($tab_route as $value_route) {
    
    if (strpos($value_route['url'], '/r-') !== false) {
        $tab_administrateur[] = $value_route;
    }else{
        $tab_simple[] = $value_route;
    }
}

///*Génération pour contenu Route simple*///
$route_simple = "";
foreach ($tab_simple as $simple) {
    $url = $simple['url'];
    $template = $simple['template'];
    $controler = $simple['controler'];

    $str_simple = 
".when(\"$url\", {
            templateUrl: \"$template\",
            controller: '$controler',
        })
";
    $route_simple.=$str_simple;
}
//Ajout pour 404 not found
$route_simple.=
".otherwise({
            templateUrl: \"packages/default/views/error_404.html\",
            controller: 'CtrlOtherwise',
        });
";

$route_simple = 
'$routeProvider
'.$route_simple;




///*Génération pour contenu Route admin*///
$route_admin = "";
foreach ($tab_administrateur as $admin) {
    $url = $admin['url'];
    $template = $admin['template'];
    $controler = $admin['controler'];

    $str_admin = 
".when(\"$url\", {
            templateUrl: \"$template\",
            controller: '$controler',
        })
";
    $route_admin.=$str_admin;
}
//Ajout point virgule
$route_admin.=";";

$route_admin = 
'$routeProvider
'.$route_admin;




//echo "<pre>";
//echo $route_simple;
//echo "</pre>";
//
//echo "<pre>";
//echo $route_admin;
//echo "</pre>";
//
//exit();



$chemin_routeur = "../../../ressources/router.js";

$tab_block = readAllRouterBlock($chemin_routeur);

//Contenu du fichier actuel
$contenu_fichier = file_get_contents($chemin_routeur);


//var_dump($tab_block);
//var_dump($contenu_fichier);

//modifier contenu 0

$contenu_fichier_modifier = str_replace($tab_block[0], $route_simple, $contenu_fichier);


//modifier contenu 1
$contenu_fichier_modifier = str_replace($tab_block[1], $route_admin, $contenu_fichier_modifier);


//réécrire le fichier
file_put_contents($chemin_routeur, $contenu_fichier_modifier);

//echo "ok";
//exit();

$sortie = array("erreur" => "non", "notification" => "success", "message" => "Opération terminée avec succès", "datas" => array());
echo json_encode($sortie);

//Fonction
function readAllRouterBlock($chemin = "../../../ressources/router.js") {
    $input_lines = file_get_contents($chemin);
    // /\$routeProvider[a-zA-Z0-9 \n\t\s\.\(\)\/\"\,\{\}\-\:\'\_]*\;/
    preg_match_all('/\$routeProvider[a-zA-Z0-9 \n\t\s\.\(\)\/\"\,\{\}\-\:\'\_]*\;/', $input_lines, $output_array);
    return $output_array[0];
}

?>