function Message({data,user}) {

   
    return ( 
        

        <div className='main-text'  style={data.uid === user.uid ? { flexDirection : 'row-reverse'} : {}}>
                <img src={data.avt} alt='avt'/>
                <div style={data.uid === user.uid ? { marginRight: '20px', backgroundColor:'#e5efff' } : {}} className='main-box'>
                    <span className='box-user'>{data.name}</span>
                    <p className='box-text'>{data.text}</p>
               </div>
        </div>

     );
}

export default Message;