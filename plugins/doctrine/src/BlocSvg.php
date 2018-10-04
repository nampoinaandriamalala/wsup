<?php

/**
 * @Entity
 * @Table (name="bloc_svg")
 * */
class BlocSvg {
    //put your code here
    /**
     * @Id
     * @Column(type="string")
     * */
    private $nom_bloc;
    
    /**
     * @Column(type="integer")
     */
    private $poste_supporte;
    

    function getNom_bloc() {
        return $this->nom_bloc;
    }

    function getPoste_supporte() {
        return $this->poste_supporte;
    }

    function setNom_bloc($nom_bloc) {
        $this->nom_bloc = $nom_bloc;
    }

    function setPoste_supporte($poste_supporte) {
        $this->poste_supporte = $poste_supporte;
    }
}
