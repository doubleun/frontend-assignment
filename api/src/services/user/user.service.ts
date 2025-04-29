import { IUserService } from '../../proto/generated/user.grpc-server';
import { fetchUsers, groupUserByDepartment } from './user.helper';

const userService: IUserService = {
  async getAllUsers(call, callback) {
    const users = await fetchUsers(call.request);

    callback(null, {
      users,
    });
  },
  async getAllUsersByDepartment(call, callback) {
    const users = await fetchUsers(call.request);
    const usersGroupByDepartment = groupUserByDepartment(users);

    callback(null, usersGroupByDepartment);
  },
};

export default userService;
