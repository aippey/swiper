import React from 'react';
import styles from './lbt.less';

let timer;
export default class LBT extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgposition: 1,
      width:300,
      height:200
    };

    this.lbtREF = React.createRef();
  }

  componentWillMount() {
    //由调用轮播图的组件来决定轮播图宽高
    if(this.props.width){
      this.setState({
        width:this.props.width
      })
    }
    if(this.props.height){
      this.setState({
        height:this.props.height
      })
    }
  }

  componentDidMount() {
    //只有图片大于1张才有轮播的必要
    if(this.props.imgArr.length > 1){
      timer = setInterval(()=>{
        this.changeNextImg();
      },3000)
    }
  }

  //移动元素
  moveElement = (element,space,time=1) => {
    element.style.transform = 'translate(' + space + 'px)';
    element.style.transition = 'transform ' + time + 's';
  };

  //切换下一张图片
  changeNextImg = () => {
    const {width} = this.state;

    //获取到轮播图dom元素
    const lbt = this.lbtREF.current;

    const position = width * this.state.imgposition;

    if (this.state.imgposition <= this.props.imgArr.length) {
      this.moveElement(lbt,-position);

      this.setState({
        imgposition: this.state.imgposition + 1
      })
    } else {

      this.moveElement(lbt,0,0);
      setTimeout(() => {
        this.moveElement(lbt,-width);
      }, 0);
      this.setState({
          imgposition: 2
      })

    }
  };

  //切换上一张图片
  changeLastImg = () =>{
    const {width} = this.state;

    //获取到轮播图dom元素
    const lbt = this.lbtREF.current;

    if(this.state.imgposition !== 1){
      const position = width * (this.state.imgposition - 2);
      this.moveElement(lbt,-position);
      this.setState({
        imgposition: this.state.imgposition - 1
      });
    } else {
      const position = this.props.imgArr.length * width;
      this.moveElement(lbt,-position,0);
      setTimeout(() => {
        this.moveElement(lbt,(-position + width));
      }, 0);
      this.setState({
        imgposition: this.props.imgArr.length
      })
    }
  };

  //下一张图片
  nextImg = () =>{
    clearInterval(timer);
    this.changeNextImg();
    timer = setInterval(()=>this.changeNextImg(),3000);
  };

  //上一张图片
  lastImg = () =>{
    clearInterval(timer);
    this.changeLastImg();
    timer = setInterval(()=>this.changeNextImg(),3000);
  };

  render() {
    const {imgArr} = this.props;
    const {width,height} = this.state;
    return (
      <div>
        <div className={styles.lbt} style={{width: `${width}px`,height: `${height}px`}}>
          <div className={styles.lbt_border} ref={this.lbtREF}>
            {
              imgArr.map((item, index) => {
                return <img src={item} key={index} style={{width: `${width}px`,height: `${height}px`}}/>
              })
            }
            <img src={imgArr[0]} style={{width: `${width}px`,height: `${height}px`}}/>
          </div>

          <div onClick={this.lastImg} className={styles.left} style={{top: `${(height-30)/2}px`}}>
            <img src={require('./img/left.png')} alt=""/>
          </div>
          <div onClick={this.nextImg} className={styles.right} style={{top: `${(height-30)/2}px`}}>
            <img src={require('./img/right.png')} alt=""/>
          </div>
        </div>

      </div>
    )
  }
}
