import "./App.css";
import image from "./img/bot.png";
import { useState } from "react";
import axios from 'axios';
import ScrollToBottom from 'react-scroll-to-bottom';


function App() {
  const [queryResponse, setQueryResponse] = useState([
    { query: "", response: "Welcome to the SL Bookings. How can I help you today?" }
  ]);
  const [userMessage, setUserMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [queries, setQueries] = useState([]);
  // const [selectedQuery, setSelectedQuery] = useState("");
  // const [loadingMessage, setLoadingMessage] = useState(false);

  const fetchResponseForQuery = async (query) => {
    let message;
    if (query) {
      message = {
        dbquery: query
      }
    } else {
      message = {
        query: userMessage
      }
    }
    // setLoadingMessage(true);
    setQueryResponse([...queryResponse, { query: (query ? query : userMessage), response: "......" }]);
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASEURL}/api/query/find-matching-response`, message);
      console.log(response.data);
      setQueryResponse([...queryResponse, { query: (query ? query : userMessage), response: response.data.response }]);
    } catch (err) {
      console.log(err);
      setErrorMessage(err.response.data.error);
      setQueryResponse([...queryResponse, { query: (query ? query : userMessage), response: "Error, Something went wrong...." }]);
    } finally {
      setUserMessage("");
      // setSelectedQuery("");
      setQueries([]);
      // setLoadingMessage(false);
    }
  }

  const handleChange = async (e) => {

    setUserMessage(e.target.value);
    setErrorMessage("");

    const queryString = { queryString: e.target.value }
    if (e.target.value && e.target.value !== " ") {
      try {
        const response = await axios.post(`${process.env.REACT_APP_BASEURL}/api/query/find-out-matching-queries`, queryString);
        console.log(response.data);
        setQueries(response.data);
      } catch (err) {
        console.log(err);
        setQueries([]);
      }
    }
  }

  return (
    <>
      <header className="header-area">
        <div className="container">
          <nav>
            <a href="#" className="nav-logo-link">
              <img src="" alt="" />
              SL_BOOKINGS
            </a>
            <ul>
              <li className="nav-item">
                <a href="#about" className="nav-link">About</a>
              </li>

              <li className="nav-item">
                <a href="#chat" className="nav-link">Chat</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <section className="hero-section">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-8">
              <h1 className="hero-title mb-4">
                Unveil Ancient Heritage
              </h1>
              <p className="hero-para pb-5">Embark on an extraordinary journey through the annals of time as you explore Sri Lanka's deeply entrenched heritage. Amidst the verdant landscapes and bustling cities, immerse yourself in the tales of centuries-old temples, the whispers of ancient ruins, and the vibrant pulse of cultural landmarks. Delve into the rich tapestry of history and traditions that have shaped the identity of this enchanting island nation.</p>

              <a href="#about" className="link-button">Get Started</a>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding" id="about">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-6">
              <div className="section-content-area pe-lg-5">
                <h3 className="section-heading mb-4">About Us</h3>

                <p className="section-para">
                  Welcome to SL Bookings, your trusted partner in exploring the wonders of Sri Lanka. Founded with a passion for travel and a deep love for our beautiful island, we are dedicated to offering unforgettable experiences tailored to meet the diverse interests and needs of our clients.
                </p>

                <p className="section-para">
                  Our mission is to provide personalized, high-quality tours that showcase the rich culture, breathtaking landscapes, and vibrant wildlife of Sri Lanka. Whether you are seeking adventure, relaxation, or cultural immersion, our expert team is here to guide you every step of the way.
                </p>

                <p className="section-para">
                  At SL Bookings, we believe in creating memories that last a lifetime. Our experienced and knowledgeable tour guides are committed to delivering exceptional service, ensuring that your journey with us is safe, enjoyable, and truly enriching.
                </p>

                <p className="section-para">
                  Why choose us? Because we understand that every traveler is unique. We offer customized tour packages that cater to your specific preferences, ensuring a seamless and memorable travel experience. Plus, with our 24/7 customer support, you can rest assured that we are always here to assist you.
                </p>
              </div>
            </div>

            <div className="col-12 col-lg-6">
              <div className="section-image-area">
                <img src="././bg2.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding chat-section" id="chat">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-6">
              <div className="section-content-area pe-lg-5">
                <h3 className="section-heading mb-4">AI Chatbot Assistance</h3>

                <h4 className="section-sub-heading mb-4">
                  Your Personal Travel Assistant: Meet Our AI Chatbot
                </h4>

                <p className="section-para">
                  Say hello to convenience and instant support with our AI Chatbot, designed to make your travel planning experience seamless and hassle-free. Whether you're seeking advice on tour packages, need assistance with booking details, or simply want to explore the best destinations in Sri Lanka, our friendly chatbot is here to help 24/7. Powered by cutting-edge artificial intelligence technology, our chatbot provides quick responses, personalized recommendations, and expert insights to ensure that every aspect of your journey is taken care of with ease. From answering frequently asked questions to assisting with real-time inquiries, our AI chatbot is your trusted companion every step of the way. Start a conversation now and let us elevate your travel experience to new heights.
                </p>

                <h4 className="section-sub-heading mt-5 mb-4">
                  Contact with us :
                </h4>

                <div className="contact-link-area mt-4">
                  <div className="contact-link">
                    <div className="contact-icon-area">
                      <i className="bi bi-envelope-fill"></i>
                    </div>
                    <a href="mailto:infoslbookings@gmail.com" className="mt-2">infoslbookings@gmail.com</a>
                  </div>

                  <div className="contact-link mt-4">
                    <div className="contact-icon-area">
                      <i class="bi bi-telephone-fill"></i>
                    </div>
                    <a href="tel:0770000000" className="mt-2">077 000 0000</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-6 mt-5 mt-lg-0">
              <div className="App">
                {errorMessage && (
                  <div className="alert alert-danger chat-error" role="alert">
                    {errorMessage}
                  </div>
                )}
                <div className="wrapper">
                  <div className="content">
                    <div className="header">
                      <div className="img">
                        <img src={image} alt="" />
                      </div>
                      <div className="right">
                        <div className="name">Chat Assistant</div>
                        <div className="status">Active</div>
                      </div>
                    </div>

                    <ScrollToBottom className="chat-body">
                      {queryResponse.length > 0 &&
                        queryResponse.map((qr, index) => {
                          return (
                            <div className="main" key={index}>
                              <div className="main_content">
                                <div className="messages">
                                  {qr.query && (
                                    <div className="human-message" id="message2">
                                      <p>{qr?.query}</p>
                                    </div>
                                  )}
                                  <div className="bot-message" id="message1">
                                    <p>{qr?.response}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </ScrollToBottom>

                    <div className="bottom">
                      <div className="btm">
                        <div className="input">
                          <input
                            type="text"
                            id="input"
                            placeholder="Enter your message"
                            value={userMessage}
                            onChange={handleChange}
                            onKeyPress={(e) => {
                              if (e.key === "Enter" && userMessage.trim() !== '') {
                                fetchResponseForQuery();
                              } else if (e.key === "Enter") {
                                e.preventDefault();
                              }
                            }}
                            autoFocus
                          />

                          {queries.length > 0 && userMessage && (
                            <div className="seach-dropdown-area">
                              {queries.map((query, index) => {
                                return (
                                  <div
                                    className="seach-dropdown-data"
                                    key={index}
                                    onClick={() => {
                                      // setSelectedQuery(query);
                                      setQueries([]);
                                      fetchResponseForQuery(query)
                                    }}
                                    >
                                    {query}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                        <div className="btn">
                          <button type="button"
                            onClick={() => fetchResponseForQuery()}
                            disabled={userMessage.trim() === ""}
                            className="send-button">
                            <i class="bi bi-send-fill"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer-section"></footer>

    </>
  );
}

export default App;
