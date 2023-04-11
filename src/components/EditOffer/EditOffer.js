import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { offerServiceFactory } from "../../services/offerService";

export const EditOffer = () => {

    const navigate = useNavigate();
    const { offerId } = useParams();
    const offerService = offerServiceFactory()
    const [values, setValues] = useState({
        _id: '',
        title: '',
        imageUrl: '',
        city: '',
        price: Number,
        description: ''
    });


    const [errors, setErrors] = useState({
        title: false,
        description: false,
        price: false,
        imageUrl: false,
        city: false,
        serverErrors: false
    });


    const changeHandler = (e) => {
        setValues(state => ({ ...state, [e.target.name]: e.target.value }));
        setErrors(errors => ({ ...errors, [e.target.name]: false, ["serverErrors"]: false }))
    };


    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            if (Object.values(values).some(v => v === '') || Object.values(values).some(v => v === true)) {
                setErrors({ ...errors, ["serverErrors"]: 'All fields must be filled!' });
                return;
            }
            const editOffer = await offerService.edit(offerId, values)


            setValues(editOffer);
            navigate('/offers');
        } catch (error) {
            console.log(error.message);
        }
    }
    const changeValues = (newValues) => {

        setValues(newValues);
    };


    useEffect(() => {
        offerService.getOne(offerId)
            .then(result => {
                changeValues(result);
            });
    }, [offerId]);





    const onErrorHandler = async (e) => {

        if (e.target.name === 'title') {
            if (e.target.value.length < 3) {
                setErrors(errors => ({ ...errors, [e.target.name]: true }));
            }
        }
        if (e.target.name === 'description') {
            if (e.target.value.length < 5) {
                setErrors(errors => ({ ...errors, [e.target.name]: true }));
            }
        }
        if (e.target.name === 'price') {
            if (e.target.value < 10) {
                setErrors(errors => ({ ...errors, [e.target.name]: true }));
        }
    }
        if (e.target.name === 'imageUrl') {
            if (e.target.value.length < 1) {
                setErrors(errors => ({ ...errors, [e.target.name]: true }));
            }
        }

        if (e.target.name === 'city') {
            if (e.target.value.length < 3) {
                setErrors(errors => ({ ...errors, [e.target.name]: true }));
            }
        }
        
    };


    return (
        <section id="edit-page" className="auth">
            <form id="edit" method="post" onSubmit={onSubmit}>
                <div className="container">

                    <h1>Edit Offer</h1>

                    <div className="errors-container">
                        {(errors.title || errors.description || errors.price || errors.imageUrl || errors.serverErrors) &&
                            <div className='errors'>
                                {errors.title &&
                                    <p className="error" >
                                        Title must be at least 5 characters long!
                                    </p>}
                                {errors.city &&
                                    <p className="error" >
                                        City must be at least 3 characters long!
                                    </p>}
                                {errors.description &&
                                    <p className="error" >
                                        Description must be at least 10 characters long!
                                    </p>}
                                {(errors.price) &&
                                    <p className="error" >
                                        Price must be a number and more than 10 EUR!
                                    </p>}
                                {errors.imageUrl &&
                                    <p className="error" >
                                        ImageUrl is required!
                                    </p>}
                                {errors.serverErrors &&
                                    <p className="error" >
                                        {errors.serverErrors}
                                    </p>}
                            </div>}
                    </div>
                    <label htmlFor="title">Offer Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={values.title}
                        onChange={changeHandler}
                        onBlur={onErrorHandler}
                    />

                    <label htmlFor="city">City:</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={values.city}
                        onChange={changeHandler}
                        onBlur={onErrorHandler}
                    />

                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        min="10"
                        value={values.price}
                        onChange={changeHandler}
                        onBlur={onErrorHandler}
                    />

                    <label htmlFor="imageUrl">Image:</label>
                    <input
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                        value={values.imageUrl}
                        onChange={changeHandler}
                        onBlur={onErrorHandler}
                    />

                    <label htmlFor="summary">Summary:</label>
                    <textarea name="description" id="summary" value={values.description} onChange={changeHandler} onBlur={onErrorHandler}></textarea>
                    <input className="btn submit" type="submit" value="Edit Offer" />

                </div>
            </form>

        </section>

    );
};