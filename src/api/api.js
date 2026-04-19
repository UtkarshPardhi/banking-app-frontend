import { data } from "react-router-dom";
import { BASE_URL } from "@/config";

//const BASE_URL = "http://localhost:8080"; // LOcal
const BASE_URL = `${BASE_URL}/api/accounts`;

export const loginAPI = async (data) => {
    return fetch(BASE_URL + "/api/auth/login", {
        method : "POST",
        headers : {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
};

export const getUserAPI = async () => {
    const token = localStorage.getItem("token");

    return fetch(BASE_URL + "/api/user/test", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};