// Variáveis globais
const API_KEY = "VF.DM.66707ddadf3f1f0ac075a397.cUQkqS9swOAIbyG4";

const nameElement = document.getElementById('userName').value || 'default';
const rootElement = document.getElementById('root');
const userInputElement = document.getElementById('user-input');
const sendButton = document.querySelector('.sendMessage');

const interact = async (request) => {
    const response = await fetch(`https://general-runtime.voiceflow.com/state/user/${encodeURI(nameElement)}/interact`, {
        method: 'POST',
        headers: { 
            Authorization: API_KEY, 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ request }),
    });

    const trace = await response.json();
    console.log("API RESPONSE BODY:", trace);

    trace.forEach((item) => {
        if (item.type === 'speak' || item.type === 'text') {
            rootElement.innerHTML += `<li>${item.payload.message}</li>`;
        } else if (item.type === 'end') {
            rootElement.innerHTML += `<li><b>The End!</b></li>`;
        }
    });
};

// Call an Interaction Method to advance the conversation based on `userInput`.
interact({ type: 'launch' });

// Click handler - This advances the conversation session
const handleSend = async () => {
    const userInput = userInputElement.value;
    rootElement.innerHTML += `<li> > ${userInput}</li>`;
    userInputElement.value = '';

    // Call an Interaction Method to advance the conversation based on `userInput`.
    interact({ type: 'text', payload: userInput });
};

// Register the click handler on a button
sendButton.addEventListener('click', handleSend);