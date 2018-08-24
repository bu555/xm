class filtration {
  // 转换为用户当前时区的时间
  timezone_filter(val) {
    if (val) {
      let timezone_now = new Date().getTimezoneOffset() / 60
      // 取出后面的时间 for example “10：20：12”
      let newvalue1 = val.split('T')[1].split("Z")[0]
      // 取出年份 for example “2012-10-10”
      let newvalue2 = val.split('T')[0]
      // 取出 时间值 时 for example “09”
      let newvalue3 = parseInt(newvalue1.split(':')[0]) - timezone_now

      let newvalue4 = null
      if (newvalue3 < 10 && newvalue3 >0) {
        newvalue4 = "0" + newvalue3
      }else if(newvalue3==0){
        newvalue4 = 24
      }else if (newvalue3 <0){
        newvalue4 = 24 + newvalue3
      }else if (newvalue3>24){
        newvalue4 = newvalue3 - 24
      }else{
        newvalue4 = newvalue3
      }
      //["09", "47", "18"]
      let steps = newvalue1.split(":")
      // 09
      let steps1 = steps[0] = newvalue4

      // 47
      let steps2 = steps[1]
      // 18
      let steps3 = steps[2]
      return newvalue2 + " " + steps1 + ":" + steps2 + ":" + steps3
    }
  }
  getDateTimeStamp (dateStr) {
    return Date.parse(dateStr.replace(/-/gi,"/"));
  }
  getDateDiff (dateStr) {
    var publishTime = this.getDateTimeStamp(dateStr)/1000,
        d_seconds,
        d_minutes,
        d_hours,
        d_days,
        timeNow = parseInt(new Date().getTime()/1000),
        d,
        
        date = new Date(publishTime*1000),
        Y = date.getFullYear(),
        M = date.getMonth() + 1,
        D = date.getDate(),
        H = date.getHours(),
        m = date.getMinutes(),
        s = date.getSeconds();
        //小于10的在前面补0
        if (M < 10) {
            M = '0' + M;
        }
        if (D < 10) {
            D = '0' + D;
        }
        if (H < 10) {
            H = '0' + H;
        }
        if (m < 10) {
            m = '0' + m;
        }
        if (s < 10) {
            s = '0' + s;
        }

    d = timeNow - publishTime ;
    d_days = parseInt(d/86400);
    d_hours = parseInt(d/3600);
    d_minutes = parseInt(d/60);
    d_seconds = parseInt(d);
    if(d_days > 0 && d_days < 3){
        return d_days + '天前';
    }else if(d_days <= 0 && d_hours > 0){
        return d_hours + '小時前';
    }else if(d_hours <= 0 && d_minutes > 0){
        return d_minutes + '分鐘前';
    }else if (d_seconds < 60) {
        if(d_seconds<=0){
            return 0 + '秒前';
        }else{
            return d_seconds + '秒前';
        }
            
    }else if (d_days >= 3 && d_days < 30){
        return M + '-' + D + '&nbsp;' + H + ':' + m;
    }else if (d_days >= 30) {
        return Y + '-' + M + '-' + D + '&nbsp;' + H + ':' + m;
    }
} 
  
}

export default new filtration()

