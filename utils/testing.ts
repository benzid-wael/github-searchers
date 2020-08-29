import { NextApiRequest, NextApiResponse } from "next";


export const mockRequest = ({method, json, headers}: {method?: string, json?: any, headers?: any}) => {
  return {
    method: method || "GET",
    body: json || {},
    headers: headers || {}
  } as NextApiRequest
};


export const mockResponse = () => {
  const res = {} as NextApiResponse;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};
