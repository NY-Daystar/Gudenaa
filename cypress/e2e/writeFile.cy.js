/** Base script: to write data in a file */

import config from "../../config.json"

describe("Write configuration file", () => {
    const folder = "results"

    it("Write json file", () => {
        const filePath = `${folder}/default-config.json`
        cy.writeFile(filePath, config)
    })

    it("Write csv file", () => {
        const filePath = `${folder}/array.csv`
        const array = []
        for (let i = 0; i < 5; i++) {
            array.push(`${i},Element ${i};`)
        }
        const csvContent = array.join("\n")
        cy.writeFile(filePath, csvContent)
    })
})
