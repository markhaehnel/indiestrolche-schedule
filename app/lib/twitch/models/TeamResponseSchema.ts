import { z } from "zod";
import { TeamMemberSchema } from "~/lib/twitch/models/TeamMemberSchema";

const TeamResponseSchema = z.object({
  data: z.array(
    z.object({
      users: z.array(TeamMemberSchema),
      background_image_url: z.string().url(),
      banner: z.string().url(),
      created_at: z.coerce.date(),
      updated_at: z.coerce.date(),
      info: z.string(),
      thumbnail_url: z.string().url(),
      team_name: z.string(),
      team_display_name: z.string(),
      id: z.string(),
    })
  ),
});

type TeamResponse = z.infer<typeof TeamResponseSchema>;

export type { TeamResponse };
export { TeamResponseSchema };
