import pipe from "froebel/pipe";
import { getTwitchAPIClient } from "~/lib/twitch/getTwitchAPIClient.server";

const getStreams = async (userNames: string[]) => getTwitchAPIClient().getStreams(userNames);

const streamsResolver = pipe(getStreams);

export { streamsResolver };
