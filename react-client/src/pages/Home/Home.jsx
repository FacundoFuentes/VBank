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
import { useMediaQuery } from "react-responsive";
import {ArrowUp} from "@styled-icons/bootstrap/ArrowUp";
import {ArrowDown} from "@styled-icons/bootstrap/ArrowDown";
import StringMask from "string-mask"

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
  width: 50%;
  height: 100%;
  justify-content: space-around;
  align-items: center;
  background-color: white;
  margin: 0;

  img {
    height: 100px;
  }
`;
const Container2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
  margin: 0;
`;

const BalanceContainer = styled.div`
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  display: flex;
  /* background-color:RGB(149, 190 , 254) ; */
  flex-direction: column;
  height: 100%;
  svg {
    position: absolute;
    top: 150px;
  }
  .balance {
    background-color: RGB(149, 190 , 254);
    height: 60%;
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
`;

const LastMovements = styled.div`
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Roboto";
  
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
  
  let formatter = new StringMask('000.000');

  return (
    <Container
    fluid
    display="flex"
    justify="space-between"
    alignItems="center"
    wrap="nowrap"
    style={{ height: "100vh", width: "100%", margin: "0" }}
    >
      <Container1>
        <Card height="20%" width="35%"  clickable cover >
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
              <HeadLine>${`${formatter.apply(userAccountInfo.balance)}`}</HeadLine>
            </div>
            <svg
              width="100%"
              height="100%"
              id="svg"
              viewBox="0 0 1440 400"
              xmlns="http://www.w3.org/2000/svg"
              class="transition duration-300 ease-in-out delay-150"
              >
              <path
                d="M 0,400 C 0,400 0,133 0,133 C 56.8450704225352,131.11885949845413 113.6901408450704,129.23771899690828 177,134 C 240.3098591549296,138.76228100309172 310.0845070422535,150.16798351082105 391,141 C 471.9154929577465,131.83201648917895 563.9718309859155,102.09034695980762 638,102 C 712.0281690140845,101.90965304019238 768.0281690140847,131.47062864994845 822,146 C 875.9718309859153,160.52937135005155 927.9154929577464,160.0271384403985 990,149 C 1052.0845070422536,137.9728615596015 1124.3098591549294,116.42081758845758 1201,112 C 1277.6901408450706,107.57918241154242 1358.8450704225352,120.28959120577122 1440,133 C 1440,133 1440,400 1440,400 Z"
                stroke="none"
                stroke-width="0"
                fill="#95befe88"
                class="transition-all duration-300 ease-in-out delay-150 path-0"
                transform="rotate(-180 720 200)"
                ></path>
              <path
                d="M 0,400 C 0,400 0,266 0,266 C 77.53280659567159,247.5774647887324 155.06561319134318,229.1549295774648 221,236 C 286.9343868086568,242.8450704225352 341.27035383029886,274.9577464788732 415,288 C 488.72964616970114,301.0422535211268 581.8529714874613,295.01408450704224 652,284 C 722.1470285125387,272.98591549295776 769.3177602198557,256.98591549295776 820,263 C 870.6822397801443,269.01408450704224 924.8759876331158,297.0422535211268 997,305 C 1069.1240123668842,312.9577464788732 1159.178289247681,300.84507042253523 1236,291 C 1312.821710752319,281.15492957746477 1376.4108553761594,273.5774647887324 1440,266 C 1440,266 1440,400 1440,400 Z"
                stroke="none"
                stroke-width="0"
                fill="#95befeff"
                class="transition-all duration-300 ease-in-out delay-150 path-1"
                transform="rotate(-180 720 200)"
              ></path>
            </svg>
          </BalanceContainer>
        )}
        <LastMovements>
        <div className="title">
          <h3>Last Movements</h3>
          
        </div>
 
          <Expeses>
            <DateNameTotal>
              <LatestMovements gap={2} justify="space-around">
                <Spacer x={0} />
                <GridLatestMovents xs={2}>Date</GridLatestMovents>
                <Spacer x={-5} />
                {!isSmallMobile && (
                  <GridLatestMovents justify="center" xs={4}>
                    Name
                  </GridLatestMovents>
                )}

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
                      {!isSmallMobile && (
                        <GridLatestMovents justify="center" xs={4}>
                          {` ${e.transaction.description} `}{" "}
                        </GridLatestMovents>
                      )}

                      <Spacer x={1} />
                      <GridLatestMovents xs={1}>
                        {e.role === "RECEIVER"
                          ? `+$${e.transaction.amount}`
                          : `$${e.transaction.amount}`}{" "}
                      </GridLatestMovents>
                      <Spacer x={2} />
                      <Divider x={0} y={0} />
                    </LatestMovements>
                  );
                }
              })}
            </GridContainer>
          </Expeses>
        </LastMovements>
      </Container2>
    </Container>
  );
}
