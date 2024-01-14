/** NOT FINISHED: Script to resolve cloudflare captcha */

describe("Accès à une page spécifique avec une liste de liens", () => {
    it("Visite de la page et clic sur le premier lien", () => {
        const url =
            "https://dl-protect.link/d9175c27?fn=T25lIFBpZWNlIC0gU2Fpc29uIDEgRXBpc29kZSAxIC0gW1ZPU1RGUl0%3D&rl=b2"
        let selector = ".container h3"
        cy.visit(url, {
            onBeforeLoad(win) {
                Object.defineProperty(win, "crypto", {
                    value: {
                        subtle: {},
                    },
                })
            },
        })

        // Récupère le contenu text
        cy.get(selector)
            .first()
            .invoke("text")
            .then((value) => {
                cy.log("Text: ", value)
            })
    })
})
