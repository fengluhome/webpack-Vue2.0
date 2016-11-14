/**
 * Created by lu on 2016/9/27.
 */
import config from  '../../config';
import {toQueryString} from './lang'
window.baidu = window.baidu || {};


/**
 *
 * @param option
 * @returns {XMLHttpRequest|*}
 */
export function ajax(option) {
  var httpRequest,
    httpSuccess,
    timeout,
    isTimeout = false,
    isComplete = false,
    url;


  url = config.apiPath + option.url + ( config.debug ? ".json" : "");


  //time 后期封装 解决非正常频繁请求问题 优化网络
  option = {
    url: url,
    method: (option.type || "GET").toUpperCase(),
    data: option.data || null,
    arguments: option.arguments || null,

    success: option.success || function () {
    },
    error: option.error || function () {
    },
    complete: option.complete || function () {
    },
    loading: option.loading || false, //loading 动画遮罩层
    isAsync: option.isAsync || true,
    timeout: option.timeout || 50000,
    contentType: option.contentType,
    dataType: option.dataType || "json",
    getLoading: option.getLoading || false

  };
  baidu.sug = function (data) {
   option.success(data);
    // debugger
  }
  // url += "?time=" + (new Date()).valueOf();

  if (option.method != "POST" && option.data && typeof option.data === "object") {
    option.data = toQueryString(option.data);
  }

  //检查ajax请求
  httpSuccess = function (r) {
    try {
      return (!r.status && location.protocol === "file:") || (r.status >= 200 && r.status < 300) || (r.status === 304) || (navigator.userAgent.indexOf("Safari") > -1 && typeof r.status === "undefined");
    } catch (e) {

    }
    return false;
  };
  timeout = option.timeout;

  httpRequest = new window.XMLHttpRequest();

  /**
   * @ignore
   */
  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState === 4) {
      isComplete = true;
      if (!isTimeout) {
        var o = {};
        o.responseText = httpRequest.responseText;
        o.responseXML = httpRequest.responseXML;
        o.data = option.data;
        o.status = httpRequest.status;
        o.uri = option.url;
        o.arguments = option.arguments;
        if (option.dataType === 'json') {
          try {
            o.responseJSON = JSON.parse(httpRequest.responseText);
          } catch (e) {
          }
        }
        if (httpSuccess(httpRequest)) {

          var data = option.dataType === 'json' ? o.responseJSON : o.responseText;
          if (option.dataType === 'json') {
            option.success(data);
          } else if (option.dataType == "jsonp") {
            eval(data);
          }

        } else {
          option.error(o);
        }
        option.complete(o);
      }


      //删除对象,防止内存溢出
      httpRequest = null;
    }
  };
  if (option.getLoading) {


  }


  if (option.method === "GET") {
    if (option.data) {
      option.url += (option.url.indexOf("?") > -1 ? "&" : "?") + option.data;
      option.data = null;
    }
    httpRequest.open("GET", option.url, option.isAsync);
    httpRequest.setRequestHeader("Content-Type", option.contentType || "text/plain;charset=UTF-8");
    httpRequest.send(JSON.stringify());
  } else if (option.method === "POST") {
    httpRequest.open("POST", option.url, option.isAsync);
    httpRequest.setRequestHeader("Content-Type", option.contentType || "application/json;charset=utf-8");
    httpRequest.send(JSON.stringify(option.data));
  } else {
    httpRequest.open(option.method, option.url, option.isAsync);
    httpRequest.send();
  }

  window.setTimeout(function () {
    var o;
    if (!isComplete) {


      isTimeout = true;
      o = {};
      o.uri = option.url;
      o.arguments = option.arguments;

      option.complete(o);
    }
  }, timeout);

  return httpRequest;
}