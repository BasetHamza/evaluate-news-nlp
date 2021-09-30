function handleSubmit(event) {

    // Preventing the default action
    event.preventDefault()

    // check what text was put into the form field
    let url = document.getElementById('url').value
    
    if ( Client.checkURL(url) ) // Verify that the text entered is a valid url
    {
        console.log("::: Form Submitted :::")

        /*
         * Calling the async function with POST method to send the url 
         * entered by the user to the server to be analyzed.
         */
        postData('http://localhost:8081/addData', { url })
        // .then(fetch('http://localhost:8081/test'))
        .then(res => res.json())
        .then(
            // update the UI
            updateUI()
        )
    } else {
        alert("Please enter a valid URL!");
    }
}

// A function to update the UI.
const updateUI = async () =>{

    // Sending an async request to get all the data from the server. 
    // The returned data should include analysis of the entered url.
    const request = await fetch('http://localhost:8081/all');

    
    try{
        const allData = await request.json();
        console.log(allData);
        
        document.getElementById('results').innerHTML = allData
    } catch(error){
        console.log("error",error);
    }
}

const postData = async ( url = '', data = {})=>{
    const response = await fetch(url, {
    method: 'POST',  // GET, POST, PUT, DELETE, etc.
    credentials: 'same-origin', // include, same-origin, omit
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json', // We as saying that the application to run on JSON data.
    },
   // Body data type must match "Content-Type" header (JSON). Because servers deal with that as
   // Strings and we want to deal with JSON, we use the method
   // JSON.stringify() to turn our data into JSON data.       
    body: JSON.stringify(data), 
    });


console.log(response);
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch(error) {
        console.log("error", error);
    }
}

export { handleSubmit }
