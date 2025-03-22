const getProducts = async(page) =>{
    try{
    const skip = (page - 1 ) * 5 ;
    const {data} = await axios.get(`https://fakestoreapi.com/products?limit=5&skip=${skip}`);
    return data;
    }catch(error){
        return [];
    }
}

const displayProducts = async(page=1) =>{
    const products = await getProducts(page);
    const numberOfPages= 20/5;
    // console.log(numberOfPages);
    const result = products.map(product =>
         `<div class="product">
        <img src= "${product.image}"  class= "product-image"/>
        <h2 class= "product-name">Product Name: ${product.title}</h2>
        <p>Price: ${product.price}</p>
        </div>`
    ).join("");
    
    document.querySelector(".products .row").innerHTML = result;
    document.querySelector(".loading").classList.add("d-none");
   
   customModal(); 

   let paginationLink =`<li><button>&lt;</button></li>`;
   for (let i=1;i<=numberOfPages;i++){
    console.log(i);
    paginationLink +=`<li><button onclick=displayProducts(${i})>${i}</button></li>`
   }
   
   paginationLink +=`<li><button>&gt;</button></li>`;
   document.querySelector(".pagination").innerHTML= paginationLink;
   //console.log(paginationLink);
   
}

displayProducts();

function customModal(){
    const modal = document.querySelector(".my-modal");
    const closeBtn = document.querySelector(".x-btn");
    const leftBtn = document.querySelector(".left-btn");
    const rightBtn = document.querySelector(".right-btn");
    const images = Array.from (document.querySelectorAll(".product-image")); //to convert the Node List to array
    let currentIndex=0 // console.log(images); the output is NodeList
    
    images.forEach(function(img){
       img.addEventListener('click', (e) =>{
        console.log("hi");
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

