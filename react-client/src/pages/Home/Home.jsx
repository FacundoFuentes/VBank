
import styled from "styled-components"
import img from "../../img/card-home.png"

const Container = styled.div`
  margin: 50px 300px;
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



export default function Home() {
  

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
        
        
    </Container>
     
    
  )
}
