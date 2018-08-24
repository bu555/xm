export default {
  // 内文广告嵌入 （大於屏幕高度 嵌入）參數：傳入內容父容器
  insertToContent(target) {
    let initVH = window.innerHeight // 用戶當前窗口高度
    let vh = initVH *1.5
    let offset = 0
    let count = 0
    // 创建广告内容
    // <!-- In Article 這是內文部份 -->

    // advertContent.innerHTML = `<div style="width:100%;min-height:90px;line-height:100px;background:red;text-align:center;font-size:22px;color:#fff;margin-bottom:15px">廣告內容</div> `
    let ah = 150 //預設廣告dom高度
    insert(target)

    function insert(targetDom, noParent) { //noParent表示非始祖父元素
      // let count = 0
      if (targetDom.nodeType === 1) {
        let doms = targetDom.children
        if (!noParent) { //当始祖父节点总高度不足一屏
          if ((targetDom.lastElementChild.offsetTop + targetDom.lastElementChild.offsetHeight) < (offset + vh)) {
            targetDom.appendChild(createAdvert()) //末尾嵌入
            return
          }
        }
        if (doms.length < 1) {
          if (!noParent) return //排除了非始祖父元素
          if (targetDom.offsetTop + targetDom.offsetHeight > (offset + vh)) {
            offset = (targetDom.offsetTop + targetDom.offsetHeight) + ah
            if (targetDom.nodeName === "IMG") {
              targetDom.parentNode.parentNode.insertBefore(createAdvert(), targetDom.parentNode.nextElementSibling) //由于img做了处理，因此在其父元素下面嵌入
              // i++
            } else {
              targetDom.appendChild(createAdvert()) //作为子元素嵌入
            }
            offset = (targetDom.offsetTop + targetDom.offsetHeight) + ah
          }
          return;
        }
        for (let i = 0; i < doms.length; i++) {
          if ((doms[i].offsetTop + doms[i].offsetHeight) > (offset + vh) && (doms[i].offsetTop + doms[i].offsetHeight) < (offset + ah + vh * 2)) {
            offset = (doms[i].offsetTop + doms[i].offsetHeight) + ah
            if (i !== (doms.length - 1)) {
              targetDom.insertBefore(createAdvert(), doms[i].nextElementSibling) //不是最后一个元素，在下一個元素前嵌入
            } else {
              targetDom.parentNode.appendChild(createAdvert()) // 最后一个元素，嵌入末尾
            }
            // i++
          } else if ((doms[i].offsetTop + doms[i].offsetHeight) >= (offset + ah + vh * 2)) {
            insert(doms[i], true) //递归遍历（对于大于两屏以上的元素） true参数表示非始祖父元素
            // i--
          }
        }
      } else {
        // return console.log('參數錯誤');
      }
    }

    //  创建广告
    function createAdvert() {
      count++
      let advertContainer = document.createElement("div")
      // advertContainer.innerHTML = `
      //       <div style="width:100%;margin:10px 0;height:100px;background:lime">
      //       </div>
      //       `

      advertContainer.innerHTML = `
            <div style="width:100%;margin:10px 0;">
                <ins class="adsbygoogle"
                  style="display:block"
                  data-ad-client="ca-pub-0155854966618873"
                  data-ad-slot="9236758248"
                  data-ad-format="auto">
                </ins>
            </div>
            `
      let jsDom = document.createElement('script')
      jsDom.innerHTML = '(adsbygoogle = window.adsbygoogle || []).push({})'
      advertContainer.appendChild(jsDom)
      return advertContainer
    }
  },
  // 根據傳過來的數量
  createDiv(target) {
    return document.querySelectorAll(target)
  },
  // 右手面插入廣告
  insertToAside(target) {
    // 防止报错 有元素才进入
    if (target.length >= 1) {
      let parent = target[0].parentNode
      let reg = /^\+?[1-9][0-9]*$/
      // if(parent.lastChild == target){
      //   let newVdvert = document.createElement("div")
      //   newVdvert.innerHTML='<div style="background:red;width: 300px;height: 250px;margin: 0 auto">廣告</div>'
      //   parent.insertBefore(newVdvert,target.nextSibling)
      // }
      // 如果元素大于或者等于3 才插入广告
      if (window.innerWidth >= 768 && window.innerWidth <= 1200) {
        if (target.length >= 3) {
          for (let i = 0; i < target.length + 1; i++) {
            if (reg.test(i / 4)) {
              let newVdvert = document.createElement("div")
              newVdvert.setAttribute("class", "advertising")
              newVdvert.innerHTML = `<div style="width: 300px;;margin: 10px auto;">
                  <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="ca-pub-0155854966618873"
             data-ad-slot="5360543679"
             data-ad-format="auto"></ins>
            </div>`
              let jsDom = document.createElement('script')
              jsDom.innerHTML = '(adsbygoogle = window.adsbygoogle || []).push({})'
              newVdvert.appendChild(jsDom)
              let a = target[i - 1].nextSibling
              parent.insertBefore(newVdvert, a)
            }
          }
        }
      } else {
        if (target.length >= 3) {
          for (let i = 0; i < target.length + 1; i++) {
            if (reg.test(i / 3)) {
              let newVdvert = document.createElement("div")
              newVdvert.setAttribute("class", "advertising")
              newVdvert.innerHTML = `<div style="width: 300px;;margin: 10px auto;">
                <ins class="adsbygoogle"
           style="display:block"
           data-ad-client="ca-pub-0155854966618873"
           data-ad-slot="5360543679"
           data-ad-format="auto"></ins>
          </div>`
              let jsDom = document.createElement('script')
              jsDom.innerHTML = '(adsbygoogle = window.adsbygoogle || []).push({})'
              newVdvert.appendChild(jsDom)
              let a = target[i - 1].nextSibling
              parent.insertBefore(newVdvert, a)
            }
          }
        } else {

        }
      }
    }
  },

  // 首頁面熱門文章
  insertToIndex_recent(target) {
    // 防止报错 有元素才进入
    if (target.length >= 1) {
      let parent = target[0].parentNode
      let reg = /^\+?[1-9][0-9]*$/
      // if(parent.lastChild == target){
      //   let newVdvert = document.createElement("div")
      //   newVdvert.innerHTML='<div style="background:red;width: 300px;height: 250px;margin: 0 auto">廣告</div>'
      //   parent.insertBefore(newVdvert,target.nextSibling)
      // }
      // 如果元素大于或者等于3 才插入广告
      if (target.length >= 3) {
        for (let i = 0; i < target.length + 1; i++) {
          if (reg.test(i / 4)) {
            let newVdvert = document.createElement("div")
            newVdvert.setAttribute("class", "advertising")
            newVdvert.innerHTML = `<div  style="width: 300px;margin: 10px auto;">
                <ins class="adsbygoogle"
               style="display:block"
               data-ad-client="ca-pub-0155854966618873"
               data-ad-slot="5879418423"
               data-ad-format="horizontal"></ins>
          </div>`
            let jsDom = document.createElement('script')
            jsDom.innerHTML = '(adsbygoogle = window.adsbygoogle || []).push({})'
            newVdvert.appendChild(jsDom)
            let a = null
            if (window.innerWidth >= 768 && window.innerWidth <= 1200) {
              a = target[i].nextSibling
            } else {
              a = target[i - 1].nextSibling
            }

            parent.insertBefore(newVdvert, a)
          }
        }
      } else {

      }
    }
  },

  // 首頁左面插入广告
  insertToIndex(target) {
    // 防止报错 有元素才进入
    if (target.length >= 1) {
      let parent = target[0].parentNode
      let reg = /^\+?[1-9][0-9]*$/
      // if(parent.lastChild == target){
      //   let newVdvert = document.createElement("div")
      //   newVdvert.innerHTML='<div style="background:red;width: 300px;height: 250px;margin: 0 auto">廣告</div>'
      //   parent.insertBefore(newVdvert,target.nextSibling)
      // }
      // 如果元素大于或者等于3 才插入广告
      if (target.length >= 3) {
        for (let i = 0; i < target.length + 1; i++) {
          if (reg.test(i / 3)) {
            let newVdvert = document.createElement("div")
            newVdvert.setAttribute("class", "advertising")
            newVdvert.innerHTML = `<div  style="width: 300px;margin: 10px auto;">
                <ins class="adsbygoogle"
               style="display:block"
               data-ad-client="ca-pub-0155854966618873"
               data-ad-slot="5879418423"
               data-ad-format="horizontal"></ins>
          </div>`
            let jsDom = document.createElement('script')
            jsDom.innerHTML = '(adsbygoogle = window.adsbygoogle || []).push({})'
            newVdvert.appendChild(jsDom)
            let a = target[i - 1].nextSibling
            parent.insertBefore(newVdvert, a)
          }
        }
      } else {

      }
    }
  },
  // 首頁大家都在讀 加載時 插入廣告
  loadingAdvert(target) {
    if (target.length >= 1) {
      let parent = target[0].parentNode
      let reg = /^\+?[1-9][0-9]*$/
      if (target.length > 20) {
        let load_time = target.length / 20 - 1
        // 用來儲存次數 分別為 1、2、3
        let a = 0
        // 補存空餘
        let b = 0
        if (load_time != 1 && load_time != 2 && load_time != 3) {
          if (load_time % 3 == 1) {
            a = load_time % 3 == 1
            b = -1
          } else if (load_time % 3 == 2) {
            a = load_time % 3 == 2
            b = 0
          } else {
            b = 1
          }
        }
        // i為每次遍歷搜索 起點
        for (let i = target.length - 20 + b; i < target.length; i++) {
          if (reg.test(i / 3)) {
            let newVdvert = document.createElement("div")
            newVdvert.setAttribute("class", "advertising")
            newVdvert.innerHTML = `
            <div style="width: 300px;margin: 10px auto;color: white">
                  <ins class="adsbygoogle"
                   style="display:block"
                   data-ad-client="ca-pub-0155854966618873"
                   data-ad-slot="7930866697"
                   data-ad-format="horizontal"></ins>
            </div>`
            let jsDom = document.createElement('script')
            jsDom.innerHTML = '(adsbygoogle = window.adsbygoogle || []).push({})'
            newVdvert.appendChild(jsDom)
            let a = target[i - 1].nextSibling
            parent.insertBefore(newVdvert, a)
          }
        }
      }
    }
  },
  // 内页左面插入广告
  insertToDetails(target) {

    // 防止报错 有元素才进入
    if (target.length >= 1) {
      let parent = target[0].parentNode
      let reg = /^\+?[1-9][0-9]*$/
      // if(parent.lastChild == target){
      //   let newVdvert = document.createElement("div")
      //   newVdvert.innerHTML='<div style="background:red;width: 300px;height: 250px;margin: 0 auto">廣告</div>'
      //   parent.insertBefore(newVdvert,target.nextSibling)
      // }
      // 如果元素大于或者等于3 才插入广告
      if (target.length >= 3) {
        for (let i = 0; i < target.length + 1; i++) {
          if (reg.test(i / 3)) {
            let newVdvert = document.createElement("div")
            newVdvert.setAttribute("class", "advertising")
            newVdvert.innerHTML = `
          <div style="width: 300px;margin: 10px auto;color: white">
                <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-client="ca-pub-0155854966618873"
                 data-ad-slot="7930866697"
                 data-ad-format="horizontal"></ins>
          </div>`
            let jsDom = document.createElement('script')
            jsDom.innerHTML = '(adsbygoogle = window.adsbygoogle || []).push({})'
            newVdvert.appendChild(jsDom)
            let a = target[i - 1].nextSibling
            parent.insertBefore(newVdvert, a)
          }
        }
      } else {

      }
    }
  },

  // 监听 新数据回来 刷新 重新加载广告
  reloadAdvert(target) {
    if (target.length >= 1) {
      for (let i = target.length; i >= 0; i--) {
        let ele = target[i]
        $(ele).remove()
      }
    } else {
      $(target[0]).remove()
    }
  }


}
