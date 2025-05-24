class AppResponse {
  constructor(statusCode, data = null, message = "") {
    this.status = statusCode;
    this.data = data;
    this.message = message;
  }
}

export default AppResponse;
