import Axios, { AxiosResponse } from 'axios';
import 'formdata-polyfill';

/*
 * Response format for the Checkout Image API.
 */
interface OptimizedCheckoutImageUploadResponse {
    data: {
        imageUrl: string;
    };
}

/*
 * Upload an image file. This endpoint is only prepared to handle optimizedCheckout images.
 */
const optimizedCheckoutImageUploadRoute = '/internalapi/v1/themeeditor/images';

export function uploadImage(fieldName: string, image: File) {
    const formData = new FormData();
    formData.set(fieldName, image);

    return Axios.post(
        optimizedCheckoutImageUploadRoute,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
    ).then((response: AxiosResponse<OptimizedCheckoutImageUploadResponse>) => {
        return response.data.data.imageUrl;
    });
}
