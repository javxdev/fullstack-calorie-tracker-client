import z from "zod"

export type Category = {
    id: number,
    name: string
}

export const ActivitySchema = z.object({
    category: z.number(),
    name: z.string(),
    calories: z.number()
})

export type Activity = z.infer<typeof ActivitySchema>