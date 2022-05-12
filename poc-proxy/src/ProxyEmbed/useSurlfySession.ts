import { useEffect, useState } from "react";
import { SURFLY_API_KEY } from "../constants";

export function useSurlfySession(targetUrl: string) {
  const [surflyLink, setSurflyLink] = useState<string>();
  const [state, setState] = useState<"loading" | "done" | "error">("loading");

  useEffect(() => {
    const initialiseSession = async () => {
      console.log('start load');
      setState("loading")

      try {
        const params = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            url: targetUrl,
            ui_off: true,
            // headless: true,
            script_embedded: "https://astounding-sunburst-5be681.netlify.app/static/js/proxy.js", // point this URL to your own embedded script
          }),
        };

        console.time("surfly-session");
        const res = await fetch(`https://surfly.com/v2/sessions/?api_key=${SURFLY_API_KEY}`, params);
        const data = await res.json();

        console.timeEnd("surfly-session");
        console.log('surfly session loaded', { data });

        setSurflyLink(data.leader_link);
        setState("done");
      } catch (e) {
        console.error("error while loading surfly", e);
        setState("error");
      }
    }

    initialiseSession();
  }, [targetUrl]);

  return {
    surflyLink,
    state
  }
}