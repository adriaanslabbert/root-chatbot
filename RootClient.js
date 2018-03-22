// We do manual promisification because node-rest-client callback functions
//  don't follow the "(err, response)" pattern.
const Client = require("node-rest-client").Client;
//const request = require("request-promise"); //To make HTTP calls to the Root API
const ROOT_URL = "https://sandbox.root.co.za/v1/insurance";
const HEADERS = { "Content-Type": "application/json" };

class RootClient {
  constructor(rootOptions) {
    this.client = new Client(rootOptions);
  }

  getQuote(params) {
    const args = {
      data: {
        // cover_amount
        // integer. Amount to cover, in cents. Should be between R100 000 and R5 000 000, inclusive.
        // cover_period
        // string. Duration to cover: 1_year, 2_years, 5_years, 10_years, 15_years, 20_years or whole_life.
        // basic_income_per_month
        // integer. Policyholder's basic monthly income, in cents.
        // education_status
        // string. Policyholder’s education class: grade_12_no_matric, grade_12_matric, diploma_or_btech, undergraduate_degree or professional_degree
        // smoker
        // boolean. Is the policyholder a smoker.
        // gender
        // string. Gender of policyholder. Should be either male or female.
        // age
        // integer. Age of policyholder. Should be between 18 and 63, inclusive.

        type: "root_term",
        cover_amount: params.coverAmount,
        cover_period: params.coverPeriod,
        basic_income_per_month: params.incomePerMonth,
        education_status: params.education_status,
        smoker: params.smoker,
        gender: params.gender,
        age: params.age
      },
      headers: HEADERS
    };
    return new Promise((resolve, reject) => {
      this.client.post(ROOT_URL, args, (data, response) =>
        handleResponse(data, response, resolve, reject)
      );
    });

    // const options = {
    //   method: "POST",
    //   headers: {
    //     username: CLIENT_ID,
    //     password: CLIENT_SECRET,
    //     authorization: AUTH_TOKEN
    //   },
    //   uri: reqUrl,
    //   form: {

    //   },
    //   json: true
  }

  // request(options, function(error, response, body) {
  //   if (error) {
  //     res.send(error);
  //   }

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
}

function handleResponse(data, response, resolve, reject) {
  if (response.statusCode >= 200 && response.statusCode < 300) {
    resolve(data);
  } else {
    reject(`${response.statusCode} : ${response.statusMessage}`);
  }
}

module.exports = RootClient;