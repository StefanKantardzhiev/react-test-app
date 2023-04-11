import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { offerServiceFactory } from '../../services/offerService'

export const Create = ({ user }) => {

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: Number,
        city: '',
        imageUrl: '',
        _ownerId: user._id
    });
    const [errors, setErrors] = useState({
        title: false,
        description: false,
        price: false,
        imageUrl: false,
        city: false,
    });



    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors(errors => ({ ...errors, [e.target.name]: false }))
    };
    const offerService = offerServiceFactory();


    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            await offerService.create(formData)
            navigate('/offers');
        } catch (error) {
            console.log(error.message);
        }
    }

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
        <section id="create-page" className="auth" >
            <form id="create" method="post" onSubmit={onSubmitHandler}>
                <div className="container">
                    <h1>Create an offer</h1>
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
                    <label htmlFor="leg-title">Offer title:</label>
                    <input onChange={changeHandler} type="text" id="title" name="title" placeholder="Enter offer title..." onBlur={onErrorHandler} />

                    <label htmlFor="category">City:</label>
                    <input onChange={changeHandler} type="text" id="category" name="city" placeholder="Enter offer city..." onBlur={onErrorHandler} />

                    <label htmlFor="levels">Price:</label>
                    <input onChange={changeHandler} type="number" id="maxLevel" name="price" min="1" placeholder="1" onBlur={onErrorHandler} />

                    <label htmlFor="game-img">Image:</label>
                    <input onChange={changeHandler} type="text" id="imageUrl" name="imageUrl" placeholder="Upload a photo..." onBlur={onErrorHandler} />

                    <label htmlFor="summary">Description:</label>
                    <textarea name="description" id="summary" onChange={changeHandler} onBlur={onErrorHandler}></textarea>
                    <input className="btn submit" type="submit" value="Create Offer" />
                </div>
            </form>
        </section >
    );
};
