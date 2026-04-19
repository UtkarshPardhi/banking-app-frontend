import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "@/config";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function Login() {
    const [form, setForm] = useState({
       username: "",
       password: "", 
    });
    const navigate = useNavigate();
    const [showPassword,setShowPassword] = useState(false);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(form);
        setError("");
        setLoading(true);

        // try {
        //     const res = await axios.post(
        //         "http://localhost:8080/api/auth/login",
        //         form
        //     ); // Local

        
        try {
            const res = await axios.post(
                `${BASE_URL}/api/auth/login`,
                form
            );


            localStorage.setItem("token", res.data.token);
            // window.location.href = "/dashboard";
            //setIsLoggedIn(true);
            window.dispatchEvent(new Event("storage"));
            navigate("/dashboard", { replace: true });
        } catch (err) {
            setError("Invalid username or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-gray-200">
            <Card className="w-[380px] shadow-x1">
                <CardHeader>
                    <p className="text-center text-blue-600 font-semibold">MyBank</p>
                    <CardTitle className="text-center text-2xl font-bold">
                        Welcome Back
                    </CardTitle>
                    <p className="text-center text-sm text-gray-500">
                        Login to your banking account
                    </p>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-5">

                        <div className="space-y-2">
                            <label className="font-medium text-gray-700">Username</label>
                            <Input
                                //className="py-2"
                                className="py-2 bg-white border border-gray-300 focus:ring-2 focus:ring-blue-400"
                                name="username"
                                placeholder="Enter username"
                                value={form.username}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="font-medium text-gray-700 block mb-1">Password</Label>

                            <div className="relative">
                            <Input
                                className="py-2 pr-16 bg-white border border-gray-300 focus:ring-2 focus:ring-blue-400"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter password"
                                value={form.password}
                                onChange={handleChange}
                                required
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-600"
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                        </div>

                        {error && (
                            <p className="text-red-500 text-sm">{error}</p>
                        )}

                        <Button className="w-full mt-3 text-white hover:scale-[1.02] transition" disabled={loading}>
                            {loading ? "Please wait..." : "Login"}
                        </Button>
                         </div>
                        </form>
                </CardContent>

            </Card>
        </div>
    )
}