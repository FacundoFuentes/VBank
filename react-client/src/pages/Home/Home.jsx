import { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import Chart from "../../components/Chart/Chart";
import img from "../../img/card-home.png";
import svg from "../../img/svg.png";

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
import piggy from "../../img/piggy.png";

import Shopping from "../../img/Shopping.png";

import { useMediaQuery } from "react-responsive";
import { CashCoin } from "@styled-icons/bootstrap/CashCoin";
import { PiggyBank } from "@styled-icons/fa-solid/PiggyBank";

import {Copy} from "@styled-icons/fa-solid/Copy"
import StringMask from "string-mask";

const StyledContainer = styled(Container)`
// background-color:red;


@media only screen and (max-width: 760px){
  // background-color:blue;
  flex-direction:column-reverse;

}


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
  justify-content: space-between;
  width: 30%;
  height: 100%;
  margin: 0;
  @media screen and (max-width: 750px){
      width:100%;
     
    }
  .statsContainer {
    
    display: flex;
    justify-content: start;
    .title {
      text-align: left;
      margin-bottom: 3em;
      margin-left: 6em;
    }
    width: 100%;
    margin-bottom: 5%;
  }
  .cardContainer {
    margin-top: 20%;
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 40%;
    width: 100%;
    border-right: 1px solid gainsboro;
    .cvu{
      width: 100%;
      cursor: pointer;
      margin: 20px 0;
      display: flex;
      justify-content: center;
      font-family: "roboto";
      font-weight: 600;
      width: 100%;
      
      span {
        margin-left: 10px;
        
      }
    }
    @media screen and (max-width: 750px){
      
      display: none;
    }
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
    @media only screen and (max-width: 760px){
  width: 100%;
  margin-top: 190px;
  justify-content: flex-start;
}

`;

const BalanceContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 30%;
  .img {
    position: absolute;
    top: 70%;
    @media only screen and (max-width: 750px){
     
      top: 80%;
 
    }
  }
  .title {
    width: 100%;
    text-align: left;
    margin-left: 3%;
  }
  .actions {
    height: 20%;
    display: flex;
    align-items: center;
    background-color: #95befe;
    justify-content: center;
    color: white;
    font-weight: 600;
    .action {
      display: inherit;
      align-items: center;
      margin: 3em;
      a{
        color:#fff;
      }
      span {
        margin: 1em;
      }
    }
        @media only screen and (max-width: 750px){
          padding-top 15px;
         padding-bottom: 20px;
      display: flex;
      justify-content: center;

 
    }
  }
  .balance {
    padding-top: 50px;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    height: 30%;
    display: flex;
    align-items: center;
    background-color: #95befe;
    justify-content: center;
    color: white;
    font-weight: 600;
    padding-bottom 15px;
    @media only screen and (max-width: 750px){
      padding-top: 80px;
      padding-bottom: 24px;

    }
  }

`;

const Statics = styled.div`
  width: 100%;
  height: 40%;
  cursor: pointer;
  border-radius: 20px;
  background-color: white;
  .title {
    width: 100%;
    text-align: center;
  }
`;

const LastMovements = styled.div`
  cursor: pointer;
  border-radius: 20px;
  height: 60%;
  display: flex;
  justify-content: end;
  flex-direction: column;
  align-items: center;
  font-family: "Roboto";
  overflow: hidden;
  margin: 3em 0;
  @media only screen and (max-width: 750px){
    margin-bottom: 50px;
    justify-content: start;    
  }

  .title {
    width: 100%;
    text-align: left;
    h4 {
      margin-left: 4%;
    }
      @media only screen and (max-width: 750px){
    margin-top: 50px;
  
  }
  }

  .movement {
    height: 15%;
    padding: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid RGB(237, 237, 237);
    img {
      width: 50px;
      border-radius: 5px;
      object-fit: contain;
      object-position: center;
    }
    .description {
      display: flex;
      flex-direction: column;
      justify-content: center;

      width: 70%;

      text-align: left;
      p {
        margin: 0;
        color: RGB(58, 93, 214);
      }
    }
    .amount {
      display: flex;
      flex-direction: column;
      justify-content: center;
      .RECEIVER {
        color: RGB(111, 208, 146);
      }
      span {
        font-weight: 600;
      }
      p {
        margin: 0;
        color: gray;
      }
      width: 10%;
      text-align: center;
    }
    @media only screen and (max-width: 750px){
       img{
        width: 35px;
       }
       font-size 15px;
       .description{
        width: 60%;
       }
       .amount{
        width: 20%;
       }

 
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

  const [transactions, setTransactions] = useState([]);

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
  userTransaction = userTransaction
    ?.slice(-5)
    .map((e) => e)
    .reverse();
  console.log(userTransaction?.map((e) => e).reverse());

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1100px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 960px)" });
  const isSmallMobile = useMediaQuery({ query: "(max-width: 650px)" });

  // let  = new StringMask("00.000"); // arreglar

  return (
    <StyledContainer
      fluid
      display="flex"
      justify="space-evenly"
      alignItems="center"
      wrap="nowrap"
      style={{ height: "100vh", width: "100%", margin: "0", padding:"0" }}

    >
      <Container1>
        <div className="cardContainer">
          <Card height="55%" width="60%" clickable cover>
            <Card.Header
              style={{
                position: "absolute",
                zIndex: 1,
                top: isMobile ? 90 : isTabletOrMobile ? 110 : 115,
              }}
            >
              {userInfo && userAccountInfo && (
                <Col>
                  <Text h4 color="white" margin="1em 0 0 0">
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
          <div className="cvu">
            <Copy width="20px"/>
            <span> CVU: 454655476745</span>
          </div>
        </div>
        <div className="statsContainer">
          <Statics>
            {data2?.length > 0 ? (
              <ChartContainer>
                <Chart
                  height={!isSmallMobile ? "50px" : "100%"}
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
                    height={!isSmallMobile ? "50px" : "100%"}
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
        </div>
      </Container1>
      <Container2>
        {userAccountInfo && (
          <BalanceContainer>
            <div className="balance">
              <img width={"50px"} src={gold} alt="" />
              <HeadLine>${`${userAccountInfo.balance}`}</HeadLine>
            </div>
            <div className="actions">
              <div className="action">
                <CashCoin fill="white" width="30px" />
                <Link to="/home/charge">
                <span>Charge</span>
                </Link>
              </div>
              |
              <div className="action">
                <PiggyBank fill="white" width="30px" />
                <Link to="/fixedTerm">
                <span>Inversions</span>
                </Link>
              </div>
            </div>
            <img src={svg} alt="" className="img" />
          </BalanceContainer>
        )}

        <LastMovements>
          <div className="title">
            <h4>Latest transactions</h4>
          </div>
          {userTransaction?.map((e, i) => {
            if (!e.transaction?.status || e.transaction?.status === "DONE") {
              return (
                <div className="movement">
                  <img src={Shopping} alt="" className="movementIcon" />
                  <div className="description">
                    <span>{e.transaction.description}</span>
                    <p>
                      {e.transaction.branch
                        ? e.transaction.branch
                        : e.transaction.type}
                    </p>
                  </div>
                  <div className="amount">
                    <span className={e.role}>
                      {e.role === "RECEIVER"
                        ? "+$" + e.transaction.amount
                        : "-$" + e.transaction.amount}
                    </span>
                    <p>{e.transaction.date.slice(5, 10)}</p>
                  </div>
                </div>
              );
            }
          })}
        </LastMovements>
      </Container2>
    </StyledContainer>
  );
}
