import { Router, Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react'

const View = (props) => {
    const { id } = useParams()
    const routines = props.routines
    const token = props.token
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [count, setCount] = useState('')
    const [duration, setDuration] = useState('')
    console.log(props);
    // let singleRoutine = [];
    // setTimeout(() => {
    const singleRoutine = routines.find((routine) => {
        if(routine.id == id) {
                return routine;
        }
    })
    console.log(singleRoutine)

// }, 2000);

    console.log(routines)

    const addActivity = async (name, count, description, duration, token) => {
        try {
            const response = await fetch(`http://fitnesstrac-kr.herokuapp.com/api/routines/${singleRoutine.id}/activities`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name,
                    description,
                    count,
                    duration
                })
            })
            const result = await response.json()
        } catch (err) {
            console.error(err)
        }
    }
    const editActivity = async (name, description, count, duration) => {
        try {
            const response = await fetch(`http://fitnesstrac-kr.herokuapp.com/api/activities/${id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    count,
                    duration,
                    description
                })
            })
            const result = await response.json()
        } catch (err) {
            console.error(err)
        }
    }
    const deleteRoutine = async (id, token) => {
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
    // setTimeout(() => {
        return  <>
        <h2>Routine: {singleRoutine.name}</h2>
        <h4 title={singleRoutine.name}>Is it public?: {singleRoutine.description}</h4>
        <h4 title={singleRoutine.name}>Goal: {singleRoutine.goal}</h4>
        <h2>Routine Exercises</h2>
        {
            singleRoutine.activities ? singleRoutine.activities.map((activity) => {
                return <>
                    <h4>Exercise name: {activity.name}</h4>
                    <h4>Exercise description: {activity.description}</h4>
                    <h4>How long to do exercise: {activity.duration}</h4>
                    <h4>How many reps: {activity.count}</h4>
                    <label>Delete Routine</label>
                    <input type='checkbox' className="btn btn-white" onChange={() => {
                                                        token ? deleteRoutine()
                                                            : "not the owner";
                                                    }}></input>
                </>
            }) : <h4>No Activities</h4>
        }
        {<form className="d-flex justify-content-center flex-column" onSubmit={(event) => {
            event.preventDefault()
            editActivity(name, description, count, duration, token)
            event.target.reset()
        }}>
            <label>Edit exercise name: </label>
            <input type='textarea' onChange={(event) => {
                event.preventDefault()
                setName(event.target.value)
            }}></input>
            <label>Edit exercise description: </label>
            <input type='textarea' onChange={(event) => {
                event.preventDefault()
                setDescription(event.target.value)
            }}></input>
            <label>Edit how long to do exercise:  </label>
            <input type='textarea' onChange={(event) => {
                event.preventDefault()
                setDuration(event.target.value)
            }}></input>
            <label>Edit how many reps to do: </label>
            <input type='textarea' onChange={(event) => {
                event.preventDefault()
                setCount(event.target.value)
            }}></input>
            <input type='submit' value='Finish Edit'></input>
        </form>
        }
        {   <form className="d-flex justify-content-center flex-column" onSubmit={(event) => {
                event.preventDefault()
                addActivity(name, description, count, duration, token)
                event.target.reset()
            }}>

                <label>Add Exercise to routine: </label>
                <input type='textarea' onChange={(event) => {
                    event.preventDefault()
                    setName(event.target.value)
                }}></input>
                <label>Add exercise description: </label>
                <input type='textarea' onChange={(event) => {
                    event.preventDefault()
                    setDescription(event.target.value)
                }}></input>
                <label>Add how long to do exercise:  </label>
                <input type='textarea' onChange={(event) => {
                    event.preventDefault()
                    setDuration(event.target.value)
                }}></input>
                <label>Add how many reps to do: </label>
                <input type='textarea' onChange={(event) => {
                    event.preventDefault()
                    setCount(event.target.value)
                }}></input>
                <input type='submit' value='Add activity'></input>
            </form>

        }

        <Link to={'/routines'} className="btn btn-danger">Return to routines</Link>
    </>
    // }, 2000);
}

export default View