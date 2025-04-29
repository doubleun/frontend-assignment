import { ServerUnaryCall } from '@grpc/grpc-js';

import { GetAllUsersByDepartmentResponse } from '../../proto/generated/department';
import { GetAllUsersRequest } from '../../proto/generated/user';
import * as helper from './user.helper';
import userService from './user.service';

describe('User Service', () => {
  const mockUsers = [
    {
      id: 1,
      firstName: 'Alice',
      lastName: 'Smith',
      age: 30,
      gender: 'female',
      hair: { color: 'Black', type: '' },
      address: { postalCode: '12345' },
      company: {
        department: 'Sales',
        name: '',
        title: '',
        address: {} as any,
      },
    } as any,
    {
      id: 2,
      firstName: 'Bob',
      lastName: 'Jones',
      age: 40,
      gender: 'male',
      hair: { color: 'Brown', type: '' },
      address: {},
      company: {
        department: 'Engineering',
        name: '',
        title: '',
        address: {} as any,
      },
    } as any,
  ];

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('getAllUsers', () => {
    it('should fetch users and return them via callback', async () => {
      // Arrange
      jest.spyOn(helper, 'fetchUsers').mockResolvedValue(mockUsers as any);
      const call = { request: {} } as ServerUnaryCall<GetAllUsersRequest, any>;
      const callback = jest.fn();

      // Act
      await userService.getAllUsers(call, callback as any);

      // Assert
      expect(helper.fetchUsers).toHaveBeenCalledWith(call.request);
      expect(callback).toHaveBeenCalledWith(null, { users: mockUsers });
    });

    it('should propagate fetch errors', async () => {
      // Arrange
      const err = new Error('Network failure');
      jest.spyOn(helper, 'fetchUsers').mockRejectedValue(err);
      const call = { request: {} } as ServerUnaryCall<GetAllUsersRequest, any>;
      const callback = jest.fn();

      // Act
      await userService.getAllUsers(call, callback as any);

      // Assert
      expect(callback).toHaveBeenCalledWith(err, undefined);
    });
  });

  describe('getAllUsersByDepartment', () => {
    it('should fetch users and group by department', async () => {
      // Arrange
      const groupResp: Required<GetAllUsersByDepartmentResponse> = {
        male: 1,
        female: 1,
        ageRange: '30 - 40',
        hair: { Black: 1, Blond: 0, Chestnut: 0, Brown: 1 },
        addressUser: { AliceSmith: '12345' },
      };
      jest.spyOn(helper, 'fetchUsers').mockResolvedValue(mockUsers as any);
      jest.spyOn(helper, 'groupUserByDepartment').mockReturnValue(groupResp);

      const call = { request: { limit: 2 } } as ServerUnaryCall<
        GetAllUsersRequest,
        any
      >;
      const callback = jest.fn();

      // Act
      await userService.getAllUsersByDepartment(call, callback as any);

      // Assert
      expect(helper.fetchUsers).toHaveBeenCalledWith(call.request);
      expect(helper.groupUserByDepartment).toHaveBeenCalledWith(mockUsers);
      expect(callback).toHaveBeenCalledWith(null, groupResp);
    });

    it('should propagate fetch errors', async () => {
      // Arrange
      const err = new Error('Fetch failed');
      jest.spyOn(helper, 'fetchUsers').mockRejectedValue(err);
      const call = { request: {} } as ServerUnaryCall<GetAllUsersRequest, any>;
      const callback = jest.fn();

      // Act
      await userService.getAllUsersByDepartment(call, callback as any);

      // Assert
      expect(callback).toHaveBeenCalledWith(err, undefined);
    });
  });
});
