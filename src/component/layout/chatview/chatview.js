import { useEffect, useRef, useState } from 'react';
import { FiUsers,FiUserPlus } from 'react-icons/fi';
import { BiSearch } from 'react-icons/bi';
import { AiOutlineSend } from 'react-icons/ai';
import { MdInsertEmoticon } from 'react-icons/md';
import { AiOutlineClose } from 'react-icons/ai';
import { IoIosArrowBack } from 'react-icons/io';
import { GrFormNext } from 'react-icons/gr';
import { db } from '../../../firebaseconfig';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { add } from '../../../methodfirebase';
import { useContext } from 'react';
import { authcontext } from '../../context/usercontext';
import Message from './message';
import { serverTimestamp } from "firebase/firestore";
import Listuser from './listuser';
import Loaduser from '../../loading/loadinguser';
import useFirestoremess from '../../../hooks/usefirestoremess';
import { grcontext } from '../../context/roomcontext';
import Picker from 'emoji-picker-react';


function Chatview({handledisplaychat}) {


    const {roomcurrent} = useContext(grcontext);
    const [isload,setisload] = useState(null);
    const [valuemember,setvaluemember] = useState('');
    const [searchuser,setsearchuser ] = useState([]);
    const [message,setmessage] = useState('');
    const [userlist,setuserlist] = useState([]);
    const [result ,setresult] = useState('');
    const user = useContext(authcontext);
    const elm = useRef();
    const model = useRef();
    const elmchat = useRef();    


    // useEffect(()=>{
    //     const elm = elmchat.current;
    //     const scroll = elmchat.current.scrollHeight;
    //     elm.scrollTop=scroll; 
    // },[message])
  
    


    const handleback = () =>{

        handledisplaychat();

    }


    const handleclose = () =>{
     
        elm.current.style.transform = "scale(0)";
        model.current.style.display = "none" ;
        setvaluemember('');
        setuserlist([]);
        
    }

   
    const handleaddmember = () =>{
        model.current.style.display = "block"   
        elm.current.style.transform = "scale(1)";
    }

    const handleaddroom = () =>{
        elm.current.style.transform = "scale(0)";
        model.current.style.display = "none" ;
        setvaluemember('');
        const roomupdate = doc(db,"room",roomcurrent.id);
        updateDoc(roomupdate, {
                    member: [...roomcurrent.member,...userlist]
             })
    }
   
    const handleuser = (value,add) =>{

        if(add)
        {
            setuserlist((user)=>{
                    return[...user,value.uid]
            })
        }
        else{
            let index;
                for(let i = 0 ; i < userlist.length ; i++)
                {
                        if(userlist[i].uid === value.uid)
                        {
                            index = i;
                        }                
                }  
                userlist.splice(index,1);
                setuserlist((user)=>{
                    return user
                 })
        } 
    }
   
    useEffect(()=>{

        if(roomcurrent !== null)
        {
            var scroll =  elmchat.current.scrollHeight;   
            elmchat.current.scrollTop = scroll;
        }

    },[roomcurrent])

    const handlesend = () =>{

    setmessage('');

        if(message.length)
        {
            add('message',{
                roomid:roomcurrent.id,
                uid:user.uid,
                avt:user.photoURL,
                text:message,
                name:user.displayName,
                createdAt:serverTimestamp()
               
            }).then(()=>{
                
                const elm = elmchat.current;
                const scroll = elmchat.current.scrollHeight;
                elm.scrollTop=scroll;     
            })

        }      
        
    } 


    useEffect(()=>{
       const claer = setTimeout(()=>{
        const q = query(collection(db, "users"), where("keywords", "array-contains", valuemember));
            onSnapshot(q, (querySnapshot) => {
                const users = [];     
                querySnapshot.forEach((doc) => {
                        users.push(doc.data());
                }); 
                setsearchuser(users);
                if(users.length === 0 && valuemember.length > 0)
                {
                    setresult("tài khoản không tồn tại");
                    setisload(false);
                  
                }
                else if(users.length > 0 && valuemember.length > 0){
                    setresult("");
                    setisload(false);
                }        
        });         
        },1000);
        return () =>{  
            clearTimeout(claer);  
        }  
    },[valuemember])

  
    
    useEffect(()=>
    {

        if(valuemember.length > 0)
        {
            setisload(true);
            setresult("");
        }
        else{
            setresult("");
            setisload(false);
        }

    },[valuemember])


            const chat = useFirestoremess('message');
            function rendermess() 
            {
                if(roomcurrent !== null)
                {        
                    const elm = elmchat.current;
                    if(elm)
                    {               
                        const scroll = elm && elmchat.current.scrollHeight;
                        elm.scrollTop= scroll ; 
                    }
                     
                const mess = chat && chat.filter(dataroom => dataroom.roomid === roomcurrent.id)
                    .map((data) => <Message key={data.id} user={user} data={data}></Message>);
                      
                    return mess;

                


                }         
            }
         
            function renderusers(){      
                        let data = searchuser.filter(value =>{

                            return roomcurrent.member.indexOf(value.uid) < 0;
                    
                        })
                      
                        return data.map((data)=>{
                            
                                return <Listuser key={data.uid} handleuser={handleuser} data={data}></Listuser> 

                        })
                } 

        const handlekay = (e) =>{
            if(e.code === 'Enter')
            {

                setmessage('');

                if(message.length)
                {
                    add('message',{
                        roomid:roomcurrent.id,
                        uid:user.uid,
                        avt:user.photoURL,
                        text:message,
                        name:user.displayName,
                        createdAt:serverTimestamp()
                       
                    }).then(()=>{
                        
                        const elm = elmchat.current;
                        const scroll = elmchat.current.scrollHeight;
                        elm.scrollTop=scroll;     
                    })
        
                }

            }
            
        }

        const handledisplayicon = () =>{

            setdisplayicon(value => !value);
        }
      
      
        const [displayicon , setdisplayicon] = useState(false)

        const onEmojiClick = (event, emojiObject) => {
            setmessage((value) => [...value,emojiObject.emoji].join(''));

         
           
        };

     
        const slider = useRef();
        const img_width = useRef();
        const widthslider = useRef(0);
     


        const handlebackslider = () =>{
            const width = img_width.current.clientWidth;
            const value = widthslider.current += width;
            slider.current.style.transform = `translateX( ${value}px)`;
            if(value === width)
            {   

                slider.current.style.transform = `translateX( ${-value * 4}px)`;
                widthslider.current = -1520 + 380 

            }
        }

        const handlenextslider = () =>{
            const width = img_width.current.clientWidth;
            const value = widthslider.current -= width;
            slider.current.style.transform = `translateX( ${value}px)`;
            if(value === -width*5)
            {
                slider.current.style.transform = `translateX( ${0}px)`;
                widthslider.current = 0
                
            }

        }

    return ( 
    roomcurrent === null ? 
      <>
        <h1 className='header_title'>Chào mừng đến với mona chat</h1>
        <div className='header_text'>
        Khám phá những tiện ích hỗ trợ làm việc và trò chuyện cùng
         người thân, bạn bè được tối ưu hoá cho máy tính của bạn.
        </div>
            <div onClick={handlebackslider} className='slider_back'> 
            <IoIosArrowBack></IoIosArrowBack>
            </div>
            <div className='slider_wapper'>
                    <div className='slider_center'>
                        <div ref={slider} className='chat_slider'>
                        <div ref={img_width} className='slider_box'>
                                <img className='slider_img' src='https://chat.zalo.me/assets/quick-message-onboard.3950179c175f636e91e3169b65d1b3e2.png' alt='slider' />
                        </div>
                        <div className='slider_box'>
                                <img className='slider_img' src='https://chat.zalo.me/assets/vanish_onboard.95edcd15d875cae4d6d504d739eaa977.png' alt='slider' />
                        </div>
                        <div className='slider_box'>
                                <img className='slider_img' src='https://chat.zalo.me/assets/inapp-welcome-screen-0.19afb7ab96c7506bb92b41134c4e334c.jpg' alt='slider' />
                        </div>
                        <div className='slider_box'>
                                <img className='slider_img' src='https://chat.zalo.me/assets/inapp-welcome-screen-04.ade93b965a968b16f2203e9d63b283a7.jpg' alt='slider' />
                        </div>
                        <div className='slider_box'>
                                <img className='slider_img' src='https://chat.zalo.me/assets/inapp-welcome-screen-01.469ad7daf26e0303dd0d54eb5262e795.jpg' alt='slider' />
                        </div>
                        </div>        
                    </div>
            </div>
            <div onClick={handlenextslider}  className='slider_next'> 
                <GrFormNext></GrFormNext>
            </div> 
        </>  :
        <div className='chat'>
            <div ref={model} id='model-1'></div>
            <div ref={elm} className='model-box'>
                        <div className='model-box_title'> 
                            <h5>mời thành viên </h5>
                            <div onClick={handleclose} className='close'><AiOutlineClose></AiOutlineClose></div>
                        </div>

                <div className='room-header_search mt-3'>
                    
                    <span><BiSearch></BiSearch></span>
                        <input value={valuemember} onChange={(e)=>setvaluemember(e.target.value)} type='text' placeholder='tạo nhóm mới' />
                 </div>

                 <ul className='model-list'>
                      {
                        result.length > 0 ? <div className='result'> {result} </div> : <div></div>
                      } 
                        
                    {                          
                       isload === true ? <Loaduser></Loaduser> :  renderusers()
                            
                    }

                           
                    </ul>
                <div className='model-box_btn'>
                    <button type="button" className="btn-exit btn btn-light" onClick={handleclose} >huỷ</button>
                    <button type="button" className="btn-create btn btn-primary" onClick={handleaddroom}>mời</button>
                </div>
          </div>

        <div className='chat-header'>
                <div className='chat-box'>
                                <div onClick={handleback} className='chat-back'>
                                    <IoIosArrowBack></IoIosArrowBack>
                                </div>
                    <img src={roomcurrent && roomcurrent.roomimg} className='chat-img' alt='name-room' />

                    <div className='chat-text'>
                            

                            <p className='box-name'>
                               {roomcurrent && roomcurrent.name}
                             
                            </p>
                          
                            <div className='box-member'>
                                <span>
                                <FiUsers></FiUsers>  

                                </span>
                                <span className='icon-member'>
                                    {roomcurrent && roomcurrent.member.length } thành viên                     
                                </span> 
                                {/* 
                                <div className='box-member_user'>
                                    <ul className='user_list'>
                                        <li className='user_list-item'>
                                            <span>

                                            </span>
                                        </li>
                                    </ul>
                                    
                                </div> */}
                            </div>
                    </div>
                </div>
                <div className='chat-add'>
                    <div onClick={handleaddmember} className='icon-add'>
                        <FiUserPlus></FiUserPlus>  
                    </div>
                  
            </div>
        </div>
        <div className='chat-main' ref={elmchat}>
            <div className='main-body'>
              {
                rendermess()            
              }
            </div>
           
          
        </div>
        <div className='chat-bottom'>
            <div className='bottom-box'>
                <input onKeyDown={handlekay} value={message} onChange={(e) => setmessage(e.target.value)} className='box-input' placeholder='nhắn tin với nhóm' type='text' />
                <div className='box-icon'>
                    <div  className='icon-upfile'>  
                        <div onClick={handledisplayicon}>
                             <MdInsertEmoticon></MdInsertEmoticon>
                            
                        </div>
                        <div className='upfile-dispalay'>

                            {
                                displayicon === false ? <div></div> :  <Picker onEmojiClick={onEmojiClick} />
                            }
                        

                        </div>
                    </div>
                    <div onClick={handlesend} className='icon-send'>
                        <AiOutlineSend></AiOutlineSend>
                    </div>
                </div>

            </div>
        </div>
  
   </div>
     );
}

export default Chatview;