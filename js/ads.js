function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const getCurrDay = () => {
  var d = new Date();
  return d.getDay();
};

const showAd = ad => {
  image_s3_url = ad.image_s3_url;
  callback_url = ad.callback_url;
  
  adDiv = document.createElement('div');
  adImg = document.createElement('img');
  adButton = document.createElement('button');
  adButton.innerHTML = "Explore";
  adButton.addEventListener('click', function (e) { window.location.href = callback_url; }, false);
  console.log("done");

  adDiv.appendChild(adImg);
  adDiv.appendChild(adButton);
  body.appendChild(adDiv);

  adDiv.className = 'rightAd';
  adImg.src = image_s3_url;
  adImg.alt = "Advertisement";
  adButton.className = 'btn';
  adDiv.style.display = "block";
};

async function getAdFromBackend() {
  var url = "https://m5lu5003s2.execute-api.ap-south-1.amazonaws.com/default/CNN-Aargog";
  try {
      let re = await fetch(url);
      res = await re.json();
      let ad = JSON.parse(JSON.stringify(res));
      console.log(re,'reeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
      console.log(ad,'addddddddddddddddddddddddddddddddddd');
      return ad;
  } catch (error) {
      console.log(error,'whyyyyyyyyyyy');
  }
}

async function runAds() {
  let day = getCurrDay();

  await sleep(10000);
  let user_ID = JSON.parse(localStorage.getItem("user_id"));
  console.log("user ID is :", user_ID, "today is :", day );

  let ad = await getAdFromBackend();
  console.log("ad is :", ad);
  //showAd(ad);
}

//module.exports = { runAds };