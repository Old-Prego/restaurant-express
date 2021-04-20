
fetch(`/api/reservations/`,{
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
})
    .then((response) => response.json())
    .then((data) => {
        var tableID = document.getElementById('tblID');
        console.log(data)
        console.log(data[0].uniqID);
        tableID.textContent = data[0].uniqID;

    });