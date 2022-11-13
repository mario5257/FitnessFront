import { useEffect, useState } from 'react'
import { Router, Link, Route, Routes, useNavigate, useParams, BrowserRouter } from "react-router-dom";

const Login = (props) => {
    const name = props.username
    const [pass, setPassword] = useState('')
    const setUsername = props.setUsername
    const setToken = props.setToken
    const token = props.token
    // const setIsLoggedIn = props.setIsLoggedIn

    const logIn = async (name, pass) => {
        try {
           const response = await fetch('https://fitnesstrac-kr.herokuapp.com/api/users/login', {
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
        setToken(result.token);
        if(!result.token){
            alert('incorrect username or password')
        }
    } catch (err) {
        
        console.error(err.message)

    }
    }

    const logOut = () => {
        setToken('');
        setUsername('');
    }

    return (
        <>
            <form className='d-flex justify-content-center flex-column' onSubmit={(event) => {
                event.preventDefault()
                logIn(name, pass)
                event.target.reset()
            }
            }>
                            <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Username</span>
            <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" onChange={(event) => {
                setUsername(event.target.value)
            }}></input><br/>
            </div>
                <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Password</span>
            <input type="password" className="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" onChange={(event) => {
                setPassword(event.target.value)
            }}></input><br/>
            </div>
                {

                    <><input type='submit' value='log in' className='btn btn-success btn-lg' onClick={(event) => {
                        event.target.value === 'log in' ? event.target.value = 'log out'
                            : (event.target.value = 'log in', logOut())
                    }

                    } ></input><br /></>

                }


                <Link to={'/login/register'} className='btn btn-danger btn-lg'>Need an account?</Link>
            </form>

        </>
    )
}

export default Login;