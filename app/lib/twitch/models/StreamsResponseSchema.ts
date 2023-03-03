import { z } from "zod";

const StreamsResponseSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      user_id: z.string(),
      user_login: z.string(),
      user_name: z.string(),
      game_id: z.string(),
      game_name: z.string(),
      type: z.string(),
      title: z.string(),
      tags: z.array(z.string()),
      viewer_count: z.number(),
      started_at: z.string(),
      language: z.string(),
      thumbnail_url: z.string(),
      is_mature: z.boolean(),
    })
  ),
});

type StreamsResponse = z.infer<typeof StreamsResponseSchema>;

export type { StreamsResponse };
export { StreamsResponseSchema };
