import { showFeature } from "../info.js";

describe("showFeature()", () => {
  const feature = JSON.parse(
    '{"type":"Feature","properties":{"OBJECTID":1,"zip":"91108","jenicategory":"Lowest","jenipctl":0,"jenirank":277,"riskcategory":"Lowest","riskpctl":0.4,"driverscategory":"Lowest","driverspctl":0.7,"systemcategory":"Lowest","systempctl":3.3,"neighborhood":"San Marino","sup_dist":"District 5","spa":"SPA 3 - San Gabriel","csa":"City of San Marino","SHAPE_Length":0.17741888017717414,"SHAPE_Area":0.0009615440793535967},"geometry":{"type":"MultiPolygon","coordinates":[[[[-118.10864463399997,34.13732829500003],[-118.10841613899998,34.13732834600006],[-118.10841597099994,34.13729214600005],[-118.10818239999998,34.137293647000035]]]]}}'
  );

  it("shows feature", async () => {
    const html = `<!DOCTYPE html><html><body><div id="info">info</div><div id="map">map</div></body></html>`;
    // const dom = new JSDOM(html, { url: "http://localhost/" });
    // console.log(dom.window.document.innerHTML);
    document.body.innerHTML = html;
    const {
      properties: { zip, jenirank },
    } = feature;
    showFeature(feature, 277);
    expect(document.querySelector("#info h1").textContent).toBe(
      `Zipcode: ${zip}`
    );
    expect(document.querySelector("#info .info-field").textContent).toContain(
      `JENI Rank: ${jenirank} of 277`
    );
  });
});
