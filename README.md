# jeni-map

An interactive map of Justice Equity Need Index (JENI) scores by zipcode in Los Angeles County.

[JENI](https://www.catalystcalifornia.org/campaign-tools/maps-and-data/justice-equity-need-index) was developed by members of the Justice Equity Alliance to provide a rigorous, data-driven model for mapping inequities in the justice system in LA. The soure data is available [here](https://data.lacounty.gov/datasets/2baac0078a9f424e99b0c303e9c8b81b).

![screenshot of jeni-map](https://github.com/lovemedicine/jeni-map/blob/main/assets/jeni-map-screenshot.jpg)

### Instructions

You can install this project locally if you have [Node.js](https://nodejs.org) installed and a [Mapbox access token](https://docs.mapbox.com/help/getting-started/access-tokens/).

1. Clone this repository.

2. Copy `config.sample.ts` to `config.ts` and include your Mapbox access token.

3. Start the dev server `npm run dev`.

4. The map page is served at [http://localhost:5173](http://localhost:5173) and should open automatically when starting the server.

5. To run the E2E tests using cypress, first start the test server:

```
npm run test-server
```

Once the server has started, open a new shell and run the E2E tests:

```
npm run e2e-test
```

### TODO

- bundle browser JS
- error handling
- sanity tests
