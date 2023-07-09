import * as z from 'zod'

import { DataType } from './enums'

export const ParameterSchema = z.object({
    elementId: z.string(),
    data: z.any(),
    dataType: z.nativeEnum(DataType),
    withoutContainer: z.boolean().optional().default(false),
    flipBackgroundColors: z.boolean().optional().default(false)
})
