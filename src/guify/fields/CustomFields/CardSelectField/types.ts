import * as z from 'zod'
import { fieldLocalParameterSchema } from '../../Field/types'

/**
 * Represents the localParam
*/
const CardSchema = z.object({
    icon: z.string(),
    text: z.string()
})
export const localParamSchema = fieldLocalParameterSchema.extend({
    cards: z.array(CardSchema)
})
export type LocalParamInternal = z.infer<typeof localParamSchema>
export type LocalParam = z.input<typeof localParamSchema>
