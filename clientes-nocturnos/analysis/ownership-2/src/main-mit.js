		

var m = {t:140, b:50, l:50, r:50}; 
var w = $("#grafico").width(), h=600;
var width = w+m.l*2;
var height = h-m.b*2;


	
	var svg = d3.select("#grafico").append("svg")      
		.attr("width", width )
		.attr("height", h + m.b + m.t)
		.style("background", "" )
		.append("g")
		.attr("transform", "translate( "+ m.l +" , "+ m.t + ")");
		
		
	var datosfases = [{"usuarios":20319,"fase":"Bienvenida","lost":35,"err1":0,"err2":0,"a":11499},{"usuarios":8820,"fase":"Datos de Acceso","lost":828,"err1":0.17,"err2":0.3,"a":4334},{"usuarios":4486,"fase":"Datos Personales","lost":2400,"err1":9.39,"err2":19.1,"a":2875},{"usuarios":1611,"fase":"Datos Fiscales","lost":318,"err1":35.89,"err2":56,"a":155},{"usuarios":1456,"fase":"Documentación","lost":118,"err1":17.61,"err2":27.48,"a":555},{"usuarios":901,"fase":"Confirmación","lost":0,"err1":1.99,"err2":20.65,"a":794},{"usuarios":107,"fase":"Finalizan","lost":0,"err1":8.57,"err2":89.03,"a":0}];

		
		

	console.log(datosfases);
var usumap = datosfases.map(function(d) {return d.usuarios;});
	console.log(usumap);
//var usuEsc = d3.scale.linear().range([10,100]).domain([0,20319]);
var usuEsc = function(x) {return x/20319*200+5;};

	
	var main = svg.append("g");
	
	
	function generarAcumulador() {
		var acumulador = 50;
		return function(d,i) {
			var ancho = usuEsc(Math.max(d.usuarios,d.lost,d.a));
			var acumulador_old = acumulador;
			acumulador += ancho;
			
			return acumulador_old + 10*i;
		};
	}
	
	function generarAcumulador2() {
		var acumulador = 0;
		return function(d,i) {
			var ancho = usuEsc(Math.max(d.usuarios,d.lost,d.a));
			var acumulador_old = acumulador;
			 acumulador += ancho;
			
			return acumulador_old + 40*i;
		};
	}
	
	function generarAcumulador3() {
		var acumulador = 0;
		return function(d,i) {
			var ancho = usuEsc(Math.max(d.usuarios,d.lost,d.a));
			var acumulador_old = acumulador;
			 acumulador += ancho;

			var val =  acumulador_old+10*i;
			return "translate("+(val+60)+",0) rotate(-90)";
		};
	}

	
	
	function doTooltip(d)
    {

		var faseSeleccionada = d.fase;
		var bolititasRelevantes = d3.selectAll("#bolitititas").filter(function(e) { return e.fase2 == faseSeleccionada; });
		var bolititasIrelevantes = d3.selectAll("#bolitititas").filter(function(e) { return e.fase2 != faseSeleccionada; });


		var erroresRelevantes = window.errores.filter(function(e) {return e.fase2 == faseSeleccionada;});


		var htmlErrores = erroresRelevantes.map(function(d) {

			return '<span style="color: #fdbd2c; font-size:50%">'+d.error+'</span><br/>' + '<span style="color: #fdbd2cfont-size:60%">'+d.errorLlegan+'% - '+d.errorPerder+'%</span>'+'<hr>';
		});

		htmlErrores = htmlErrores.join("");


      d3.select("#texto").html(
			  '<strong>'+d.fase+'</strong><br>'+
			  '<span style="color: #b5e5f9"> '+ '<span >'+d.usuarios+'</strong></span>' + '<hr>' +
			  '<span style="color: #c8175e; font-weight:900">'+ d.a+'</span>'+'<hr>' +
			  '<span style="color: #fdbd2c">'+d.lost+'</span>'+'<hr>' +
	  htmlErrores)
			  .style("fill", "white");
    }

	function cleanTooltip(d) {
		 d3.select("#texto").html("");
	}
	
	
	//tooltip
	function doTooltipazul(d) 
    {
      d3.select("#texto").html('<strong>'+d.fase+'</strong><br><span style="color: #b5e5f9">'+d.usuarios+'</span>' + '<hr>' + '<span style="color: white">'+d.a+'</span>' + '<hr>' + '<span style="color: white">'+d.lost+'</span>' ).style("fill", "white");
    }
	function doTooltiprosa(d) 
    {
      d3.select("#texto").html('<strong>'+d.fase+'</strong><br><span style="color: white">'+d.usuarios+'</span>' +'<hr>' + '<span style="color: #c8175e">'+d.a+' (56,6%)</span>'+ '<hr>' + '<span style="color: white">'+d.lost+'</span>' ).style("fill", "white");
    }
	function doTooltipamarillo(d) 
    {
      d3.select("#texto").html('<strong>'+d.fase+'</strong><br><span style="color: white">'+d.usuarios+'</span>' + '<hr>' + '<span style="color: white">'+d.lost+'</span>'+'<hr>' + '<span style="color: #fdbd2c">'+d.a+'</span>').style("fill", "white");
    }   
