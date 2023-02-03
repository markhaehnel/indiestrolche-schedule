import { z } from "zod";

const UserResponseSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      login: z.string(),
      display_name: z.string(),
      type: z.string(),
      broadcaster_type: z.string(),
      description: z.string(),
      profile_image_url: z.string(),
      offline_image_url: z.string(),
      view_count: z.number(),
      created_at: z.coerce.date(),
    })
  ),
});

type UserResponse = z.infer<typeof UserResponseSchema>;

export type { UserResponse };
export { UserResponseSchema };
