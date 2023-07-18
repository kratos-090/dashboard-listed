import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "../css/Dashboard.module.css";
import "../css/global.css";
import { useNavigate } from "react-router-dom";
import dashboardIcon from "../assets/icons/dashboard-icon.svg";
import transactionsIcon from "../assets/icons/transactions-icon.svg";
import scheduleIcon from "../assets/icons/schedule-icon.svg";
import userIcon from "../assets/icons/user-icon.svg";
import settingIcon from "../assets/icons/setting-icon.svg";
import bellIcon from "../assets/icons/bell-icon.svg";
import profileIcon from "../assets/icons/profile-image.png";
import revenuesIcon from "../assets/icons/revenue-icon.svg";
import transactionIcon from "../assets/icons/transaction-icon.svg";
import likeIcon from "../assets/icons/likes-icon.svg";
import usersIcon from "../assets/icons/users-icon.svg";
import Chart from "react-apexcharts";
import { useAuth0 } from "@auth0/auth0-react";
import { LoadingSpinner } from "./LoadingSpinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Dashboard = ({ LogOutLocalAuthentication }) => {
  const navigate = useNavigate();
  const [dashboardLoadingSpinner, setdashboardLoadingSpinner] = useState(false);
  const [dashboardHideEverything, setdashboardHideEverything] = useState(true);
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      toast.success("Successfully logged in!", { autoClose: 1500 });
      sessionStorage.removeItem("isLoggedIn");
    }
  }, []);

  // make the axios call to the API and store the response in state
  const [users, setUsers] = useState([]);
  const [guest, setGuest] = useState([]);
  const [User, setUser] = useState([]);
  const [axiosLoading, setAxiosLoading] = useState(true);

  useEffect(() => {
    setAxiosLoading(true); // set loading state to true before making the Axios call
    axios
      .get("https://randomuser.me/api/?results=500")
      .then((response) => {
        setUsers(response.data.results);
        setAxiosLoading(false); // set loading state to false after the Axios call is completed
      })
      .catch((error) => {
        console.log(error);
        setAxiosLoading(false); // set loading state to false after the Axios call is completed, even if it failed
      });
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      const ageArray = [];
      const numberArray = [];
      for (let i = 0; i < 4; i++) {
        ageArray.push(users[i].dob.age);
        numberArray.push(users[i].registered.age + 30);
      }
      setGuest(ageArray);
      console.log("Age Array:", ageArray);
      setUser(numberArray);
      console.log("Number Array:", numberArray);
    }
  }, [users]);

  // render the loading state if the isLoading variable is true
  if (axiosLoading) {
    return <LoadingSpinner />;
  }

  const { user, isAuthenticated, isLoading } = useAuth0();
  const location = useLocation();
  const { logout } = useAuth0();
  if (isLoading) {
    return <LoadingSpinner />;
  }

  const LogOut = () => {
    let isLoggedOut = false;
    setdashboardHideEverything(false);
    setdashboardLoadingSpinner(true);
    sessionStorage.setItem("isLoggedOut", "true");

    setTimeout(() => {
      if (isAuthenticated) {
        logout({
          logoutParams: { returnTo: window.location.origin },
        });
      } else {
        setTimeout(() => {
          isLoggedOut = true;
          LogOutLocalAuthentication();
          navigate("/");
          setTimeout(() => {
            if (isLoggedOut) {
              setdashboardLoadingSpinner(false);
              setdashboardHideEverything(true);
            }
          }, 3000);
        }, 3000);
      }
    }, 3000);
  };

  return (
    <>
      {dashboardLoadingSpinner && <LoadingSpinner />}
      {dashboardHideEverything && (
        <>
          <div className={styles.mainContainer}>
            <div className={styles.dashboardContainer}>
              <div className={styles.leftDashboard}>
                <ul className={styles.navItems}>
                  <div
                    className={`${styles.companyName} ${styles.marginBottom}`}>
                    Board.
                  </div>
                  <div className={styles.iconItemCenter}>
                    <img
                      className={styles.navIcon}
                      alt=""
                      src={dashboardIcon}
                    />
                    <Link
                      to="/dashboard"
                      className={`${styles.Item} ${styles.itemMarginBottom} ${
                        location.pathname === "/dashboard" ? styles.active : ""
                      }`}>
                      Dashboard
                    </Link>
                  </div>
                  <div className={styles.iconItemCenter}>
                    <img
                      className={styles.navIcon}
                      alt=""
                      src={transactionsIcon}
                    />
                    <Link
                      to="/transaction"
                      className={`${styles.Item} ${styles.itemMarginBottom} ${
                        location.pathname === "/transaction"
                          ? styles.active
                          : ""
                      }`}>
                      Transactions
                    </Link>
                  </div>
                  <div className={styles.iconItemCenter}>
                    <img
                      className={styles.navIcon}
                      alt=""
                      src={scheduleIcon}
                    />
                    <Link
                      to="/schedule"
                      className={`${styles.Item} ${styles.itemMarginBottom} ${
                        location.pathname === "/schedule" ? styles.active : ""
                      }`}>
                      Schedules
                    </Link>
                  </div>
                  <div className={styles.iconItemCenter}>
                    <img
                      className={styles.navIcon}
                      alt=""
                      src={userIcon}
                    />
                    <Link
                      to="/user"
                      className={`${styles.Item} ${styles.itemMarginBottom} ${
                        location.pathname === "/user" ? styles.active : ""
                      }`}>
                      Users
                    </Link>
                  </div>
                  <div className={styles.iconItemCenter}>
                    <img
                      className={styles.navIcon}
                      alt=""
                      src={settingIcon}
                    />
                    <Link
                      to="/setting"
                      className={`${styles.Item} ${styles.itemMarginBottom} ${
                        location.pathname === "/setting" ? styles.active : ""
                      }`}>
                      Settings
                    </Link>
                  </div>
                </ul>
                <div className={styles.footer}>
                  <Link
                    to="/help"
                    className={`${styles.footerItem} ${
                      location.pathname === "/help" ? styles.active : ""
                    }`}>
                    Help
                  </Link>
                  <Link
                    to="/contactus"
                    className={`${styles.footerItem} ${
                      location.pathname === "/contactus" ? styles.active : ""
                    }`}>
                    Contact Us
                  </Link>
                  <Link
                    to="/anything"
                    className={`${styles.footerItem} ${
                      location.pathname === "/anything" ? styles.active : ""
                    }`}>
                    Page Not Found
                  </Link>
                  <div
                    className={`${styles.footerItem}`}
                    onClick={() => LogOut()}>
                    Log Out
                  </div>
                </div>
              </div>
              <div className={styles.rightDashboard}>
                <div className={styles.detailsContainer}>
                  <div className={styles.headerDashboard}>
                    <div>
                      <b className={styles.dashboardHeading}>Dashboard</b>
                    </div>

                    <div className={styles.centerHeaderItem}>
                      <input
                        className={styles.searchBar}
                        type="text"
                        placeholder="Search..."
                      />

                      <img
                        className={styles.bellIcon}
                        alt="bell icon"
                        src={bellIcon}
                      />

                      {isAuthenticated ? (
                        <img
                          className={styles.profileIcon}
                          src={user.picture}
                          alt="profile icon"
                        />
                      ) : (
                        <img
                          className={styles.profileIcon}
                          src={profileIcon}
                          alt="profile icon"
                        />
                      )}
                    </div>
                  </div>
                  <div className={styles.userDataCards}>
                    <div
                      className={`${styles.cardData} ${styles.revenueCardColor}`}>
                      <div className={styles.alignRight}>
                        <img
                          src={revenuesIcon}
                          alt="revenues Icon"
                          className={styles.revenuesIcon}
                        />
                      </div>
                      <p className={styles.cardTitle}>Total Revenues</p>
                      {users.length > 0 && (
                        <p
                          className={`${styles.cardAmount} ${styles.whiteSpace}`}>
                          $ {users[0]?.location.postcode}
                        </p>
                      )}
                    </div>

                    <div
                      className={`${styles.cardData} ${styles.transactionsCardColor}`}>
                      <div className={styles.alignRight}>
                        <img
                          src={transactionIcon}
                          alt="transaction Icon"
                          className={styles.revenuesIcon}
                        />
                      </div>

                      <p className={styles.cardTitle}>Total Transactions</p>
                      <p className={styles.cardAmount}>
                        {users[0]?.location.street.number}
                      </p>
                    </div>

                    <div
                      className={`${styles.cardData} ${styles.likesCardColor}`}>
                      <div className={styles.alignRight}>
                        <img
                          src={likeIcon}
                          alt="like Icon"
                          className={styles.revenuesIcon}
                        />
                      </div>
                      <p className={styles.cardTitle}>Total Likes</p>
                      <p className={styles.cardAmount}>{users[0]?.dob.age}</p>
                    </div>

                    <div
                      className={`${styles.cardData} ${styles.usersCardColor}`}>
                      <div className={styles.alignRight}>
                        <img
                          src={usersIcon}
                          alt="users Icon"
                          className={styles.revenuesIcon}
                        />
                      </div>
                      <p className={styles.cardTitle}>Total Users</p>
                      <p className={styles.cardAmount}>
                        {users[0]?.registered.age}
                      </p>
                    </div>
                  </div>

                  {/* Chart */}
                  <div className={styles.chart}>
                    <div className={styles.alignHeading}>
                      <b className={styles.graphHeading}>Activities</b>
                      <input
                        className={styles.dateInput}
                        type="date"
                        name=""
                        id=""
                      />
                    </div>

                    <Chart
                      options={{
                        chart: {
                          id: "basic-bar",
                          toolbar: {
                            show: false,
                          },
                        },
                        colors: ["#E9A0A0", "#9BDD7C"],
                        stroke: {
                          curve: "smooth",
                          width: 3,
                        },
                        xaxis: {
                          categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
                        },
                      }}
                      series={[
                        {
                          name: "Guest",
                          data: guest,
                        },
                        {
                          name: "User",
                          data: User,
                        },
                      ]}
                      type="line"
                      height="300"
                    />
                  </div>

                  {/* Pie Chart */}
                  <div className={styles.pieChartContainer}>
                    <div className={styles.alignPieChartCards}>
                      <div className={styles.pieChartCard}>
                        <div className={styles.pieChartCardItem}>
                          <b className={styles.pieChartHeading}>Top products</b>
                          <input
                            className={styles.dateInput}
                            type="date"
                            name=""
                            id=""
                          />
                        </div>
                        <div className={styles.pieChartCenter}>
                          <Chart
                            options={{
                              chart: {
                                width: 380,
                                type: "pie",
                              },
                              colors: [
                                "#98D89E",
                                "#F6DC7D",
                                "#EE8484",
                                "#bbc1f1",
                              ],
                              labels: [
                                "Basic Tees",
                                "Custom Short Pants",
                                "Super Hoodies",
                                "Shirt",
                              ],
                              responsive: [
                                {
                                  breakpoint: 1200, // tablet screen size
                                  options: {
                                    chart: {
                                      width: 350,
                                    },
                                    legend: {
                                      position: "right",
                                    },
                                  },
                                },
                                {
                                  breakpoint: 760, // tablet screen size
                                  options: {
                                    chart: {
                                      width: 300,
                                    },
                                    legend: {
                                      position: "right",
                                    },
                                  },
                                },
                                {
                                  breakpoint: 480, // mobile screen size
                                  options: {
                                    chart: {
                                      width: 300,
                                    },
                                    legend: {
                                      position: "bottom",
                                    },
                                  },
                                },
                                {
                                  breakpoint: 325, // mobile screen size
                                  options: {
                                    chart: {
                                      width: 280,
                                    },
                                    legend: {
                                      position: "bottom",
                                    },
                                  },
                                },
                              ],
                            }}
                            series={guest}
                            type="pie"
                            width={380}
                          />
                        </div>
                      </div>
                      <div className={styles.pieChartCard}>
                        <div className={styles.pieChartCardItem}>
                          <b className={styles.pieChartHeading}>
                            Today’s schedule
                          </b>
                          <p className={styles.dateInput}>See All</p>
                        </div>
                        <div className={styles.scheduleCenter}>
                          <div className={styles.meetingColor}>
                            <div className={styles.meetingCard}>
                              <p className={styles.scheduleHeading}>
                                Call With Client
                              </p>
                              <p className={styles.scheduleTime}>11.00-12.00</p>
                              <p className={styles.scheduleLocation}>
                                Up-n-Up Jaipur
                              </p>
                            </div>
                          </div>
                          <div>
                            <div className={styles.operationColor}>
                              <div className={styles.meetingCard}>
                                <p className={styles.scheduleHeading}>
                                  Discuss Requirement for Codex
                                </p>
                                <p className={styles.scheduleTime}>
                                  15.00-16.00
                                </p>
                                <p className={styles.scheduleLocation}>
                                  in meeting room
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer />
        </>
      )}
    </>
  );
};

export { Dashboard };
