import React,{useState,useContext} from "react";
import {Link, useNavigate} from 'react-router-dom'
import {UserContext} from '../../App'
import M from 'materialize-css'

const Signin = ()=>{
    const {state,dispatch} = useContext(UserContext)
    const history = useNavigate()
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const PostData = ()=>{
        if(!emailRegex.test(email)){
                M.toast({html:"invalid email", classes:"#c62828 red darken-3"})
                return
            }
        fetch("/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                email
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.error){
                M.toast({html: data.error, classes:"#c62828 red darken-3"})
            }
            else{
                localStorage.setItem("jwt", data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER", payload:data.user})
                M.toast({html:"Signed in successfully!!!", classes:"#43a047 green darken-1"})
                history('/')
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <input type = "text" placeholder="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}>
                </input>
                <input type = "password" placeholder="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}>
                </input>
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={()=>PostData()}>LOGIN
                </button>
                <h5>
                    <Link to="/signup">Dont' have an account ?</Link>
                </h5>
            </div>
        </div>
    )
}

export default Signin