import { Router, Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react'

const Routines = (props) => {
    const [userRoutines, setUserRoutines] = useState([]);
    const [name, setName] = useState('');
    const [isPublic, setIsPublic] = useState(true);
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
        if(token){try {
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
        }} else{
            alert("Sign in to create routine")
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
            alert(err.message);
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
       
        <h2 className="bg-white shadow p-3 rounded ">Want to add a Routine?</h2>
        {
            <>
            <form className="d-flex justify-content-center flex-column" onSubmit={(event) => {
                event.preventDefault()
                createUserRoutine(name, isPublic, goal, token)
                event.target.reset()
            }}>
            <div class="collapse" id="navbarToggleExternalContent">
            <div class="bg-dark p-4">
            <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Routine Name</span>
            <input type="text" class="form-control" placeholder="Routine Name" aria-label="Routine Name" aria-describedby="basic-addon1" onChange={(event) => {
                setName(event.target.value)
            }}></input><br/>
            </div>
                        <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Goal</span>
            <input type="text" class="form-control" placeholder="Goal" aria-label="Goal" aria-describedby="basic-addon1" onChange={(event) => {
                setGoal(event.target.value)
            }}></input><br/>
            </div>
            <input type='submit' value='Create Routine' className="btn btn-success text-white"></input><br />
            </div>
          </div>
          </form>
          <nav class="navbar navbar-dark ms-1">
            <div class="container-fluid">
              <button class="navbar-toggler border border-dark border-2 bg-white shadow p-3 rounded" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class='bg-white'>Add a Routine</span>
              </button>
            </div>
          </nav>
            </>
}
        <input
            type="text"
            placeholder="Search for an item"
            value={searchValue}
            className="btn btn-white btn-lg text-dark border border-2 border-dark bg-white shadow p-3 mb-5 rounded ms-3"
            onChange={(event) => setSearchValue(event.target.value)}
        />

        {
            // onlyUserRoutines ?
            <>
                <ul>
                    {

                        filteredRoutines.map((routine) => {
                            return <div key={routine.id} >
                                {
                                    routine.isPublic ? <div className="card border border-2 mt-3 bg-white shadow p-3 rounded border-success ms-3 me-5" key={routine.id}>
                                        <div className="card-body border-2 bg-white " key={routine.id}>
                                        <h3 className="card-text bg-white">{routine.name}</h3>
                                        <h4 className="card-text bg-white" title={routine.goal}>Whats your goal?: {routine.goal}</h4>
                                        <h4 className="card-text bg-white" title={routine.name}>Is post public?: active</h4>
                                        <Link to={`/routines/view/${routine.id}`}><input type='button' className="btn btn-danger" value='view'></input></Link>

                                            <input type='button' value='delete' className="btn btn-danger ms-2" id={routine.id} onClick={(event) => {
                                                event.preventDefault()
                                                deleteUserRoutine(routine.id, token)
                                            }}></input>
                                        </div>
                                    </div> : <div className="d-flex justify-content-center flex-column" key={routine.id}>
                                        <h3>{routine.name}</h3>
                                        <h4 title={routine.goal}>Whats your goal?: {routine.goal}</h4>
                                        <h4 title={routine.name}>Is post public?: Routine not public</h4>

                                        <form>
                                        <div class="d-grid gap-2 col-6 mx-auto">

                                        <Link to={`/routines/view/${routine.id}`}><input type='button' value='view'></input></Link>

                                            <input type='button' value='delete' className="d-flex justify-content-center flex-column" id={routine.id} onClick={(event) => {
                                                event.preventDefault()
                                                deleteUserRoutine(routine.id, token)
                                            }}></input>
                                            </div>
                                        </form>
                                    </div>
                                }</div>
                        })

                    }

                </ul>

            </>
        }

    </>)

}



export default Routines