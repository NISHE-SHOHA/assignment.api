        //error measege
document.getElementById('error-message').style.display = 'none';

        //search book
const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    // clear data
    searchField.value = '';
    document.getElementById('error-message').style.display = 'none';
    if(searchText == '') {
        document.getElementById('error-message').style.display = 'block';
    }
    else{
            //load data
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
   .then(res => res.json())
   .then(data =>{
             if(data.docs.length <= 0) {
            document.getElementById('error-message').style.display = 'block';   
            }
            else{
            displaySearchResult(data.docs, data)  
            }
        })
    }      
}

const displaySearchResult = (books, data) => {
    const searchResult = document.getElementById('search-result')
    const searchFound = document.getElementById('search-found')
    searchResult.textContent = '';

    if(books.length == 0) {
        return 'No Result Found'
    }
    else{
        const h5 = document.createElement('h5')
        h5.innerHTML = `
        <h5 class="mt-3 pb-3 text-warning">Search Result Found: ${data.numFound}</h5>
        `;
        searchFound.appendChild(h5)

        books.slice(0, 20).forEach(book => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                <div class="card h-100 w-100 shadow p-3 mb-5 bg-light rounded">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg"class="card-img-top" alt="..."> 
                <div class="card-body">
                <h3 class="fw-bold"><span>Title:</span> ${book.title}</h3>
                <h5 class="fw-bold card-title"><span>Author:</span> ${book.author_name}</h5>
                <h5 class="fw-bold card-title"><span>Publisher:</span> ${book.publisher}</h5>
                <p class="fw-bold card-title"><span>Publish Year:</span>${book.publish_year}</p>
                </div>
                </div>`;
             searchResult.appendChild(div); 
             })
        }
    }
    
