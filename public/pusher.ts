import Pusher from "pusher";
import ClientPusher from "pusher-js";

export const serverPusher = new Pusher({
  appId: process.env.NEXT_PUBLIC_SERVER_PUSHER_ID_PUBLIC!,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY_PUBLIC!,
  secret: process.env.NEXT_PUBLIC_SERVER_PUSHER_SECRET_PUBLIC!,
  cluster: "ap3",
  useTLS: true,
});

export const clientPusher = new ClientPusher(
  process.env.NEXT_PUBLIC_CLIENT_PUSHER_ID_PUBLIC!,
  {
    cluster: "ap3",
    forceTLS: true,
  }
);
