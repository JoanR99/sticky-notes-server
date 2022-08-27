import { LoginCredentials, RegisterCredentials } from '../types/Auth';
import { baseRequest, privateRequest } from './baseRequest';

export const register = async (credentials: RegisterCredentials) => {
	const response = await baseRequest.post(`/users/register`, credentials);

	return response.data;
};

export const login = async (credentials: LoginCredentials) => {
	const response = await baseRequest.post(`/auth/login`, credentials);
	return response.data;
};

export const logout = async () => {
	const response = await privateRequest.get(`/auth/logout`);
	return response.data;
};

export const getRefreshToken = async () => {
	const response = await privateRequest.get('/auth/refresh');
	return response.data;
};