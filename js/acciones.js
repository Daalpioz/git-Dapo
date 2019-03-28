$(document).ready(function(){
	$.ajax({
		url: "php/acciones.php",
		data: {opcion:"revisaSesion"}, 
		success: function(result){
			console.log(result);
			if(result=="error"){

    		}else{
    			$("#screenLogin").attr("hidden","hidden");
    			$("#mensajeBienvenida").removeAttr("hidden");
    			$("#menuInicio").removeAttr("hidden");
    			$(".nombreUser").text(result['razon']);
    			
    		}
    		
		}
	});

	$( "#formLogin" ).submit(function( event ) {
		var email = $("#email").val();
		var pswd = $("#pswd").val();
  		$.ajax({
  			url: "php/acciones.php",
  			data: {opcion:"login",email:email,pswd:pswd}, 
  			beforeSend: function(){
  				$("#warningLogin").attr("hidden","hidden");
  				$("#buttonLogin").val("Entrando");
  			},
  			success: function(result){
  				if(result=="error"){
        			$("#warningLogin").removeAttr("hidden");
        		}else{
        			$("#screenLogin").attr("hidden","hidden");
        			$("#mensajeBienvenida").removeAttr("hidden");
        			$("#menuInicio").removeAttr("hidden");
        			$(".nombreUser").text(result['razon']);
        			console.log(result);
        		}
        		
    		}
    	});
  		return false;
	});
})

function proveedor(objeto){
	
	//$("#addProveedor").removeAttr("hidden")
	
	$.ajax({
  		url: "php/acciones.php",
  		data: {opcion:"proveedor"}, 
  		beforeSend: function(){
  			$("#mensajeBienvenida").attr("hidden","hidden");
  			$(".nav-item").removeClass("active")
			$(objeto).parent().addClass("active");
  		},
  		success: function(result){
  			console.log(result)
  			$("#listProveedor").removeAttr("hidden");
  			codigoHTML = "";
  			for(i=0;i<result.length;i++){
  				console.log(result[i].razon)
  				codigoHTML += "<tr>";
  				codigoHTML += "<td>"+result[i].razon+"</td>";
  				codigoHTML += "<td>"+result[i].correo+"</td>";
  				codigoHTML += "<td></td>";
  				codigoHTML += "</tr>";
  			}
  			$("#listProveedor tbody").html(codigoHTML);
  			/*if(result=="error"){
        		$("#warningLogin").removeAttr("hidden");
        	}else{
        		$("#screenLogin").attr("hidden","hidden");
        		$("#mensajeBienvenida").removeAttr("hidden");
        		$("#menuInicio").removeAttr("hidden");
        		$(".nombreUser").text(result['razon']);
        		console.log(result);
        	}*/
        		
    	}
    });
}