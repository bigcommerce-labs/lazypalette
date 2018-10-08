import React from 'react';

import { EntryActive, Item, List, Thumb, ThumbWrapper, Title } from './styles';
import { ThemePropsList } from './ThemeVariations';

const ThemeModule = (props: {variants: ThemePropsList, handleVariationChange(variationId: string): void}) => (
    <List>
        {props.variants.map(({name, image, isActive, variationId}) => (
            <Item
                key={name}
                onClick={() => props.handleVariationChange(variationId)}
            >
                <Title>
                    {name}
                    {isActive && <EntryActive/>}
                </Title>
                <ThumbWrapper isActive={isActive}>
                    <Thumb previewPath={image}/>
                </ThumbWrapper>
            </Item>
        ))}
    </List>
);

export default ThemeModule;
