import React, { Component } from 'react';
import axios from 'axios';
import { Spin, Alert, Button, Icon, Pagination } from 'antd';//loading效果组件
import SeatItem from './SeatItem';
import '../../css/SeatList.css';

class SeatList extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:[],   //座位列表
            nowFloor:parseInt(props.match.params.page, 10) || 1,  //当前第几楼的数据
            pageSize:240,  //每页显示的数据
            total:0,       //在此side下的总的座位数
            isLoading:true,   //数据是否正在加载,true为正在加载
            seatType:props.match.params.type,  //保存要获取的座位的side数据
            newNumber:null,
            seatRow:1,
            seatColumn:1
        };
    }
    componentWillMount(){
        // axios.get('http://47.103.19.127/lab-service/lab/floor/1/side/left/seats')
        //     .then(function (response) {
        //         console.log(response);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     }); 
        this.loadSeatListByTypeAndPageByGet()
    }

    componentWillReceiveProps(nextProps){
        // console.log(nextProps.match);
        this.setState({
            isLoading:true,    //又要重新加载座位数据
            nowFloor:parseInt(nextProps.match.params.page, 10) || 1,
            seatType:nextProps.match.params.type     //座位side类型

        },function(){
            this.loadSeatListByTypeAndPageByGet()
        })
    }

    //楼层改变的时候,记载新的数据
    floorChanged= (page)=>{
        // window.location.href = '/#/select/' + this.state.seatType + '/' + page
        this.props.history.push('/select/' + this.state.seatType + '/' + page)
    }

    //点击判断座位的状态
    handleClick = (i)=>{
        if(this.state.data[i].isAllocate) return;
        if(this.state.newNumber === i){
            this.setState({
                newNumber:null
            })
            return ;
        } 
        const data = this.state.data;
        // this.setState({
            // newNumber:i,
            // seatRow:data[i].seatRow,
            // seatColumn:data[i].seatColumn,
            // floor:data[i].floor
        // })
        this.setState((prevState)=>({
            newNumber:i,
            seatRow:data[i].seatRow,
            seatColumn:data[i].seatColumn,
            floor:data[i].floor
        }),()=>(console.log(this.state)))
        // console.log(this.state)
    }

    renderSeat(i,item){
        return (
            <SeatItem {...item} 
                        key={i} 
                        index={i}
                        className={this.state.newNumber===i?'selected':this.state.data[i].isAllocate?'allocate':'unlocate'}
                        onClick={()=>{this.handleClick(i)}}
                        >
            </SeatItem>
        )
    }

    //渲染座位列表的方法
    renderList = ()=>{
        if(this.state.isLoading){
            return (<Spin tip="Loading...">
            <Alert
            message="正在请求当前座位数据"
            description="马上呈现...."
            type="info"
            />
        </Spin>)
        }else{
            return (<div>
                    <ul id="wrapUl">
                        {this.state.data.map((item, index) =>{
                            // return <SeatItem {...item} 
                            //                 key={index} 
                            //                 className={this.state.newNumber===index?'selected':this.state.data[i].isAllocate?'allocate':'unlocate'}
                            //                 onClick={()=>(this.handleClick(i))}
                            //                 >
                            //         </SeatItem>
                            return (this.renderSeat(index ,item));
                        })}
                    </ul>
                    <Pagination defaultCurrent={this.state.nowFloor} 
                                pageSize={this.state.pageSize} 
                                total={1200}
                                onChange={this.floorChanged} />
                    <Button.Group className="btn">
                        <Button type="primary">
                            <Icon type="left" />返回
                        </Button>
                        <Button type="primary"  onClick = {()=>(this.loadSeatListByTypeAndPageByPut())}>
                            确认选座
                        </Button>
                    </Button.Group>
                    </div>
                )
        }
    }

    //根据座位类型和页码获取座位数据
    loadSeatListByTypeAndPageByGet = ()=>{
        const url = `http://47.103.19.127/lab-service/lab/floor/${this.state.nowFloor}/side/${this.state.seatType}/seats`
        axios.get(url)
                .then((response) => {
                    
                    this.setState({
                        isLoading:false,   //loading效果隐藏
                        data:response.data.data,  //为座位列表重新赋值
                        total:response.data.data.length  //总的座位数保存到state上
                    })
                })
                .catch((error) => {
                    console.log(error);
                }); 
    }

    //点击确认选座发送put请求
    loadSeatListByTypeAndPageByPut = ()=>{
        this.setState({
            newNumber: null
        })
        const url = `http://47.103.19.127/lab-service/lab/floor/${this.state.floor}/row/${this.state.seatRow}/column/${this.state.seatColumn}/confirm?stuNo=${new Date().toLocaleTimeString()}`
        axios.put(url)
                .then((response) => {
                    
                    // this.setState({
                    //     isLoading:false,   //loading效果隐藏
                    //     data:response.data.data,  //为座位列表重新赋值
                    //     total:response.data.data.length  //总的座位数保存到state上
                    // })
                    this.loadSeatListByTypeAndPageByGet()
                    
                })
              
                .catch((error) => {
                    console.log(error);
                }); 
    }

    render() {
        return (
            <div>
               {this.renderList()}
            </div>
        );
    }
}

export default SeatList;