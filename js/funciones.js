var cadena_guiones = document.getElementById("guiones");
var letra = document.getElementById("letra_introducir");
var errores = document.getElementById("errores");
var nimagen;

function SeleccionImagenes(evt) {
                       
    var files = evt.target.files; // FileList object
   
    // Bucle que recorre las imagenes obtenidos de la carpeta seleccionada.
    var columnas = 0;
    for (var i = 0, f; f = files[i]; i++) {

// Si f no es de type image , no continua y vuelve al inicio del bucle(continue)
        if (!f.type.match('image.*')) {
            continue;
        }

        var reader = new FileReader();

// Function(Clousure) que obtiene la información de cada archivo. la funcion 
// se ejecuta al cargar (load) cada unop de los archivos seleccionadso
        
        reader.onload = (function (ElFichero) {
            return function (e) {
               
               
              
                //ElFichero.name contiene el nombre de los ficheros seleccionados
                // e.target.result contiene el Data de la imagen,que asigándo el mismo
                // a la prpiedad src de un elemento html img, sevisualiza en el mismo
                             var cadena = escape(ElFichero.name);
                var ppunto = cadena.indexOf(".");
                nimagen = cadena.substring(0, ppunto)
                //  Creamos la IMAGEN
                imm = document.createElement("img");
                imm.src = e.target.result;
                imm.alt = ElFichero.name;
                
//Podemos guardar el nombre de la imagen  a adivinar 
                                         //en esta propiedad alt
                imm.title = nimagen;
                

                // Programamos en  evento clic sobre la imagen para jugar con ella
                imm.onclick = copiaPalabra;
                    document.getElementById('contenedorImagen').insertBefore(imm, null);
                }
                                               
        })(f);

        // Read in the image file as a data URL.
        reader.readAsDataURL(f);
    }
}
document.getElementById('files').addEventListener('change', SeleccionImagenes, false);


function copiaPalabra() {
    
    guiones = nimagen .replace(/[a-z]/gi, "-");


    cadena_guiones.value = guiones;
    letra.focus();
}


function introducirLetra(Event) {
    var sw = false;
    var guiones = cadena_guiones.value;
    var cadena = guiones;
    var leter = letra.value;
    var ascii= leter.toUpperCase().charCodeAt(0);
    var i = 0;
    var n=0;
    if( ascii> 64 && ascii < 91){
        if (guiones.length != 0) {
            for (i = 0; i < nimagen.length; i++) {
                if (nimagen.indexOf(leter, i) != -1) {
                    sw = true;
                    let pos = nimagen.indexOf(leter, i);
                    cadena = cadena.substring(0, pos) + leter + cadena.substring(pos + 1, nimagen.length);
                    document.getElementById("guiones").value = cadena;
                    i = pos;
                }       
            }
    
            if (sw == false) {
                errores.value++;
            }
    
            if(nimagen==cadena){
                alert("Felicidades")
                letra.blur();
            }

            letra.value = "";
        }
        else {
            alert("Eliga una imagen primero");
            letra.value = "";
        }
    }else{
        letra.value = "";
    }
   
}