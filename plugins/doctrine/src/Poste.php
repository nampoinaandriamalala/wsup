<?php

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
    
        /**
     * @Column(type="string", nullable=true)
     */
    private $possesseur;
    
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

    function getPossesseur() {
        return $this->possesseur;
    }

    function setPossesseur($possesseur) {
        $this->possesseur = $possesseur;
    }
}
