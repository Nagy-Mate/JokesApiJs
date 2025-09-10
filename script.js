const type = document.getElementById("type");
type.addEventListener("change", function () {
  if (type.value == "random") {
    document.getElementById("jokeIdInput").style.display = "none";
    document.getElementById("joketypeInput").style.display = "none";
    resetButtons();
  } else if (type.value == "id") {
    document.getElementById("joketypeInput").style.display = "none";
    document.getElementById("jokeIdInput").style.display = "block";
    resetButtons();
  } else if (type.value == "type") {
    document.getElementById("jokeIdInput").style.display = "none";
    document.getElementById("joketypeInput").style.display = "block";
    resetButtons();
  }
});

async function selectType() {
  //const type = document.getElementById("type");
  const jokeSetup = document.getElementById("jokeSetup");
  const punchButton = document.getElementById("punch");
  resetButtons();

  if (type.value == "random") {
    const result = await getData("random");
    jokeSetup.innerHTML = result.setup;
    jokePunchline.innerHTML = result.punchline;
    punchButton.style.display = "block";
  } else if (type.value == "id") {
    document.getElementById("jokeIdInput").style.display = "block";
  } else if (type.value == "type") {
    document.getElementById("joketypeInput").style.display = "block";
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
  if (jokeId > 0 && jokeId < 452) {
    const result = await getData(jokeId);
    jokeSetup.innerHTML = result.setup;
    document.getElementById("punch").style.display = "block";
    document.getElementById("jokePunchline").style.visibility = "hidden";
    jokePunchline.innerHTML = result.punchline;
  }
}
async function jokeByType(jokeType) {
  const result = await getData(jokeType + "/random/");
  jokeSetup.innerHTML = result[0].setup;
  document.getElementById("punch").style.display = "block";
  document.getElementById("jokePunchline").style.visibility = "hidden";
  jokePunchline.innerHTML = result[0].punchline;
}
function resetButtons() {
  document.getElementById("jokePunchline").style.visibility = "hidden";
  document.getElementById("punch").style.display = "none";
  document.getElementById("jokeSetup").innerHTML = "";
}
