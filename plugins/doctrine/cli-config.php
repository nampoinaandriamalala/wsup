<?php
// cli-config.php
require_once "./vendor/symfony/polyfill-mbstring/bootstrap.php";


require_once (dirname(__FILE__).'./vendor/autoload.php');

use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;

// the connection configuration
$dbParams = array(
    'driver'   => 'pdo_pgsql',
    'user'     => 'postgres',
    'password' => 'postgres',
    'host'   => '192.168.4.239',
    'dbname'   => 'draptor',
);

$paths = array("src"); //Dossier des entity
$isDevMode = true;

$config = Setup::createAnnotationMetadataConfiguration($paths, $isDevMode);
$entityManager = EntityManager::create($dbParams, $config);

return \Doctrine\ORM\Tools\Console\ConsoleRunner::createHelperSet($entityManager);
