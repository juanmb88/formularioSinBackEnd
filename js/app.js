//Expresion regular para validacion de email
const expreRegu = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//variables//
const btnEnviar = document.querySelector( '#enviar' );
const inputEmail = document.querySelector( '#email' );
const inputAsunto = document.querySelector( '#asunto' );
const inputMensaje = document.querySelector( '#mensaje' );
const formulario = document.querySelector( '#enviar-mail' );
const resetBtn = document.querySelector( '#resetBtn' );

//funciones//
inicializador();

//Funcion que escucha eventos del usuario
function inicializador(){
    //cuando la app arranca
    document.addEventListener( 'DOMContentLoaded', iniciarApp );
    //campos de formularios
    inputEmail.addEventListener( 'blur', validarFormulario );
    inputAsunto.addEventListener( 'blur', validarFormulario );
    inputMensaje.addEventListener( 'blur', validarFormulario );
    formulario.addEventListener( 'submit', enviarEmail );
    resetBtn.addEventListener( 'click', resetearFormulario );

};
//Funcion para estilos del boton enviar  del formulario
function iniciarApp(){
    btnEnviar.diseabled = true;
    btnEnviar.classList.add( 'cursor-not-allowed', 'opacity-50' );
};

function validarFormulario( e ){
    if(e.target.value.length > 0){
         const error = document.querySelector( 'p.error' );
        if(error){ error.remove(); }  

        e.target.classList.remove( 'error');
        e.target.classList.add( 'border','border-green-500' );
        }else{
        //cuando tengo un error activo esta funcion
        mostrarError( 'Todos los campos son obligatorios' );
        e.target.classList.remove( 'border','border-green-500' );
        e.target.classList.add( 'error' );
    };

    validarEmailFormulario();
    //funcion de validar email
    function validarEmailFormulario() {
        if ( e.target.type === 'email' ) {

            if ( expreRegu.test(e.target.value) ) {

                const error = document.querySelector( 'p.error' );
                if ( error ) { error.remove(); }
                e.target.classList.remove( 'error' );
                e.target.classList.add( 'border', 'border-green-500' ); 
            }else{
                mostrarError( 'Email invalido', 'error' );
                e.target.classList.add( 'error' );
            }
        }
        if ( expreRegu.test(inputEmail.value) && inputAsunto.value !==  "" &&  inputMensaje.value !== "" ) {
            btnEnviar.diseabled = false;
            btnEnviar.classList.remove( 'cursor-not-allowed', 'opacity-50' );
        }
    };
};

function mostrarError( mjs ){
        const mensajeError = document.createElement( 'p' );
              mensajeError.textContent = mjs;
              mensajeError.classList.add( 'background-color-100', 'p-3', 'error', 'm-3', 'text-center' );

        const errores = document.querySelectorAll( '.error' );
        if( errores.length === 0 ){

            formulario.appendChild( mensajeError );
        }   
};

///Fucnoien enviar formulario
function enviarEmail( e ){
    e.preventDefault();
    const mostrarSpinner = document.querySelector( '#spinner' );
        mostrarSpinner.style.display = 'flex';

        setTimeout(()=>{
                mostrarSpinner.style.display = ' none ';
                //mensaje se envio correctamente
                const parrafo = document.createElement( 'p' );
                      parrafo.textContent = 'El Mensaje se envio correctamente';
                      parrafo.classList.add( 'cajaMjsEnviado' )

                formulario.insertBefore(parrafo,mostrarSpinner);
                    setTimeout(()=>{
                        parrafo.remove()
                    }, 2000);
        }, 2000);
        resetearFormulario();
};

function resetearFormulario( e ){
    e.preventDefault();
    formulario.reset();
};

