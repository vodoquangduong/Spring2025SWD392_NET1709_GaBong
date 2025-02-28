import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
} from "@microsoft/signalr";

const API_BASE = "http://localhost:7273";

export const ROUTES = {
  API: {
    NOTIFY: {
      HUB: `${API_BASE}/userHub`,
    },
  },
} as const;

export class NotifyService {
  private connection: HubConnection;

  constructor() {
    this.connection = new HubConnectionBuilder()
      .withUrl(ROUTES.API.NOTIFY.HUB)
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

  async sendNotification(receiverId: number, message: string) {
    console.log("Send " + message + " to userId " + receiverId);

    this.connection.invoke("NotifyUser", receiverId, message);
  }

  async userConnect(userId: number) {
    this.connection.invoke("UserConnect", userId);
  }

  onReceiveNotification(callback: (notification: any) => void) {
    this.connection.on("ReceiveNotification", (notification: any) => {
      // alert(notification.MessageContent);
      // console.log(notification.MessageContent);
      callback(notification);
    });
  }

  async stop() {
    try {
      console.log("Stopping connection...");
      await this.connection.stop();
      console.log("Connection stopped successfully.");
    } catch (error) {
      console.error("Failed to stop connection:", error);
      throw error;
    }
  }
}
