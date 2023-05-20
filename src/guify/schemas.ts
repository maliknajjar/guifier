import * as z from 'zod'

import { DataType } from './enums'

export const ParameterSchema = z.object({
    elementId: z.string(),
    data: z.string(),
    dataType: z.nativeEnum(DataType)
})
