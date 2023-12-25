type ErrorProps = {
  res:
    | {
        errors:
          | {
              [key: string]: string[] | undefined
            }
          | undefined
        message: string
      }
    | {
        errors?: undefined
        message: string
      }
}

export const Error = ({ res: { errors, message } }: ErrorProps) => {
  return (
    <div>
      {errors &&
        Object.entries(errors).map(([key, value]) => (
          <div key={key} id={`${key}-error`} aria-live="polite">
            <strong className="capitalize">{key}: </strong>
            <span className="text-sm font-medium">{value}</span>
          </div>
        ))}

      <div>
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  )
}
