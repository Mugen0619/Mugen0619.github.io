document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slider .slide');
  let currentIndex = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
    slide.style.display = i === index ? 'block' : 'none';
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }

  showSlide(currentIndex);
  setInterval(nextSlide, 3000); // Change slide every 3 seconds
  });

  document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '3fe20ab0c2fb4c7a71eeef42a5b8003c'; // ここに取得したAPIキーを入力
    const city = 'Tokyo'; // 表示したい都市名（例: Tokyo, London, New York）
    const units = 'metric'; // 温度の単位（metric: 摂氏, imperial: 華氏）
    const lang = 'ja'; // 言語コード（例: ja: 日本語, en: 英語）
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}&lang=${lang}`;
  
    const cityNameElement = document.getElementById('city-name');
    const temperatureElement = document.getElementById('temperature');
    const descriptionElement = document.getElementById('weather-description');
    const iconElement = document.getElementById('weather-icon');
  
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        cityNameElement.textContent = data.name;
        temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
        descriptionElement.textContent = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        iconElement.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        iconElement.alt = data.weather[0].description;
      })
      .catch(error => {
        console.error('天気情報の取得に失敗しました:', error);
        document.getElementById('weather-container').textContent = '天気情報の取得に失敗しました。';
      });
  });