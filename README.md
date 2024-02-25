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

### Project structure

The main dependencies are Node.js and [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/guides/). Here are the project's main files:

- `server.js` is a simple node script that serves the HTML, CSS, and JS files in this project

- `index.html` is the entrypoint -- it includes the Mapbox GL JS and CSS files, `main.js` and `main.css` from this project, and the HTML skeleton

- `main.css` contains all the styling for the map except for styles passed directly to the Mapbox API

- `main.js` displays the intro text and builds the map

- `map.js` is where all of the Mapbox data sources, layers, and interactivity is added

- `info.js` controls rendering the intro and the zipcode views into the info section of the page

- `choropleth.js` is responsible for mapping JENI scores onto the map's color spectrum

- `config.js` is where the Mapbox access token is kept

- `/data` contains the GEOJson files for JENI data and the LA County boundary

- `/test` contains one very small file run by Jest and which tests very little

### TODO

- bundle browser JS
- error handling
- sanity tests
