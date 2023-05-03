describe('Newsletter', ()=>{
    beforeEach(()=>{
        cy.task('seedDatabase');
    });
    it("should display a success message", ()=>{
        
        cy.visit('/')
        cy.intercept('POST', '/newsletter*', {status:201}).as('subscribed')
        // cy.get('[data-cy="newsletter-email"]').type('wanjaa@exa.com');
        cy.get('[data-cy="newsletter-submit"]').click();
        cy.wait('@subscribed')
        cy.contains("Thanks for signing up")
    })
    it("should display validation errors", ()=>{
        cy.intercept('POST', '/newsletter*', {message:'Email exists already'}).as('subscribing')
        cy.visit('/')
        // cy.get('[data-cy="newsletter-email"]').type('test@example.com');
        cy.get('[data-cy="newsletter-submit"]').click();
        cy.wait('@subscribing')
        cy.contains("Email exists already")
    })
    it('should successfully create a new contact', ()=>{
        cy.request({
            method:'POST',
            url:'/newsletter',
            body:{email:'test@example.com'},
            form:true
        }).then((res)=>{
            expect(res.status).to.be.eq(201)
        })
    })
})