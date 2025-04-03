document.addEventListener('DOMContentLoaded', () => {

})

document.addEventListener("DOMContentLoaded", () => {
    fetchDogs(); // Load existing dogs on page load
});

function fetchDogs() {
    fetch("http://localhost:3000/dogs")
        .then(res => res.json())
        .then(dogs => renderDogs(dogs));
}

function renderDogs(dogs) {
    const tableBody = document.getElementById("dog-table-body");
    tableBody.innerHTML = ""; // Clear previous entries

    dogs.forEach(dog => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${dog.name}</td>
            <td>${dog.breed}</td>
            <td>${dog.sex}</td>
            <td><button onclick="editDog(${dog.id})">Edit</button></td>
        `;
        tableBody.appendChild(row);
    });
}

function editDog(id) {
    fetch(`http://localhost:3000/dogs/${id}`)
        .then(res => res.json())
        .then(dog => {
            document.getElementById("dog-form").dataset.id = dog.id;
            document.getElementById("name").value = dog.name;
            document.getElementById("breed").value = dog.breed;
            document.getElementById("sex").value = dog.sex;
        });
}

document.getElementById("dog-form").addEventListener("submit", function (event) {
    event.preventDefault();
    
    let id = this.dataset.id;
    let updatedDog = {
        name: document.getElementById("name").value,
        breed: document.getElementById("breed").value,
        sex: document.getElementById("sex").value
    };

    fetch(`http://localhost:3000/dogs/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedDog)
    }).then(() => fetchDogs()); // Refresh table after updating
});
