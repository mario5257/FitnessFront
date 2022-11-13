import { useEffect, useState } from 'react'
import { Router, Link, Route, Routes, useNavigate, useParams} from "react-router-dom";

const Register = () => {
        const [username, setUsername] = useState('')
        const [password, setPassword] = useState('')
        const [confirmedPassword, setConfirmedPassword] = useState('')
        

    const registerUser = async (name, pass) => {
        if(confirmedPassword === password) {
        try{
    const response = await fetch('https://fitnesstrac-kr.herokuapp.com/api/users/register', {
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
            {/* <label htmlFor='username'>Username: </label> */}
            <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Username</span>
            <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" onChange={(event) => {
                setUsername(event.target.value)
            }}></input><br/>
            </div>
            <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Password</span>
            <input type="text" class="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" onChange={(event) => {
                setPassword(event.target.value)
            }}></input><br/>
            </div>
            <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Confirm Password</span>
            <input type="text" class="form-control" placeholder="Confirm Password" aria-label="Confirm Password" aria-describedby="basic-addon1" onChange={(event) => {
                setConfirmedPassword(event.target.value)
            }}></input><br/>
            </div>
            
            <div class="d-grid gap-2 col-6 mx-auto">
            <input className="btn btn-success btn-lg" type='submit' value='Create Account'></input>
        <Link to={'/login'} className='btn btn-success btn-lg'>Ready to log in?</Link>
        </div>
        </form>

        </>
    )

}

export default Register