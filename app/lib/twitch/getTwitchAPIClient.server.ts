import { TwitchAPI } from "~/lib/twitch/TwitchAPI.server";

let twitchApi: TwitchAPI;

declare global {
  // noinspection ES6ConvertVarToLetConst
  var __twitchApi__: TwitchAPI;
}

// this is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create an API client with every change either.
// in production, we'll have a single connection to the DB.
if (process.env.NODE_ENV === "production") {
  twitchApi = new TwitchAPI(process.env.TWITCH_CLIENT_ID!, process.env.TWITCH_CLIENT_SECRET!);
} else {
  if (!global.__twitchApi__) {
    global.__twitchApi__ = new TwitchAPI(process.env.TWITCH_CLIENT_ID!, process.env.TWITCH_CLIENT_SECRET!);
  }
  twitchApi = global.__twitchApi__;
}

const getTwitchAPIClient = () => twitchApi;

export { getTwitchAPIClient };
