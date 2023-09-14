import { AxiosRequestConfig } from 'axios';

import { IContext } from '../models/default.model,';

export function getAxiosConfigWithCookies(context: IContext) {
  const cookiesCollection = context.req.headers.cookie;
  const axiosConfig: AxiosRequestConfig = {
    withCredentials: true,
    headers: {
      Cookie: cookiesCollection,
    },
  };

  return axiosConfig;
}
