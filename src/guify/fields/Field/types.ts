import * as z from 'zod'

export const fieldLocalParameterSchema = z.object({
    fullWidth: z.boolean().optional().default(false)
})
export type FieldLocalParam = z.input<typeof fieldLocalParameterSchema>
export type FieldLocalParamInternal = z.infer<typeof fieldLocalParameterSchema>
