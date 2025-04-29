import { IUserService } from '../../proto/generated/user.grpc-server';
import { fetchUsers, groupUserByDepartment } from './user.helper';

const userService: IUserService = {
  async getAllUsers(_, callback) {
    const users = await fetchUsers();

    callback(null, {
      users,
    });
  },
  async getAllUsersByDepartment(_, callback) {
    const users = await fetchUsers();
    const usersGroupByDepartment = groupUserByDepartment(users);
    callback(null, usersGroupByDepartment);
  },
};

export default userService;