//QUITAR
function cleanTooltipazul(d) 
    {
        d3.select("#texto").html("");
    }

	function cleanTooltiprosa(d) 
    {
        d3.select("#texto").html("");
    }
	function cleanTooltipamarillo(d) 
    {
        d3.select("#texto").html("");
    }
	
	function filtrarBolitas(d){
		
		var faseSeleccionada = d.fase;
		var bolititasRelevantes = d3.selectAll("#bolitititas").filter(function(e) { return e.fase2 == faseSeleccionada; });
		var bolititasIrelevantes = d3.selectAll("#bolitititas").filter(function(e) { return e.fase2 != faseSeleccionada; });
		
		bolititasRelevantes.transition().duration(350).attr("opacity", 1);
		bolititasIrelevantes.transition().duration(350).attr("opacity",0.3);

		// Destacamos cuadrados
		var cuadrados = d3.selectAll((window.usuariosCub[0]).concat(window.aCub[0]).concat(window.errorCub[0]));
		var cuadradosRestantes = cuadrados.filter(function(e) { return e.fase != faseSeleccionada; });
		var cuadradoElegido = cuadrados.filter(function(e) { return e.fase == faseSeleccionada; });


  cuadradosRestantes
      //.attr("filter", "url(#blur)")
		  .attr("opacity", 0.3);

		console.log(window.errores);}
	
		function desactivarBolitas(d){


			var faseSeleccionada = d.fase;
		var bolititasRelevantes = d3.selectAll("#bolitititas").filter(function(e) { return e.fase2 == faseSeleccionada; });
		var bolititasIrelevantes = d3.selectAll("#bolitititas").filter(function(e) { return e.fase2 != faseSeleccionada; });
		
		d3.selectAll("#bolitititas").transition().duration(350).attr("opacity", 1);


		// Destacamos cuadrados
		var cuadrados = d3.selectAll((window.usuariosCub[0]).concat(window.aCub[0]).concat(window.errorCub[0]));
		var cuadradosRestantes = cuadrados.filter(function(e) { return e.fase != faseSeleccionada; });
		var cuadradoElegido = cuadrados.filter(function(e) { return e.fase == faseSeleccionada; });

			  cuadradosRestantes
      //.attr("filter", "")
					  .attr("opacity",1);
		
	}

	window.usuariosCub = 			main.selectAll(".gdgd").data(datosfases).enter().append("rect")
	.attr("x", -200)
		.attr("y", 20)
		.attr("width", function(d) {
			return ((usuEsc(d.usuarios)));
		})
	.attr("height", function(d) {return ((usuEsc(d.usuarios)));})
		.attr("opacity", 0)
		.attr("fill", "#b5e5f9")
	.on("mouseover", function(d) {
		doTooltip(d);
		filtrarBolitas(d);
	})
	.on("mouseout", function(d) {
		desactivarBolitas(d);
		return cleanTooltip(d);
	})
	.transition()
	.duration(function (d, i) {
      return i*600;
    })
		.attr("x", generarAcumulador())
		.attr("y", 20)
		.attr("width", function(d) {
			return ((usuEsc(d.usuarios)));
		})
	.attr("height", function(d) {return ((usuEsc(d.usuarios)));})
		.attr("opacity", 1)
		.attr("fill", "#b5e5f9")
	

	;

var textoUsu = main.selectAll(".textusu").data(datosfases).enter().append("text")
	.attr("x",0)
		.attr("y",0)
		.text(function(d) {return d.fase;})
		.attr("transform",generarAcumulador3())
		;

	
	window.aCub = 			main.selectAll(".gdhhd").data(datosfases).enter().append("rect")
	.attr("x", -200)
		.attr("y", 20)
		.attr("width",function(d) {
			return ((usuEsc(d.a)));})
	.attr("height",function(d) {return ((usuEsc(d.a)));})
		.attr("opacity", 0)
		.attr("fill", "#b5e5f9")
	.on("mouseover", function(d) {
		filtrarBolitas(d);
		return doTooltip(d);
	})
	.on("mouseout", function(d) {
		desactivarBolitas(d);
		return cleanTooltip(d);
	})
	.transition()
	.delay(5000)
	.duration(function (d, i) {
      return i*600;
    })
		.attr("x", generarAcumulador())
		.attr("y", 20)
		.attr("width", function(d) {
			return ((usuEsc(d.a)));})
	.attr("height", function(d) {return ((usuEsc(d.a)));})
	.attr("fill", "#c8175e")
		.attr("opacity", 1)
	
