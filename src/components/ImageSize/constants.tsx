export const enum Messages {
    Dimension = 'Specify a maximum image size for desktop display. We\'ll automatically ' +
        'scale down the image for smaller devices.',
    Lock = 'Constrain Proportions',
}

export const ImageDimensionPattern = (/^[\d]+x[\d]+$/);
