import { Router, Link, Route, Routes, useNavigate, useParams} from "react-router-dom";
import { useEffect, useState } from 'react'

const Profile = (props) => {
    const [userPosts, setUserPosts] = useState([])
    const username = props.username
    const token = props.token
    const [posts, setPosts] = useState([])

    const fetchUsersPosts = async () => {
            const response = await fetch('https://strangers-things.herokuapp.com/api/2206-FTB-PT-WEB-PT/users/me', {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                },
              })
              const result = await response.json()
              setUserPosts(result.data.posts)
    }


    useEffect(() => {
        fetchUsersPosts(token)
        // token? fetchUsersPosts(token): null
    }, [])

    // posts? posts.map((post) => {
    //     return post.isAuthor? setUserPosts(post): 
    //     null
    // }): null 

    return (
        <>
        <h1>Welcome {username? username
        : <span>guest</span>}</h1>
        <h2>Your Messages</h2>
        {
            userPosts.length > 0? userPosts.map((post) => {
                return post.messages.map((message) => {
                    return <div key={message}>
                        <h3>From: {message.fromUser.username}</h3>
                        <h4>Message: {message.content}</h4>
                        <Link to={`/posts/view/${post._id}`}><input type='button' className="btn btn-secondary" value='go to listing'></input></Link>
                            </div>
            })
            }): null
        }
        </>
    )
}

export default Profile