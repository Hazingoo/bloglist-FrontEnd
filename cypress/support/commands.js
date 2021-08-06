const storageKey = 'loggedBlogappUser'

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body: { title, author, url },
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem(storageKey)).token
      }`,
    },
  })

  cy.visit('http://localhost:3000')
})
