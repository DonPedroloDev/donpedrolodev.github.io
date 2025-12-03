describe("template spec", () => {
    it("passes", () => {
        cy.visit("http://127.0.0.1:8000/formulario");
    });

    it("H1-FE-1.1", function () {
        cy.visit("http://127.0.0.1:8000/formulario");

        cy.get('#app input[placeholder="Mi viaje a Costa Rica"]').type(
            "Mi viaje a Costa Rica"
        );
        cy.get("#app button.swap-btn").click();

        cy.get('#app input[placeholder="Escribe tu destino..."]').type("Costa");
        cy.get("#app li").click();

        cy.get("#app div.date-row div:nth-child(1) input")
            .type("2025-12-01")
            .blur();

        cy.get("#app div.date-row div:nth-child(2) input")
            .type("2025-12-10")
            .blur();

        cy.get("#app select.select-input").select("Aventura");
        cy.get("#app button.save-btn").click();
    });

    it("H1-FE-1.2", function () {
        cy.visit("http://127.0.0.1:8000/formulario");

        cy.get('#app input[placeholder="Mi viaje a Costa Rica"]').type(
            "Mi viaje a Costa Rica"
        );
        cy.get("#app button.swap-btn").click();

        cy.get("#app div.date-row div:nth-child(1) input")
            .type("2025-12-01")
            .blur();

        cy.get("#app div.date-row div:nth-child(2) input")
            .type("2025-12-10")
            .blur();

        cy.get("#app select.select-input").select("Aventura");
        cy.get("#app button.save-btn").click();
    });

    it("H1-FE-1.3", function () {
        cy.visit("http://127.0.0.1:8000/formulario");

        cy.get('#app input[placeholder="Mi viaje a Costa Rica"]').type(
            "Mi viaje a Costa Rica"
        );
        cy.get("#app button.swap-btn").click();

        cy.get('#app input[placeholder="Escribe tu destino..."]').type("Costa");
        cy.get("#app li").click();

        cy.get("#app div.date-row div:nth-child(1) input")
            .type("2025-12-10")
            .blur();

        cy.get("#app div.date-row div:nth-child(2) input")
            .type("2025-12-01")
            .blur();

        cy.get("#app select.select-input").select("Aventura");
        cy.get("#app button.save-btn").click();
    });

    it("H1-FE-1.4", function () {
        cy.visit("http://127.0.0.1:8000/formulario");
        cy.get("#app button.swap-btn").click();

        cy.get('#app input[placeholder="Escribe tu destino..."]').click();
        cy.get('#app input[placeholder="Escribe tu destino..."]').type("Costa");
        cy.get("#app li").click();

        cy.get("#app div.date-row div:nth-child(1) input")
            .type("2025-12-01")
            .blur();

        cy.get("#app div.date-row div:nth-child(2) input")
            .type("2025-12-10")
            .blur();

        cy.get("#app button.save-btn").click();
    });

    it("H1-FE-2.1", function () {
        cy.visit("http://127.0.0.1:8000/formulario");
        cy.get(
            '#app input[placeholder="Escribe tu lugar de origen..."]'
        ).click();
        cy.get('#app input[placeholder="Escribe tu lugar de origen..."]').type(
            "Merida"
        );
        cy.get("#app button.swap-btn").click();
        cy.get('#app input[placeholder="Escribe tu destino..."]').click();
        cy.get('#app input[placeholder="Escribe tu destino..."]').type(
            "Cancun"
        );
        cy.get("#app div:nth-child(5)").click();
    });
});
