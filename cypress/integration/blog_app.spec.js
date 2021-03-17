describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user1 = {
      name: 'Neil Ryan',
      username: 'neil',
      password: 'bagsak'
    }
    const user2 = {
      name: 'Ryan',
      username: 'ryan',
      password: 'pasado'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user1)
    cy.request('POST', 'http://localhost:3001/api/users', user2)
    cy.visit('http://localhost:3000')
  })



  it('Login form is shown', function() {
    cy.visit('http://localhost:3000');
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function () {
    
    it('succeeds with correct credentials', function () {
      cy.getBySel('username').type('neil');
      cy.getBySel('password').type('bagsak');
      cy.contains('login').click();
      cy.contains('login success')
    })

    it('fails with wrong credentials', function () {
      cy.getBySel('username').type('ssss');
      cy.getBySel('password').type('sssss');
      cy.contains('login').click();
      cy.contains('failed to login')

    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'neil', password: 'bagsak'})
      cy.createBlog({
        title: 'Mr. Pogi',
        author: 'Hercule',
        url: 'dbz.com',
        likes: 0
      })
    })

    it('A blog can be created', function() {
      cy.contains('create new').click()
      cy.getBySel('title').type('Hello')
      cy.getBySel('author').type('Adelle')
      cy.getBySel('url').type('Hello.com')
      cy.getBySel('create').click()

      cy.contains('Hello by Adelle')
      cy.visit('http://localhost:3000')
      cy.contains('Hello Adelle')
    })

    it('A blog can be liked', function() {
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('1')
    })

    it('A blog can be deleted by creator', function() {
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.visit('http://localhost:3000')
      cy.contains('Mr. Pogi').should('not.exist')

    })

    it.only('A blog can only be deleted by creator', function() {
      cy.contains('logout').click()
      cy.login({ username: 'ryan', password: 'pasado'})
      cy.contains('view').click()
      cy.contains('remove').should('not.exist')
      

    })


  })
})