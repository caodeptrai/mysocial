import React, { useState } from 'react';
import {useNavigate,Link} from 'react-router-dom';
import {  signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import './Auth.scss';


 const Login = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [validateMsg,setValidateMsg] = useState('');

  const navigate = useNavigate();

  // login with email
  const handleSubmit = async ()=> {
    const msg = {}
    if(!email) {
      msg.email = 'Vui lòng nhập email !'
      setValidateMsg(msg);
    //  return;
    }
    if(!password){
      msg.password = 'Vui lòng nhập mật khẩu !'
      setValidateMsg(msg);
     // return;
    }
    try {

      await signInWithEmailAndPassword(auth, email, password);
    
      navigate("/");
       
    }catch(err) {
     msg.mesasge = 'Email hoặc mật khẩu không chính xác !'
     setValidateMsg(msg)
    }
   
  };



  return (
    <div className='formContainer'>
        <div className="formWrapper">
            <span className="logo">Mysocial</span>
            <span className="title">Đăng nhập</span>

            <form>
                <input 
                  type="email" 
                  placeholder='abc@gmail.com'
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                />
                <p className='errorMsg'>{validateMsg.email}</p>
                <input 
                  type="password" 
                  placeholder='mật khẩu'
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}/>
                   <p className='errorMsg'>{validateMsg.password}</p>
                <button type='button' className='btn' onClick={handleSubmit}>Đăng nhập</button>
            </form>
            
                <p className='errorMsg'>{validateMsg.mesasge}</p>
            
            <p>Bạn chưa có tài khoản?<Link to="/register" style={{paddingLeft:4}}>Đăng ký</Link> </p>
        </div>
    </div>
  )
}
export default Login;
