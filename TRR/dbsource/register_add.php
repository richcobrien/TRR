<?php
	//

  $json_file_data = file_get_contents('person.json');
  $array_file_data = json_decode($json_file_data, true);

  $new_post = array(  
    'employer'   => $_POST['employer'],
    'company'    => $_POST['company'],
    'firstname'  => $_POST['firstname'],
    'lastname'   => $_POST['lastname'],
    'address'    => $_POST['address'],
    'city'       => $_POST['city'],
    'state'      => $_POST['state'],
    'zipcode'    => $_POST['zipcode'],
    'phone'      => $_POST['phone'],
    'email'      => $_POST['email'],
    'password'   => $_POST['password']
  );

  /* look for existing employer-agent company */
  foreach($array_file_data as $arr){
    if (!in_array($new_post['id'], $new)) {
      //$new[] = $new_post['company'];
      if (company) {
        /* if exists employer-agent company, update existing employer record */
        file_put_contents($array_file_data, json_encode($new_post));
      } else {
        /* else if employee then add employee to existing employer record */
        file_put_contents($array_file_data, json_encode($new_post));
      }
    } else {
      /* no employer-agent company found push-append new record */
      array_push($array_file_data, $new_post);
      $jsonData = json_encode($array_file_data);
      file_put_contents('person.json', $jsonData);
    }

  echo file_get_contents('php://input');
?>