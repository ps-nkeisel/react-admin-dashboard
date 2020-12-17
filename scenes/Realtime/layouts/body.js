import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Pane from "evergreen-ui/commonjs/layers/src/Pane";
import FlipMove from "react-flip-move";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTag,
  faClock,
  faComments,
  faSmile,
  faShare
} from "@fortawesome/pro-solid-svg-icons";
import moment from "moment";

import "../styles/articles.scss";
import { updateArticle } from "@/services/actions/realtime";
import { kmFormat } from "@/utils";

const RealtimeBody = () => {
  const dispatch = useDispatch();

  const { TopUrls, articleStats } = useSelector(({ realtime }) => ({
    TopUrls: realtime.TopUrls,
    articleStats: realtime.articleStats
  }));

  const renderArticle = article => {
    const meta = JSON.parse(article.Meta);
    const tags = meta.tag ? meta.tag.split(",") : [];

    const image = meta.img ? meta.img : "/static/images/default_img.png";
    const statsExist =
      articleStats &&
      articleStats.ids &&
      articleStats.articles &&
      articleStats.ids.includes(article.Url);

    return (
      <Pane display="flex">
        <div
          className="realtime-body__image"
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        <Pane marginRight="auto" className="realtime-body__item-body">
          <Pane>
            <h2
              className="realtime-body__item-title"
              style={{ cursor: "pointer" }}
              onClick={() => {
                dispatch(updateArticle(meta));
              }}
            >
              {meta.title}
            </h2>
          </Pane>
          <div className="realtime-body__item-tags d-flex">
            <FontAwesomeIcon icon={faTag} />
            {tags.map((item, index) => {
              if (item.length > 0) {
                return (
                  <div key={index} className="realtime-body__item-tag">
                    <span>{item}</span>
                  </div>
                );
              }
            })}
          </div>

          <div className="realtime-body__item-stats d-flex">
            <div className="d-flex align-items-center realtime-body__item-stat">
              <FontAwesomeIcon icon={faClock} />
              <span>{moment(article.AvgTimeOnPage, moment.HTML5_FMT.TIME_MS).format('mm:ss')}</span>
            </div>
            {statsExist && (
              <>
                <div className="d-flex align-items-center realtime-body__item-stat">
                  <FontAwesomeIcon icon={faComments} />
                  <span>
                    {articleStats.articles[article.Url].commentCount} comments
                  </span>
                </div>
                <div className="d-flex align-items-center realtime-body__item-stat">
                  <FontAwesomeIcon icon={faSmile} />
                  <span>
                    {articleStats.articles[article.Url].emotes} emoticons
                  </span>
                </div>
                <div className="d-flex align-items-center realtime-body__item-stat">
                  <FontAwesomeIcon icon={faShare} />
                  <span>
                    {articleStats.articles[article.Url].shareCount} shares
                  </span>
                </div>
              </>
            )}
          </div>
        </Pane>
        <h3 className="realtime-body__item-number">
          {kmFormat.format(article.Online)}
        </h3>
      </Pane>
    );
  };

  return (
    <>
      <Pane>
        <Pane
          display="flex"
          className="realtime-body__header"
          alignItems="center"
        >
          <Pane marginRight="auto">
            <span className="tx-uppercase">Top Articles By Users</span>
          </Pane>
          <a
            className="text-uppercase text-secondary"
            href={`mailto:support@vuukle.com`}
          >
            <strong>
              <u>Premium Feature</u>
            </strong>
          </a>
        </Pane>
        <Pane>
          <FlipMove>
            {TopUrls.map(item => (
              <div key={item.Url} className="realtime-body__item">
                {renderArticle(item)}
              </div>
            ))}
          </FlipMove>
        </Pane>
      </Pane>
    </>
  );
};

export default RealtimeBody;
