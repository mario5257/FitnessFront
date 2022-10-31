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


    const fetchRoutines = async () => {
        try {
            const response = await fetch('https://fitnesstrac-kr.herokuapp.com/api/routines',
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
            const data = await response.json();
            setRoutines(data);
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchRoutines()
    }, [routines])

    const createUserRoutine = async (name, isPublic, goal, token) => {
        try {
            const response = await fetch('https://fitnesstrac-kr.herokuapp.com/api/routines', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                        name,
                        isPublic,
                        goal,
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
            await fetch(`https://fitnesstrac-kr.herokuapp.com/api/routines/${id}`, {
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
    console.log(routines)
    const filteredRoutines = routines.filter((routine) => {
        return routineMatches(routine);
    });

    const filteredUserRoutines = userRoutines.filter((routine) => {
        return routineMatches(routine)
    })
    return (<>

        <h1>Routines</h1>

        <h2>Want to add a Routine?</h2>
        {
            <form className="d-flex justify-content-center flex-column" onSubmit={(event) => {
                event.preventDefault()
                createUserRoutine(name, isPublic, goal, token)
                event.target.reset()
            }}>
                <input type='text' id='Routine Name' placeholder='Routine Name' className="btn btn-grey border" onChange={(event) => setName(event.target.value)}></input>
                <label className="btn btn-grey border">Make Public?</label>
                <input type='checkbox' title="Make Public?" className="btn btn-white" onChange={() => {
                    isPublic ? setIsPublic(false)
                        : setIsPublic(true);
                }}></input>
                <input type='text' id='goal' placeholder='Goal' className="btn btn-grey border" onChange={(event) => setGoal(event.target.value)}></input>
                <input type='submit' value='Create Routine' className="btn btn-secondary text-white"></input><br />
            </form>
            // : <h3>Please log in...</h3>
        }
        <input
            type="text"
            placeholder="Search for an item"
            value={searchValue}
            className="btn btn-grey border"
            onChange={(event) => setSearchValue(event.target.value)}
        />

        {
            // onlyUserRoutines ?
            <>
                <h2>Routines</h2>
                <ul>
                    {

                        filteredRoutines.map((routine) => {
                            return <div key={routine.id} className='row mb-3'>
                                {
                                    routine.isPublic ? <div className="d-flex justify-content-center flex-column" key={routine.id}>
                                        <h3>{routine.name}</h3>
                                        <h4 title={routine.goal}>Whats your goal?: {routine.goal}</h4>
                                        <h4 title={routine.name}>Is post public?: active</h4>

                                        <form className="d-flex justify-content-center flex-column" >
                                        <Link to={`/routines/view/${routine.id}`}><input type='button' className="d-flex justify-content-center flex-column btn btn-secondary" value='view'></input></Link>

                                            <input type='button' value='delete' className="d-flex justify-content-center flex-column btn btn-secondary" id={routine.id} onClick={(event) => {
                                                event.preventDefault()
                                                deleteUserRoutine(routine.id, token)
                                            }}></input>
                                        </form>
                                    </div> : <div className="d-flex justify-content-center flex-column" key={routine.id}>
                                        <h3>{routine.name}</h3>
                                        <h4 title={routine.goal}>Whats your goal?: {routine.goal}</h4>
                                        <h4 title={routine.name}>Is post public?: Routine not public</h4>

                                        <form>
                                        <Link to={`/routines/view/${routine.id}`}><input type='button' className="d-flex justify-content-center flex-column" value='view'></input></Link>

                                            <input type='button' value='delete' className="d-flex justify-content-center flex-column" id={routine.id} onClick={(event) => {
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
            // : <>
            //     <h2>Routines</h2>
            //     <ul>
            //         {
            //             filteredRoutines.map((routine) => {
            //                 return (
            //                     <div key={routine.id} className='row mb-3'>
            //                         <h3>{routine.name}</h3>
            //                         <h4 title={routine.isPublic}> {routine.isPublic}</h4>
            //                         <h4 title={routine.goal}> {routine.goal}</h4>
            //                         <form className="row mb-3">
            //                             {/* <Link to={`/routines/view/${routine.id}`}><input type='button' className="row mb-3 btn btn-secondary" value='view'></input></Link> */}
            //                             <input type='submit' value='edit' className="btn btn-secondary" onClick={(event) => {
            //                                 event.preventDefault()
            //                                 return <>
            //                                     <input type='text' id='Routine Name' placeholder='Routine Name' className="bg-light" onChange={(event) => setName(event.target.value)}></input>
            //                                     <input type='checkbox' className="btn btn-white" onChange={() => {
            //                                         isPublic ? setIsPublic(false)
            //                                             : setIsPublic(true);
            //                                     }}></input>
            //                                     <input type='text' id='goal' className="bg-light" placeholder='Goal' onChange={(event) => setGoal(event.target.value)}></input>
            //                                     <input type='submit' value='Create Routine'></input>
            //                                 </>
            //                             }}>
            //                             </input>
            //                             <input type='button' value='delete' className="btn btn-secondary" id={routine.id} onClick={(event) => {
            //                                 event.preventDefault()
            //                                 deleteUserRoutine(routine.id, token)
            //                             }}></input>
            //                         </form>

            //                     </div>
            //                 )
            //             })

            //         }
            //     </ul>
            // </>
        }

    </>)

}



export default Routines