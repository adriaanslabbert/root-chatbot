// Decimal library is required to ensure correct handling of numbers (Javascript doesn't do so well with floating point)
const Decimal = require("decimal");

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

    const params = {
      cover_amount: coverAmount,
      cover_period: coverPeriod,
      basic_income_per_month: incomePerMonth,
      education_status: educationStatus,
      smoker: false,
      gender: driverGender,
      age: driverAge
    };
    return this.rootClient.getQuote(params).then(response => {
      // quote_package_id
      // uuid. ID of quote package retrieved in quote generation.
      // name
      // integer. The package name.
      // sum_assured
      // integer. Amount, in cents, that is the maximum insured value.
      // base_premium
      // integer. Premium amount, in cents, that includes the risk and platform fee. monthly_premium should be calculated from this.
      // suggested_premium
      // integer. Premium amount, in cents, that is suggested to be used as the monthly_premium.
      //Extract quotes from response

      let comprehensiveQuote = body[0];
      //   let limitedQuote = body[1];

      if (comprehensiveQuote === undefined) {
        //Send error result back to DialogFlow
        var errorMessage =
          "An internal error occurred. Please contact your local sales representative.";
        return Promise.resolve({
          speech: errorMessage,
          displayText: errorMessage,
          source: "getTermQuote"
        });
      }
      var context = this.context();
      context.set("quoteId", comprehensiveQuote.quote_package_id);
      console.log(`Quote ID = ${comprehensiveQuote.quote_package_id}`);

      //Send comprehensive insurance amount back to DialogFlow (Using suggested_premium value)
      var responseMessage = `Comprehensive insurance will cost R${Decimal(
        comprehensiveQuote.suggested_premium
      )
        .div(100)
        .toString()} per month`;
      return Promise.resolve({
        speech: responseMessage,
        displayText: responseMessage,
        source: "getTermQuote"
      });
    });
  }
}

module.exports = Controller;
