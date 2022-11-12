import Pusher from "pusher";
import ClientPusher from "pusher-js";

export const serverPusher = new Pusher({
  appId: process.env.SERVER_PUSHER_ID!,
  key: process.env.SERVER_PUSHER_KEY!,
  secret: process.env.SERVER_PUSHER_SECRET!,
  cluster: "ap3",
  useTLS: true,
});

export const clientPusher = new ClientPusher(process.env.CLIENT_PUSHER_ID!, {
  cluster: "ap3",
  forceTLS: true,
});
