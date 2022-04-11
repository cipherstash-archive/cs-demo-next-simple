import * as React from "react"

type State = {
  error: string
  isLoading: boolean
  response: any,
  url: RequestInfo
}

function initialState(args: {
  error?: any
  isLoading?: boolean
  response?: any,
  url: RequestInfo
}) {
  return {
    response: null,
    error: null,
    isLoading: true,
    ...args,
  }
}

const useApi = (
  url: RequestInfo,
  options = null
): State => {
  const [state, setState] = React.useState(() => initialState({url}))

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching:", url)
        const res = await fetch(url, {
          ...(options || {}),
        })

        if (res.status >= 400) {
          setState(
            initialState({
              error: await res.json(),
              isLoading: false,
              url
            })
          )
        } else {
          setState(
            initialState({
              response: await res.json(),
              isLoading: false,
              url
            })
          )
        }
        // TODO: Use Result instead
      } catch (error) {
        setState(
          initialState({
            error: {
              error: (error as Error).message,
            },
            isLoading: false,
            url
          })
        )
      }
    }
    fetchData()
  }, [url, options])

  return state
}

export default useApi
