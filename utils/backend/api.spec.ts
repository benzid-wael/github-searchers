import { ApiError, MethodNotAllowed, InvalidPayload, PreconditionFailed } from "../errors";
import { apiResponse, handleError } from './api';
import { mockRequest, mockResponse } from "../testing";


describe('handleError should return appropriate json response when api throw Error', () => {
  it.each`
    errorClass 
    ${ApiError}
    ${MethodNotAllowed}
    ${InvalidPayload}
    ${PreconditionFailed}
  `('should derive statusCode from $errorClass', ({errorClass}) => {
    // given
    const errorMessage = "Some error";
    const mockRes = mockResponse();
    const error = new errorClass(errorMessage);
    // when
    handleError(mockRes, error);
    // then
    expect(mockRes.status).toHaveBeenCalledWith(error.status);
    expect(mockRes.json).toHaveBeenCalledWith({detail: errorMessage});
  })
});

it('handleError return HTTP 500 for generic error', () => {
  // given
  const error = new SyntaxError('await should be used inside async function');
  const mockRes = mockResponse();
  // when
  handleError(mockRes, error);
  // then
  expect(mockRes.status).toHaveBeenCalledWith(500);
});


describe('apiResponse middleware validate payload before running handler', () => {
  // @ts-ignore
  const fakeHandler = (req, res) => {
    return res.status(200).json({status: 'ok'});
  };

  it('throw MethodNotAllowed when receive call with blacklisted method', () => {
    // given
    // @ts-ignore
    const handler = apiResponse(['POST'], (payload) => { throw new SyntaxError("failed"); })(fakeHandler);
    const req = mockRequest({method: "GET"});
    const res = mockResponse();
    // when
    handler(req, res);
    // then
    expect(res.status).toHaveBeenCalledWith(MethodNotAllowed.statusCode);
  });

  it('return error when validation fails', () => {
    // given
    // @ts-ignore
    const handler = apiResponse(['POST'], (payload) => { throw new SyntaxError("failed"); })(fakeHandler);
    const req = mockRequest({method: "POST"});
    const res = mockResponse();
    // when
    handler(req, res);
    // then
    expect(res.status).toHaveBeenCalledWith(500);
  });

});