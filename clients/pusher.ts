import Pusher from "pusher";
import ClientPusher from "pusher-js";

export const serverPusher = new Pusher({
  appId: "1505769",
  key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
  secret: process.env.NEXT_PUBLIC_SERVER_PUSHER_SECRET!,
  cluster: "ap3",
  useTLS: true,
});

export const clientPusher = new ClientPusher(
  process.env.NEXT_PUBLIC_CLIENT_PUSHER_ID!,
  {
    cluster: "ap3",
    forceTLS: true,
  }
);
