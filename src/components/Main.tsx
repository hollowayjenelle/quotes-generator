import {FC, useState, useEffect} from 'react';
import {Quote, Image} from './interfaces'


const Main: FC = () => {
    const [quote, setQuote] = useState<Quote>({
        text: "Success isn't about how much money you make; it's about the difference you make in people's lives",
        author: "Michelle Obama"
    })

    const [image, setImage] = useState<Image>({
        collections: 0,
        comments: 0,
        downloads: 0,
        id: 0,
        imageHeight: 0,
        imageSize: 0,
        imageWidth: 0,
        largeImageURL: "https://pixabay.com/get/g84d563f4364aea3bbcae74d095f7ca219f2d852e76bd67991c09145f6ad866a2b2af04e2007fb35e3e74fbf572e23ce58a0f86571f2b701ed10a08a86f37eae7_1280.jpg",
        likes: 0,
        pageURL: '',
        previewHeight: 0,
        previewURL: '',
        previewWidth: 0,
        tags: '',
        user: '',
        userImageURL: '',
        user_id: 0,
        views: 0,
        webformatHeight: 0,
        webformatURL: '',
        webformatWidth: 0
    })

    const [allQuotes, setAllQuotes] = useState<Quote[]>([])
    const [allImages, setAllImages] = useState<Image[]>([])

    useEffect(() => {
        fetch("https://type.fit/api/quotes")
        .then(response => response.json())
        .then(res => setAllQuotes(res))
    }, [])

    useEffect(() => {
        fetch("https://pixabay.com/api/?key=33096621-16e7336a5bd816c5d84d7b47f&q=sunset&image_type=photo&pretty=true")
        .then(response => response.json())
        .then(res => setAllImages(res.hits))
    }, [])

    function getRandomImage(){
        const randomNum = Math.round(Math.random() * allImages.length)
        const randomImg = allImages[randomNum]
        setImage(prevImg => ({
            ...prevImg,
            largeImageURL: randomImg.largeImageURL,
            user: randomImg.user,
            pageURL: randomImg.pageURL
        }))
    }


    function getQuote(){
        getRandomImage()
        const randomNum = Math.round(Math.random() * allQuotes.length)
        const randomQuote = allQuotes[randomNum]
        setQuote({
            text: randomQuote.text,
            author: randomQuote.author
        })
    }

    console.log(image)
    
    return (
        <div className='main-section' style={{backgroundImage: `url(${image.largeImageURL})`, objectFit: "cover", backgroundRepeat:"repeat", transition: "background-image 1s ease-in-out"}}>
            <button className='main-btn' onClick={getQuote}>Get new quote</button>
            <div className='main-circle'>
                <h3 className='quote'>{quote.text}</h3>
                <div className='author-name'>{quote.author === null ? "Unknown" : quote.author}</div>
            </div>
            <footer>
                <a></a>
            </footer>
        </div>
    );
};

export default Main;