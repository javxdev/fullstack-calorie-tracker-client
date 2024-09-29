import z from "zod"

export type Category = {
    id: number,
    name: string
}

export const ActivityWithoutIdSchema = z.object({
    category: z.number(),
    name: z.string(),
    calories: z.number()
})

export const ActivitySchema = z.object({
    id: z.number(),
    category: z.number(),
    name: z.string(),
    calories: z.number()
})

export const ActivitiesSchema = z.array(ActivitySchema)

export type Activity = z.infer<typeof ActivitySchema>