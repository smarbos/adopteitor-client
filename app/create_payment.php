<?php

require_once ('mercadopago.php');

$mp = new MP ("1751144349475172", "BwyDLC0352NZ6UL5LCvPgz8LNZYxAkow");

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
