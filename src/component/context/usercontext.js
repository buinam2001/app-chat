import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebaseconfig";
export const authcontext = createContext();


function Usercontext({children}) {

    const [user,setuser] = useState('');
    
    let navigate = useNavigate();

    useEffect(()=>
    {
        auth.onAuthStateChanged((data)=>{
            if(data)
            {
                const {displayName , email ,photoURL , uid} = data
                setuser({
                    uid,
                    displayName,
                    email,
                    photoURL
                });
                navigate("/");  
            }
            else
            {
                navigate("/login");
            }
        })
    },[navigate]);



    return ( 

        <authcontext.Provider value={user}>
            {children}
        </authcontext.Provider>

     );
}

export default Usercontext;