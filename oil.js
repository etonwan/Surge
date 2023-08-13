const params = getParams($argument);
const provinceName = params.provname || "江苏";
const apiUrl = `https://apis.tianapi.com/oilprice/index?key=d718b0f7c2b6d71cb3a9814e90bf847f&prov=${encodeURIComponent(provinceName)}`;

$httpClient.get(apiUrl, (error, response, data) => {
  if (error) {
    console.log(error);
    $done();
    return;
  }

  const oilPriceData = JSON.parse(data);
  if (oilPriceData.code !== 200) {
    console.log(`请求失败，错误信息：${oilPriceData.msg}`);
    $done();
    return;
  }

  const oilPriceInfo = oilPriceData.result;
  const message = `地区：${oilPriceInfo.prov}\n0号柴油：${oilPriceInfo.p0}元/升\n89号汽油：${oilPriceInfo.p89}元/升\n92号汽油：${oilPriceInfo.p92}元/升\n95号汽油：${oilPriceInfo.p95}元/升\n98号汽油：${oilPriceInfo.p98}元/升\n更新时间：${oilPriceInfo.time}`;

  const body = {
    title: "今日油价",
    content: message,
    provname: params.provname,
    icon: params.icon,
    "icon-color": params.color
  };
  $done(body);
});

function getParams(param) {
  return Object.fromEntries(
    param
      .split("&")
      .map((item) => item.split("="))
      .map(([k, v]) => [k, decodeURIComponent(v)])
  );
}
