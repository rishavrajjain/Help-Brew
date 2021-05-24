import { Button } from '@progress/kendo-react-buttons'
import React, { useEffect, useState } from 'react';
import { ListView, ListViewHeader, ListViewFooter } from '@progress/kendo-react-listview';
import { Avatar } from '@progress/kendo-react-layout';
import axios from 'axios';
import {
  Notification,
  NotificationGroup,
} from "@progress/kendo-react-notification";
import { Fade } from "@progress/kendo-react-animation";
import Navbar from '../layout/Navbar'

export default function Dashboard(props) {

    const [data,setData]=useState([]);
    const [loading,setLoading]=useState(true);

    const [alert,setAlert]=useState({
      success:false,
      error:false
  })
  const [alertMessages,setAlertMessages]= useState({
      success:'',
      error:''
  })

    useEffect(()=>{
        const token = localStorage.getItem('helpbrew-token');
        if(!token){
          props.history.push('/');
        }
            const config = {
                headers: { 'Authorization': `Bearer ${token}`,
                'Content-type':'application/json'
            }
        };
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/user/resources`,{},config).then((res)=>{
            setData(res.data.data);
            setLoading(false);
        }).catch((err)=>{
            console.log(err)
            setLoading(false);
        })
    },[])

    const MyHeader = () => {
        return <ListViewHeader style={{
          color: 'rgb(160, 160, 160)',
          fontSize: 14
        }} className='pl-3 pb-2 pt-2'>
              Resource List
            </ListViewHeader>;
      };
      
      const MyFooter = () => {
        return <ListViewFooter style={{
          color: 'rgb(160, 160, 160)',
          fontSize: 14
        }} className='pl-3 pb-2 pt-2'>
              WARNING : Resources are subject to availability
            </ListViewFooter>;
      };

      const getDate = (date) => {
        const data = new Date(date);
        return data.toDateString();
      }

      const deleteResource =(id)=>{
        const token = localStorage.getItem('helpbrew-token');
            const config = {
                headers: { 'Authorization': `Bearer ${token}`,
                'Content-type':'application/json'
            }
        };
        axios.delete(`${process.env.REACT_APP_API_BASE_URL}/resource/${id}`,config).then((res)=>{
          
          setLoading(false);
          setAlert({...alert,success:true});
        setAlertMessages({...alert,success:'Resource Deleted'});
          setTimeout(()=>{
            window.location.reload();
          },3000)
      }).catch((err)=>{
          console.log(err)
          setAlert({...alert,error:true});
          setAlertMessages({...alert,error:err.response.data.message});
          setLoading(false);
      })
      }

      const MyItemRender = data => {
        let item = data.dataItem;
        return <div className='row p-2 border-bottom align-middle' style={{
          margin: '1rem'
        }}>
              <div className='col-3'>
              <a style={{
                fontSize: 14,
                fontStyle:'bold',
                color: '#454545',
                marginBottom: 0
              }} className="text-uppercase" onClick={()=>{
                  props.history.push(`/resource/edit/${item._id}`)
              }}>{item.title}</a>
              </div>
              <div className='col-5'>
                <h2 style={{
              fontSize: 14,
              color: '#454545',
              marginBottom: 0
            }} className="text-uppercase">{getDate(item.createdAt)}{'    '}<i className="fa fa-map-marker"></i>{'     '+item.location}</h2>
                <div style={{
              fontSize: 12,
              color: "#a0a0a0"
            }}>{'Contact Number  : '+item.contactNo}</div>
              </div>
              <div className='col-2'>
                <div className='k-chip k-chip-filled'>
                  <div className='k-chip-content'>
                    {item.available ? 'Available':'Not Available'} 
                  </div>
                </div>
              </div>
              <div className='col-2'>
                <div className='k-chip k-chip-filled' style={{background:'#d9534f'}} onClick={()=>deleteResource(item._id)}>
                  <div className='k-chip-content'>
                    <i className="fa fa-trash"></i>{'  '}Delete
                  </div>
                </div>
              </div>
            </div>;
      };

      
    return (
      <div>
      <Navbar></Navbar>
      
        <div className="container" style={{marginTop:'3rem'}}>
            <div className="row" style={{marginBottom:'2rem'}}>
                
                    <Button className="btn" style={{background:'#5cb85c',height:'2.3rem'}} onClick={()=>props.history.push('/resource/add')}><i className="fa fa-list"></i>Add Resource</Button>
                
            </div>
            <div className="row">
            <ListView data={data} item={MyItemRender} style={{
                width: "100%"
              }} header={MyHeader} footer={MyFooter} />
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
    )
}
