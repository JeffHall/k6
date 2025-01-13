import http from "k6/http";
import { sleep } from "k6";

export const options: {
  cloud: {
    distribution: {
      [key: string]: {
        loadZone: string;
        percent: number;
      };
    };
  };
  vus: number;
  duration: string;
} = {
  cloud: {
    distribution: {
      // distributionLabel1: { loadZone: "amazon:sa:cape town", percent: 100 },
      distributionLabel2: { loadZone: "amazon:us:portland", percent: 100 },
    },
  },
  vus: 1,
  duration: "10s",
};

export default function (): void {
  /*
  K6 uses a specific syntax for reading env variables:
  https://grafana.com/docs/k6/latest/using-k6/environment-variables/
  */
  const url =
    `${__ENV.PUBLIC_API_URL}/` + "graphql" ||
    "https://api-int.skylight.earth/graphql";
  const query = `{
    query: vessel(
    vesselId: "B:224933000:1681376115:1580146:1000022"
    ) {
    vessel_id flag_code mmsi
    }
    }`;
  const payload = JSON.stringify({ query });

  const params = {
    headers: {
      Authorization: `Bearer ${__ENV.AUTH_TOKEN}`,
      "Content-Type": "application/json",
    },
  };
  http.post(url, payload, params);
  sleep(1);
}
