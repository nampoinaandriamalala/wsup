<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

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