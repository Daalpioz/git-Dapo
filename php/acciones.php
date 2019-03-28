<?php
session_start();
header('Content-type: application/json; charset=utf-8');
// Conectando, seleccionando la base de datos
$link = mysql_connect('localhost', 'avantikads_vapm2', 'vapiano1234')
    or die('No se pudo conectar: ' . mysql_error());

mysql_select_db('avantikads_vapianomx2') or die('No se pudo seleccionar la base de datos');

switch ($_REQUEST['opcion']) {
	case 'login':
		$query = "SELECT count(*) AS Total FROM usuariosDAPO WHERE correo = '".$_REQUEST['email']."' AND  pass = '".$_REQUEST['pswd']."' AND activo = 1";
		$result = mysql_query($query) or die('Consulta fallida: ' . mysql_error());
		$respuesta = mysql_fetch_array($result) or die(mysql_error());
		if($respuesta['Total']!=0){
			$query = "SELECT * FROM usuariosDAPO WHERE correo = '".$_REQUEST['email']."' AND  pass = '".$_REQUEST['pswd']."' AND activo = 1";
			$result = mysql_query($query) or die('Consulta fallida: ' . mysql_error());
			$respuesta = mysql_fetch_array($result) or die(mysql_error());
			$_SESSION["START"] = $respuesta;
			echo json_encode($respuesta);
		}else{
			echo json_encode("error");
		}
		break;

	case 'proveedor':
		$query = "SELECT * FROM usuariosDAPO WHERE activo = 1";
		$result = mysql_query($query) or die('Consulta fallida: ' . mysql_error());
		//$respuesta = mysql_fetch_array($result);
		$arreglo = array();
		while ($fila = mysql_fetch_array($result)) {
   			array_push($arreglo, $fila);
		}
		echo json_encode($arreglo);
		break;

	case 'revisaSesion':
		if (isset($_SESSION["START"])) {
    		echo json_encode($_SESSION["START"]);
		}else{
			echo json_encode("error");
		}
		break;

	default:
		# code...
		break;
}

// Cerrar la conexión
mysql_close($link);

?>