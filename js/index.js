const serverList = document.querySelector(".server-list");
const botList = document.querySelector(".bot-list");
const serverItems = [
  { type: "invite", value: "termitmng" },
  { type: "invite", value: "Hj8Y9EnEeK" },
  { type: "invite", value: "nbxsucTaUC" },
  { type: "invite", value: "xoln" },
  {type: "invite", value: "hKsCUB3bqz"}
];
const botIDs = ["1081606819111247912","1043838190118764614","1063887970039496816","1013586206388396093","1065010859375607828","1124398308648026182","1118257018277482516"];

async function fetchServerData(t) {
  const endpoint = `https://discord.com/api/v9/invites/${t}`;
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data.guild;
  } catch (error) {
    console.error("Error fetching server data:", error);
    return null;
  }
}

async function fetchServerDataByServerId(serverId) {
  const endpoint = `https://discord.com/api/v9/guilds/${serverId}`;
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching server data:", error);
    return null;
  }
}

async function populateServerList() {
  for (const item of serverItems) {
    let serverData;
    if (item.type === "invite") {
      serverData = await fetchServerData(item.value);
    } else if (item.type === "serverId") {
      serverData = await fetchServerDataByServerId(item.value);
    }

    if (serverData) {
      const serverBlock = createServerBlock(serverData);
      serverList.appendChild(serverBlock);
      await new Promise((resolve) => setTimeout(resolve, 50));
      serverBlock.classList.add("animate");
    }
  }
}

function createServerBlock(server) {
  const serverBlock = document.createElement("a");
  serverBlock.classList.add("server");
  serverBlock.href = `https://discord.gg/${server.vanity_url_code}`;

  const serverIcon = document.createElement("img");
  const iconType = server.icon.startsWith("a_") ? "gif" : "png";
  serverIcon.src = `https://cdn.discordapp.com/icons/${server.id}/${server.icon}.${iconType}`;
  serverIcon.alt = "Server Avatar";
  serverIcon.style.borderRadius = "50%";
  serverBlock.appendChild(serverIcon);

  const serverName = document.createElement("h2");
  serverName.textContent = server.name;
  serverBlock.appendChild(serverName);

  const serverDescription = document.createElement("p");
  if (server.description) {
    serverDescription.textContent = server.description;
  }
  serverBlock.appendChild(serverDescription);

  return serverBlock;
}

async function populateBotList() {
  for (const botId of botIDs) {
    const botData = await fetchBotData(botId);
    if (botData) {
      const botBlock = createBotBlock(botData);
      botList.appendChild(botBlock);
      await new Promise((resolve) => setTimeout(resolve, 50));
      botBlock.classList.add("animate");
    }
  }
}

async function fetchBotData(botId) {
  const endpoint = `https://80.87.107.138/api/discord/users/${botId}`;
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching bot data:", error);
    return null;
  }
}

async function init() {
  await populateServerList();
  await populateBotList();
}

init();
