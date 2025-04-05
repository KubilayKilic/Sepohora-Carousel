$(function () {
  // pokemonAPI'den 20 tane pokemon adını alır ve array'den random bir indexin karşılığındaki pokemon adını döndürür.
  async function fetchPokemon() {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=1302"
      );
      const fetchedPokemon = await response.json();
      console.log(fetchedPokemon);
      const pokemonNames = fetchedPokemon.results.map(
        (pokemon) => pokemon.name
      );
      return pokemonNames[Math.floor(Math.random() * pokemonNames.length)];
    } catch (error) {
      console.log(error);
    }
  }

  // seçilen pokemonun adını döndüren fonksiyon
  async function getPokemonName() {
    try {
      const pokemonName = await fetchPokemon();
      return pokemonName;
    } catch (error) {
      console.error("Hata:", error);
    }
  }

  // Open buttonu ekleyelim
  $("open-btn").remove();
  $(".underbanner-cta:first").append('<p><button id="open-btn"></button></p>');
  $("#open-btn").text("size özel pokemonunu almak için tıklayın");

  $("body").append(
    '<div class="popUp" id="popup"><h2>Lütfen mail ve isim bilgilerinizi yazınız</h2><form id="myForm"><fieldset><label for="first-name">Enter Your First Name: <input id="first-name" name="first-name" type="text" required /></label><label for="last-name">Enter Your Last Name: <input id="last-name" name="last-name" type="text" required /></label><label for="email">Enter Your Email: <input id="email" name="email" type="email" required /></label></label></fieldset><input type="submit" id="close-btn" value="GÖNDER"></form></div>'
  );

  // Poke popUp ekle
  $("body").append(
    '<div class="pokePopUp" id="pokePopUp"><h2>Sizin için özenle seçilen Pokemon!!</h2><p></p><img id="pokemonSprite" src="" width="180px" height="180px" alt="Pokemon Sprite Image" style="display: none; margin: auto;"><button type="text" id="close-btn2">KAPAT</button></div>'
  );

  // Açılış butonunun CSS'ini tanımlayalım
  const openButtonCss =
    "#open-btn {\
            outline: 0;\
            grid-gap: 8px;\
            align-items: center;\
            background-color: #ff90e8;\
            color: #000;\
            border: 1px solid #000;\
            border-radius: 4px;\
            cursor: pointer;\
            pointer-events: auto;\
            display: inline-flex;\
            flex-shrink: 0;\
            font-size: 16px;\
            gap: 8px;\
            justify-content: center;\
            line-height: 1.5;\
            overflow: hidden;\
            padding: 12px 16px;\
            text-decoration: none;\
            text-overflow: ellipsis;\
            transition: all .14s ease-out;\
            white-space: nowrap;\
          }\
          #open-btn:hover {\
            box-shadow: 4px 4px 0 #000;\
            transform: translate(-4px,-4px);\
          }\
          #open-btn:focus-visible {\
            outline-offset: 1px;\
          }";

  // Pop-up CSS'ini tanımlayalım
  const popUpCss =
    ".popUp {\
            width: 400px;\
            background: #fff;\
            border-radius: 6px; \
            position: absolute; \
            top: 0%; \
            left: 50%; \
            transform: translate(-50%, -50%) scale(0.1);\
            text-align: center; \
            padding: 0 30px 30px; \
            color: #333; \
            visibility: hidden; \
            transition: transform 0.4s, top 0.4s; \
            z-index: 6;\
            border: 3px solid #ff90e8;\
          }\
          .popUp h2 {\
            font-size: 38px; \
            font-weight: 500; \
            margin: 30px 0 10px; \
          }\
          .popUp input {\
            display: inline-block;\
            outline: 0;\
            cursor: pointer;\
            border: 2px solid #000;\
            border-radius: 3px;\
            color: #fff;\
            background: #000;\
            font-size: 20px;\
            font-weight: 600;\
            line-height: 28px;\
            padding: 12px 20px;\
            text-align:center;\
            transition-duration: .15s;\
            transition-property: all;\
            transition-timing-function: cubic-bezier(.4,0,.2,1);\
          }\
          .popUp input:hover {\
            color: #000;\
            background: rgb(255, 218, 87);\
          }\
          .popUp fieldset {\
            margin: 10px;\
            border: none;\
            padding: 2rem 0;\
            border-bottom: 3px solid #3b3b4f;\
          }\
          .popUp fieldset:last-of-type {\
            border-bottom: none;\
          }\
          .popUp label {\
            display: block;\
            margin: 0.5rem 0;\
          }";

  //Pokemon Pop Up css
  const pokeCss =
    ".pokePopUp {\
            width: 400px;\
            background: #fff;\
            border-radius: 6px; \
            position: absolute; \
            top: 0%; \
            left: 50%; \
            transform: translate(-50%, -50%) scale(0.1);\
            text-align: center; \
            padding: 0 30px 30px; \
            color: #333; \
            visibility: hidden; \
            transition: transform 0.4s, top 0.4s; \
            z-index: 7;\
            border: 3px solid #ff90e8;\
          }\
          .pokePopUp h2 {\
            font-size: 38px; \
            font-weight: 500; \
            margin: 30px 0 10px; \
          }\
          .pokePopUp button {\
            display: inline-block;\
            outline: 0;\
            cursor: pointer;\
            border: 2px solid #000;\
            border-radius: 3px;\
            color: #fff;\
            background: #000;\
            font-size: 20px;\
            font-weight: 600;\
            line-height: 28px;\
            padding: 12px 20px;\
            text-align:center;\
            transition-duration: .15s;\
            transition-property: all;\
            transition-timing-function: cubic-bezier(.4,0,.2,1);\
          }\
          .pokePopUp button:hover {\
            color: #000;\
            background: rgb(255, 218, 87);\
          }";

  // Pop-up açıldığında CSS'ini tanımlayalım
  const openPopUpCss =
    ".openPopUp {\
            visibility: visible; \
            top: 50%; \
            transform: translate(-50%, -50%) scale(1);\
          }";

  // Pokemon için CSS
  const openPokemonCss =
    ".openPoke {\
        visibility: visible; \
        top: 50%; \
        transform: translate(-50%, -50%) scale(1.5);\
      }";

  // CSS'leri head içine ekleyelim
  $(
    "<style>" +
      openButtonCss +
      popUpCss +
      openPopUpCss +
      pokeCss +
      openPokemonCss +
      "</style>"
  ).appendTo("head");

  // Açılış ve kapanış butonlarının işlevlerini tanımlayalım
  $("#open-btn").click(function () {
    $("#popup").addClass("openPopUp");
  });

  // Form submit olayını dinleyelim
  $("#popup").on("submit", async function (event) {
    // Formun varsayılan gönderme işlemini engelleyelim
    event.preventDefault();

    // İlgili form elemanlarını seçelim
    const firstName = $("#first-name").val();
    const lastName = $("#last-name").val();
    const email = $("#email").val();

    // İsim ve soyisim için regEx kontrolü
    const nameRegex = /^(?!.*\s$)(?!^\s)(?!^\s|.*\s\s)[a-zA-ZğüşöçĞÜŞİÖÇ\s]+$/;
    const lastNameRegex = /^[^\s]+$/;

    if (!nameRegex.test(firstName) || !lastNameRegex.test(lastName)) {
      alert("Lütfen geçerli bir isim ve soyisim giriniz.");
      return;
    }

    // E-posta için regEx kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Lütfen geçerli bir e-posta adresi giriniz.");
      return;
    }

    // Yeni kullanıcı bilgilerini bir objede topla
    const newUserInfo = {
      isim: firstName,
      soyisim: lastName,
      email: email,
    };

    // localStorage'daki kullanıcı bilgilerini güncelle
    const currentUserInfo = JSON.parse(localStorage.getItem("userInfo")) ?? [];
    const isExists = currentUserInfo.some((i) => i.email == newUserInfo.email);
    if (!isExists) {
      currentUserInfo.push(newUserInfo); // Yeni kullanıcı bilgilerini ekle
      localStorage.setItem("userInfo", JSON.stringify(currentUserInfo));
    } else {
      alert("USER IS ALREADY EXISTS, YOU CANNOT GET MORE THAN ONE POKEMON");

      //! buraya break fln lazım
    }

    // Pop-up'ları kontrol et
    $("#popup").removeClass("openPopUp");
    $("#pokePopUp").addClass("openPoke");
    $("#open-btn").css("pointer-events", "none");

    // Pokemon adını al ve ekrana yazdır
    getPokemonName().then((pokemonName) => {
      $("#pokePopUp p").text(pokemonName);
      $("pokePopUp div").html();

      async function fetchPokeSprite() {
        try {
          const responseForSprite = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
          );
          const data = await responseForSprite.json();
          const pokemonSprite = data.sprites.front_default;
          return pokemonSprite;
        } catch (error) {
          console.log(error);
        }

        $("#pokemonSprite").attr("src", `${responseForSprite}`);
        $("#pokemonSprite").css("display", "block");
      }

      fetchPokeSprite().then((pokemonSprite) => {
        $("#pokemonSprite").attr("src", pokemonSprite);
        $("#pokemonSprite").css("display", "block");
      });

      $("#close-btn2").click(function () {
        $("#pokePopUp").removeClass("openPoke");
        $("#open-btn").css("pointer-events", "auto");
      });
    });
  });
});
