import "@testing-library/jest-dom";
import constant from "@/pages/constant";
import service from "@/pages/service";
import axios from "axios";
import {when} from "jest-when";

const {BASE_URL} = constant;
jest.mock('axios');

describe('Login', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should access token is existed when success to login', async () => {
        const accessToken = "abc";
        const username = "username";
        const password = "password";
        const mockResult = {data: {access_token: accessToken}};
        const body = {
            username,
            password
        }
        when(axios.post)
            .calledWith(`${BASE_URL}authentication/login`, body)
            .mockResolvedValue(mockResult);

        const accessTokenResponse = await service.login(username, password);

        expect(accessTokenResponse).toEqual(accessToken);
        expect(axios.post).toHaveBeenCalledTimes(1);
    });
});