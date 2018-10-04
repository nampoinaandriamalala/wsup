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
     * @Column(type="string", nullable=true)
     */
    private $id_bloc_svg;
    

    
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

    function getNiveau() {
        return $this->niveau;
    }

    function getId_bloc_svg() {
        return $this->id_bloc_svg;
    }

    function setNiveau($niveau) {
        $this->niveau = $niveau;
    }

    function setId_bloc_svg($id_bloc_svg) {
        $this->id_bloc_svg = $id_bloc_svg;
    }



}
