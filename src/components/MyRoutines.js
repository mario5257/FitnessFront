import { Router, Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react'

const MyRoutines = (props) => {
    const username = props.username
    const [ userRoutines, setUserRoutines ] = useState([]);

    const fetchUsersRoutines = async (username) => {
        try {
            const response = await fetch(`https://fitnesstrac-kr.herokuapp.com/api/users/${username}/routines`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const result = await response.json()
            setUserRoutines(result.routines)
        } catch (err) {
            console.error(err.message)
        }
    }
    useEffect(() => {
        fetchUsersRoutines(username);
    }, [userRoutines])

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

return (<>
    <h2>My Routines</h2>
                <ul>
                    {
                        userRoutines.map((routine) => {
                            return <div key={routine.id} className='row mb-3'>
                                {
                                    routine.isPublic ? <div key={routine.id}>
                                        <h3>{routine.name}</h3>
                                        <h4 title={routine.goal}>Whats your goal?: {routine.goal}</h4>
                                        <h4 title={routine.name}>Is post public?: active</h4>

                                        <form className="d-flex justify-content-center flex-column" >
                                            <input type='submit' value='edit' className="btn btn-secondary" onClick={(event) => {
                                                event.preventDefault()
                                                return <>

                                                    <input type='text' id='Routine Name' placeholder='Routine Name' className="bg-light" onChange={(event) => setName(event.target.value)}></input>
                                                    <input type='text' id='Goal' placeholder='Goal' className="bg-light" onChange={(event) => setGoal(event.target.value)}></input>
                                                    <label>Make Public?</label>
                                                    <input type='checkbox' className="btn btn-white" onChange={() => {
                                                        isPublic ? setIsPublic(false)
                                                            : setIsPublic(true);
                                                    }}></input>
                                                    <input type='submit' value='Create Routine' className="btn btn-light"></input>
                                                </>
                                            }}>
                                            </input>
                                            <input type='button' value='delete' className="btn btn-secondary" id={routine.id} onClick={(event) => {
                                                event.preventDefault()
                                                deleteUserRoutine(routine.id, token)
                                            }}></input>
                                        </form>
                                    </div> : <div key={routine.id}>
                                        <h3>{routine.name}</h3>
                                        <h4 title={routine.goal}>Whats your goal?: {routine.goal}</h4>
                                        <h4 title={routine.name}>Is post public?: Routine not public</h4>

                                        <form>
                                            <input type='submit' value='edit' className="btn btn-secondary" onClick={(event) => {
                                                event.preventDefault()
                                                return <>

                                                    <input type='text' id='Routine Name' placeholder='Routine Name' className="bg-light" onChange={(event) => setName(event.target.value)}></input>
                                                    <input type='text' id='goal' className="bg-light" placeholder='Goal' onChange={(event) => setGoal(event.target.value)}></input>
                                                    <label>Make Public?</label>
                                                    <input type='checkbox' className="btn btn-white" onChange={() => {
                                                        isPublic ? setIsPublic(false)
                                                            : setIsPublic(true);
                                                    }}></input>
                                                    <input type='submit' value='Create Routine'></input>
                                                </>
                                            }}>
                                            </input>
                                            <input type='button' value='delete' className="btn btn-secondary" id={routine.id} onClick={(event) => {
                                                event.preventDefault()
                                                deleteUserRoutine(routine.id, token)
                                            }}></input>
                                        </form>
                                    </div>
                                }</div>
                        })

                    }

                </ul>
    </>
)

}



export default MyRoutines