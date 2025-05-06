import {
  DepartmentData,
  GetAllUsersByDepartmentResponse,
} from '../../proto/generated/department';
import {
  GetAllUsersRequest,
  GetUserResponse,
} from '../../proto/generated/user';

const JSON_ENDPOINT = 'https://dummyjson.com/users';

interface FetchUsersResponse {
  users: GetUserResponse[];
  total: number;
  skip: number;
  limit: number;
}

interface DepartmentMinMaxAge {
  [key: string]: {
    min: number;
    max: number;
  };
}

export async function fetchUsers(
  params?: GetAllUsersRequest,
): Promise<GetUserResponse[]> {
  try {
    const url = new URL(JSON_ENDPOINT);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        // skip undefined/null or empty strings
        if (value !== undefined && value !== null && value !== '') {
          url.searchParams.set(key, String(value));
        }
      });
    }

    const res = await fetch(url.toString());
    if (!res.ok) {
      throw new Error(`Error fetching users: ${res.status} ${res.statusText}`);
    }

    const userData = (await res.json()) as FetchUsersResponse;
    return userData.users;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

/** increment gender, hairColor counts */
function incrementDepartmentCounts(
  user: GetUserResponse,
  departmentMap: DepartmentData,
) {
  // gender
  if (user.gender === 'male') {
    departmentMap.male++;
  } else {
    departmentMap.female++;
  }

  // hair
  const hairColor = user.hair?.color;

  if (!hairColor) return;

  if (departmentMap.hair[hairColor]) {
    departmentMap.hair[hairColor]++;
  } else {
    departmentMap.hair[hairColor] = 1;
  }

  return;
}

export function groupUserByDepartment(
  users: GetUserResponse[],
): Required<GetAllUsersByDepartmentResponse> {
  let departmentAge: DepartmentMinMaxAge = {}; // map each department to their highest and lowest age
  const departmentMap: Record<string, DepartmentData> = {};

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const department = user.company?.department;
    if (!department) continue;

    // check if department already exists in the map
    if (!departmentMap[department]) {
      // if not initialize department data in the map
      departmentMap[department] = {
        male: 0,
        female: 0,
        ageRange: '',
        addressUser: {},
        hair: {},
      };
    }

    // increment counts
    incrementDepartmentCounts(user, departmentMap[department]);

    // add user address
    if (user.address?.postalCode) {
      const fullname = `${user.firstName}${user.lastName}`;
      departmentMap[department].addressUser[fullname] =
        user.address?.postalCode;
    }

    // update min/max department age
    // initial min and max
    if (!departmentAge[department]?.min && !departmentAge[department]?.max) {
      departmentAge[department] = {
        min: user.age,
        max: user.age,
      };
    }

    // update min age if user age is lower
    if (user.age < departmentAge[department].min) {
      departmentAge[department].min = user.age;
    }

    // update max age if user age is higher
    if (user.age > departmentAge[department].max) {
      departmentAge[department].max = user.age;
    }
  }

  // update department ageRange
  for (const [department, ageRange] of Object.entries(departmentAge)) {
    departmentMap[department].ageRange = `${ageRange.min} - ${ageRange.max}`;
  }

  return {
    departments: departmentMap,
  };
}
