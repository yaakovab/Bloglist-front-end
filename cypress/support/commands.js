// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', (username, password) => {
    cy.get('input[name="Username"]').type(username)
    cy.get('input[name="Password"]').type(password)
    cy.get('#login-button').click()
})

Cypress.Commands.add('loginThruBe', ({ username, password }) => {
    cy.request('POST', 'http://localhost:3003/api/login', { username, password })
        .then(response => {
            localStorage.setItem('loggedUser', JSON.stringify(response.body))
            cy.visit('http://localhost:3000')
        })
})

Cypress.Commands.add('createBlog', (title, author, url) => {
    cy.get('input[name="Title"]').type(title)
    cy.get('input[name="Author"]').type(author)
    cy.get('input[name="Url"]').type(url)
    cy.get('#create-blog-button').click()
})


Cypress.Commands.add('createBlogThruBe', ({ title, author, url, likes }) => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:3003/api/blogs',
        body: { title, author, url, likes },
        headers: { authorization: `bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}` }
    })
    cy.visit('http://localhost:3000')
})
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// const MyResume = () => {
//     const [employed, setEmployed] = useState(false)
//     const [skills, setSkills] = useState([C++, Python, JavaScript,
//         NodeJS, Express, React, JSON, Jest, Cypress])

//         const likeAndShare = () => setEmployed(true)

//         const addSkill = () => {
//             while (true) {
//                 setSkills(skills.concat(newSkill))
//             }
//         }
//     return (
//         <>
//             <h1>Yaacov Abramovich</h1>
//             <h2>Looking for my 1st position</h2>
//             {skills.map(skill =>
//                 <Skill key={skill.id} />
//             )}
//             <button onClick={likeAndShare}>Like and Share</button>
//         </>
//     )
// }