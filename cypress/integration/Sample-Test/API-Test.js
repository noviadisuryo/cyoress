/// <reference types="cypress" />

describe('Reqres.in API Test', () => {
    context('GET /users', () => {
        it('should return a list contain all users', () => {
            cy.request({
                method: 'GET',
                url: 'https://reqres.in/api/users'
            })
                .should((response) => {
                    expect(response.status).to.eq(200)
                    expect(response.body.total_pages).to.eq(2)
                    expect(response.body.data.length).to.be.eq(6);
                    expect(response.body.data[0]).to.have.all.keys(
                      'id', 'email', 'first_name', 'last_name', 'avatar'
                    )
                });
        });
    });
});

describe('Given the Reqres.in API', () => {
  context('When I send GET /user?page=2', () => {
    it('Then it should return a list with all users in page 2', () => {
      cy.request({
        method: 'GET',
        url: 'https://reqres.in/api/users?page=2' // BaseUrl Not Set
      })
        .should((response) => {
          expect(response.status).to.eq(200)
          expect(response.body.per_page).to.eq(response.body.data.length)
          Cypress._.each(response.body.data, (data) => {
            expect(data.email).to.not.be.null
            expect(data).to.have.all.keys('id', 'email', 'first_name', 'last_name', 'avatar')
          })
        });
    });
  });

});