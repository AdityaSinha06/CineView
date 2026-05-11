const mongoose = require("mongoose");
const {Schema} = mongoose;

main()
    .then(() => console.log("connection-success"))
    .catch((err) => console.log(err.message))

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/cineView")
}

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String, 
        required: true,
    } ,
    password: {
        type: String,
        require: true
    }
});

const User = mongoose.model("User" , userSchema);

// const addUser = async () => {
//     let u1 = new User({
//         name: "testDB",
//         email: "test@example.com",
//         password: "test123"
//     });

//     await u1.save();
//     console.log("user-added");
// }

// addUser();

module.exports = User;