<?php

require_once ('mercadopago_config.php');
require_once ('mercadopago.php');

$mp = new MP ($client_id, $client_secret);

$paymentInfo = $mp->get_payment_info($_GET["id"]);

$object = [ "content" => json_encode($paymentInfo) ];

$url = 'http://www.adoptaungalgoenargentina.com:8080/Ipn/';

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_HEADER, TRUE);
curl_setopt($ch, CURLOPT_NOBODY, TRUE); // remove body
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $object);
$head = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

die(json_encode($head));

?>
