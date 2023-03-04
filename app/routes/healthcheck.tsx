// learn more: https://fly.io/docs/reference/configuration/#services-http_checks
import type { LoaderArgs } from "@remix-run/node";
import { checkCache } from "~/lib/repo.server";

export async function loader({ request }: LoaderArgs) {
  const host = request.headers.get("X-Forwarded-Host") ?? request.headers.get("host");

  try {
    const url = new URL("/", `http://${host}`);

    await Promise.all([
      fetch(url.toString(), { method: "HEAD" }).then((r) => {
        if (!r.ok) throw r;
      }),
      checkCache(),
    ]);

    return new Response("OK");
  } catch (error: unknown) {
    console.log("healthcheck ❌", { error });
    return new Response("ERROR", { status: 500 });
  }
}
