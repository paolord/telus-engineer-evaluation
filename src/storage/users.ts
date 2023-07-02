import _ from "lodash";

import { Storage, User } from "../types/user";

const storage: Storage = {
  usersLastId: 0,
  users: []
};

export const fetchAll = () => {
  return storage.users;
};

export const createUser = (newUser: User) => {
  const user = newUser;
  user.id = storage.usersLastId + 1;

  storage.users.push(user);
  
  return user.id;
};

export const getUser = (userId: Number) => {
  return storage.users.find((user: User) => {
    if (user.id === userId) {
      return true;
    }
    return false;
  });
};

export const updateUser = (userId: Number, data: User) => {
  const currentUserIndex = storage.users.findIndex((user: User) => {
    if (user.id === userId) {
      return true;
    }
    return false;
  });

  if (currentUserIndex < 0) {
    return undefined;
  }

  const currentUser = storage.users[currentUserIndex];

  const updatedUser = _.assign(currentUser, data);

  storage.users[currentUserIndex] = updatedUser;

  return updatedUser;
};

export const deleteUser = (userId: Number) => {
  const currentUserIndex = storage.users.findIndex((user: User) => {
    if (user.id === userId) {
      return true;
    }
    return false;
  });

  if (currentUserIndex < 0) {
    return false;
  }

  _.remove(storage.users, (user) => {
    if (user.id === userId) {
      return true;
    }
    return false;
  });

  return true;
};