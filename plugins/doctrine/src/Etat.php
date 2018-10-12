<?php

/**
 * @Entity
 * @Table (name="etat")
 * */
class Etat {
    /**
     * @Id
     * @Column(type="integer") @GeneratedValue
     * */
    private $id;
    
    /**
     * @Column(type="string")
     */
    private $id_poste;
    
    /**
     * @Column(type="string")
     */
    private $etat;
    
    /**
     * @Column(type="date")
     */
    private $date;
    
}
