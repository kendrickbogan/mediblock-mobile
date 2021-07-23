import * as yup from "yup"
import { SchemaLike } from "yup/lib/types"
import { ObjectShape } from "yup/lib/object"

const startAndEndValidations: ObjectShape = {
  startedAt: yup.date().when(
    "endedAt",
    (endedAt: Date): SchemaLike => {
      return (
        endedAt &&
        yup.date().max(endedAt, "Start date should be before the end date")
      )
    },
  ),
  endedAt: yup.date().when(
    "startedAt",
    (startedAt: Date): SchemaLike => {
      return (
        startedAt &&
        yup.date().min(startedAt, "End date should be after the start date")
      )
    },
  ),
}

export default { startAndEndValidations }
