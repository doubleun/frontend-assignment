import { Server, ServerCredentials } from "@grpc/grpc-js";
import { userProto } from "./utils/grpc";

const users: Record<string, { id: string; name: string; email: string }> = {};

function getAllUsers(_call: any, callback: any) {
  callback(null, {
    users: Object.values(users),
  });
}

function getUser(call: any, callback: any) {
  const user = users[call.request.id];
  if (user) {
    callback(null, user);
  } else {
    callback({ code: 5, message: "User not found" });
  }
}

function createUser(call: any, callback: any) {
  const id = Date.now().toString();
  const user = { id, name: call.request.name, email: call.request.email };

  users[id] = user;
  callback(null, { id });
}

function startServer() {
  const server = new Server();
  server.addService(userProto.UserService.service, {
    GetAllUsers: getAllUsers,
    GetUser: getUser,
    CreateUser: createUser,
  });
  const address = "0.0.0.0:50051";
  server.bindAsync(address, ServerCredentials.createInsecure(), () => {
    console.log(`gRPC server running at ${address}`);
  });
}

startServer();
