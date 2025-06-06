document.addEventListener('DOMContentLoaded', () => {

    let i = 1;
    const imageList = document.querySelectorAll('.characters article');

    const changeSelectedImage = () => {
        imageList.forEach(image => {
            image.classList.remove('selectedImage');
        });

        imageList[i].classList.add('selectedImage');

        i++;

        if (i === 3)
            i = 0;
    };

    setInterval(changeSelectedImage, 3000);
});