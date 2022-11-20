import { useRef, useState } from 'react';
import { useContext } from 'react';
import { add } from '../../../methodfirebase';
import { authcontext } from '../../context/usercontext';
import { BiSearch } from 'react-icons/bi';
import { MdOutlineGroupAdd } from 'react-icons/md';
import { AiOutlineClose } from 'react-icons/ai';
import { grcontext } from '../../context/roomcontext';
import { serverTimestamp } from "firebase/firestore";
import Loadroom from '../../loading/loadingroom';
// import useFirestoremess from '../../../hooks/usefirestoremess';
import { random } from '../../../random';

function Roomchat({handledisplay}) {

    const [valueroom ,setvalueroom] = useState('');

    const i = Math.floor(Math.random() * random.length);
   
      


    const {room , handleroomfind } = useContext(grcontext);
    const [ roomname , setroomname] = useState("")
    const currentuser = useContext(authcontext);
    const elm = useRef();
    const model = useRef();

    const handleadd = () =>{
        model.current.style.display = "block"
        elm.current.style.transform = "scale(1)";
   
    }

    const handleclose = () =>{
        elm.current.style.transform = "scale(0)";
        model.current.style.display = "none"   
        setvalueroom('')
        
    }
    const handleaddroom = () =>{
        elm.current.style.transform = "scale(0)";
        model.current.style.display = "none"   
       
        setvalueroom("")
        if(valueroom.length > 0){
            add('room',{
                name:valueroom,
                createdAt:serverTimestamp(),
                roomimg:random[i],
                member:[
                    currentuser.uid
                ]   
            })  
        }
    } 

    const handleroom = (data) =>{
        
        handleroomfind(data);
        setroomname(data.name);
        handledisplay();

    }

    
    // const mess = useFirestoremess('message');
    // const index = mess && mess.length - 1;
  
    
   

    
    return ( 
        
        
        <div className='room'>

            <div ref={model} className='model'>

            </div>

            <div ref={elm} className='model-box'>
                <div className='model-box_title'>
                    <h5> tạo nhóm mới</h5>
                    <div onClick={handleclose} className='close'><AiOutlineClose></AiOutlineClose></div>
                </div>

                <input value={valueroom} onChange={(e)=>setvalueroom(e.target.value)} className='model-box_add' placeholder='tạo nhóm mới' type='text'  />
                <div className='model-box_btn'>
                    <button type="button" onClick={handleclose} className="btn-exit btn btn-light">huỷ</button>
                    <button onClick={handleaddroom} type="button" className="btn-create btn btn-primary">tạo nhóm</button>
                </div>
          </div>




            <div  className='room-header'>
                <div className='room-header_search'>
                <span><BiSearch></BiSearch></span>
                    <input type='text' placeholder='tìm kiếm' />
                </div>
                <div onClick={handleadd} className='room-header_add'>
                    <MdOutlineGroupAdd></MdOutlineGroupAdd>
                </div>
            </div>

   
    <div className='room_wapper'>

    {

       room === null ? <Loadroom></Loadroom> : room.map((data)=>{

            return(
                <div key={data.id} onClick={() => handleroom(data)} style={roomname === data.name ? {backgroundColor : "#e1e3e6"} : {}} className='room-main'>
                <div className='room-chat'>
                    
                    <div className='room-img'>
                        <img src={data.roomimg} alt='room-img' />
                    </div>
                    <div className='room-name'>
                        <p className='room-name-title'>
                            {data.name}
                        </p>
                        <p className='room-name-user'>
                          {/* {mess !== null && mess.length ? mess[index].name : <p></p>} 
                          : {mess && mess[index].text} */}
                        </p>
                    </div>
                </div>        
            </div>
            )

        }) 


    }

</div>

    




    
</div>      

);
}

export default Roomchat;