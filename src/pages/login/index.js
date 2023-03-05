import React, {useState} from 'react';
import service from "@/pages/service";
import {useRouter} from "next/router";

export default function LoginIndexPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const _handleLogin = async () => {
        try {
            await service.login(username, password);
            const ROUTE_NAME = '/dashboard';
            await router.push(ROUTE_NAME);
        } catch (e) {
            alert("invalid username/password");
        }
    }

    return (
        <div>
            <label data-testid="l-username">username</label>
            <input data-testid="i-username" type="text" onChange={(e) => setUsername(e.target.value)}/>
            <label data-testid="l-password">password</label>
            <input data-testid="i-password" type="text" onChange={(e) => setPassword(e.target.value)}/>
            <button data-testid="button" type="submit" onClick={async () => await _handleLogin()}>Submit
            </button>
        </div>
    )
}