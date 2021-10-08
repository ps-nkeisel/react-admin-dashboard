import React from "react";
import { withRouter } from "next/router";
import { connect } from "react-redux";

import Loader from "@/components/Loader";
import AuthProtectedPage from "@/HOC/withAuthProtection";
import AsideLayout from "@/layouts/AsideLayout";
import RealtimeScene from "@/scenes/Realtime";
import RealtimeHeader from "@/scenes/Realtime/layouts/header";
import PermissionErrorScene from "@/scenes/Errors/PermissionError";

import { updateHost } from "@/services/actions/filter";
import {
  updateRealtimeData,
  updateArticleStats,
  updateRealtimeStatusForHost
} from "@/services/actions/realtime";
import { adjustHost } from "@/utils";

import { updateTitle } from "@/services/actions/session";
import {
  getArticleEngagementData,
  getRealtimeStatus
} from "@/services/api/realtime";

import throttle from "lodash/throttle";

class RealtimePage extends React.Component {
  constructor(props) {
    super(props);

    const { dispatch } = props;
    const { router } = props;

    const pathname = router.pathname;
    const query = router.query;

    const { filterStore, sessionStore } = props;
    const { sites } = sessionStore;

    const host = adjustHost(query.host, filterStore.host, sites);

    dispatch(updateTitle("Realtime"));

    if (host != query.host) {
      query.host = host;
      router.replace({ pathname, query });
    }
    if (host != filterStore.host) {
      dispatch(updateHost(host));
    }

    if (sessionStore.isRealtimeEnabled) {
      this.createWebSocketConnection();
    } else {
      const status = this.checkRealtimeStatus();
      if (status) {
        this.createWebSocketConnection();
      }
    }
  }

  createWebSocketConnection = () => {
    this.closeConnection();

    const testKeys = ['0f8151a9-0f88-4732-8b7e-b5b0e4b1417e', 'bc3e080c-a5bc-4730-b471-3970b6bf699e']

    if (testKeys.indexOf(this.props.sessionStore.apiKey) > -1) {
      this.webSocket = new WebSocket(`wss://s11.admin.com:8443`);
    } else {
      this.webSocket = new WebSocket(`wss://s1.admin.com:8443`);
    }

    this.intervalId = window.setInterval(() => {
      if (this.checkConnection()) {
        const { filterStore, realtimeStore, sessionStore } = this.props;
        const { article } = realtimeStore;

        if (article.id) {
          const apiKeyOrHost = !filterStore.host
            ? { apikey: sessionStore.apiKey }
            : { host: filterStore.host };
          this.webSocket.send(
            JSON.stringify({
              type: "stats",
              ...apiKeyOrHost,
              articleId: article.id
            })
          );
        } else if (filterStore.host && !article.id) {
          this.webSocket.send(
            JSON.stringify({
              type: "stats",
              host: filterStore.host
            })
          );
        } else {
          this.webSocket.send(
            JSON.stringify({
              type: "stats",
              apikey: sessionStore.apiKey
            })
          );
        }

        if (filterStore.host) {
          // Fetch and process article engagement data
          this.getArticleEngagement();
        }
      }
    }, 3000);

    window.addEventListener("beforeunload", () => this.webSocket.close());
    this.webSocket.addEventListener("message", this.onReceiveMessage);
    /** Logic to re-connect to websocket on connection dying */
    this.webSocket.addEventListener("error", this.onErrorWebsocket);
    this.webSocket.addEventListener("close", this.onCloseWebsocket);
  };

  onReceiveMessage = message => {
    this.props.dispatch(updateRealtimeData(JSON.parse(message.data)));
  };

  onCloseWebsocket = () => {
    setTimeout(this.createWebSocketConnection, 1000);
  };

  onErrorWebsocket = () => {
    this.webSocket.close(1000);
  };

  /** Fetch article engagement stats from server */
  getArticleEngagement = throttle(
    async () => {
      // First get all the ids of articles if there are any
      const ids = [];
      if (this.props.realtimeStore.TopUrls) {
        this.props.realtimeStore.TopUrls.forEach(item => {
          ids.push(item.Url);
        });
      }
      // Then make the request if there are any ids
      if (ids.length > 0) {
        const data = await getArticleEngagementData(
          this.props.sessionStore.token,
          this.props.filterStore.host,
          ids.join(",")
        );
        // Once data is present, then process it and dispatch
        if (data) {
          const processedData = {
            ids,
            articles: {}
          };
          data.forEach(article => {
            const totalEmotes = article.emotes.reduce((a, b) => a + b);
            processedData.articles[article.articleId] = {
              emotes: totalEmotes,
              commentCount: article.commentCount,
              shareCount: article.shareCount
              // recommendCount: article.recommendCount,
            };
          });
          this.props.dispatch(updateArticleStats(processedData));
        }
      }
    },
    12000,
    { leading: true }
  );

  checkRealtimeStatus = async () => {
    if (
      typeof this.props.realtimeStore.realtimeStatus[
        this.props.filterStore.host
      ] === "boolean"
    ) {
      return this.props.realtimeStore.realtimeStatus[
        this.props.filterStore.host
      ];
    }

    if (this.props.filterStore.host) {
      const status = await getRealtimeStatus(
        this.props.sessionStore.token,
        this.props.filterStore.host
      );

      this.props.dispatch(
        updateRealtimeStatusForHost(this.props.filterStore.host, status)
      );
      return status;
    }

    this.closeConnection();
    return false;
  };

  async componentDidUpdate(prevProps) {
    if (prevProps.filterStore.host !== this.props.filterStore.host) {
      this.closeConnection();
      const status = await this.checkRealtimeStatus();
      if (status) {
        this.createWebSocketConnection();
      }
    }
  }

  componentWillUnmount() {
    this.closeConnection();
  }

  closeConnection = () => {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    if (this.webSocket) {
      this.webSocket.removeEventListener("message", this.onReceiveMessage);
      this.webSocket.removeEventListener("error", this.onErrorWebsocket);
      this.webSocket.removeEventListener("close", this.onCloseWebsocket);
      if (this.webSocket.readyState === 1) {
        this.webSocket.close(1000);
      }
    }
  };

  checkConnection = () => {
    if (this.webSocket && this.webSocket.readyState === 1) {
      return true;
    }
    return false;
  };

  render() {
    if (
      (this.props.sessionStore.loading || this.webSocket.readyState === 0) &&
      (this.props.sessionStore.isRealtimeEnabled ||
        this.props.realtimeStore.realtimeStatus[this.props.filterStore.host])
    ) {
      return (
        <AsideLayout>
          <RealtimeHeader />
          <Loader />
        </AsideLayout>
      );
    }

    return (
      <AsideLayout>
        {this.props.sessionStore.isRealtimeEnabled ||
        this.props.realtimeStore.realtimeStatus[this.props.filterStore.host] ? (
          <RealtimeScene />
        ) : (
          <>
            <RealtimeHeader />
            <PermissionErrorScene message="This feature is a paid feature" />
          </>
        )}
      </AsideLayout>
    );
  }
}

const mapStateToProps = ({ session, filter, realtime }) => {
  return {
    sessionStore: session,
    filterStore: filter,
    realtimeStore: realtime
  };
};

export default connect(mapStateToProps)(
  AuthProtectedPage(withRouter(RealtimePage))
);
