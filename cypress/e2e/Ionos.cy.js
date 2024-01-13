describe("Ionos.fr connection page", () => {
	it("Display content of class Tag", () => {
		const url = "https://login.ionos.fr/";
		const selector = ".oao-navi-app-name-span-nl";
		const expected = "Connexion";
		cy.visit(url);

		cy.get(selector, { timeout: 10000 }).should("exist");

		cy.get(selector)
			.invoke("text")
			.then(value => {
				cy.log(`content of ${selector} : ${value}`);
				expect(value.toString().trim()).equal(expected);
			});
	});
});
