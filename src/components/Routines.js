import { Router, Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react'

const Routines = (props) => {
    const [userRoutines, setUserRoutines] = useState([]);
    const [name, setName] = useState('');
    const [isPublic, setIsPublic] = useState('');
    const [goal, setGoal] = useState('');
    const [searchValue, setSearchValue] = useState('')
    const newRoutine = {
        name,
        isPublic,
        goal
    }
    const [onlyUserRoutines, setOnlyUserRoutiens] = useState(false)
    const token = props.token;
    const routines = props.routines;
    const setRoutines = props.setRoutines;
    const username = props.username


    const fetchRoutines = async (token) => {
        try {
            const response = await fetch('http://fitnesstrac-kr.herokuapp.com/api/routines',
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
            const data = await response.json();
            setRoutines(data.data.posts);
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchRoutines(token)
    }, [routines])


    const fetchUsersRoutines = async (username, token) => {
        try {
            const response = await fetch(`http://fitnesstrac-kr.herokuapp.com/api/users/${username}/routines`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
            const result = await response.json()
            setUserRoutines(result.data.posts)
        } catch (err) {
            console.error(err.message)
        }
    }

    const createUserRoutine = async (name, isPublic, goal, token) => {
        try {
            const response = await fetch('http://fitnesstrac-kr.herokuapp.com/api/routines', {
                method: "POST",
                body: JSON.stringify({
                    routine: {
                        name,
                        isPublic,
                        goal,
                    }
                })
            })
            const result = await response.json();
            newRoutine.id = result.data.routine.id
            setRoutines((prev) => [newRoutine, ...prev]

            )
        } catch (err) {
            console.error(err)
        }
    }

    const deleteUserRoutine = async (id, token) => {
        try {
            await fetch(`http://fitnesstrac-kr.herokuapp.com/api/routines/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
            setRoutines((prev) =>
                prev.filter((routine) => id !== routine.id)
            )

        } catch (err) {
            console.error(err.message)
        }
    }

    const routineMatches = (routine) => {
        const textToCheck = (
            routine.name + routine.goal
        ).toLowerCase();
        return textToCheck.includes(searchValue.toLowerCase());
    };

    const filteredRoutines = routines.filter((routine) => {
        return routineMatches(routine);
    });

    const filteredUserRoutines = userRoutines.filter((routine) => {
        return routineMatches(routine)
    })
    return (<>

        <h1>Posts</h1>

        <h2>Got something to sell?</h2>
        {
            token ? <form onSubmit={(event) => {
                event.preventDefault()
                createUserRoutine(name, isPublic, goal, token)
                event.target.reset()
            }}>
                <input type='text' id='Routine Name' placeholder='Routine Name' className="btn btn-grey " onChange={(event) => setName(event.target.value)}></input>
                <input type='checkbox' className="btn btn-white" onChange={() => {
                    isPublic ? setIsPublic(false)
                        : setIsPublic(true);
                }}></input>
                <input type='text' id='goal' placeholder='Goal' className="btn btn-grey " onChange={(event) => setGoal(event.target.value)}></input>
                <input type='submit' value='Create Routine' className="btn btn-secondary text-white"></input><br />
                <label>Only User Routines</label>
                <input type='checkbox' className="btn btn-white" onChange={() => {
                    onlyUserRoutines ? setOnlyUserRoutiens(false)
                        : setOnlyUserRoutiens(true);
                }}></input>
            </form>
                : <h3>Please log in...</h3>
        }
        <input
            type="text"
            placeholder="Search for an item"
            value={searchValue}
            className="bg-white"
            onChange={(event) => setSearchValue(event.target.value)}
        />

        {
            onlyUserRoutines ?
                <>
                    <h2>Your Routines</h2>
                    <ul>
                        {

                            filteredUserRoutines.map((routine) => {
                                return <div key={routine.id} className='row mb-3'>
                                    {
                                        routine.isPublic ? <div key={routine.id}>
                                            <h3>{routine.name}</h3>
                                            <h4 title={routine.isPublic}> {routine.isPublic}</h4>
                                            <h4 title={routine.goal}>$ {routine.goal}</h4>
                                            <h4 title={routine.name}>active</h4>

                                            <form className="row mb-3">
                                                <input type='submit' value='edit' className="btn btn-secondary" onClick={(event) => {
                                                    event.preventDefault()
                                                    return <>

                                                        <input type='text' id='Routine Name' placeholder='Routine Name' className="bg-light" onChange={(event) => setName(event.target.value)}></input>
                                                        <input type='checkbox' className="btn btn-white" onChange={() => {
                                                            isPublic ? setIsPublic(false)
                                                                : setIsPublic(true);
                                                        }}></input>
                                                        <input type='text' id='Goal' placeholder='Goal' className="bg-light" onChange={(event) => setGoal(event.target.value)}></input>
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
                                            <h4 title={routine.isPublic}> {routine.isPublic}</h4>
                                            <h4 title={routine.goal}> {routine.goal}</h4>
                                            <h4 title={routine.name}>Routine not public</h4>

                                            <form>
                                                <input type='submit' value='edit' className="btn btn-secondary" onClick={(event) => {
                                                    event.preventDefault()
                                                    return <>

                                                        <input type='text' id='Routine Name' placeholder='Routine Name' className="bg-light" onChange={(event) => setName(event.target.value)}></input>
                                                        <input type='checkbox' className="btn btn-white" onChange={() => {
                                                            isPublic ? setIsPublic(false)
                                                                : setIsPublic(true);
                                                        }}></input>
                                                        <input type='text' id='goal' className="bg-light" placeholder='Goal' onChange={(event) => setGoal(event.target.value)}></input>
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
                : <>
                    <h2>Routines</h2>
                    <ul>
                        {
                            filteredRoutines.map((routine) => {
                                return (
                                    <div key={routine.id} className='row mb-3'>
                                        <h3>{routine.name}</h3>
                                        <h4 title={routine.isPublic}> {routine.isPublic}</h4>
                                        <h4 title={routine.goal}> {routine.goal}</h4>
                                        <form className="row mb-3">
                                            {/* <Link to={`/routines/view/${routine.id}`}><input type='button' className="row mb-3 btn btn-secondary" value='view'></input></Link> */}
                                            <input type='submit' value='edit' className="btn btn-secondary" onClick={(event) => {
                                                event.preventDefault()
                                                return <>
                                                    <input type='text' id='Routine Name' placeholder='Routine Name' className="bg-light" onChange={(event) => setName(event.target.value)}></input>
                                                    <input type='checkbox' className="btn btn-white" onChange={() => {
                                                        isPublic ? setIsPublic(false)
                                                            : setIsPublic(true);
                                                    }}></input>
                                                    <input type='text' id='goal' className="bg-light" placeholder='Goal' onChange={(event) => setGoal(event.target.value)}></input>
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
                                )
                            })

                        }
                    </ul>
                </>}
    </>)

}



export default Routines