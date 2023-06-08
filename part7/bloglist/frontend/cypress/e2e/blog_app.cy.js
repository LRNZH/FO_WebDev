/* eslint-disable no-undef */
describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Superuser',
      username: 'root',
      password: 'salainen',
    }

    const newUser = {
      name: 'Ada Nwannem',
      username: 'adobi',
      password: 'ada1989$',
    }

    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)

    cy.request('POST', `${Cypress.env('BACKEND')}/users`, newUser)

    cy.visit('')
  })

  it('front page is accessible', function () {
    cy.contains('Blogs app')
    cy.contains('blogs')
  })

  it('login fails with wrong password', function () {
    cy.contains('Username').type('root')
    cy.contains('Password').type('wrong')
    cy.get('#login-button').should('be.visible').click()
    cy.get('.ant-alert-error')
      .should('exist')
      .should('contain', 'Wrong username or password')

    cy.get('html').should('not.contain', 'Superuser logged in')
  })

  it('user can log in', function () {
    cy.contains('Username').type('root')
    cy.contains('Password').type('salainen')
    cy.get('#login-button').click()

    cy.contains('Superuser logged in')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'root', password: 'salainen' })
    })

    it('a new blog can be created', function () {
      cy.get('#newBlog-button').click()
      cy.contains('Title').type('Cypress and its idiosyncracies')
      cy.contains('Author').type('Cypress E2E')
      cy.contains('Blog url').type('www.cypress.io')
      cy.contains('Likes').type(23)
      cy.contains('Create').click()
      cy.contains('"Cypress and its idiosyncracies" by Cypress E2E')
    })

    describe('if a blog entry exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Another Cypress Quirk',
          author: 'Cypress E2E',
          url: 'www.advancedcypress.io',
          likes: 14,
        })
      })

      it('it can be expanded fully and liked', function () {
        cy.contains('"Another Cypress Quirk" by Cypress E2E')
        cy.get('#toggle-details-button').click()
        cy.contains('"Another Cypress Quirk" by Cypress E2E')
        cy.contains('www.advancedcypress.io')
        cy.contains('14 likes')
        cy.contains('Saved by: Superuser')
        cy.get('#like-button').click()
        cy.contains('15 likes')
      })

      it('it can be deleted by the creator', function () {
        cy.contains('Superuser logged in')
        cy.contains('"Another Cypress Quirk" by Cypress E2E')
        cy.get('#toggle-details-button').click()
        cy.get('#delete-button').click()
        cy.contains('Are you sure you want to delete "Another Cypress Quirk"?')
        cy.contains('Yes').click()
        cy.get('.ant-alert-error')
          .should('exist')
          .should(
            'contain',
            '"Another Cypress Quirk" by Cypress E2E has been deleted'
          )
      })

      it('another user can like the blog but cannot see the delete button', function () {
        cy.contains('Superuser logged in')
        cy.contains('"Another Cypress Quirk" by Cypress E2E')
        cy.get('#toggle-details-button').click()
        cy.get('#delete-button')
        cy.get('#logout-button').click()
        cy.contains('Username').type('adobi')
        cy.contains('Password').type('ada1989$')
        cy.get('#login-button').click()
        cy.contains('Ada Nwannem logged in')
        cy.contains('"Another Cypress Quirk" by Cypress E2E')
        cy.get('#toggle-details-button').click()
        cy.get('#like-button').click()
        cy.contains('15 likes')
        cy.get('#delete-button').should('not.exist')
      })
    })


    describe('if numerous blog entries exist', function () {
      it('blogs are ordered by likes in descending order', function () {
        cy.createBlog({
          title: 'Another Cypress Quirk',
          author: 'Cypress E2E',
          url: 'www.advancedcypress.io',
          likes: 14,
        })
        cy.createBlog({
          title: 'Cypress has haters',
          author: 'Cypress E2E',
          url: 'www.oldcypress.io',
          likes: 3,
        })
        cy.createBlog({
          title: 'Give it up for Cypress',
          author: 'Cypress E2E',
          url: 'www.moderncypress.io',
          likes: 49,
        })
        cy.createBlog({
          title: 'Cypress will never stop',
          author: 'Cypress E2E',
          url: 'www.futurecypress.io',
          likes: 37,
        })

        cy.wait(2000)

        const titlesToSearch = [
          '"Give it up for Cypress" by Cypress E2E',
          '"Cypress will never stop" by Cypress E2E',
          '"Another Cypress Quirk" by Cypress E2E"',
          '"Cypress has haters" by Cypress E2E'
        ]

        const likeCounts = []

        cy.get('#card-container')
          .should('be.visible')
          .find('.ant-card-head-title') // Search for all blog titles
          .should('have.length.gt', 0)
          .each((titleElement) => {
            cy.wrap(titleElement)
              .invoke('text')
              .then((title) => {
                if (titlesToSearch.includes(title)) {
                  cy.wrap(titleElement)
                    .parents('#card')
                    .within(() => {
                      cy.get('#toggle-details-button')
                        .should('be.visible')
                        .click()

                      cy.get('#like-button')
                        .should('be.visible')
                        .click()

                      cy.get('#like-count')
                        .should('be.visible')
                        .invoke('text')
                        .then((likeCount) => {
                          const currentLikes = parseInt(likeCount)
                          likeCounts.push(currentLikes)
                        })
                    })
                }
              })
          })
          .then(() => {
            const isDescending = likeCounts.every((likes, index) => {
              if (index === 0) return true
              const previousLikes = likeCounts[index - 1]
              return likes <= previousLikes
            })
            // eslint-disable-next-line no-unused-expressions
            expect(isDescending).to.be.true
          })
      })
    })
  })
})