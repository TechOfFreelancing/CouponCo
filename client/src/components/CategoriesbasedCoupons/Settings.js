const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    
    responsive: [
        {
            breakpoint: 480, // Mobile
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
               
            },
        },
        {
            breakpoint: 768, // Tablet
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 1200, // Laptop
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
               
            },
        },
        {
            breakpoint: 1600, // Desktop
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
               
            },
        },
    ]
};

export default settings;