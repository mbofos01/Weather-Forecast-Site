<?php


function enter_data($username, $address,$region,$city,$country){
    $conn = mysqli_connect("database.hostname", "database.username",
    "database.password") or http_response_code(500);
    
    echo "Connected succesfully<br/>";
    echo time() . "<br/>";
    
    mysqli_select_db($conn , "database.name") or die ("db will not open" .
    mysqli_error($conn));
    echo "Entered Table<br/>";
    $date = time();
    $sql = "INSERT INTO requests (username, timestamp, address, region, city, country)
    VALUES ('$username', '$date', '$address', '$region','$city','$country')";
    
    if ($conn->query($sql) === TRUE) {
      echo "New record created successfully";
    } else {
      echo "Error: " . $sql . "<br>" . $conn->error;
    }
    
    $conn->close();
    http_response_code(200);
}


function get_last($how_many,$username){
  $conn = mysqli_connect("database.hostname", "database.username",
  "database.password") or http_response_code(500);
  
  mysqli_select_db($conn , "database.name") or die ("db will not open" .
  mysqli_error($conn));
  $query = "SELECT * FROM requests WHERE username='$username'";
  $result = mysqli_query($conn, $query) or die("Invalid query");
  $num = mysqli_num_rows($result);
  $start = $num - $how_many;
  $last_five = array($how_many);
  for($i= 0; $i<$num; $i++) {
   $row = mysqli_fetch_row($result);
   if( $i >= $start){
      array_push($last_five,$row);
   }
  
  }
  $conn->close();
  http_response_code(201);
  echo json_encode($last_five,true);
  
}
  // Check if POST request was received.
  if(strcasecmp($_SERVER['REQUEST_METHOD'], 'POST') == 0) {
    $json = trim(file_get_contents("php://input"));
    $data = json_decode($json);
    $username = $data->username;
    $address =  $data->address;
    $region = $data->region;
    $city = $data->city;
    $country = $data->country;

    if(empty($username) || empty($address) || empty($region) || empty($city) || empty($country) ){
      http_response_code(400);
    }
    else{
      if($username != 'mbofos01')
        http_response_code(400);
      else
        enter_data($username,$address ,$region,$city,$country);

    }

  }
  // Check if GET request was received.
  if(strcasecmp($_SERVER['REQUEST_METHOD'], 'GET') == 0) {
    $how_many = $_GET['how_many'];
    $username = $_GET['username'];

    if(empty($how_many) || empty($username)){
      http_response_code(400);
    }
    else{
      get_last($how_many,$username);
    }
  }

?>