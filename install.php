<?php

//include_once 'C:\Program Files\NetBeans 8.2\php\phpstubs\phpruntime\pgsql.php';
//ALL FUCNTION

/**
 * 
 * 
 * @param type Framework
 * @param type Jouve
 * @param type 
 * @return String
 */
/* CONFIGURATION INSTALLATION */
$host = "192.168.4.239";
$user = "postgres";
$password = "postgres";

// Create connection
$connStr = "host=$host port=5432  user=$user password=$password";

// Check connection



function xcopy($source, $dest, $permissions = 0755) {
    // Check for symlinks
    if (is_link($source)) {
        return symlink(readlink($source), $dest);
    }

    // Simple copy for a file
    if (is_file($source)) {
        return copy($source, $dest);
    }

    // Make destination directory
    if (!is_dir($dest)) {
        mkdir($dest, $permissions);
    }

    // Loop through the folder
    $dir = dir($source);
    while (false !== $entry = $dir->read()) {
        // Skip pointers
        if ($entry == '.' || $entry == '..') {
            continue;
        }

        // Deep copy directories
        xcopy("$source/$entry", "$dest/$entry", $permissions);
    }

    // Clean up
    $dir->close();
    return true;
}

function readVersion($chemin = "./packages/login/ressources/js/app.js") {

    $lines = @file($chemin);

    $version = "0.0.0";
    foreach ($lines as $line) {

        $line = trim($line);

        if (strpos($line, '$rootScope.version') !== false) {
            $tab_line = explode("\"", $line);
            $version = trim($tab_line[1]);
        }
    }
    return $version;
}

function readConstruct($chemin, $recherche) {

    $lines = @file($chemin);

    $construct = "";
    foreach ($lines as $line) {

        $line = trim($line);

        if (strpos($line, $recherche) !== false) {
            $construct = $line;
        }
    }

    return $construct;
}

function readLineVersion($chemin = './packages/login/ressources/js/app.js') {
    $lines = @file($chemin);
    $sortie = "";
    foreach ($lines as $line) {

        $line = trim($line);

        if (strpos($line, '$rootScope.version') !== false) {
            $sortie = $line;
        }
    }
    return $sortie;
}

function replaceVersion() {
    $data = file('./packages/login/ressources/js/app.js'); // reads an array of lines

    $version_old = readLineVersion();
    $version_new = readLineVersion("../../deposit/raptor/packages/login/ressources/js/app.js");

    //read the entire string
    $str = file_get_contents('./packages/login/ressources/js/app.js');

    //replace something in the file string - this is a VERY simple example
    $str = str_replace($version_old, $version_new, $str);

    //write the entire string
    file_put_contents('./packages/login/ressources/js/app.js', $str);
}

function replaceFichiers() {
    $dir = '../../deposit/raptor/';
    $files1 = scandir($dir);
    $dir = [];
    foreach ($files1 as $key => $value) {
        $tab_exclure = [".", "..", ".git", "packages", "nbproject", "index.php", "update.php"];
        if (!in_array(strtolower($value), $tab_exclure))
            $dir[] = $value;
    }
    return ($dir);
}

$version = readVersion();
$stat_pg = extension_loaded('pgsql') ? 'Yes' : 'No';

$conn = null;
if ($stat_pg == "Yes")
    $conn = pg_connect($connStr);
echo "\n";
echo "\n";
echo " Test service Postgres : " . $stat_pg . "\n";
echo "\n";
echo "\n";
echo(" ***********************************************************\n");
echo(" ************ Interface d'installation RAPTOR **************\n");
echo(" ***********************************************************\n");
echo("\n");
echo(" Bienvenu sur RAPTOR " . $version . "\n");
echo("\n");
echo(" Selection installation selon choix :\n\n");
echo("  1 : Installation du .htaccess\n");
echo("  2 : Installation du complet du framework\n\n");
echo(" Choix:");
$handleChoix = fopen("php://stdin", "r");
$choix = fgets($handleChoix);
fclose($handleChoix);

