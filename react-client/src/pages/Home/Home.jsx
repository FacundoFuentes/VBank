import { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Chart from "../../components/Chart/Chart";
import img from "../../img/card-home.png";
import {
  Grid,
  Spacer,
  Text,
  Divider,
  Card,
  Col,
  Container
} from "@nextui-org/react";
import {
  getUserAccountInfo,
  getUserInfo,
  getBalance,
} from "../../redux/reducers/userSlice";
import { toast } from "react-toastify";
import gold from "../../img/oro.png";
import { useMediaQuery } from 'react-responsive'


const GridS = styled.div`
  margin: 5px 20px;
  display: flex;
  flex-wrap: wrap;
  width: 70%;
  height: 100%;
`;

const Balance = styled.div`
  border-radius: 20px;
  display: flex;
  width: 100%;
  height: 100%;
  padding:50px;
  justify-content: center;
  align-items: center;

  -webkit-box-shadow: -10px 0px 13px -7px #00000052,
    10px 0px 13px -7px #00000052, 5px 5px 15px 5px rgba(0, 0, 0, 0);
  box-shadow: -10px 0px 13px -7px #00000052, 10px 0px 13px -7px #00000052,
    5px 5px 15px 5px rgba(0, 0, 0, 0);
`;

const Expeses = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  width: 90%;
  height: 320px;
`;
const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  border-radius: 20px;
  justify-content: center;
  width: 90%;
`;


const DateNameTotal = styled.div`
  padding-top: 15px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 50px;
`;
const LatestMovements = styled(Grid.Container)`
  color: black;
  width: 100%;
  padding-bottom: 10px;
`;
const GridLatestMovents = styled(Grid)`
  border-radius: 10px;
`;
const GridContainer = styled.div`
  border-radius: 10px;
  height: 100%;
  width: 100%;
  overflow: auto;
  overflow-x: hidden;
`;
const BoderShadow = styled(GridS)`
  border: solid 0.5px #03030349;
  border-radius: 10px;
  display: flex;
  flex-direction: wrap;
  justify-content: center;
  align-items: center;
  width: 70%;
  -webkit-box-shadow: -10px 0px 13px -7px #00000052,
    10px 0px 13px -7px #00000052, 5px 5px 15px 5px rgba(0, 0, 0, 0);
  box-shadow: -10px 0px 13px -7px #00000052, 10px 0px 13px -7px #00000052,
    5px 5px 15px 5px rgba(0, 0, 0, 0);


    @media screen and (max-width: 1080px){
    width:90%;
    padding:0;
  }
`;







export default function Home() {
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const userInfo = useSelector((state) => state.user.userInfo.info);
  const userAccountInfo = useSelector(
    (state) => state.user.userAccountInfo.info
  );
  let userTransaction = useSelector((state) => state.user.userBalance.info);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    let body = document.getElementsByTagName("body")[0];
    if (body.style.overflow === "hidden") {
      body.style.overflow = "visible";
    }
  }, []);

  useEffect(() => {
    if (!loggedInUser) history.push("/");
  }, [loggedInUser, history]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getUserAccountInfo()).unwrap();
        await dispatch(getUserInfo()).unwrap();
        await dispatch(getBalance()).unwrap();
      } catch (error) {
        // handle error here
        if (error.data === "Unauthorized") {
          localStorage.removeItem("token");
          toast.error("Session expired, sign in again!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            onClose: () => (window.location.href = "http://localhost:3000/"),
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
          console.log(error);
        }
      }
    };
    fetchData();
  }, [dispatch]);

  let data2 = userTransaction?.map((e) => {
    return `${e.transaction.branch}`;
  });
  data2 = data2?.filter((e, i) => data2.indexOf(e) === i);

  data2 = data2?.map((e) => {
    return {
      id: e,
      label: e,
      value: 0,
    };
  });

  let arrayAmount = userTransaction?.map((e) => {
    return {
      name: e.transaction.branch,
      amount: e.transaction.amount,
      role: e.role,
      status: e.transaction.status,
    };
  });

  for (let i = 0; i < data2?.length; i++) {
    for (let j = 0; j < arrayAmount?.length; j++) {
      if (data2[i].label === arrayAmount[j].name) {
        if (arrayAmount[j].role !== "RECEIVER") {
          data2[i].value += arrayAmount[j].amount;
        }
      }
    }
  }

  data2 = data2?.filter((e) => e.value > 0);

  userTransaction = userTransaction?.map((e) => e).reverse();
  console.log(userTransaction?.map((e) => e).reverse());



  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1080px)' })


  return (
      <Container direction="column" display="flex" justify="space-evenly"  style={{marginLeft:!isTabletOrMobile ? "20%" : "30px"  }}  >
        <Grid width="100%"  justify="center">
          <Text width="300px" margin="20px" h2 weight={"bolder"}>
            My Card
          </Text>
        </Grid>

        <BoderShadow style={{ height: "auto", padding: "20px" }}>
          <Spacer y={0} />

            <Grid.Container wrap="nowrap" display="flex" justify="space-around" >
              
              <Grid >
                
                  <Card height="100%"  width="75%" cover>
                    <Card.Header
                      style={{ position: "absolute", zIndex: 1, top: 108 }}
                    >
                      {userInfo && userAccountInfo && (
                        <Col>
                          <Text h4 color="white">
                            {`**** **** **** ${userAccountInfo.card.cardNumber}`}
                          </Text>
                          <Text
                            size={12}
                            weight="bold"
                            transform="uppercase"
                            color="#ffffffAA"
                          >
                            {`${userInfo.firstname} ${userInfo.lastname}`}
                          </Text>
                        </Col>
                      )}
                    </Card.Header>
                    <Card.Image
                      autoResize={false}
                      src={img}
                      height="100%"
                      width="100%"
                      alt="Card image background"
                    />
                  </Card>
              </Grid>
              <Grid >
                {userAccountInfo && (
                  <Balance style={{marginRight:"20px"}}>
                    <img width={"50px"} src={gold} alt="" />
                    <Text h2 >${`${userAccountInfo.balance}`}</Text>
                  </Balance>
                )}
              </Grid>
            </Grid.Container>

           
        

          
        </BoderShadow>
         <Grid width="100%"  justify="center">
          <Text width="300px" margin="20px" h2 weight={"bolder"}>
          Latest movements
          </Text>
        </Grid>
        <BoderShadow style={{ height: "350px" }}>
          <Expeses>
            <DateNameTotal>
              <LatestMovements gap={2} justify="space-around">
                <Spacer x={0} />
                <GridLatestMovents xs={2}>Date</GridLatestMovents>
                <Spacer x={-5} />
                <GridLatestMovents justify="center" xs={4}>
                  Name
                </GridLatestMovents>
                <Spacer x={1} />
                <GridLatestMovents xs={1}>Total</GridLatestMovents>
                <Spacer x={2} />
              </LatestMovements>
            </DateNameTotal>
            <Divider x={0} y={1} />
            <GridContainer>
              {userTransaction?.map((e, i) => {
                if (
                  !e.transaction?.status ||
                  e.transaction?.status === "DONE"
                ) {
                  return (
                    <LatestMovements
                      key={i}
                      gap={2}
                      justify="space-around"
                      style={{ marginBottom: "10px" }}
                    >
                      <Spacer x={-1} />
                      <GridLatestMovents xs={2}>
                        {` ${e.transaction.date.slice(0, 10)} `}{" "}
                      </GridLatestMovents>
                      <Spacer x={-4} />
                      <GridLatestMovents justify="center" xs={4}>
                        {` ${e.transaction.description} `}{" "}
                      </GridLatestMovents>
                      <Spacer x={1} />
                      <GridLatestMovents xs={1}>
                        {e.role === "RECEIVER"
                          ? `+$${e.transaction.amount}`
                          : `-$${e.transaction.amount}`}{" "}
                      </GridLatestMovents>
                      <Spacer x={2} />
                      <Divider x={0} y={0} />
                    </LatestMovements>
                  );
                }
              })}
            </GridContainer>
          </Expeses>
        </BoderShadow>
        <Grid width="100%"  justify="center">
          <Text width="300px" margin="20px" h2 weight={"bolder"}>
          Statistics
          </Text>
        </Grid>
        <BoderShadow>
          {data2?.length > 0 ? (
            <ChartContainer>
              <Chart
                height="500px"
                data={data2}
                enableArcLinkLabels={true}
                label={true}
                interactive={true}
              />
            </ChartContainer>
          ) : (
            <ChartContainer>
              <Text h2 style={{ height: "500px" }}>
                <Chart
                  height="500px"
                  enableArcLinkLabels={false}
                  interactive={false}
                  label={false}
                  data={[
                    {
                      id: "No Movement ",
                      laber: "No Movement ",
                      value: 1,
                    },
                  ]}
                />
              </Text>
            </ChartContainer>
          )}
        </BoderShadow>
        <Spacer y={3} />
      </Container>
   
  );
}
