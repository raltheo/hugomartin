import Head from 'next/head'
import { useState, useEffect } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router';
import Header from '../components/header'
import { instance } from "../axios"
export default function Login() {
    const router = useRouter();
    const [email , setEmail ] = useState('')
    const [password , setPassword ] = useState('')
    
    const handleChangeEmail = (event) => {
        setEmail(event.target.value)
    }
    const handleChangePassword = (event) => {
        setPassword(event.target.value)
    }

    function login() {
        if(email && password){
            instance.post(`/login`, { username: email, password: password })
            .then(res => {
                if (typeof window !== 'undefined') {
                    window.localStorage.setItem("token", res.data.token);
                    router.push("/")
                }
            })
            .catch(err => console.log("mot de passe/email incorrect"))
        }else{
            console.log("remplir les champs")
        }
    }

    return (
        <div>
            <Header />
            <div className='container_login'>
                <div className='card_login'>
                    <h2>Login</h2>
                    <div className='container_input_login'>
                        <label htmlFor="cheese">username :</label>
                        <input type="email" name="cheese" value={email} onChange={handleChangeEmail}/>
                    </div>
                    <div className='container_input_login'>
                        <label htmlFor="cheese">password :</label>
                        <input type="password" name="cheese" value={password} onChange={handleChangePassword} />
                    </div>
                    <div className='container_btn_login'>
                        <div className='btn_login' onClick={login}>
                            <p>login</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}