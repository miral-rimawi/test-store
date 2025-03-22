const getCategories = async () => {
    try{
    const {data} = await axios.get("https://fakestoreapi.com/products/categories");
    return data;
     }catch(error){
        return [];
    }
}
const displayCategories = async () => {
    try{
    const categories = await getCategories();
    const result = categories.map((category) => {
        return  `<div class="category">
        <a href="./details.html?category=${category}">${category}</a>
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

// window.onscroll=function(){
//     const header = document.querySelector(".header");
//     const cover = document.querySelector(".cover");
//     if (window.scrollY > cover.offsetTop){
//         header.classList.add("scrolling");
//     } else{
//         header.classList.remove("scrolling");
//     }

// }
