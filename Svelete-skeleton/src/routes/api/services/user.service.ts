//import { BACKEND_API_URL } from "$env/static/private";
import * as dotenv from 'dotenv';

dotenv.config();

const BACKEND_API_URL = process.env.BACKEND_API_URL

export const registerUser = async (
  firstName: string,
  email: string

) => {

  const model = {
      name: firstName,
      email: email,
  };
  console.log("model",model);
  
  console.log(JSON.stringify(model, null, 2))

  const headers = {};
  headers['Content-Type'] = 'application/json';
  const body = JSON.stringify(model);
  const url = BACKEND_API_URL + '/user/';
  console.log("Backend-url", url);

  const res = await fetch(url, {
      method: 'POST',
      body,
      headers
  });
  const response = await res.json();
  console.log("response", response);
  return response;
};

export const getUserById = async (
  userId : string
) => {

  const headers = {};
  headers['Content-Type'] = 'application/json';
  const url = BACKEND_API_URL + `/user/${userId}`;
  const res = await fetch(url, {
      method: 'GET',
      headers
  });
  const response = await res.json();
  console.log("response", response);
  return response;
};