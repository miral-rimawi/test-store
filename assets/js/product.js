const getProducts = async () => {
    try{
    const {data} = await axios.get("https://fakestoreapi.com/products?limit=5");
    return data;
     }catch(error){
        return [];
    }
}
const displayProducts = async () => {
    try{
    const products = await getProducts();
    const result = categories.map((product) => {
        return  `<div class="product">
        <a href="./details.html?category=${product}">${category}</a>
        </div>`
    }).join('');
   
    document.querySelector(".navbar .left-part").innerHTML = result;
    document.querySelector(".navbar .right-part").innerHTML = `<a href="./index.html">Home </a> <a href="./product.html">All Products </a>`;
    
    console.log(categories);
}
catch(error){
         document.querySelector(".categories .row").innerHTML = "<p>Please try again....</p>"
        
    }finally{
        document.querySelector(".loading").classList.add("d-none");
}
}
displayCategories();
