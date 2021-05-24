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

export default function AddResource(props) {

  useEffect(()=>{
    const token = localStorage.getItem('helpbrew-token');
    if(!token){
      props.history.push('/');
    }
  },[])

  const [resource,setResource]=useState({
    title:'',
    tags:'',
    details:'',
    loctaion:'',
    contactNo:''
  })

  const onChange = (e)=>{
    setResource({...resource,[e.target.name]:e.target.value})
    console.log(resource)
  }
    const [alert,setAlert]=useState({
        success:false,
        error:false
    })
    const [alertMessages,setAlertMessages]= useState({
        success:'',
        error:''
    })

    const token = localStorage.getItem('helpbrew-token');
            const config = {
                headers: { 'Authorization': `Bearer ${token}`,
                'Content-type':'application/json'
            }
        };

  const handleSubmit = (event)=>{
    event.preventDefault();
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/resource/add`,{
        title:resource.title,
        contactNo:resource.contactNo,
        location:resource.location,
        details:resource.details,
        tags:resource.tags
      },config).then((res)=>{
        
        setAlert({...alert,success:true});
        setAlertMessages({...alert,success:'Resource Added'});
        setTimeout(()=>{
            props.history.push('/dashboard')
        },3000)
        
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
        <img src="https://i.postimg.cc/NjbyyRRx/Untitled-design-3.png" className="img-fluid"></img>
      </div>
      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12  ">
        <div className="card" style={{marginTop:'2rem'}}>
          <div className="card-block" style={{margin:'1.5rem'}}>
            <form className="k-form">
              <fieldset>
                <legend>Add resource:</legend>
                <div className="mb-3">
                  <Input
                    name="title"
                    style={{
                      width: "100%",
                    }}
                    label="Title"
                    minLength={2}
                    
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <Input
                    name="location"
                    type="text"
                    style={{
                      width: "100%",
                    }}
                    label="Location"
                    
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <Input
                    name="contactNo"
                    type="text"
                    style={{
                      width: "100%",
                    }}
                    label="Phone No"
                    
                    minLength={6}
                    maxLength={18}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <Input
                    name="tags"
                    type="text"
                    style={{
                      width: "100%",
                    }}
                    label="Tags"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                <label>Details</label>
                  <textarea className="form-control" rows={14} name="details" onChange={onChange}></textarea>
                </div>
                
              </fieldset>
              
            </form>
            <Button title="Submit" className="btn btn-block" style={{height:'3rem',background:'#707BFB'}} onClick={handleSubmit}>Submit</Button>
            
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
