import axios from "axios";
import qs from "qs";

// axios.defaults.timeout = 50000; //响应时间
// axios.defaults.headers.post["Content-Type"] =
//   "application/x-www-form-urlencoded;charset=UTF-8"; //配置请求头
// axios.defaults.baseURL = ""; //配置接口地址
// axios.defaults.headers.post["Content-Type"] =
//   "Access-Control-Allow-Origin";
// axios.defaults.headers.post['Authorization'] = localStorage.getItem('token')

//   axios.interceptors.request.use(config => {
//     // config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
//   let token =localStorage.getItem('token')
//   if (token) {
//     config.headers.common['token'] =localStorage.getItem('token');
//   }
//   return config},err => {
//     return Promise.reject(err);
//   })
// 实例对象
let instance = axios.create({
  timeout: 6000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

// instance.request.use(
//   config => {
//   // 判断是否存在token，如果存在的话，则每个http header都加上token
//     let token = sessionStorage.getItem('Authorization')
//     if (!config.headers.hasOwnProperty('Authorization') && token) {
//       config.headers.Authorization = token;
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   });


//POST传参序列化(添加请求拦截器)
instance.interceptors.request.use(
  config => {
    //在发送请求之前做某件事
    if (config.method === "post") {
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  error => {
    console.log("错误的传参");
    return Promise.reject(error);
  }
);

//返回状态判断(添加响应拦截器)
instance.interceptors.request.use(
  res => {
    //对响应数据做些事
    if (!res.data.success) {
      return Promise.resolve(res);
    }
    return res;
  },
  error => {
    console.log("网络异常");
    return Promise.reject(error);
  }
);

//返回一个Promise(发送post请求)
export function fetchPost(url, data) {

  return new Promise((resolve, reject) => {
    axios
      .post(url, data, {
        headers: {
          // 'Cooking': localStorage.getItem('token'),
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        wthCredentials: true
      })
      .then(
        response => {
          if (response.status == 200) {
            resolve(response.data);
          }
        },
        err => {
          reject(err);
        }
      )
      .catch(error => {
        reject(error);
      });
  });
}
////返回一个Promise(发送get请求)
export function fetchGet(url, param) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: param,
        changeOrigin: true,
        header:{   
          'Content-Type': 'Access-Control-Allow-Origin'
        }
      }
      )
      .then(
        response => {
          if (response.status == 200) {
            resolve(response.data);
          }
        },
        err => {
          reject(err);
        }
      )
      .catch(error => {
        reject(error);
      });
  });
}
export default {
  fetchPost,
  fetchGet
};
