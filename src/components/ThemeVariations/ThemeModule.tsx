import React from 'react';

import { Item, List, Thumb, Title } from './styles';
import { ThemePropsList } from './ThemeVariations';

const ThemeModule = (props: {variants: ThemePropsList, handleVariationChange(variationId: string): void}) => (
    <List>
        {props.variants.map(({name, image, isActive, variationId}) => (
            <Item key={name} isActive={isActive} onClick={() => props.handleVariationChange(variationId)}>
                <Title>{name}</Title>
                <Thumb previewPath={image} />
            </Item>
        ))}
    </List>
);

export default ThemeModule;
