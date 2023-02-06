import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { Links, LiveReload, Meta, Outlet, ScrollRestoration } from "@remix-run/react";

import tailwindStylesheetUrl from "./styles/tailwind.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
};

export const meta: MetaFunction = () => ({
  // eslint-disable-next-line unicorn/text-encoding-identifier-case
  charset: "utf-8",
  title: "Indiestrolche Contentvorhersage",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="de" className="h-full" data-theme="light">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Outlet />
        <ScrollRestoration />
        {/* <Scripts />*/}
        <LiveReload />
      </body>
    </html>
  );
}
