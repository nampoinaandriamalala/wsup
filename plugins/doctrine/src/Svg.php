<?php

/**
 * @Entity
 * @Table (name="svg")
 * */
class Svg {
    //put your code here
    /**
     * @Id
     * @Column(type="integer") @GeneratedValue
     * */
    private $id;
    
    /**
     * @Column(type="string")
     */
    private $nom_bloc;
    
    /**
     * @Column(type="integer")
     */
    private $poste_supporte;
    
    /**
     * @Column(type="string")
     */
    private $id_pc;
    
    /**
     * @Column(type="string")
     */
    private $id_poste;
    
    function getId() {
        return $this->id;
    }

    function getNom_bloc() {
        return $this->nom_bloc;
    }

    function getPoste_supporte() {
        return $this->poste_supporte;
    }

    function getId_pc() {
        return $this->id_pc;
    }

    function getId_poste() {
        return $this->id_poste;
    }

    function setId($id) {
        $this->id = $id;
    }

    function setNom_bloc($nom_bloc) {
        $this->nom_bloc = $nom_bloc;
    }

    function setPoste_supporte($poste_supporte) {
        $this->poste_supporte = $poste_supporte;
    }

    function setId_pc($id_pc) {
        $this->id_pc = $id_pc;
    }

    function setId_poste($id_poste) {
        $this->id_poste = $id_poste;
    }


}
