import { z } from "zod";
import { ScheduleEntrySchema } from "~/lib/twitch/models/ScheduleEntrySchema";

const ScheduleResponseSchema = z.object({
  data: z.object({
    segments: z.array(ScheduleEntrySchema),
    broadcaster_id: z.string(),
    broadcaster_name: z.string(),
    broadcaster_login: z.string(),
  }),
});

type ScheduleResponse = z.infer<typeof ScheduleResponseSchema>;

export type { ScheduleResponse };
export { ScheduleResponseSchema };
