import React, { useRef } from "react";
import { WebView } from "react-native-webview";
import queryString from "query-string";
import { LinkErrorCode, LinkErrorType, LinkExitMetadataStatus } from './const';

export default function TestPlaid({ linkToken, onEvent, onExit, onSuccess }) {
  console.log(linkToken, 'linkToken111');
  let webviewRef = useRef();

  const handleNavigationStateChange = (event) => {
    console.log(event, 'eventInTest');
    console.log(event.url, 'eventURL123t');
    if (event.url.startsWith("plaidlink://")) {
      console.log('iamhere');
      const eventParams = queryString.parse(event.url.replace(/.*\?/, ""));
      console.log(eventParams, 'eventParams123');
      const linkSessionId = eventParams.link_session_id;
      const mfaType = eventParams.mfa_type;
      const requestId = eventParams.request_id;
      const viewName = eventParams.view_name;
      const errorCode = eventParams.error_code;
      const errorMessage = eventParams.error_message;
      const errorType = eventParams.error_type;
      const exitStatus = eventParams.exist_status;
      const institutionId = eventParams.institution_id;
      const institutionName = eventParams.institution_name;
      const institutionSearchQuery = eventParams.institution_search_query;
      const timestamp = eventParams.timestamp;

      if (event.url.startsWith("plaidlink://event") && onEvent) {
        onEvent({
          eventName: eventParams.event_name,
          metadata: {
            linkSessionId,
            mfaType,
            requestId,
            viewName,
            errorCode,
            errorMessage,
            errorType,
            exitStatus,
            institutionId,
            institutionName,
            institutionSearchQuery,
            timestamp,
          },
        });
      } else if (event.url.startsWith("plaidlink://exit") && onExit) {
        onExit({
          error: {
            errorCode: LinkErrorCode[errorCode],
            errorMessage: eventParams.error_message,
            errorType: LinkErrorType[errorType],
          },
          metadata: {
            status: LinkExitMetadataStatus[exitStatus],
            institution: {
              id: institutionId,
              name: institutionName,
            },
            linkSessionId,
            requestId,
          },
        });
      } else if (event.url.startsWith("plaidlink://connected") && onSuccess) {
        const publicToken = eventParams.public_token;
        const accounts = JSON.parse(eventParams.accounts);
        onSuccess({
          publicToken,
          metadata: {
            institution: {
              id: institutionId,
              name: institutionName,
            },
            accounts,
            linkSessionId,
          },
        });
      }
      console.log('falsing');
      return false;
    }
    console.log('truing');
    return true;
  };

  return (
    <WebView
      source={{
        uri: `https://cdn.plaid.com/link/v2/stable/link.html?isWebview=true&token=${linkToken}`,
      }}
      ref={(ref) => (webviewRef = ref)}
      onError={() => webviewRef.reload()}
      originWhitelist={["https://*", "plaidlink://*"]}
      onShouldStartLoadWithRequest={handleNavigationStateChange}
      style={{ borderWidth: 0, borderColor: 'grey', height: 500 }}
    />
  );
}
