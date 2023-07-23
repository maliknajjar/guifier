import type * as z from 'zod'
import { fieldLocalParameterSchema } from '../../Field/types'

/**
 * Represents the localParam of TextField class
 */
export const textFieldLocalParamSchema = fieldLocalParameterSchema.extend({})
export type TextFieldLocalParamInternal = z.infer<typeof textFieldLocalParamSchema>
export type TextFieldLocalParam = z.input<typeof textFieldLocalParamSchema>
