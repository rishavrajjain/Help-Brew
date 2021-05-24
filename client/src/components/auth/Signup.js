import React,{useState,useEffect} from 'react';
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { Error } from "@progress/kendo-react-labels";
import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import {Link} from 'react-router-dom';
import axios from 'axios';
import {
    Notification,
    NotificationGroup,
  } from "@progress/kendo-react-notification";
  import { Fade } from "@progress/kendo-react-animation";
  import Navbar from '../layout/Navbar'


const emailRegex = new RegExp(/\S+@\S+\.\S+/);
const emailValidator = (value) =>
  emailRegex.test(value) ? "" : "Please enter a valid email.";
const EmailInput = (fieldRenderProps) => {
  const { validationMessage, visited, ...others } = fieldRenderProps;
  return (
    <div>
      <Input {...others} />
      {visited && validationMessage && <Error>{validationMessage}</Error>}
    </div>
  );
};

export default function Signup(props) {

  useEffect(()=>{
    const token = localStorage.getItem('helpbrew-token');
    if(token){
      props.history.push('/dashboard');
    }
  },[])

  const [user,setUser]=useState({
    username:'',
    email:'',
    password:'',
    confirmPassword:''
  })

  const onChange = (e)=>{
    setUser({...user,[e.target.name]:e.target.value})
    console.log(user)
  }
    const [alert,setAlert]=useState({
        success:false,
        error:false
    })
    const [alertMessages,setAlertMessages]= useState({
        success:'',
        error:''
    })

  const handleSubmit = (event)=>{
    event.preventDefault();
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/createuser`,{
        name:user.username,
        email:user.email,
        password:user.password
      }).then((res)=>{
        localStorage.setItem('helpbrew-token',res.data.data.token);
        localStorage.setItem('email',res.data.data.email);
        localStorage.setItem('name',res.data.data.name);
        setAlert({...alert,success:true});
        setAlertMessages({...alert,success:'Signup Successfull'});
        props.history.push('/dashboard')
      }).catch((err)=>{
        
          setAlert({...alert,error:true});
          setAlertMessages({...alert,error:err.response.data.message});
        
      })
  }
    return (
      <div>
      <Navbar/>
      <div className="container">
      <div className="row">
      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12" >
        <img src="https://i.postimg.cc/wvYh0fNX/Untitled-design-2.png" className="img-fluid"></img>
      </div>
      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12  ">
        <div className="card" style={{marginTop:'2rem'}}>
          <div className="card-block" style={{margin:'1.5rem'}}>
            <form className="k-form">
              <fieldset>
                <legend>Create new account:</legend>
                <div className="mb-3">
                  <Input
                    name="username"
                    style={{
                      width: "100%",
                    }}
                    label="First Name"
                    pattern={"[A-Za-z]+"}
                    minLength={2}
                    required={true}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <Input
                    name="email"
                    type="email"
                    style={{
                      width: "100%",
                    }}
                    label="Email address"
                    required={true}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <Input
                    name="password"
                    type="password"
                    style={{
                      width: "100%",
                    }}
                    label="Password"
                    required={true}
                    minLength={6}
                    maxLength={18}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <Input
                    name="confirmPassword"
                    type="password"
                    style={{
                      width: "100%",
                    }}
                    label="Confirm Password"
                    minLength={6}
                    maxLength={18}
                    onChange={onChange}
                  />
                </div>
                
              </fieldset>
              
            </form>
            <Button title="Submit" className="btn btn-block" style={{height:'3rem',background:'#707BFB'}} onClick={handleSubmit}>Submit</Button>
            <Link to="/login">Already Have an account ? Login</Link>
          </div>
          <NotificationGroup
          style={{
            right: 0,
            bottom: 0,
            alignItems: "flex-start",
            flexWrap: "wrap-reverse",
          }}
        >
          <Fade>
            {alert.success && (
              <Notification
                type={{
                  style: "success",
                  icon: true,
                }}
                closable={true}
                onClose={() => setAlert({ ...alert, success: false })}
              >
                <span>{alertMessages.success}</span>
              </Notification>
            )}
          </Fade>
          <Fade>
            {alert.error && (
              <Notification
                type={{
                  style: "error",
                  icon: true,
                }}
                closable={true}
                onClose={() => setAlert({ ...alert, error: false })}
              >
                <span>{alertMessages.error}</span>
              </Notification>
            )}
          </Fade>
          
          
         
        </NotificationGroup>
        
      
      </div>
     
    </div>
    </div>
    </div>
    </div>
    )
}
