function Gallery(images, container) {
    this.images = images;
    this.container = container;
    this.initializeGallery();
    this.startListeningOnThumbnails();
}

Gallery.prototype.initializeGallery = function () {
    this.createDomPlaceholders();
    // this.mainImage.src = this.images[0];
    this.loadThumbnails();
};

Gallery.prototype.createDomPlaceholders = function () {
    //Create a large pic dom node inside container
    //Create a div with thumbnails inside
    let mainImageTemplate = document.querySelector('#overlay-container');
    let mainImageDocFragment = mainImageTemplate.content.cloneNode(true);
    this.mainImgContainer = mainImageDocFragment.querySelector('.full-overlay');
    this.mainImgContainer.style.display = "none";
    this.mainImage = mainImageDocFragment.querySelector('.full-overlay .full-image');
    this.closeButton = mainImageDocFragment.querySelector('.full-overlay .close-button');
    this.leftarrowButton = mainImageDocFragment.querySelector('.full-overlay .arrow-left');
    this.rightarrowButton = mainImageDocFragment.querySelector('.full-overlay .arrow-right');
    document.body.appendChild(mainImageDocFragment);

    this.thumbnailsContainer = document.createElement('div');
    this.thumbnailsContainer.classList.add("thumbnails-container");
    this.container.appendChild(this.thumbnailsContainer);

};

Gallery.prototype.loadThumbnails = function () {
    for (let index in this.images) {
        var image = this.images[index];
        var imageDom = document.createElement('img');
        imageDom.src = image;
        imageDom.dataset["index"] = index;
        this.thumbnailsContainer.appendChild(imageDom);
    }
};

Gallery.prototype.loadImageAtIndex = function (index) {
    let url = this.images[index];
    this.mainImage.src = url;
    this.mainImage.dataset.index = index;
};

Gallery.prototype.loadPreviousImage = function () {
    let index = parseInt(this.mainImage.dataset.index);
    let previousIndex = index == 0 ? this.images.length - 1 : index - 1;
    this.loadImageAtIndex(previousIndex);
};

Gallery.prototype.loadNextImage = function () {
    let index = parseInt(this.mainImage.dataset.index);
    let nextIndex = index == self.images.length - 1 ? 0 : index + 1;
    this.loadImageAtIndex(nextIndex);
};

Gallery.prototype.startListeningOnThumbnails = function () {
    // save the reference of this so that this will not  change its definition
    var self = this;
    this.thumbnailsContainer.addEventListener('click', function (event) {
        if (event.target instanceof HTMLImageElement) {
            self.mainImage.src = event.target.src;
            self.mainImgContainer.style.display = "block";
            self.mainImage.dataset.index = event.target.dataset.index;
        }
    })
    this.closeButton.addEventListener('click', function () {
        self.mainImgContainer.style.display = "none";
    })
    this.leftarrowButton.addEventListener('click', function (event) {
        self.loadPreviousImage();
    })
    this.rightarrowButton.addEventListener('click', function (event) {
        self.loadNextImage();
    })
    document.addEventListener('keydown', function (event) {
        if (event.keyCode == 27) {
            self.mainImgContainer.style.display = "none";
        }
        else if (event.keyCode == 37) {
            self.loadPreviousImage();
        } else if (event.keyCode == 39) {
            self.loadNextImage();
        }
    })
};