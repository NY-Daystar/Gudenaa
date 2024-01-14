/**
 * Filter items list if needed
 * If no limit set we keep the original list
 * @param {array} $items - List of Cypress items
 * @param {int} limit - number of elements to keep
 * @param {int} offset - number of elements to skip in the beginning
 * @returns new Cypress array
 */
export const itemsFiltered = function ($items, limit, offset = 0) {
    return limit === 0 ? $items : $items.slice(offset, limit)
}

/**
 * Extract hostname from url
 *  Ex: https://en.wikipedia.org/wiki/Peaky_Blinders_(TV_series)
 *  Will return : https://en.wikipedia.org/
 * @param {string} url - url to extract data
 * @returns only hostname with protocol
 */
export const getHostname = function (url) {
    // Regex to match group string before first '/'
    const regex = /^(.*?:\/\/[^/]+\/)/
    const match = url.match(regex)
    return match[1] ?? null
}

/**
 * Verify is link is absolute or relative
 *  Ex: https://en.wikipedia.org/wiki/Peaky_Blinders_(TV_series)
 *  => Match is not null, it will return : true
 *  Ex2: /wiki/Peaky_Blinders_(TV_series)
 *  => Match is null, it Will return false
 * @param {string} url - url to verify
 * @returns true if uri is valid false if it's relative
 */
const isAbsoluteUri = function (url) {
    // Regex to match group string before first '/'
    const regex = /^(http|https)/
    const match = url.match(regex)
    return match !== null
}

/**
 * convert items list cypress into an array for csv later
 * @param {array} $items - List of Cypress items
 * @param {string} hostname - hostname to prefix on each link if it's not referenced (relative link)
 * @returns array standard with index, text and href tag attribute
 */
export const csvArray = function ($items, hostname) {
    const data = []
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
export const asyncWriteCsv = async function (path, data) {
    return await cy.writeFile(path, data)
}
