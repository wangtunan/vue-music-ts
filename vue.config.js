const axios = require('axios')
module.exports = {
  devServer: {
    before (app) {
      // 轮播
      app.get('/api/getTopBanner', function (req, res) {
        const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
        const jumpPrefixMap = {
          10002: 'https://y.qq.com/n/yqq/album/',
          10014: 'https://y.qq.com/n/yqq/playlist/',
          10012: 'https://y.qq.com/n/yqq/mv/v/'
        }
        axios.get(url, {
          headers: {
            referer: 'https://u.y.qq.com/',
            host: 'u.y.qq.com'
          },
          params: req.query
        }).then((response) => {
          response = response.data
          if (response.code === 0) {
            const slider = []
            const content = response.focus.data && response.focus.data.content
            if (content) {
              for (let i = 0; i < content.length; i++) {
                const item = content[i]
                const sliderItem = {}
                const jumpPrefix = jumpPrefixMap[item.type || 10002]
                sliderItem.id = item.id
                sliderItem.linkUrl = jumpPrefix + item.jump_info.url + '.html'
                sliderItem.picUrl = item.pic_info.url
                slider.push(sliderItem)
              }
            }
            res.json({
              code: 0,
              data: {
                slider
              }
            })
          } else {
            res.json(response)
          }
        }).catch((e) => {
          console.log(e)
        })
      })
      // 推荐歌单
      app.get('/api/getDiscList', function (req, res) {
        const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
        axios.get(url, {
          headers: {
            referer: 'https://c.y.qq.com/',
            host: 'c.y.qq.com'
          },
          params: req.query
        }).then((response) => {
          const { status, data } = response
          if (status === 200 && data.data) {
            res.json({
              code: 0,
              data: data.data.list
            })
          } else {
            res.json({
              code: 0,
              data: []
            })
          }
        }).catch((e) => {
          console.log(e)
        })
      })
      // 搜索
      app.get('/api/search', function (req, res) {
        const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
        axios.get(url, {
          headers: {
            referer: 'https://c.y.qq.com/',
            host: 'c.y.qq.com'
          },
          params: req.query
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
          console.log(e)
        })
      })
      // 歌单信息
      app.get('/api/getCdInfo', function (req, res) {
        const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
        axios.get(url, {
          headers: {
            referer: 'https://c.y.qq.com/',
            host: 'c.y.qq.com'
          },
          params: req.query
        }).then((response) => {
          let ret = response.data
          if (typeof ret === 'string') {
            const reg = /^\w+\(({.+})\)$/
            const matches = ret.match(reg)
            if (matches) {
              ret = JSON.parse(matches[1])
            }
          }
          res.json({
            code: 0,
            data: ret.cdlist[0].songlist
          })
        }).catch((e) => {
          console.log(e)
        })
      })
    }
  }
}
