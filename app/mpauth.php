<?php
require_once ('mercadopago_config.php');
require_once ('mercadopago.php');

$mp = new MP ($client_id, $client_secret);

$access_token = $mp->get_access_token();

die($access_token);
?>
