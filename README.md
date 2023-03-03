# Indiestrolche Schedule

Shows the Indiestrolche schedule of the current week based on their Twitch schedules.

## Usage

Requirements:

- node.js 18 or greater
- redis

Before you can run the application, you need to set your Twitch client secret and client id in the .env file.

```bash
# Copy .env.example to .env
cp .env.example .env
```

Adjust the values of `TWITCH_CLIENT_ID` and `TWITCH_CLIENT_SECRET` to match the ones you got from the Twitch dev console.
You can create a Twitch API app and get the required tokens here: https://dev.twitch.tv/console

After setting up the environment, you can start the app.

```bash
# Running in dev mode with hot reload
npm run dev
```

Building and running the app in production mode locally is also possible.

```bash
# Build in production mode
npm run build

# Run prod build
npm run start
```

## Development

This app is built with [remix](https://remix.run/) and based on the [indie-stack](https://github.com/remix-run/indie-stack).

#### Testing

Tests are built with Vitest

```bash
# Run tests
npm test

# Run a specific test
npm test app/lib/isSameDay.test.ts
```

#### Deployment

Each change on the `main` branch is deployed to production.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

Created by Mark Hähnel and released under the terms of the [MIT](https://choosealicense.com/licenses/mit/)
