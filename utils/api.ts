import {NextApiRequest, NextApiResponse} from "next";
import {ApiError, MethodNotAllowed} from "./errors";

export type HTTP_METHOD = "HEAD" | "GET" | "POST" | "PUT" | "DELETE";


const handleError = (res, err) => {
  if (err instanceof ApiError) {
    res.status(err.status).json({detail: err.message});
  } else {
    res.status(500).json({detail: err.toString()})
  }
};


export const apiResponse = (allowedMethods: HTTP_METHOD[], validator?: (payload: any) => void) => {

  const wrapper = (handler) => {
    return (req: NextApiRequest, res: NextApiResponse) => {
      try {
        // Check http method
        if(!req.method || allowedMethods.indexOf(<HTTP_METHOD>req.method) < 0) {
          throw new MethodNotAllowed(`Allowed methods: ${allowedMethods.join(', ')}`);
        }
        // Validate request payload
        if (validator) {
          const payload = req.body;
          validator(payload);
        }
        // Execute
        handler(req, res).catch(err => {
          console.error("cannot handle request: " + err.toString());
          handleError(res, err);
        });
      } catch (err) {
        handleError(res, err);
      }
    }
  };

  return wrapper;
};


export default apiResponse;