import * as z from 'zod'
import { fieldLocalParameterSchema } from '../../Field/types'

/**
 * Represents the localParam
*/
export const cardSchema = z.object({
    icon: z.string(),
    text: z.string(),
    value: z.string()
})
export const localParamSchema = fieldLocalParameterSchema.extend({
    cards: z.array(cardSchema)
})
export type CardSchemaInternal = z.infer<typeof cardSchema>
export type LocalParamInternal = z.infer<typeof localParamSchema>
export type LocalParam = z.input<typeof localParamSchema>
