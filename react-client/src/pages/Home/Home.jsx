import { useEffect } from "react";
import styled from "styled-components"
import{useSelector, useDispatch} from "react-redux"
import {useHistory} from "react-router-dom"
import Chart from "../../components/Chart/Chart";
import img from "../../img/card-home.png"
import { Grid, Spacer, Text} from "@nextui-org/react"
import SideBar from "../../components/Sidebars/Sidebar"
import { getUserAccountInfo, getUserInfo, getBalance} from "../../redux/reducers/userSlice";
import { toast} from "react-toastify";



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
  margin-right: 32%;
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
  height: 320px;
  
`;
const ChartContainer = styled.div`
  display:flex;
  justify-content: center;
  align-items:center;
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
    const fetchData = async() => {
      try{
   await dispatch(getUserAccountInfo()).unwrap()
   await dispatch(getUserInfo()).unwrap()
    await dispatch(getBalance()).unwrap()
    } catch (error) {
      // handle error here
      if (error.data === "Unauthorized"){
        localStorage.removeItem('token')
        toast.error('Session expired, sign in again!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          onClose: () => ( window.location.href = 'http://localhost:3000/'), 
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          });
          console.log(error) 
       }
      }

    }
    fetchData()
    
  }, [dispatch])




  let data2 = userTransaction?.map(e => {
    return `${e.transaction.branch}`
    }
  )
  data2 = data2?.filter((e,i)=> data2.indexOf(e) === i)

  data2 = data2?.map(e => {
    return{
      id: e,
      label: e,
      value: 0
    }
  })

  let arrayAmount = userTransaction?.map(e => {
    return {
      name: e.transaction.branch,
      amount: e.transaction.amount,
      role: e.role
    }
  })

  for(let i = 0; i < data2?.length; i++){
    for(let j = 0; j < arrayAmount?.length;j++){
      if(data2[i].label === arrayAmount[j].name){
          if(arrayAmount[j].role !== "RECEIVER"){
          data2[i].value += arrayAmount[j].amount
        }
      }
      
    }
  }
  data2 = data2?.filter(e => e.value > 0)
  




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
            <LatestMovements  gap={2} justify="space-around">
                <Spacer x={4} />
                <GridLatestMovents xs={2}>Date</GridLatestMovents>
                <Spacer x={-5}/>
                <GridLatestMovents justify="center" xs={4}>Name</GridLatestMovents>
                <Spacer x={1}/>
                <GridLatestMovents xs={1}>Total</GridLatestMovents>
                <Spacer x={2} />
              </LatestMovements>     
            </DateNameTotal>
              <GridContainer style={{display:"flex" ,flexDirection:"column-reverse"}}>

              {userTransaction?.map((e, i) => 
              <LatestMovements key={i} gap={2} justify="space-around" style={{marginBottom:"10px"}}>
                <Spacer x={3} />
                <GridLatestMovents xs={2}>{` ${e.transaction.date.slice(0,10)} `} </GridLatestMovents>
                <Spacer x={-4}/>
                <GridLatestMovents justify="center" xs={4}>{` ${e.transaction.description} `} </GridLatestMovents>
                <Spacer x={1}/>
                <GridLatestMovents xs={1}>{e.role === 'RECEIVER' ? `+$${e.transaction.amount}` : `-$${e.transaction.amount}` } </GridLatestMovents>
                <Spacer x={2} />
              </LatestMovements>  
                  ) 
                }
              </GridContainer>
          </Expeses>
        </GridS>
        <GridS>
        <TextS>Statistics</TextS>
        {data2?.length > 0 ? 
        <ChartContainer >
        <Chart height="500px" data={data2}/>
      </ChartContainer>
      :
      <ChartContainer >
         <Text h2 style={{height:"500px"}}>
         <Chart height="500px" data={[{
           "id":"no movement ",
           "laber":"no movement ",
           "value":1
         }]}/>
         </Text>
      </ChartContainer>
        }
        
        </GridS>
    </ContainerS>
        <Spacer y={3}/>
  </div> 
    
  )
}
