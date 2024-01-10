describe("Accès à une page spécifique avec une liste de liens", () => {
	it("Visite de la page et clic sur le premier lien", () => {
		let selector = ".col-mov-right > div > b > a";

		cy.visit(url);

		// Récupère le contenu text
		cy.get(selector)
			.first()
			.invoke("text")
			.then(value => {
				cy.log("Text: ", value);
			});

		// Get and navigate to link in depth 2
		cy.get(selector)
			.first()
			.invoke("attr", "href")
			.then(url_depth => {
				cy.log("url_depth_2", url_depth);
				cy.visit(url_depth);
			});
	});
});
