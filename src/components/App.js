import { Router, Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from 'react'
import Home from './Home'
import Routines from "./Routines";
import Login from "./Login";
import Register from "./Register";
import View from "./View";
import MyRoutines from "./MyRoutines";
import Activities from "./Activities";
import EditActivity from "./EditActivity";
import EditRoutine from "../EditRoutine";

const App = () => {
    const [token, setToken] = useState('')
    const [username, setUsername] = useState('')
    const [id, setId] = useState('')
    const [routines, setRoutines] = useState([]);
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark d-flex flex-row mb-3 shadow p-3">
                <Link to="/" className="nav-item ms-1 btn btn-success">Home</Link>
                <Link to="/routines" className="nav-item ms-1 btn btn-success">Routines</Link>
                {token ? <Link to="/myroutines" className="nav-text ms-1 btn btn-success">My Routines</Link> : null}
                <Link to="/activities" className="nav-item ms-1 btn btn-success">Activities</Link>
                <Link to="/login" className="nav-item ms-1 btn btn-success">Log In</Link>

                {
                token ? <span className="navbar-text ms-1 btn btn-success ">Signed in as: {username} <button className='btn btn-danger btn-sm ' onClick={() => {
                    setToken('')
                }}>Log Out</button></span>
                    : <></>
                }
            </nav>
            
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/routines" element={<Routines token={token} id={id} setId={setId} routines={routines} setRoutines={setRoutines} username={username} />} />
                <Route path="/login" element={<Login setToken={setToken} token={token} setUsername={setUsername} username={username} />} />
                <Route path='/login/register' element={<Register />} />
                <Route path='/routines/view/:id' element={<View routines={routines} token={token} />} />
                <Route path='/myroutines' element={<MyRoutines username={username} token={token}/>} />
                <Route path="/activities" element={<Activities setToken={setToken} token={token} setUsername={setUsername} username={username} />} />
                <Route path='/activities/edit/:id' element={<EditActivity token={token} />} />
                <Route path='/routines/edit/:id' element={<EditRoutine tokesn={token} />} />

            </Routes>
        </>
    )
}

export default App