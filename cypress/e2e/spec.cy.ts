import { OPTIONS } from "@/util/constants";

describe("JENI Map spec", () => {
  it("Should support main user flow", () => {
    function showsPopupAfterMouseMove(text: string) {
      cy.get("canvas").trigger("mousemove");
      cy.contains(text);
    }

    function showsInfoAfterMapClick() {
      cy.get("canvas").click();
      cy.contains("JENI Rank");
      cy.contains("JENI Percentile");
      cy.contains("Neighborhood");
      cy.contains("About JENI");
    }

    cy.visit(`http://localhost:${Cypress.env("app_port") || 5137}/`);
    cy.contains("LA County JENI");
    cy.contains("More about JENI");
    cy.contains("Map Data:", { timeout: 10000 });
    showsInfoAfterMapClick();

    Object.entries(OPTIONS).forEach(([key, name]) => {
      cy.get("select").select(key);
      showsInfoAfterMapClick();
      showsPopupAfterMouseMove(name);
    });

    cy.get("canvas");
  });
});
