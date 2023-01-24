import {FC, useState, useEffect} from 'react';
import {Quote, Image} from './interfaces'


const Main: FC = () => {
    const [quote, setQuote] = useState<Quote>({
        text: "",
        author: ""
    })

    const [allQuotes, setAllQuotes] = useState<Quote[]>([])
    const [allImages, setAllImages] = useState<Image[]>([])

    useEffect(() => {
        fetch("https://type.fit/api/quotes")
        .then(response => response.json())
        .then(res => setAllQuotes(res))
    }, [])

    useEffect(() => {
        fetch("https://pixabay.com/api/?key=33096621-16e7336a5bd816c5d84d7b47f&q=beach&image_type=photo&pretty=true")
        .then(response => response.json())
        .then(res => setAllImages(res.hits))
    })

    function getRandomImage(){
        const randomNum = Math.round(Math.random() * allImages.length)

    }

    function getQuote(){
        const randomNum = Math.round(Math.random() * allQuotes.length)
        const randomQuote = allQuotes[randomNum]
        setQuote({
            text: randomQuote.text,
            author: randomQuote.author
        })
    }
    
    return (
        <div className='main-section'>
            <button onClick={getQuote}>Get new quote</button>
            <div className='main-circle'>
                <h2>{quote.text}</h2>
                <h4>{quote.author}</h4>
            </div>
        </div>
    );
};

export default Main;