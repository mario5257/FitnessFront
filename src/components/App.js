import { Router, Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from 'react'
import Home from './Home'
import Routines from "./Routines";
import Login from "./Login";
import Register from "./Register";
import View from "./View";
import MyRoutines from "./MyRoutines";
const App = () => {
    const [token, setToken] = useState('')
    const [username, setUsername] = useState('')
    const [id, setId] = useState('')
    const [routines, setRoutines] = useState([]);
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark d-flex flex-row mb-3 shadow p-3">
                <Link to="/" className="nav-item ms-1 btn btn-secondary">Home</Link>
                <Link to="/routines" className="nav-item ms-1 btn btn-secondary">Routines</Link>
                <Link to="/login" className="nav-item ms-1 btn btn-secondary">Log In</Link>
                {token ? <Link to="/myroutines" className="nav-item ms-1 btn btn-secondary">My Routines</Link> : null}
            </nav>
            {
                token ? <h4>Signed in as: {username} <button onClick={() => {
                    setToken('')
                }}>Log Out</button></h4>
                    : <h4>Signed in as: guest</h4>
            }
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/routines" element={<Routines token={token} id={id} setId={setId} routines={routines} setRoutines={setRoutines} username={username} />} />
                <Route path="/login" element={<Login setToken={setToken} token={token} setUsername={setUsername} username={username} />} />
                <Route path='/login/register' element={<Register />} />
                <Route path='/routines/view/:id' element={<View routines={routines} token={token} />} />
                <Route path='/myroutines' element={<MyRoutines username={username} />} />

            </Routes>
        </>
    )
}

export default App

{/* <Link to="/profile" className="nav-item ms-1 btn btn-secondary">Profile</Link>
             */}

{/* 

                <Route path="/profile" element={<Profile username={username} posts={posts} token={token}/>} />
                */}