import { useEffect, useState } from 'react'
import { Router, Link, Route, Routes, useNavigate, useParams, BrowserRouter } from "react-router-dom";

const EditRoutine = (props) => {
    const token = props.token;
    const [name, setName] = useState('');
    const [goal, setGoal] = useState('');
    const [isPublic, setIsPublic] = useState();

    const {id} = useParams();

    const editRoutine = async (id, name, goal, isPublic, token) => {
        await fetch(`https://fitnesstrac-kr.herokuapp.com/api/routines/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }, 
            method: "PATCH",
            body: JSON.stringify({
              name,
              goal,
              isPublic
            })
          }).then(response => response.json())
            .then(result => {
              console.log(result);
            })
            .catch(console.error);
        
    }

    return<>
    <form onSubmit={(event) => {
    event.preventDefault()
    editRoutine(id, name, goal, isPublic, token)
    event.target.reset()
}}>
    <div className="input-group mb-3">
    <span className="input-group-text " id="basic-addon1">Edit routine name: </span>
    <input type="text" className="form-control" placeholder="edit exercise name" aria-label="Edit exercise name" aria-describedby="basic-addon1" onChange={(event) => {
    setName(event.target.value)
    }}></input><br/>
    </div>
    <div className="input-group mb-3">
    <span className="input-group-text" id="basic-addon1">Edit routine goal: </span>
    <input type="text" className="form-control" placeholder="edit exercise description" aria-label="Edit exercise description" aria-describedby="basic-addon1" onChange={(event) => {
    setGoal(event.target.value)
    }}></input><br/>
    </div>
    <div class="input-group mb-3">
  <label class="input-group-text" for="inputGroupSelect01">Make Public:</label>
  <select class="form-select" id="inputGroupSelect01" onChange={(event) => {
    setIsPublic(event.target.value);
  }}>
    <option selected>Choose...</option>
    <option value="true">Yes</option>
    <option value="false">No</option>

  </select>
</div>

    <input className="btn btn-success btn-lg card-item" type='submit' value='Complete Edit'></input>
    <Link to={`/myroutines`}><input className="btn btn-success btn-lg card-item ms-2" type='button' value='Cancel'></input></Link>

      </form>
      </> 
}


export default EditRoutine;
