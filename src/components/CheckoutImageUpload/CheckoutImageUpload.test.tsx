import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { mount, shallow } from 'enzyme';
import React from 'react';
import { ThemeProvider } from 'styled-components';

import CheckoutImageUpload from './CheckoutImageUpload';

describe('CheckoutImageUpload', () => {
    const axiosMock = new MockAdapter(Axios);
    const id = 'CheckoutImageUpload';

    beforeEach(() => {
        axiosMock.reset();
    });

    const theme = {
        colors: {
            errors: '#c0ffee',
            primary: '#BADA55',
        },
    };

    it('renders', () => {
        const mockHandler = jest.fn();
        const checkoutImageUpload = shallow(
            <CheckoutImageUpload
                label={'1000x400px recommended'}
                name={'optimizedCheckout-logo'}
                onChange={mockHandler}
                imageURL={''}
                inputId={id}
            />
        );

        expect(checkoutImageUpload).toMatchSnapshot();
    });

    describe('componentDidUpdate', () => {
        describe('when the component gets a new imageURL as props', () => {
            it('clears ', () => {
                const mockHandler = jest.fn();
                const checkoutImageUpload = shallow(
                    <CheckoutImageUpload
                        label={'1000x400px recommended'}
                        name={'optimizedCheckout-logo'}
                        onChange={mockHandler}
                        imageURL={''}
                        inputId={id}
                    />
                );

                checkoutImageUpload.setState({
                    loading: false,
                    pendingImageURL: 'https://placekitten.com/200/300',
                    value: 'some phony value',
                });

                expect(checkoutImageUpload.state().value).toEqual('some phony value');
                expect(checkoutImageUpload.state().loading).toEqual(false);
                expect(checkoutImageUpload.state().pendingImageURL).toEqual('https://placekitten.com/200/300');

                checkoutImageUpload.setProps({
                    imageURL: 'https://placekitten.com/200/300',
                });

                checkoutImageUpload.update();
                expect(checkoutImageUpload.state().value).toEqual('');
                expect(checkoutImageUpload.state().loading).toEqual(false);
                expect(checkoutImageUpload.state().pendingImageURL).toEqual(undefined);
            });
        });
    });

    describe('handleRemoveImage', () => {
        describe('when we have a previously set image', () => {
            it('there is a link to remove it', () => {
                const mockHandler = jest.fn();
                const wrapper = mount(
                    <ThemeProvider theme={theme}>
                        <CheckoutImageUpload
                            label={'1000x400px recommended'}
                            name={'optimizedCheckout-logo'}
                            onChange={mockHandler}
                            imageURL={''}
                            inputId={id}
                        />
                    </ThemeProvider>
                );
                const checkoutImageUpload = wrapper.find(CheckoutImageUpload).instance();
                checkoutImageUpload.setState({
                    loading: false,
                    pendingImageURL: 'https://placekitten.com/200/300',
                    value: '',
                });
                wrapper.update();
                expect(wrapper).toMatchSnapshot();
            });
        });

        describe('when the user clicks the remove button', () => {
            const event = {
                target: {
                    value: '',
                },
            };

            it('it clears the image state and broadcasts a change event', () => {
                const mockHandler = jest.fn();
                const wrapper = mount(
                    <ThemeProvider theme={theme}>
                        <CheckoutImageUpload
                            label={'1000x400px recommended'}
                            name={'optimizedCheckout-logo'}
                            onChange={mockHandler}
                            imageURL={''}
                            inputId={id}
                        />
                    </ThemeProvider>
                );
                const checkoutImageUpload = wrapper.find(CheckoutImageUpload).instance();
                checkoutImageUpload.setState({
                    loading: false,
                    pendingImageURL: 'https://placekitten.com/200/300',
                    value: '',
                });
                wrapper.update();

                wrapper.find('a').simulate('click', event);

                expect(mockHandler).toBeCalledWith({
                    setting: {
                        force_reload: true,
                        id: 'optimizedCheckout-logo',
                        type: 'optimizedCheckout-image',
                    },
                    value: '',
                });
                expect(checkoutImageUpload.state.value).toEqual('');
                expect(checkoutImageUpload.state.loading).toEqual(false);
                expect(checkoutImageUpload.state.pendingImageURL).toEqual(undefined);
                expect(checkoutImageUpload.state.error).toEqual(undefined);
                expect(wrapper).toMatchSnapshot();
            });
        });
    });

    describe('handleChangeImage', () => {
        describe('when there are no files in the event', () => {
            it('the onChange handler prop will not be called', () => {
                const mockHandler = jest.fn();
                const event = {
                    target: {
                        files: null,
                        value: '',
                    },
                };

                const checkoutImageUpload = shallow(
                    <CheckoutImageUpload
                        label={'1000x400px recommended'}
                        name={'optimizedCheckout-logo'}
                        onChange={mockHandler}
                        imageURL={''}
                        inputId={id}
                    />
                );
                const checkoutInput = checkoutImageUpload.find(`#${id}`);

                checkoutInput.simulate('change', event);
                expect(mockHandler).not.toBeCalled();
            });
        });

        describe('when the user upload files', () => {
            const event = {
                target: {
                    files: [
                        new File(
                            ['this is not a real file'],
                            'mock-file.png'
                        ),
                    ],
                    value: '',
                },
            };

            it('displays a loading indicator component when the image is being uploaded', () => {
                const mockHandler = jest.fn();
                const status = 200;
                const imageURL = 'https://placekitten.com/200/300';
                const response = { data: { imageUrl: imageURL } };

                axiosMock.onPost('/internalapi/v1/themeeditor/images')
                    .reply(status, response);

                const wrapper = mount(
                    <ThemeProvider theme={theme}>
                        <CheckoutImageUpload
                            label={'1000x400px recommended'}
                            name={'optimizedCheckout-logo'}
                            onChange={mockHandler}
                            imageURL={''}
                            inputId={id}
                        />
                    </ThemeProvider>
                );
                const checkoutImageUpload = wrapper.find(CheckoutImageUpload).instance();
                expect(checkoutImageUpload.state.loading).toEqual(false);

                const checkoutInput = wrapper.find(`#${id}`);
                checkoutInput.simulate('change', event);

                expect(checkoutImageUpload.state.loading).toEqual(true);
                expect(wrapper).toMatchSnapshot();
            });

            describe('when we get an api error', () => {
                it('displays an error message and updates internal error state', (done: () => void) => {
                    const mockHandler = jest.fn();
                    const status = 502;
                    const response = 'Internal Server Error';
                    const expectedErrorMessage = 'Request failed with status code 502';

                    axiosMock.onPost('/internalapi/v1/themeeditor/images')
                        .reply(status, response);

                    const wrapper = mount(
                        <ThemeProvider theme={theme}>
                            <CheckoutImageUpload
                                label={'1000x400px recommended'}
                                name={'optimizedCheckout-logo'}
                                onChange={mockHandler}
                                imageURL={''}
                                inputId={id}
                            />
                        </ThemeProvider>
                    );
                    const checkoutImageUpload = wrapper.find(CheckoutImageUpload).instance();
                    expect(checkoutImageUpload.state.loading).toEqual(false);
                    const checkoutInput = wrapper.find(`#${id}`);

                    checkoutInput.simulate('change', event);

                    expect(checkoutImageUpload.state.value).toEqual(event.target.value);
                    expect(checkoutImageUpload.state.loading).toEqual(true);
                    expect(checkoutImageUpload.state.error).toEqual(undefined);

                    process.nextTick(() => {
                        wrapper.update();
                        expect(mockHandler).not.toBeCalled();
                        expect(checkoutImageUpload.state.value).toEqual('');
                        expect(checkoutImageUpload.state.loading).toEqual(false);
                        expect(checkoutImageUpload.state.pendingImageURL).toEqual(undefined);
                        expect(checkoutImageUpload.state.error.message).toEqual(expectedErrorMessage);
                        expect(wrapper).toMatchSnapshot();
                        done();
                    });
                });
            });

            describe('when we get a successful response', () => {
                it('the onChange handler is called with the imageURL from the API response', () => {
                    const mockHandler = jest.fn();
                    const status = 200;
                    const imageURL = 'https://placekitten.com/200/300';
                    const response = { data: { imageUrl: imageURL } };

                    axiosMock.onPost('/internalapi/v1/themeeditor/images')
                        .reply(status, response);

                    const checkoutImageUpload = shallow(
                        <CheckoutImageUpload
                            label={'1000x400px recommended'}
                            name={'optimizedCheckout-logo'}
                            onChange={mockHandler}
                            imageURL={''}
                            inputId={id}
                        />
                    );
                    const checkoutInput = checkoutImageUpload.find(`#${id}`);
                    expect(checkoutImageUpload.state().loading).toEqual(false);
                    checkoutInput.simulate('change', event);

                    expect(checkoutImageUpload.state().value).toEqual(event.target.value);
                    expect(checkoutImageUpload.state().loading).toEqual(true);
                    expect(checkoutImageUpload.state().error).toEqual(undefined);

                    process.nextTick(() => {
                        expect(mockHandler).toBeCalledWith({
                            setting: {
                                force_reload: true,
                                id: 'optimizedCheckout-logo',
                                type: 'optimizedCheckout-image',
                            },
                            value: imageURL,
                        });
                        expect(checkoutImageUpload.state().value).toEqual('');
                        expect(checkoutImageUpload.state().loading).toEqual(false);
                        expect(checkoutImageUpload.state().pendingImageURL).toEqual(imageURL);
                        expect(checkoutImageUpload.state().error).toEqual(undefined);
                    });
                });
            });
        });
    });
});
