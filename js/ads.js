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

async function getAdFromBackend(day, user_ID) {
  let url = new URL("https://m5lu5003s2.execute-api.ap-south-1.amazonaws.com/default/CNN-Aargog");
  var params = {day: day, user_ID: user_ID};
  url.search = new URLSearchParams(params).toString();
  try {
      let res = await fetch(url, {
        method: 'GET',
      });
      let ad = await res.json();
      console.log(ad);
      return ad;
  } catch (error) {
      console.log("Error occured", error);
  }
}

async function runAds() {
  let day = getCurrDay();

  // let user_ID = JSON.parse(localStorage.getItem("user_id"));
  // console.log("user ID is :", user_ID, "today is :", day );
  let user_ID = "60b058ce272f244c56ccd8e7";

  let ad = await getAdFromBackend(day, user_ID);
  console.log("ad is :", ad);
  //showAd(ad);
}

//module.exports = { runAds };
