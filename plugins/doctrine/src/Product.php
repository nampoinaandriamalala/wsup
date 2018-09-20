<?php

/**
 * @Entity
 * @Table (name="production")
 * */
class Product {

    /**
     * @Id
     * @Column(type="integer") @GeneratedValue
     * */
    private $id;

    /**
     * @Column(type="string")
     */
    private $name;


    public function getID() {
        return $this->id;
    }
    
    public function setName($name) {
        $this->name = $name;
    }

    public function getName() {
        return $this->name;
    }

}
