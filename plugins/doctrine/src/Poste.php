<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Poste
 *
 * @author OS
 */

/**
 * @Entity
 * @Table (name="poste")
 * */
class Poste {
    
    /**
     * @Id
     * @Column(type="integer") @GeneratedValue
     * */
    private $id;
    
     /**
     * @Column(type="string")
     */
    private $id_pc;
    
     /**
     * @Column(type="string")
     */
    private $ip;
    
     /**
     * @Column(type="boolean")
     */
    private $etat;
    
    function getId() {
        return $this->id;
    }

    function getId_pc() {
        return $this->id_pc;
    }

    function getIp() {
        return $this->ip;
    }

    function getEtat() {
        return $this->etat;
    }

    function setId($id) {
        $this->id = $id;
    }

    function setId_pc($id_pc) {
        $this->id_pc = $id_pc;
    }

    function setIp($ip) {
        $this->ip = $ip;
    }

    function setEtat($etat) {
        $this->etat = $etat;
    }


}
