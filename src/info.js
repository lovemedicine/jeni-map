import { getRgbaFromPercentile } from "./choropleth.js";

export function showFeature(feature, count) {
  const { zip } = feature.properties;
  showInfo(renderFeature(feature, count));
  document.querySelector("#intro-link").addEventListener("click", () => {
    showIntro();
  });
}

function showInfo(html) {
  document.querySelector("#info").innerHTML = html;
}

const jeniFieldNames = {
  jeni: "JENI Percentile",
  system: "System Involvement",
  drivers: "Inequity Drivers",
  risk: "Criminalization Risk",
};

const municipalFieldNames = {
  neighborhood: "Neighborhood",
  sup_dist: "Supervisoral District",
  spa: "Service Planning Area",
  csa: "Countywide Statistical Area",
};

function renderFeature(feature, count) {
  const { properties } = feature;
  return (
    `
    <div><a href="javascript:void(0);" id="intro-link">&laquo; About JENI</a></div>
    <h1>${properties.zip}</h1>
    <div class="neighborhood">${properties.neighborhood}</div>` +
    renderField("JENI Rank", `${properties.jenirank} of ${count}`) +
    renderJeniFields(properties) +
    "<br />\n" +
    renderMunicipalFields(properties) +
    `
  `
  );
}

function renderJeniFields(properties) {
  return Object.keys(jeniFieldNames)
    .map((field) => {
      const name = jeniFieldNames[field];
      const scoreKey = field + "pctl";
      const catKey = field + "category";
      const score = roundScore(properties[scoreKey]);
      const category = properties[catKey];
      return renderJeniField(name, score, category);
    })
    .join("\n");
}

function renderJeniField(name, score, category) {
  const color = getRgbaFromPercentile(score);
  const style = `width: ${score}%; background-color: ${color};`;
  return `
    <div class="info-field"><strong>${name}</strong>: ${score} (${category})</div>
    <div class="info-bar-container">
      <div class="info-bar" style="${style}"></div>
    </div>
  `;
}

function renderMunicipalFields(properties) {
  return Object.keys(municipalFieldNames)
    .map((field) => {
      const name = municipalFieldNames[field];
      const value = properties[field];
      return renderField(name, value);
    })
    .join("\n");
}

function renderField(name, value) {
  return `<div class="info-field"><strong>${name}</strong>: ${value}</div>`;
}

function roundScore(score) {
  return Math.floor(score * 10) / 10;
}

export function showIntro() {
  showInfo(`
    <h2>LA County JENI</h2>
      <p>
        The Justice Equity Need Index (JENI) identifies ZIP Codes in greatest
        need of public investments in community healing, health, and
        prevention to help reverse historical injustices.
      </p>

      <p>
        JENI offers a means to map out the disparate burden that
        criminalization and a detention-first justice model place on specific
        communities. The index includes the following indicators:
      </p>

      <ul>
        <li>
          <strong>System Involvement</strong>: The system-involved population
          by ZIP Code results in direct needs for justice equity, as measured
          by adult and youth probation.
        </li>
        <li>
          <strong>Inequity Drivers</strong>: Root inequities across
          communities that contribute to racial and economic disparities as
          seen in incarceration and policing.
        </li>
        <li>
          <strong>Criminalization Risk</strong>: Conditions where the criminal
          justice system has historically taken a detention-first,
          prevention-last approach.
        </li>
      </ul>
      <div>
        <a href="https://www.catalystcalifornia.org/campaign-tools/maps-and-data/justice-equity-need-index" target="_blank">
          More about JENI &raquo;
        </a>
      </div>
    `);
}
