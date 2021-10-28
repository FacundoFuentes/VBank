
import { useState } from "react";
import styled from "styled-components"
import Chart from "../../components/Chart/Chart";
import img from "../../img/card-home.png"

const Container = styled.div`
  margin: 0px 300px;
  display:flex;
  flex-direction: column;
  width: 100%;
  justify-content:center;
  `;
const Text = styled.h2`
  font-weight: bold;
  justify-content: flex-start;
  margin-left: 55px;
  margin-right: 250px;
  margin-bottom:0px;
`;
const Grid = styled.div`
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
  border-radius:20px;
  background-color: #F6F6F6;
  width: 90%;
  height: 400px;
`;
const ChartContainer = styled.div`
  display:flex;
  margin-top:20px;
  background-color:#F6F6F6;
  border-radius:20px;
  justify-content:center;
  width:90%;
  

`;



export default function Home() {
  const [data] = useState([
    {
      "id": "Viajes",
      "label": "Viajes",
      "value": 150,
      "color": "hsl(173, 70%, 50%)"
    },
    {
      "id": "Delivery",
      "label": "Delivery",
      "value": 1000,
      "color": "hsl(36, 70%, 50%)"
    },
    {
      "id": "Ropa",
      "label": "Ropa",
      "value": 500,
      "color": "hsl(130, 70%, 50%)"
    },
    {
      "id": "Comida",
      "label": "Comida",
      "value": 200,
      "color": "hsl(327, 70%, 50%)"
    },
    {
      "id": "Otros",
      "label": "Otros",
      "value": 100,
      "color": "hsl(250, 70%, 50%)"
    }
  ])

  return (
    <Container>
        <Grid>
        <Text>Mi tarjeta</Text>
        <Text>saldo</Text>
        </Grid>  
        <Grid>
            <CardBalance>
            <img height="200px" src={img} alt="" />
            <Line/>
            <Balance>
                <h1>$500,00</h1>
            </Balance>
            </CardBalance>
        </Grid>
        <Grid>
           <Text>Consumos</Text>
          <Expeses>

          </Expeses>
        </Grid>
        <Grid>
        <Text>Estadisticas</Text>
        <ChartContainer >
          <Chart height="500px" data={data}/>
        </ChartContainer>
        </Grid>
          
          
        
        
    </Container>
     
    
  )
}
