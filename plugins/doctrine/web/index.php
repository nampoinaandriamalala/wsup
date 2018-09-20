<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*
 * https://www.doctrine-project.org/projects/doctrine-orm/en/latest/tutorials/getting-started.html
 */

require_once (dirname(__FILE__) . './../vendor/autoload.php');

use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;

$paths = array("/src"); //entity
$isDevMode = true;

// the connection configuration
$dbParams = array(
    'driver' => 'pdo_pgsql',
    'user' => 'postgres',
    'password' => 'postgres',
    'host' => '192.168.4.239',
    'dbname' => 'draptor',
);

$config = Setup::createAnnotationMetadataConfiguration($paths, $isDevMode);
$entityManager = EntityManager::create($dbParams, $config);
$conn = \Doctrine\DBAL\DriverManager::getConnection($dbParams, $config);


$product = new Product();
$product->setName("produit ");

$entityManager->persist($product);
$entityManager->flush();

echo "ID du produit est " . $product->getID()."</br>";


$productRepository = $entityManager->getRepository('Product');
$products = $productRepository->findAll();

foreach ($products as $product) {
    echo sprintf("-%s %s</br>", $product->getID(), $product->getName());
}
