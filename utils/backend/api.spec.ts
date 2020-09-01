import { apiResponse, handleError } from './api';
import RedisCacheStorage from './cache';
import { ApiError, MethodNotAllowed, InvalidPayload, PreconditionFailed } from "../errors";
import { mockRequest, mockResponse, FakeJsonLogger } from "../testing";
import { CACHE_HOST, CACHE_PORT, CACHE_MAX_CONN } from '../../shared/config';


jest.mock('./cache');


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


describe('apiResponse middleware', () => {
  // @ts-ignore
  const fakeHandler = (req, res) => {
    return res.status(200).json({ status: 'ok' });
  };

  const buggyHandler = async (req, res) => {
    return Promise.reject(new Error('failed'));
  };

  it('should throw MethodNotAllowed when receive call with blacklisted method', () => {
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

  it('should return error when validation fails', () => {
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


describe('cache decorator', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    (RedisCacheStorage as jest.Mock<RedisCacheStorage>).mockClear();
  });

  it('should invoke function when cache is empty', async () => {
    // given
    const testee = new FakeJsonLogger();
    // when
    const actual = await testee.log('hello');
    // then
    expect(actual.message).toEqual('hello');
  })

  it('should invoke function when cache is not available', async () => {
    // given
    const mockGetClient = jest.fn();
    RedisCacheStorage.prototype.getClient = mockGetClient;
    mockGetClient.mockReturnValue(Promise.resolve(null));
    const testee = new FakeJsonLogger();
    // when
    const actual = await testee.log('hello');
    // then
    expect(actual.message).toEqual('hello');
  })

  it('should populate cache after invoking function', async () => {
    // given
    const mockSet = jest.fn();
    RedisCacheStorage.prototype.set = mockSet;
    const testee = new FakeJsonLogger();
    // when
    await testee.log('hello');
    // then
    expect(mockSet).toHaveBeenCalled();
  })

  it('should return from cache when cache is already populated', async () => {
    // given
    const mockGet = jest.fn();
    RedisCacheStorage.prototype.get = mockGet;
    mockGet.mockReturnValue(Promise.resolve(2));
    const testee = new FakeJsonLogger();
    // when
    const actual = await testee.log('hello');
    // then
    expect(actual).toEqual(2)
  })
});