import moment from "moment";
import _ from "lodash";
import Cookies from "js-cookie";

const cookieOptions =
  process.env.NODE_ENV === "development"
    ? {}
    : { sameSite: "none", secure: true };

if (
  global.location &&
  global.location.href.indexOf("admin.com") !== -1 &&
  process.env.NODE_ENV !== "development"
) {
  cookieOptions.domain = ".admin.com";
}

export const hashCode = str => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ~~((hash << 5) - hash + str.charCodeAt(i));
  }
  return hash;
};

export const randomHashCode = str => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ~~((hash << 12) - hash + str.charCodeAt(i));
  }
  return hash;
};

export const compare_dates = (d1, d2) => {
  const date1 = moment(d1);
  const date2 = moment(d2);
  if (date1.isSame(date2)) {
    return 0;
  }
  return date1.isAfter(date2) ? 1 : -1;
};

export const num2percent = (num, decimals = 2) => {
  const exp = Math.pow(10, decimals);
  return Math.round(num * 100 * exp) / exp + "%";
};

export const covers = (val1, val2) => {
  val1 = val1 ?? "";
  val2 = val2 ?? "";
  return val1
    .toString()
    .toLowerCase()
    .includes(val2.toString().toLowerCase());
};

export const containsFilter = (arr, filter) =>
  Object.values(arr).some(value => covers(value, filter));

export const filterUnknown = data =>
  _.mapKeys(data, (value, key) =>
    key === "<UNKNOWN>" || key === "" ? "unknown" : key
  );

export const filterDevices = devices =>
  _.pick(devices, ["Desktop", "Tablet", "Mobile"]);

export const stripHtml = html => {
  var tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

export const calculateTotalStatsFromAPIResponse = sitesArr => {
  return sitesArr.reduce(
    (acc, item) => {
      return {
        pageViews: acc.pageViews + item.pageViews,
        comments: acc.comments + item.comments,
        shares: acc.shares + item.shares,
        emotes: acc.emotes + item.emotes,
        recommendations: acc.recommendations + item.recommends,
        pendingComments: acc.pendingComments + item.pending,
        commentViews: acc.commentViews + item.commentViews,
        replies: acc.replies + item.replies
      };
    },
    {
      pageViews: 0,
      comments: 0,
      shares: 0,
      emotes: 0,
      recommendations: 0,
      pendingComments: 0,
      commentViews: 0,
      replies: 0
    }
  );
};

export const adjustDateRange = (
  dateRange1,
  dateRange2,
  defaultDiffDays = 30
) => {
  let from = null,
    to = null;
  if (moment(dateRange1[0], "YYYY-MM-DD", true).isValid()) {
    from = moment(dateRange1[0]);
  } else if (moment(dateRange2[0], "YYYY-MM-DD", true).isValid()) {
    from = moment(dateRange2[0]);
  }
  if (moment(dateRange1[1], "YYYY-MM-DD", true).isValid()) {
    to = moment(dateRange1[1]);
  } else if (moment(dateRange2[1], "YYYY-MM-DD", true).isValid()) {
    to = moment(dateRange2[1]);
  }
  if (
    !moment(from, "YYYY-MM-DD", true).isValid() &&
    !moment(to, "YYYY-MM-DD", true).isValid()
  ) {
    from = moment().subtract(defaultDiffDays, "days");
    to = moment();
  } else if (!moment(from, "YYYY-MM-DD", true).isValid()) {
    from = moment(to).subtract(defaultDiffDays, "days");
  } else if (!moment(to, "YYYY-MM-DD", true).isValid()) {
    to = moment(from).add(defaultDiffDays, "days");
  }
  return {
    from: moment(from).format("YYYY-MM-DD"),
    to: moment(to).format("YYYY-MM-DD")
  };
};

export const adjustHost = (host1, host2, hosts) => {
  let host = "";
  if (hosts.length == 0 || hosts.includes(host1)) {
    host = host1;
  } else if ((host2 == "" && hosts.length >= 2) || hosts.includes(host2)) {
    host = host2;
  } else if (hosts.length > 0) {
    host = hosts[0];
  }
  return host;
};

export const setTokenCookie = token =>
  Cookies.set("token", token, cookieOptions);

export const removeTokenCookie = () => Cookies.remove("token", cookieOptions);

export const dollarFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});

export const kmFormat = new Intl.NumberFormat("en-US", {
  notation: "compact",
  compactDisplay: "short"
});

/** Checks for global object presence and redirects based on arguments */
export const checkForRouteAndRedirect = ({
  routeToCheck,
  comparison = "doesNotMatchRoute",
  redirectLink
}) => {
  if (comparison === "matchesRoute") {
    if (
      global &&
      global.location &&
      global.location.href.indexOf(routeToCheck) !== -1
    ) {
      process.env.NODE_ENV === "development"
        ? (global.location.href = redirectLink)
        : (global.location.href = `//${global.location.hostname}${redirectLink}`);
    }
  }

  if (comparison === "doesNotMatchRoute") {
    if (
      global &&
      global.location &&
      global.location.href.indexOf(routeToCheck) === -1
    ) {
      process.env.NODE_ENV === "development"
        ? (global.location.href = redirectLink)
        : (global.location.href = `//${global.location.hostname}${redirectLink}`);
    }
  }
};
