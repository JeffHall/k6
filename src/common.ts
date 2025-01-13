export const options: {
  cloud: {
    distribution: {
      [key: string]: {
        loadZone: string;
        percent: number;
      };
    };
  };
  scenarios: {
    [key: string]: {
      executor: string;
      vus: number;
      iterations: number;
      startTime: string;
    };
  };
  thresholds: {
    [key: string]: string[];
  };
} = {
  cloud: {
    distribution: {
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