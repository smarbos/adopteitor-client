<?php
require_once ('mercadopago_config.php');
require_once ('mercadopago.php');


$mp = new MP ($client_id, $client_secret);

$preapprovalPayment_data = array(
    "payer_email" => "my_customer@my_site.com",
    "back_url" => "http://www.adoptaungalgoenargentina.com/subscripcion-exitosa",
    "reason" => "Subscripcion mensual de Adopta un Galgo en Argentina",
    "external_reference" => "OP-1234",
    "auto_recurring" => array(
        "frequency" => 1,
        "frequency_type" => "months",
        "transaction_amount" => $_GET['monto'],
        "currency_id" => "ARS",
        "start_date" => "2017-02-16T14:58:11.778-03:00",
        "end_date" => "2018-06-10T14:58:11.778-03:00"
    )
);
$preapprovalPayment = $mp->create_preapproval_payment($preapprovalPayment_data);

die(json_encode($preapprovalPayment));
?>
