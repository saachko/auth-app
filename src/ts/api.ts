import { signIn, signUp, user, users } from './constants';
import { LoginUserData, RegistrationUserData, User } from './interfaces';

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
    if (response.status === 400) {
      return await response.json();
    }
    return await response.json();
  } catch (error) {
    throw new Error(`${error}`);
  }
};

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
    if (response.status === (400 || 403)) {
      // return (await response.json()).message;
      return await response.json();
    }
    const token: string = await response.json();
    return token;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const getUsers = async (token: string) => {
  try {
    const response = await fetch(`${users}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const usersList: User[] = await response.json();
    return {
      items: usersList,
    };
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const getUserById = async (userId: string, token: string) => {
  try {
    const response = await fetch(`${user}/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const foundUser: User = await response.json();
    return foundUser;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const deleteUser = async (userId: string, token: string) => {
  try {
    const response = await fetch(`${user}/${userId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
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
        Authorization: `Bearer ${token}`,
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
