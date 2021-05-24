import React,{useEffect, useState} from 'react';
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

export default function EditResource(props) {

    const [resource,setResource]=useState({
        title:'',
        tags:'',
        details:'',
        loctaion:'',
        contactNo:'',
      })

    const [available,setAvailable]=useState(true);

      

    useEffect(()=>{
      
        const token = localStorage.getItem('helpbrew-token');
        if(!token){
          props.history.push('/');
        }
      
    
        const id = props.match.params.id;
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/resource/${id}`).then((res)=>{
            
            const tempData={
                title:res.data.data.title,
                tags:res.data.data.tags,
                location:res.data.data.location,
                contactNo:res.data.data.contactNo,
                details:res.data.data.details,
            }
            setResource(tempData)
            
        }).catch(err=>{
            console.log(err);
        })
    },[])

  

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

    const onChangeAvailable =(e)=>{
      var res = true;
      console.log(e.target.value)
      if(e.target.value == "0"){
        res=false;
      }

      setAvailable(res);
    }

  const handleSubmit = (event)=>{
    event.preventDefault();
    const id = props.match.params.id;
   //${process.env.REACT_APP_API_BASE_URL}
    axios.patch(`${process.env.REACT_APP_API_BASE_URL}/resource/${id}`,{
        title:resource.title,
        contactNo:resource.contactNo,
        location:resource.location,
        details:resource.details,
        tags:resource.tags,
        available:available
      },config).then((res)=>{
        
        setAlert({...alert,success:true});
        setAlertMessages({...alert,success:'Resource Updated'});
        setTimeout(()=>{
            props.history.push('/dashboard')
        },3000)
        
      }).catch((err)=>{
          console.log(err);
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
                <legend>Edit resource:</legend>
                <div className="mb-3">
                  <Input
                    name="title"
                    style={{
                      width: "100%",
                    }}
                    label="Title"
                    

                    value={resource.title}
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
                    value={resource.location}
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
                    value={resource.contactNo}

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
                    value={resource.tags}
                  />
                </div>
                <div className="mb-3 form-group">
                <label>Details</label>
                  <textarea className="form-control" rows={14} name="details" onChange={onChange} defaultValue={resource.details}></textarea>
                </div>
                
                
                
                  
              
                
              </fieldset>
              <select class="form-select form-control" aria-label="Default select example" onChange={onChangeAvailable} name="available">

                <option value="1">Available</option>
                <option value="0">Not Available</option>

            </select>
            </form>
            <Button title="Submit" className="btn btn-block" style={{height:'3rem',marginTop:'2rem',background:'#707BFB'}} onClick={handleSubmit}>Submit</Button>
            
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
