// Requiere el frontend en :3000 y el backend configurado en NEXT_PUBLIC_API_URL.
// Ajusta apiUrl si el backend usa otro puerto.
describe("Creación de planes", () => {
  const apiUrl = "http://localhost:8080";
  const unique = Date.now();
  const user = {
    userName: `test_${unique}`,
    email: `test_${unique}@example.com`,
    name: "Usuario de prueba",
    password: "SoloParaPruebas123!",
  };

  before(() => {
    cy.request("POST", `${apiUrl}/users/signin`, user).then(({ body }) => {
      cy.wrap(body.id).as("userId");
    });
  });

  beforeEach(function () {
    const userId = this.userId as string;
    cy.visit("/es", {
      onBeforeLoad(win) {
        win.localStorage.setItem("id", userId);
        win.localStorage.setItem("username", user.userName);
      },
    });
    cy.contains("a", "Crear Plan").click();
    cy.url().should("include", "/es/plans/new");
  });

  function fillForm(name: string) {
    cy.get("#name").type(name);
    cy.get("#address").type("Muelle Norte");
    cy.get("#estimatedPrice").type("65000");
    cy.get("#estimatedTime").type("150");
    cy.get("#description").type("Una tarde relajada sobre el agua.");
  }

  it("publica el plan y lo encuentra en el listado real", function () {
    const name = `Plan E2E ${unique}`;
    fillForm(name);
    cy.get("#recommendations").type("Llevar toalla");
    cy.intercept("POST", `${apiUrl}/plans`).as("createPlan");
    cy.contains("button", "Publicar plan").click();
    cy.wait("@createPlan").then(({ request, response }) => {
      expect(response?.statusCode).to.be.within(200, 299);
      expect(request.body).to.include({
        name, estimatedPrice: 65000, estimatedTime: 150,
        recommendations: "Llevar toalla", userId: this.userId,
      });
    });
    cy.url().should("match", /\/es\/plans\/?$/);
    cy.contains(name).should("be.visible");
  });

  it("muestra el error del servidor y conserva los datos ingresados", () => {
    fillForm(`Plan fallido ${unique}`);
    cy.intercept("POST", `${apiUrl}/plans`, {
      statusCode: 400,
      body: { message: "No se pudo guardar el plan" },
    }).as("rejectedPlan");
    cy.contains("button", "Publicar plan").click();
    cy.wait("@rejectedPlan");
    cy.url().should("include", "/es/plans/new");
    cy.get("[role=alert]").should("contain", "No se pudo guardar el plan");
    cy.get("#name").should("have.value", `Plan fallido ${unique}`);
    cy.contains("button", "Publicar plan").should("be.enabled");
  });
});
