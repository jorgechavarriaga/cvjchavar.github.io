// Dynamically set API endpoint depending on local vs production environment
const DEV_URL = 'http://localhost:8000';
const PDN_URL = 'https://ai.chavazystem.tech';
const BASE_URL = location.hostname === '127.0.0.1' || location.hostname === 'localhost'
  ? `${DEV_URL}`
  : `${PDN_URL}`;
const ENDPOINT = `${BASE_URL}/api/v1/ask`;
const HEALTH_ENDPOINT = `${BASE_URL}/api/v1/health/ai`;
const langMap = { cv_en: "en", cv_fr: "fr", cv_sp: "es" };
const selectedLang = localStorage.getItem("selectedLanguage") || "cv_en";



async function checkBackendStatusOnLoad() {
  const statusElement = document.getElementById('chatbot-status');
  const iconElement = document.getElementById('chatbot-icon');
  const chatbotTooltip = document.querySelector('.chatbot-tooltip');
  const chatbotButton = document.getElementById('chatbot-button');

  let isOnline = false;

  try {
    const response = await fetch(HEALTH_ENDPOINT, { method: 'GET' });
    if (response.ok) {
      const result = await response.json();
      if (result?.status === "success" && result?.data?.status === "online") {
        statusElement?.classList.add('status-online');
        iconElement?.classList.add('icon-online');
        isOnline = true;
      } else {
        statusElement?.classList.add('status-offline');
        iconElement?.classList.add('icon-offline');
      }
    } else {
      statusElement?.classList.add('status-offline');
      iconElement?.classList.add('icon-offline');
    }
  } catch (error) {
    statusElement?.classList.add('status-offline');
    iconElement?.classList.add('icon-offline');
  }

  const fallbackText = {
    online: "Online",
    offline: "Offline",
    open: "Open Assistant",
    close: "Close Assistant"
  };

  const text = window.chatbotText || fallbackText;
  const actionText = text.open;

  chatbotTooltip.textContent = `${isOnline ? text.online : text.offline} - ${actionText}`;
  chatbotButton.setAttribute('aria-label', `${isOnline ? text.online : text.offline} - ${actionText}`);
  setTimeout(() => {
    const event = new Event("mouseover");
    chatbotButton.dispatchEvent(event);
  }, 50);

}


async function checkBackendStatus() {
  const statusElement = document.getElementById('chatbot-status');
  try {
    const response = await fetch(HEALTH_ENDPOINT, { method: 'GET' });
    if (response.ok) {
      const result = await response.json();
      if (result?.status === "success" && result?.data?.status === "online") {
        statusElement.classList.remove('status-offline');
        statusElement.classList.add('status-online');
        return;
      }
    }
    statusElement.classList.remove('status-online');
    statusElement.classList.add('status-offline');
  } catch (error) {
    statusElement.classList.remove('status-online');
    statusElement.classList.add('status-offline');
  }
}


document.addEventListener('DOMContentLoaded', function () {
  checkBackendStatusOnLoad();

  const chatbotButton = document.getElementById('chatbot-button');
  const chatbotModal = document.getElementById('chatbot-modal');
  const chatbotTooltip = document.querySelector('.chatbot-tooltip');
  const questionInput = document.getElementById('chatbot-question');
  const sendButton = document.getElementById('chatbot-send');
  const chatbotResponse = document.getElementById('chatbot-response');


  // Session ID logic with 24h expiration
  function getOrCreateSessionId() {
    const SESSION_KEY = 'session_id';
    const SESSION_TS_KEY = 'session_id_timestamp';
    const EXPIRATION_HOURS = 24;

    const now = Date.now();
    const storedSessionId = localStorage.getItem(SESSION_KEY);
    const storedTimestamp = localStorage.getItem(SESSION_TS_KEY);

    const isExpired = !storedTimestamp || (now - parseInt(storedTimestamp, 10)) > EXPIRATION_HOURS * 60 * 60 * 1000;

    if (storedSessionId && !isExpired) {
      return storedSessionId;
    }

    const newSessionId = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, newSessionId);
    localStorage.setItem(SESSION_TS_KEY, now.toString());

    return newSessionId;
  }

  const sessionId = getOrCreateSessionId();


  function updateTooltipText() {
    const isOpen = chatbotModal.classList.contains('active');
    const statusElement = document.getElementById('chatbot-status');
    const isOnline = statusElement?.classList.contains('status-online');
    const statusText = isOnline ? window.chatbotText.online : window.chatbotText.offline;
    const actionText = isOpen ? window.chatbotText.close : window.chatbotText.open;
    chatbotTooltip.textContent = `${statusText} - ${actionText}`;
    chatbotButton.setAttribute('aria-label', `${statusText} - ${actionText}`);
  }


  function openModal() {
    chatbotModal.classList.add('active');
    updateTooltipText();
    checkBackendStatus();
  }

  function closeModal() {
    chatbotModal.classList.remove('active');
    updateTooltipText();
  }

  chatbotButton.onclick = () => {
    chatbotModal.classList.contains('active') ? closeModal() : openModal();
  };

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeModal();
  });

  document.addEventListener('click', function (e) {
    const isClickInside = chatbotModal.contains(e.target) || chatbotButton.contains(e.target);
    if (!isClickInside) closeModal();
  });

  questionInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendButton.click();
    }
  });

  sendButton.addEventListener('click', async function () {
    const question = questionInput.value.trim();
    if (!question) return;

    function addMessage(role, content) {
      const msg = document.createElement("div");
      msg.className = `chat-message ${role}`;
      msg.innerHTML = content;
      chatbotResponse.appendChild(msg);

      chatbotResponse.scrollTo({
        top: chatbotResponse.scrollHeight,
        behavior: "smooth"
      });
    }

    addMessage("user", `<i class="fas fa-user" style="color:black"></i><strong> ${window.chatbotText.user}:</strong> ${question}`);

    questionInput.value = '';
    questionInput.disabled = true;
    sendButton.disabled = true;

    const loader = document.createElement("div");
    loader.className = "typing-indicator";
    loader.innerHTML = `
    <span class="typing-dot"></span>
    <span class="typing-dot"></span>
    <span class="typing-dot"></span>
  `;
    chatbotResponse.appendChild(loader);
    chatbotResponse.scrollTo({
      top: chatbotResponse.scrollHeight,
      behavior: "smooth"
    });

    const answer = await sendQuestionToBackend(sessionId, question);

    loader.remove();


    addMessage("assistant", `<i class="fas fa-headset" style="color:black"></i><strong> ${window.chatbotText.assistant}:</strong> ${answer}`);

    questionInput.disabled = false;
    sendButton.disabled = false;
    questionInput.focus();
  });


  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    const chatbotTooltip = document.querySelector('.chatbot-tooltip');
    if (chatbotTooltip) {
      chatbotTooltip.style.display = 'none';
    }
  }

});

async function sendQuestionToBackend(sessionId, questionText) {
  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        session_id: sessionId,
        question: questionText,
        language: langMap[selectedLang]
      })
    });
    console.log(body);
    if (!response.ok) throw new Error('Network response was not ok');

    const result = await response.json();
    return result.data.answer;
  } catch (error) {
    console.error('Error:', error);
    return window.chatbotText?.error || "Sorry, I couldn't get a response at the moment.";
  }
}
