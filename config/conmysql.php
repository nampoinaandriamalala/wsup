<?php

class conmysql {

    //public $conn;
    public $conn;
    public $host;
    public $dbname;
    public $user;
    public $password;

    function __construct($host = "192.168.2.220", $dbname = "glpi", $user = "dev", $password = "passdev") {
        $this->host = $host;
        $this->dbname = $dbname;
        $this->user = $user;
        $this->password = $password;
    }

    public function connect() {

        $host = $this->host;
        $dbname = $this->dbname;
        $user = $this->user;
        $password = $this->password;

        //Simple connexion
        $conn = mysqli_connect($host, $user, $password, $dbname);
        return $conn;
    }

    public function getSQL($conn, $sql, $assoc=false) {
        $result = mysqli_query($conn, $sql);
        $d = array();
        if ($assoc) {
            while ($alldata = mysqli_fetch_assoc($result))
                array_push($d, $alldata);
            return $d;
        } else {
            while ($alldata = mysqli_fetch_object($result))
               array_push($d, $alldata);
            return $d;
        }

    }
    
    //besoin de retourner Id
    public function insertSQL($conn, $sql) {
        $result = mysqli_query($conn, $sql);
        if ($result) {
            return mysqli_fetch_all($result);
        } else {
            return mysqli_fetch_all($result);
        }
    }
    //updateSQL à besoin de retourner Id "RETURNS id"
    public function updateSQL($conn, $sql) {
        $result = mysqli_query($conn, $sql);
        if ($result) {
            return mysqli_fetch_all($result);
        } else {
            return mysqli_fetch_all($result);
        }
    }

    public function deleteSQL($conn, $sql) {
        $result = mysqli_query($conn, $sql);
    }

}

?>