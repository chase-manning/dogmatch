import ReactGA from "react-ga4";

const GA_ID = "G-1TBZJXPJF4";

export const START_QUIZ_EVENT = "start_quiz";
export const COMPLETE_QUIZ_EVENT = "complete_quiz";
export const SAY_HI_EVENT = "say_hi";
export const DONATE_EVENT = "donate";

const triggerEvent = (event: string) => {
  ReactGA.initialize(GA_ID);
  ReactGA.event(event);
};

export default triggerEvent;
