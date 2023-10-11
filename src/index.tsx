import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { StyledEngineProvider } from "@mui/material/styles";
import Demo from "./Demo";
import { Frame } from "./Tracker";
import axios from "axios";
import { Header } from "./Header";

axios
  .get("https://mocki.io/v1/763dee31-7db9-44fd-8232-0560f4e937bc")
  .then((response) => {
    const serviceId = response.data.ServiceId;
    ReactDOM.createRoot(document.querySelector("#root")!).render(
      <React.StrictMode>
        <StyledEngineProvider injectFirst>
          <div className="boxy">
            {/* <Frame ServiceId={serviceId} />
            <Demo ServiceId={serviceId} /> */}
            <Header />
            <Frame />
            <Demo />
          </div>
        </StyledEngineProvider>
      </React.StrictMode>
    );
  })
  .catch((error) => {
    console.log(error);
  });
