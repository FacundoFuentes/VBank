import {data, user } from "./user"

import { useEffect } from "react";
import styled from "styled-components"
import{useSelector} from "react-redux"
import {useHistory} from "react-router-dom"
import Chart from "../../components/Chart/Chart";
import img from "../../img/card-home.png"
import { Grid, Spacer, Text} from "@nextui-org/react"
import Sidebar from "../../components/Sidebars/Sidebar";

const Container = styled.div`
  margin: 0px 300px;
  display:flex;
  flex-direction: column;
  width: 100%;
  justify-content:center;
  `;
const TextS = styled.h2`
  font-weight: bold;
  justify-content: flex-start;
  margin-left: 55px;
  margin-right: 250px;
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
  background-color: #dddbdb;
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
  width:500px;
  height:50px;
  top:240px;
  left:400px;
`;
const CardName = styled.h5`
  color:#F6F6F6;
  position: absolute;
  width:500px;
  height:50px;
  top:270px;
  left:400px;
`;
const DateNameTotal = styled.div`
  padding-top: 15px;
  display:flex;
  position:relative;
  justify-content:space-around;
  width: 100%;
  height:50px;
`;
const LatestMovements = styled(Container)`
  display:flex;
  padding-left:30px;
  margin:20px;
  color:black;
  padding:20px;
  width:97%;
  height:500px;
  overflow-y:auto;
  padding-top: 70px;
  
  
`;
const GridLatestMovents = styled(Grid)`
  display:flex;
  background-color: #d6d1d182;
  border-radius:10px;
  height: 50px;
  justify-content:center;
`;


export default function Home() {
  const loggedInUser = useSelector(state => state.user.loggedInUser)
  
  const history= useHistory();

/*   useEffect(() => {
   if(!loggedInUser) history.push("/")

  }, [loggedInUser]);
   */

  return (
    <div>
    <Sidebar/>
    <Container>
        <GridS>
        <TextS>My Card</TextS>
        <TextS>Found</TextS>
        </GridS>  
        <GridS>
            <CardBalance>
            <img height="200px" src={img} alt="" />
            <CardNnumber>
            {`${user.cardNumber}`}
            </CardNnumber>
           <CardName>
           {`${user.name} ${user.lastName}`}
           </CardName>
            <Line/>
            <Balance>
                <h1>${`${user.found}`}</h1>
            </Balance>
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
              <LatestMovements>
              {user.latestMovements.map((e, i) => 
                <Grid.Container key={i} gap={1}  >
                  <Spacer x={5.5}/>
                  <GridLatestMovents xs={1} ><Text h4>{`${e.date}` }</Text> </GridLatestMovents>
                  <Spacer x={1}/>
                  <GridLatestMovents xs={7.1} ><Text h4>{`${e.name}` }</Text> </GridLatestMovents>
                  <Spacer x={1}/>
                  <GridLatestMovents xs={1} ><Text h4>{`-$${e.found}`}</Text> </GridLatestMovents>
                    <Spacer x={3} y={3}/>
                </Grid.Container> 
              ) 
              }
              </LatestMovements>
              
          </Expeses>
        </GridS>
        <GridS>
        <TextS>statistics</TextS>
        <ChartContainer >
          <Chart height="500px" data={data}/>
        </ChartContainer>
        </GridS>
        
    </Container>
    </div>
    
  )
}
