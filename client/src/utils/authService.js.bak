import axios from "axios";

export default class AuthService {
    saveCredentials (accessToken, user) {
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
            ? JSON.parse(localStorage.getItem("user"))
            : undefined;
    }

    getToken () {
        return localStorage.getItem("token");
    }
}