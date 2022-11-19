import React, { useState } from 'react';
import User from './user/user';
import Roomchat from './roomchat/roomchat';
import Chatview from './chatview/chatview';

function Layout() {

    const [chatdisplay, setchatdisplay] = useState(false);

   const handledisplay = () =>{

    setchatdisplay(true);


   }
   
  const handledisplaychat = () => {

    setchatdisplay(false);


  }

  const classroom = () => {
    let classes = "col-10 col-lg-3 boder";
    classes += (chatdisplay) ? " displaynone" : " displayblock";
    return classes;
  }



   const classview = () =>{
    let classes = "col-10 col-lg-8 disview"; 
    classes += (chatdisplay) ? " displayblock" : " displaynone";
    return classes;
   }

    return ( 
        <div className="wapper">     
          <div className="d-flex">
                    <div className="col-2 col-lg-1 bg-sidebar">
                        <User ></User>
                    </div>  
                    <div className={classroom()}> 
                      <Roomchat handledisplay={handledisplay}></Roomchat>  
                    </div>
                    <div className={classview()}  >
                        <Chatview handledisplaychat={handledisplaychat}  ></Chatview>    
                    </div>
         </div>   
     </div>

     );
}

export default Layout