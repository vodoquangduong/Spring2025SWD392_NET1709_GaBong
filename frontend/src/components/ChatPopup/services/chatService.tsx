import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
} from "@microsoft/signalr";
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
        GET: (currentUserId: number, selectedUserId: number) =>
          `${API_BASE}/api/chatroom/${currentUserId}/${selectedUserId}`,
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

    this.connection.onclose((error) =>
      console.log("Connection closed:", error)
    );
    this.connection.onreconnecting((error) =>
      console.log("Reconnecting:", error)
    );
    this.connection.onreconnected(() => console.log("Reconnected!"));
  }

  async start() {
    //> check connection state
    if (this.connection.state === HubConnectionState.Connected) {
      console.log("Connection already started.");
      return;
    }

    //> connect SignalR
    try {
      console.log("Starting connection...");
      await this.connection.start();
      console.log(
        "Connection started successfully:",
        this.connection.connectionId
      );
    } catch (error) {
      console.error("Failed to start connection:", error);
      throw error;
    }
  }

  private async ensureConnected() {
    if (this.connection.state !== HubConnectionState.Connected) {
      //> keep reconnect again if not connected
      await this.start();
    }
  }

  async joinRoom(roomId: number) {
    //> check if the client already connect or not
    await this.ensureConnected();
    console.log(
      "Joining room:",
      roomId,
      "Connection ID:",
      this.connection.connectionId
    );
    try {
      await this.connection.invoke("JoinRoom", roomId);
      console.log("Successfully joined room:", roomId);
    } catch (error) {
      console.error("Failed to join room:", error);
      throw error;
    }
  }

  async sendMessage(messageDTO: any) {
    await this.ensureConnected();
    console.log(
      "Sending message:",
      messageDTO,
      "Connection ID:",
      this.connection.connectionId
    );
    try {
      await this.connection.invoke("SendMessage", messageDTO);
      console.log("Message sent successfully!");
    } catch (error) {
      console.error("Failed to send message:", error);
      throw error;
    }
  }

  onReceiveMessage(callback: (message: any) => void) {
    console.log("Setting up message receiver...");
    this.connection.on("ReceiveMessage", (message) => {
      console.log("Received message:", message);
      callback(message);
    });
  }
}
