/** File to extract list of youtube playlist */

import config from "../../config.json";
import { itemsFiltered, getHostname, csvArray, writeCsv } from "./helper/helper";

describe("Get into youtube's playlist", () => {
	it("get all videos links of its playlist", () => {
		const { playlist, selector, filePath } = config;
		cy.log("TT", playlist, selector, filePath);
		config.limit === 0 || isNaN(config.limit) ? 0 : config.limit;
		// cy.log(`Url scrapped: ${url}`);
		// cy.log(`Selector css: ${selector}`);
		// cy.log(`Limit of elements to scrap: ${limit}`);
		// cy.log(`File to save link extracted: ${filePath}`);
	});
});

// const limit = config.limit === 0 || isNaN(config.limit) ? 0 : config.limit;
// cy.log(`Url scrapped: ${url}`);
// cy.log(`Selector css: ${selector}`);
// cy.log(`Limit of elements to scrap: ${limit}`);
// cy.log(`File to save link extracted: ${filePath}`);

// // Launch webpage
// cy.visit(url);

// // Verify if selector exist
// cy.get(selector, { timeout: 10000 }).should("exist");

// const $selected = cy.get(selector);
// // Count elements who match selector
// cy.log(`document.querySelectorAll("${selector}).length`);
// $selected.then(($items) => {
// 	const count = Cypress.$($items).length;
// 	cy.log(`Items list (${count}) : `, $items);

// 	// Filter if necessary
// 	$items = itemsFiltered($items, limit);
// 	cy.log(`Items filtered (${Cypress.$($items).length}): `, $items);

// 	const hostname = getHostname(url);
// 	cy.log("Hostname", hostname);

// 	const links = csvArray($items, hostname);
// 	cy.log("Array of data built for csv", links);

// 	// Convert array to csvData
// 	const csvContent = links.join("\n");

// 	// Write in csv file
// 	cy.log(`Writing data in ${filePath}...`);
// 	writeCsv(filePath, csvContent);
// 	cy.log(`Data written in ${filePath}`)
