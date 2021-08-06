describe('Blog app', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000')
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
  })

  it('succeeds with correct credentials', function () {
    cy.get('input:first').type('mluukkai')
    cy.get('input:last').type('salainen')
    cy.get('button').click()
  })

  it('fails with wrong credentials', function () {
    cy.get('input:first').type('humor')
    cy.get('input:last').type('salainen')
    cy.get('button').click()
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('input:first').type('mluukkai')
      cy.get('input:last').type('salainen')
      cy.get('button').click()
    })

    it('A blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type('blog title')
      cy.get('#author').type('daniel zhang')
      cy.get('#url').type('https:.com')
      cy.get('#submitButton').click()
      cy.contains('blog title view').should('be.visible')
    })
    describe('When blog is created', function () {
      beforeEach(function () {
        cy.contains('create new blog').click()
        cy.get('#title').type('blog title')
        cy.get('#author').type('daniel zhang')
        cy.get('#url').type('https:.com')
        cy.get('#submitButton').click()
        cy.contains('blog title view').click()
      })

      it('Can be liked', function () {
        cy.contains('like').click()
        cy.contains('likes').contains('1')
      })
      it('Can be removed', function () {
        cy.contains('remove').click()
        cy.contains('blog title view').should('be.not.visible')
      })
    })

    describe('When multiple blog is created', function () {
      beforeEach(function () {
        cy.contains('create new blog').click()
        cy.createBlog({
          author: 'John Doe',
          title: 'test1',
          url: 'http://example.com./test1',
        })
        cy.createBlog({
          author: 'John Doe',
          title: 'test2',
          url: 'http://example.com./test2',
        })
        cy.createBlog({
          author: 'Jane Doe',
          title: 'test3',
          url: 'http://example.com./test3',
        })
      })
      it('is in like order', function () {
        cy.contains('test1 view').click()
        cy.contains('like').click()
        cy.visit('http://localhost:3000')
        cy.get('#blogs').then((blogs) => {
          cy.wrap(blogs[0]).contains('2')
          cy.wrap(blogs[1]).contains('3')
          cy.wrap(blogs[2]).contains('1')
        })
      })
    })
  })
})
