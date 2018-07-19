const ContactController = require("../controllers/ContactController");
const sequelize = require("../db/models/index").sequelize;

describe("ContactController", () => {

   beforeEach((done) => {
      this.book = new ContactController();

// #1
      sequelize.sync({force: true}).then((res) => {
        done();
      })
      .catch((err) => {
        done();
      });
   });

// #2
  describe("#addContact()", () => {

    it("should add a single contact into the book", (done) => {
      // #2
        this.book.addContact("Alice", "001-101-1010", "alice@yahoo.com")
        .then((contact) => {

// #3
          expect(contact.name).toBe("Alice");
          expect(contact.phone).toBe("001-101-1010");
          expect(contact.email).toBe("alice@yahoo.com");
          done();
        })
        .catch((err) => {
          done();
        });
    });
  });
});
