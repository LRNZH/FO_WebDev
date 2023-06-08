/* eslint-disable no-undef */
Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username,
    password
  }).then((response) => {
    const { body } = response
    const user = {
      token: body.token,
      username: body.username,
      name: body.name
    }
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    cy.visit('')
  })
})



Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {
  const loggedUser = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))
  const token = loggedUser && loggedUser.token

  cy.request({
    url: 'http://localhost:3001/api/blogs',
    method: 'POST',
    body: { title, author, url, likes },
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(() => {
      cy.visit('')
    })
})

Cypress.Commands.add('getButtonByText', (text) => {
  return cy.contains('button', text)
})
