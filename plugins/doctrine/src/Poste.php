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
     * @Column(type="string", nullable=true)
     */
    private $possesseur;
    
    /**
     * @Column(type="string", nullable=true)
     */
    private $id_emplacement;
    
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
    
    function getId_emplacement() {
        return $this->id_emplacement;
    }

    function setId_emplacement($id_emplacement) {
        $this->id_emplacement = $id_emplacement;
    }


}
