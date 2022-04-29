import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './modules';
import { CometChat } from "@cometchat-pro/chat"
import { COMETCHAT_CONSTANTS } from './consts';

let appID: string = COMETCHAT_CONSTANTS.APP_ID,
    region: string = COMETCHAT_CONSTANTS.REGION,
    appSetting: CometChat.AppSettings = new CometChat.AppSettingsBuilder()
			.subscribePresenceForAllUsers()
			.setRegion(region)
			.autoEstablishSocketConnection(true)
			.build();
CometChat.init(appID, appSetting).then(
  (initialized: boolean) => {
    console.log("Initialization completed successfully", initialized);
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
}, (error: CometChat.CometChatException) => {
  console.log("Initialization failed with error:", error);
}
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
