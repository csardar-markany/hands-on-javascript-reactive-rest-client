import { useState, useEffect } from "react";

import { fetchEventSource } from "@microsoft/fetch-event-source";

const apiURL =
  "http://127.0.0.1:80/hello-spring-web-flux/hello-web-flux-annotation?number=15";

const App = () => {

  const [evenData, setEvenData] = useState([]);

  useEffect(() => {
  }, [evenData]);

  const onClick = () => {
    callUsingFetchEventSource(evenData, setEvenData);
  }

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <header className="App-header">Hello Chitta</header>
      <br></br>
      <button onClick={onClick}>Call API</button>
      <br></br>
      <h2 className="mb-4">Received Responses</h2>
      {evenData.map((item) => {
        return (
          <li className="card p-3 mb-2" key={item.timeStamp}>
            {JSON.stringify(item)}
          </li>
        );
      })}
    </div>
  );
}

const callUsingFetchEventSource = async (evenData, setEvenData) => {
  await fetchEventSource(apiURL, {
    headers: {
      Authorization: "Bearer my_token",
    },
    onmessage(event) {
      const data = event.data;
      console.log(`Received Event Data = ${data}, size = ${evenData.length}`);
      evenData.push(JSON.parse(data));
      setEvenData([...evenData]);
    },
  });
};

/** This is also working
 * 
 const callUsingEventSource = () => {
  const eventsource = new EventSource(apiURL);

  eventsource.onmessage = function (event) {
    var json = JSON.parse(event.data);
    console.info("onmessage() - json = " + JSON.stringify(json));
  };

  eventsource.onerror = function (error) {
    console.info("onerror() - error = " + error);
    eventsource.close();
  };
};
 */

export default App;
