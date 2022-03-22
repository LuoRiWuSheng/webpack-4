import EXIF from 'exif-js'

class zipLib {

  constructor(fileList, options) {
    if (fileList.lenght === 0) {
      throw new Error("请传入文件，当前文件长度为0")
    }

    this.fileList = fileList
    this.file_type = 'image/jpeg', //图片类型

      this.config = {
        quality: 0.5, // 图片压缩品质，默认是0.5，可选范围是0-1的数字类型的值，可配置
        imgWH: 1000 //压缩后的图片的最大宽度和高度，默认是1000px，可配置
      };

    if (options && options.imgWH && options.imgWH > 1000) {
      options.imgWH = 1000
    }

    // 合并配置
    this.config = Object.assign({}, this.config, options)

    // 压缩后的二进制数据列表
    this.blobList = []

    // 图片的方向角
    this.Orientation = ''

    // 非照片文件
    this.noPhoto = []

    this.canvas = null;
    this.ctx = null;

    this.init()

    // 创建canvas
    this.createCanvas()
  }

  init () {
    let files = Array.prototype.slice.call(this.fileList)

    files.forEach((file, i) => {
      let type = this.getFileType(file)

      // 非照片文件都放进去
      if (type !== 'jpg' || type !== 'jpeg' || type !== 'png') {
        this.noPhoto.push(file)
      } else {
        let reader = new FileReader()

        // 获取压缩前的文件大小
        let size = parseInt(file.size / 1024)
        console.log("压缩前的文件大小--》", size)

        // 读取文件内容
        reader.readAsDataURL(file)

        // 触发onload事件
        reader.onload = function (event) {
          let img = new Image()
          // base64
          img.src = event.target.result
          console.log(event.target.result)
          //获取照片方向角属性，用户旋转控制  
          // EXIF

          if (img.complete) {
            this.getPicDirect(img, file, size)
          } else {
            img.onload = this.getPicDirect(img, file, size)
          }

          // 释放内存
          img = null
        }
      }
    })
  }

  // 获取照片方向角属性
  getPicDirect (img, file, size) {
    let self = this
    EXIF.getData(img, function () {
      EXIF.getAllTags(this);
      self.Orientation = EXIF.getTag(this, 'Orientation');

      console.log('Orientation:', self.Orientation)
      if (self.Orientation == "" || self.Orientation == undefined | self.Orientation == null) {
        self.Orientation = 1;
      }
    })

    // 压缩照片
    this.compress(img, file, size)
  }


  // 创建canvas
  createCanvas () {
    let canvas = document.createElement("canvas")
    let ctx = canvas.getContext("2d")

    this.canvas = canvas
    this.ctx = ctx
  }

  /**
   * 功能：判断上传图片的方向，如果不是正确的，进行修正，并对图片进行压缩，压缩完后，返回压缩后的二进制图片数据
   * @param {*} img Base64的照片
   * @returns 返回的压缩后的二进制图片数据
   */
  compress (img, file, size) {
    //如果方向角不为1，都需要进行旋转
    if (this.Orientation != 1) {
      switch (this.Orientation) {
        case 6://需要顺时针90度旋转
          rotateImg(img, 'right');
          break;
        case 8://需要逆时针90度旋转
          rotateImg(img, 'left');
          break;
        case 3://需要180度旋转
          rotateImg(img, 'right2');//转两次
          break;
      }
    } else {
      //不做旋转
      rotateImg(img, 'no');
    }

    // 图片旋转，绘制到canvas以后，从canvas里面将数据将数据转出来
    let base64 = this.canvas.toDataURL(this.file_type, this.config.quality)

    console.log("data", base64)

    // 压缩后的数据push进去
    this.blobList.push({
      base64,
      // 压缩后的大小
      zipSize: "",
      // 原始file文件
      origin: file,
      // 原始file文件大小
      originSize: size
    })
  }

  /**
   *  功能：对图片旋转处理
   * @param {*} img 用来矫正方向的图片对象
   * @param {*} direction 旋转方向
   */
  rotateImg (img, direction) {

  }

  /**
   * 通过MIME获取文件类型
   * @param {File} file 
   */
  getFileType (file) {
    return file.type.split("/")[1]
  }

  // 获取压缩后的文件
  getCompressFiles () {

    return {
      noPhoto: this.noPhoto,

    }
  }
}

export default zipLib