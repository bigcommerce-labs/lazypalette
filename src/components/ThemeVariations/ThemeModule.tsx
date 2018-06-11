import React from 'react';

import { ThemePropsList } from './ThemeVariations';
import { Item, List, Thumb, Title } from './styles';

const ThemeModule = (props: {variants: ThemePropsList}) => (
  <List>
    {props.variants.map(({name, image}) => (
      <Item key={name}>
        <Title>{name}</Title>
        <Thumb previewPath={image} />
      </Item>
    ))}
  </List>
);

export default ThemeModule;
