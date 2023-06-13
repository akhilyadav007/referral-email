import axios from "axios";
const baseURL = "http://localhost:3000";
const SignUp_URL = `${baseURL}/users/registration`;
const Login_URL = `${baseURL}/users/login`;
const Send_Mail_URL = `${baseURL}/send_referral_email`;
const Get_All_User_URL = `${baseURL}/home/index`;

const Axiosinstance = axios.create({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/Json",
  },
});

const SignUpUser = (credential) => {
  return axios.post(SignUp_URL, credential);
};

const LoginUser = (credential) => {
  return Axiosinstance.post(Login_URL, credential);
};

const SendMail = (mailId) => {
 let email = {'email' : mailId}
  return Axiosinstance.post(Send_Mail_URL,email);
};

const GetUser = () => {
  return Axiosinstance.get(Get_All_User_URL);
};

export { SignUpUser, LoginUser, SendMail, GetUser };
