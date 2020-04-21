import { useEffect, useState, useCallback } from "react";
import thwack, {ThwackResponse, ThwackOptions, ThwackError} from "thwack";

export enum RequestState {
  Idle = "idle",
  Loading = "loading",
  Response = "response",
  Error = "error",
}

export const useThwack = (initialUrl: string, options?:ThwackOptions) => {
  const [state, setState] = useState(initialUrl ? RequestState.Loading : RequestState.Idle);
  const [error, setError] = useState<null | ThwackError>(null);
  const [thwackResponse, setThwackResponse] = useState<null | ThwackResponse>(null);

  const load = useCallback(async (url: string, options?:ThwackOptions) => {
    setState(RequestState.Loading);

    try {
      const response = await thwack(url, options);

      setThwackResponse(response);
      setState(RequestState.Response);
    } catch (ex) {
      if (!(ex as ThwackError)) {
        throw ex;
      }
      setError(ex);
      setState(RequestState.Error);
    }
  }, []);

  useEffect(() => {
    if (initialUrl) {
      load(initialUrl, options);
    }
  }, [load, initialUrl, options]);

  return {
    state,
    thwackResponse,
    data: thwackResponse?.data,
    error,
    load
  };
};
