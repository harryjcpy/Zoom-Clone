// import { createContext, useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export const AuthContext = createContext({});

// const client = axios.create({
//     baseURL: "localhost:8000/api/v1"
// })

// export default AuthProvider = ({children}) => {

//     const authContext = useContext(AuthContext)

//     [userData, setUserData] = useState(authContext);
    
//     const handleRegister = async(name, username, password) => {
//         try {
//             let request = await client.post("/register", {
//                 name,
//                 username,
//                 password
//             })

//             if(request.status === httpStatus.CREATED) {
//                 return request.data.message;
//             }
//         } catch (error) {
//             throw err;
//         }
//     }

//     const router = useNavigate();

//     const data = {
//         userData, setUserData, handleRegister
//     }

//     return (
//         <AuthContext.Provider value={data}>
//             {children}
//         </AuthContext.Provider>
//     )


// }

import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext({});

const client = axios.create({
    baseURL: "http://localhost:8000/api/v1"
});

const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);

    const router = useNavigate();

    const handleRegister = async (name, username, password) => {
        try {
            let request = await client.post("/register", {
                name,
                username,
                password
            });

            if (request.status === 201) { // Use 201 for CREATED
                return request.data.message;
            }
        } catch (error) {
            throw error;
        }
    };

    const handleLogin = async (username, password) => {
        try {
            let request = await client.post("/login", {
                username: username,
                password: password
            })

            if(request.status === 200){
                localStorage.setItem("token", request.data.token)
            }
        } catch(err){
            throw err;
        }
    }

    const data = {
        userData,
        setUserData,
        handleRegister
    };

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
};

// Default export for AuthProvider
export default AuthProvider;
