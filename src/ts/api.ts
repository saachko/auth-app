import { responseStatuses, signIn, signUp, user, users } from './constants';
import { LoginUserData, RegistrationUserData, Token, User } from './interfaces';

const signInUser = async (userData: LoginUserData) => {
  try {
    const response = await fetch(`${signIn}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (
      response.status === responseStatuses.status400 ||
      response.status === responseStatuses.status403
    ) {
      return {
        status: response.status,
        message: (await response.json()).message,
      };
    }
    const token: Token = await response.json();
    localStorage.setItem('accessUserToken', JSON.stringify(token.token));
    return {
      status: response.status,
      message: 'You have logged in',
    };
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const signUpUser = async (userData: RegistrationUserData) => {
  try {
    const response = await fetch(`${signUp}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    await signInUser({ email: userData.email, password: userData.password });
    return {
      status: response.status,
      message: (await response.json()).message,
    };
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const getUsers = async (token: string) => {
  try {
    const response = await fetch(`${users}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });
    const usersList: User[] = await response.json();
    return usersList;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const getUserById = async (userId: string, token: string) => {
  try {
    const response = await fetch(`${user}/${userId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });
    const foundUser: User = await response.json();
    return foundUser;
  } catch (error) {
    localStorage.removeItem('accessUserToken');
    document.location.reload();
    throw new Error(`${error}`);
  }
};

const deleteUser = async (userId: string, token: string) => {
  try {
    const response = await fetch(`${user}/${userId}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });
    const deletedUser: User = await response.json();
    return deletedUser;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const updateUser = async (userId: string, token: string, userData: User) => {
  try {
    const response = await fetch(`${user}/${userId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
      body: JSON.stringify(userData),
    });
    const updatedUser: User = await response.json();
    return updatedUser;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export {
  signUpUser,
  signInUser,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
};
