async function selectType() {
  const type = document.getElementById("type").value;
  const jokeSetup = document.getElementById("jokeSetup");
  const jokePunchline = document.getElementById("jokePunchline");
  const punchButton = document.getElementById("punch");

  punchButton.style.visibility = "hidden";
  jokeSetup.innerHTML = "";
  jokePunchline.innerHTML = "";

  if(type == "random"){
    const result = await getData('random');
  jokeSetup.innerHTML = result.setup;
  jokePunchline.innerHTML = result.punchline;
  punchButton.style.visibility = "visible";
  }else if(type == "id"){
    const idInput = document.getElementById("jokeIdInput");
    idInput.style.visibility = "visible";
    const jokeId = document.getElementById("jokeId").value;
   
  }
}

function punch(){
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

   async function jokeById(jokeId){
    const result = await getData(jokeId);
          jokeSetup.innerHTML = result.setup;
          jokePunchline.innerHTML = result.punchline;
          punchButton.style.visibility = "visible";
    }