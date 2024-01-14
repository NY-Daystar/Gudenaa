/** Base script: to write data in a file */

import config from "../../config.json"

describe("Write configuration file", async () => {
    const folder = "results"

    it("Write json file", async () => {
        const filePath = `${folder}/default-config.json`
        cy.writeFile(filePath, config)
    })

    it("Write csv file", async () => {
        const filePath = `${folder}/array.csv`
        let array = []
        for (let i = 0; i < 5; i++) {
            array.push(`${i},Element ${i};`)
        }
        const csvContent = array.join("\n")
        cy.writeFile(filePath, csvContent)
    })
})
