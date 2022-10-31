import { useEffect, useState } from 'react'
import { Router, Link, Route, Routes, useNavigate, useParams} from "react-router-dom";

const Register = () => {
        const [username, setUsername] = useState('')
        const [password, setPassword] = useState('')
        const [confirmedPassword, setConfirmedPassword] = useState('')
        

    const registerUser = async (name, pass) => {
        if(confirmedPassword === password) {
        try{
    const response = await fetch('http://fitnesstrac-kr.herokuapp.com/api/users/register', {
                    method: "POST",
                    headers: {
                    'Content-Type': 'application/json'
                        },
                    body: JSON.stringify({
                                username: name,
                                password: pass
        })
    })
        const result = await response.json();
        alert(result.message);
        setToken(result.token);
        return result;
        } catch(err) {
            console.error(err);
        }
    } else {
        alert("Oops passwords dont match");
    }
}


    return (
        <>
        <form className="d-flex justify-content-center flex-column" onSubmit= { (event) =>{
            event.preventDefault()
            registerUser(username, password)
            event.target.reset()

            }
        }>
            <label htmlFor='username'>Username: </label>
            <input type='text' id='username' onChange={(event) => {
                setUsername(event.target.value)
            }
            }></input><br/>
            <label htmlFor='password'>Password: </label>
            <input type='password' id='password' minLength='8' onChange={(event) => {
                setPassword(event.target.value)
            }
            }></input><br/>
            <label htmlFor='confirmPassword'>Confirm password: </label>
            <input type='password' id='confirmPassword' minLength='8' onChange={(event) => {
                setConfirmedPassword(event.target.value)
            }}></input><br/>
            <input type='submit' value='Create Account'></input>
        </form>
        <Link to={'/login'} className='btn btn-danger'>Ready to log in?</Link>
        </>
    )

}

export default Register