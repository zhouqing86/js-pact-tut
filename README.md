`npm run ctest` to run consumer test, it will generate pact json into `pacts` directory.

`npm run ptest` to run provider test.

`cd pact-broker && docker-compose up` to run a local broker on port `8080`.

`npm run push` to publish pacts into local pact broker.
