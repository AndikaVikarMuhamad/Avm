const cheerio = require("cheerio");
const axios = require("axios");

const pinterest = (search) =>
  new Promise((resolve, reject) => {
    axios
      .get(`https://id.pinterest.com/search/pins/?autologin=true&q=${search}`, {
        headers: {
          cookie:
            '_auth=1;_b="AWVX37o9uSNJW7/j3A0uzXmXeOaNV+TWVtSElJwj/6RsQ+1F8eezlw2uyT9OxLJ+08k=";_pinterest_cm="TWc9PSZ2TmlRNnpJSFhuSWRubzRTUWptTUtFTTI4anFZZS9wcmtsVHpkVjdqaHhwN3BYeEdWRE1QNWtnWGNEL25LdFFZRFRWRW8zbHdVSFV0a25ZL3c4bGViZnBBZnc2dmJMdjJ2Y0ZGNUpNQXNGK3dKcTRGLzdsZStvb1NOUlVCUzVTbk9IT1ViZnlCcVBrQVQ5alBKaGNDeEJheEI2TU9iUHpieXp5VEtqa0dQQ082Q2VDY3h2blZFQmp2UUFpK0NQNWQmTTFnaWQ0Vk82RGt3Y0xPN09yWUhabFIrTEhvPQ==";_pinterest_sess=TWc9PSZ2eStIY3I3OVhyTFVycnpuOHBWK1NCL0JWR1pWL21rc0dXZUpkUW5tenJHVDhuZjhaa2lCT20zSTZGSlR5VFozMW44emw4Q0V6czIvdnIzYUdzUXcvN3dBWG9vSzVwMEdJRm1UeEduc0hWaTMyb2dGcDVZc1Q2RnJDZFV4ak9TVUFLQzFFcGYzaldoT1dicVdVd2hmOEdJeklTb2V5MUIzVFJyQS80YURFd1RHUUN1WTFmd2hDeUIrOHZ2YXo2VnRZWndOTTg1aFQ3SGkyUlhZQjZlcCtnSnN4Lzd1TkZyckRRdXFpUUt6ZExsOVNDZkxCRWRpQkZnMWUyYVlhTE02K05WVmNIN09ydjRRb2NQQkVwNnAxc1AvS00wWmRuZ0MzN2hlSGZxTXc5cWF5RGNpU25DK3FiWnplcmhIcDk0V0lkWDRab2Z1RG5wK2E1NTIxN3R4Z3NVYmRCMXp0ODI2dEdkY2o5c3h2TnRjdld0Z2t0NWFiNlJjNXlqbzFBRnNCNHNHcldSVnN6WWRVMHpYbmNVRzB5QXFQSnJETDcycTA0dWMvWkFnVWNzSGx1aTFCekdzdG1oeGtYSnhzQ0l3JlByMCtlbUo4YWJVM1V1aVhYeFpIYU9YeWFlTT0=;_routing_id="11b10dc4-f9d9-400c-9382-691d1c46ad97";cm_sub=none;csrftoken=a73cc54d019d931c217f9845385b898c;sessionFunnelEventLogged=1;',
        },
      })
      .then(async (response) => {
        const html = response.data;
        const C = cheerio.load(html);
        const data = [];
        C(".gridCentered")
          .find("img")
          .each((i, el) => {
            const url = C(el).attr("src");
            const title = C(el)
              .attr("alt")
              .replace("Pin ini berisi gambar:", "")
              .replace("Pin ini berisi video:", "")
              .trim();
            const result = {
              title,
              url,
            };
            data.push(result);
          });
        if (data.length === 0) {
          const error = {
            message: "Gambar tidak di temukan",
          };
          reject(error);
        }
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });

module.exports = pinterest;
