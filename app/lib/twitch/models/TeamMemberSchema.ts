import { z } from "zod";

const TeamMemberSchema = z.object({
  user_id: z.string(),
  user_name: z.string(),
  user_login: z.string(),
});

type TeamMember = z.infer<typeof TeamMemberSchema>;

export type { TeamMember };
export { TeamMemberSchema };
