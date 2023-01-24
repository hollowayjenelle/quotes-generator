import {FC, useState, useEffect} from 'react';

interface Quote{
    text: string,
    author: string
}

const Main: FC = () => {
    const [quote, setQuote] = useState<Quote>({
        text: "",
        author: ""
    })

    const [allQuotes, setAllQuotes] = useState<Quote[]>([])

    useEffect(() => {
        fetch("https://type.fit/api/quotes")
        .then(response => response.json())
        .then(res => setAllQuotes(res))
    }, [])

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