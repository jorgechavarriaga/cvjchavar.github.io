document.addEventListener('DOMContentLoaded', function () {
  const chatbotButton = document.getElementById('chatbot-button');
  const chatbotModal = document.getElementById('chatbot-modal');
  const chatbotTooltip = document.querySelector('.chatbot-tooltip');
  const questionInput = document.getElementById('chatbot-question');
  const sendButton = document.getElementById('chatbot-send');
  const chatbotResponse = document.getElementById('chatbot-response');

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

    const sessionId = 'TEST'; // TODO: Replace with dynamic ID

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
    // const response = await fetch('http://127.0.0.1:8000/api/v1/ask', {
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
