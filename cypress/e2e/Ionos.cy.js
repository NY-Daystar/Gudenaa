describe("Ionos.fr connection page", () => {
	it("Display content of class Tag", () => {
		let url = "https://login.ionos.fr/";
		let className = ".oao-navi-app-name-span-nl";
		let expected = "Connexion";
		cy.visit(url);
		cy.get(className)
			.invoke("text")
			.then(value => {
				cy.log(`content of ${className} : ${value}`);
				expect(value.toString().trim()).equal(expected);
			});
	});
});
