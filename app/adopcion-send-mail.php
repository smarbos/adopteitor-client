<?php
require_once 'bower_components/PHPMailer/PHPMailerAutoload.php';
require_once 'config.php';
 if (isset($_POST['nombre'])) {

    if (empty($_POST['nombre'])) {
        $data = array('success' => false, 'message' => 'Por favor, completa correctamente el formulario.');
        exit;
    }

    //create an instance of PHPMailer
    $mail = new PHPMailer();

$mail->IsSMTP(); // telling the class to use SMTP
$mail->Host       = "mail.moravitali.com.ar"; // SMTP server
$mail->SMTPDebug  = 0;                     // enables SMTP debug information (for testing)
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
$mail->Host       = "mail.moravitali.com.ar"; // sets the SMTP server
$mail->Port       = 25;                    // set the SMTP port for the GMAIL server
$mail->Username   = "hola@moravitali.com.ar"; // SMTP account username
$mail->Password   = $master_piece;        // SMTP account password

    $mail->From = $mail->Username;
	//$mail->From = $_POST['inputEmail'];
    $mail->FromName = "notificaciones@adopteitor.com.ar";
	//$mail->FromName = $_POST['inputName'];
    $mail->AddAddress('smarbos@gmail.com'); //recipient
    $mail->Subject = "Nuevo formulario de adopcion";

    $mail->Body = "
        <h1>Nuevo formulario de adopcion</h1><br/>
        <br/>
        <h2><strong>Solicitud: </strong></h2> <a href=\"http://www.adopteitor.local:8080/Animal/" . $_POST['animal_id'] . "\">Galgo ID: N° 000[" . $_POST['animal_id'] . "]</a><br/>
        <br/>
        <h2>Datos del postulante: </h2><br/>
        <p><strong>Nombre: </strong>".  $_POST['nombre'] ."</p>
        <p><strong>Apellido: </strong>".  $_POST['apellido'] ."</p>
        <p><strong>Telefono: </strong>".  $_POST['telefono'] ."</p>
        <p><strong>Email: </strong>".  $_POST['email'] ."</p>
        <p><strong>Fecha de nacimiento: </strong>".  $_POST['fecha_nacimiento'] ."</p>
        <p><strong>Mensaje: </strong>".  $_POST['mensaje'] ."</p>
    ";

    //  "Nombre: " . $_POST['nombre'] . "\r\n\rApellido: " . stripslashes($_POST['apellido'] . "\r\n\r\Galgo: <a href=http://www.adopteitor.local:8080/Animal/" . $_POST['galgo'] . ">a</a>" . $_POST['galgo'] . "/\r\n\r\n");
    $mail->IsHTML(true);
    if (isset($_POST['ref'])) {
        $mail->Body .= "\r\n\r\nRef: " . $_POST['email'];
    }

    if(!$mail->send()) {
        $data = array('success' => false, 'message' => 'El mensaje no pudo ser enviado. Error: ' . $mail->ErrorInfo);
        exit;
    }

    $data = array('success' => true, 'message' => 'Gracias por ponerte en contacto, te responderemos al a brevedad!');

} else {

    $data = array('success' => false, 'message' => 'Por favor, completa correctamente el formulario.');

}
echo json_encode($data);
