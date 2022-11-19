import { createContext, useMemo, useState } from "react";
import { authcontext } from "./usercontext";
import { useContext } from "react";
import useFirestore from "../../hooks/usefirestore";
export const grcontext = createContext();


function Roomcontext({children})
{
   
    const auth = useContext(authcontext);
    const [roomcurrent,setroomcurrent] = useState(null);

            const data = useMemo(()=>{
                return{
                    name:'member',
                    operator:'array-contains',
                    value: auth.uid
                }},[auth.uid]);  
            const room = useFirestore('room',data);    
            const handleroomfind = (room) =>
            {
                
             
                setroomcurrent(room);
               
            }
            
    return(

        <grcontext.Provider value={{room,handleroomfind,roomcurrent}}>
            {children}
        </grcontext.Provider>

    )

}
export default Roomcontext;

