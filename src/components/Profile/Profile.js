import { useState, useContext, useEffect } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import { offerServiceFactory } from '../../services/offerService'
import { OfferItem } from "../Offer/OfferItem/OfferItem"



export const Profile = () => {


    const context = useContext(AuthContext)
    const user = context.user
    const [offers, setOffers] = useState([])


    const offerService = offerServiceFactory()

    useEffect(() => {
        let ownerArr = []
        offerService.getAll()
            .then(data => {
                data.map(offer => {
                    if (offer._ownerId === user._id) {
                        ownerArr.push(offer)
                    }
                })
                setOffers(ownerArr)
            })
    }, []);



    return (
        <div className="profile">
            < div className="card" >
                <h1>{user.email}</h1>

                <h1>Your Offers</h1>
                <div className="your_items">
                    <div className="item_box">
                        {
                            offers.map(x =>
                                <OfferItem key={x._id} {...x} />
                            )
                        }
                        {
                            offers.length === 0 && (
                                <h3 className="no-articles">No articles yet</h3>
                            )
                        }
                    </div>
                </div >
            </div >
        </div>
    )
}