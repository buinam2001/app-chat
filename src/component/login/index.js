import React from 'react';
import { signInWithPopup, GoogleAuthProvider  } from "firebase/auth";
import { auth } from "../../firebaseconfig";
import { FcGoogle } from "react-icons/fc";
import { RiSettings6Line } from "react-icons/ri";
import { getAdditionalUserInfo } from 'firebase/auth';
import { add } from '../../methodfirebase';
import { generateKeywords } from '../../methodfirebase';


function Login() {
   
    const handlelogin = () =>{  
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).then((data)=>{
        const {displayName , email ,photoURL , uid} = data.user;   
        const checkuser = getAdditionalUserInfo(data);
            if(checkuser.isNewUser)
            {
              add('users',{
                       uid,
                       displayName,
                       email,
                       photoURL,
                       keywords: generateKeywords(displayName)
                  });     
            }

    })
   
   
}


    return (       
            <div className="box">

                    <div className='box_login'>
                        <div className='login_left'>
                            <div className='login_left--icon'>
                                <RiSettings6Line></RiSettings6Line>
                            </div>

                        </div>
                        <div className='login_right'>
                            <div className='login_right--content'>
                                    <h2 className='content_title'>
                                        chào mừng đến với momo chat
                                    </h2>
                                    <img className='content_img' src='https://img.freepik.com/free-vector/young-people-standing-talking-each-other-speech-bubble-smartphone-girl-flat-vector-illustration-communication-discussion_74855-8741.jpg' alt='logo app' />
                            </div>
                            <div className='login_right--box'>
                                <div className="d-flex justify-content-center">
                                        <div onClick={handlelogin} className="login d-flex">
                                            <span className="login-icon">
                                                <FcGoogle></FcGoogle>
                                            </span>
                                            <p className="login-text">
                                               đăng nhập google
                                            </p>
                                        </div>
                                </div>

                            <div className="d-flex justify-content-center">
                                    <div className="login d-flex">
                                        <span className="login-icon">
                                            <FcGoogle></FcGoogle>
                                        </span>
                                        <p className="login-text">
                                         <a href="https://accounts.google.com/signup/v2/webcreateaccount?continue=https%3A%2F%2Fmyaccount.google.com%3Futm_source%3Daccount-marketing-page%26utm_medium%3Dcreate-account-button&flowName=GlifWebSignIn&flowEntry=SignUp" className="singup">       
                                           đăng ký google             
                                          </a>
                                        </p>
                                    </div>
                            </div>
                         </div>


                        </div>
                    </div>


            </div>
    
);
}

export default Login;