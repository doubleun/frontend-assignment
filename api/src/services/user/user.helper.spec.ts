import { fetchUsers, groupUserByDepartment } from './user.helper';

describe('user.helper', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('fetchUsers', () => {
    it('should fetch users without params and return user list', async () => {
      const mockResponse = {
        users: [{ id: 1, firstName: 'Alice' }],
        total: 1,
        skip: 0,
        limit: 10,
      };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await fetchUsers();

      expect(result).toEqual(mockResponse.users);
    });

    it('should include query params when params provided', async () => {
      const mockResponse = { users: [], total: 0, skip: 5, limit: 5 };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const params = { limit: 5, skip: 5 };
      const users = await fetchUsers(params as any);

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('https://dummyjson.com/users?limit=5&skip=5'),
      );
      expect(users).toEqual(mockResponse.users);
    });

    it('should throw error when response is not ok', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      });

      await expect(fetchUsers()).rejects.toThrow(
        'Error fetching users: 500 Internal Server Error',
      );
    });

    it('should propagate network errors', async () => {
      const networkError = new Error('Network failure');
      (global.fetch as jest.Mock).mockRejectedValueOnce(networkError);

      await expect(fetchUsers()).rejects.toThrow('Network failure');
    });
  });

  describe('groupUserByDepartment', () => {
    it('should group users by department with correct counts, hair, address, and ageRange', () => {
      const users = [
        {
          firstName: 'John',
          lastName: 'Doe',
          age: 30,
          gender: 'male',
          hair: { color: 'Black' },
          address: { postalCode: '12345' },
          company: { department: 'Engineering' },
        },
        {
          firstName: 'Jane',
          lastName: 'Smith',
          age: 25,
          gender: 'female',
          hair: { color: 'Blond' },
          address: { postalCode: '67890' },
          company: { department: 'Engineering' },
        },
        {
          firstName: 'Jeff',
          lastName: 'Fery',
          age: 31,
          gender: 'male',
          hair: { color: 'Black' },
          address: { postalCode: '44377' },
          company: { department: 'Engineering' },
        },
        {
          firstName: 'Bob',
          lastName: 'Brown',
          age: 40,
          gender: 'male',
          hair: { color: 'Black' },
          address: {}, // no postalCode
          company: { department: 'Sales' },
        },
        {
          firstName: 'Ryan',
          lastName: 'Bald',
          age: 46,
          gender: 'male',
          hair: {}, // no hair color
          address: { postalCode: '99898' },
          company: { department: 'Accounting' },
        },
      ] as any;

      const result = groupUserByDepartment(users);

      expect(result.departments.Engineering.male).toBe(2);
      expect(result.departments.Engineering.female).toBe(1);
      expect(result.departments.Engineering.hair['Black']).toBe(2);
      expect(result.departments.Engineering.hair['Blond']).toBe(1);
      expect(result.departments.Engineering.addressUser['JohnDoe']).toBe(
        '12345',
      );
      expect(result.departments.Engineering.addressUser['JaneSmith']).toBe(
        '67890',
      );
      expect(result.departments.Engineering.ageRange).toBe('25 - 31');

      expect(result.departments.Sales.male).toBe(1);
      expect(result.departments.Sales.female).toBe(0);
      expect(result.departments.Sales.hair['Black']).toBe(1);
      expect(result.departments.Sales.addressUser).toEqual({});
      expect(result.departments.Sales.ageRange).toBe('40 - 40');

      expect(result.departments.Accounting.male).toBe(1);
      expect(result.departments.Accounting.female).toBe(0);
      expect(result.departments.Accounting.hair).toEqual({});
      expect(result.departments.Accounting.addressUser['RyanBald']).toBe(
        '99898',
      );
      expect(result.departments.Accounting.ageRange).toBe('46 - 46');
    });

    it('should skip users without department', () => {
      const users = [{ age: 20, gender: 'male', company: {} } as any];
      const result = groupUserByDepartment(users);
      expect(result.departments).toEqual({});
    });
  });
});
