
class GallerySlideShow{
    
    constructor(){
        this.currentCategory;
        this.currentCategoryIndex;
        this.currentIndex;
        this.currentCategoryList = new Array();
        this.currentCategoryImgList = new Array();
        this.setInitialCategory();
        $(".image-box").attr('onclick', 'openModal(this)');
    }

    setInitialCategory(){
        this.changeCategory("image-box");
    }

    displayModal(){
        let currentImageSrcAttr = this.currentCategoryImgList[this.currentIndex].getAttribute('src');
        $("#modal img").attr('src', currentImageSrcAttr);
        $("#modal").show();
    }

    hideModal(){
        $("#modal").hide();
    }

    setNewIndex(selectedImage){
        if (this.currentCategory == "image-box") {
            this.currentIndex = selectedImage.getAttribute('id')-1;
        } else {
            this.currentIndex = selectedImage.getAttribute('data-index')-1;
        }
    }

    updateIndex(value){
        this.currentIndex += value;
        if (this.currentIndex < 0) {
            this.currentIndex = this.currentCategoryImgList.length-1;
        }
        else if(this.currentIndex >= this.currentCategoryImgList.length){
            this.currentIndex = 0;
        }
        this.displayModal(this.currentIndex);
    }

    changeCurrentCategoryImgList(newCategory){
        this.currentCategoryList = document.getElementsByClassName(newCategory);
        this.currentCategoryImgList = [];

        for (let divElement of this.currentCategoryList) {
            this.currentCategoryImgList.push(divElement.getElementsByTagName('img')[0]);
        }
    }

    changeCategory(newCategory){
        this.removeActiveClassFromPrevButton();
        this.changeCurrentCategoryImgList(newCategory);
        this.currentCategory = newCategory;
        this.addActiveClassToCurrentButton();
    }

    removeActiveClassFromPrevButton(){
        $(`.${this.currentCategory}-button`).removeClass("activ");
    }

    addActiveClassToCurrentButton(){
        $(`.${this.currentCategory}-button`).addClass("activ");
    }

    openImage(){
        let url = this.currentCategoryImgList[this.currentIndex].getAttribute('src');
        window.open(url,'_blank');
    }
}


var gallerySlides = new GallerySlideShow();

function filterSeclection(categoryName) {
    $(".image-box").hide();
    $(`.${categoryName}`).show();
    gallerySlides.changeCategory(categoryName);
}

function displayPrevPhoto(){
  gallerySlides.updateIndex(-1);
}

function displayNextPhoto(){
  gallerySlides.updateIndex(1);
}

function closeModal(){
  gallerySlides.hideModal();
}

function openModal(selectedImage) {
  gallerySlides.setNewIndex(selectedImage);
  gallerySlides.displayModal();
  console.log("open modal");
}

function openCurrentImageInNewWindow(){
  gallerySlides.openImage();
}