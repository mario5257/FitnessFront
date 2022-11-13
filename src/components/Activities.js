import { useEffect, useState } from 'react'
import { Router, Link, Route, Routes, useNavigate, useParams, BrowserRouter } from "react-router-dom";
import editActivity from './EditActivity';

const Activities = (props) => {
    const token = props.token;
    const [activities, setActivities] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [searchValue, setSearchValue] = useState('')
    
const fetchActivities = async () => {
            await fetch('https://fitnesstrac-kr.herokuapp.com/api/activities', {
            headers: {
              'Content-Type': 'application/json',
            },
          }).then(response => response.json())
            .then(result => {
              setActivities(result);
            })
            .catch(console.error);
}
useEffect(() => {
    fetchActivities()
    console.log(activities)
}, [activities])

const createActivity = async (name, description, token) => {
    await fetch('https://fitnesstrac-kr.herokuapp.com/api/activities', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        method: "POST",
        body: JSON.stringify({
          name: name,
          description: description
        })
      }).then(response => response.json())
        .then(result => {
          console.log(result);
        })
        .catch(console.error);
}
const activityMatches = (activity) => {
    const textToCheck = (
        activity.name + activity.description
    ).toLowerCase();
    return textToCheck.includes(searchValue.toLowerCase());
};
const filteredActivities = activities.filter((activity) => {
    return activityMatches(activity);
});


return <>
        {   <form className="d-flex justify-content-center flex-column" onSubmit={(event) => {
    event.preventDefault()
    createActivity(name, description, token)
    event.target.reset()
}}>
            <input
            type="text"
            placeholder="Search for an item"
            value={searchValue}
            className="btn btn-white text-dark border border-2 border-dark bg-white shadow p-3 mb-3 rounded "
            onChange={(event) => setSearchValue(event.target.value)}
        />
    <div className="input-group mb-3">
<span className="input-group-text" id="basic-addon1">Exercise name: </span>
<input type="text" className="form-control" placeholder="name" aria-label="name" aria-describedby="basic-addon1" onChange={(event) => {
    setName(event.target.value)
}}></input><br/>
</div>
    <div className="input-group mb-3">
<span className="input-group-text" id="basic-addon1">Add exercise description: </span>
<input type="text" className="form-control" placeholder="description" aria-label="description" aria-describedby="basic-addon1" onChange={(event) => {
    setDescription(event.target.value)
}}></input><br/>
</div>
<input className="btn btn-success btn-lg" type='submit' value='Add activity'></input>
</form>
}
{
    filteredActivities.map((activity) => {
return <div className="card border border-2 mt-3 bg-white shadow p-3 rounded border-success ms-3 me-5" key={activity.id}>
<div className="card-body border-2 bg-white " key={activity.id}>
<h3 className="card-text bg-white">{activity.name}</h3>
<h4 className="card-text bg-white" title={activity.description}>Exercise Description: {activity.description}</h4>
    <input type='button' value='delete' className="btn btn-danger ms-2" id={activity.id} onClick={(event) => {
        event.preventDefault()
        deleteActivity(activity.id, token)
    }}></input>
    <Link to={`/activities/edit/${activity.id}`} className='bg-white'><input type='button' className="btn btn-danger ms-2" value='edit'></input></Link>
    
</div>
</div>
    })
}
</>
}

export default Activities;


