const prepareForLineChart = items => {
  const colors = ["#3A84FF", "#D677EA", "#66E0E0", "#FFC863"];
  const data = Object.keys(items).map((item, i) => ({
    color: colors[i],
    title: item,
    count: items[item]
  }));

  return data;
};

export default prepareForLineChart;
