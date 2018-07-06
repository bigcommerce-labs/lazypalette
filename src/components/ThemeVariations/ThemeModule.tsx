import React from 'react';

import { Item, List, Thumb, Title } from './styles';
import { ThemePropsList } from './ThemeVariations';

const ThemeModule = (props: {variants: ThemePropsList}) => (
    <List>
        {props.variants.map(({name, image, isActive}) => (
            <Item key={name} isActive={isActive}>
                <Title>{name}</Title>
                <Thumb previewPath={image} />
            </Item>
        ))}
    </List>
);

export default ThemeModule;
