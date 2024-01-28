import * as z from 'zod'

export const fieldLocalParameterSchema = z.object({
    fullWidth: z.boolean().default(false),
    description: z.string().optional()
})
export type FieldLocalParam = z.input<typeof fieldLocalParameterSchema>
export type FieldLocalParamInternal = z.infer<typeof fieldLocalParameterSchema>
