import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogin } from "../../redux/userSlice";
import { message } from "antd";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "http://localhost:8080/api/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );
    if(response.status !== 200){
      message.error("Giriş başarısız!");
    }
    
    if(response.ok){
      const user = await response.json();
      localStorage.setItem('user', JSON.stringify(user));
      dispatch(userLogin(user));
      navigate("/admin");
    }
  };
  return (
    <div className="bg-gray-800 h-screen text-white flex flex-col items-center">
      <div className="w-[700px] p-5">
        <div className="flex flex-col items-center">
          <img src="assets/login.svg" alt="login" className="w-52" />
          <h1 className="text-3xl font-bold my-2">IPSS Admin / Giriş Yap</h1>
        </div>
        <div className="">
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <label htmlFor="nickname">E-Posta Adresi</label>
            <input id="email" name="email" type="email" className="bg-black text-green-700 mb-2 rounded-lg p-2" onChange={(e) => {setEmail(e.target.value)}}/>
            <label htmlFor="password">Parola</label>
            <input id="password" name="password" type="password" className="bg-black text-green-700 rounded-lg p-2" onChange={(e) => {setPassword(e.target.value)}}/>
            <button type="submit" className="w-full bg-color p-2 rounded-lg mt-4">Giriş Yap</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
