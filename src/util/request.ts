interface rparams {
  url: string;
  method?: string;
  data?: any;
  headers?: any;
}
const request = ({
  url="",
  method = "get",
  data,
  headers = {}
}: rparams) => {
  return new Promise(resolve => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    Object.keys(headers).forEach(key =>
      xhr.setRequestHeader(key, headers[key])
    );
    xhr.send(data);
    xhr.onload = (e: any) => {
      resolve({
        data: e.target.response
      });
    };
  });
}

export default request;

/* 
  能发ajax请求的函数
  1. 接收一个配置
  2. 返回值是promise
  3. 使用xhr发ajax请求
  4. 携带请求参数
  5. 取响应结果, 并更新promise状态
*/
// interface rparams {
//   url: string;
//   method: string;
//   data?: any;
//   params?: any;
//   headers?: any;
// }

// function request({
//   // 1. 接收一个配置
//   url,
//   method = "GET",
//   data = {},
//   params = {},
//   headers = {},
// }: rparams) {
//   // 1.准备query参数。若对象为空，则跳过  {a: 1, b: 2} ==> a=1&b=2 ==> url?a=1&b=2
//   if (JSON.stringify(params) !== "{}") {
//     let queryStr = "";
//     // a=1&b=2&
//     Object.keys(params).forEach(key => {
//       queryStr += `${key}=${params[key]}&`;
//     });
//     if (queryStr) {
//       queryStr = queryStr.slice(0, queryStr.length - 1); // a=1&b=2
//       url += "?" + queryStr;
//     }
//   }

//   // 2.返回值是promise
//   return new Promise((resolve, reject) => {
//     // 3.创建xhr对象
//     const xhr = new XMLHttpRequest();

//     // 4.设置请求方式和url
//     xhr.open(method, url, true);

//     // 5.设置请求头，
//     if (JSON.stringify(headers) !== "{}") {
//       Object.keys(headers).forEach(key =>
//         xhr.setRequestHeader(key, headers[key])
//       );
//     }

//     // 6.并准备请求体参数
//     data = JSON.stringify(data);

//     // 7.发请求
//     if (method === "POST" || method === "PUT" || method === "DELETE") {
//       xhr.send(data);
//     } else {
//       // GET
//       xhr.send();
//     }
//     // 7.取响应结果, 并更新promise状态
//     xhr.onreadystatechange = () => {
//       // 请求没完成, 直接结束
//       const { readyState, status, statusText } = xhr;
//       if (readyState !== 4) return;
//       // 成功了, 更新为成功, 并传入成功的response
//       if (status >= 200 && status <= 299) {
//         const response = {
//           data: JSON.parse(xhr.response),
//           // data: xhr.response,
//           status,
//           statusText,
//         };
//         resolve(response);
//         // 失败了, 更新为失败, 并传入成功的error
//       } else {
//         reject(new Error("request error status is " + status));
//       }
//     };
//   });
// }

// export default request;
