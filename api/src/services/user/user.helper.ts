import { GetAllUsersByDepartmentResponse } from '../../proto/generated/department';
import { GetUserResponse } from '../../proto/generated/user';

const JSON_ENDPOINT = 'https://dummyjson.com/users';

type FetchUsersResponse = {
  users: GetUserResponse[];
  total: number;
  skip: number;
  limit: number;
};
export async function fetchUsers(): Promise<GetUserResponse[]> {
  const res = await fetch(JSON_ENDPOINT);
  const userData = (await res.json()) as FetchUsersResponse;

  return userData.users;
}

type DepartmentData = Required<GetAllUsersByDepartmentResponse>;

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
  switch (user.hair?.color) {
    case 'Black':
      departmentMap.hair.black++;
      break;
    case 'Blond':
      departmentMap.hair.blond++;
      break;
    case 'Chestnut':
      departmentMap.hair.chestnut++;
      break;
    case 'Brown':
      departmentMap.hair.brown++;
      break;
    default:
      break;
  }

  return;
}

export function groupUserByDepartment(users: GetUserResponse[]) {
  let lowestAge = null;
  let highestAge = null;

  const departmentMap: DepartmentData = {
    male: 0,
    female: 0,
    ageRange: '',
    hair: {
      black: 0,
      blond: 0,
      chestnut: 0,
      brown: 0,
    },
    addressUser: {},
  };

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    if (!user.company?.department) continue;

    // increment counts
    incrementDepartmentCounts(user, departmentMap);

    // add user address
    if (user.address?.postalCode) {
      const fullname = `${user.firstName}${user.lastName}`;
      departmentMap.addressUser[fullname] = user.address?.postalCode;
    }

    // update lowest and highest age
    // initial lowest and highest
    if (!lowestAge && !highestAge) {
      lowestAge = user.age;
      highestAge = user.age;
    }

    if (lowestAge && user.age < lowestAge) {
      lowestAge = user.age;
    } else if (highestAge && user.age > highestAge) {
      highestAge = user.age;
    }
  }

  // update ageRange
  if (lowestAge && highestAge) {
    departmentMap.ageRange = `${lowestAge} - ${highestAge}`;
  }

  return departmentMap;
}
