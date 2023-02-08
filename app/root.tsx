import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";

import tailwindStylesheetUrl from "./styles/tailwind.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
};

export const meta: MetaFunction = () => ({
  // eslint-disable-next-line unicorn/text-encoding-identifier-case
  charset: "utf-8",
  title: "Indiestrolche Contentvorhersage",
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0",
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
