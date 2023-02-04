/* eslint-disable unicorn/no-null */
import { setupServer } from "msw/node";
import { rest } from "msw";
import type { UserResponse } from "~/lib/twitch/models/UserResponse";
import type { ScheduleResponse } from "~/lib/twitch/models/ScheduleResponseSchema";

const miscHandlers = [
  rest.get("https://api.twitch.tv/helix/users", async (req, res, ctx) => {
    const userResponse: UserResponse = {
      data: [
        {
          id: "403204964",
          login: "marcusbmr",
          display_name: "marcusbmr",
          type: "",
          broadcaster_type: "affiliate",
          description:
            "Hi! Ich bin Marcus und ich mache Spiele - jetzt hier auf meinem eigenen Kanal. Folg doch gerne rein! ☕",
          profile_image_url:
            "https://static-cdn.jtvnw.net/jtv_user_pictures/a879c42d-e81c-48ff-83ed-fa57240c0a24-profile_image-300x300.png",
          offline_image_url:
            "https://static-cdn.jtvnw.net/jtv_user_pictures/540983a3-babd-4f9c-8b7b-5492e31319c1-channel_offline_image-1920x1080.png",
          view_count: 257,
          created_at: "2018-12-20T15:55:52Z" as unknown as Date,
        },
      ],
    };

    return res(ctx.json(userResponse));
  }),

  rest.get("https://api.twitch.tv/helix/schedule", async (req, res, ctx) => {
    const scheduleResponse: ScheduleResponse = {
      data: {
        broadcaster_id: "403204964",
        broadcaster_login: "marcusbmr",
        broadcaster_name: "marcusbmr",
        segments: [
          {
            id: "eyJzZWdtZW50SUQiOiJiMDlmY2QwNS1mZmMwLTQzZDgtOTAzOC1mMjlkYTk5OTQ0NWQiLCJpc29ZZWFyIjoyMDIzLCJpc29XZWVrIjo1fQ==",
            start_time: "2023-01-31T10:00:00Z" as unknown as Date,
            end_time: "2023-01-31T14:00:00Z" as unknown as Date,
            title: "Dev-Stream 💻 ",
            canceled_until: null,
            category: {
              id: "1469308723",
              name: "Software and Game Development",
            },
            is_recurring: true,
          },
          {
            id: "eyJzZWdtZW50SUQiOiIxYTU5MGE3MS0wZDExLTRjNTQtOWRkYS0xOTRiMmM0ZDQ3MjEiLCJpc29ZZWFyIjoyMDIzLCJpc29XZWVrIjo1fQ==",
            start_time: "2023-02-01T10:00:00Z" as unknown as Date,
            end_time: "2023-02-01T14:00:00Z" as unknown as Date,
            title: "Dev-Stream 💻 ",
            canceled_until: null,
            category: {
              id: "1469308723",
              name: "Software and Game Development",
            },
            is_recurring: true,
          },
          {
            id: "eyJzZWdtZW50SUQiOiJjNDQ3ZmZiMC1kNzUyLTRhNmYtOTEwMy1lN2E3MTEzNTc3ODEiLCJpc29ZZWFyIjoyMDIzLCJpc29XZWVrIjo1fQ==",
            start_time: "2023-02-02T17:00:00Z" as unknown as Date,
            end_time: "2023-02-02T21:00:00Z" as unknown as Date,
            title: " Baphomets Fluch 2 🏺🗺️🐐",
            canceled_until: null,
            category: {
              id: "3734",
              name: "Broken Sword: The Smoking Mirror",
            },
            is_recurring: false,
          },
          {
            id: "eyJzZWdtZW50SUQiOiIzZmVjZTFjOC1hYzNkLTQ0MzgtYWI3ZS0yMWVjNGMyNmY1N2UiLCJpc29ZZWFyIjoyMDIzLCJpc29XZWVrIjo1fQ==",
            start_time: "2023-02-03T12:00:00Z" as unknown as Date,
            end_time: "2023-02-03T14:00:00Z" as unknown as Date,
            title: "Dev-Stream 💻 ",
            canceled_until: null,
            category: {
              id: "1469308723",
              name: "Software and Game Development",
            },
            is_recurring: false,
          },
          {
            id: "eyJzZWdtZW50SUQiOiIxNDlkM2U4MC04NjY1LTQzY2UtYWY5OS01MjljOTYxOTE3MzQiLCJpc29ZZWFyIjoyMDIzLCJpc29XZWVrIjo1fQ==",
            start_time: "2023-02-03T14:00:00Z" as unknown as Date,
            end_time: "2023-02-03T16:00:00Z" as unknown as Date,
            title: "Gamen, Fun & gute Laune! 🎮 ",
            canceled_until: null,
            category: null,
            is_recurring: false,
          },
          {
            id: "eyJzZWdtZW50SUQiOiI2NzQ2YjQwOC00ODNiLTQ4NmItOWZhNS1hMmM5YzE2ZjY3N2QiLCJpc29ZZWFyIjoyMDIzLCJpc29XZWVrIjo1fQ==",
            start_time: "2023-02-04T16:00:00Z" as unknown as Date,
            end_time: "2023-02-04T22:00:00Z" as unknown as Date,
            title: "Green Hell mit Wicked & Shawna 🐊 🪓",
            canceled_until: null,
            category: {
              id: "506078",
              name: "Green Hell",
            },
            is_recurring: false,
          },
          {
            id: "eyJzZWdtZW50SUQiOiI4NzFkZDBjMi0zN2UxLTQ1MDctOTI3OC1mZGU5NGQxMzE1MDYiLCJpc29ZZWFyIjoyMDIzLCJpc29XZWVrIjo1fQ==",
            start_time: "2023-02-05T12:00:00Z" as unknown as Date,
            end_time: "2023-02-05T16:00:00Z" as unknown as Date,
            title: " Baphomets Fluch 2 🏺🗺️🐐",
            canceled_until: null,
            category: {
              id: "3734",
              name: "Broken Sword: The Smoking Mirror",
            },
            is_recurring: false,
          },
          {
            id: "eyJzZWdtZW50SUQiOiJiMDlmY2QwNS1mZmMwLTQzZDgtOTAzOC1mMjlkYTk5OTQ0NWQiLCJpc29ZZWFyIjoyMDIzLCJpc29XZWVrIjo2fQ==",
            start_time: "2023-02-07T10:00:00Z" as unknown as Date,
            end_time: "2023-02-07T14:00:00Z" as unknown as Date,
            title: "Dev-Stream 💻 ",
            canceled_until: null,
            category: {
              id: "1469308723",
              name: "Software and Game Development",
            },
            is_recurring: true,
          },
          {
            id: "eyJzZWdtZW50SUQiOiIxYTU5MGE3MS0wZDExLTRjNTQtOWRkYS0xOTRiMmM0ZDQ3MjEiLCJpc29ZZWFyIjoyMDIzLCJpc29XZWVrIjo2fQ==",
            start_time: "2023-02-08T10:00:00Z" as unknown as Date,
            end_time: "2023-02-08T14:00:00Z" as unknown as Date,
            title: "Dev-Stream 💻 ",
            canceled_until: null,
            category: {
              id: "1469308723",
              name: "Software and Game Development",
            },
            is_recurring: true,
          },
          {
            id: "eyJzZWdtZW50SUQiOiJiMDlmY2QwNS1mZmMwLTQzZDgtOTAzOC1mMjlkYTk5OTQ0NWQiLCJpc29ZZWFyIjoyMDIzLCJpc29XZWVrIjo3fQ==",
            start_time: "2023-02-14T10:00:00Z" as unknown as Date,
            end_time: "2023-02-14T14:00:00Z" as unknown as Date,
            title: "Dev-Stream 💻 ",
            canceled_until: null,
            category: {
              id: "1469308723",
              name: "Software and Game Development",
            },
            is_recurring: true,
          },
          {
            id: "eyJzZWdtZW50SUQiOiIxYTU5MGE3MS0wZDExLTRjNTQtOWRkYS0xOTRiMmM0ZDQ3MjEiLCJpc29ZZWFyIjoyMDIzLCJpc29XZWVrIjo3fQ==",
            start_time: "2023-02-15T10:00:00Z" as unknown as Date,
            end_time: "2023-02-15T14:00:00Z" as unknown as Date,
            title: "Dev-Stream 💻 ",
            canceled_until: null,
            category: {
              id: "1469308723",
              name: "Software and Game Development",
            },
            is_recurring: true,
          },
          {
            id: "eyJzZWdtZW50SUQiOiJiMDlmY2QwNS1mZmMwLTQzZDgtOTAzOC1mMjlkYTk5OTQ0NWQiLCJpc29ZZWFyIjoyMDIzLCJpc29XZWVrIjo4fQ==",
            start_time: "2023-02-21T10:00:00Z" as unknown as Date,
            end_time: "2023-02-21T14:00:00Z" as unknown as Date,
            title: "Dev-Stream 💻 ",
            canceled_until: null,
            category: {
              id: "1469308723",
              name: "Software and Game Development",
            },
            is_recurring: true,
          },
          {
            id: "eyJzZWdtZW50SUQiOiIxYTU5MGE3MS0wZDExLTRjNTQtOWRkYS0xOTRiMmM0ZDQ3MjEiLCJpc29ZZWFyIjoyMDIzLCJpc29XZWVrIjo4fQ==",
            start_time: "2023-02-22T10:00:00Z" as unknown as Date,
            end_time: "2023-02-22T14:00:00Z" as unknown as Date,
            title: "Dev-Stream 💻 ",
            canceled_until: null,
            category: {
              id: "1469308723",
              name: "Software and Game Development",
            },
            is_recurring: true,
          },
          {
            id: "eyJzZWdtZW50SUQiOiJiMDlmY2QwNS1mZmMwLTQzZDgtOTAzOC1mMjlkYTk5OTQ0NWQiLCJpc29ZZWFyIjoyMDIzLCJpc29XZWVrIjo5fQ==",
            start_time: "2023-02-28T10:00:00Z" as unknown as Date,
            end_time: "2023-02-28T14:00:00Z" as unknown as Date,
            title: "Dev-Stream 💻 ",
            canceled_until: null,
            category: {
              id: "1469308723",
              name: "Software and Game Development",
            },
            is_recurring: true,
          },
          {
            id: "eyJzZWdtZW50SUQiOiIxYTU5MGE3MS0wZDExLTRjNTQtOWRkYS0xOTRiMmM0ZDQ3MjEiLCJpc29ZZWFyIjoyMDIzLCJpc29XZWVrIjo5fQ==",
            start_time: "2023-03-01T10:00:00Z" as unknown as Date,
            end_time: "2023-03-01T14:00:00Z" as unknown as Date,
            title: "Dev-Stream 💻 ",
            canceled_until: null,
            category: {
              id: "1469308723",
              name: "Software and Game Development",
            },
            is_recurring: true,
          },
          {
            id: "eyJzZWdtZW50SUQiOiJiMDlmY2QwNS1mZmMwLTQzZDgtOTAzOC1mMjlkYTk5OTQ0NWQiLCJpc29ZZWFyIjoyMDIzLCJpc29XZWVrIjoxMH0=",
            start_time: "2023-03-07T10:00:00Z" as unknown as Date,
            end_time: "2023-03-07T14:00:00Z" as unknown as Date,
            title: "Dev-Stream 💻 ",
            canceled_until: null,
            category: {
              id: "1469308723",
              name: "Software and Game Development",
            },
            is_recurring: true,
          },
          {
            id: "eyJzZWdtZW50SUQiOiIxYTU5MGE3MS0wZDExLTRjNTQtOWRkYS0xOTRiMmM0ZDQ3MjEiLCJpc29ZZWFyIjoyMDIzLCJpc29XZWVrIjoxMH0=",
            start_time: "2023-03-08T10:00:00Z" as unknown as Date,
            end_time: "2023-03-08T14:00:00Z" as unknown as Date,
            title: "Dev-Stream 💻 ",
            canceled_until: null,
            category: {
              id: "1469308723",
              name: "Software and Game Development",
            },
            is_recurring: true,
          },
          {
            id: "eyJzZWdtZW50SUQiOiJiMDlmY2QwNS1mZmMwLTQzZDgtOTAzOC1mMjlkYTk5OTQ0NWQiLCJpc29ZZWFyIjoyMDIzLCJpc29XZWVrIjoxMX0=",
            start_time: "2023-03-14T10:00:00Z" as unknown as Date,
            end_time: "2023-03-14T14:00:00Z" as unknown as Date,
            title: "Dev-Stream 💻 ",
            canceled_until: null,
            category: {
              id: "1469308723",
              name: "Software and Game Development",
            },
            is_recurring: true,
          },
          {
            id: "eyJzZWdtZW50SUQiOiIxYTU5MGE3MS0wZDExLTRjNTQtOWRkYS0xOTRiMmM0ZDQ3MjEiLCJpc29ZZWFyIjoyMDIzLCJpc29XZWVrIjoxMX0=",
            start_time: "2023-03-15T10:00:00Z" as unknown as Date,
            end_time: "2023-03-15T14:00:00Z" as unknown as Date,
            title: "Dev-Stream 💻 ",
            canceled_until: null,
            category: {
              id: "1469308723",
              name: "Software and Game Development",
            },
            is_recurring: true,
          },
          {
            id: "eyJzZWdtZW50SUQiOiJiMDlmY2QwNS1mZmMwLTQzZDgtOTAzOC1mMjlkYTk5OTQ0NWQiLCJpc29ZZWFyIjoyMDIzLCJpc29XZWVrIjoxMn0=",
            start_time: "2023-03-21T10:00:00Z" as unknown as Date,
            end_time: "2023-03-21T14:00:00Z" as unknown as Date,
            title: "Dev-Stream 💻 ",
            canceled_until: null,
            category: {
              id: "1469308723",
              name: "Software and Game Development",
            },
            is_recurring: true,
          },
        ],
      },
    };

    return res(ctx.json(scheduleResponse));
  }),

  rest.post("https://id.twitch.tv/oauth2/token", async (req, res, ctx) => {
    return res(
      ctx.json({
        access_token: "mocked-token",
        expires_in: 5_011_271,
        token_type: "bearer",
      })
    );
  }),
];

const server = setupServer(...miscHandlers);

server.listen({ onUnhandledRequest: "warn" });
console.info("🔶 Mock server running");

process.once("SIGINT", () => server.close());
process.once("SIGTERM", () => server.close());
