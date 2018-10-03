<?php

/**
 * @Entity
 * @Table (name="emplacement")
 * */
class Emplacement {    
    /**
     * @Id
     * @Column(type="integer") @GeneratedValue
     * */
    private $id_emplacement;    
    
    /**
     * @Column(type="string" , nullable=true)
     */
    private $siege;
    
     /**
     * @Column(type="string", nullable=true)
     */
    private $niveau;
    
    /**
     * @Column(type="string", nullable=true)
     */
    private $batiment;
    
    /**
     * @Column(type="string", nullable=true)
     */
    private $lettre;
    
    /**
     * @Column(type="integer")
     */
    private $numero;
    
    /**
     * @Column(type="integer", nullable=true)
     */
    private $id_pc;
    

    
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

}
