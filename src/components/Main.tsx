import {FC, useState, useEffect} from 'react';
import {Quote, Image} from './interfaces'


const Main: FC = () => {
    const [quote, setQuote] = useState<Quote>({
        text: "",
        author: null
    })

    const [image, setImage] = useState<Image>({
        collections: 0,
        comments: 0,
        downloads: 0,
        id: 0,
        imageHeight: 0,
        imageSize: 0,
        imageWidth: 0,
        largeImageURL: "",
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
        setImage(randomImg)
    }


    function getQuote(){
        const randomNum = Math.round(Math.random() * allQuotes.length)
        const randomQuote = allQuotes[randomNum]
        setQuote({
            text: randomQuote.text,
            author: randomQuote.author
        })
        getRandomImage()
    }

    console.log(image)
    
    return (
        <div className='main-section' style={{backgroundImage: `url(${image.largeImageURL})`, objectFit: "cover", backgroundRepeat:"repeat", transition: "background-image 2s ease-in-out"}}>
            <button className='main-btn' onClick={getQuote}>Get new quote</button>
            <div className='main-circle'>
                <h3 className='quote'>{quote.text === '' ? `Click 'Get new quote' to get your first quote` : quote.text}</h3>
                <div className='author-name'>{quote.author === null ? "Unknown" : quote.author}</div>
            </div>
            <p className='footer-credit'>Photo by <a href={image.pageURL === '' ? '#' : image.pageURL}>{image.user === '' ? "-" : image.user}</a></p>
        </div>
    );
};

export default Main;