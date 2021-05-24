import React,{Fragment, useEffect, useState} from 'react';
import './profile.css';
import axios from 'axios';
import {
    Notification,
    NotificationGroup,
  } from "@progress/kendo-react-notification";
  import { Fade } from "@progress/kendo-react-animation";
  import Navbar from '../layout/Navbar'
export default function Profile(props) {

    const [loading,setLoading]=useState(true);
    const [user,setUser] = useState({
        name:'',
        email:''
    });
    const [alert,setAlert]=useState({
        success:false,
        error:false
    })
    const [alertMessages,setAlertMessages]= useState({
        success:'',
        error:''
    })

    useEffect(()=>{
        var name = localStorage.getItem('name');
        var email = localStorage.getItem('email')
        const temp = {
            name:name,
            email:email
        }
        setUser(temp);
        setLoading(false);
    },[])

    

    const logout = async()=>{
        const token = localStorage.getItem('helpbrew-token');
            const config = {
                headers: { 'Authorization': `Bearer ${token}`,
                'Content-type':'application/json'
            }
        };
        // localStorage.removeItem('helpbrew-token')
        //     localStorage.removeItem('name')
        //     localStorage.removeItem('email')
        //     setAlert({...alert,success:true});
        //     setAlertMessages({...alert,success:'Logout Successfull'});
        //     setTimeout(()=>{
        //         props.history.push('/')
        //     },3000)
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/logout`,{},config).then((res)=>{
            localStorage.removeItem('helpbrew-token')
            localStorage.removeItem('name')
            localStorage.removeItem('email')
            setAlert({...alert,success:true});
            setAlertMessages({...alert,success:'Logout Successfull'});
            setTimeout(()=>{
                props.history.push('/')
            },3000)
            
        }).catch(err=>{
            setAlert({...alert,error:true});
          setAlertMessages({...alert,error:'Error'});
        })
    }

    return loading?(
        <div class="d-flex justify-content-center" style={{ marginTop: '5rem' }}>

      <div class="col-sm-6 text-center"><p>Loading ...</p>
        <div class="loader4"></div>

      </div>

    </div>
    ):(
      <Fragment>
        <Navbar/>
      <div>
        
            
            
      <div className="container" style={{marginTop:'5rem',marginBottom:'10rem',alignContent:'center'}}>
      
          <div class="card" style={{width: '18rem',margin:'auto',alignContent:'center',alignItems:'center'}}>
          
          <img class="card-img-top img-fluid" style={{margin:'auto',marginTop:'2rem'}} src="https://www.telerik.com/kendo-react-ui-develop/images/kendoka-react.png" class="rounded-circle" alt="Card image cap" height="100" width="100"/>
          <div class="card-body" style={{margin:'auto',alignContent:'center',alignItems:'center'}}>
          <h5 class="card-title" style={{textAlign:'center'}}>{user.name}</h5>
          <p class="card-text" style={{textAlign:'center'}}>{user.email}</p>
          <button className="btn btn-block" style={{backgroundColor:'#707BFB'}} onClick={logout}>Logout</button>
          
          
          
          </div>
          
          
          </div>
          
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

        
        </Fragment>
    )
}
