import { useEffect, useState } from 'react'
import { Router, Link, Route, Routes, useNavigate, useParams, BrowserRouter} from "react-router-dom";
import Register from './Register';

const Login = (props) => {
    const name = props.username
    const [pass, setPassword] = useState('')
    const setUsername = props.setUsername
    const setToken = props.setToken
    const token = props.token
    // const setIsLoggedIn = props.setIsLoggedIn

    const logIn = async (name, pass) => {
        const response = await fetch('http://fitnesstrac-kr.herokuapp.com/api/users/login', {
            method: "POST",
            headers: {
            'Content-Type': 'application/json'
  },
            body: JSON.stringify({
            user: {
                username: name,
                password: pass
                }
  })
})
    const result = await response.json();
    
    setToken(result.data.token);
    return result
}
    
    const logOut = () => {
    setToken('');
    setUsername('');
    }
    
    // const isLoggedIn = () => {
        // token? setIsLoggedIn(): null

        
    // }

    return (
        <>
            <form onSubmit={(event) =>{
                event.preventDefault()
                console.log(token)
                logIn( name , pass )
                event.target.reset()
            }
            }>
            <label htmlFor='username'>Username: </label>
            <input type='text' id='username' minLength='8' onChange={(event) =>{
                setUsername(event.target.value)
            }
            }></input>
            <label htmlFor='password'>Password: </label>
            <input type='password' id='password' min='6' onChange={(event) =>{
                setPassword(event.target.value)
            }
            }></input>
            {
                
                <><input type='submit' value='log in' onClick={(event) => {
                        event.target.value === 'log in'? event.target.value = 'log out'
                        : (event.target.value = 'log in', logOut())
                }

                } ></input><br /></>
                
        }
    
            
            <Link to={'/login/register'} className='btn btn-danger'>Need an account?</Link>
            </form>
        
            </>
    )
}

export default Login