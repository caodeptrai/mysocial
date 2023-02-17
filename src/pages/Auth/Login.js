import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';
import './Auth.scss';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validateMsg, setValidateMsg] = useState('');
    const [err, setErr] = useState(false);
    const navigate = useNavigate();

    // login with email
    const handleSubmit = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (err) {
            setErr(true);
        }
    };

    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Mysocial</span>
                <span className="title">Đăng nhập</span>

                <form>
                    <input
                        type="email"
                        placeholder="abc@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <p className="errorMsg">{validateMsg.email}</p>
                    <input
                        type="password"
                        placeholder="mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {err && <p className="errorMsg">Có lỗi vui lòng kiểm tra lại !!!</p>}
                    <button type="button" className="btn" onClick={handleSubmit}>
                        Đăng nhập
                    </button>
                </form>

                <p>
                    Bạn chưa có tài khoản?
                    <Link to="/register" style={{ paddingLeft: 4 }}>
                        Đăng ký
                    </Link>{' '}
                </p>
            </div>
        </div>
    );
};
export default Login;
