const url = "https://api.exchangerate-api.com/v4/latest/CNY";
const params = getParams($argument);
$httpClient.get(url, function(error, response, data) {
  if (error) {
    $done();
    return;
  }
  const rates = JSON.parse(data).rates;
  const usdToCny = (1 / rates.USD).toFixed(2);
  const hkdToCny = (1 / rates.HKD).toFixed(2);
  const jpyToCny = (1 / rates.JPY).toFixed(2);
  const eurToCny = (1 / rates.EUR).toFixed(2);
  const gbpToCny = (1 / rates.GBP).toFixed(2);
  const tryToCny = (1 / rates.TRY).toFixed(2);
  const timestamp = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });

  const content = `USD:CNY = ${usdToCny}
HKD:CNY = ${hkgToCny}
JPY:CNY = ${jpyToCny}
TRY:CNY = ${tryToCny}
EUR:CNY = ${eurToCny}
GBP:CNY = ${gbpToCny}
Update Time: ${timestamp}`,

  const panel = {
    title: `当前汇率信息`,
    content: content,
	        icon: params.icon,
        "icon-color": params.color
  };

  $done(panel);
});
function getParams(param) {
  return Object.fromEntries(
    $argument
      .split("&")
      .map((item) => item.split("="))
      .map(([k, v]) => [k, decodeURIComponent(v)])
  );
}
