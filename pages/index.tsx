import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

type List = {
  id: string;
  title: string;
  created_at: string;
};

const Home: NextPage = () => {
 

  const [currentName, setCurrentName] = useState("")


  async function getTimes() {

    const { data, error } = await supabase
    .from('climbs')
    .select()
    //.eq('user_id', "jonny")
    
    console.log("data",data)
  
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



  
  const setName = (e) => {
  
    console.log(e.target.value);
  
    document.cookie = "user_name=" + e.target.value;
    document.cookie = "user_id=" + Math.floor(Math.random()*999999999999999);

    setCurrentName(e.target.value)
  
  }
  
  
  useEffect(() => {
   
    setCurrentName(getCookie("user_name"))
  
  },[]);
  

  


  return (
    <div>

      <form action="/action_page.php">
        <label for="fname">Enter your name:</label>
        <input onChange={setName} type="text" id="fname" name="fname" value={currentName} />
       
       
      </form>

    </div>
  )

  
};

export default Home;
