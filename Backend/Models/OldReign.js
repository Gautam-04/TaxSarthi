const mongoose = require("mongoose");

const OldSchema = new mongoose.Schema({
  FirstName: { type: String, required: true },
  MiddleName: { type: String },
  LastName: { type: String, required: true },
  Name: { type: String, required: true },
  AadharNo: { type: Number, required: true, unique: true },
  PanCard: { type: String, required: true },
  Address: { type: String, required: true },
  PermanentAddress: { type: String },
  City: { type: String, required: true },
  State: { type: String },
  PinCode: { type: String, required: true },
  employerName: { type: String, required: true },
  employerAddress: { type: String, required: true },
  employerPanNumber: { type: String, required: true },
  tanNumber: { type: String, required: true },
  employeeReferenceNo: { type: String },
  Year: { type: String, required: true },
  Salary: { type: Number, required: true },
  RentedIncome: { type: Number, required: true },
  OtherIncome: { type: Number, required: true },
  ExemptedAllowances: { type: Number, required: true },
  Home: { type: Number, required: true },
  BasicDeductions: { type: Number, required: true },
  Medical: { type: Number, required: true },
  EducationalLoan: { type: Number, required: true },
  Nps: { type: Number, required: true },
  Deposits: { type: Number, required: true },
  Charity: { type: Number, required: true },
  HousingLoan: { type: Number, required: true },
  finalTax: { type: Number, required: true },
  cess: { type: Number, required: true },
});

// Pre-save hook to update the 'Name' field before saving to the database
OldSchema.pre("save", function (next) {
  // Combine FirstName, MiddleName, and LastName to create the 'Name' field
  this.Name = `${this.FirstName} ${
    this.MiddleName ? this.MiddleName + " " : ""
  }${this.LastName}`;
  next();
});

const OldReign = mongoose.model("OldReign", OldSchema);

module.exports = OldReign;
