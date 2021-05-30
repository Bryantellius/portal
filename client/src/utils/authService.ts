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
        return localStorage.getItem("user")
            ? JSON.parse(<string>localStorage.getItem("user"))
            : undefined;
    }

    getToken () {
        return localStorage.getItem("token");
    }
}

export default AuthService;