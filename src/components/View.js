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
            const response = await fetch(`https://fitnesstrac-kr.herokuapp.com/api/routines/${singleRoutine.id}/activities`, {
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
            const response = await fetch(`https://fitnesstrac-kr.herokuapp.com/api/activities/${id}`, {
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
    const deleteActivity = async (id, token) => {
            await fetch(`http://fitnesstrac-kr.herokuapp.com/api/routine_activities/${id}`, {
                method: "DELETE",
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
                }
            }).then(response => response.json())
                .then(result => {
                console.log(result);
                })
                .catch(console.error);
    }

    const deleteRoutine = async (id, token) => {
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
    // setTimeout(() => {
        return  <>
        <h2 className="bg-white fs-1 shadow rounded">{singleRoutine.name}</h2>
        <h4 title={singleRoutine.name}>Goal: {singleRoutine.goal}</h4>
        <h2>Routine Exercises</h2>
        <div className="d-flex row flex-row border-success">
        {

            singleRoutine.activities ? singleRoutine.activities.map((activity) => {
                return <>
                <div className="col-sm-6">
                    <div className="card border-success shadow  mb-5 rounded" key={activity.title} style={{marginRight: '1em', marginLeft: '1em', marginBottom: '1em'}}>
                    <h5 className="card-header">{activity.name}</h5>
                    <div className="card-body" key={activity.id}>
                    <h4 className="card-text">Exercise description: {activity.description}</h4>
                    <h4 className="card-text">How long to do exercise: {activity.duration}</h4>
                    <h4 className="card-text">How many reps: {activity.count}</h4>
                                                    </div>
                    </div>
                    </div>
                </>
            }) : <h4>No Activities</h4>
        }
            </div>

 

        <Link to={'/routines'} className="btn btn-danger">Return to routines</Link>
    </>
    // }, 2000);
}

export default View