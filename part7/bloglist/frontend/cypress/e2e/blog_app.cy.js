describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Superuser',
      username: 'root',
      password: 'salainen'
    }

    const newUser = {
      name: 'Ada Nwannem',
      username: 'adobi',
      password: 'ada1989$'
    }

    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)

    cy.request('POST', `${Cypress.env('BACKEND')}/users`, newUser)

    cy.visit('')
  })

  it('front page is accessible', function() {
    cy.contains('Blogs app')
    cy.contains('blogs')
  })

  it('login fails with wrong password', function() {
    cy.get('#username').type('root')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error')
      .should('contain', 'Wrong username or password')
      /*.and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')*/

    cy.get('html').should('not.contain', 'Superuser logged in')
  })

  it('user can log in', function() {
    cy.get('#username').type('root')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()

    cy.contains('Superuser logged in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'root', password: 'salainen' })
    })

    it('a new blog can be created', function() {
      cy.get('#newBlog-button').click()
      cy.get('#title-input').type('Cypress and its idiosyncracies')
      cy.get('#author-input').type('Cypress E2E')
      cy.get('#url-input').type('www.cypress.io')
      cy.get('#likes-input').type(23)
      cy.get('#create-button').click()
      cy.contains('"Cypress and its idiosyncracies" by Cypress E2E')
    })

    describe('if a blog entry exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Another Cypress Quirk',
          author: 'Cypress E2E',
          url: 'www.advancedcypress.io',
          likes: 14
        })
      })

      it('it can be expanded fully and liked', function () {
        cy.contains('"Another Cypress Quirk" by Cypress E2E')
        cy.get('#view-button').click()
        cy.contains('"Another Cypress Quirk" by Cypress E2E')
        cy.contains('url: www.advancedcypress.io')
        cy.contains('likes: 14')
        cy.contains('Saved by: Superuser')
        cy.get('#like-button').click()
        cy.contains('likes: 15')
      })

      it('it can be deleted by the creator', function () {
        cy.contains('Superuser logged in')
        cy.contains('"Another Cypress Quirk" by Cypress E2E')
        cy.get('#view-button').click()
        cy.get('#remove-button').click()
        cy.get('.error')
          .should('contain', '"Another Cypress Quirk" by Cypress E2E has been deleted')
      })

    })

    describe('if a blog entry exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Another Cypress Quirk',
          author: 'Cypress E2E',
          url: 'www.advancedcypress.io',
          likes: 14
        })
      })


      it('another user can like the blog but cannot see the delete button', function () {
        cy.contains('Superuser logged in')
        cy.contains('"Another Cypress Quirk" by Cypress E2E')
        cy.get('#view-button').click()
        cy.get('#remove-button').should('contain', 'delete')
        cy.get('#logout-button').click()
        cy.get('#username').type('adobi')
        cy.get('#password').type('ada1989$')
        cy.get('#login-button').click()
        cy.contains('Ada Nwannem logged in')
        cy.contains('"Another Cypress Quirk" by Cypress E2E')
        cy.get('#view-button').click()
        cy.get('#like-button').click()
        cy.contains('likes: 15')
        cy.get('#remove-button').should('not.exist')
      })
    })


    describe('if numerous blog entries are created', function () {

      it('blogs are ordered by likes in descending order', function() {
        // create the blogs
        cy.createBlog({
          title: 'Another Cypress Quirk',
          author: 'Cypress E2E',
          url: 'www.advancedcypress.io',
          likes: 14
        })
        cy.createBlog({
          title: 'Cypress has haters',
          author: 'Cypress E2E',
          url: 'www.oldcypress.io',
          likes: 3
        })
        cy.createBlog({
          title: 'Give it up for Cypress',
          author: 'Cypress E2E',
          url: 'www.moderncypress.io',
          likes: 49
        })
        cy.createBlog({
          title: 'Cypress will never stop',
          author: 'Cypress E2E',
          url: 'www.futurecypress.io',
          likes: 37
        })

        cy.get('.blog').then(blogs => {
          blogs.each((index, blog) => {
            cy.wrap(blog).find('#view-button').click()
          })
        })

        cy.get('.blog .likes').then(($likes) => {
          const likesArray = Array.from($likes)
          const likes = likesArray.map((like) => {
            const likeText = like.innerText
            return parseInt(likeText.split(':')[1].trim())
          })

          expect(likes).to.deep.equal(likes.sort((a, b) => b - a))
        })

      })
    })
  })
})