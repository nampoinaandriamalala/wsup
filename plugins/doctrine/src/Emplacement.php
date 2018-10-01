<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of emplacement
 *
 * @author OS
 */

/**
 * @Entity
 * @Table (name="emplacement")
 * */
class Emplacement {
    //put your code here
    
    /**
     * @Id
     * @Column(type="integer") @GeneratedValue
     * */
    private $id_emplacement;
    
    
    /**
     * @Column(type="string")
     */
    private $siege;
    
    /**
     * @Column(type="string")
     */
    private $batiment;
    
    /**
     * @Column(type="string")
     */
    private $lettre;
    
    /**
     * @Column(type="integer")
     */
    private $numero;
    
    /**
     * @Column(type="integer")
     */
    private $id_pc;
    
    /**
     * @Column(type="string")
     */
    private $possesseur;
    
    function getId_emplacement() {
        return $this->id_emplacement;
    }

    function getSiege() {
        return $this->siege;
    }

    function getBatiment() {
        return $this->batiment;
    }

    function getLettre() {
        return $this->lettre;
    }

    function getNumero() {
        return $this->numero;
    }

    function getId_pc() {
        return $this->id_pc;
    }

    function getPossesseur() {
        return $this->possesseur;
    }

    function setId_emplacement($id_emplacement) {
        $this->id_emplacement = $id_emplacement;
    }

    function setSiege($siege) {
        $this->siege = $siege;
    }

    function setBatiment($batiment) {
        $this->batiment = $batiment;
    }

    function setLettre($lettre) {
        $this->lettre = $lettre;
    }

    function setNumero($numero) {
        $this->numero = $numero;
    }

    function setId_pc($id_pc) {
        $this->id_pc = $id_pc;
    }

    function setPossesseur($possesseur) {
        $this->possesseur = $possesseur;
    }


}
