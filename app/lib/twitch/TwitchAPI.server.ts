import {
  TeamResponse,
  TeamResponseSchema,
} from "~/lib/twitch/models/TeamResponseSchema";
import {
  ScheduleResponse,
  ScheduleResponseSchema,
} from "~/lib/twitch/models/ScheduleResponseSchema";
import type { TeamMember } from "~/lib/twitch/models/TeamMemberSchema";
import type { ScheduleEntry } from "~/lib/twitch/models/ScheduleEntrySchema";
import {
  UserResponse,
  UserResponseSchema,
} from "~/lib/twitch/models/UserResponse";
import { getStartOfWeek } from "~/lib/getStartOfWeek";

class TwitchAPI {
  private readonly baseUrl = "https://api.twitch.tv/helix";
  private accessToken?: string;
  private expiresAt?: number;

  constructor(
    private readonly clientId: string,
    private readonly clientSecret: string
  ) {}

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

  public async getTeam(
    teamName: string
  ): Promise<TeamResponse["data"][number]> {
    const url = `/teams?name=${teamName}`;
    const response = await this.makeRequest(url);
    const { data } = await TeamResponseSchema.parseAsync(response);
    return data[0];
  }

  public async getSchedule(
    userId: string,
    startDate: Date = getStartOfWeek()
  ): Promise<ScheduleResponse["data"]> {
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
}

export { TwitchAPI };
