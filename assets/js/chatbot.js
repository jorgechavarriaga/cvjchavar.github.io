document.addEventListener('DOMContentLoaded', function () {
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
    chatbotTooltip.textContent = isOpen ? 'Close Assistant' : 'Open Assistant';
    chatbotButton.setAttribute('aria-label', isOpen ? 'Close Assistant' : 'Open Assistant');
  }

  function openModal() {
    chatbotModal.classList.add('active');
    updateTooltipText();
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

    chatbotResponse.innerHTML += `<div><strong>You:</strong> ${question}</div>`;
    questionInput.value = '';
    questionInput.disabled = true;
    sendButton.disabled = true;

    const answer = await sendQuestionToBackend(sessionId, question);

    chatbotResponse.innerHTML += `<div><strong>Assistant:</strong> ${answer}</div>`;
    chatbotResponse.scrollTop = chatbotResponse.scrollHeight;

    questionInput.disabled = false;
    sendButton.disabled = false;
    questionInput.focus();
  });
});

async function sendQuestionToBackend(sessionId, questionText) {
  try {
    const response = await fetch('https://ai.chavazystem.tech/api/v1/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        session_id: sessionId,
        question: questionText
      })
    });

    if (!response.ok) throw new Error('Network response was not ok');

    const result = await response.json();
    return result.data.answer;
  } catch (error) {
    console.error('Error:', error);
    return "Sorry, I couldn't get a response at the moment.";
  }
}
