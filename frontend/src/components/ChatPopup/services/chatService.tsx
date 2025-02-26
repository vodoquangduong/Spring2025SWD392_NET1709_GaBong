import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
// import { ROUTES } from "../config/routes";

const API_BASE = "http://localhost:7273";

export const ROUTES = {
  API: {
    USERS: {
      GET_ALL: `${API_BASE}/api/users`,
      CREATE: `${API_BASE}/api/users`,
      GET_BY_ID: (id: number) => `${API_BASE}/api/users/${id}`,
    },
    CHAT: {
      ROOMS: {
        GET_ALL: `${API_BASE}/api/chatroom`,
        GET: (RoomId: number, UserId: number) =>
          `${API_BASE}/api/chatroom/${RoomId}, ${UserId}`,
        GET_BY_ID: (id: number) => `${API_BASE}/api/chatroom/${id}`,
      },
      MESSAGES: {
        CREATE: `${API_BASE}/api/message`,
        GET_BY_ID: (id: number) => `${API_BASE}/api/message/${id}`,
        GET_BY_ROOM_ID: (roomId: number) =>
          `${API_BASE}/api/message/messages/${roomId}`,
      },
      ROOM_MEMBERS: {
        GET_BY_USER_ID: (userId: number) => `${API_BASE}/api/Account/${userId}`,
        CREATE: `${API_BASE}/api/Account`,
        ADD_USER: (roomId: number, userId: number) =>
          `${API_BASE}/api/Account/${roomId}/${userId}`,
      },
      HUB: `${API_BASE}/chatHub`,
    },
  },
} as const;

export class ChatService {
  private connection: HubConnection;

  constructor() {
    this.connection = new HubConnectionBuilder()
      .withUrl(ROUTES.API.CHAT.HUB)
      .withAutomaticReconnect()
      .build();
  }

  async start() {
    await this.connection.start();
  }

  async joinRoom(roomId: number) {
    console.log(this.connection.connectionId);
    await this.connection.invoke("JoinRoom", roomId);
  }

  // async joinRoom(roomId: number) {
  //   // Ensure connection is fully ready before joining
  //   if (this.connection.state !== "Connected") {
  //     try {
  //       console.log("Connection not ready, starting...");
  //       await this.connection.start();
  //       // Wait a brief moment to ensure connection is fully established
  //       await new Promise((resolve) => setTimeout(resolve, 100));
  //     } catch (err) {
  //       console.error("Error starting connection:", err);
  //       throw err;
  //     }
  //   }

  //   console.log(`Joining room ${roomId}...`);
  //   try {
  //     // Now invoke the JoinRoom method
  //     await this.connection.invoke("JoinRoom", roomId);
  //     console.log(`Successfully joined room ${roomId}`);
  //   } catch (err) {
  //     console.error(`Failed to join room ${roomId}:`, err);
  //     throw err;
  //   }
  // }

  // async sendMessage(roomId: number, message: string, userId: number) {
  //   console.log("Sending message to room:", roomId, message, userId);
  //   await this.connection.invoke("SendMessage", roomId, message, userId);
  // }

  async sendMessage(messageDTO: any) {
    console.log("Dang o send message 2 neeeeee");
    console.log(messageDTO);
    console.log(this.connection.connectionId);

    // await this.connection.start();
    await this.connection.invoke("SendMessage", messageDTO);
  }

  onReceiveMessage(callback: (message: any) => void) {
    console.log("Receiving message:", callback);
    this.connection.on("ReceiveMessage", callback);
  }
}
