document.addEventListener('DOMContentLoaded', function() {


    const email = {
        email: '',
        emailcc: 'opcional',
        asunto: '',
        mensaje: ''
    }

    const inputEmail = document.querySelector('#email');
    const inputEmailcc = document.querySelector('#emailcc')
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');

    inputEmail.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);
    inputEmailcc.addEventListener('input', validar);
   


    formulario.addEventListener('submit', enviarEmail);

    btnReset.addEventListener('click', (e) => {
        e.preventDefault();
        
        resetFormulario();

    })
        
    function enviarEmail(e) {
        e.preventDefault();

        
        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout(() => {
            spinner.classList.add('hidden');
            spinner.classList.remove('flex'); 

            resetFormulario();
            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-s,', 'uppercase');
            alertaExito.textContent = 'Enviado correctamente'
            formulario.appendChild(alertaExito);

            setTimeout(() => {
                alertaExito.remove();
            }, 3000);
            
        }, 3000);
        resetFormulario();
    }

    function validar(e) {
        
        if(e.target.value.trim() === '' && e.target.id .trim() != 'emailcc') {
          mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
          email[e.target.name] = '';
          comprobarEmail();

          return;
        }

        if(e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarAlerta('El email no es valido', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
            
        }

        if(e.target.value.trim() != '' && e.target.id === 'emailcc' && !validarEmail(e.target.value)) {
            
            mostrarAlerta('El email no es valido', e.target.parentElement);
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
         
            return;
        }
     

      
        limpiarAlerta(e.target.parentElement);

        //asignar valores
        email[e.target.name] = e.target.value.trim().toLowerCase();
      
      
        comprobarEmail();
        
        
    }

    function mostrarAlerta(mensaje, referencia) {
        
        limpiarAlerta(referencia);
       

        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('text-red', 'p-1', 'text-center');


        referencia.appendChild(error);
    }

    function limpiarAlerta(referencia) {
        const alerta = referencia.querySelector('.text-red');
        if (alerta) {
            alerta.remove();
        }
    
    }

    function validarEmail (email) {
        //patron email "expresion regular"
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
        const resultado = regex.test(email);
        return resultado;
     

    }

    function comprobarEmail() {
        console.log(email)
        if (Object.values(email).includes('') && email.emailcc != '') {

            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return;
        }
        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;
        
    }

    function resetFormulario () {
        
        email.email ='';
        email.asunto = '';
        email.emailcc = 'opcional'
        email.mensaje = '';

        formulario.reset();
        comprobarEmail();
    }   
   
})