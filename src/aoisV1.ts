import http from "k6/http";
import { sleep } from "k6";
import { options, url, params, validateResponse } from "./common.ts";

export { options };

export default function (): void {
  const query = `{
                  query: 
                    aoi {
                      geometry{
                        type 
                        coordinates
                      }
                      properties {
                        aoi_id 
                        name
                      }
                    }
                  }`;
  const payload = JSON.stringify({ query });

  const response = http.post(url, payload, params);

  // Validate response status
  validateResponse(response);

  sleep(1);
}
