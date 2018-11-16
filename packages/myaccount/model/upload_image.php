
   <?php
   
   $identifiant=$_COOKIE['login']; //"40008"
   $id= str_replace('"', "", $identifiant);
    $file=$_FILES['file'];
    echo $id;
    if (isset($file)) {
      $temp = explode(".", $_FILES["file"]["name"]);
      
      $newfilename =$id.".jpg";
      move_uploaded_file($_FILES['file']['tmp_name'], '../../../ressources/images/profil/' . $newfilename);
      $sortie=$newfilename;
      echo json_encode($sortie);
    }

    ?>
