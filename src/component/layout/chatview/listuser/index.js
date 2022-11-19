import { useState } from "react";
import { BiCircle } from "react-icons/bi"
import { AiFillCheckCircle } from "react-icons/ai"

function Listuser({data,handleuser}) {

    const [add,setadd] = useState(false)

    const handleadd = (data) =>{
        setadd(!add);
        handleuser(data,!add)

    } 

    

    return ( 
       
            <li key={data.uid} className='model-list_item'>
                <img className='item-avt' src={data && data.photoURL} alt='avt' />
                <span className='item-name'>{data && data.displayName}</span>
                <span onClick={() => handleadd(data)} type="button" className="btn-add"> {add === false ? <BiCircle></BiCircle> : <span className="add"><AiFillCheckCircle></AiFillCheckCircle></span>}  </span>
            </li>
       
     );
}

export default Listuser;