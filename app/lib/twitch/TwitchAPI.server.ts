import type { ScheduleResponse } from "~/lib/twitch/models/ScheduleResponseSchema";
import { ScheduleResponseSchema } from "~/lib/twitch/models/ScheduleResponseSchema";
import { type UserResponse, UserResponseSchema } from "~/lib/twitch/models/UserResponseSchema";
import { getStartOfWeek } from "~/lib/getStartOfWeek";
import { type StreamsResponse, StreamsResponseSchema } from "~/lib/twitch/models/StreamsResponseSchema";

class TwitchAPI {
  private readonly baseUrl = "https://api.twitch.tv/helix";
  private accessToken?: string;
  private expiresAt?: number;

  constructor(private readonly clientId: string, private readonly clientSecret: string) {
    console.log(`Creating TwitchAPI instance for clientId ${clientId}`);
  }

  private async makeRequest(path: string): Promise<any> {
    const url = `${this.baseUrl}${path}`;

    const response = await fetch(url, {
      headers: {
        "Client-ID": this.clientId,
        Authorization: `Bearer ${await this.getAccessToken()}`,
      },
    });

    if (response.status === 401) {
      this.accessToken = undefined;
      this.expiresAt = undefined;
      await this.getAccessToken();
      return this.makeRequest(url);
    }

    if (!response.ok) {
      throw new Error(`Error while fetching data: ${response.status}`);
    }

    return response.json();
  }

  private async getAccessToken(): Promise<string> {
    if (this.accessToken && this.expiresAt && Date.now() < this.expiresAt) {
      return this.accessToken;
    }

    const response = await fetch(
      `https://id.twitch.tv/oauth2/token?client_id=${this.clientId}&client_secret=${this.clientSecret}&grant_type=client_credentials`,
      { method: "POST" }
    );

    if (!response.ok) {
      throw new Error("Failed to get Twitch access token");
    }

    const data = await response.json();
    this.accessToken = data.access_token;
    this.expiresAt = Date.now() + data.expires_in * 1000;

    return data.access_token;
  }

  public async getSchedule(userId: string, startDate: Date = getStartOfWeek()): Promise<ScheduleResponse["data"]> {
    let url = `/schedule?broadcaster_id=${userId}&start_time=${startDate.toISOString()}&first=25`;

    const response = await this.makeRequest(url);
    const { data } = await ScheduleResponseSchema.parseAsync(response);
    return data;
  }

  public async getUsers(userNames: string[]): Promise<UserResponse["data"]> {
    let url = `/users?login=${userNames.join("&login=")}`;

    const response = await this.makeRequest(url);
    const { data } = await UserResponseSchema.parseAsync(response);
    return data;
  }

  public async getStreams(userNames: string[]): Promise<StreamsResponse["data"]> {
    let url = `/streams?type=live&user_login=${userNames.join("&user_login=")}`;

    const response = await this.makeRequest(url);
    const { data } = await StreamsResponseSchema.parseAsync(response);
    return data;
  }
}

export { TwitchAPI };
