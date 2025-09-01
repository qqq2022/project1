
const BASE_URL = '/gw';

const _timeout = function (value?: number) {
  const ret = 60 * 1000; // default timeout length

  if (typeof value !== 'number') return ret;
  if (value >= 1000 && value <= 1000 * 60 * 60) {
    return value;
  }

  return ret;
};

const _intercept = function (response: AxiosResponse) {
  const successCode = [requestCodeEnum.success];

  return successCode.indexOf(response.data.code) === -1;
};

const _interceptRequestError = function (error: AxiosError<any>) {
  if (error.response && error.response.status !== 200) {
    message.error(error.message);
    return;
  }

  const errors = [
    {
      code: 'ECONNABORTED',
      message: '请求超时，请稍后再试！',
    },
  ];

  try {
    const code = error.code;
    for (const obj of errors) {
      if (code === obj.code) {
        message.error(obj.message);
        return;
      }
    }
  } catch (ex) {
    console.log(ex);
  }
};

export function get(...args) {
  let config: any = {};

  if (typeof args[0] === 'object') {
    config = args[0];
  } else {
    const [url, reqCfg] = args;
    if (reqCfg) {
      const { timeout, hideLoading, pageName, logger, loggerSize, params } = reqCfg;

      config = {
        timeout,
        hideLoading,
        pageName,
        logger,
        loggerSize,
        params,
      };
    }

    config.url = url;
  }

  let baseUrl = BASE_URL;
  const token = cache.getToken();
  const menuAndNavTabStore = useMenuAndNavTabStore();

  if (isAttr(config, 'hideLoading') && !config.hideLoading && config.pageName) {
    menuAndNavTabStore.handleTabLoading(config.pageName, true);
  }

  if (config.url.indexOf('/api/crs') !== -1) baseUrl += '/crs-service';

  return new Promise(function (resolve, reject) {
    const requestUrl = baseUrl + config.url;
    const timeoutValue = _timeout(config.timeout);

    if (config.logger) {
      webLogger('ClientQuery', {
        type: 'get',
        url: requestUrl,
        params: config.params,
        loggerSize: config.loggerSize,
      });
    }
    axios
      .get(requestUrl, {
        timeout: timeoutValue,
        data: config.data,
        params: config.params,
        headers: { Authorization: token },
      })
      .then((response: AxiosResponse<IwgResponse<any>>) => {
        if (!_intercept(response)) {
          webLogger('ClientQuerySuccess', {
            url: requestUrl,
            params: config.params,
            loggerSize: config.loggerSize,
            response: response.data,
          });
          resolve(response.data);
          return;
        }
        webLogger('ClientQueryError', {
          url: requestUrl,
          params: config.params,
          loggerSize: config.loggerSize,
          error: response,
        });

        reject(response);
      })
      .catch((error: AxiosError<any>) => {
        webLogger('ClientQueryError', {
          url: requestUrl,
          params: config.params,
          loggerSize: config.loggerSize,
          error: error,
        });
        _interceptRequestError(error);
      })
      .finally(() => {
        if (isAttr(config, 'hideLoading') && !config.hideLoading && config.pageName) {
          menuAndNavTabStore.handleTabLoading(config.pageName, false);
        }
      });
  });
}

/**
 * @description: post请求接口
 * @param {string} url // 请求地址
 * @param {object} param // 请求体参数
 * @param {object} option // 剩余参数：timeout: 超时时间 hideLoading:是否开启遮罩 pageName：页面名称
 */
export function post(url: string, param: any, option?) {
  let baseUrl = BASE_URL;
  const token = cache.getToken();
  let timeout, hideLoading, pageName, logger, loggerSize;
  if (option) {
    timeout = option.timeout;
    hideLoading = option.hideLoading;
    pageName = option.pageName;
    logger = option.logger;
    loggerSize = option.loggerSize;
  }
  const menuAndNavTabStore = useMenuAndNavTabStore();

  if (!hideLoading && pageName) {
    menuAndNavTabStore.handleTabLoading(pageName, true);
  }

  if (url.indexOf('/api/crs') !== -1) {
    baseUrl += '/crs-service';
  }

  return new Promise(function (resolve, reject) {
    const requestUrl = baseUrl + url;
    const timeoutValue = _timeout(timeout);
    if (logger) {
      webLogger('ClientQuery', {
        type: 'post',
        url: requestUrl,
        params: param,
        loggerSize: loggerSize,
      });
    }
    axios
      .post(requestUrl, param, {
        timeout: timeoutValue,
        headers: { Authorization: token },
      })
      .then((response: AxiosResponse<IwgResponse<any>>) => {
        if (!_intercept(response)) {
          webLogger('ClientQuerySuccess', {
            url: requestUrl,
            params: param,
            loggerSize,
            response: response.data,
          });
          resolve(response.data);
          return;
        }

        webLogger('ClientQueryError', {
          url: requestUrl,
          params: param,
          loggerSize,
          error: response,
        });
        reject(response);
      })
      .catch((error: AxiosError<any>) => {
        webLogger('ClientQueryError', {
          url: requestUrl,
          params: param,
          loggerSize,
          error,
        });
        _interceptRequestError(error);
      })
      .finally(() => {
        if (!hideLoading && pageName) {
          menuAndNavTabStore.handleTabLoading(pageName, false);
        }
      });
  });
}
