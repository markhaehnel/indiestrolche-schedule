import { z } from "zod";

const ScheduleEntrySchema = z.object({
  id: z.string(),
  start_time: z.coerce.date(),
  end_time: z.coerce.date(),
  title: z.string(),
  canceled_until: z.string().nullable(),
  category: z.object({ id: z.string(), name: z.string() }).nullable(),
  is_recurring: z.boolean(),
});

type ScheduleEntry = z.infer<typeof ScheduleEntrySchema>;

export type { ScheduleEntry };
export { ScheduleEntrySchema };
