import {FC, useState, useEffect} from 'react';

interface Quote{
    q: string,
    a: string,
    h: string
}

const Main: FC = () => {
    const [quote, setQuote] = useState<Quote>({
        q: "",
        a: "",
        h: ""
    })

    const [allQuotes, setAllQuotes] = useState<Quote[]>([])

    useEffect(() => {
        fetch("https://zenquotes.io/api/quotes")
        .then(res => res.json())
        .then(data => setAllQuotes(data))
    })

    
    
    return (
        <div>
            
        </div>
    );
};

export default Main;