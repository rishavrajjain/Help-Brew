import React,{useState,useEffect} from 'react';
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { Error } from "@progress/kendo-react-labels";
import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import axios from 'axios';
import {
  Notification,
  NotificationGroup,
} from "@progress/kendo-react-notification";
import { Fade } from "@progress/kendo-react-animation";
import {Link} from 'react-router-dom';
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

export default function Login(props) {

  useEffect(()=>{
    const token = localStorage.getItem('helpbrew-token');
    if(token){
      props.history.push('/dashboard');
    }
  },[])

  const [user,setUser]=useState({

    email:'',
    password:'',
  })

  const [alert,setAlert]=useState({
    success:false,
    error:false
})
const [alertMessages,setAlertMessages]= useState({
    success:'',
    error:''
})

  const onChange = (e)=>{
    setUser({...user,[e.target.name]:e.target.value})

  }

  const handleSubmit = (event)=>{
    event.preventDefault();

    axios.post(`${process.env.REACT_APP_API_BASE_URL}/login`,{
      email:user.email,
      password:user.password
    }).then((res)=>{
      setAlert({...alert,success:true});
      setAlertMessages({...alert,success:'Login Successfull'});
      localStorage.setItem('helpbrew-token',res.data.data.token);
        localStorage.setItem('email',res.data.data.email);
        localStorage.setItem('name',res.data.data.name);
        setAlert({...alert,success:true});
        setAlertMessages({...alert,success:'Login Successfull'});
        props.history.push('/dashboard')
    }).catch((err)=>{
      if(err.response.status === 401){
        setAlert({...alert,error:true});
        setAlertMessages({...alert,error:'Invalid Credentails'});
      }else{
        setAlert({...alert,error:true});
        setAlertMessages({...alert,error:err.response.data.message});
      }
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
        <h2 style={{alignContent:'center',alignSelf:'center',justifyContent:'center',marginTop:'1.5rem'}}><i className="fa fa-user"></i>{' '}Login</h2>
          <div className="card-block" style={{margin:'1.5rem'}}>
            <form className="k-form" >
              <fieldset>
                
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
                
                
              </fieldset>
              
            </form>
            <Button title="Submit" className="btn btn-block" onClick={handleSubmit} style={{height:'3rem',background:'#707BFB'}}>Submit</Button>
            <Link to="/signup">Don't have an account? Create one.</Link>
          </div>
        
      
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
    )
}
