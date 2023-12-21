import { useState, useEffect } from "react";

const useTaxCalculator = (
  Salary,
  PrerequisiteIncome,
  ProfitIncome,
  HRA,
  LTA,
  OtherExemptedAllowances,
  ProfessionalTax,
  BasicDeductions,
  Medical,
  EducationalLoan,
  Nps,
  Deposits,
  Charity,
  formData
) => {
  const [taxInfo, setTaxInfo] = useState({
    OldTax: 0,
    Oldess: 0,
    NewTax: 0,
    Newcess: 0,
    preferredSystem: "OLD REGIME",
  });

  useEffect(() => {
    const numericSalary = parseFloat(Salary) || 0;
    const numericPrerequisiteIncome = parseFloat(PrerequisiteIncome) || 0;
    const numericProfitIncome = parseFloat(ProfitIncome) || 0;
    const numericHRA = parseFloat(HRA) || 0;
    const numericLTA = parseFloat(LTA) || 0;
    const numericOtherExemptedAllowances =
      parseFloat(OtherExemptedAllowances) || 0;
    const numericProfessionalTax = parseFloat(ProfessionalTax) || 0;

    // Tax calculation
    const StandardDeductions = 50000;

    const calculateFinalTax = () => {
      const totalIncome =
        numericSalary +
        numericPrerequisiteIncome +
        numericProfitIncome -
        numericHRA -
        numericLTA -
        numericOtherExemptedAllowances -
        numericProfessionalTax;
      const totalDeductions =
        BasicDeductions + Medical + EducationalLoan + Nps + Deposits + Charity;
      const taxableIncome = totalIncome - StandardDeductions - totalDeductions;

      const { Tax, ceSS } = calculateOldRegimeTax(taxableIncome);
      const { newfinaltax, newcess } = calculateNewRegimeTax(totalIncome);

      return {
        OldTax: Tax,
        Oldess: ceSS,
        NewTax: newfinaltax,
        Newcess: newcess,
      };
    };

    const calculateOldRegimeTax = (income) => {
          const TAX_REBATE = {
            old: 250000,
          };

          const calculateSlabTax = (income, rate) => {
            return income * rate;
          };

          const calculateCess = (totalTax) => {
            return totalTax * 0.04;
          };

          let totalTax = 0;

          if (income >= TAX_REBATE.old) {
            totalTax += calculateSlabTax(Math.min(income, 250000), 0);
            totalTax += calculateSlabTax(
              Math.max(Math.min(income - 250000, 500000 - 250000), 0),
              0.05
            );
            totalTax += calculateSlabTax(
              Math.max(Math.min(income - 500000, 1000000 - 500000), 0),
              0.2
            );
            totalTax += calculateSlabTax(Math.max(income - 1000000, 0), 0.3);
          }

          const Tax = totalTax + calculateCess(totalTax);
          const ceSS = calculateCess(totalTax);

          return { Tax, ceSS };
    };

    const calculateNewRegimeTax = (income) => {
       const TAX_REBATE_NEW = {
         new: 700000,
       };

       const calculateSlabTax = (income, rate) => income * rate;

       let totalTax = 0;

       if (income >= TAX_REBATE_NEW.new) {
         totalTax += calculateSlabTax(Math.min(income, 300000), 0);
         totalTax += calculateSlabTax(
           Math.max(Math.min(income - 300000, 300000), 0),
           0.05
         );
         totalTax += calculateSlabTax(
           Math.max(Math.min(income - 600000, 300000), 0),
           0.1
         );
         totalTax += calculateSlabTax(
           Math.max(Math.min(income - 900000, 300000), 0),
           0.15
         );
         totalTax += calculateSlabTax(
           Math.max(Math.min(income - 1200000, 300000), 0),
           0.2
         );
         totalTax += calculateSlabTax(Math.max(income - 1500000, 0), 0.3);
       }

       const calculateCess = (totalTax) => {
         const newCess = totalTax * 0.04;
         return newCess;
       };

       const newfinaltax = totalTax + calculateCess(totalTax);

       return { newfinaltax, cess: calculateCess(totalTax) };
    };

    const { OldTax, Oldess, NewTax, Newcess } = calculateFinalTax();
    const preferredSystem = NewTax < OldTax ? "NEW REGIME" : "OLD REGIME";

    setTaxInfo({
      OldTax,
      Oldess,
      NewTax,
      Newcess,
      preferredSystem,
    });
  }, [
    Salary,
    PrerequisiteIncome,
    ProfitIncome,
    HRA,
    LTA,
    OtherExemptedAllowances,
    ProfessionalTax,
    BasicDeductions,
    Medical,
    EducationalLoan,
    Nps,
    Deposits,
    Charity,
    formData,
  ]);

  return taxInfo;
};

export default useTaxCalculator;
