// Decimal library is required to ensure correct handling of numbers (Javascript doesn't do so well with floating point)
const Decimal = require("decimal");
const authState = require("./auth-state-constants.json");

class Controller {
  constructor(rootClient) {
    this.rootClient = rootClient;
  }

  getQuote(
    driverAge,
    driverGender,
    driverEducation,
    accidentCount,
    distance,
    vehicleType
  ) {
    if (!driverAge) return Promise.reject("bad 'driverAge'");
    if (!driverGender) return Promise.reject("bad 'driverGender'");
    if (!driverEducation) return Promise.reject("bad 'driverEducation'");
    if (!accidentCount) return Promise.reject("bad 'accidentCount'");
    if (!distance) return Promise.reject("bad 'distance'");
    if (!vehicleType) return Promise.reject("bad 'vehicleType'");

    let educationStatus = "";
    let incomePerMonth = 0;

    if (driverEducation === "tertiary") {
      educationStatus = "undergraduate_degree";
      incomePerMonth = 6000000;
    } else if (driverEducation === "matric") {
      educationStatus = "grade_12_matric";
      incomePerMonth = 2500000;
    } else {
      educationStatus = "grade_12_no_matric";
      incomePerMonth = 1500000;
    }

    if (vehicleType === "luxury") {
      coverAmount = 500000000;
    } else if (vehicleType === "economy") {
      coverAmount = 400000000;
    } else {
      coverAmount = 100000000;
    }

    coverPeriod = "1_year";

    //   //Extract quotes from response
    //   let comprehensive_insurance_quote = body[0];
    //   let theft_insurance_quote = body[1];

    //   if (comprehensive_insurance_quote === undefined) {
    //     //Send error result back to DialogFlow if device not found
    //     var errorMessage =
    //       "I cannot seem to find any information on file for your device. I will give you a call shortly to resolve this";
    //     return res.json({
    //       speech: errorMessage,
    //       displayText: errorMessage,
    //       source: "get-insurance-quote"
    //     });
    //   }

    //   //Send comprehenisive insurance amount back to DialogFlow (Using suggested_premium value)
    //   var responseMessage =
    //     "Comprehensive insurance of your device will cost R" +
    //     comprehensive_insurance_quote.suggested_premium / 100.0 +
    //     " per month";
    //   return res.json({
    //     speech: responseMessage,
    //     displayText: responseMessage,
    //     source: "get-insurance-quote"
    //   });
    // });
    // }

    const params = {
      cover_amount: coverAmount,
      cover_period: coverPeriod,
      basic_income_per_month: incomePerMonth,
      education_status: educationStatus,
      smoker: false,
      gender: driverGender,
      age: driverAge
    };
    return this.rootClient
      .getQuote(params)
      .then(() => Promise.resolve({ sessionId: sessionId, redirect: "/home" }));
  }
}

module.exports = Controller;
