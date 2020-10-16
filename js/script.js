const root = document.querySelector('#root');
const form = document.querySelector('#myForm');
const qtd = document.querySelector('#qtd');
let pokemon, desc;

const getDesc = async (n) => {
  let resp = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${n}`);
  let data = await resp.json();
  desc = data.flavor_text_entries[0].flavor_text;
  console.log(data.flavor_text_entries[0])
}

const get = async (n) => {
  let resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${n}`);
  let data = await resp.json();
  pokemon = data;
}

const fetchList = async (n) => {

  while(document.querySelector('.card')) {
    document.querySelector('.card').remove();
  }

  await get(n);
  await getDesc(n);

  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const div = document.createElement('div');
  root.appendChild(div);
  div.classList.add('card');

  div.innerHTML =
    `<img class='card-header' src='${pokemon.sprites.front_default}'>
    <p class='card-header' id=#${pokemon.id}>#${pokemon.id.toString().padStart(3, '0')}</p>
    <p class='name'>${name}</p>
    <p class='type'>Type: ${pokemon.types[0].type.name}</p>
    <p class='type'>Desc: ${desc.replace(/[^a-zA-Z. ]/g, "")}</p>
    `;
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  fetchList(qtd.value);
})
