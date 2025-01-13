import http from "k6/http";
import { sleep, check, fail } from "k6";
import { options } from "./common.ts";

export { options };

export default function (): void {
  /*
  K6 uses a specific syntax for reading env variables:
  https://grafana.com/docs/k6/latest/using-k6/environment-variables/
  */
  const url =
    `${__ENV.PUBLIC_API_URL}/graphql` ||
    "https://api-int.skylight.earth/graphql";
  const query = `{
    query: vessel(
    vesselId: "B:224933000:1681376115:1580146:1000022"
    ) {
    vessel_id flag_code mmsi
    }
    }`;
  const payload = JSON.stringify({ query });

  if (!__ENV.AUTH_TOKEN) {
    console.error("AUTH_TOKEN is not defined. Skipping the request.");
    return;
  }

  const params = {
    headers: {
      Authorization: `Bearer ${__ENV.AUTH_TOKEN}`,
      "Content-Type": "application/json",
    },
  };

  const response = http.post(url, payload, params);

  // Validate response status
  const success = check(response, {
    "response status is 200": (r) => r.status === 200,
  });

  if (!success) {
    console.error(`Request failed with status ${response.status}`);
    fail("Request failed");
  }

  sleep(1);
}