switch ($choix) {
    case 1:
        echo(" \n Voulez vous proceder a la configuration du Htaccess [OUI/NON]:");

        $handle = fopen("php://stdin", "r");
        $line = fgets($handle);
        fclose($handle);

        $line = trim($line);
        if (strtolower($line) == "oui") {
            reecrireHtaccess();          //Si le fichier htaccess n'existe pas
            echo "\n";
            echo " 1 - Le fichier htaccess a ete configure.\n";
            echo "\n";
            echo "\n";
            echo(" Installation de RAPTOR " . $version . " est termine avec succes.");
            echo "\n";
        } else {
            echo("\n");
            echo " Sortie de l'application. A bientot! \n";
            echo("\n");
        }
        break;

    case 2:
        echo(" \nVoulez vous proceder a l'installation de l'application ? [OUI/NON]:");

        $handle = fopen("php://stdin", "r");
        $line = fgets($handle);
        fclose($handle);

        $line = trim($line);

        if (strtolower($line) == "oui") {
            echo("\n");
            echo " Veuillez saisir le nom de la base a creer:";
            $handle = fopen("php://stdin", "r");
            $line = fgets($handle);
            fclose($handle);

            // Create database
            $sql = "CREATE DATABASE $line";
            try {

                $result = pg_query($conn, $sql);
                echo("\n");
                echo " 1 - La base de donnee a ete cree.\n";

                //MODIFICATION DES PARAMMETRES DE CONNEXION
                //Pour connexion.php
                $config_base = readConstruct("./config/connexion.php", "__construct");
                $tab_config_base = explode("\"", $config_base);
                $tab_config_base[3] = trim($line);
                $config_base_new = implode("\"", $tab_config_base);

                //Lire fichier
                $str = file_get_contents('./config/connexion.php');

                //Replace something in the file string - this is a VERY simple example
                $str = str_replace($config_base, $config_base_new, $str);

                //write the entire string
                file_put_contents('./config/connexion.php', $str);

                //Pour connexionPDO.php
                $config_base = readConstruct("./config/connexionPDO.php", "__construct");
                $tab_config_base = explode("\"", $config_base);
                $tab_config_base[3] = trim($line);
                $config_base_new = implode("\"", $tab_config_base);

                //Lire fichier
                $str = file_get_contents('./config/connexionPDO.php');

                //Replace something in the file string - this is a VERY simple example
                $str = str_replace($config_base, $config_base_new, $str);

                //write the entire string
                file_put_contents('./config/connexionPDO.php', $str);

                //Fin modification des parammètres de connexion
                echo " 2 - Les modifications des fichiers configurations ont ete apportees\n";

                //CREATION DES TABLES
                include_once './config/connexion.php';
                $postgres = new connexion();
                $conn = $postgres->connect();

                $sql_utilisateur = "" .
                        "CREATE TABLE public.utilisateur (
                            id SERIAL, 
                            matricule VARCHAR, 
                            date_create TIMESTAMP WITHOUT TIME ZONE, 
                            consulter BOOLEAN DEFAULT true, 
                            editer BOOLEAN DEFAULT false, 
                            supprimer BOOLEAN DEFAULT false, 
                            administrateur BOOLEAN DEFAULT false, 
                            ajouter BOOLEAN DEFAULT false, 
                            CONSTRAINT utilisateur_pkey PRIMARY KEY(id)
                          ) WITHOUT OIDS;";
                $postgres->insertSQL($conn, $sql_utilisateur);

                $sql_raptor = "
                                CREATE TABLE public.raptor (
                                    id SERIAL, 
                                    identifiant VARCHAR, 
                                    valeur VARCHAR, 
                                    datemodification TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
                                    ordre INTEGER DEFAULT 0,
                                    CONSTRAINT raptor_pkey PRIMARY KEY(id)
                                 ) WITHOUT OIDS;";
                $postgres->insertSQL($conn, $sql_raptor);
                
                $sql_menu = "" .
                            "CREATE TABLE public.menu (
                                id SERIAL, 
                                libelle VARCHAR NOT NULL, 
                                niveau VARCHAR, 
                                url VARCHAR(255) DEFAULT '#'::character varying, 
                                variable_associer TEXT, 
                                icon TEXT DEFAULT '<i class=\"fa fa-smile-o\" aria-hidden=\"true\"></i>'::text, 
                                CONSTRAINT menu_pkey PRIMARY KEY(id)
                              ) WITHOUT OIDS;

                            COMMENT ON COLUMN public.menu.niveau
                            IS 'Si il y a sous menu ou sous sous menu , 1-1 (le 1 apres le ''-'' veut dire qu''il est enfant numéro 1 et le 1 avant ''-'' veut dire qu''il apparente au menu 1';

                            COMMENT ON COLUMN public.menu.variable_associer
                            IS 'exemple : jeSuisAdmin|jeSuisSuperviseur
                            Ici jeSuisAdmin et jeSuisSuperviseur sont des variables boolean';

                            COMMENT ON COLUMN public.menu.icon
                            IS 'Font awesome';";
                $postgres->insertSQL($conn, $sql_menu);

                $sql_page_par_defaut = "".
                                       "CREATE TABLE public.raptor_def_page (
                                            id SERIAL,
                                            variable VARCHAR(255),
                                            url VARCHAR(255),
                                            CONSTRAINT raptor_def_page_pkey PRIMARY KEY(id)
                                          ) 
                                          WITH (oids = false);";
                $postgres->insertSQL($conn, $sql_page_par_defaut);
                
                //IMPORTATION DES DONNEES
                $sql_ajout_menu = "" .
                        "INSERT 
                                INTO public.menu (\"libelle\", \"niveau\", \"url\", \"variable_associer\", \"icon\")
                        VALUES 
                                (E'Administration', E'5', E'./utilisateur', E'showAdministrateur', E'<i class=\"fa fa-user-md\" aria-hidden=\"true\"></i> '),
                                (E'Graphique', E'4', E'./graphique', E'', E'<i class=\"fa fa-line-chart\" aria-hidden=\"true\"></i> '),
                                (E'Génération de template', E'3', E'./r-generation', E'showAdministrateur', E'<i class=\"fa fa-paint-brush\" aria-hidden=\"true\"></i> '),
                                (E'Gestion menu & variables', E'2', E'./r-config', E'', E'<i class=\"fa fa-gears\" aria-hidden=\"true\"></i> '),
                                (E'Erreur 404', E'1-2', E'./404', E'', E'<i class=\"fa fa-smile-o\" aria-hidden=\"true\"></i>'),
                                (E'Vérification 1', E'1-1', E'./verif/1', E'', E''),
                                (E'Vérification 0', E'1-0', E'./verif/0', E'', E''),
                                (E'Tableau avec sous menu', E'1', E'./tableau', E'', E'<i class=\"fa fa-table\" aria-hidden=\"true\"></i> '),
                                (E'Accueil', E'0', E'./', E'', E'<i class=\"fa fa-home\" aria-hidden=\"true\"></i> ');";
                $postgres->insertSQL($conn, $sql_ajout_menu);

                $string_mot_de_passe = generateRandomString();  //Création de mot de passe de 10 caractères
                
                $sql_ajout_raptor =  "INSERT 
                                            INTO public.raptor (identifiant, valeur,ordre)
                                      VALUES 
                                            (E'titre', E'Projet Raptor',1),
                                            (E'nom_projet', E'Raptor',2),
                                            (E'notification', E'http://192.168.12.248/sendmail/',3),
                                            (E'super_administrateur', E'$string_mot_de_passe',3);";
                
                $postgres->insertSQL($conn, $sql_ajout_raptor);
                
                $sql_ajout_page = "insert 
                                        into raptor_def_page (variable,url) 
                                  values 
                                        ('','./'),
                                        ('showAdministrateur','./r-config');";
                $postgres->insertSQL($conn, $sql_ajout_page);
                
                //Fin modification des parammètres de connexion
                echo " 3 - Les tables ainsi que les donnees ont ete apportees\n";
                reecrireHtaccess();          //Si le fichier htaccess n'existe pas
                echo " 4 - Le fichier htaccess a ete configure.\n";
                echo "\n";
                echo(" Veuillez saisir le(s) matricule(s) de l'administrateur. Separer par point virgule ';' si plusieurs :");
                $handle = fopen("php://stdin", "r");
                $list_matricule = fgets($handle);
                fclose($handle);

                //AJOUT DES ADMINISTRATEURS
                $tab_matricule = explode(";", $list_matricule);
                foreach ($tab_matricule as $key => $value) {
                    $sql_ajout_utilisateur = 'INSERT INTO public.utilisateur ("matricule", "date_create", "consulter", "editer", "supprimer", "administrateur", "ajouter")
                                      VALUES (\'' . trim($value) . '\', now(), True, True, True, True, True);';
                    $postgres->insertSQL($conn, $sql_ajout_utilisateur);
                }

                echo "\n";
                echo(" Installation de RAPTOR " . $version . " est termine avec succes.");
                echo "\n";
                echo "\n";
            } catch (Exception $exc) {
                echo("\n");
                echo " La base de donnee existe deja! \n";
                echo("\n");
            }
        } else {
            echo("\n");
            echo " Sortie de l'application. A bientot! \n";
            echo("\n");
        }
        break;

    default:
        echo("\n");
        echo " Sortie de l'application. A bientot! \n";
        echo("\n");
        break;
}

//Function

function reecrireHtaccess() {   //Permet de créer le fichier htaccess selon le projet
    $str_fille = dirname(__FILE__);
    $nom_dossier_projet = basename($str_fille);
    $monfichier = NULL;
//    if (!file_exists($nom_dossier_projet.'.htaccess')) {
    try {
        if (file_exists(dirname(__FILE__) . "/.htaccess")) {
            unlink(".htaccess");
        }
    } catch (Exception $ex) {
        
    }


    $monfichier = fopen('.htaccess', 'a');
    $str = 'RewriteEngine On' . "\r\n";
    fwrite($monfichier, $str);
    $str = 'RewriteCond %{REQUEST_FILENAME} !-f' . "\r\n";
    fwrite($monfichier, $str);
    $str = 'RewriteCond %{REQUEST_FILENAME} !-d' . "\r\n";
    fwrite($monfichier, $str);
    $str = 'RewriteRule ^(.*)$ /'.$nom_dossier_projet.'/#/$1 [L]' . "\r\n";
    fwrite($monfichier, $str);
    fclose($monfichier);

}

//Création de mot de passe super utilisateur par défaut
function generateRandomString($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

?>