/** File to extract list of links into a csv file */

import config from "../../config.json"

describe("Get acces to web page which has a list of links", async () => {
    it("Extract links", async () => {
        const { url, selector, filePath } = config
        const limit =
            config.limit == 0 || isNaN(config.limit) ? 0 : config.limit
        cy.log(`Url scrapped: ${url}`)
        cy.log(`Selector css: ${selector}`)
        cy.log(`Limit of elements to scrap: ${limit}`)
        cy.log(`File to save link extracted: ${filePath}`)

        // Launch webpage
        cy.visit(url)

        // Verify if selector exist
        cy.get(selector, { timeout: 10000 }).should("exist")

        const $selected = cy.get(selector)
        document.querySelectorAll(".mw-content-ltr.mw-parser-output > ul > li")
        // Count elements who match selector
        cy.log(`document.querySelectorAll("${selector}).length`)
        $selected.then(async ($items) => {
            const count = Cypress.$($items).length
            cy.log(`Items list (${count}) : `, $items)

            // Filter if necessary
            $items = itemsFiltered($items, limit)
            cy.log(`Items filtered (${Cypress.$($items).length}): `, $items)

            const hostname = getHostname(url)
            cy.log("Hostname", hostname)

            const links = csvArray($items, hostname)
            cy.log("Array of data built for csv", links)

            // Convert array to csvData
            const csvContent = links.join("\n")

            // Write in csv file
            cy.log(`Writing data in ${filePath}...`)
            await asyncWriteCsv(filePath, csvContent)
            cy.log(`Data written in ${filePath}`)

            // TODO for v2
            // Get and navigate to link in depth 2
            // cy.get(selector)
            // 	.first()cd
            // 	.invoke("attr", "href")
            // 	.then(url_depth => {
            // 		cy.log("url_depth_2", url_depth);
            // 		cy.visit(url_depth);
            // 	});
        })
    })
})

/**
 * Filter items list if needed
 * If no limit set we keep the original list
 * @param {array} $items - List of Cypress items
 * @param {int} limit - number of elements to keep
 * @param {int} offset - number of elements to skip in the beginning
 * @returns new Cypress array
 */
const itemsFiltered = function ($items, limit, offset = 0) {
    return limit == 0 ? $items : $items.slice(offset, limit)
}

/**
 * Extract hostname from url
 *  Ex: https://en.wikipedia.org/wiki/Peaky_Blinders_(TV_series)
 *  Will return : https://en.wikipedia.org/
 * @param {string} url - url to extract data
 * @returns only hostname with protocol
 */
const getHostname = function (url) {
    // Regex to match group string before first '/'
    const regex = /^(.*?:\/\/[^/]+\/)/
    const match = url.match(regex)
    return match[1] ?? null
}

/**
 * Verify is link is absolute or relative
 *  Ex: https://en.wikipedia.org/wiki/Peaky_Blinders_(TV_series)
 *  Will return : true
 *  Ex2: /wiki/Peaky_Blinders_(TV_series)
 *  Will return false
 * @param {string} url - url to verify
 * @returns true if uri is valid false if it's relative
 */
const isAbsoluteUri = function (url) {
    // Regex to match group string before first '/'
    const regex = /^(http|https)/
    const match = url.match(regex)
    if (match) return true
    return false
}

/**
 * convert items list cypress into an array for csv later
 * @param {array} $items - List of Cypress items
 * @param {string} hostname - hostname to prefix on each link if it's not referenced (relative link)
 * @returns array standard with index, text and href tag attribute
 */
const csvArray = function ($items, hostname) {
    let data = []
    $items.each((index, item) => {
        const text = Cypress.$(item).text()
        let href = Cypress.$(item).attr("href")
        if (!isAbsoluteUri(href)) href = `${hostname}/${href}`
        data.push(`${index},${text},${href};`)
    })
    return data
}

/**
 * Write csv file into `path` with `data` content
 * @param {string} path - path of csv file relative to the project
 * @param {Array} data - data to insert in the csv
 * @returns true if file create false otherwise
 */
const asyncWriteCsv = async function (path, data) {
    return await cy.writeFile(path, data)
}
