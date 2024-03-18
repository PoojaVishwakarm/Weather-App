import  { useState,useEffect } from 'react';


import './index.css'


function Index() {
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      setDate(now);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  },[]);
  
  const [city,setCity]=useState("")
  const[search,setSearch]=useState('')
    

       //const  API_key="54869790a505344fe7f90c06f6a2349a";
       const handleclick=()=>{
        const apiurl=(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=f3b990e321bcd83dfa154ddc746913bd&units=metric`);
        const fetchdata=async()=>{
        const response=await fetch(apiurl);
        const data=await response.json(); 
        console.log(data)
          setCity(data);
               }
          fetchdata();
       }
     

  
         
       

  return (
    <>
      <header className="container">
        <div className="input-icons">
          <input
            type="text"
            className="input-field"
            placeholder="Search for a weather"
            onChange={(e)=>setSearch(e.target.value)}
          
          />
               <button onClick={handleclick}><i className="fa-solid fa-location-dot icons"></i></button>
        </div>  
        {!city ?(
          <p>data not found</p>):(
            <>
            <main>
            <div className='clock'>
                 <div> 
                  <h4>{date.toLocaleDateString("en-In", { month: "short",day:"2-digit",year:"2-digit" })}</h4>
                 </div> 
                  <div>
                  {date.toLocaleTimeString('en-In',{hour:"numeric",minute:"numeric"})} 
                  </div>    
            </div>
            <div className='clock'>
               <div>
                  <h2>{ Math.round(city.main.temp)}°C</h2>
               </div>
               <div>
                <img src="src\Component\animated\cloudysave.svg" alt="" />
                {/* <h4>{city.weather[0]}</h4> */}
                <h4>{city.weather[0].description}</h4>
               </div>
            </div>
            <div className='sub-clock'>
               <h5><i className="fa-solid fa-location-dot icons"></i></h5>
                 <h4>{search}</h4>
            </div>
          </main>
           <section>
              <div className='game'> 
                <div className='sub-game'> 
                  <i className="fa-solid fa-temperature-half"></i>
                  <i className="fa-sharp fa-solid fa-person"></i>
                  <h4>Humidity</h4>
                  <h4>{Math.round(city.main.humidity)}%</h4>
                  
                   </div>
                <div className='sub-game'>
                  <i className="fa-sharp fa-solid fa-wind"></i>   
                  <h4>Wind</h4>
                  <h4>{Math.round(city.wind.speed)}Km/h</h4>
                </div>
              </div>

              <div className='game'>
                <div className='sub-game'>
                <i className="fa-solid fa-temperature-low"></i>                 
                 <h4>Feels like</h4>
                 <h4>{Math.round(city.main.feels_like)} °C</h4>
                </div>
                <div className='sub-game'>
                <i className="fa-solid fa-snowflake"></i>
                  <h4> air quelity</h4>
                </div>
              </div>
           </section>
           </>
          )}
         
         </header>
      
    </>
  );
}

export default Index 
