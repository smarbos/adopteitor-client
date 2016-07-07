<?php
require_once 'bower_components/PHPMailer/PHPMailerAutoload.php';
require_once 'config.php';
 if (isset($_POST['nombre']) && isset($_POST['apellido']) && isset($_POST['email']) && isset($_POST['ciudad']) && isset($_POST['telefono']) && isset($_POST['id'])) {

    //check if any of the inputs are empty
    if (empty($_POST['nombre']) || empty($_POST['apellido']) || empty($_POST['email']) || empty($_POST['ciudad']) || empty($_POST['telefono']) || empty($_POST['id'])) {
        $data = array('success' => false, 'message' => 'Please fill out the form completely.');
        echo json_encode($data);
        exit;
    }

    //create an instance of PHPMailer
    $mail = new PHPMailer();

$mail->IsSMTP(); // telling the class to use SMTP
$mail->Host       = "mail.adoptaungalgoenargentina.com"; // SMTP server
$mail->SMTPDebug  = 2;                     // enables SMTP debug information (for testing)
// 1 = errors and messages
// 2 = messages only
$mail->SMTPOptions = array(
    'ssl' => array(
        'verify_peer' => false,
        'verify_peer_name' => false,
        'allow_self_signed' => true
    )
);

$mail->SMTPAuth   = true;                  // enable SMTP authentication
$mail->Host       = "mail.adoptaungalgoenargentina.com"; // sets the SMTP server
$mail->Port       = 25;                    // set the SMTP port for the GMAIL server
$mail->Username   = "info@adoptaungalgoenargentina.com"; // SMTP account username
$mail->Password   = $master_piece;        // SMTP account password

    $mail->From = $mail->Username;
	//$mail->From = $_POST['inputEmail'];
    $mail->FromName = "info@adoptaungalgoenargentina.com";
	//$mail->FromName = $_POST['inputName'];
    $mail->AddAddress('info@adoptaungalgoenargentina.com'); //recipient
    $mail->Subject = "Nuevo formulario de adopcion";

    $mail->Body = "
        <h1>Nuevo formulario de adopcion</h1><br/>
        <br/>
        <h2><strong>Solicitud: </strong></h2> <a href=\"http://www.adoptaungalgoenargentina.com:8080/Animal/" . $_POST['id'] . "\">Galgo ID: N° 000[" . $_POST['id'] . "]</a><br/>
        <br/>
        <h2>Datos del adoptante: </h2><br/>
        <p><strong>Nombre: </strong>".  $_POST['nombre'] ."</p>
        <p><strong>Apellido: </strong>".  $_POST['apellido'] ."</p>
        <p><strong>Fecha de nacimiento: </strong>".  $_POST['fecha_nacimiento'] ."</p>
        <p><strong>Ciudad: </strong>".  $_POST['ciudad'] ."</p>
        <p><strong>Email: </strong>".  $_POST['email'] ."</p>
        <p><strong>Telefono: </strong>".  $_POST['telefono'] ."</p>
    ";

    //  "Nombre: " . $_POST['nombre'] . "\r\n\rApellido: " . stripslashes($_POST['apellido'] . "\r\n\r\Galgo: <a href=http://www.adopteitor.local:8080/Animal/" . $_POST['galgo'] . ">a</a>" . $_POST['galgo'] . "/\r\n\r\n");
    $mail->IsHTML(true);
    if (isset($_POST['ref'])) {
        $mail->Body .= "\r\n\r\nRef: " . $_POST['email'];
    }

    if(!$mail->send()) {
        $data = array('success' => false, 'message' => 'Message could not be sent. Mailer Error: ' . $mail->ErrorInfo);
        echo json_encode($data);
        exit;
    }

    $datata = array('success' => true, 'message' => 'Thanks! We have received your message.');
    echo json_encode($data);

} else {

    $data = array('success' => false, 'message' => 'Please fill out the form completely.');
    echo json_encode($data);

}
