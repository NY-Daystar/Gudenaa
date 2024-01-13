import * as config from "../../config.json";

describe("Get acces to web page which has a list of links", async () => {
	it("Extract links", async () => {
		const url = config.url;
		const selector = config.selector;
		const filePath = config.datafile;
		const limit =
			config.limit == 0 || isNaN(config.limit) ? 0 : config.limit;
		cy.log(`Url scrapped: ${url}`);
		cy.log(`Selector css: ${selector}`);
		cy.log(`Limit of elements to scrap: ${limit}`);
		cy.log(`File to save link extracted: ${filePath}`);

		// Launch webpage
		cy.visit(url);

		// Verify if selector exist
		cy.get(selector, { timeout: 10000 }).should("exist");

		const $selected = cy.get(selector);
		cy.log("SS", $selected);
		// Count elements who match selector
		cy.log(`document.querySelectorAll("${selector}).length`);
		$selected.then($items => {
			cy.log("STT");
			const count = Cypress.$($items).length;
			cy.log(`Items list (${count}) : `, $items);

			// Filter if necessary
			$items = itemsFiltered($items, limit);
			cy.log(`Items filtered (${Cypress.$($items).length}): `, $items);

			const links = csvArray($items);
			cy.log("Array of data built for csv", links);

			// Convert array to csvData
			const csvContent = links.join("\n");

			// Write in csv file
			cy.log(`Writing data in ${filePath}...`);
			const ok = writeCsv(filePath, csvContent);

			// TODO for v2
			// Get and navigate to link in depth 2
			// cy.get(selector)
			// 	.first()cd
			// 	.invoke("attr", "href")
			// 	.then(url_depth => {
			// 		cy.log("url_depth_2", url_depth);
			// 		cy.visit(url_depth);
			// 	});
		});
	});
});

// TODO
/**
 * TODO
 * @param {*} $items
 */
const itemsFiltered = function ($items, limit, offset = 0) {
	cy.log("swww");
	return limit == 0 ? $items : $items.slice(offset, limit);
	return $items;
};

/**
 * TODO
 * @param {*} $items
 * @returns
 */
const csvArray = function ($items) {
	let data = [];
	$items.each((index, item) => {
		const text = Cypress.$(item).text();
		const href = Cypress.$(item).attr("href");
		data.push(`${index},${text},${href};`);
	});
	return data;
};

/**
 * TODO
 * @param {*} $items
 * @returns
 */
const writeCsv = function (path, data) {
	try {
		cy.writeFile(path, data).then(v => {
			cy.log("RR", v);
			cy.log(`File ${path} created`);
		});
	} catch (exception) {
		cy.log("Exception : ", e);
		return false;
	}
	return true;
};
