const Login = require('./LoginPage');


describe('Login Page function working', () => {
    let logIn;

    beforeEach(()=>{
        logIn = new Login();
    });

    test('should only login with recognize credentials', () =>{
        expect(logIn.Login('user1','password1')).toBe(true);
    });

    test('when users uses invalid credentials',() =>{
        expect(logIn.Login('Invaliduser1','wrongPassword1')).toBe(false);
    });
});