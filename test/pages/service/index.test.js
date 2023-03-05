import "@testing-library/jest-dom";
import constant from "@/pages/constant";
import service from "@/pages/service";

const {BASE_URL} = constant;

describe('Login', () => {
    global.fetch = jest.fn();

    function mockLogin(accessToken) {
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve({access_token: accessToken})
        }));
    }

    beforeEach(() => {
        global.fetch.mockClear();
    });

    it('should access token is existed when success to login', async () => {
        const accessToken = "abc";
        mockLogin(accessToken);
        const username = "username";
        const password = "password";
        const params = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username: username, password: password})
        }

        const accessTokenResponse = await service.login("username", "password");

        expect(accessTokenResponse).toEqual(accessToken);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch.mock.calls[0][0]).toEqual(`${BASE_URL}authentication/login`);
        expect(fetch.mock.calls[0][1]).toEqual(params);
    });
});