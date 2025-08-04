import {loginSuccess} from '../redux/authSlice'




export const saveAuthToStorage =({ token, role })=>{
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
};

export const clearAuthFromStorage = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};

export const getAuthFromStorage = () => {
  return {
    token: localStorage.getItem("token"),
    role: localStorage.getItem("role")
  };
};



