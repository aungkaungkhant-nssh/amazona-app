import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {summaryOrder} from '../redux/order/orderAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Chart } from "react-google-charts";
function DashboardScreen() {
  const dispatch = useDispatch();
  const orderSummary = useSelector((state)=>state.orderSummary);
  const {loading,error,summary} = orderSummary;
  useEffect(()=>{
    dispatch(summaryOrder());
  },[]);
  console.log(summary);
  return (
    <div>
        <div className="row">
            <h1>Dashboard</h1>
        </div>
        {
            loading ? (<LoadingBox />)
            :error ? ( <MessageBox variant="danger">{error}</MessageBox> )
            :(
                <>
                    <ul className="row summary">
                        <li>
                            <div className="summary-title color1">
                                <span>
                                    <i className="fa fa-users" /> Users
                                 </span>
                            </div>
                            <div className="summary-body">{summary.users[0].numUsers}</div>
                        </li>
                        <li>
                            <div className="summary-title color2">
                                <span>
                                     <i className="fa fa-shopping-cart" /> Orders
                                 </span>
                            </div>
                            <div className="summary-body">{summary.orders[0] ?summary.orders[0].numOrders:0}</div>
                        </li>
                        <li>
                            <div className="summary-title color3">
                                 <span>
                                    <i className="fa fa-money" /> Sales
                                 </span>
                            </div>
                            <div className="summary-body">$ {summary.orders[0] ?summary.orders[0].totalPrice.toFixed(2):0}</div>
                        </li>
                    </ul>
                    <div>
                        <h2>Sales</h2>
                        {
                            summary.dailyOrders.length=== 0 
                            ? (<MessageBox>No Sale</MessageBox>)
                            :(
                                <Chart
                                    chartType="AreaChart"
                                    data={[["Date","Sales"], ...summary.dailyOrders.map((d)=>[d._id,d.sales])]}
                                    width="100%"
                                    height="400px"
                                    legendToggle
                                />
                            )
                        }
                    </div>
                    <div>
                        <h2>Categories</h2>
                        {
                            summary.productCategories.length=== 0 
                            ? (<MessageBox>No Sale</MessageBox>)
                            :(
                                <Chart
                                    chartType="PieChart"
                                    data={[["Category","Products"], ...summary.productCategories.map((d)=>[d._id,d.count])]}
                                    width="100%"
                                    height="400px"
                                    
                                />
                            )
                        }
                    </div>
                </>
            )
        }
    </div>
  )
}

export default DashboardScreen