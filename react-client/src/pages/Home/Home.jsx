import {data, user } from "./user"
import { useEffect } from "react";
import styled from "styled-components"
import{useSelector, useDispatch} from "react-redux"
import {useHistory} from "react-router-dom"
import Chart from "../../components/Chart/Chart";
import img from "../../img/card-home.png"
import { Grid, Spacer} from "@nextui-org/react"
import SideBar from "../../components/Sidebars/Sidebar"
import { getUserAccountInfo, getUserInfo, getBalance} from "../../redux/reducers/userSlice";



const ContainerS = styled.div`
  margin: 0px 300px;
 
  display:flex;
  flex-direction: column;
  width: 100%;
  justify-content:center;
  overflow-y:scroll;
  `;
const TextS = styled.h2`
  font-weight: bold;
  justify-content: flex-start;
  margin-top:25px;
  margin-left: 0px;
  margin-right: 27%;
  margin-bottom:0px;
  
`;
const GridS = styled.div`
  margin:5px 20px;
  display:flex;
  flex-wrap:wrap;
  width: 70%;
  height:100%;
`;
const CardBalance = styled.div`
  display:flex;
  width:90%;
  
  background-color: #F6F6F6;
  border-radius: 20px;
  padding: 50px;
`;
const Balance = styled.div`
  background-color: #ebe4e4a5;
  border-radius:20px;
  display:flex;
  width:100%;
  height:100%;
  justify-content: center;
  align-items: center;

`;
const Line = styled.div`
  border: solid 1px #bdbaba;
  width: 1px;
  height: 100%;
  margin: 0px 100px;
  margin-right: 50px;
`;
const Expeses = styled.div`
  display:flex;
  flex-direction:column;
  border-radius:20px;
  background-color: #F6F6F6;
  width: 90%;
  height: 480px;
  
`;
const ChartContainer = styled.div`
  display:flex;
  margin-top:20px;
  background-color:#F6F6F6;
  border-radius:20px;
  justify-content:center;
  width:90%;
`;
const CardNnumber = styled.h3`
  color:#F6F6F6;
  position: absolute;
  width:300px;
  height:50px;
  top:270px;
  left:1;
  padding-left:20px;
`;
const CardName = styled.h5`
  color:#F6F6F6;
  position: absolute;
  width:500px;
  height:50px;
  top:300px;
  padding-left:20px;
  left:1;
`;
const DateNameTotal = styled.div`
  padding-top: 15px;
  margin-bottom:10px;
  display:flex;
  justify-content:space-around;
  width: 100%;
  height:50px;
`;
const LatestMovements = styled(Grid.Container)`
  color:black;
  width:100%;
  padding-bottom:10px;

`;
const GridLatestMovents = styled(Grid)`
  border-radius:10px;
`;
const GridContainer = styled.div`
  border-radius:10px;
  height:100%;
  width:100%;
  overflow:auto;
  overflow-x:hidden;
  
`;


export default function Home() {
  const loggedInUser = useSelector(state => state.user.loggedInUser)
  const userInfo = useSelector(state => state.user.userInfo.info)
  const userAccountInfo = useSelector(state => state.user.userAccountInfo.info)
  const userTransaction = useSelector(state => state.user.userBalance.info)
  const dispatch = useDispatch()
  const history= useHistory();

 
  

   useEffect(() => {
   if(!loggedInUser) history.push("/")

  }, [loggedInUser,history]);
  
  useEffect(() => {
    dispatch(getUserInfo())
    dispatch(getUserAccountInfo())
    dispatch(getBalance())
  }, [])

  return (
    <div>
    <SideBar/>
    <ContainerS>
        <GridS>
        <TextS>My Card</TextS>
        <TextS>Found</TextS>
        </GridS>  
        <GridS>
            <CardBalance>
            <img height="200px" src={img} alt="" />

            
            {userInfo && userAccountInfo &&
            <><CardNnumber>
                {`**** **** **** ${userAccountInfo.card.cardNumber}`}
              </CardNnumber><CardName>
                  {`${userInfo.firstname} ${userInfo.lastname}`}
                </CardName></>}
           
            <Line/>
            {userAccountInfo && 
            <Balance>
                <h1>${`${userAccountInfo.balance}`}</h1>
            </Balance> }
           
            </CardBalance>
        </GridS>
        <GridS>
           <TextS>Latest movements</TextS>
          <Expeses>
            <DateNameTotal>
                <h3>Date</h3>
                <h3>Name</h3>
                <h3>Total</h3>
                
            </DateNameTotal>
              <GridContainer>

              {userTransaction?.map((e, i) => 
              <LatestMovements key={i} gap={2} justify="space-around">
                <Spacer x={3} />
                <GridLatestMovents xs={2}>{` ${e.transaction.date.slice(0,10)} `} </GridLatestMovents>
                <Spacer x={-4}/>
                <GridLatestMovents justify="center" xs={4}>{` ${e.transaction.description} `} </GridLatestMovents>
                <Spacer x={1}/>
                <GridLatestMovents xs={1}>{e.role === 'RECEIVER' ? ` +$${e.transaction.amount}` : ` -$${e.transaction.amount}` } </GridLatestMovents>
                <Spacer x={2} />
              </LatestMovements>  
                  ) 
                }
              </GridContainer>
          </Expeses>
        </GridS>
        <GridS>
        <TextS>statistics</TextS>
        <ChartContainer >
          <Chart height="500px" data={data}/>
        </ChartContainer>
        </GridS>
    </ContainerS>
        <Spacer y={3}/>
  </div> 
    
  )
}
