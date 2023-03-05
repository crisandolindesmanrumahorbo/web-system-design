import React, {useState} from 'react';
import service from "@/pages/service";

export default function LoginIndexPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div>
            <p data-testid="p-username">username:</p>
            <input data-testid="i-username" type="text" onChange={(e) => setUsername(e.target.value)}/>
            <p data-testid="p-password">password:</p>
            <input data-testid="i-password" type="text" onChange={(e) => setPassword(e.target.value)}/>
            <button data-testid="button" type="submit" onClick={async () => await service.login(username, password)}>Submit
            </button>
        </div>
    )
}