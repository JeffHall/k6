import { default as queryAoisV1 } from "./aoisV1.ts";
import { default as searchAois } from "./aoisV2.ts";
import { default as queryVesselsByVesselId } from "./vesselByVesselId.ts";
import { Options } from "k6/options";

export const options: Options = {
  thresholds: {
    http_req_failed: ["rate<0.01"], // HTTP errors should be less than 1%
    http_req_duration: ["p(99)<500"], // 99% of requests should be below 500ms
  },
  scenarios: {
    vessselEndpoint: {
      exec: "testVesselByVesselId",
      executor: "constant-vus",
      vus: 1,
      duration: "10s",
    },
    aoisV1: {
      exec: "testAoisV1",
      executor: "constant-vus",
      vus: 2,
      duration: "20s",
    },
    searchAois: {
      exec: "testAoisV2",
      executor: "constant-vus",
      vus: 3,
      duration: "30s",
    },
  },
};

export function testVesselByVesselId() {
  queryVesselsByVesselId();
}

export function testAoisV1() {
  queryAoisV1();
}

export function testAoisV2() {
  searchAois();
}

// Output a summary of test results to a JSON file
export function handleSummary(data) {
  return {
    "test_results/summary.json": JSON.stringify(data),
  };
}
