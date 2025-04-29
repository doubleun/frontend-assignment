import { Server, ServerCredentials } from '@grpc/grpc-js';

import { GetUserResponse } from './proto/user/v1/user';
import {
  IUserService,
  userServiceDefinition,
} from './proto/user/v1/user.grpc-server';

const users: Record<string, GetUserResponse> = {
  test: {
    id: 'test',
    email: 'test@gmail',
    name: 't',
  },
  jack: {
    id: 'jack',
    email: 'jack@gmail',
    name: 'jack',
  },
};

const userService: IUserService = {
  getAllUsers(_, callback) {
    callback(null, {
      users: Object.values(users),
    });
  },
  getUser(call, callback) {
    const user = users[call.request.id];
    if (user) {
      callback(null, user);
    } else {
      callback({ code: 5, message: 'User not found' });
    }
  },
};

function startServer() {
  const server = new Server();
  server.addService(userServiceDefinition, userService);
  const address = '0.0.0.0:50051';
  server.bindAsync(
    address,
    ServerCredentials.createInsecure(),
    (err: Error | null, port: number) => {
      if (err) {
        console.error(`Server error: ${err.message}`);
      } else {
        console.log(`gRPC server running at ${address}`);
      }
    },
  );
}

startServer();
