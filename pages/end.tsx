import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';


const End: NextPage = () => {



  const [currentName, setCurrentName] = useState("")




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


  async function getTime() {

    console.log("user_name",getCookie("user_name"))
    console.log("user_id",getCookie("user_id"))
    console.log("climb_id",getCookie("climb_id"))

    const response = await supabase
    .from('climbs')
    .select()
    .eq('user_id', getCookie("user_id"))
    .eq('climb_id', getCookie("climb_id"))
    
    console.log("data",response.data)
    console.log("error",response.error)


    if(response.data.length == 0)
    {
      setError("no_start")
    }

    else
    {
        let time_taken = response.data[0].time_taken

        if(time_taken)
        {
          setError("already_ended")

          setTimeTaken(time_taken)
        }


        else
        {

          const climb_start = response.data[0].climb_start

        

          time_taken = Date.now() / 1000 - climb_start
  
          const response2 = await supabase
          .from('climbs')
          .update({ climb_end: Date.now() / 1000, time_taken: time_taken})
          .eq('user_id', getCookie("user_id"))
          .eq('climb_id', getCookie("climb_id"))
          
          console.log("data",response2.data)
          console.log("error",response2.error)
  
  
          setTimeTaken(time_taken)


        }

       

        

    }

    

  }
  
  const [error, setError] = useState("")

  const [timeTaken, setTimeTaken] = useState(-1)

  
  useEffect(() => {
   
    getTime()

    setCurrentName(getCookie("user_name"))

  },[]);




  return ( 
  
  <div>

    {timeTaken > 0 ? currentName + " took: " + timeTaken.toFixed(3) + " seconds" : ""}

  </div> 
  
  
  )
}

export default End
