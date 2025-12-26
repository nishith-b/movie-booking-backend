const TheatreService = require("../services/theatre-service");
const {
  SuccessResponseBody,
  ErrorResponseBody,
} = require("../utils/response-body");

const create = async (req, res) => {
  try {
    const response = await TheatreService.createTheatre(req.body);
    if(response.err){
        ErrorResponseBody.err = response.error
        ErrorResponseBody.message = "Validation Failed on few parametrs of the request body"
        return res.status(response.code).json(ErrorResponseBody)
    }
    SuccessResponseBody.data = response;
    SuccessResponseBody.message = "Successfully created the theatre";
    return res.status(201).json(SuccessResponseBody);
  } catch (error) {
    ErrorResponseBody.err = error;
    return res.status(500).json(ErrorResponseBody);
  }
};

module.exports = {create};
