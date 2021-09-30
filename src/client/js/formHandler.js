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
        const analysis = await request.json();
        
        document.getElementById('agreement').innerHTML = `Agreement: ${analysis.agreement}`
        document.getElementById('subjectivity').innerHTML = `Subjectivity: ${analysis.subjectivity}` 
        document.getElementById('confidence').innerHTML = `Confidence: ${analysis.confidence}` 
        document.getElementById('irony').innerHTML = `Irony: ${analysis.irony}` 
        document.getElementById('score').innerHTML = `Global Polarity: ${analysis.score_tag} -  ${polarityResolver(analysis.score_tag)}` 
    } catch(error){
        console.log("error",error);
    }
}


const polarityResolver = (score_tag) => {
    
    switch(score_tag){
        case 'P+'   : return 'strong positive';
        case 'P'    : return 'positive';
        case 'NEU'  : return 'neutral';
        case 'N'    : return 'negative';
        case 'N+'   : return 'strong negative';
        case 'NONE' : return 'without polarity';
        default     : return "This is an invalid score tag!";
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

export { handleSubmit, updateUI, polarityResolver }
