// import * as useListener from "@use-it/event-listener";
import {useThwack} from "./useThwack";

export {RequestState as State} from "./useThwack";

const apiUrl = "https://dog.ceo/api/breeds/image/random";

export const useRandomDog = () => {
  const { data, load, state, error } = useThwack(apiUrl); 

  return {
    state,
    imageUrl: data?.message,
    error,
    load: () => load(apiUrl)
  };
};
