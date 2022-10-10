
import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';


const Leaderboard = () => {
 

  const [currentName, setCurrentName] = useState("")

  const [allTimes, setAllTimes] = useState()


  async function getTimes() {

    const { data, error } = await supabase
    .from('climbs')
    .select()
    .not( "time_taken", "is", "null" )

    
    .order('time_taken', { ascending: true })
    
    console.log("data",data)

    setAllTimes(data)
  
  }





  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }




  
  useEffect(() => {
   
    getTimes()
  
  },[]);
  

  


  return (
    <div>



        {allTimes ? allTimes.map( (time, index) => (<div>{index+1}: {time.user_name} | {time.time_taken.toFixed(3)}</div>) ) : <></>}


    </div>
  )


};

export default Leaderboard;
