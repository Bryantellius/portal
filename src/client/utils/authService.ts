import axios from "axios";

class AuthService {
    saveCredentials (accessToken: string, user: any) {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", accessToken);
        axios.defaults.headers.common["Authorization"] = `Bearer ${ accessToken }`;
    }

    logout () {
        delete axios.defaults.headers.common["Authorization"];
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }

    getUser () {
        return JSON.parse(localStorage.getItem("user"));
    }

    getToken () {
        return localStorage.getItem("token");
    }
}

export default AuthService;