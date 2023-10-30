class LoginPage{
    constructor(){
        this.users[
            {username: 'user1', password: 'password1'},
            {username2: 'user2', password2: 'password2'},
            {username3: 'user3', password2: 'password3'}

        ];
    }
    login(username, password){
        const user = this.users.find(user => user.username === username && user.password === password);

        if(user){
            console.log('Login Successful');
            //Adding this into the link of the homepage soon
        }
        else{
            console.log("Invalid username or password!");
            //The webpage will stay static
        }
    }
    //The forget password action if the user does forget password
    forgotPassword(){
        console.log("Redirect user to forgot password webpage immediately");
        //Link the web link into the code.
    }
}
const logIn = new LoginPage();

//For trying to login
logIn.login('user1', 'password1');

//Try to login with invalid credentials
logIn.login('user1', 'JackBlack19');

//Adding the forgot password functionality
logIn.forgotPassword();
//Making sure that people know it's an method