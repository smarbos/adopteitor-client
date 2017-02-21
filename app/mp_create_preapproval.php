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
$end_time->add(new DateInterval('P' . 100 . 'Y'));
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

$object = [
    "email" => $preapprovalPayment['response']['payer_email'],
    "status" => $preapprovalPayment['response']['status'],
    "external_reference" => $preapprovalPayment['response']['external_reference'],
    "transaction_amount" => $_GET['monto']
];

$url = $current_domain+'/Subscripcion/';

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
           die(var_dump($head, $httpCode));

die(json_encode($preapprovalPayment));
?>
