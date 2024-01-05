const mongoose = require("mongoose");

const OldSchema = new mongoose.Schema({
  Token: { type: String, required: true },
  //
  AadharNo: { type: Number, default: 0, unique: true },
  // Personal Information
  FirstName: { type: String, default: "" },
  MiddleName: { type: String, default: "" },
  LastName: { type: String, default: "" },
  Name: { type: String, default: "" },
  DateOfBirth: { type: String, default: "" },
  FatherName: { type: String, default: "" },
  Gender: { type: String, default: "" },
  MaritalStatus: { type: String, default: "" },

  PanCard: { type: String, default: "" },
  MobileNo: { type: Number, default: 0 },
  Email: { type: String, default: "" },
  Address: { type: String, default: "" },
  PermanentAddress: { type: String, default: "" },
  City: { type: String, default: "" },
  selectedState: { type: String, default: "" },
  PinCode: { type: String, default: "" },

  employerName: { type: String, default: "" },
  employerAddress: { type: String, default: "" },
  employerPanNumber: { type: String, default: "" },
  tanNumber: { type: String, default: "" },
  employeeReferenceNo: { type: String, default: "" },
  Year: { type: String, default: "" },
  TaxDeducted: { type: Number, default: 0 },

  Salary: { type: Number, default: 0 },
  PrerequisiteIncome: { type: Number, default: 0 },
  ProfitIncome: { type: Number, default: 0 },
  OtherIncome: { type: Number, default: 0 },
  HRA: { type: Number, default: 0 },
  LTA: { type: Number, default: 0 },
  OtherExemptedAllowances: { type: Number, default: 0 },
  ProfessionalTax: { type: Number, default: 0 },

  OwnHouseIncome: { type: Number, default: 0 },

  BasicDeductions: { type: Number, default: 0 },
  Medical: { type: Number, default: 0 },
  EducationalLoan: { type: Number, default: 0 },
  Nps: { type: Number, default: 0 },
  Deposits: { type: Number, default: 0 },
  Charity: { type: Number, default: 0 },

  RentedHouseIncome: { type: Number, default: 0 },
  DeemdedHouseIncome: { type: Number, default: 0 },
  OldFinalTax: { type: Number, default: 0 },
  OldFinalCess: { type: Number, default: 0 },
  NewFinalTax: { type: Number, default: 0 },
  NewFinalCess: { type: Number, default: 0 },
  PreferredSystem: {
    type: String,
    default: "NewRegime",
    enum: ["OldRegime", "NewRegime"],
  },
  TotalTaxableIncome: { type: Number, default: 0 },
  TotalIncome: { type: Number, default: 0 },
  TotalDeductions: { type: Number, default: 0 },
});

// Pre-save hook to update the 'Name' field before saving to the database
OldSchema.pre("save", function (next) {
  // Combine FirstName, MiddleName, and LastName to create the 'Name' field
  this.Name = `${this.FirstName} ${
    this.MiddleName ? this.MiddleName + " " : ""
  }${this.LastName}`;


  this.TotalIncome =
    this.Salary +
    this.PrerequisiteIncome +
    this.ProfitIncome +
    this.OtherIncome +
    this.RentedHouseIncome +
    this.DeemdedHouseIncome;

  this.TotalDeductions =
    this.BasicDeductions +
    this.Medical +
    this.EducationalLoan +
    this.Nps +
    this.Deposits +
    this.Charity +
    this.HRA +
    this.LTA +
    this.OtherExemptedAllowances +
    this.ProfessionalTax +
    this.OwnHouseIncome;

  this.TotalTaxableIncome = this.TotalIncome - this.TotalDeductions;
  next();
});

const OldReign = mongoose.model("OldReign", OldSchema);

module.exports = OldReign;
