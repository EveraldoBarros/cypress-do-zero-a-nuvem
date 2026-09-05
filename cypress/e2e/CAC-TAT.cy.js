describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('index.html')
  })

  it('verifica o titulo da aplicacao', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatorios e envia o formulario', () => {
    cy.get('#firstName').type('Everaldo')
    cy.get('#lastName').type('BArros')
    cy.get('#email').type('everaldobarros.face2021@gmail.com')
    cy.get('#open-text-area').type('Preciso de ajuda com meu atendimento.')
    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')
  })

  it('preenche uma mensagem longa e envia o formulario', () => {
    const message = 'Esta e uma mensagem longa para validar o preenchimento do campo de texto sem atraso.'
    cy.get('#firstName').type('Everaldo')
    cy.get('#lastName').type('BArros')
    cy.get('#email').type('everaldobarros.face2021@gmail.com')
    cy.get('#open-text-area').type(message, { delay: 0 })
    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter email invalido', () => {
    cy.get('#firstName').type('Everaldo')
    cy.get('#lastName').type('BArros')
    cy.get('#email').type('email-invalido')
    cy.get('#open-text-area').type('Mensagem')
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('mantem o campo telefone vazio ao receber valor nao numerico', () => {
    cy.get('#phone').type('abc').should('have.value', '')
  })

  it('exibe erro quando o telefone e obrigatorio mas nao e preenchido', () => {
    cy.get('#phone-checkbox').check()
    cy.get('#firstName').type('Everaldo')
    cy.get('#lastName').type('BArros')
    cy.get('#email').type('everaldobarros.face2021@gmail.com')
    cy.get('#open-text-area').type('Mensagem')
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName').type('Everaldo').should('have.value', 'Everaldo').clear().should('have.value', '')
    cy.get('#lastName').type('BArros').should('have.value', 'BArros').clear().should('have.value', '')
    cy.get('#email').type('everaldobarros.face2021@gmail.com').should('have.value', 'everaldobarros.face2021@gmail.com').clear().should('have.value', '')
    cy.get('#phone').type('11999999999').should('have.value', '11999999999').clear().should('have.value', '')
  })

  it('exibe erro ao submeter sem preencher os campos obrigatorios', () => {
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('envia o formulario com sucesso usando comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
  })

  it('seleciona YouTube por seu texto', () => {
    cy.get('#product').select('YouTube').should('have.value', 'youtube')
  })

  it('seleciona Mentoria por seu valor', () => {
    cy.get('#product').select('mentoria').should('have.value', 'mentoria')
  })

  it('seleciona Blog por seu indice', () => {
    cy.get('#product').select(1).should('have.value', 'blog')
  })

  it('marca o tipo de atendimento Feedback', () => {
    cy.get('input[value="feedback"]').check().should('be.checked')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[name="atendimento-tat"]').each((radio) => {
      cy.wrap(radio).check().should('be.checked')
    })
  })

  it('marca ambos checkboxes e desmarca o ultimo', () => {
    cy.get('input[type="checkbox"]').check().should('be.checked')
    cy.get('input[type="checkbox"]').last().uncheck().should('not.be.checked')
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload').selectFile('cypress/fixtures/example.json')
      .should((input) => expect(input[0].files[0].name).to.equal('example.json'))
  })

  it('seleciona um arquivo simulando drag-and-drop', () => {
    cy.get('#file-upload').selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should((input) => expect(input[0].files[0].name).to.equal('example.json'))
  })

  it('seleciona um arquivo utilizando uma fixture com alias', () => {
    cy.fixture('example.json').as('exampleFile')
    cy.get('@exampleFile').then(() => {
      cy.get('#file-upload').selectFile('@exampleFile')
        .should((input) => expect(input[0].files[0].name).to.equal('example.json'))
    })
  })

  it('verifica que a politica de privacidade abre em outra aba', () => {
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
  })

  it('acessa a politica removendo o target e clicando no link', () => {
    cy.get('#privacy a').invoke('removeAttr', 'target').click()
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT - Política de Privacidade')
  })

  it('testa a politica de privacidade de forma independente', () => {
    cy.visit('privacy.html')
    cy.contains('Não salvamos dados submetidos no formulário da aplicação CAC TAT.').should('be.visible')
  })

  it('exibe e oculta mensagens usando invoke', () => {
    cy.get('.success').invoke('show').should('be.visible').and('contain', 'Mensagem enviada com sucesso.')
    cy.get('.success').invoke('hide').should('not.be.visible')
    cy.get('.error').invoke('show').should('be.visible').and('contain', 'Valide os campos obrigatórios!')
    cy.get('.error').invoke('hide').should('not.be.visible')
  })

  it('preenche a area de texto usando invoke', () => {
    cy.get('#open-text-area').invoke('val', 'um texto qualquer').should('have.value', 'um texto qualquer')
  })

  it('faz uma requisicao HTTP', () => {
    cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
      .should((response) => {
        expect(response.status).to.equal(200)
        expect(response.statusText).to.equal('OK')
        expect(response.body).to.contain('CAC TAT')
      })
  })

  it('encontra e exibe o gato oculto', () => {
    cy.get('#cat').invoke('show').should('be.visible')
  })

  describe('mensagens temporarias', () => {
    it('oculta a mensagem de sucesso apos tres segundos', () => {
      cy.clock()
      cy.fillMandatoryFieldsAndSubmit()
      cy.get('.success').should('be.visible')
      cy.tick(3000)
      cy.get('.success').should('not.be.visible')
    })

    it('oculta a mensagem de erro apos tres segundos', () => {
      cy.clock()
      cy.contains('button', 'Enviar').click()
      cy.get('.error').should('be.visible')
      cy.tick(3000)
      cy.get('.error').should('not.be.visible')
    })
  })
})
