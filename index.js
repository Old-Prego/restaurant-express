const rButton = document.getElementById('rButton');

rButton.addEventListener('click', (e) => {
    e.preventDefault();

    let rName = document.getElementById('rName').value.trim();
    let rPhone = document.getElementById('rPhone').value.trim();
    let rEmail = document.getElementById('rEmail').value.trim();
    let rID = document.getElementById('rID').value.trim();

    let newReservation = {
        name: rName,
        phone: parseInt(rPhone),
        email: rEmail,
        uniqID: rID,
    };

    fetch('/api/reservations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReservation),
    })
        .then((response) => response.json())
        .then((data) => {
            alert(`Adding Reservation Under: ${data.uniqID}`);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
})
