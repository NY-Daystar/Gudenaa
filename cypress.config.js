/** Configuration for end to end  */

const { defineConfig } = require("cypress")

module.exports = defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            console.log(on, config)
        },
    },
})
