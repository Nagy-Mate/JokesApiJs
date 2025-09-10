async function selectType() {
  const type = document.getElementById("type").value;
  const jokeSetup = document.getElementById("jokeSetup");
  const punchButton = document.getElementById("punch");
  resetButtons();

  if (type == "random") {
    const result = await getData("random");
    jokeSetup.innerHTML = result.setup;
    jokePunchline.innerHTML = result.punchline;
    punchButton.style.visibility = "visible";
  } else if (type == "id") {
    document.getElementById("jokeIdInput").style.visibility = "visible";
  } else if (type == "type") {
    document.getElementById("joketypeInput").style.visibility = "visible";
  }
}

function punch() {
  const jokePunchline = document.getElementById("jokePunchline");
  jokePunchline.style.visibility = "visible";
}

async function getData(type) {
  const url = `https://official-joke-api.appspot.com/jokes/${type}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
  }
}

async function jokeById(jokeId) {
  const result = await getData(jokeId);
  jokeSetup.innerHTML = result.setup;
  document.getElementById("punch").style.visibility = "visible";
  document.getElementById("jokePunchline").style.visibility = "hidden";
  jokePunchline.innerHTML = result.punchline;
}
async function jokeByType(jokeType) {
  const result = await getData(jokeType + "/random/");
  jokeSetup.innerHTML = result[0].setup;
  document.getElementById("punch").style.visibility = "visible";
  document.getElementById("jokePunchline").style.visibility = "hidden";
  jokePunchline.innerHTML = result[0].punchline;
}
function resetButtons() {
  document.getElementById("jokePunchline").style.visibility = "hidden";
  document.getElementById("jokeIdInput").style.visibility = "hidden";
  document.getElementById("punch").style.visibility = "hidden";
  document.getElementById("jokeSetup").innerHTML = "";
}
