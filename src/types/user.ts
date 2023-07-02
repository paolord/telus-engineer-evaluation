export type User = {
  id: Number
};

export type Storage = {
  usersLastId: number,
  users: Array<User>
}