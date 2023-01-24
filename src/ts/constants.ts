const baseUrl = 'https://auth-backend-gjj1.onrender.com/';
const signUp = `${baseUrl}auth/signup`;
const signIn = `${baseUrl}auth/signin`;
const user = `${baseUrl}users`;
const users = `${user}/users`;

const responseStatuses = {
  success: 200,
  status400: 400,
  status403: 403,
};

const emailValidation = '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';

export { signUp, signIn, user, users, responseStatuses, emailValidation };
