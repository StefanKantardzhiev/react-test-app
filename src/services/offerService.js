import { requestFactory } from './requester';

const baseUrl = 'http://localhost:3030/offers';

export const offerServiceFactory = (token) => {
    const request = requestFactory(token);

    const getAll = async () => {
        const result = await request.get(`${baseUrl}`);
        const offers = Object.values(result);

        return offers;
    };

    const getRecent = async () => {
        const result = await request.get(`${baseUrl}/recent`);
        const offers = Object.values(result);

        return offers;
    };


    const getByOwner = async () => {
        const result = await request.get(`${baseUrl}/profile`);
        const offers = Object.values(result);

        return offers;
    };

    const getOne = async (offerId) => {
        const result = await request.get(`${baseUrl}/${offerId}`);

        return result;
    };

    const create = async (offerData) => {

        const result = await request.post(`${baseUrl}/create`, offerData);

        return result;
    };
    const addComment = (offerId, comment) => {
        const result = request.post(`${baseUrl}/${offerId}/comment`, { comment })
        return result
    }



    const likeOffer = async (offerId, token) => {
        try {
            const response = await fetch(`${baseUrl}/${offerId}/like`, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': token
                }
            });
            const result = await response.json();
            console.log(result);
            return result;
        } catch (error) {

            return error;
        }
    };


    const dislikeOffer = async (offerId) => {
        try {
            const response = await fetch(`${baseUrl}/${offerId}/dislike`)
            const result = await response.json();
            return result;
        } catch (error) {

            return error;
        }
    };



    const edit = (offerId, data) => request.put(`${baseUrl}/${offerId}`, data);

    const deleteOffer = (offerId) => request.delete(`${baseUrl}/${offerId}`);

    return {
        getAll,
        getByOwner,
        getRecent,
        getOne,
        create,
        edit,
        addComment,
        likeOffer,
        dislikeOffer,
        delete: deleteOffer,
    };
}