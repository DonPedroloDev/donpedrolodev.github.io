describe("template spec", () => {
    it("MostrarViajes", function () {
        cy.visit("http://127.0.0.1:8000");
        cy.get("#app div:nth-child(2) > h3.text-lg").should("exist");
        cy.get("#app div:nth-child(1) > p:nth-child(3)").should("exist");
        cy.get("#app div:nth-child(2) > p:nth-child(3)").should("exist");
        cy.get("#app div:nth-child(1) > p:nth-child(4)").should("exist");
        cy.get("#app div:nth-child(2) > p:nth-child(4)").should("exist");
        cy.get("#app div:nth-child(1) > p.inline-block").should("exist");
        cy.get("#app div:nth-child(2) > p.inline-block").should("exist");
        cy.get("#app div:nth-child(1) > p:nth-child(6)").should("exist");
        cy.get("#app div:nth-child(2) > p:nth-child(6)").should("exist");
        cy.get("#app div:nth-child(1) > p.my-2").should("exist");
        cy.get("#app div:nth-child(2) > p.my-2").should("exist");
        cy.get("#app img.rounded-md.object-cover").should("exist");
        cy.get("#app p.text-white").should("exist");
    });
});
