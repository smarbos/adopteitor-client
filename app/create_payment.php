<?php

require_once ('mercadopago.php');
require_once ('mercadopago_config.php');

$mp = new MP ($client_id, $client_secret);

$preference_data = array (
    "items" => array (
        array (
            "title" => "Donacion",
            "quantity" => 1,
            "currency_id" => "ARS",
            "unit_price" => 100
        )
    )
);

$preference = $mp->create_preference($preference_data);

print_r ($preference);

?>
