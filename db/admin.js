const mongoose = require("mongoose")
const adminsSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    companyName: String,
    companyAddress: String,
    selectedCountry: String,
    selectedState: String,
    selectedCity: String,
    message: String,
    password: String,
    day: String,
    month: String,
    year: String,
    status: String,
    profileimage: String
})
const adminModel = mongoose.model("admins", adminsSchema)
module.exports = adminModel 