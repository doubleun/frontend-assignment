import { Server, ServerCredentials } from '@grpc/grpc-js';

import { userServiceDefinition } from './proto/generated/user.grpc-server';
import userService from './services/user/user.service';

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
        console.log(`gRPC server running at ${port}`);
      }
    },
  );
}

startServer();
