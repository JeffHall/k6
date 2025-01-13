import http from "k6/http";
import { sleep } from "k6";
import { options, url, params, validateResponse } from "./common.ts";

export { options };

export default function (): void {
  const query = `{
                  query: 
                    vessel
                      (
                        vesselId: "B:224933000:1681376115:1580146:1000022"
                      ) 
                    {
                      vessel_id 
                      flag_code 
                      mmsi
                    }
                }`;
  const payload = JSON.stringify({ query });

  const response = http.post(url, payload, params);

  // Validate response status
  validateResponse(response);

  sleep(1);
}
