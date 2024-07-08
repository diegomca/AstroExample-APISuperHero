/* The code snippet is initializing variables for managing a list of superheroes and pagination in a
JavaScript application. Here's what each variable is doing: */

let allSuperheroes = []; // Guarda todos los superhéroes
let filteredSuperheroes = []; // Guarda los superhéroes filtrados
let paginaActual = 1;
const superheroesPorPagina = 10;

/**
 * The function initializes pagination for a list of superheroes and adds an event listener for a
 * search bar.
 */
export async function initializePagination() {
  const res = await fetch(
    "https://akabab.github.io/superhero-api/api/all.json"
  );
  allSuperheroes = await res.json();
  filteredSuperheroes = [...allSuperheroes];
  updatePagination();

  // Añade el event listener para la barra de búsqueda
  document.getElementById("searchBar").addEventListener("input", handleSearch);
}

/**
 * The function `handleSearch` filters a list of superheroes based on a search term and resets the
 * current page to the first page.
 * @param event - The `event` parameter in the `handleSearch` function is an object that represents an
 * event being triggered, such as a user input event like typing in a search input field. In this case,
 * it is used to capture the value of the search input field to filter a list of superheroes based on
 */
function handleSearch(event) {
  const searchTerm = event.target.value.toLowerCase();
  filteredSuperheroes = allSuperheroes.filter((hero) =>
    hero.name.toLowerCase().includes(searchTerm)
  );
  paginaActual = 1; // Reinicia a la primera página
  updatePagination();
}

/**
 * The function `getIndices` calculates the initial and final indices of a subset of superheroes based
 * on the current page number.
 * @param paginaActual - The `paginaActual` parameter represents the current page number in a
 * pagination system.
 * @returns The `getIndices` function returns an object with two properties: `indiceInicial` and
 * `indiceFinal`, which represent the starting and ending indices of a subset of items to be displayed
 * on a page based on the current page number `paginaActual`.
 */
function getIndices(paginaActual) {
  const indiceInicial = (paginaActual - 1) * superheroesPorPagina;
  const indiceFinal = Math.min(
    indiceInicial + superheroesPorPagina,
    filteredSuperheroes.length
  );
  return { indiceInicial, indiceFinal };
}

/**
 * The function `getSuperheroesPaginados` retrieves a paginated list of superheroes based on the
 * current page number.
 * @param paginaActual - The `paginaActual` parameter represents the current page number for which you
 * want to retrieve a paginated list of superheroes.
 * @returns The function `getSuperheroesPaginados` is returning a subset of elements from the
 * `filteredSuperheroes` array based on the current page number `paginaActual`. The subset is
 * determined by the indices calculated using the `getIndices` function, which is not provided in the
 * code snippet.
 */
function getSuperheroesPaginados(paginaActual) {
  const { indiceInicial, indiceFinal } = getIndices(paginaActual);
  return filteredSuperheroes.slice(indiceInicial, indiceFinal);
}

/**
 * The function "previous" decreases the current page number by 1 and updates the pagination if the
 * current page is greater than 1.
 */
export function previous() {
  if (paginaActual > 1) {
    paginaActual--;
    updatePagination();
  }
}

/**
 * The `next` function increments the current page number and updates the pagination if there are more
 * pages available.
 */
export function next() {
  const paginasTotales = Math.ceil(
    filteredSuperheroes.length / superheroesPorPagina
  );
  if (paginaActual < paginasTotales) {
    paginaActual++;
    updatePagination();
  }
}

/**
 * The function `updatePagination` retrieves a list of superheroes for the current page, renders them
 * on the screen, and updates the pagination text.
 */
function updatePagination() {
  const superheroesPaginados = getSuperheroesPaginados(paginaActual);
  renderSuperheroes(superheroesPaginados);
  updatePaginationText();
}

/**
 * The `renderSuperheroes` function dynamically creates and displays a list of superheroes on a web
 * page using data provided in an array.
 * @param superheroes - An array of superhero objects containing information such as id, name, images,
 * biography (including fullName and publisher). The `renderSuperheroes` function takes this array and
 * dynamically creates HTML elements to display each superhero's image, name, full name or default to
 * name if full name is not available, and
 */
function renderSuperheroes(superheroes) {
  const superheroesList = document.getElementById("superheroesList");
  superheroesList.innerHTML = "";

  superheroes.forEach((hero) => {
    const heroDiv = document.createElement("div");
    heroDiv.className =
      "max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700";

    heroDiv.innerHTML = `
      <a href="/hero/${hero.id}">
        <img class="rounded-t-lg" src="${hero.images.md}" alt="${hero.name}" />
      </a>
      <div class="p-5">
        <a href="#">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            ${hero.name}
          </h5>
        </a>
        <p class="text-sm text-gray-700 dark:text-gray-400">
          ${
            hero.biography.fullName === "" ? hero.name : hero.biography.fullName
          }
        </p>
        <div class="mt-4">
          <a href="#" class="inline-block px-3 py-1 text-xs font-semibold text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-400">
            ${hero.biography.publisher}
          </a>
        </div>
      </div>
    `;

    superheroesList.appendChild(heroDiv);
  });
}

/**
 * The function `updatePaginationText` updates the text displayed on a webpage to show the range of
 * superheroes being currently displayed.
 */
function updatePaginationText() {
  const { indiceInicial, indiceFinal } = getIndices(paginaActual);
  const paginationText = document.getElementById("paginationText");
  paginationText.innerText = `Mostrando ${
    indiceInicial + 1
  } a ${indiceFinal} de ${filteredSuperheroes.length} superhéroes`;
}