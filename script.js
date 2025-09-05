function selectType() {
  const type = document.getElementById("type").value;
  if(type == "random"){
    fetch('https://official-joke-api.appspot.com/jokes/random')
  .then(response => response.json())
  .then(data => console.log(data));
  }
}
