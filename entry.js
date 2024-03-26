import inquirer from "inquirer";
import chalk from "chalk";
const users = []; // Initialize the users array
console.log(chalk.cyanBright("Welcome to our Website"));
// Rest of your code...
// Dummy object to store user data temporarily
const userData = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
};
async function mainMenu() {
    // Check if the user is already logged in
    if (userData.email) {
        console.log(chalk.magentaBright(`Welcome back, ${userData.firstName} ${userData.lastName}!`));
        const choice = await inquirer.prompt({
            name: "action",
            type: "list",
            message: "Choose an action:",
            choices: ["Sign Up", "Exit", "log in"],
        });
        switch (choice.action) {
            case "Sign Up":
                await signUp();
            case "log in":
                await login();
                break;
            case "Exit":
                console.log(chalk.yellow("Exiting application. Goodbye!"));
                process.exit(0);
        }
    }
    else {
        // User is not logged in, display the regular main menu options
        const options = ["Login", "Sign Up", "Exit"];
        const choice = await inquirer.prompt({
            name: "action",
            type: "list",
            message: "Choose an action:",
            choices: options,
        });
        switch (choice.action) {
            case "Login":
                await login();
                break;
            case "Sign Up":
                await signUp();
                break;
            case "Exit":
                console.log(chalk.yellow("Exiting application. Goodbye!"));
                process.exit(0);
        }
    }
}
async function login() {
    console.log(chalk.magenta.bold("--- Login ---"));
    const credentials = await inquirer.prompt([
        { name: "email", message: "Enter your email:" },
        { name: "password", message: "Enter your password:", type: "password" },
    ]);
    // Find the user in the users array based on the entered email
    const user = users.find((user) => user.email === credentials.email);
    if (user && user.password === credentials.password) {
        console.log(chalk.yellow.bold(`Welcome back, ${user.firstName} ${user.lastName}!`));
    }
    else {
        console.log(chalk.redBright.bold("Invalid email or password. Please try again."));
    }
    mainMenu();
}
// Proceed with logged-in functionality
// For example, redirect to main menu
async function signUp() {
    console.log(chalk.magenta.bold("--- Sign Up ---"));
    const userDetails = await inquirer.prompt([
        { name: "firstName", message: "Enter your first name:" },
        { name: "lastName", message: "Enter your last name:" },
        { name: "phoneNumber", message: "Enter your phone number:" },
        { name: "email", message: "Enter your email:" },
        { name: "password", message: "Enter your password:", type: "password" },
    ]);
    // Check if user already exists with the same email
    const existingUser = users.find((user) => user.email === userDetails.email);
    if (existingUser) {
        console.log(chalk.blueBright.bold("User with this email already exists. Please log in."));
        mainMenu(); // Redirect to main menu
        return; // Exit the function
    }
    // Proceed with sign-up process since the email is unique
    const newUser = {
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        phoneNumber: userDetails.phoneNumber,
        email: userDetails.email,
        password: userDetails.password,
    };
    users.push(newUser); // Add the new user to the array of users
    console.log(chalk.green("Account created successfully!"));
    mainMenu(); // Redirect to main menu
}
mainMenu();
