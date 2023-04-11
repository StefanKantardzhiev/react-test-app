import { OfferItem } from "./OfferItem/OfferItem"
import { useState, useEffect } from "react";
import { offerServiceFactory } from '../../services/offerService'


export const Offer = () => {



    const [offers, setOffers] = useState([]);
    const [query, setQuery] = useState("")



    const offerService = offerServiceFactory()

    useEffect(() => {
        offerService.getAll()
            .then(result => {
                setOffers(result)
            })
    }, []);

    const onChangeHandler = (e) => {
        setQuery(e.target.value);
    };

    const filteredData = offers.filter(offer => {

        if (offer.title === "") {
            return offer
        } else if (offer.title.toLowerCase().includes(query.toLowerCase())) {
            //returns filtered array
            return offer
        }
    });



    

    return (

        <>
            <h1 id='all-offers'>All Offers</h1>
            <div id="search">
                <label htmlFor="search" >Search:</label>
                <input
                    type="text"
                    name="search"
                    placeholder="Filter Change"
                    onChange={onChangeHandler}
                /></div>
            <section id="catalog-page">

                {filteredData.map(x =>
                    <OfferItem key={x._id} {...x} />
                )}
                {filteredData.length === 0 || filteredData === null && (
                    <h3 className="no-articles">No articles yet</h3>
                )}
            </section >

        </>
    );
};