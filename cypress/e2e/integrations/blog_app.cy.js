
describe('Blog app', function () {
    beforeEach(function () {
        // makes a request to the backend to empty the db before each test
        cy.request('POST', 'http://localhost:3003/api/test/reset')
        const users = [
            {  // creates a new user to seed in db for the tests
                name: 'Illia Coslov',
                username: 'ill',
                password: 'secret'
            },
            {
                name: 'Miceal',
                password: 'secret',
                username: 'mcl'
            }
        ]
        // makes http request to the backend to seed a new user
        cy.request('POST', 'http://localhost:3003/api/users', users[0])
        cy.request('POST', 'http://localhost:3003/api/users', users[1])
        cy.visit('http://localhost:3000')
    })

    it('login form is shown', function () {
        cy.contains('log in to application')
    })

    describe('login', function () {
        it('successful with right credentials', function () {
            cy.login('ill', 'secret')

            cy.contains('ill logged in')
        })
        it('fails with wrong credentials', function () {
            cy.login('ill', 'wrong')
            cy.get('.failMessage')
                .should('contain', 'wrong username or password')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
        })
    })

    describe('when logged in', function () {
        beforeEach(function () {
            cy.loginThruBe({ username: 'ill', password: 'secret' })
        })

        it('a new blog can be added', function () {
            cy.contains('new blog').click()
            cy.createBlog('React patterns', 'Ron DeSantis', 'https://www.clouds.co.il')

            cy.get('.successMessage')
                .should('contain', 'a new blog React patterns by Ron DeSantis added')
                .and('have.css', 'color', 'rgb(0, 128, 0)')
            cy.contains('React patterns Ron DeSantis')
        })

        describe('and when some blog exist', function () {
            beforeEach(function () {
                cy.createBlogThruBe(
                    {
                        title: 'Changes in web development',
                        url: 'http://www.webdev.co.il',
                        author: 'Michael Gorbachov',
                        likes: 5,
                    })
                cy.createBlogThruBe(
                    {
                        title: 'Summer',
                        author: 'Mr Hot',
                        url: 'http://www.summer.com',
                        likes: 12
                    }
                )
            })

            it('like button adds likes to a blog', function () {
                cy.get('#view-button').click()
                cy.get('#like-button').click()

                cy.contains('likes 1')
            })

            it('a blog can be deleted by the one who created it', function () {
                cy.get('#view-button').click()
                cy.get('#delete-button').click()
                cy.on('window:confirm', function (str) {
                    expect(str).to.equal('Remove blog Changes in web development by Michael Gorbachov')
                })
                cy.on('window:confirm', () => true)
                cy.get('html').should('not.contain', 'Changes in web development Michael Gorbachov')
            })

            it('a blog cannot be deleted by user that did not create it', function () {
                cy.get('#logout-button').click()
                cy.loginThruBe({ username: 'mcl', password: 'secret' })
                cy.get('#view-button').click()
                cy.contains('Changes in web development Michael Gorbachov').parent().should('not.contain', 'remove')
            })

            it.only('blogs are ordered by num of likes in descending order', function () {
                cy.get('.title-author-hide-when-visible').eq(1).should('contain', 'Changes in web development Michael Gorbachov')

            })
        })
    })






})