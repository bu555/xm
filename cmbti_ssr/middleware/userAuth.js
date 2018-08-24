
import utils from '../plugins/utils'
 
export default function ({route, req, res, redirect}) {
  let isClient = process.client;
  let isServer = process.server;
  let redirectURL = '/user/login';
  var ticket, path
  //在服务端
  if (isServer) {
    ticket = utils.getCookie('Ticket',req)
    path = req.originalUrl
  }
  //在客户端判读是否登陆
  if (isClient) {
    ticket = utils.getCookie('Ticket')
    path = route.path;
  }
  if (path) {
    redirectURL = redirectURL+'?ref=' + encodeURIComponent(path)
  }
  //需要进行权限判断的页面开头
  if (!ticket) {
       redirect(redirectURL)
  }
}