;
	
	window.errorCub = 			main.selectAll(".gdhhd").data(datosfases).enter().append("rect")
	.attr("x", -200)
		.attr("y", 20)
		.attr("width", 0)
	.attr("height", 0)
		.attr("opacity", 0)
		.attr("fill", "#b5e5f9")
	.on("mouseover", function(d) {
		filtrarBolitas(d);
		return doTooltip(d);
	})
	.on("mouseout", function(d) 
		
		{
		desactivarBolitas(d);
		return cleanTooltip(d);
	})
	.transition()
	.delay(9000)
	.duration(function (d, i) {
      return i*600;
    })
		.attr("x", generarAcumulador())
		.attr("y", 20)
		.attr("width", function(d) {
			return ((usuEsc(d.lost)));})
	.attr("height", function(d) {return ((usuEsc(d.lost)));})
	.attr("fill", "#fdbd2c")
		.attr("opacity", 1)
		
	;
	
	var fase = 			main.selectAll(".gdhhd").data(datosfases).enter().append("rect")
	.attr("x", generarAcumulador())
		.attr("y", 7)
		.attr("fill", "#b5e5f9")
		.attr("width", function(d) {
			return ((usuEsc(d.usuarios)));})
	.attr("height", 1);
	
		
	var datoserrores = [{"fase1":"Datos de Acceso","lost":35,"err1":6,"err2":11,"errorLlegan":0.17,"errorPerder":0.3,"fase2":"Bienvenida","error":"Error inesperado"},{"fase1":"Datos Personales","lost":828,"err1":7775,"err2":15815,"errorLlegan":9.39,"errorPerder":19.1,"fase2":"Datos de Acceso","error":"Error clave SMS"},{"fase1":"Datos Fiscales","lost":1610,"err1":57783,"err2":90160,"errorLlegan":35.89,"errorPerder":56,"fase2":"Datos Personales","error":"Usuario incorrecto"},{"fase1":"Datos Fiscales","lost":790,"err1":13912,"err2":21709,"errorLlegan":17.61,"errorPerder":27.48,"fase2":"Datos Personales","error":"Error validando los datos del usuario"},{"fase1":"Documentación","lost":32,"err1":64,"err2":661,"errorLlegan":1.99,"errorPerder":20.65,"fase2":"Datos Fiscales","error":"Por favor. seleccione un valor"},{"fase1":"Documentación","lost":138,"err1":1183,"err2":12286,"errorLlegan":8.57,"errorPerder":89.03,"fase2":"Datos Fiscales","error":"Por favor. seleccione un valor"},{"fase1":"Documentación","lost":148,"err1":1360,"err2":14131,"errorLlegan":9.19,"errorPerder":95.48,"fase2":"Datos Fiscales","error":"Esta entidad no se encuentra en el sistema de indentificación"},{"fase1":"Confirmación","lost":87,"err1":520,"err2":1364,"errorLlegan":5.98,"errorPerder":15.68,"fase2":"Documentación","error":"La clave introducida no es correcta"},{"fase1":"Confirmación","lost":31,"err1":66,"err2":173,"errorLlegan":2.13,"errorPerder":5.59,"fase2":"Documentación","error":"Se ha producido un error y el alta no se ha completado"}];
	
		
		console.log(datoserrores);
		window.errores = datoserrores;
		
var main2 = svg.append("g");
var mapeo1 = datoserrores.map(function(d) {return d.errorLlegan;});
		console.log(mapeo1);
var mapeo2 = datoserrores.map(function(d) {return d.errorPerder;});
		console.log(mapeo2);
		
	var radio1 = d3.scale.linear().range([2,5]).domain(d3.extent(datoserrores.map(function (d) {return d.errorLlegan;}))); 
	var radio2 = d3.scale.linear().range([2,5]).domain(d3.extent(datoserrores.map(function (d) {return d.errorLlegan;}))); 	

var color = d3.scale.ordinal().range(["#006ec1","#009ee5","#52bcec","#89d1f3","#b5e5f9","white",]).domain(datoserrores.map(function(d) {return d.fase2;}));
		
	var errores1 = main2.selectAll(".bolitititas").data(datoserrores).enter().append("circle")
	.attr("cx", 2)
	.attr("id", "bolitititas")
	.attr("cy", function(d,i) {return 20+i*25;})
	.attr("r" , function(d,i) {return radio1(d.errorLlegan);})
	.attr("opacity", 0)
	.attr("fill", function(d) {return color(d.fase2);})
	.transition()
	//.delay(14000)
	.duration(function (d, i) {
      return i*400;
    })
	.attr("cx", 2)
	.attr("cy", function(d,i) {return 20+i*25;})
	.attr("r" , function(d,i) {return radio1(d.errorLlegan);})
	.attr("opacity", 1)

	
	;
	
	var errores2 = main2.selectAll(".jkhkj").data(datoserrores).enter().append("circle")
	.attr("cx", 20)
	.attr("id", "bolitititas")
	.attr("cy", function(d,i) {return 20+i*25;})
	.attr("r" , function(d,i) {return radio1(d.errorLlegan);})
	.attr("opacity", 0)
	.attr("fill", function(d) {return color(d.fase2);})
	.transition()
	//.delay(14000)
	.duration(function (d, i) {
      return i*400;
    })
	.attr("cx", 20)
	.attr("cy", function(d,i) {return 20+i*25;})
	.attr("r" , function(d,i) {return radio1(d.errorPerder);})
	.attr("opacity", 1)

	;
	
