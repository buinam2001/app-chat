import { BsChatDots } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { signOut  } from "firebase/auth";
import { auth } from '../../../firebaseconfig';
import { authcontext } from '../../context/usercontext';
import { useContext } from 'react';


function User() {
    const data = useContext(authcontext);
    const hanldelogout = () =>
    {
        signOut(auth)
    } 
   
    return ( 
    
        <div className="container">
        <div className="sidebar">
            <div className="sidebar-avt">
                  <img src={data ? data.photoURL : null} alt="avt" />   
            </div>

            <div className="sidebar-chat">
               <BsChatDots/>
            </div>
            <div className="sidebar-chat">
             
            </div>
            <div className="sidebar-chat">
             
            </div>
            <div className="sidebar-chat">
              
            </div>
            <div className="sidebar-chat">
              
            </div>


            <div onClick={hanldelogout} className="sidebar-setting">
                <FiLogOut/>
            </div>
          

        </div>
    </div>
    
    
    );
}

export default User;