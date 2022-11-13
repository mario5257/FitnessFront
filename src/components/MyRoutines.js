import { Router, Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react'

const MyRoutines = (props) => {
    const [user, setUser] = useState({})
    const username = props.username
    const token = props.token;
    const [ userRoutines, setUserRoutines ] = useState([]);

    const fetchUsersRoutines = async (username) => {
        fetch(`https://fitnesstrac-kr.herokuapp.com/api/users/${username}/routines`, {
  headers: {
    'Content-Type': 'application/json'
  },
}).then(response => response.json())
  .then(result => {
   setUserRoutines(result);
  })
  .catch(console.error);
    }


    const deleteUserRoutine = async (id, token) => {
        try {
            await fetch(`https://fitnesstrac-kr.herokuapp.com/api/routines/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
        } catch (err) {
            console.error(err.message)
        }
    }
    const getUser = async (token) => {
       await fetch('https://fitnesstrac-kr.herokuapp.com/api/users/me', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
  },
}).then(response => response.json())
  .then(result => {
    setUser(result)
  })
  .catch(console.error);
    }

    useEffect(() => {
        getUser(token);
        console.log(user);
        fetchUsersRoutines(username);
    }, [userRoutines])

return (<>
    <h2 className="bg-white shadow p-3 rounded">My Routines</h2>
                <ul>
                    {
                        userRoutines? 
                        userRoutines.map((routine) => {
                            return <div key={routine.id} className='row mb-3'>
                                {
                                        <div key={routine.id}>
                                        <h3>{routine.name}</h3>
                                        <h4 title={routine.goal}>Whats your goal?: {routine.goal}</h4>
                                        <h4 title={routine.name}>Is post public?: active</h4>
                                        <Link to={`/routines/edit/${routine.id}`} className='bg-white'><input type='button' className="btn btn-danger ms-2" value='edit'></input></Link>

                                    </div> 
                                }</div>
                        })

                    :<div className="fs-2">
                    No Routines Yet
                </div>
                } 
                </ul>
    </>
)

}



export default MyRoutines