const imageFolders = {
    festData: [

        { path: 'assets/images/project-gallery/festivals/searching.png', descr: 'Search and filter festivals by criteria like location, dates, genres...' },
    
        { path: 'assets/images/project-gallery/festivals/explore_fest.png', descr: 'Festival overview' },
        { path: 'assets/images/project-gallery/festivals/explore_fest_2.png', descr: 'Festival overview' },

        { path: 'assets/images/project-gallery/festivals/directions.png', descr: 'Map with route to festival' },
        { path: 'assets/images/project-gallery/festivals/booking-1.png', descr: 'Search and filter nearby accomodations' },
        { path: 'assets/images/project-gallery/festivals/booking-2.png', descr: 'List nearby accomodations' },

        { path: 'assets/images/project-gallery/festivals/chat-emoji.png', descr: 'Chat with other festival goers' },

        { path: 'assets/images/project-gallery/festivals/find-people.png', descr: 'Find and contact people with shared interests' },

        { path: 'assets/images/project-gallery/festivals/festival-forum-1.png', descr: 'Discuss with others on festival specific forums' },
        { path: 'assets/images/project-gallery/festivals/post-add-comment.png', descr: 'Engage with community through post replies' },
        { path: 'assets/images/project-gallery/festivals/post-comments-show.png', descr: 'Engage with community through post replies' },
        { path: 'assets/images/project-gallery/festivals/post-comments-hidden-deleted.png', descr: 'Engage with community through post replies' },

        { path:  'assets/images/project-gallery/festivals/home.png', descr: 'Explore festivals' },

    ],
    birdData: [

        { path: 'assets/images/project-gallery/bos/home.jpg', descr: 'Explore all Slovenian bird species - updated monthly' },
        { path: 'assets/images/project-gallery/bos/search.jpg', descr: 'Search species by scientific and common names' },
        { path: 'assets/images/project-gallery/bos/bird-details.jpg', descr: 'Get information about specific bird' },
        { path: 'assets/images/project-gallery/bos/bird-details-2.jpg', descr: 'Add to your sightings and track graph of observations' },

        { path: 'assets/images/project-gallery/bos/token.jpg', descr: 'Connect your app with e-bird' },

        { path: 'assets/images/project-gallery/bos/30d50km.jpg', descr: 'View recent nearby sightings' },
        { path: 'assets/images/project-gallery/bos/selected-sighting.jpg', descr: 'Get details about sightings on private user locations' },
        { path: 'assets/images/project-gallery/bos/selected-sighting-2.jpg', descr: 'Get details about sightings on hotspots' },

        { path: 'assets/images/project-gallery/bos/loading.jpg', descr: 'Discover new birds!' },

    ],
    hikeData: [

        { path: 'assets/images/project-gallery/hiking/recording.jpg', descr: 'Track your hikes' },
        { path: 'assets/images/project-gallery/hiking/recording-finished.jpg', descr: 'Track your hikes' },
        { path: 'assets/images/project-gallery/hiking/search.jpg', descr: 'Find new hiking routes' },
        { path: 'assets/images/project-gallery/hiking/route.jpg', descr: 'View hiking route on map' },
        { path: 'assets/images/project-gallery/hiking/route-details.jpg', descr: 'Get details and instructions for selected route' },

        { path: 'assets/images/project-gallery/hiking/loading.jpg', descr: 'Hiking was never easier!' },

    ],
};

document.addEventListener('DOMContentLoaded', () => {
    const galleries = [
        document.getElementById('festData'), 
        document.getElementById('birdData'), 
        document.getElementById('hikeData')
    ];

    galleries.forEach((gallery) => {

        // if no images
        if (imageFolders[gallery.id].length === 0)
            return;

        // change image
        let index = 0;
        const changeImage = () => {

            gallery.querySelector('.project-image').classList.remove('image-active');

            setTimeout(() => {
                // description
                gallery.querySelector('.project-description i').textContent = imageFolders[gallery.id][index].descr;            
                // image
                gallery.querySelector('.project-image').src = imageFolders[gallery.id][index].path;

                gallery.querySelector('.project-image').classList.add('image-active');
            }, 200);

            index++;
            if (index === imageFolders[gallery.id].length)
                index = 0;
            
        };

        setInterval(changeImage, 5000);
        
    });
});