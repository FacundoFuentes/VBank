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
  Container,
} from "@nextui-org/react";
import {
  getUserAccountInfo,
  getUserInfo,
  getBalance,
} from "../../redux/reducers/userSlice";
import { toast } from "react-toastify";
import gold from "../../img/oro.png";
import Shopping from "../../img/Shopping.png";

import { useMediaQuery } from "react-responsive";
import { ArrowUp } from "@styled-icons/bootstrap/ArrowUp";
import { ArrowDown } from "@styled-icons/bootstrap/ArrowDown";
import StringMask from "string-mask";

const ArrowRed = styled(ArrowUp)`
  color: red;
`;
const ArrowGreen = styled(ArrowDown)`
  color: green;
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

const HeadLine = styled.h2`
  font-family: "Roboto";
  margin: 0;
  font-weight: 300;
`;

const Container1 = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  height: 100%;
  justify-content: space-around;
  align-items: center;
  background-color: RGB(238, 238 , 236);
  margin: 0;

  .cardContainer{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50%;
    width: 100%;
  }

  img {
    height: 100px;
  }
`;
const Container2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  height: 100%;
`;

const BalanceContainer = styled.div`
  margin-top: 10%;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  display: flex;
  background-color:RGB(44, 161 , 222) ;
  flex-direction: column;
  height: 40%;

  .balance {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }
`;

const Statics = styled.div`
  width: 80%;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 20px;
  background-color: white;
`;

const LastMovements = styled.div`
  margin-top: 50px;
  border-radius: 20px;
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Roboto";
  overflow: scroll;

  .movement{
    padding: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid gainsboro;
    img{
      width: 80px;
      border-radius: 20px;
      object-fit: contain;
      object-position: center;
    }
    .description{
      text-align: center
    }
    .amount{
      span{
        font-weight: 600;
      }
      p {
        color: gray;
      }
      width: 10%;
      text-align: center;
    }
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

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1100px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 960px)" });
  const isSmallMobile = useMediaQuery({ query: "(max-width: 650px)" });

  let formatter = new StringMask("00.000"); // arreglar
  let formatter2 = new StringMask("#.###,00", { reverse: true });

  return (
    <Container
      fluid
      display="flex"
      justify="space-evenly"
      alignItems="center"
      wrap="nowrap"
      
      style={{ height: "100vh", width: "100%", margin: "0"}}
    >
      <Container1>
        <div className="cardContainer">
          <Card height="45%" width="50%" clickable cover>
            <Card.Header
              style={{
                position: "absolute",
                zIndex: 1,
                top: isMobile ? 90 : isTabletOrMobile ? 110 : 115,
              }}
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
        </div>
        <Statics>
          {data2?.length > 0 ? (
            <ChartContainer>
              <Chart
                height={!isSmallMobile ? "50px" : "500px"}
                data={data2}
                enableArcLinkLabels={true}
                label={true}
                interactive={true}
              />
            </ChartContainer>
          ) : (
            <ChartContainer>
              <Text h2>
                <Chart
                  height={!isSmallMobile ? "50px" : "500px"}
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
        </Statics>
      </Container1>
      <Container2>
        {userAccountInfo && (
          <BalanceContainer>
            <div className="balance">
              <img width={"50px"} src={gold} alt="" />
              <HeadLine>
                ${`${formatter.apply(userAccountInfo.balance)}`}
              </HeadLine>
            </div>
          </BalanceContainer>
        )}

        <LastMovements>
        {userTransaction?.map((e, i) => {
          if (!e.transaction?.status || e.transaction?.status === "DONE") {
            return (
                <div className="movement">
                  <img src={gold} alt="" className="movementIcon" />
                  <div className="description">
                    <span>{e.transaction.description}</span>
                    <p>{e.transaction.branch}</p>
                  </div>
                  <div className="amount">
                    <span>${e.transaction.amount}</span>
                    <p>{e.transaction.date.slice(5,10)}</p>
                  </div>
                </div>
            );
          }
        })}
        </LastMovements>
      </Container2>
    </Container>
  );
}
