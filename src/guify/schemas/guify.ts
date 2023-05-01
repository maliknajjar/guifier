import * as z from 'zod'

import { GuifyDataType } from '../enums/guify'

export const GuifyParameterSchema = z.object({
    elementId: z.string(),
    data: z.string(),
    dataType: z.nativeEnum(GuifyDataType)
})
