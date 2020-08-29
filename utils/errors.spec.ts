import { ApiError, MethodNotAllowed, InvalidPayload, PreconditionFailed } from "./errors";


describe('handleError serialize errors properly', () => {
  it.each`
    errorClass            | statusCode
    ${ApiError}           | ${500}
    ${MethodNotAllowed}   | ${405}
    ${InvalidPayload}     | ${400}
    ${PreconditionFailed} | ${412}
  `('should return $statusCode for $errorClass', ({errorClass, statusCode}) => {
    // given
    const error = new errorClass("Some error");
    // when / then
    expect(error.status).toEqual(statusCode);
  })
});
