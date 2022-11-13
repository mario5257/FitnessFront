import { useEffect, useState } from 'react'
import { Router, Link, Route, Routes, useNavigate, useParams, BrowserRouter } from "react-router-dom";

const EditActivity = (props) => {
    const token = props.token;
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const {id} = useParams();

    const editActivity = async (id, name, description, token) => {
        await fetch(`https://fitnesstrac-kr.herokuapp.com/api/activities/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },    
            method: "PATCH",
            body: JSON.stringify({
                name: `${name}`,
                description: `${description}`
      })
    }).then(response => response.json())
      .then(result => {
        console.log(result);
      })
      .catch(console.error)
        
    }

    return<>
    <form onSubmit={(event) => {
    event.preventDefault()
    editActivity(id, name, description, token)
    event.target.reset()
}}>
    <div className="input-group mb-3">
    <span className="input-group-text " id="basic-addon1">Edit exercise name: </span>
    <input type="text" className="form-control" placeholder="edit exercise name" aria-label="Edit exercise name" aria-describedby="basic-addon1" onChange={(event) => {
    setName(event.target.value)
    }}></input><br/>
    </div>
    <div className="input-group mb-3">
    <span className="input-group-text" id="basic-addon1">Edit exercise description: </span>
    <input type="text" className="form-control" placeholder="edit exercise description" aria-label="Edit exercise description" aria-describedby="basic-addon1" onChange={(event) => {
    setDescription(event.target.value)
    }}></input><br/>
    </div>

    <input className="btn btn-success btn-lg card-item" type='submit' value='Complete Edit'></input>
    <Link to={`/activities`}><input className="btn btn-success btn-lg card-item ms-2" type='button' value='Cancel'></input></Link>

      </form>
      </> 
}


export default EditActivity;

