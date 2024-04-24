"use strict";
const getUsername = document.querySelector("#user");
const formSubmit = document.querySelector("#form");
const main_container = document.querySelector(".main-container");
async function fetchData(url, option) {
    const res = await fetch(url, option);
    console.log(res);
    if (!res.ok) {
        throw new Error("Network Error");
    }
    return await res.json();
}
function UI(data) {
    const { id, login, avatar_url, url } = data;
    const html = `
    <div class="card">
        <img src=${avatar_url} alt=${login}>
        <hr/>
        
        <div class="card-footer">
            <img src=${avatar_url} alt=${login}>
            <a href=${url}>${login}</a>
        </div>
    </div>
`;
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = html;
    const cardElement = tempContainer.firstElementChild;
    if (cardElement) {
        main_container.insertAdjacentElement("beforeend", cardElement);
    }
    else {
        console.error("Failed to create card element from HTML string");
    }
}
;
async function fetchUserData(url) {
    try {
        const data = await fetchData(url, {});
        for (const obj of data) {
            UI(obj);
        }
    }
    catch (err) {
        console.error(err);
    }
}
fetchUserData("https://api.github.com/users");
formSubmit.addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchItem = getUsername.value.toLocaleLowerCase();
    try {
        const url = "https://api.github.com/users";
        const allUSer = await fetchData(url, {});
        const data = allUSer.filter((item) => item.login.toLocaleLowerCase().includes(searchItem));
        main_container.innerHTML = "";
        for (const obj of data) {
            UI(obj);
        }
    }
    catch (err) {
        console.log(err);
    }
});
