import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext'
import { offerServiceFactory } from '../../services/offerService';





export const OfferDetails = () => {

    const { offerId } = useParams()

    const context = useContext(AuthContext)
    const user = context.user

    const [offer, setOffer] = useState([])
    const [likes, setLikes] = useState([]);
    const [isLiked, setIsLiked] = useState(false);


    const navigate = useNavigate()
    const offerService = offerServiceFactory()

    useEffect(() => {
        offerService.getOne(offerId)
            .then(data => {
                setOffer(data)
                setLikes(data.likes)
                setIsLiked(data.likes.includes(user._id));
            })
    }, []);


    // useEffect(() => {
    //     offerService.getOne(offerId)
    //         .then(data => {
    //             setComment(data.comments)
    //             console.log(data)
    //         })
    // }, [offers]);

    // const changeHandler = (e) => {
    //     setComment(e.target.value);

    // };

    const isOwner = offer._ownerId === user._id;
    const token = user.accessToken


    const onDeleteClick = async () => {
        await offerService.delete(offer._id);
        navigate('/offers');
    }



    const onLike = async (e) => {
        e.preventDefault();
        try {
            offerService.likeOffer(offer._id, token)
                .then(data => {
                    setLikes(data);
                    setIsLiked(true)
                })
            navigate(`/offers`)
        } catch (error) {
            console.log(error.message);
        }
    }



    // const onDislike = async (e) => {
    //     e.preventDefault();
    //     try {
    //         offerService.dislikeOffer(offer._id, token)
    //             .then(data => {
    //                 setLikes(data);
    //                 // setIsLiked(false);
    //                 // setIsLiked(true);
    //             })
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // }

    return (
        <section id="offer-details">
            <h1>Offer Details</h1>
            <div className="info-section">
                <div className="offer-header">
                    <img className="offer-img" src={offer.imageUrl} alt='offer-image' />
                    <h1>{offer.title}</h1>
                    <p className="type">{offer.city}</p>
                    <p className="text">{offer.description}</p>
                    <p className="text">{offer.price} EUR</p>
                    {isOwner && (
                        <div className="buttons">
                            <Link to={`/offers/${offer._id}/edit`} className="button">Edit</Link>
                            <button className="button" onClick={onDeleteClick}>Delete</button>
                        </div>

                    )}
                    {!isOwner && !isLiked && (
                        <>
                            <button className="button" type="submit" onClick={onLike}>Like</button>

                        </>)}
                    {/* <button className="button" type="submit" onClick={onDislike}>Dislike</button> */}
                    <span className="likes">Likes: {likes.length}</span>
                </div>
            </div>
            {/* <article className="create-comment">
                    <label>Add new comment:</label>
                    <form className="form" onSubmit={onSubmitHandler}>
                        <textarea name="comment" placeholder="Comment......" value={comment} onChange={changeHandler}></textarea>
                        <input className="btn submit" type="submit" value="Add Comment" />
                    </form>
                </article> */}
            {/* {offerLikes.includes('user._id')} */}

            {/* {isAuthenticated && <AddComment onCommentSubmit={onCommentSubmit} />} */}

        </section >
    );
};