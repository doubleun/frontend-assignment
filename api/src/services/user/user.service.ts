import { IUserService } from '../../proto/generated/user.grpc-server';
import { fetchUsers, groupUserByDepartment } from './user.helper';

const userService: IUserService = {
  async getAllUsers(call, callback) {
    try {
      const users = await fetchUsers(call.request);

      return callback(null, {
        users,
      });
    } catch (err) {
      return callback(err as Error, undefined);
    }
  },
  async getAllUsersByDepartment(call, callback) {
    try {
      const users = await fetchUsers(call.request);
      const usersGroupByDepartment = groupUserByDepartment(users);

      return callback(null, usersGroupByDepartment);
    } catch (err) {
      return callback(err as Error, undefined);
    }
  },
};

export default userService;
