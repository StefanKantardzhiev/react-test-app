import { useState, useEffect } from "react";
import { OfferItem } from "../Offer/OfferItem/OfferItem"
import { offerServiceFactory } from "../../services/offerService";

export const Latest = () => {
    const [recent, setRecent] = useState([]);
    const offerService = offerServiceFactory()
    useEffect(() => {
        offerService.getRecent()
            .then(result => {
                setRecent(result)
            })
    }, []);
    return (
        <>
            <h1 id='all-offers'>Latest Offers</h1>
            <section id="catalog-page">
                {recent.map(x =>
                    <OfferItem key={x._id} {...x} />
                )}

                {recent.length === 0 && (
                    <h3 className="no-articles">No articles yet</h3>
                )}
            </section>
        </>
    );
};