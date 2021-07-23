type Success<Data> = {
  kind: "Success"
  data: Data
}

type Loading = {
  kind: "Loading"
}

type Failure<Error> = {
  kind: "Failure"
  error: Error
}

type NotStarted = {
  kind: "NotStarted"
}

export type RemoteData<T, U> = NotStarted | Loading | Success<T> | Failure<U>
