<?php

/**
 * @Entity
 * @Table (name="historique")
 * */
class Historique {   
    /**
     * @Id
     * @Column(type="integer") @GeneratedValue
     * */
    private $id;
    
    /**
     * @Column(type="integer")
     * */
    private $id_pc;
    
    /**
     * @Column(type="integer")
     * */
    private $id_poste;
    
    /**
     * @Column(type="string")
     * */
    private $objet;
    
    /**
     * @Column(type="date")
     * */
    private $date;
    
    /**
     * @Column(type="string")
     * */
    private $commentaire;
    
    function getId() {
        return $this->id;
    }

    function getId_pc() {
        return $this->id_pc;
    }

    function getId_poste() {
        return $this->id_poste;
    }

    function getObjet() {
        return $this->objet;
    }

    function getDate() {
        return $this->date;
    }

    function getCommentaire() {
        return $this->commentaire;
    }

    function setId($id) {
        $this->id = $id;
    }

    function setId_pc($id_pc) {
        $this->id_pc = $id_pc;
    }

    function setId_poste($id_poste) {
        $this->id_poste = $id_poste;
    }

    function setObjet($objet) {
        $this->objet = $objet;
    }

    function setDate($date) {
        $this->date = $date;
    }

    function setCommentaire($commentaire) {
        $this->commentaire = $commentaire;
    }


}
