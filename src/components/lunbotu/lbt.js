import React from 'react';
import styles from './lbt.less';

let timer;
export default class LBT extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgposition: 1,
    };

    this.lbtREF = React.createRef();
  }

  componentDidMount() {
    timer = setInterval(()=>{
      this.changeImg();
    },3000)
  }

  //移动元素
  moveElement = (element,space,time=1) => {
    element.style.transform = 'translate(' + space + 'px)';
    element.style.transition = 'transform ' + time + 's';
  }

  //切换图片
  changeImg = () => {

    //获取到轮播图dom元素
    const lbt = this.lbtREF.current;
    /**
     * 因为使用translate进行移动是相对移动，所以当我们切换图片的时候，每一张图片对应的相对位移都不一样
     * 而每张图片的相对位移就是  （图片的宽度 * 第几张图片）
     * this.state.imgposition：当前显示的图片是第几张
     */
    const position = 300 * this.state.imgposition;
    this.moveElement(lbt,-position);

    if (this.state.imgposition < this.props.imgArr.length) {//前面几张图片（排除最后也一张图片）轮播时
      //每次切换图片后，需把state的imgposition切换成当前的图片的顺序数
      this.setState({
        imgposition: this.state.imgposition + 1
      })
    } else {//最后一张图片轮播的情况

      /**
       * 切换回第一张图
       * 使用setTimeout是因为若不添加settimeout，页面在执行最后一张图片过渡到第一张图片的时候
       * 不会执行最后一张图往第一张图（最后）的过渡过程，只会按往左的顺序移动过渡到第一张图，而这明显不是我们想要的结果
       */
      setTimeout(() => {
        this.moveElement(lbt,0,0);
      }, 1000);
      //切换为第一张图后，应把imgposition改为1（第一张图）
      this.setState({
        imgposition: 1
      })
    }
  };


  render() {
    return (
        <div className={styles.lbt}>

          <div className={styles.lbt_border} ref={this.lbtREF}>
            {
              this.props.imgArr.map((item, index) => {
                return <img src={item} alt="" key={index}/>
              })
            }
            <img src={this.props.imgArr[0]} alt=""/>
          </div>
        </div>
    )
  }
}
