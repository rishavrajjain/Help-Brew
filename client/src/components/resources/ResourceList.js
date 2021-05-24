import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from "@progress/kendo-react-buttons";
import { ListView, ListViewHeader, ListViewFooter } from '@progress/kendo-react-listview';
import './resources.css';
import Navbar from '../layout/Navbar'

import {
    Notification,
    NotificationGroup,
  } from "@progress/kendo-react-notification";
  import { Fade } from "@progress/kendo-react-animation";


export default function ResourceList(props) {

  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert,setAlert]=useState({
      success:false,
      error:false
  })
  const [alertMessages,setAlertMessages]= useState({
      success:'',
      error:''
  })
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/resources`).then((res) => {
      setResources(res.data.data);
      setLoading(false);
      setAlert({...alert,success:true})
      setAlertMessages({...alertMessages,success:'Resources Fetched'})
    }).catch(err => {
      console.log(err);
      setLoading(false);
      setAlert({...alert,error:true})
      setAlertMessages({...alertMessages,error:'Something went wrong'})
    })
  },[])

  const translate=(lang)=>{
    const url=`https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=${lang}`;

    var titleString='';
    var locationString = '';

    var dates=[];
    var contacts=[];
    var avail=[];
    var ids=[];

    


    resources.map((resource)=>{
      titleString=titleString+resource.title +"|"
      locationString=locationString+resource.location +"|"
      dates.push(resource.createdAt)
      contacts.push(resource.contactNo);
      avail.push(resource.available)
      ids.push(resource._id)

    })
    

    console.log(process.env.REACT_APP_AZURE_KEY_TRANSLATION)
    
    

    const config={
        headers:{
            'Ocp-Apim-Subscription-Key':`${process.env.REACT_APP_AZURE_KEY_TRANSLATION}`,
            'Ocp-Apim-Subscription-Region':'eastus',
            'Content-Type':'application/json'
        }
       
    }
    axios.post(url,[
        {
            "text":titleString
        },
        {
            "text":locationString
        },
        
        
        
    ],config).then((res)=>{
        

        const titles=res.data[0].translations[0].text.split("|");
        
        const locations=res.data[1].translations[0].text.split("|");
        
        
        

        const resData=[];
        for(var i=0;i<titles.length;i++){
          var temp={
            title:titles[i],
            location:locations[i],
            createdAt:dates[i],
            contactNo:contacts[i],
            available:avail[i],
            _id:ids[i]
            
          }
          resData.push(temp);
        }
        
        setResources(resData);


    }).catch(err=>{
        console.log(err);
    })
}

const selectLanguage=(e)=>{
  switch(e.target.value){
      case 'English':{
          translate('en');
          break;
      }
      case 'हिन्दी':{
          translate('hi');
          break;
      }
      case 'ગુજરાતી':{
          translate('gu');
          break;
      }
      case 'தமிழ்':{
          translate('ta');
          break;
      }
      case 'ಕನ್ನಡ':{
          translate('kn');
          break;
      }

      default :{
          break;
      }

  }
  return;
}

 

  const goToResource = (id) => {
    props.history.push(`/resource/${id}`)
  }

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

  const searchByTag = async (tag)=>{
    console.log(tag)
    setLoading(true);
    try{
      // ${process.env.REACT_APP_API_BASE_URL}
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/search?tag=${tag.target.innerHTML}`);
    if(res.data.data.length === 0){
      setAlert({...alert,error:true})
      setAlertMessages({...alertMessages,error:'No resource for given filter'})
    }else{
      setResources(res.data.data);
    }
    setLoading(false);
    }catch(err){
      console.log(err)
      setAlert({...alert,error:true})
      setAlertMessages({...alertMessages,error:'Something went wrong'})
      setLoading(false);
    }
    
  }

  const searchByTagText =async(tag)=>{
    try{
      // ${process.env.REACT_APP_API_BASE_URL}
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/search?tag=${tag}`);
    if(res.data.data.length === 0){
      
    }else{
      setResources(res.data.data);
    }
    setLoading(false);
    }catch(err){
      console.log(err)
      
      setLoading(false);
    }
  }

  const [searchTerm,setSearchTerm] = useState('');

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
              props.history.push(`/resources/${item._id}`)
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
          <div className='col-4'>
            <div className='k-chip k-chip-filled' >
              <div className='k-chip-content'>
                {item.available ? 'Available':'Not Available'} 
              </div>
            </div>
          </div>
          
          
        </div>;
  };

  return loading ? (
    <div class="d-flex justify-content-center" style={{ marginTop: '5rem' }}>

      <div class="col-sm-6 text-center"><p>Loading ...</p>
        <div class="loader4"></div>

      </div>

    </div>
  ) : (
      <div>
        <Navbar/>     
     
      <div style={{ marginTop: '5rem' }}>
      <h3 style={{ textAlign: 'center'}}>Resources</h3>
        <div  className="container">

          <section >

          <div className="row justify-content-center" style={{marginBottom:'2rem'}}>
            <div className="col">
            <select class="form-control" id="exampleFormControlSelect1" onChange={selectLanguage}>
            <option  >English</option>
              <option>हिन्दी</option>
              <option>ગુજરાતી</option>
              <option>தமிழ்</option>
              <option>ಕನ್ನಡ</option>
              
            </select>
            
            </div>
          
          </div>
            

            <div class="row justify-content-center" >
            
            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-xs-12">
                <div id="accordion" style={{ marginBottom: '1rem' }}>
                  <div class="card">
                    <div class="card-header" id="headingOne">
                      <h5 class="mb-0" style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
                        <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" style={{color:'#707BFB'}} aria-expanded="true" aria-controls="collapseOne" color="#707BFB">
                          <i className="fa fa-filter fa-2x" color="#707BFB" style={{color:'#707BFB'}}></i>Filters
                        </button>
                      </h5>
                    </div>

                    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                      <div class="card-body">
                        <input type="text" className="form-control" placeholder="Search" onChange={(e)=>setSearchTerm(e.target.value)}></input>
                        <br></br>
                        <Button className="btn btn-block filter-btn" onClick={()=>searchByTagText(searchTerm)}>Search</Button>
                        <hr></hr>
                        <Button className="btn btn-block filter-btn" onClick={(e)=>searchByTag(e)}>Shelter</Button>
                        <Button className="btn btn-block filter-btn" onClick={(e)=>searchByTag(e)}>Food</Button>
                        <Button className="btn btn-block filter-btn" onClick={(e)=>searchByTag(e)}>Banglore</Button>
                        
                      </div>
                    </div>
                  </div>

                  


                </div>

              </div>

              <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-xs-12">

              <ListView data={resources} item={MyItemRender} style={{
                width: "100%"
              }} header={MyHeader} footer={MyFooter} />
              </div>

              
            </div>

          </section>
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




