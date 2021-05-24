import React,{useState,useEffect} from 'react';
import './resources.css';
import axios from 'axios';
import Navbar from '../layout/Navbar'

export default function ResourcePage(props) {
    const [resource, setResource] = useState();
    const [loading, setLoading] = useState(true);
   

    useEffect(() => {
        const id = props.match.params.id;
        const token = localStorage.getItem('helpbrew-token');
        if(!token){
          props.history.push('/');
        }
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/resource/${id}`).then((res) => {
            setResource(res.data.data);
            setLoading(false);
        }).catch(err => {
            console.log(err);
            setLoading(false)
            
        })
    }, [])

    const getDate = (date) => {
        const data = new Date(date);
        return data.toDateString();
    }

    const translate=(lang)=>{
        const url=`https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=${lang}`;
    
        
    
        
    
    
        
        
    
        console.log(process.env.REACT_APP_AZURE_KEY_TRANSLATION)
        
        
    
        const config={
            headers:{
                'Ocp-Apim-Subscription-Key':`${process.env.REACT_APP_AZURE_KEY_TRANSLATION}`,
                'Ocp-Apim-Subscription-Region':'eastus',
                'Content-Type':'application/json'
            }
           
        }
        console.log(resource)
        var tagsString ="";

        resource.tags.map((tag)=>{
            tagsString=tagsString+tag+"|"
        })

        console.log(tagsString)
        console.log(resource.title)
        console.log(resource.location)
        console.log(resource.details)


        axios.post(url,[
            {
                "text":resource.title
            },
            {
                "text":resource.location
            },
            {
                "text":resource.details
            },
            {
                "text":tagsString
            }
            
            
            
        ],config).then((res)=>{
            
    
            const title=res.data[0].translations[0].text
            
            const location=res.data[1].translations[0].text
            
            const details=res.data[2].translations[0].text

            const tags=res.data[3].translations[0].text.split("|")
            
            
    
            const resourceData = {
                title:title,
                location:location,
                details:details,
                contactNo:resource.contactNo,
                createdAt:resource.createdAt,
                _id:resource._id,
                tags:tags

            }
            
            setResource(resourceData);
    
    
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

    
    

    return loading ? (
        <div class="d-flex justify-content-center" style={{ marginTop: '5rem' }}>

            <div class="col-sm-6 text-center"><p>Loading ...</p>
                <div class="loader4"></div>

            </div>

        </div>

    ) : (
        <div>
            <Navbar/>
            <div className="container " style={{ marginTop: '5rem',marginBottom:'3rem' }}>
                <div className="row" class="row justify-content-center" style={{ marginTop: '2rem' }}>
                <select class="form-control" id="exampleFormControlSelect1" onChange={selectLanguage} style={{marginBottom:'2rem'}}>
            <option  >English</option>
              <option>हिन्दी</option>
              <option>ગુજરાતી</option>
              <option>தமிழ்</option>
              <option>ಕನ್ನಡ</option>
              
            </select>
                <div className="col-xl-2 col-lg-2 col-md-12" >
                <img className="img-fluid" src="https://i.postimg.cc/NMVSH6V2/Jobs.png"></img>
                </div>
                    <div className="col-xl-10 col-lg-10 col-md-12 col-sm-12 col-xs-12" >
                    
                        
                    
                        <h1 style={{color: 'black'}}>
                            {resource.title}
                        </h1>

                        <br />

                        

                        <h5 style={{color: 'black'}}>
                            {getDate(resource.createdAt)}
                        </h5>

                        <br />
                        <div>
                            <span style={{ float: "right" }}>                                
                                {
                                    resource.tags.map(tag => {
                                        return (
                                            <h6 className="badge" style={{ marginRight: '8px',background:'#707BFB' }}><i className="fa fa-tags"></i>{tag.toUpperCase()}</h6>
                                        )
                                    })
                                }
                            </span>
                            <span>
                            <i className="fa fa-map-marker"></i>{' ' + resource.location + '  '}
                            <br></br>
                            <i className="fa fa-phone"></i>{' ' + resource.contactNo + '  '}
                            <br></br>
                            
                                
                            </span>
                        </div>
                        <br></br>
                        <div class="card">
                            <div className="card-body">
                                <div style={{color: 'black'}} >
                                    {resource.details}
                                </div>
                            </div>
                        
                        </div>

                        <hr></hr>
                        <button  onclick={()=>window.open(`tel:${resource.contactNo}`)} className="btn btn-block" style={{background:'#707BFB'}}> Volunteer/Contact</button>

                    </div>
                </div>
            </div>
            </div>
        )
}
