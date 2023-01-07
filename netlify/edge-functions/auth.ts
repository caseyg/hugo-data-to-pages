import type { Context } from "https://edge.netlify.com";
import { Base64 } from "https://deno.land/x/bb64/mod.ts";

export default async (request: Request, context: Context) => {
  console.log("pageload")

  const url = new URL(request.url);

  if (url.searchParams.get("token")) {
    console.log("setting up new user");
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Basic " + String(btoa("project-test-53809353-9f51-4cd3-9d93-9563fb73571d:secret-test-TpeW2V2jIZzp3e5KD8EPfqMP9_rC5_YfuXo=")));

    var raw = JSON.stringify({
      "token": url.searchParams.get("token"),
      "session_duration_minutes": 60
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    const result = await fetch("https://test.stytch.com/v1/oauth/authenticate", requestOptions)
      .then(response => response.text())
      .then(result => JSON.parse(result))
      .catch(error => console.log('error', error));

    (async () => {
      if (result.status_code !== 404) {
        context.cookies.set({
          name: "token",
          value: result.session_token,
          path: "/"
        });
        context.cookies.set({
          name: "slack_access_token",
          value: result.provider_values.access_token,
          path: "/"
        });
      }
    })()
  }

  if (!url.searchParams.get("token") && context.cookies.get("token") && context.cookies.get("slack_access_token")) {
    console.log("authenticating logged in user")

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Basic " + String(btoa("project-test-53809353-9f51-4cd3-9d93-9563fb73571d:secret-test-TpeW2V2jIZzp3e5KD8EPfqMP9_rC5_YfuXo=")));

    var raw = JSON.stringify({
      "session_token": String(context.cookies.get("token"))
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    const result = await fetch("https://test.stytch.com/v1/sessions/authenticate", requestOptions)
      .then(response => response.text())
      .then(result => JSON.parse(result))
      .catch(error => console.log('error', error));

    (async () => {
      let status = await result.status;
      if (status) {
        console.log(status)
        context.cookies.delete("token");
        context.cookies.delete("slack_access_token");
      }
    })()

  }
};
