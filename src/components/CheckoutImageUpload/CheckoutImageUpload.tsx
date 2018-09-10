import React, { ChangeEvent, Component } from 'react';
import uuid from 'uuid';

import { ThemeConfigChange } from '../../actions/theme';
import { trackImageUpload } from '../../services/analytics';
import { uploadImage } from '../../services/optimizedCheckout';
import { LoadingIndicator } from '../LoadingIndicator/LoadingIndicator';

import {
    CheckoutImageInputWrapper,
    CheckoutImagePreviewWrapper,
    CheckoutImageRemoveLink,
    CheckoutImageUploadError,
    CheckoutImageUploadWrapper,
    UploadButtonLabel
} from './styles';

export interface CheckoutImageUploadProps {
    imageURL?: string;
    inputId?: string;
    label: string;
    name: string;
    testId?: string;
    onChange(configChange: ThemeConfigChange): void;
}

interface CheckoutImageUploadState {
    error?: Error;
    inputId: string;
    loading: boolean;
    pendingImageURL?: string;
    testId?: string;
    value: string;
}

class CheckoutImageUpload extends Component<CheckoutImageUploadProps, CheckoutImageUploadState> {
    readonly state: CheckoutImageUploadState = {
        inputId: this.props.inputId || uuid(),
        loading: false,
        testId: this.props.testId,
        value: '',
    };

    broadcastImageChange = (imageURL: string) => {
        this.props.onChange({
            setting: {
                id: this.props.name ,
                type: 'optimizedCheckout-image',
            },
            value: imageURL,
        });
    };

    clearInput = (callback?: () => void) => {
        this.setState({
            loading: false,
            pendingImageURL: undefined,
            value: '',
        }, callback);
    };

    handleChangeImage = (event: ChangeEvent<HTMLInputElement>): void => {
        // Skip this handler if there are no files in the change event.
        if (!event.target.files) {
            return;
        }

        // Select the image from the file list, this is designed for a single image
        const image: File = event.target.files[0];
        // Set the internal input state.

        this.setState({
            error: undefined,
            loading: true,
            value: event.target.value,
        }, () => {
            // Send the upload to the server, once we get the response imageURL, we can broadcast a theme setting update
            uploadImage(this.props.name, image)
                .then((pendingImageURL: string) => {
                    this.setState({
                        loading: false,
                        pendingImageURL,
                        value: '',
                    }, () => {
                        trackImageUpload(this.props.name, image.name);
                        this.broadcastImageChange(pendingImageURL);
                    }
                    );
                })
                .catch((error: Error) => {
                    this.setState({
                        error,
                        loading: false,
                        pendingImageURL: undefined,
                        value: '',
                    });
                });
        });
    };

    handleRemoveImage = () => {
        // TODO: we should confirm this using a modal, using window.confirm is not easily testable with jsdom.
        // See: https://github.com/jsdom/jsdom/issues/1843
        this.clearInput(() => {
            trackImageUpload(this.props.name, '');
            this.broadcastImageChange('');
        });
    };

    componentDidUpdate({ imageURL: prevImageURL }: CheckoutImageUploadProps) {
        if (this.props.imageURL !== prevImageURL) {
            this.clearInput();
        }
    }

    render() {
        const { imageURL: currentImageURL, label } = this.props;
        const {
            error,
            inputId,
            loading,
            pendingImageURL,
            testId,
        } = this.state;

        // If we have a pending image, we want to display that rather than the previous.
        const imageURLTemplate = pendingImageURL ? pendingImageURL : (currentImageURL || '');
        const imageURL = imageURLTemplate.replace('{:size}', '200x200');

        return (
            <CheckoutImageUploadWrapper>
                <CheckoutImageInputWrapper>
                    <UploadButtonLabel htmlFor={inputId}>
                        Upload image
                    </UploadButtonLabel>

                    <small>{label}</small>

                    <input
                        id={inputId}
                        onChange={this.handleChangeImage}
                        style={{display: 'none'}}
                        type={'file'}
                        value={this.state.value}
                        {...(testId ? {'data-test-id': testId} : {})}
                    />
                </CheckoutImageInputWrapper>

                {error &&
                    <CheckoutImageUploadError>
                        There was an error uploading your image, please try again.
                    </CheckoutImageUploadError>
                }

                <CheckoutImagePreviewWrapper>
                    {loading
                        ? <LoadingIndicator />
                        : (imageURL &&
                            <div>
                                <div>
                                    <CheckoutImageRemoveLink onClick={this.handleRemoveImage}>
                                        Clear image
                                    </CheckoutImageRemoveLink>
                                </div>
                                <img src={imageURL} />
                            </div>
                        )
                    }
                </CheckoutImagePreviewWrapper>
            </CheckoutImageUploadWrapper>
        );
    }
}

export default CheckoutImageUpload;
