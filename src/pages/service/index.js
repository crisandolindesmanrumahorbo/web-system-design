import constant from "@/pages/constant";

const {BASE_URL} = constant;

const login = async (username, password) => {
    const body = {
        username: username,
        password: password,
    }
    const response = await fetch(`${BASE_URL}authentication/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body),
    });
    const {access_token} = await response.json();
    return access_token;
}

export default {
    login
};