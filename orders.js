const telegramBotToken = "1790917850:AAEU0o_d-GqXXCLai9Gz4YBwmabVXj3JwvU";
const telegramChatId = "@jivokistmaz";
const API = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;

function showModal() {
  document.querySelector(".modal").style.display = "flex";
}

async function sendTelegram(event) {
  event.preventDefault();

  const form = event.target;
  const modalTitle = document.querySelector(".modal__title");
  const modaltext = document.querySelector(".modal__text");

  const { firstName, lastName, phone } = Object.fromEntries(
    new FormData(form).entries()
  );
  const city = $("#cities").select2("data")[0]?.text || "";
  const warehouse = $("#warehouses").select2("data")[0]?.text || "";
  const text = `Замовлення від ${firstName} ${lastName}\nТелефон: ${phone}\nМісто: ${city}\nВідділення/Поштомат: ${warehouse}`;

  try {
    const response = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: telegramChatId,
        text,
      }),
    });
    if (response.ok) {
      showModal();
      modalTitle.textContent = "✅ Заявка відправлена";
      modaltext.textContent =
        "Дякуємо! Наш менеджер зв'яжеться з вами найближчим часом.";
      form.reset();
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error(error);
    showModal();
    modalTitle.textContent = "Сталася помилка";
    modaltext.textContent = "Спробуйте іншим разом.";
  }
}
