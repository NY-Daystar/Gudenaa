import * as config from "../../config.json";

describe("Write configuration file", async () => {
	let folder = "results";
	it("Write json file", async () => {
		let filePath = `${folder}/default-config.json`;
		cy.writeFile(filePath, config);
	});

	it("Write csv file", async () => {
		let filePath = `${folder}/array.csv`;
		let array = [];
		for (let i = 0; i < 5; i++) {
			array.push(`${i},Element ${i};`);
		}
		const csvContent = array.join("\n");
		cy.writeFile(filePath, csvContent);
	});
});
