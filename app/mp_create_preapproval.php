<?php
require_once ('mercadopago_config.php');
require_once ('mercadopago.php');

date_default_timezone_set('America/Argentina/Buenos_Aires');

$mp = new MP ($client_id, $client_secret);
$time = new DateTime;
$time->add(new DateInterval('PT' . 5 . 'M'));
$now = (string)$time->format(DateTime::ATOM);
$current_date = date('Y-m-d\TH:i:s.000P', strtotime($now));

$end_time = new DateTime;
$end_time->add(new DateInterval('P' . 1 . 'Y'));
$end_now = (string)$end_time->format(DateTime::ATOM);
$end_date = date('Y-m-d\TH:i:s.000P', strtotime($end_now));

$preapprovalPayment_data = array(
    "payer_email" => $_GET['email'],
    "back_url" => "http://www.adoptaungalgoenargentina.com/subscripcion-exitosa",
    "reason" => "Subscripcion mensual de Adopta un Galgo en Argentina",
    "external_reference" => uniqid(),
    "auto_recurring" => array(
        "frequency" => 1,
        "frequency_type" => "months",
        "transaction_amount" => $_GET['monto'],
        "currency_id" => "ARS",
        "start_date" => $current_date,
        "end_date" => $end_date
    )
);

$preapprovalPayment = $mp->create_preapproval_payment($preapprovalPayment_data);

die(json_encode($preapprovalPayment));
?>
