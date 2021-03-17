describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Neil Ryan',
      username: 'neil',
      password: 'bagsak'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
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
    })

    it.only('A blog can be created', function() {
      cy.contains('create new').click()
      cy.getBySel('title').type('Hello')
      cy.getBySel('author').type('Adelle')
      cy.getBySel('url').type('Hello.com')
      cy.getBySel('create').click()

      cy.contains('Hello by Adelle')
      cy.visit('http://localhost:3000')
      cy.contains('Hello Adelle')
    })
  })
})