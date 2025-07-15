import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import { UrlProvider } from "./hook/useUrlContext";
import "@avaya/neo-react/avaya-neo-react.css";
import avayaStyles from "@avaya/neo-react/avaya-neo-react.css?inline";
import { injectCSS } from "./helpers/injectStyles";
import styles from "./styles.css?inline";
// import { ApiProvider } from "./context/ApiContext";
import App from "./App";

import { MockApiProvider } from "./mocks/MockApiContext";
import { MockDataEventProvider } from "./mocks/MockDataEventProvider";

class WebComponentRedes extends HTMLElement {
  connectedCallback() {
    this.interactionId = this.getAttribute("interactionid");
    this.workRequestId = this.getAttribute("workrequestid");
    this.externalInteractionId = this.getAttribute("externalinteractionid");

    // Temporalmente comentado hasta que se tenga la API real
    // if (this.workRequestId == null) {
    //   this.api = window.WS.widgetAPI();
    // } else {
    //   this.api = window.WS.widgetAPI(this.interactionId);
    // }

    injectCSS(avayaStyles);
    injectCSS(styles);

    const mountPoint = document.createElement("div");
    mountPoint.ariaLabel = "global-redes";
    this.appendChild(mountPoint);

    this.reactRoot = createRoot(mountPoint);
    this.reactRoot.render(
      <StrictMode>
        {/* <UrlProvider>
          <ApiProvider api={this.api}> */}
            <MockApiProvider>
              <MockDataEventProvider>
                <App />
              </MockDataEventProvider>
            </MockApiProvider>
        {/* </ApiProvider>
        </UrlProvider> */}
      </StrictMode>
    );
  }

  disconnectedCallback() {
    if (this.reactRoot) {
      this.reactRoot.unmount();
    }
  }
}

customElements.define("sociales-widget", WebComponentRedes);
