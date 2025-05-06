import { fetchUsers, groupUserByDepartment } from './user.helper';
import userService from './user.service';

jest.mock('./user.helper');

describe('UserService', () => {
  const mockFetchUsers = fetchUsers as jest.MockedFunction<typeof fetchUsers>;
  const mockGroupByDept = groupUserByDepartment as jest.MockedFunction<
    typeof groupUserByDepartment
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('getAllUsers', () => {
    it('should fetch users and return via callback', async () => {
      const fakeUsers = [{ id: 1, firstName: 'John' } as any];
      mockFetchUsers.mockResolvedValueOnce(fakeUsers);

      const call = { request: { limit: 10, skip: 0 } } as any;
      const callback = jest.fn();

      await userService.getAllUsers(call, callback);

      expect(mockFetchUsers).toHaveBeenCalledWith(call.request);
      expect(callback).toHaveBeenCalledWith(null, { users: fakeUsers });
    });

    it('should handle errors and call callback with error', async () => {
      const error = new Error('Fetch failed');
      mockFetchUsers.mockRejectedValueOnce(error);

      const call = { request: {} } as any;
      const callback = jest.fn();

      await userService.getAllUsers(call, callback);

      expect(mockFetchUsers).toHaveBeenCalledWith(call.request);
      expect(callback).toHaveBeenCalledWith(error, undefined);
    });
  });

  describe('getAllUsersByDepartment', () => {
    it('should fetch and group users by department', async () => {
      const fakeUsers = [
        { id: 1, firstName: 'Jane', company: { department: 'Sales' } } as any,
      ];
      const grouped = {
        departments: {
          Sales: {
            male: 0,
            female: 0,
            ageRange: '',
            hair: {},
            addressUser: {},
          },
        },
      } as any;

      mockFetchUsers.mockResolvedValueOnce(fakeUsers);
      mockGroupByDept.mockReturnValueOnce(grouped as any);

      const call = { request: { limit: 5 } } as any;
      const callback = jest.fn();

      await userService.getAllUsersByDepartment(call, callback);

      expect(mockFetchUsers).toHaveBeenCalledWith(call.request);
      expect(mockGroupByDept).toHaveBeenCalledWith(fakeUsers);
      expect(callback).toHaveBeenCalledWith(null, grouped);
    });

    it('should handle errors from fetchUsers', async () => {
      const error = new Error('Network error');
      mockFetchUsers.mockRejectedValueOnce(error);

      const call = { request: {} } as any;
      const callback = jest.fn();

      await userService.getAllUsersByDepartment(call, callback);

      expect(mockFetchUsers).toHaveBeenCalledWith(call.request);
      expect(callback).toHaveBeenCalledWith(error, undefined);
    });

    it('should handle errors from groupUserByDepartment', async () => {
      const fakeUsers = [{ id: 2 } as any];
      const error = new Error('Grouping failed');
      mockFetchUsers.mockResolvedValueOnce(fakeUsers);
      mockGroupByDept.mockImplementationOnce(() => {
        throw error;
      });

      const call = { request: {} } as any;
      const callback = jest.fn();

      await userService.getAllUsersByDepartment(call, callback);

      expect(mockFetchUsers).toHaveBeenCalledWith(call.request);
      expect(mockGroupByDept).toHaveBeenCalledWith(fakeUsers);
      expect(callback).toHaveBeenCalledWith(error, undefined);
    });
  });
});
