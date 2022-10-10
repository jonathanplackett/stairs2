
import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';


const Start = () => {


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




  async function sendTime() {


   

    document.cookie = "climb_id=" + Math.floor(Math.random()*99999999999);

    console.log("user_name",getCookie("user_name"))

    const { data, error } = await supabase
    .from('climbs')
    .insert([
      { 
        user_name: getCookie("user_name"), 
        user_id: getCookie("user_id"),
        climb_id: getCookie("climb_id"),
        climb_start: Date.now() / 1000
      }
    ])

    console.log("error",error)
    console.log("data",data)

  }



  useEffect(() => {
   
    sendTime()

    setCurrentName(getCookie("user_name"))

  },[]);





 

  return (
    
    <div>Go GO Go!!! {currentName}</div>
  )
}

export default Start
