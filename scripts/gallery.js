const imageFolders = {
    festImages: [

        { path: 'assets/images/project-gallery/festivals/searching.png', descr: 'Search festivals' },
    
        { path: 'assets/images/project-gallery/festivals/explore_fest.png', descr: 'Get basic info about festival' },
        { path: 'assets/images/project-gallery/festivals/explore_fest_2.png', descr: 'Get basic info about festival' },

        { path: 'assets/images/project-gallery/festivals/directions.png', descr: 'Get directions to festival' },
        { path: 'assets/images/project-gallery/festivals/booking-1.png', descr: 'Search for nearby accomodations' },
        { path: 'assets/images/project-gallery/festivals/booking-2.png', descr: 'Search for nearby accomodations' },

        { path: 'assets/images/project-gallery/festivals/public-chat.png', descr: 'Chat with other festival goers' },
        { path: 'assets/images/project-gallery/festivals/chat-emoji.png', descr: 'Chat with other festival goers' },

        { path: 'assets/images/project-gallery/festivals/contact.png', descr: 'Find other people with same interests' },
        { path: 'assets/images/project-gallery/festivals/find-people.png', descr: 'Find other people with same interests' },

        { path: 'assets/images/project-gallery/festivals/festival-forum-1.png', descr: 'Join festival specific forums' },
        { path: 'assets/images/project-gallery/festivals/post-comments-show.png', descr: 'Post previous experiences, ask questions and build the community' },
        { path: 'assets/images/project-gallery/festivals/post-comments-hidden-deleted.png', descr: 'Post previous experiences, ask questions and build the community' },
        { path: 'assets/images/project-gallery/festivals/post-add-comment.png', descr: 'Comment on other users posts' },

        { path:  'assets/images/project-gallery/festivals/home.png', descr: 'Explore festivals' },

    ],
    birdsImages: [

        { path: 'assets/images/project-gallery/bos/home.jpg', descr: 'Explore all the species ever seen in Slovenia (list updated monthly)' },
        { path: 'assets/images/project-gallery/bos/search.jpg', descr: 'Search species by names (sl., en., sci.)' },
        { path: 'assets/images/project-gallery/bos/bird-details.jpg', descr: 'Get information about specific bird' },
        { path: 'assets/images/project-gallery/bos/bird-details-2.jpg', descr: 'Add your sightings and see graph of observations' },
        { path: 'assets/images/project-gallery/bos/30d50km.jpg', descr: 'Explore recent nearby sightings of species' },
        { path: 'assets/images/project-gallery/bos/selected-sighting.jpg', descr: 'Get details about sightings on private locations' },
        { path: 'assets/images/project-gallery/bos/selected-sighting-2.jpg', descr: 'Get details about sightings on birding hotspots' },
        { path: 'assets/images/project-gallery/bos/token.jpg', descr: 'Connect your app with e-bird' },

        { path: 'assets/images/project-gallery/bos/loading.jpg', descr: '' },

    ],
    hikingImages: [

        { path: 'assets/images/project-gallery/hiking/recording.jpg', descr: 'Record your hikes' },
        { path: 'assets/images/project-gallery/hiking/recording-finished.jpg', descr: 'Record your hikes' },
        { path: 'assets/images/project-gallery/hiking/search.jpg', descr: 'Find hiking routes' },
        { path: 'assets/images/project-gallery/hiking/route.jpg', descr: 'See route on maps' },
        { path: 'assets/images/project-gallery/hiking/route-details.jpg', descr: 'Get more details and instructions for selected route' },

        { path: 'assets/images/project-gallery/hiking/loading.jpg', descr: '' },

    ],
};

document.addEventListener('DOMContentLoaded', () => {
    const galleries = [
        document.getElementById('festImages'), 
        document.getElementById('birdsImages'), 
        document.getElementById('hikingImages')
    ];

    galleries.forEach((gallery) => {

        // if no images
        if (imageFolders[gallery.id].length === 0)
            return;

        // change image
        let index = 0;
        const changeImage = () => {
            // description
            gallery.querySelector('p').textContent = imageFolders[gallery.id][index].descr;
            // image

            if (gallery.children[0].className.includes('phone')) {
                gallery.querySelector('.phone img').src = imageFolders[gallery.id][index].path;
            }
            else {
                gallery.querySelector('img').src = imageFolders[gallery.id][index].path;
            }

            index++;
            if (index === imageFolders[gallery.id].length)
                index = 0;
            
        };

        setInterval(changeImage, 2000);
        
    });
});