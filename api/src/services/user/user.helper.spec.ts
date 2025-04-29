import { fetchUsers, groupUserByDepartment } from './user.helper';

describe('User Helper', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('fetchUsers', () => {
    it('should call global.fetch with correct URL parameters', async () => {
      const mockJson = { users: [{ id: 1 }], total: 1, skip: 0, limit: 1 };
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockJson),
      });

      const result = await fetchUsers({ limit: 1, skip: 0 });
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('limit=1'),
      );
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('skip=0'),
      );
      expect(result).toEqual(mockJson.users);
    });

    it('should throw when response is not ok', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Server Error',
      });
      await expect(fetchUsers()).rejects.toThrow(
        'Error fetching users: 500 Server Error',
      );
    });
  });

  describe('groupUserByDepartment', () => {
    it('should count gender, hair, ageRange, and map addresses', () => {
      const users = [
        {
          firstName: 'A',
          lastName: 'B',
          age: 20,
          gender: 'male',
          hair: { color: 'Black' },
          address: { postalCode: '111' },
          company: { department: 'X' },
        } as any,
        {
          firstName: 'C',
          lastName: 'D',
          age: 30,
          gender: 'female',
          hair: { color: 'Blond' },
          address: {},
          company: { department: 'X' },
        } as any,
      ];
      const result = groupUserByDepartment(users);
      expect(result.male).toBe(1);
      expect(result.female).toBe(1);
      expect(result.hair.Black).toBe(1);
      expect(result.hair.Blond).toBe(1);
      expect(result.ageRange).toBe('20 - 30');
      expect(result.addressUser).toHaveProperty('AB', '111');
    });

    it('should skip users without department', () => {
      const users = [
        { company: {} } as any,
        {
          firstName: 'X',
          lastName: 'Y',
          age: 25,
          gender: 'male',
          hair: { color: 'Brown' },
          address: { postalCode: '222' },
          company: { department: 'Y' },
        } as any,
      ];
      const result = groupUserByDepartment(users);
      expect(result.male).toBe(1);
      expect(result.female).toBe(0);
      expect(result.ageRange).toBe('25 - 25');
      expect(result.addressUser).toHaveProperty('XY', '222');
    });
  });
});
