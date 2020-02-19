

function Gallery(images, container) {
        this.images = images;
        this.container = container;
        this.initializeGallery();
        this.startListeningOnThumbnails();
}
Gallery.prototype.initializeGallery = function() {
    this.createDomPlaceholders();
    this.loadMainImage();
    this.loadThumbnails();
};

Gallery.prototype.createDomPlaceholders = function() {
    //Create a large pic dom node inside container
    //Create a div with thumbnails inside
    
    this.mainImgContainer = document.createElement('div');
    this.mainImgContainer.classList.add("main-img-container");
    this.thumbnailsContainer = document.createElement('div');
    this.thumbnailsContainer.classList.add("thumbnails-container");
    this.container.appendChild(this.mainImgContainer);
    this.container.appendChild(this.thumbnailsContainer);

};

Gallery.prototype.loadMainImage = function(){
    this.mainImage = document.createElement('img');
    this.mainImage.src = this.images[0];
    this.mainImgContainer.appendChild(this.mainImage);
}


Gallery.prototype.loadThumbnails = function(){
    for(let image of this.images){
        var imageDom = document.createElement('img');
        imageDom.src = image;
        this.thumbnailsContainer.appendChild(imageDom);
    }
};

Gallery.prototype.startListeningOnThumbnails = function() {
    // save the reference of this so that it will not  change its definition
    var self = this;
    this.thumbnailsContainer.addEventListener('click', function(event){
        if(event.target instanceof HTMLImageElement){
            self.mainImage.src = event.target.src;
        }
    })
};