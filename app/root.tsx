import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";

import stylesheet from "~/tailwind.css";

export const links: LinksFunction = () => {
  return [
    { rel: "icon", type: "image/png", href: "images/icons/icon-128x128.png" },
    { rel: "manifest", href: "manifest.json" },
    { rel: "stylesheet", href: stylesheet },
  ];
};

export const meta: MetaFunction = () => ({
  // eslint-disable-next-line unicorn/text-encoding-identifier-case
  charset: "utf-8",
  title: "Indiestrolche Contentvorhersage",
  description: "Aktueller Programmplan der einzelnen Indiestrolche Streams.",
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0",
});

export default function App() {
  return (
    <html lang="de" className="h-full" data-theme="light">
      <head>
        <Meta />
        <Links />
      </head>
      <body
        className="h-full"
        style={{
          background:
            "conic-gradient(from -90deg at 25% 115%, #ff000038, #ff006638, #ff00cc38, #cc00ff38, #6600ff38, #0000ff38, #0000ff38, #0000ff38, #0000ff38)",
        }}
      >
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
