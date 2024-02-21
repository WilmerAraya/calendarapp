import { useEffect } from 'react'
import Swal from 'sweetalert2'
import { useAuthStore, useForm } from '../../hooks'
import './/LoginPage.css'

const loginFormFields = {
    loginEmail: '',
    loginPassword: '',
}

const registerFormFields = {
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerPassword2: '',
}


export const LoginPage = () => {

    const { startLogin, startRegister, errorMessage } = useAuthStore();

    const {
        loginEmail, loginPassword, onInputChange: onLoginInputChange
    } = useForm( loginFormFields );

    const {
        registerName, registerEmail, registerPassword, registerPassword2,
        onInputChange: onRegisterInputChange
    } = useForm( registerFormFields );

    function loginSubmit( event ) {
        event.preventDefault();
        startLogin({email: loginEmail, password: loginPassword});
    }

    function registerSubmit( event ) {
        event.preventDefault();
        if ( registerPassword !== registerPassword2 ) {
            Swal.fire({
                title: 'Error en registro',
                text: 'Las contraseñas no coinciden',
                icon: 'error'
            })
        } else {
            startRegister({
                name: registerName,
                email: registerEmail,
                password: registerPassword });
        }
    }

    useEffect(() => {
      if ( errorMessage !== undefined ) {
        Swal.fire({
            title: 'Error en la autenticacion',
            text: errorMessage,
            icon: 'error'
        })
      }
    }, [errorMessage])
    

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={ loginSubmit }>
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="loginEmail"
                                onChange={ onLoginInputChange }
                                value={ loginEmail }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="loginPassword"
                                onChange={ onLoginInputChange }
                                value={ loginPassword }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <button 
                                type="submit"
                                className="btnSubmit"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={ registerSubmit }>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="registerName"
                                onChange={ onRegisterInputChange }
                                value={ registerName }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="registerEmail"
                                onChange={ onRegisterInputChange }
                                value={ registerEmail }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="registerPassword"
                                onChange={ onRegisterInputChange }
                                value={ registerPassword }
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name="registerPassword2"
                                onChange={ onRegisterInputChange }
                                value={ registerPassword2 }
                            />
                        </div>

                        <div className="form-group mb-2">
                            <button 
                                type="submit" 
                                className="btnSubmit" 
                            >
                                Crear cuenta
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}