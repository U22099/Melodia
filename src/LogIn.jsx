import { Link, useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa6'
import { useState, useEffect } from 'react'
import axios from 'axios'
import origin from '../config/origin.json'

const LogIn = () => {
    const [show, setShow] = useState(false);
    const reverse = () => {
        setShow(!show)
    }
    const [error, setError] = useState('');
    const [text, setText] = useState('Log In');
    const navigate = useNavigate();
    const auth = async (e) => {
        e.preventDefault();
        const input = document.getElementById('input');
        const pwd = document.getElementById('pwd');
        const check = document.getElementById('checkbox').checked;
        if (input && pwd) {
            try {
                setText(<a id="roll1"></a>);
                const url = origin.default.origin + '/auth';
                const response = await axios.post(url, {
                    'input': input.value.trim(),
                    'password': pwd.value,
                    'rememberMe': check
                },
                    {
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                if (response.status === 200) {
                    localStorage.setItem('accessToken', response.data.accessToken);
                    localStorage.setItem('refreshToken', response.data.refreshToken);
                    localStorage.setItem('_id', JSON.stringify({ id: response.data._id}));
                    navigate('/homepage', { replace: true });
                }
            } catch (err) {
                console.log(err);
                const data = err.response.data;
                setError(data.message);
                setText('Log in');
            }
        } else {
            setError('No username or password');
        }
    }
    useEffect(()=>{
      function reset(){
    const id = JSON.parse(localStorage.getItem('_id'))?.id
     return !id || id === ""
    }
        const refreshToken = localStorage.getItem('refreshToken');
        if(refreshToken&&!reset()) navigate('/homepage', { replace: true });
    }, [])
    return (
        <div className="flex flex-col justify-center md:p-[30px] rounded-[10px] align-center w-[80%] md:w-[50%] lg:w-[40%] bg-black md:bg-[var(--primary-color)] gap-[20px] my-[20px]">
            <header className="flex justify-start text-start w-[100%]">
                <h1 className="text-[1.5em] md:text-[2.4em] text-[var(--secondary-color)] font-extrabold">Log in to Melodia</h1>
            </header>
            <form action="" method="post" className="w-[100%] flex flex-col justify-start gap-[10px]">
                <p className="text-[1.1em] font-bold">Email or username</p>
                <input className="input" type="text" id="input" placeholder="Email or username" />
                <p className="text-[1.1em] font-bold">Password</p>
                <div className="relative text-center w-[100%] flex justify-start align-center">
                    <input className="input" id="pwd" type={show ? "text" : "password"} placeholder="Password" />
                    {show ? <FaEyeSlash className="absolute top-[40%] cursor-pointer left-[82%] transform scale-[1.2]" onClick={reverse} /> : <FaEye className="absolute cursor-pointer top-[40%] left-[82%] transform scale-[1.2]" onClick={reverse} />}
                </div>
                <p className={error === '' ? "hidden" : "text-[0.8em] font-bold text-red-500"}>{error}</p>
                <div className="flex mt-[10px] gap-[10px] justify-start w-[100%] text-white">
                    <input type="checkbox" name="Rem" id="checkbox" className="accent-green-500 transform scale-[1.3] hover:cursor-pointer" />
                    <label htmlFor="checkbox" className="text-[0.9em]">Remember me</label>
                </div>
                <button onClick={auth} className="mt-[20px] w-[88%] mx-auto hover:cursor-pointer justify-center text-center text-bold flex text-black bg-[var(--secondary-color)] border-0 py-2 px-6 focus:outline-none rounded-full text-lg font-extrabold" id="submit">
                    {text}
                </button>
            </form>
            <footer className="mt-[20px] flex flex-col gap-[20px] align-center justify-center text-center w-[100%]">
                <Link to="/forgotPassword" className="underline my-[10px] hover:cursor-pointer">Forgot your password</Link>
                <div className="gap-[20px]">
                    <p className="text-[var(--text-primary-color)] font-bold hover:cursor-pointer">Don't have an account?</p>
                    <Link to="/register" className="underline mt-[20px] hover:cursor-pointer">Sign up for Melodia</Link>
                </div>
            </footer>
        </div>
    )
}


export default LogIn
