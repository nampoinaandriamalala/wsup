<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*
 * https://www.doctrine-project.org/projects/doctrine-orm/en/latest/tutorials/getting-started.html
 */

require_once '../../../plugins/doctrine/vendor/autoload.php';

use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;

//Chemin entité , configuration base de donnée et mode developpement
include '../../../plugins/doctrine/config/configuration.php';

$config = Setup::createAnnotationMetadataConfiguration($paths, $isDevMode);
$entityManager = EntityManager::create($dbParams, $config);
$conn = \Doctrine\DBAL\DriverManager::getConnection($dbParams, $config);


$product = new Product();
$product->setName("produit ");

$entityManager->persist($product);
$entityManager->flush();

$productRepository = $entityManager->getRepository('Product');
$products = $productRepository->findAll();

$datas = [];
foreach ($products as $product) {
    $gr = array("id" => $product->getID(), "produit" => $product->getName());
    $datas[] = $gr;
}

//Affichage
echo json_encode($datas);

/*Fonction usuelle*/
function dateFRtoEN($date_fr) {
    $date = DateTime::createFromFormat('d/m/Y', $date_fr);
    return $date->format('Y-m-d');
}