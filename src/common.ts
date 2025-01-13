import { check, fail } from "k6";

interface CloudDistribution {
  [key: string]: {
    loadZone: string;
    percent: number;
  };
}

interface ScenarioConfig {
  executor: string;
  vus: number;
  iterations: number;
  startTime: string;
}

interface Thresholds {
  [key: string]: string[];
}

interface K6Options {
  cloud: {
    distribution: CloudDistribution;
  };
  scenarios: {
    [key: string]: ScenarioConfig;
  };
  thresholds: Thresholds;
}

export const options: K6Options = {
  cloud: {
    distribution: {
      // Tests can only use multiple load zones with a paid k6 Grafana Cloud account
      // distributionLabel1: { loadZone: "amazon:sa:cape town", percent: 100 },
      distributionLabel2: { loadZone: "amazon:us:portland", percent: 100 },
    },
  },

  scenarios: {
    shared_iter_scenario: {
      executor: "shared-iterations",
      vus: 5,
      iterations: 15,
      startTime: "0s",
    },
  },

  thresholds: {
    http_req_failed: ["rate<0.01"], // HTTP errors should be less than 1%
    http_req_duration: ["p(99)<500"], // 99% of requests should be below 500ms
  },
};

/*
  K6 uses a specific syntax for reading env variables:
  https://grafana.com/docs/k6/latest/using-k6/environment-variables/
*/
if (!__ENV.AUTH_TOKEN) {
  throw new Error(
    "AUTH_TOKEN is not defined. Please set the AUTH_TOKEN environment variable."
  );
}

if (!__ENV.PUBLIC_API_URL) {
  throw new Error(
    "PUBLIC_API_URL is not defined. Please set the PUBLIC_API_URL environment variable."
  );
}

export const url =
  `${__ENV.PUBLIC_API_URL}/graphql` || "https://api-int.skylight.earth/graphql";

export const params = {
  headers: {
    Authorization: `Bearer ${__ENV.AUTH_TOKEN}`,
    "Content-Type": "application/json",
  },
};

interface Response {
  status: number;
}

export function validateResponse(response: Response): void {
  const success = check(response, {
    "response status is 200": (r: Response) => r.status === 200,
  });

  if (!success) {
    console.error(`Request failed with status ${response.status}`);
    fail("Request failed");
  }
}
