const getCategoryProducts = async () =>{
    try{
    const urlParams = new URLSearchParams(window.location.search);
    const categoryName = urlParams.get('category'); // ?category= test
    const {data} = await axios.get(`https://fakestoreapi.com/products/category/${categoryName}`);
    return data;
    }catch(error){
        return [];
    }
}

const displayProducts = async () => {
    try{
    const products = await getCategoryProducts();
    const result =products.map((product) => {
        return `<div class="product">
        <img src="${product.image}" alt="${product.title}" class="product-image">
        <h2>Product Name:  ${product.title}</h2>
        <p>Price: ${product.price}</p>
        </div>`
    }).join('');
    document.querySelector(".products .row").innerHTML = result;
    console.log(products);
    }catch(error){
    document.querySelector(".categories .row").innerHTML = "<p>Please try again....</p>"
   
    }finally{
   document.querySelector(".loading").classList.add("d-none");
    }
    customModal()
}

displayProducts();

function customModal(){
    const modal = document.querySelector(".my-modal");
    const closeBtn = document.querySelector(".x-btn");
    const leftBtn = document.querySelector(".left-btn");
    const rightBtn = document.querySelector(".right-btn");
    const images = Array.from (document.querySelectorAll(".product-image")); //to convert the Node List to array
    let currentIndex=0
    // console.log(images); the output is NodeList
    
    
    images.forEach(function(img){
       img.addEventListener('click', (e) =>{
        modal.querySelector("img").setAttribute("src",e.target.src);
        modal.classList.remove("d-none");
        const currentImg= e.target;
        currentIndex=images.indexOf(currentImg);
        
       })
    });


    closeBtn.addEventListener("click",(e)=>{
        modal.classList.add("d-none");
    });

    rightBtn.addEventListener("click",(e)=>{
        currentIndex++;
        if(currentIndex >= images.length){
            currentIndex=0;
        }
        const src= images[currentIndex].getAttribute("src");
        modal.querySelector("img").setAttribute("src",src);
    });

    leftBtn.addEventListener("click",(e)=>{
        currentIndex--;
        if(currentIndex < 0){
            currentIndex= images.length - 1;
        }
        const src= images[currentIndex].getAttribute("src");
        modal.querySelector("img").setAttribute("src",src);
    });


    document.addEventListener("keydown", (e) => {
        if (e.code == "ArrowRight"){
            currentIndex++;
        if(currentIndex >= images.length){
            currentIndex=0;
        }
        const src= images[currentIndex].getAttribute("src");
        modal.querySelector("img").setAttribute("src",src);

        }else if (e.code == "ArrowLeft"){
            currentIndex--;
        if(currentIndex < 0){
            currentIndex= images.length - 1;
        }
        const src= images[currentIndex].getAttribute("src");
        modal.querySelector("img").setAttribute("src",src);
        }else if (e.code == "Escape"){
            modal.classList.add("d-none");
        }
    });


}
// window.onscroll=function(){
//     const header = document.querySelector(".header");
//     const product = document.querySelector(".product");
//     if (window.scrollY > product.offsetTop){
//         header.classList.add("scrolling");
//     } else{
//         header.classList.remove("scrolling");
//     }

// }
