<?php

curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
ini_set('display_startup_errors', 1);
ini_set('display_errors', 1);

error_reporting(-1);
require_once ('mercadopago.php');
require_once ('mercadopago_config.php');

$mp = new MP ($client_id, $client_secret);

$preference_data = array (
    "items" => array (
        array (
            "title" => "Donacion",
            "quantity" => 1,
            "currency_id" => "ARS",
            "unit_price" => (int)$_GET['amount']
        )
    )
);

$preference = $mp->create_preference($preference_data);

return $preference;

?>
